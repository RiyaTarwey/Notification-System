import express from "express";
import { validate } from "../middleware/validate";
import { emailTemplateSchema } from "../validation/maintianDatavalidation";
import { create, get, getById, update } from "../controllers/EmailTemplateController";
const router = express.Router();

/**
 * @swagger
 * /email-template:
 *   post:
 *     summary: Create a new email template
 *     description: Endpoint to create a new email template with the required fields (typeId, content, and subject).
 *     tags:
 *       - Email Templates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeId:
 *                 type: integer
 *                 description: Type ID of the email template.
 *                 example: 1
 *               content:
 *                 type: string
 *                 description: Content of the email template.
 *                 example: "Welcome to our platform!"
 *               subject:
 *                 type: string
 *                 description: Subject of the email template.
 *                 example: "Welcome Email"
 *             required:
 *               - typeId
 *               - content
 *               - subject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email template created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email template created successfully
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 */

router.post("/email-template", validate(emailTemplateSchema), create);
/**
 * @swagger
 * /email-template:
 *   put:
 *     summary: update a new email template
 *     description: Endpoint to update a new email template with the required fields (typeId, content, and subject).
 *     tags:
 *       - Email Templates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeId:
 *                 type: integer
 *                 description: Type ID of the email template.
 *                 example: 1
 *               content:
 *                 type: string
 *                 description: Content of the email template.
 *                 example: "Welcome to our platform!"
 *               subject:
 *                 type: string
 *                 description: Subject of the email template.
 *                 example: "Welcome Email"
 *             required:
 *               - typeId
 *               - content
 *               - subject
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email template updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email template updated successfully
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 */

router.put("/email-template", validate(emailTemplateSchema), update);

/**
 * @swagger
 * /get-email-template:
 *   post:
 *     summary: Retrieve email template by criteria
 *     description: Endpoint to retrieve an email template based on specific criteria.
 *     tags:
 *       - Email Templates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeId:
 *                 type: integer
 *                 description: Type ID of the email template.
 *                 example: 1
 *               subject:
 *                 type: string
 *                 description: Subject of the email template (optional).
 *                 example: "Welcome Email"
 *             required:
 *               - typeId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email template retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     typeId:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Welcome to our platform!"
 *                     subject:
 *                       type: string
 *                       example: "Welcome Email"
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validation error
 */

router.post("/get-email-template", get);

/**
 * @swagger
 * /get-email-template/{id}:
 *   get:
 *     summary: Retrieve an email template by ID
 *     description: Endpoint to retrieve a specific email template using its unique ID.
 *     tags:
 *       - Email Templates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the email template to retrieve.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email template retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     typeId:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Welcome to our platform!"
 *                     subject:
 *                       type: string
 *                       example: "Welcome Email"
 *       404:
 *         description: Email template not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email template not found
 */

router.get("/get-email-template/:id", getById);

module.exports = router