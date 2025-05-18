import { getRolePermissions, login, register } from "../../application/services/AuthService";
import { createUser, verifyUser } from "../../application/services/UserService"
import { catchResponseHelper } from "../../helpers/response"

export const userLogin = async (req: any, res: any) => {
    try {
        let loginUser = await login(req);
        res.json(loginUser)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const registration = async (req: any, res: any) => {
    try {
        let registerationForUser = await register(req);
        res.json(registerationForUser)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}
export const _getRolePermissions = async (req: any, res: any) => {
    try {
        let permissions = await getRolePermissions(req);
        res.json(permissions)
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}

