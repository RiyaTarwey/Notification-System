import { create, get, getOnce, update } from "../../data-access/repositories/userRepository";
import { get as getRoles } from "../../data-access/repositories/rolesRepository";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { UserRequest } from "../../presentation/interfaces/request/User";
import { decrypt, encrypt } from "../../presentation/middleware/security";
import { emailTemplateTypes, permanentRoles, responseMessages } from "../../utils/constant";
import { assignRole } from "./RoleService";
import logger from "../../presentation/middleware/logger";


export const getUsers = async (req: any) => {
    try {
        let users = await get(req.body, ["_id","username", "email"]);
        console.log(users);
        users = users.map((user: any) => {
            const roles = user.userRoles.map((userRole: any) => userRole.Role.name);
            return {
                username: user.username,
                email: user.email,
                roles
            };
        });

        return responseHelper(1, users);
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
};

export const getUserInfo = async (req: any) => {
    try {
        let userId = req.session.user.userId;
        let user = await getUsers({
            body: {
                _id: userId
            }
        })
        return responseHelper(1, user?.data?.find((x:any)=> x?._id == userId || {}));
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const createUser = async (req: any, res: any) => {
    try {
        let response;
        let encryptedPass = await encrypt(req.body.password);
        let body: UserRequest = {
            username: req.body.username,
            email: req.body.email,
            password: encryptedPass,
            isVerified: true
        };
        let creation = await create(body);
        if (creation) {
            response = responseHelper(1, { message: responseMessages.userCreated });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create user") });
        return res.json(response);
    } catch (error) {
        let response = catchResponseHelper(error);
        return res.json(response);
    }
}
export const userUpdate = async (req: any) => {
    try {
        let userObj = req.body;
        delete userObj.id;
        let _update = await updateUser(req.body.id, userObj);
        return _update
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
const updateUser = async (id: any, userObj: any) => {
    try {
        let response;
        let ifExist = await getOnce({ id: id });
        if (!ifExist) return responseHelper(0, responseMessages.notFound.replace("{replace}", "User"));
        let _update = await update({ id: id }, userObj);
        if (_update > 0) {
            response = responseHelper(1, { message: responseMessages.userCreated });
        }
        else
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "create user") });
        return response;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}
export const verifyUser = async (req: any) => {
    try {
        let response;
        let otp = req.body.otp;
        let user = await getOnce({ email: req.body.email });
        if (!user)
            return response = responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "User") });
        if (user.otp != otp)
            return response = responseHelper(0, { message: responseMessages.incCorrect.replace("{replace}", "otp") });
        let makeVerified = await update({ _id: user?.id }, {
            otp: null,
            isVerified: true
        })
        let getUserRole = await getRoles({ name: permanentRoles.notificationConsumer });
        let UserRole = getUserRole.find(x => x.name == permanentRoles.notificationConsumer);
        if (UserRole) {
            let assignUser = await assignRole({ userId: user.id, roleIds: [UserRole.id || UserRole._id] });
            if (assignUser)
                logger.info(`New User UuserId : ${user.id}`)
        }

        if (makeVerified <= 0)
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "verified user") });
        else
            response = responseHelper(1, { message: responseMessages.success.replace("{replace}", "Verified user") });
        return response;
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}

export const isActive = async (req: any) => {
    try {
        let userObj = req.body;
        let response;
        let user = await getOnce({ id: userObj?.id });
        if (!user)
            return response = responseHelper(0, { message: responseMessages.notFound.replace("{replace}", "User") });
        let updateActivation = await update({ id: user?.id }, {
            IsActive: userObj?.IsActive
        })
        if (updateActivation <= 0)
            response = responseHelper(0, { message: responseMessages.wentWrongWhile.replace("{replace}", "update activation status of user") });
        else
            response = responseHelper(1, { message: responseMessages.success.replace("{replace}", "Activation status") });
        return response

    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}