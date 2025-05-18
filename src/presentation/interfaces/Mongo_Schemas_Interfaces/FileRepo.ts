export interface IFileRepo extends Document {
    refId?: number;
    refTableName?: string;
    path?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }