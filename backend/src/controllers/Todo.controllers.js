import Todo from "../Models/Todo.Model.js";
import User from "../Models/User.Model.js";

// add todo controller
export const addTodo = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("User:", req.user);

    const { title } = req.body;

    const todo = await Todo.create({
      title,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      todo,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//  fetch todo controller
// export const fetchTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({
//       user: req.user.id,
//     });

//     res.status(200).json(todos);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const fetchTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete todo controller
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,

      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the todo exists
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Check if the logged-in user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this todo",
      });
    }

    // Update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo status updated",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTodoDates = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const dates = [
      ...new Set(
        todos.map((todo) => todo.createdAt.toISOString().split("T")[0]),
      ),
    ];

    res.status(200).json(dates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTodosByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const startDate = new Date(date);
    const endDate = new Date(date);

    endDate.setDate(endDate.getDate() + 1);

    const todos = await Todo.find({
      user: req.user.id,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
