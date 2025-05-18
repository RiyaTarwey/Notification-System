import Role from '../../domain/models/role';
import RoleClaims from '../../domain/models/roleClaims';
import UserRoles from '../../domain/models/userRoles';
import { AssignRolePermissionsRequest, AssignRoleRequest, RoleRequest } from '../../presentation/interfaces/request/RoleRequest';

// Create a new role
export const create = async (tempData: RoleRequest) => {
    try {
        const role = await Role.create(tempData);
        return role;
    } catch (error: any) {
        throw error;
    }
};

// Get roles based on parameters
export const get = async (params: any): Promise<any[]> => {
    try {
        const roles = await Role.find(params).select("id name").sort({ id: -1 });
        return roles || [];
    } catch (error: any) {
        throw error;
    }
};
export const getOnce = async (params: any): Promise<any> => {
    try {
        const roles = await Role.findOne(params).select("id name").sort({ id: -1 });
        return roles || [];
    } catch (error: any) {
        throw error;
    }
};

// Get user roles based on parameters
export const getUserRoles = async (params: any = {}): Promise<any[]> => {
    try {
        const roles = await UserRoles.find(params)
            .select("id roleId")
            .sort({ id: -1 })
            .populate('roleId', 'name'); // Populate Role details
        return roles || [];
    } catch (error: any) {
        throw error;
    }
};

// Get role claims based on parameters
export const getRoleClaims = async (params: any = {}): Promise<any[]> => {
    try {
        const roles = await RoleClaims.find(params).select("id").sort({ id: -1 });
        return roles || [];
    } catch (error: any) {
        throw error;
    }
};

// Delete role claims based on parameters
export const deleteRoleClaims = async (params: any = {}): Promise<any> => {
    try {
        const result = await RoleClaims.deleteMany(params);
        return result.deletedCount; // Return number of deleted documents
    } catch (error: any) {
        throw error;
    }
};

// Get role by ID
export const getById = async (id: string) => { // MongoDB uses string IDs by default
    try {
        const role = await Role.findById(id).select("id name");
        return role;
    } catch (error: any) {
        throw error;
    }
};

// Update a role
export const update = async (param: any, data: RoleRequest): Promise<any> => {
    try {
        const result = await Role.updateOne(param, { $set: data });
        return result.modifiedCount; // Return number of modified documents
    } catch (error: any) {
        throw error;
    }
};

// Delete roles based on parameters
export const deleteRoles = async (param: any) => {
    try {
        const result = await Role.deleteMany(param);
        return result.deletedCount; // Return number of deleted documents
    } catch (error: any) {
        throw error;
    }
};

// Create user roles
export const createUserRole = async (body: AssignRoleRequest) => {
    try {
        const { roleIds, userId } = body;
        await UserRoles.deleteMany({ userId: userId });
        
        const createdRoles = await Promise.all(
            roleIds.map(async (roleId: any) => {
                const role = { roleId: roleId, userId: userId };
                let userRoles = await UserRoles.create(role) 
                return userRoles;
            })
        );
        return createdRoles;
    } catch (error) {
        throw error;
    }
};

// Maintain role claims
export const maintainRoleClaims = async (body: AssignRolePermissionsRequest) => {
    try {
        const find = await RoleClaims.findOne({ roleId: body.roleId });
        if (find) {
            const result = await RoleClaims.updateOne({ _id: find.id || find._id}, { $set: body });
        } else {
            await RoleClaims.create(body);
        }
        return true;
    } catch (error) {
        throw error;
    }
};

// Get role claims
export const roleClaims = async (params: any) => {
    try {
        const claims = await RoleClaims.find(params).select("claimValue");
        return claims;
    } catch (error) {
        throw error;
    }
};
