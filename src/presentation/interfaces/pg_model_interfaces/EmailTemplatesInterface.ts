// src/types/User.ts
import { Optional } from 'sequelize'; // Import Optional from sequelize

export interface emailTemplateAttributes {
  id?: number;
  typeId?: number;
  content?: string;
  subject?: string;
}

export interface emailTemplatereationAttributes extends Optional<emailTemplateAttributes, 'id'> { }
