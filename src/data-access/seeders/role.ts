import { adminPermissions, notificationConsumerPermissions, permanentRoles } from "../../utils/constant"
import { create, get, maintainRoleClaims } from "../repositories/rolesRepository"

export const roleSeeder = async () => {
    let roles : string[] = [
        permanentRoles.Admin,
        permanentRoles.notificationConsumer
    ]
    for (const role of roles) {
        let ifRoleExist = await get({name : role});
        if (!ifRoleExist || ifRoleExist.length <= 0) {
            let createRole = await create({
                name: role
            })
            if (createRole){
                let claims = createRole?.name ==  permanentRoles.Admin ? adminPermissions : notificationConsumerPermissions
                let createRoleClaims = await maintainRoleClaims({
                    roleId : createRole.id,
                    claimValue : claims
                })
            }
        }
    }
}