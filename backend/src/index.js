import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { DB_NAME } from "./constants.js";
import UserRoutes from "../src/Routes/User.routes.js";
import TodoRoutes from "./Routes/Todo.routes.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowOrigin = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
  }),
);

// MongoDB connection
mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/user", UserRoutes);
app.use("/api/todos", TodoRoutes);

app.listen(port, () => console.log(`Server running at ${port}`));
