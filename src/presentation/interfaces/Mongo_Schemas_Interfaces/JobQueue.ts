export interface IJobQueue extends Document {
    type: number;
    name: string;
    payload: object;
    status: string;
    GUID: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }