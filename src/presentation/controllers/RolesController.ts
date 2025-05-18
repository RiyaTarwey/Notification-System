import { assignPermisson, assignRoleUser, createRole, deleteRole, getRoles, updateRole } from "../../application/services/RoleService";
import { catchResponseHelper } from "../../helpers/response";

export let get = async (req: any, res: any) => {
    try {
        let roles = await getRoles(req);
        res.json(roles);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export let create = async (req: any, res: any) => {
    try {
        let _create = await createRole(req);
        res.json(_create);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export let update = async (req: any, res: any) => {
    try {
        let _update = await updateRole(req);
        res.json(_update);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export let destroy = async (req: any, res: any) => {
    try {
        let _deleteRole = await deleteRole(req);
        res.json(_deleteRole);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export let assignRole = async (req: any, res: any) => {
    try {
        let _assign = await assignRoleUser(req);
        res.json(_assign);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export let assignPermissions = async (req: any, res: any) => {
    try {
        let _assign = await assignPermisson(req);
        res.json(_assign);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}