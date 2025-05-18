// src/types/User.ts
import { Optional } from 'sequelize'; // Import Optional from sequelize

export interface UserRolesAttributes {
  id?: number;
  userId: number;
  roleId?: number;
}

export interface UserRolesCreationAttributes extends Optional<UserRolesAttributes, 'id'> { }
