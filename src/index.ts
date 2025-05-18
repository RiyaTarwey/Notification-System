import express, { Request, Response, NextFunction } from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./presentation/middleware/logger";
import { responseHelper } from "./helpers/response";
import swaggerUi from "swagger-ui-express";
import schedule from "node-schedule";

import connectToMongoDB from "./domain/models/mongodb";
import { up } from "./data-access/seeders";
import { initAllConsumers } from "./presentation/kafka/consumer";
import { init } from "./presentation/kafka";
import { intQueues, runningQueue } from "./presentation/queue/worker";
import { monitorQueue } from "./presentation/queue/monitor";

const swaggerSpec = require("../swagger");
const routes = require("./presentation/routes/route");

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", routes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message || "No error stack available");
  const response = responseHelper(0, { message: "Something broke!" }, err.message);
  res.status(500).json(response);
});

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (error: Error) => {
  console.error("Uncaught Exception:", error);
  logger.error("Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  console.error("Unhandled Rejection:", reason);
  logger.error("Unhandled Rejection:", reason as string);
  process.exit(1);
});

// Scheduled tasks
schedule.scheduleJob("* * * * *", () => {
  console.log("This job runs every minute!");
});

schedule.scheduleJob("0 0 * * *", () => {
  console.log("This job runs every day at midnight!");
});

// Seeder execution
const runSeeders = async () => {
  await up();
  console.log("Seed data has been inserted");
};

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  try {
    await connectToMongoDB();
    await runSeeders();
    await intQueues();
    await monitorQueue();
    await initAllConsumers();
    // await init(); // Uncomment if Kafka producer is needed
  } catch (error) {
    console.error("Unable to connect to services:", error);
    logger.error("Unable to connect to services: " + error);
  }
});

export default app;
