import { Optional } from 'sequelize';
export interface itemOneRepoAttributes {
    id?: number;
    name?: string;
}

export interface itemOneRepoCreationAttributes extends Optional<itemOneRepoAttributes, 'id'> { }
