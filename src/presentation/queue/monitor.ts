import Arena from 'bull-arena';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../middleware/logger';
import dotenv from 'dotenv';
import { exportBullQueueNames } from '../../utils/constant';

dotenv.config();

// Create a Redis connection
export const monitorQueue = async () => {
  try {
    const connection = new IORedis();

    // Initialize the BullMQ Queue instance
    const myQueue = new Queue(exportBullQueueNames.Email, { connection });

    // Initialize Arena with the actual queue instance
    const arena = Arena({
      BullMQ: Queue, // Queue constructor
      queues: [
        {
          type: 'bullmq',
          name: exportBullQueueNames.Email,
          hostId: 'BullMQ Queue',
          // Provide the actual Queue instance as a function returning the instance
          queue: myQueue,
        },
      ],
    });

    // Start the Arena server on port 5000
    arena.listen(5000, () => {
      console.log('Arena dashboard is running at http://localhost:5000');
    });
  } catch (error: any) {
    logger.info('Error while monitoring BullMQ queues: ' + error.message);
  }
};
