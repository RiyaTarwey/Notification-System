import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { general } from "../../utils/constant";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { roleClaims } from "../../data-access/repositories/rolesRepository";
import { Op } from "sequelize";
dotenv.config();

export function verifyToken(req: any, res: any, next: any) {
    const token = req.headers["authorization"];
    let url = req.url;
    if (
        url.includes("api-docs")
        || url.includes("files/uploads")
        || url.includes("swagger")
    
    ) {
        next();
    } else
        if (token) {
            jwt.verify(
                token.split(" ")[1],
                general.jwtKey,
                (err: any, decoded: any) => {
                    if (err) {
                        return res.status(403).json({ message: "Invalid token" });
                    } else {
                        if (!req.session) {
                            console.error("Session is not initialized");
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        req.session.user = decoded;
                        req.session.currentUserId = decoded.userId;
                        // console.log(decoded);
                        next();
                    }
                }
            );
        } else {
            res.status(401).json(responseHelper(0, { message: "Token not provided" }));
        }
}

export const checkPermission = (permission: string) => {
    return async (req: any, res: any, next: any) => {
        try {
            if (req.session.user?.roles) {
                // Fetch role claims for the user's roles
                let userPermissions: any[] = await roleClaims({
                    roleId: { $in: req.session.user?.roles }
                });
                userPermissions = userPermissions
                    ? userPermissions.map((x: any) => x.claimValue) || []
                    : [];

                // Join the permissions into a string for easy comparison
                const userPermissionsString = userPermissions.join(", ");

                if (userPermissionsString && userPermissionsString.includes(permission)) {
                    return next();
                } else {
                    // User does not have permission, return an access denied response
                    return res.json(responseHelper(0, { message: "Access denied" }, "Access denied"));
                }
            } else {
                // No roles found in the session, return unauthorized response
                return res.json(responseHelper(0, { message: "UnAuthorized" }, "UnAuthorized"));
            }
        } catch (error) {
            // Handle any errors that occur
            return res.json(catchResponseHelper(error));
        }
    };
};
