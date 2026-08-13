import { useContext, useEffect, useMemo, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import Sidebar from "../components/SideBar";

import {
  Search,
  Plus,
  ClipboardList,
  CircleCheckBig,
  Circle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const Todo = () => {
  const {
    todos,
    addTodo,
    fetchTodos,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
  } = useContext(TodoContext);

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTodo(title);
    setTitle("");
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await updateTodo(editingId, editTitle);

    setEditingId(null);
    setEditTitle("");
  };

  const today = new Date().toISOString().split("T")[0];

  // Only today's todos
  const todayTodos = useMemo(() => {
    return todos.filter((todo) => {
      const todoDate = new Date(todo.createdAt)
        .toISOString()
        .split("T")[0];

      return todoDate === today;
    });
  }, [todos, today]);

  // Search only today's todos
  const filteredTodos = useMemo(() => {
    return todayTodos.filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [todayTodos, search]);

  // Statistics
  const completed = todayTodos.filter(
    (todo) => todo.completed
  ).length;

  const pending = todayTodos.length - completed;

  const progress =
    todayTodos.length === 0
      ? 0
      : Math.round(
        (completed / todayTodos.length) * 100
      );

  return (
    /*
      IMPORTANT:

      Navbar is 64px tall.
      The area below navbar gets exactly:
      calc(100vh - 64px)

      Main content scrolls independently.
      Sidebar stays full height.
    */
    <div className="h-[calc(100vh-64px)] mt-16 overflow-hidden bg-gray-100">

      <div className="flex h-full overflow-hidden">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto">

          <div className="p-4 sm:p-6 md:p-8">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl shadow-xl p-6 md:p-8 text-white">

              <h1 className="text-2xl md:text-4xl font-bold">
                Manage Your Daily Tasks
              </h1>

              <p className="mt-3 text-blue-100 text-sm md:text-lg">
                Stay organized, stay focused, and accomplish more every day.
              </p>

            </div>

            {/* ================= STATISTICS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">

              {/* Total */}
              <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Total Tasks
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mt-2">
                      {todayTodos.length}
                    </h2>
                  </div>

                  <ClipboardList
                    size={40}
                    className="text-blue-700"
                  />

                </div>

              </div>

              {/* Completed */}
              <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Completed
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mt-2">
                      {completed}
                    </h2>
                  </div>

                  <CheckCircle2
                    size={40}
                    className="text-green-600"
                  />

                </div>

              </div>

              {/* Pending */}
              <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500">
                      Pending
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mt-2">
                      {pending}
                    </h2>
                  </div>

                  <Clock3
                    size={40}
                    className="text-yellow-500"
                  />

                </div>

              </div>

            </div>

            {/* ================= PROGRESS ================= */}
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mt-6 md:mt-8">

              <div className="flex justify-between">

                <h2 className="font-semibold text-lg">
                  Progress
                </h2>

                <span className="font-bold text-blue-700">
                  {progress}%
                </span>

              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full mt-4">

                <div
                  className="bg-blue-700 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            {/* ================= SEARCH ================= */}
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mt-6 md:mt-8">

              <div className="relative">

                <Search
                  size={20}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search your todos..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:border-blue-600"
                />

              </div>

            </div>

            {/* ================= ADD TODO ================= */}
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mt-6 md:mt-8">

              <h2 className="text-xl md:text-2xl font-bold text-blue-700">
                Add New Task
              </h2>

              <p className="text-gray-500 mt-2">
                What would you like to accomplish today?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <input
                  type="text"
                  placeholder="Enter your task..."
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="flex-1 border rounded-xl px-5 py-3 focus:outline-none focus:border-blue-600"
                />

                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-white font-semibold transition"
                >
                  <Plus size={20} />
                  Add
                </button>

              </div>

            </div>

            {/* ================= TODO LIST ================= */}
            {filteredTodos.length === 0 ? (

              <div className="bg-white rounded-2xl shadow-lg p-10 md:p-16 mt-6 md:mt-8 text-center">

                <ClipboardList
                  size={70}
                  className="mx-auto text-blue-300"
                />

                <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mt-6">
                  No Tasks Found
                </h2>

                <p className="text-gray-500 mt-3">
                  {search
                    ? "No todos match your search."
                    : "Start by creating your first task."}
                </p>

              </div>

            ) : (

              <div className="space-y-6 mt-6 md:mt-8">

                {filteredTodos.map((todo) => (

                  <div
                    key={todo._id}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 ${todo.completed
                        ? "border-green-500"
                        : "border-blue-700"
                      }`}
                  >

                    <div className="p-5 md:p-6 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                      {/* Left Section */}
                      <div className="flex items-start gap-4 md:gap-5">

                        <button
                          onClick={() =>
                            toggleTodoComplete(todo._id)
                          }
                          className="mt-1 shrink-0"
                        >

                          {todo.completed ? (
                            <CircleCheckBig
                              size={30}
                              className="text-green-600"
                            />
                          ) : (
                            <Circle
                              size={30}
                              className="text-gray-400 hover:text-blue-600 transition"
                            />
                          )}

                        </button>

                        <div className="min-w-0">

                          {editingId === todo._id ? (

                            <input
                              value={editTitle}
                              onChange={(e) =>
                                setEditTitle(e.target.value)
                              }
                              className="border-2 border-blue-300 rounded-xl px-4 py-2 w-full lg:w-[400px] focus:outline-none focus:border-blue-600"
                            />

                          ) : (

                            <>
                              <h2
                                className={`text-xl md:text-2xl font-semibold break-words ${todo.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-800"
                                  }`}
                              >
                                {todo.title}
                              </h2>

                              {todo.createdAt && (
                                <p className="text-gray-500 mt-2 text-sm">
                                  Created:{" "}
                                  {new Date(
                                    todo.createdAt
                                  ).toLocaleString(
                                    "en-IN",
                                    {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }
                                  )}
                                </p>
                              )}
                            </>

                          )}

                        </div>

                      </div>

                      {/* Right Section */}
                      <div className="flex flex-wrap gap-3 items-center">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${todo.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {todo.completed
                            ? "Completed"
                            : "Pending"}
                        </span>

                        {editingId === todo._id ? (

                          <button
                            onClick={handleSave}
                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition"
                          >
                            Save
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              handleEdit(todo)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl font-medium transition"
                          >
                            Update
                          </button>

                        )}

                        <button
                          onClick={() =>
                            deleteTodo(todo._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </main>

      </div>
    </div>
  );
};

export default Todo;