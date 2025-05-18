import { create, createUserRole, deleteRoleClaims, deleteRoles, get, getById, getUserRoles, maintainRoleClaims, update } from "../../data-access/repositories/rolesRepository";
import { getOnce } from "../../data-access/repositories/userRepository";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { AssignRolePermissionsRequest, AssignRoleRequest, RoleRequest } from "../../presentation/interfaces/request/RoleRequest";
import { responseMessages } from "../../utils/constant";

export const getRoles = async (req: any) => {
    try {
        let roles = await get({});
        return responseHelper(1, roles)
    } catch (error) {
        return catchResponseHelper(error);
    }
}

export const createRole = async (req: any) => {
    try {
        let checkRoleNameIfExist = get({ name: req.body.name });
        if ((await checkRoleNameIfExist).length > 0)
            return responseHelper(0, { message: responseMessages.alreadyExist.replace("{replace}", "Role") });
        let body: RoleRequest = {
            name: req.body.name
        }
        let createRole = await create(body)
        if (createRole) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Role created") });
        else responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "while create role") });
    } catch (error) {
        return catchResponseHelper(error);
    }
}
export const updateRole = async (req: any) => {
    try {
        let checkRoleNameIfExist = get({ name: req.body.name });
        if ((await checkRoleNameIfExist).length > 0)
            return responseHelper(0, { message: responseMessages.alreadyExist.replace("{replace}", "Role") });
        let body: RoleRequest = {
            name: req.body.name
        }
        let updateRole = await update({ id: parseInt(req.body.id) }, body)
        if (updateRole > 0) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Role update") });
        else responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "while update role") });
    } catch (error) {
        return catchResponseHelper(error);
    }
}

export const deleteRole = async (req: any) => {
    try {
        let id = parseInt(req.params.id);
        let checkIfUsed = await getUserRoles({ roleId: id });
        if (checkIfUsed.length > 0) return responseHelper(0, { message: responseMessages.inUse.replace("{replace}", "Role") });
        let deleteClaimsFirst = await deleteRoleClaims({ roleId: id })
        let deleteRole = await deleteRoles({ id: id })
        if (deleteRole > 0) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Role deleted") })
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "delete role or role not exist") });
    } catch (error) {
        return catchResponseHelper(error);
    }
}


export const assignRoleUser = async (req: any) => {
    try {
        let body: AssignRoleRequest = req.body;
        let assign = await assignRole(body);
        return assign;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const assignRole = async (body: AssignRoleRequest) => {
    try {
        let ifExist = await getOnce({ _id: body?.userId });
        if (!ifExist) return responseHelper(0, responseMessages.notFound.replace("{replace}", "User"));
        let roleIds = body.roleIds;
        let allIdsExistance = true
        for (const roleId of roleIds) {
            let role = await get({ _id: roleId });
            if (role.length <= 0) {
                allIdsExistance = false
                break
            }
        }
        if (!allIdsExistance) return responseHelper(0, responseMessages.notFound.replace("{replace}", "Role"));
        let assign = await createUserRole(body);
        if (assign) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Assign Role") });
        else return responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "assign role") });
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const assignPermisson = async (req: any) => {
    try {
        let body = req.body;
        let role = await get({ _id: body?.roleId });
        if (role.length <= 0) return responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "Role") });
        body = {
            roleId: body.roleId,
            claimValue: body.claims
        }
        let roleAssignation = await assignPermissons(body);
        return roleAssignation;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

const assignPermissons = async (body: AssignRolePermissionsRequest) => {
    try {
        let roleAssignation = await maintainRoleClaims(body);
        if (roleAssignation) return responseHelper(1, { message: responseMessages.success.replace("{replace}", "Permission assigned") });
        else responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "permission assignation") });
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;

    }
}