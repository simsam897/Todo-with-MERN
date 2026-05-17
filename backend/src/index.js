import dotenv, { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { DB_NAME } from "./constants.js";
const app = express();

dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cors());

mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
const port = process.env.PORT;
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(5000, () => console.log("Server running at ${port}"));
