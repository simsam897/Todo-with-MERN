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
    <aside
      className="
        w-48
        sm:w-56
        md:w-72
        shrink-0
        h-full
        bg-white
        border-r
        border-gray-200
        shadow-lg
        flex
        flex-col
      "
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0">
        <h2 className="text-lg md:text-2xl font-bold flex items-center gap-2">
          📅
          <span className="hidden sm:inline">
            Todo History
          </span>
        </h2>

        <p className="hidden md:block text-sm text-blue-100 mt-2">
          Browse your previous tasks
        </p>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-3">
        {!dates || dates.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <div className="text-4xl md:text-5xl mb-3">
              📝
            </div>

            <p className="text-xs md:text-sm">
              No history available
            </p>
          </div>
        ) : (
          dates.map((date) => {
            const active =
              location.pathname === `/history/${date}`;

            return (
              <Link
                key={date}
                to={`/history/${date}`}
                className={`
                  flex
                  items-center
                  gap-2
                  md:gap-3
                  p-2
                  md:p-4
                  rounded-xl
                  transition-all
                  duration-300
                  group
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-50 hover:bg-blue-50 hover:shadow-md"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-8
                    h-8
                    md:w-11
                    md:h-11
                    shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-sm
                    md:text-lg
                    ${
                      active
                        ? "bg-white text-blue-600"
                        : "bg-blue-100 text-blue-600"
                    }
                  `}
                >
                  📅
                </div>

                {/* Date */}
                <div className="min-w-0">
                  <p className="font-semibold text-xs md:text-sm truncate">
                    {date}
                  </p>

                  <p
                    className={`
                      text-[9px]
                      md:text-xs
                      ${
                        active
                          ? "text-blue-100"
                          : "text-gray-500"
                      }
                    `}
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
      <div className="p-2 md:p-4 border-t bg-gray-50 shrink-0">
        <p className="text-center text-[10px] md:text-sm text-gray-500">
          📚 {dates?.length || 0}{" "}
          {dates?.length === 1 ? "Day" : "Days"} Saved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;