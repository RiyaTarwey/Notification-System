// src/types/User.ts
import { Optional } from 'sequelize'; // Import Optional from sequelize

export interface RoleClaimsAttributes {
  id?: number;
  roleId: number;
  claimValue?: any[];
}

export interface RoleClaimsCreationAttributes extends Optional<RoleClaimsAttributes, 'id'> { }
