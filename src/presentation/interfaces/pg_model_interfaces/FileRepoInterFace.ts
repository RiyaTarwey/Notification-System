import { Optional } from 'sequelize';
export interface fileRepoAttributes {
    id?: number;
    refId?: number;
    refTableName?: string;
    path?: string;
}

export interface fileRepoCreationAttributes extends Optional<fileRepoAttributes, 'id'> { }
