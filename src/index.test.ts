import express, { Request, Response, NextFunction } from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./presentation/middleware/logger";
import { responseHelper } from "./helpers/response";
// import postgressDb from "./domain/sql/models/index";

const swaggerSpec = require("../swagger");
import swaggerUi from 'swagger-ui-express';
// import { defineAssociations } from "./domain/sql/associations/Association";
import schedule from 'node-schedule';
import connectToMongoDB from "./domain/models/mongodb";
import { up } from "./data-access/seeders";
import { initAllConsumers } from "./presentation/kafka/consumer";
import { init } from "./presentation/kafka";
import { intQueues, runningQueue } from "./presentation/queue/worker";
import { monitorQueue } from "./presentation/queue/monitor";


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
app.use(session({
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false
}));
// app.use(`/api/v1/`, partialRoutes);
app.use(`/`, routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message || 'No error stack available');
  let response = responseHelper(0, { message: "Something broke!" }, err.message)
  res.status(500).json(response)
});

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  logger.error("Unhandled Rejection:", reason);
  process.exit(1);
});

// Schedule tasks
const minWiseJob = schedule.scheduleJob('* * * * *', () => {
  console.log("This job runs every minute!");
  // Add your logic here
});

const dailyJob = schedule.scheduleJob('0 0 * * *', () => {
  console.log("This job runs every day at midnight!");
});
// // Seeder execution
const runSeeders = async () => {
  // const queryInterface = sequelize.getQueryInterface();
  // await seedData.up(queryInterface, sequelize);
  await up();
  console.log('Seed data has been inserted');
};

// Start server
const PORT = 6000;
const server = app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  try {
    await connectToMongoDB();
    // await runSeeders();
    // await init()
    // await intQueues();
    // await monitorQueue();
    // await initAllConsumers();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    logger.error("Unable to connect to the database:" + error);
  }
});
export default app;
export { server }; 
