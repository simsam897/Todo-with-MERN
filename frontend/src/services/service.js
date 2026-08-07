import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
export const fetchTodayTodosService = () => API.get(`/todos/today`);
