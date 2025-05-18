import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/User';


// Define the Mongoose schema
const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: false, // allowNull equivalent in Sequelize
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false, // defaultValue equivalent
      required: false,
    },
    IsActive: {
      type: Boolean,
      default: true, // defaultValue equivalent
      required: false,
    },
    userRoles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRoles', // Reference to the UserRoles model
  }],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
