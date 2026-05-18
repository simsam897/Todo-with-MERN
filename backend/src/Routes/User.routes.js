import express from "express";
import { signup } from "../controllers/User.controllers.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
