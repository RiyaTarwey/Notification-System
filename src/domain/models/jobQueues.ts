import mongoose, { Schema, Document } from 'mongoose';
import { IJobQueue } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/JobQueue';

const JobQueueSchema: Schema = new Schema<IJobQueue>(
  {
    name: {
      type: String,
      required: false,
    },
    type: {
      type: Number,
      required: false,
    },
    payload: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    GUID: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const JobQueue = mongoose.model<IJobQueue>('JobQueue', JobQueueSchema);

export default JobQueue;
