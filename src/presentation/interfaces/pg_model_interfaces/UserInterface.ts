// src/types/User.ts
import { Optional } from 'sequelize'; // Import Optional from sequelize

export interface UserAttributes {
  id?: number; // Assuming you have an auto-increment primary key
  username: string;
  email: string;
  password: string;
  otp?: number,
  isVerified?: boolean,
  IsActive?: boolean,
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
