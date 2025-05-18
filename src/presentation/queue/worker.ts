import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import logger from '../middleware/logger';
import { exportBullQueueNames, kafkaMaintopicsNames, queueStatus } from '../../utils/constant';
import { processEmailJobs, processSmsJobs } from '../../helpers/jobProcess';
import { initProducer } from '../kafka/producer';
import { update } from '../../data-access/repositories/jobQueueRepository';

dotenv.config();
export const intQueues = async () => {
  try {
    let emailQueue = await runningQueue(exportBullQueueNames.Email);
    let smsQueue = await runningQueue(exportBullQueueNames.Sms);
    console.log("bull queues working fine");
  } catch (error: any) {
    logger.info('Error while processing the queue: ' + error.message);
  }
}
export const runningQueue = async (topic: string = exportBullQueueNames.Email) => {
  try {
    const connection = new IORedis({
      maxRetriesPerRequest: null,
    });
    const worker = new Worker(
      topic,
      async (job) => {
        const logObj: any = {
          status: queueStatus.InProcess,
        };
        const insertLog = await update({ GUID: job.data.GUID }, logObj);
        console.log(`Processing job: ${job.id}, data: ${JSON.stringify(job.data)}`);
        let process;
        if (topic == exportBullQueueNames.Email) process = await processEmailJobs(job.data);
        else if (topic == exportBullQueueNames.Sms) process = await processSmsJobs(job.data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      {
        connection,
        concurrency: 5,
        limiter: {
          max: 16,
          duration: 1000
        },
      }
    );

    worker.on('completed', async (job) => {
      try {
        const logObj: any = {
          status: queueStatus.Completed,
        };
        const insertLog = await update({ GUID: job.data.GUID }, logObj);
        logger.info(`Job ${job.data.GUID} completed successfully.`);
      } catch (error: any) {
        logger.error(`Error sending completion log for job ${job.data.GUID}: ${error.message}`);
      }
    });

    worker.on('failed', async (job, error) => {
      try {
        const logObj: any = {
          status: queueStatus.Failed,
        };
        const insertLog = await update({ GUID: job?.data.GUID }, logObj);
        logger.info(`Job ${job?.id || job?.data.GUID} failed with error: ${error.message}`);
      } catch (err: any) {
        logger.error(`Error sending failure log for job ${job?.id || job?.data.GUID}: ${err.message}`);
      }
    });

  } catch (error: any) {
    logger.info('Error while processing the queue: ' + error.message);
  }
};
