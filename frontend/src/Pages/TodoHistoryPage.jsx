import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TodoContext } from "../Context/TodoContext";

const TodoHistoryPage = () => {
  const { date } = useParams();

  const {
    historyTodos,
    getTodosByDate,
  } = useContext(TodoContext);

  useEffect(() => {
    getTodosByDate(date);
  }, [date]);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">
        Todos of {date}
      </h1>

      {historyTodos.length === 0 ? (
        <p>No Todos Found</p>
      ) : (
        historyTodos.map((todo) => (
          <div
            key={todo._id}
            className="border p-3 rounded mb-3"
          >
            <h2>{todo.title}</h2>
          </div>
        ))
      )}

    </div>
  );
};

export default TodoHistoryPage;