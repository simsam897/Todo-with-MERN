import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const createTodo = (todoData) => API.post("/todos", todoData);

export const fetchTodos = () => API.get("/todos");

export const deleteTodo = (todoId) => API.delete(`/todos/${todoId}`);

export const updateTodo = (todoId, data) => API.put(`/todos/${todoId}`, data);

export const toggleComplete = (todoId) => API.patch(`/todos/${todoId}/toggle`);
export default API;

export const fetchTodoDates = () => API.get("/todos/history");

export const fetchTodosByDate = (date) => API.get(`/todos/history/${date}`);
