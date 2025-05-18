import express from "express";
import { validate } from "../middleware/validate";
import { EmailConfSystemPrefSchema, NotificationPrefSchema, TwilioPrefSchema, updateUserSchema, userisActivationSchema, userSchema, userVerificationSchema } from "../validation/maintianDatavalidation";
import { checkPermission } from "../middleware/authMiddleware";
import { claims } from "../../utils/constant";
import { get, getTypes, update } from "../controllers/SystemPreferences";
const router = express.Router();



/**
 * @swagger
 * /email-configurations:
 *   put:
 *     summary: Email Configurations
 *     description: Create new User on the server
 *     tags: [System-Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 description: The service of the email (smtp) configurations
 *               host:
 *                 type: string
 *                 description: The host of the email (smtp) configurations
 *               port:
 *                 type: number
 *                 description: The port of the email (smtp) configurations
 *               secure:
 *                 type: string
 *                 description: The secure type of the email (smtp) configurations
 *               user:
 *                 type: string
 *                 description: The user of the email (smtp) configurations
 *               pass:
 *                 type: string
 *                 description: The pass of the email (smtp) configurations
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       201:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the update
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

// checkPermission(claims.createUser),
router.put("/email-configurations",checkPermission(claims.updateCongigurations), validate(EmailConfSystemPrefSchema), update);
/**
 * @swagger
 * /notification-preferences:
 *   put:
 *     summary: Notification Preferences
 *     description: Create new User on the server
 *     tags: [System-Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: boolean
 *                 description: The service of the notification preferences
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       201:
 *         description: updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the update
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.put("/notification-preferences",checkPermission(claims.updateCongigurations),validate(NotificationPrefSchema), update);
/**
 * @swagger
 * /twillo-sms-configurations:
 *   put:
 *     summary: Update Twilio SMS Configurations
 *     description: Update Twilio SMS configuration settings for the application.
 *     tags: [System-Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountSid:
 *                 type: string
 *                 description: Twilio account SID
 *                 example: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *               authToken:
 *                 type: string
 *                 description: Twilio authentication token
 *                 example: your_auth_token
 *               fromPhone:
 *                 type: string
 *                 description: Twilio phone number in international format
 *                 example: +1234567890
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: Twilio configuration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the update
 *                   example: Twilio configuration updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.put("/twillo-sms-configurations",checkPermission(claims.updateCongigurations),validate(TwilioPrefSchema), update);
/**
 * @swagger
 * /system-preferences:
 *   get:
 *     summary: Retrieve an preferences
 *     description: Get details of an preferences. This route requires authentication via a Bearer token.
 *     tags:
 *       - System-Preferences
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     responses:
 *       200:
 *         description: preferences details retrieved successfully
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
 */
router.get("/system-preferences", get);
/**
 * @swagger
 * /system-preferences-types:
 *   get:
 *     summary: Retrieve an ItemOne
 *     description: Get details of an ItemOne. This route requires authentication via a Bearer token.
 *     tags:
 *       - System-Preferences
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
 */
router.get("/system-preferences-types", getTypes);

module.exports = router