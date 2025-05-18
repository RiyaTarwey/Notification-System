import express from "express";
import { validate } from "../middleware/validate";
import { AssignRolePermissionSchema, AssignRoleSchema, RoleSchema, UpdateRoleSchema } from "../validation/maintianDatavalidation";
import { assignPermissions, assignRole, create, destroy, get, update } from "../controllers/RolesController";
import { checkPermission } from "../middleware/authMiddleware";
import { claims } from "../../utils/constant";

const router = express.Router();


/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role with a required name field.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role
 *                 example: "Admin"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "610c72f2e9161b001ce5d524"
 *                     name:
 *                       type: string
 *                       example: "Admin"
 *                     message:
 *                       type: string
 *                       example: "Role created successfully"
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation error: name is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.post("/role", checkPermission(claims.createRole), validate(RoleSchema), create);
/**
 * @swagger
 * /role:
 *   put:
 *     summary: Create a new role
 *     description: Create a new role with a required name field.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The id of the role
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The name of the role
 *                 example: "Admin"
 *             required:
 *               - id
 *               - name
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "610c72f2e9161b001ce5d524"
 *                     name:
 *                       type: string
 *                       example: "Admin"
 *                     message:
 *                       type: string
 *                       example: "Role created successfully"
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation error: name is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.put("/role", checkPermission(claims.updateRole), validate(UpdateRoleSchema), update);
/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get a list of roles
 *     description: Retrieve a list of all roles available in the system.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier of the role
 *                     example: "610c72f2e9161b001ce5d524"
 *                   name:
 *                     type: string
 *                     description: The name of the role
 *                     example: "Admin"
 *       401:
 *         description: Unauthorized access, JWT token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get("/role", checkPermission(claims.ViewRole), get);
/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     description: Deletes a specific role using its unique ID.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the role to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Role deleted successfully"
 *       400:
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid ID"
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Role not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */

router.delete("/role/:id", checkPermission(claims.deleteRole), destroy);
/**
 * @swagger
 * /assign-role:
 *   post:
 *     summary: Assign roles to a user
 *     description: Assign multiple roles to a user by providing an array of role IDs and a user ID.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Array of role IDs to assign
 *                 example: [1, 2, 3]
 *               userId:
 *                 type: number
 *                 description: The ID of the user to assign roles to
 *                 example: 123
 *     responses:
 *       200:
 *         description: Roles assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Roles assigned successfully"
 *       400:
 *         description: Validation error, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation error: roleIds and userId are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */
router.post("/assign-role", checkPermission(claims.assignRole), validate(AssignRoleSchema), assignRole);
/**
 * @swagger
 * /assign-role-permissions:
 *   post:
 *     summary: Assign roles to a user
 *     description: Assign multiple roles to a user by providing an array of role IDs and a user ID.
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claims:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of role IDs to assign
 *                 example: ["Create item"]
 *               roleId:
 *                 type: number
 *                 description: The ID of the user to assign roles to
 *                 example: 123
 *     responses:
 *       200:
 *         description: Roles assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Roles assigned successfully"
 *       400:
 *         description: Validation error, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation error: roleIds and userId are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal server error"
 */
router.post("/assign-role-permissions", checkPermission(claims.assignRolePermission), validate(AssignRolePermissionSchema), assignPermissions);
module.exports = router
