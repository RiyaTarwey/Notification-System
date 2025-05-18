import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../middleware/logger';
import dotenv from "dotenv";
import { exportBullQueueNames, queueTypes } from '../../utils/constant';
import { JobQueueRequest } from '../interfaces/request/JobQueueRequest';
dotenv.config();

const connection = new IORedis();

// Initialize a BullMQ queue

export async function addJobs(job: JobQueueRequest, topic?: string) {
    try {
        const myQueue = new Queue(topic || exportBullQueueNames.Email, { connection });
        let addJob = await myQueue.add(job.name || "any", job, { priority: queueTypes.find(x => x.id == job?.type)?.priority || 1 });
        return true
    } catch (error: any) {
        logger.info("error while add the job " + error.message)
        return false
    }
}

// addJobs();
