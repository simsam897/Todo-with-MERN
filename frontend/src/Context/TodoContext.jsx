import { createContext, useState } from "react";
import { createTodo, updateTodo as updateTodoAPI, toggleComplete as toggleCompleteAPI } from "../services/service";
import {
  deleteTodo as deleteTodoService,
} from "../services/service";
import {
  fetchTodos as fetchTodosService, fetchTodoDates,
  fetchTodosByDate,
} from "../services/service";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [dates, setDates] = useState([]);
  const [historyTodos, setHistoryTodos] = useState([]);

  // Fetch Todos
  const fetchTodos = async () => {
    try {
      const res = await fetchTodosService();
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Todo
  const addTodo = async (title) => {
    try {
      const res = await createTodo({ title });

      setTodos((prev) => [...prev, res.data.todo]);
    } catch (error) {
      console.log(error);
    }
  };




  const updateTodo = async (id, title) => {
    try {
      const res = await updateTodoAPI(id, { title });

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? res.data.todo : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };


  const toggleTodoComplete = async (id) => {
    try {
      const res = await toggleCompleteAPI(id);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? res.data.todo : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };


  const getTodoDates = async () => {
    try {
      const res = await fetchTodoDates();
      setDates(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const getTodosByDate = async (date) => {
    try {
      const res = await fetchTodosByDate(date);
      setHistoryTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  // delete todo
  const deleteTodo = async (todoId) => {
    try {

      await deleteTodoService(todoId);

      setTodos(prev =>
        prev.filter(todo => todo._id !== todoId)
      );

    } catch (error) {
      console.log(error);
    }
  };


  const fetchTodayTodos = async () => {
    const res = await fetchTodayTodosService();
    setTodos(res.data);
  };






  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        fetchTodayTodos,
        updateTodo,
        toggleTodoComplete,
        getTodoDates,
        getTodosByDate,
        fetchTodos,
        dates,
        historyTodos


      }}
    >
      {children}
    </TodoContext.Provider>
  );

};
export default TodoProvider;