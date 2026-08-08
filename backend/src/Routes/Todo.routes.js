import express from "express";

import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
  toggleTodo,
  getTodoDates,
  getTodosByDate,
  fetchTodayTodos,
} from "../controllers/Todo.controllers.js";

import { verifyToken } from "../Middlewares/Auth.middleware.js";

const router = express.Router();

// Create
router.post("/", verifyToken, addTodo);

// History
router.get("/history", verifyToken, getTodoDates);
router.get("/history/:date", verifyToken, getTodosByDate);

// Today's todos
router.get("/todaystodos", verifyToken, fetchTodayTodos);

// All todos
router.get("/", verifyToken, fetchTodos);

// Update
router.put("/:id", verifyToken, updateTodo);

// Toggle
router.patch("/:id/toggle", verifyToken, toggleTodo);

// Delete
router.delete("/:id", verifyToken, deleteTodo);

export default router;