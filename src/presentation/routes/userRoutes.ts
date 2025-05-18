import express from "express";
import { _getUserInfo, create, get, maintainUserActivation, update, verify } from "../controllers/UserController";
import { validate } from "../middleware/validate";
import { updateUserSchema, userisActivationSchema, userSchema, userVerificationSchema } from "../validation/maintianDatavalidation";
import { checkPermission } from "../middleware/authMiddleware";
import { claims } from "../../utils/constant";
import { _getRolePermissions } from "../controllers/AuthController";
const router = express.Router();



/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create User
 *     description: Create new User on the server
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The name of the system parameter
 *               email:
 *                 type: string
 *                 description: The value of the system parameter
 *               password:
 *                 type: string
 *                 description: The value of the system parameter
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the creation
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post("/user", checkPermission(claims.createUser), validate(userSchema), create);
/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update User Information
 *     description: Updates the user's username and email based on the provided data.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: this should be a pk or user
 *                 example: 1
 *               username:
 *                 type: string
 *                 description: The username of the user (must be between 3 to 30 characters)
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: john@example.com
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status code of the response
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */

router.put("/user", checkPermission(claims.updateUser), validate(updateUserSchema), update);
/**
 * @swagger
 * /update-user-activation:
 *   put:
 *     summary: Update User Activation Status
 *     description: Updates the activation status of a user based on the provided ID.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The ID of the user
 *                 example: 123
 *               IsActive:
 *                 type: boolean
 *                 description: The activation status of the user (true for active, false for inactive)
 *                 example: true
 *     responses:
 *       200:
 *         description: User activation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Status code of the response
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */

router.put("/update-user-activation", checkPermission(claims.updateUser), validate(userisActivationSchema), maintainUserActivation);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve an ItemOne
 *     description: Get details of an ItemOne. This route requires authentication via a Bearer token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: ItemOne details retrieved successfully
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
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 123
 *                         name:
 *                           type: string
 *                           example: "ItemOne Name"
 *                         docs:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "document1.pdf"
 */
router.get("/users", get);
/**
 * @swagger
 * /users-info:
 *   get:
 *     summary: Retrieve an User
 *     description: Get details of an User. This route requires authentication via a Bearer token.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: User details retrieved successfully
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
 *                     item:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 123
 *                         name:
 *                           type: string
 *                           example: "User Name"
 *                         docs:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "document1.pdf"
 */
router.get("/users-info", _getUserInfo);

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Users permissions
 *     description: 
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User permission successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful permission.
 *                   example: User successfully verified.
 *       400:
 *         description: Invalid request data (e.g., missing or invalid email or OTP).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message explaining the error.
 *                   example: Invalid OTP or email.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was not found.
 *                   example: User not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating server error.
 *                   example: Internal server error.
 *     security:
 *       - bearerAuth: []
 */

router.get("/permissions", _getRolePermissions);

module.exports = router