// src/types/User.ts
import { Optional } from 'sequelize'; // Import Optional from sequelize

export interface RoleAttributes {
  id?: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> { }
