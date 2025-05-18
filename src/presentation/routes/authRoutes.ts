import express from "express";
import { create, verify } from "../controllers/UserController";
import { create as createJob } from "../controllers/NotificationController";
import { validate } from "../middleware/validate";
import { userLoginSchema, userSchema, userVerificationSchema } from "../validation/maintianDatavalidation";
import { _getRolePermissions, registration, userLogin } from "../controllers/AuthController";
const router = express.Router();

/**
 * @swagger
 * /auth-login:
 *   post:
 *     summary: User Login
 *     description: Authenticate a user with their email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       400:
 *         description: Invalid request data or validation error.
 *       401:
 *         description: Unauthorized, incorrect email or password.
 *       500:
 *         description: Internal server error.
 */

router.post("/auth-login", validate(userLoginSchema), userLogin);

/**
 * @swagger
 * /auth-register:
 *   post:
 *     summary: Create User
 *     description: Create new User on the server
 *     tags: [Auth]
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
router.post("/auth-register", validate(userSchema), registration);
/**
 * @swagger
 * /auth-otp-verification:
 *   post:
 *     summary: Verify user with OTP
 *     description: This endpoint verifies the user by matching the provided OTP with the user's email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: user@example.com
 *               otp:
 *                 type: integer
 *                 description: The one-time password sent to the user's email.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User verification successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful verification.
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
 */

router.post("/auth-otp-verification", validate(userVerificationSchema), verify);

module.exports = router