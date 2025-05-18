export interface IEmailTemplate extends Document {
    typeId?: number;
    content?: string;
    subject?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }