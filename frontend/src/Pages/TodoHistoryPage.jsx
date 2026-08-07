import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "../Context/TodoContext";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
} from "lucide-react";

const TodoHistoryPage = () => {
  const navigate = useNavigate();
  const { date } = useParams();

  const {
    historyTodos,
    getTodosByDate,
    loading,
  } = useContext(TodoContext);

  useEffect(() => {
    getTodosByDate(date);
  }, [date]);

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const completedTodos = historyTodos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTodos = historyTodos.length - completedTodos;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-xl font-semibold text-blue-700">
            Loading Todos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 pt-24 px-5 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => navigate("/todo")}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Todos
        </button>

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl shadow-xl text-white p-8">

          <div className="flex items-center gap-3">

            <CalendarDays size={36} />

            <h1 className="text-4xl font-bold">
              Todo History
            </h1>

          </div>

          <p className="mt-4 text-blue-100 text-lg">
            All tasks created on
          </p>

          <div className="inline-flex items-center gap-2 mt-4 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full">

            <CalendarDays size={20} />

            <span className="font-semibold">
              {formattedDate}
            </span>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Total Tasks
                </p>

                <h2 className="text-4xl font-bold text-blue-700 mt-2">
                  {historyTodos.length}
                </h2>

              </div>

              <ClipboardList
                size={42}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Completed
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  {completedTodos}
                </h2>

              </div>

              <CheckCircle2
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  Pending
                </p>

                <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                  {pendingTodos}
                </h2>

              </div>

              <CircleDashed
                size={42}
                className="text-yellow-500"
              />

            </div>

          </div>

        </div>

        {/* Todo List */}

        {historyTodos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 mt-8 text-center">

            <ClipboardList
              size={80}
              className="mx-auto text-blue-300"
            />

            <h2 className="text-3xl font-bold text-gray-700 mt-6">
              No Tasks Found
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              No tasks were created on this day.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 mt-8">

            {historyTodos.map((todo, index) => (

              <div
                key={todo._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-blue-300 border-l-8 border-blue-700"
              >

                <div className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">

                  {/* Left Side */}

                  <div className="flex items-start gap-5">

                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold
                      ${todo.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {todo.completed ? "✓" : index + 1}
                    </div>

                    <div>

                      <h2 className="text-2xl font-semibold text-gray-800">
                        {todo.title}
                      </h2>

                      {todo.createdAt && (

                        <div className="flex items-center gap-2 mt-3 text-gray-500">

                          <Clock3 size={18} />

                          <span>
                            {new Date(todo.createdAt).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </span>

                        </div>

                      )}

                    </div>

                  </div>

                  {/* Right Side */}

                  <div className="flex flex-col items-start md:items-end gap-4">

                    <span
                      className={`px-5 py-2 rounded-full font-semibold text-sm
                      ${todo.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {todo.completed
                        ? "✅ Completed"
                        : "⏳ Pending"}
                    </span>

                    <span className="text-gray-400 text-sm">
                      ID: #{todo._id.slice(-6)}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default TodoHistoryPage;