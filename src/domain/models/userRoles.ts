import mongoose, { Schema, Document } from 'mongoose';
import { IUserRoles } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/Role';

// Define the Mongoose schema
const UserRolesSchema: Schema = new Schema<IUserRoles>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    strict: true,      // Enforce schema structure; set to false if you want to allow other fields
  }
);

// Create and export the Mongoose model
const UserRoles = mongoose.model<IUserRoles>('UserRoles', UserRolesSchema);

export default UserRoles;
