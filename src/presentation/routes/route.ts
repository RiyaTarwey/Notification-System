import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
const router = express.Router();




const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const emailTemplateRoutes = require("./emailTemplateRoutes");
const itemOneRoutes = require("./itemOneRoutes");
const rolesRoutes = require("./rolesRoutes");
const systemPrefRoutes = require("./systemPrefRoutes");
const notificationRoutes = require("./notificationRoutes");


router.use(authRoutes);
router.use(verifyToken);
router.use(systemPrefRoutes);
router.use(userRoutes);
router.use(emailTemplateRoutes);
router.use(itemOneRoutes);
router.use(rolesRoutes);
router.use(notificationRoutes);






module.exports = router;