import mongoose, { Schema, Document } from 'mongoose';
import { IEmailTemplate } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/EmailTemplates';
const EmailTemplateSchema: Schema = new Schema<IEmailTemplate>(
  {
    typeId: {
      type: Number, 
      required: false, 
    },
    content: {
      type: String, 
      required: false, 
    },
    subject: {
      type: String, 
      required: false, 
    },
  },
  {
    timestamps: true, 
  }
);


const EmailTemplate = mongoose.model<IEmailTemplate>('EmailTemplate', EmailTemplateSchema);

export default EmailTemplate;
