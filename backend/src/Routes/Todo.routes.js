import express from "express";
import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
  toggleTodo,
  getTodoDates,
  getTodosByDate,
} from "../controllers/Todo.controllers.js";

import { verifyToken } from "../Middlewares/Auth.middewares.js";

const router = express.Router();

router.post("/", verifyToken, addTodo);

// History routes FIRST
router.get("/history", verifyToken, getTodoDates);
router.get("/history/:date", verifyToken, getTodosByDate);

// General routes AFTER
router.get("/", verifyToken, fetchTodos);
router.put("/:id", verifyToken, updateTodo);
router.patch("/:id/toggle", verifyToken, toggleTodo);
router.delete("/:id", verifyToken, deleteTodo);

export default router;
