import ItemOne from '../../domain/models/itemOne';
import { catchResponseHelper } from '../../helpers/response';
import { ItemOneRequest } from '../../presentation/interfaces/request/ItemOne';

// Create a new item
export const create = async (tempData: ItemOneRequest) => {
    try {
        const item = await ItemOne.create(tempData);
        return item;
    } catch (error: any) {
        throw error;
    }
};

// Get items based on parameters
export const get = async (params: any): Promise<any[]> => {
    try {
        const items = await ItemOne.find(params)
            .select("id name")
            .sort({ id: -1 });
        return items || [];
    } catch (error: any) {
        catchResponseHelper(error);
        return [];
    }
};

// Get item by ID
export const getById = async (id: string) => { // MongoDB uses string IDs by default
    try {
        const item = await ItemOne.findById(id).select("id name");
        return item;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

// Update an item
export const update = async (param: any, data: ItemOneRequest) => {
    try {
        const result = await ItemOne.updateOne(param, { $set: data });
        return result.modifiedCount; // Return number of modified documents
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

// Delete items based on parameters
export const deleteItems = async (param: any) => {
    try {
        const result = await ItemOne.deleteMany(param);
        return result.deletedCount; // Return number of deleted documents
    } catch (error: any) {
        throw error;
    }
};
