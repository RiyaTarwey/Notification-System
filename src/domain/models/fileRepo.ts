import mongoose, { Schema, Document } from 'mongoose';
import { IFileRepo } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/FileRepo';



// Define the Mongoose schema
const FileRepoSchema: Schema = new Schema<IFileRepo>(
  {
    refId: {
      type: mongoose.Types.ObjectId, // Sequelize's INTEGER equivalent
      required: false, // allowNull equivalent
    },
    refTableName: {
      type: String, // Sequelize's STRING equivalent
      required: false, // allowNull equivalent
    },
    path: {
      type: String, // Sequelize's TEXT equivalent
      required: false, // allowNull equivalent
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const FileRepo = mongoose.model<IFileRepo>('FileRepo', FileRepoSchema);

export default FileRepo;
