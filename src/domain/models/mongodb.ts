import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../../presentation/middleware/logger';
// import logger from '../../../presentation/middleware/logger';

// Load environment variables from .env file
dotenv.config();

const mongoDbUri: string | undefined = process.env.MONGO_URI;

if (!mongoDbUri) {
  throw new Error('MONGO_URI environment variable is missing');
}

// Create a MongoDB connection
const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoDbUri);  // Default options are used in Mongoose 6+
    console.log('Connected to MongoDB');
  } catch (error : any) {
    console.error('Error connecting to MongoDB:', error);
    logger.error('Error connecting to MongoDB:'+ error?.message)
    process.exit(1);
  }
};

export default connectToMongoDB;
