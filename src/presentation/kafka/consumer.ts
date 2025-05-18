import { addJobs } from "../queue/queue";
import { exportBullQueueNames, kafkaMaintopicsNames, queueTypesNames, userPrefrencesTypes } from "../../utils/constant";
import logger from "../middleware/logger";
import { JobQueueRequest } from "../interfaces/request/JobQueueRequest";
import { create } from "../../data-access/repositories/jobQueueRepository";
import { kafka } from "./index";
import { Guid } from "js-guid";
import { getOnce as getUserPref } from "../../data-access/repositories/systemPrederencesRepository";

interface ConsumerConfig {
  groupId: string;
  topics: string[];
  processJob?: (job: any) => Promise<boolean>;
}

const defaultProcessJob = async (job: any) => {
  console.log(job);
  let getNotificationCOnfigurations = await getUserPref({ userId: job.userId, type: userPrefrencesTypes.notificationPref });
  let checkNotificationPrev = getNotificationCOnfigurations.value;
  console.log(checkNotificationPrev);
  let success: boolean = false;
  if (checkNotificationPrev.Email == true) {
    success = await addJobs(job);
  }
  if (checkNotificationPrev.Sms == true) {
    success = await addJobs(job, exportBullQueueNames.Sms);
  }
  return success;
};

const createConsumer = async ({ groupId, topics, processJob = defaultProcessJob }: ConsumerConfig) => {
  try {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        try {
          if (message.value) {
            const job = JSON.parse(message.value.toString());
            logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);

            const success = await processJob(job);

            if (success) {
              await consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
            } else {
              console.error(`Job failed: ${job.GUID}`);
            }

            await heartbeat();
          } else {
            console.error(`Received a message with null value in topic: ${topic}`);
          }
        } catch (error) {
          console.error("Error while processing message", error);
        }
      },
    });
  } catch (error) {
    console.error(`Error initializing consumer for group ${groupId}: ${error}`);
  }
};

export const initAllConsumers = async () => {
  try {
    await createConsumer({
      groupId: 'general-group',
      topics: [queueTypesNames.notifyOtpEmail]
    });

    await createConsumer({
      groupId: 'promotional-messages-group',
      topics: [kafkaMaintopicsNames.promotional]
    });

    await createConsumer({
      groupId: 'Transactional-messages-group',
      topics: [kafkaMaintopicsNames.transaction]
    });
    await createConsumer({
      groupId: 'Transactional-messages-group',
      topics: [kafkaMaintopicsNames.transaction]
    });
    await createConsumer({
      groupId: 'Transactional-messages-group',
      topics: [kafkaMaintopicsNames.transaction]
    });
    await createConsumer({
      groupId: 'Transactional-messages-group',
      topics: [kafkaMaintopicsNames.transaction]
    });

    await createConsumer({
      groupId: 'log-consumer-group',
      topics: [
        queueTypesNames.notifyOtpEmail,
        kafkaMaintopicsNames.transaction,
        kafkaMaintopicsNames.promotional
      ],
      processJob: async (job: any) => {
        const guid = new Guid().toString();
        const logObj: JobQueueRequest = {
          type: job.type,
          name: job.name || "",
          payload: job.payload || {},
          GUID: job.GUID || guid,
          status: job.status || "InQueue",
          userId: job.userId || null
        };
        const insertLog = await create(logObj);
        if (insertLog) {
          logger.info(`Job inserted into log GUID: ${insertLog.GUID}`);
          return true;
        } else {
          logger.error(`Error logging job into DB GUID: ${logObj.GUID}`);
          return false;
        }
      }
    });
  } catch (error) {
    console.error("Error initializing consumers", error);
  }
};
