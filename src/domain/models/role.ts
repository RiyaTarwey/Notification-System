import mongoose, { Schema, Document } from 'mongoose';
import { IRole } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/Role';

// Define the Mongoose schema
const RoleSchema: Schema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: false, // allowNull equivalent in Sequelize
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const Role = mongoose.model<IRole>('Role', RoleSchema);

export default Role;
