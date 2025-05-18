import JobQueue from '../../domain/models/jobQueues';
import { catchResponseHelper } from '../../helpers/response';
import { JobQueueRequest } from '../../presentation/interfaces/request/JobQueueRequest';

// Create a new item
export const create = async (tempData: JobQueueRequest) => {
    try {
        const item = await JobQueue.create(tempData);
        return item;
    } catch (error: any) {
        throw error;
    }
};

// Get items based on parameters
export const get = async (params: any): Promise<any[]> => {
    try {
        const items = await JobQueue.find(params)
            .select("id name type")
            .sort({ id: -1 });
        return items || [];
    } catch (error: any) {
        catchResponseHelper(error);
        return [];
    }
};

// Get item by ID
export const getById = async (id: string) => {
    try {
        const item = await JobQueue.findById(id).select("id name type");
        return item;
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

// Update an item
export const update = async (param: any, data: JobQueueRequest) => {
    try {
        const result = await JobQueue.updateOne(param, { $set: data });
        return result.modifiedCount; // Return number of modified documents
    } catch (error: any) {
        catchResponseHelper(error);
    }
};

// Delete items based on parameters
export const deleteItems = async (param: any) => {
    try {
        const result = await JobQueue.deleteMany(param);
        return result.deletedCount; // Return number of deleted documents
    } catch (error: any) {
        throw error;
    }
};
