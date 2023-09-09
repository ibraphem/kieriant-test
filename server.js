import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import seedRoutes from "./routes/seedRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import redis from 'redis';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// console.log(process.env);

export const redisClient = redis.createClient();
redisClient.on("connect", () => console.log("Connected to Redis"));
await redisClient.connect();




app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

  app.use("/api/seed", seedRoutes)
  app.use("/api/agent", agentRoutes)
  app.use("/api/transaction", transactionRoutes)

  mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("databaseee errorrrrr", err.message));

const port = process.env.PORT || 6500;
app.listen(port, () => {
  console.log(`serve at http:localhost:${port}`);
});