import User from '../../domain/models/user';
import { catchResponseHelper } from '../../helpers/response';
import { UserRequest } from '../../presentation/interfaces/request/User';
import logger from '../../presentation/middleware/logger';

// Create a new user
export const create = async (userData: UserRequest) => {
    try {
        const newUser = await User.create(userData);
        return newUser;
    } catch (error: any) {
        logger.error(error);
        throw error;
    }
};

// Get a single user
export const getOnce = async (params: any): Promise<any> => {
    try {
        const getUser = await User.findOne(params).populate('userRoles'); // Populate related user roles if necessary
        return getUser;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

// Get multiple users
export const get = async (params: any, attributes: string[] = []): Promise<any[]> => {
    try {
        const getUsers = await User.find(params)
            .select(attributes.length > 0 ? attributes.join(' ') : '')
            .populate({
                path: 'userRoles',
                select: 'id roleId',
                populate: {
                    path: 'roleId',
                    select: 'name'
                }
            });
        return getUsers;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

// Update a user
export const update = async (param: any, data: any): Promise<any> => {
    try {
        const updatedUser = await User.updateOne(param, { $set: data });
        return updatedUser.modifiedCount; // Return the number of modified documents
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
