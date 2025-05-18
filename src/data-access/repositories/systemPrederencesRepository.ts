import UserPreferences from '../../domain/models/userPreferences';
import { SystemPrefRequest } from '../../presentation/interfaces/request/SystemPrefRequest';

// Create a new role
export const create = async (data: SystemPrefRequest) => {
    try {
        const pref = await UserPreferences.create(data);
        return pref;
    } catch (error: any) {
        throw error;
    }
};
export const update = async (param : any, data: SystemPrefRequest) => {
    try {
        const pref = await UserPreferences.updateOne(param, { $set: data });
        return pref.modifiedCount;
    } catch (error: any) {
        throw error;
    }
};

// Get prefs based on parameters
export const get = async (params: any): Promise<any[]> => {
    try {
        const prefs = await UserPreferences.find(params).select("id type value").sort({ id: -1 });
        return prefs || [];
    } catch (error: any) {
        throw error;
    }
};
export const getOnce = async (params: any): Promise<any> => {
    try {
        const prefs = await UserPreferences.findOne(params).select("id type value").sort({ id: -1 });
        return prefs;
    } catch (error: any) {
        throw error;
    }
};

