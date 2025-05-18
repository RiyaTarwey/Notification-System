import { Document } from "mongoose";

export interface IRole extends Document {
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface IRoleClaims extends Document {
    roleId?: number;
    claimValue?: any[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface IUserRoles extends Document {
    userId?: number;
    roleId?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }