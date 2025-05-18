import { roleSeeder } from "./role"
import { userSeeder } from "./user";

export const up = async () => {
    await roleSeeder();
    await userSeeder();
}