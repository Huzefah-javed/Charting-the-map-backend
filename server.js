import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mainRouter } from "./router/main.router.js";
import { error } from "./middlewares/error.js";
import { client } from "./config/redis.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(mainRouter);
app.use(error);

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("db connects......");
  await client.connect();
  console.log("redis connects......");
  app.listen(process.env.PORT, () => {
    console.log("server runs....", process.env.PORT);
  });
} catch (error) {
  console.log("Error happens in server or database connection");
}
