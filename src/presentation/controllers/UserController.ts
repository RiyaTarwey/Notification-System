import { createUser, getUserInfo, getUsers, isActive, userUpdate, verifyUser } from "../../application/services/UserService"
import { catchResponseHelper } from "../../helpers/response"

export const get = async (req: any, res: any) => {
    try {
        let users = await getUsers(req);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const _getUserInfo = async (req: any, res: any) => {
    try {
        let user = await getUserInfo(req);
        res.json(user);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const create = async (req: any, res: any) => {
    try {
        let creation = await createUser(req, res);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const update = async (req: any, res: any) => {
    try {
        let _update = await userUpdate(req);
        res.json(_update);
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const verify = async (req: any, res: any) => {
    try {
        let verify = await verifyUser(req);
        res.json(verify)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const maintainUserActivation = async (req: any, res: any) => {
    try {
        let verify = await isActive(req);
        res.json(verify)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}