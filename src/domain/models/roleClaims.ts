import mongoose, { Schema, Document } from 'mongoose';
import { IRoleClaims } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/Role';

// Define the Mongoose schema
const RoleClaimsSchema: Schema = new Schema<IRoleClaims>(
  {
    roleId: {
      type: String,
      required: false,
    },
    claimValue: {
      type: [Schema.Types.Mixed], // Array of any type (similar to JSONB in Sequelize)
      default: [],  // Default empty array
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const RoleClaims = mongoose.model<IRoleClaims>('RoleClaims', RoleClaimsSchema);

export default RoleClaims;
