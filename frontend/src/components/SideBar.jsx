

import { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { dates, getTodoDates } = useContext(TodoContext);
  const location = useLocation();

  useEffect(() => {
    getTodoDates();
  }, []);

  return (
    <aside className="w-72 bg-white border-r border-gray-200 shadow-lg sticky top-16 h-[calc(100vh-64px)] flex flex-col">

      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          📅 Todo History
        </h2>

        <p className="text-sm text-blue-100 mt-2">
          Browse your previous tasks
        </p>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {dates.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <div className="text-5xl mb-3">📝</div>

            <p>No history available</p>
          </div>
        ) : (
          dates.map((date) => {
            const active = location.pathname === `/history/${date}`;

            return (
              <Link
                key={date}
                to={`/history/${date}`}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group
                  ${active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-50 hover:bg-blue-50 hover:shadow-md"
                  }`}
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-lg
                    ${active
                      ? "bg-white text-blue-600"
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  📅
                </div>

                <div>
                  <p className="font-semibold">{date}</p>

                  <p
                    className={`text-xs ${active
                      ? "text-blue-100"
                      : "text-gray-500"
                      }`}
                  >
                    View Todos
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-center text-sm text-gray-500">
          📚 {dates.length} {dates.length === 1 ? "Day" : "Days"} Saved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;