import mongoose, { Schema, Document } from 'mongoose';
import { IItemOne } from '../../presentation/interfaces/Mongo_Schemas_Interfaces/ItemOne';


// Define the Mongoose schema
const ItemOneSchema: Schema = new Schema<IItemOne>(
  {
    name: {
      type: String,  // Sequelize's TEXT equivalent
      required: false,  // allowNull equivalent
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Mongoose model
const ItemOne = mongoose.model<IItemOne>('ItemOne', ItemOneSchema);

export default ItemOne;
