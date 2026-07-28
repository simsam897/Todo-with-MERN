import { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { dates, getTodoDates } = useContext(TodoContext);

  useEffect(() => {
    getTodoDates();
  }, []);

  return (
    <div className="w-64 min-h-screen bg-gray-200 p-4">

      <h2 className="text-xl font-bold mb-4">
        Todo History
      </h2>

      {dates.map((date) => (
        <Link
          key={date}
          to={`/history/${date}`}
          className="block p-2 mb-2 rounded hover:bg-gray-300"
        >
          📅 {date}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;