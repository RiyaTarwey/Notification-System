
import { encrypt } from "../../presentation/middleware/security";
import { permanentRoles } from "../../utils/constant";
import { createUserRole, get , getOnce as getOnceRole } from "../repositories/rolesRepository";
import { create, getOnce } from "../repositories/userRepository"

export const userSeeder = async () => {
    let FindUser = await getOnce({email : "admin@example.com"});
    if (!FindUser) {
        let createUser = await create({
            username : "Admin",
            email : "admin@example.com",
            password : await encrypt("123456"),
            isVerified : true
        })
        if (createUser) {
            let FindRole = await getOnceRole({name : permanentRoles.Admin});
            let assignRole = await createUserRole({
                userId : createUser.id,
                roleIds : [FindRole.id]
            })
        }
    }
}