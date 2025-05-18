import mongoose, { Schema, Document, model } from 'mongoose';
import { IUserPref } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/UserPreferences';


// Define the Mongoose schema
const UserPrefSchema: Schema<IUserPref> = new Schema<IUserPref>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    name: {
      type: String, 
      required: false,
    },
    type: {
      type: String, 
      required: false,
    },
    value: {
      type: Object, 
      required: false,
    },
  },
  {
    timestamps: true, 
    strict: true,     
  }
);


const UserPreferences = model<IUserPref>('UserPreferences', UserPrefSchema);

export default UserPreferences;
