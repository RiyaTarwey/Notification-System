export interface RoleRequest {
    id?: number;
    name: string;
}
export interface AssignRoleRequest {
    roleIds: any[];
    userId: any;
}
export interface AssignRolePermissionsRequest {
    roleId: number;
    claimValue: string[];
}