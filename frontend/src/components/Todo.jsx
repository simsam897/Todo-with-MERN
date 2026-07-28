import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../Context/TodoContext";
import Sidebar from "./SideBar";



const Todo = () => {
  const { todos, addTodo, fetchTodos, updateTodo, deleteTodo, toggleTodoComplete } = useContext(TodoContext);

  const [title, setTitle] = useState("");
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



  return (
    <div className="min-h-screen bg-gray-100 flex justify-start items-center">

      <div className="mt-0">
        <Sidebar /></div>


      <div className="w-full max-w-4xl  bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📝 Todo App
        </h1>


        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter a todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No todos added yet.
          </p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 shadow"
            >
              {
                editingId === todo._id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border rounded px-2 py-1 w-80"
                  />
                ) : (
                  <p className="text-lg">{todo.title}</p>
                )
              }

              <div className="flex items-center gap-3">
                {
                  editingId === todo._id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 px-4 py-2 rounded text-white"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-yellow-400 px-4 py-2 rounded text-white"
                    >
                      Update
                    </button>
                  )
                }
                <button className="bg-red-500 px-4 py-2 rounded text-white" onClick={() => deleteTodo(todo._id)}>
                  Delete
                </button>

                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  checked={todo.completed}
                  onChange={() => toggleTodoComplete(todo._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;