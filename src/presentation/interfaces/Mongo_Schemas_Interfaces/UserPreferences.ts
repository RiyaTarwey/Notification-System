import mongoose from "mongoose";

export interface IUserPref extends Document {
    userId: mongoose.Types.ObjectId | string; // Allow both ObjectId or string
    name: string;
    type: string;
    value: Object;
  }