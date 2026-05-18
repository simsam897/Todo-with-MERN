import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { DB_NAME } from "./constants.js";
import UserRoutes from "../src/Routes/User.routes.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/User", UserRoutes);

app.listen(port, () => console.log(`Server running at ${port}`));
