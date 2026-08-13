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
        w-1/4
        md:w-64
        lg:w-72
        shrink-0
        h-full
        bg-white
        border-r
        border-gray-200
        shadow-lg
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* ================= HEADER ================= */}

      <div
        className="
          p-2
          md:p-4
          lg:p-6
          border-b
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          text-white
          shrink-0
        "
      >
        <h2
          className="
            text-xs
            md:text-xl
            lg:text-2xl
            font-bold
            flex
            items-center
            justify-center
            lg:justify-start
            gap-1
            lg:gap-2
          "
        >
          📅
          <span className="hidden lg:inline">Todo History</span>
        </h2>

        <p
          className="
            hidden
            md:block
            text-xs
            lg:text-sm
            text-blue-100
            mt-2
            text-center
            lg:text-left
          "
        >
          Browse your previous tasks
        </p>
      </div>

      {/* ================= HISTORY ================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-1
          md:p-3
          lg:p-4
          space-y-2
        "
      >
        {!dates || dates.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-3xl md:text-4xl lg:text-5xl mb-2">📝</div>

            <p className="text-[9px] md:text-xs lg:text-sm">No history</p>
          </div>
        ) : (
          dates.map((date) => {
            const active = location.pathname === `/history/${date}`;

            return (
              <Link
                key={date}
                to={`/history/${date}`}
                className={`
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-1
                  lg:gap-3
                  p-1.5
                  md:p-2
                  lg:p-4
                  rounded-lg
                  lg:rounded-xl
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-50 hover:bg-blue-50 hover:shadow-md"
                  }
                `}
              >
                {/* Calendar Icon */}

                <div
                  className={`
                    w-7
                    h-7
                    md:w-8
                    md:h-8
                    lg:w-11
                    lg:h-11
                    shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    md:text-xs
                    lg:text-lg
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

                <div
                  className="
                    min-w-0
                    w-full
                    text-center
                    lg:text-left
                  "
                >
                  <p
                    className="
                      font-semibold
                      text-[8px]
                      md:text-[10px]
                      lg:text-sm
                      truncate
                    "
                  >
                    {date}
                  </p>

                  <p
                    className={`
                      text-[7px]
                      md:text-[8px]
                      lg:text-xs
                      truncate
                      ${active ? "text-blue-100" : "text-gray-500"}
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

      {/* ================= FOOTER ================= */}

      <div
        className="
          p-1.5
          md:p-3
          lg:p-4
          border-t
          bg-gray-50
          shrink-0
        "
      >
        <p
          className="
            text-center
            text-[8px]
            md:text-xs
            lg:text-sm
            text-gray-500
          "
        >
          📚 {dates?.length || 0} {dates?.length === 1 ? "Day" : "Days"} Saved
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
