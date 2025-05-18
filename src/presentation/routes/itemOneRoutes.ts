import express from "express";
import { validate } from "../middleware/validate";
import { ItemOneSchema } from "../validation/maintianDatavalidation";
import { create, destroy, get, getById, update } from "../controllers/ItemOneController";
import { fileUpload } from "../../helpers/fileManager";
import { claims, fileContants } from "../../utils/constant";
import multer from "multer";
import { checkPermission } from "../middleware/authMiddleware";
const router = express.Router();

const initializefiles = fileUpload(fileContants.Item);
const uploadfiles = multer({
    storage: initializefiles,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB limit per file
    }
});



/**
 * @swagger
 * /ItemOne:
 *   post:
 *     summary: Upload multiple files and create an item
 *     description: Upload documents (max 100) and create an item with a name. Files should be uploaded in the "docs" field.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *                 example: "Item Name"
 *               docs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of document files (up to 100 files)
 *     responses:
 *       200:
 *         description: Item created and files uploaded successfully
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
 *                       example: "Item created and files uploaded successfully"
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
 *       413:
 *         description: Payload too large, file size exceeds the limit
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
 *                       example: "File size exceeds the allowed limit of 10 MB"
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
router.post("/ItemOne", checkPermission(claims.createItemOne), uploadfiles.fields([
    { name: "docs", maxCount: 100 },
]), create);

/**
 * @swagger
 * /ItemOne:
 *   put:
 *     summary: Upload multiple files and update an item
 *     description: Upload documents (max 100) and update an item with a name. Files should be uploaded in the "docs" field.
 *     tags:
 *       - Items
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The id of the item
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: The name of the item
 *                 example: "Item Name"
 *               docs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of document files (up to 100 files)
 *               deletedFiles:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of IDs of files to be deleted
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Item updated and files uploaded successfully
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
 *                       example: "Item updated and files uploaded successfully"
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
 *       413:
 *         description: Payload too large, file size exceeds the limit
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
 *                       example: "File size exceeds the allowed limit of 10 MB"
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
router.put("/ItemOne", checkPermission(claims.updateItemOne), uploadfiles.fields([
    { name: "docs", maxCount: 100 },
]), update);
/**
 * @swagger
 * /get-ItemOne:
 *   post:
 *     summary: Retrieve an ItemOne
 *     description: Get details of an ItemOne. This route requires authentication via a Bearer token.
 *     tags:
 *       - Items
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
 *       400:
 *         description: Bad request or validation error
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
 *                       example: "Validation error or missing parameters"
 *       401:
 *         description: Unauthorized, token not provided or invalid
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
 *                       example: "Token not provided or invalid"
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
router.post("/get-ItemOne", checkPermission(claims.ViewItemOne), get);
/**
 * @swagger
 * /get-ItemOne/{id}:
 *   get:
 *     summary: Retrieve a specific item by ID
 *     description: Get details of a specific item using its ID.
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Item Name"
 *                 description:
 *                   type: string
 *                   example: "This is a sample item"
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */
router.get("/get-ItemOne/:id", checkPermission(claims.ViewItemOne), getById);
/**
 * @swagger
 * /ItemOne/{id}:
 *   delete:
 *     summary: Delete a specific item by ID
 *     description: Delete details of a specific item using its ID.
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the item to retrieve
 *     responses:
 *       200:
 *         description: Successfully deleted item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Item Name"
 *                 description:
 *                   type: string
 *                   example: "This is a sample item"
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []  # Apply JWT token authorization
 */
router.delete("/ItemOne/:id", checkPermission(claims.deleteItemOne), destroy);


module.exports = router