
import mongoose from "mongoose";

const todoSchema =new  mongoose.Schema(
  {
    text: String,
    complete: { Boolean, default: false },
    userid: String,
  },
  { timeStamps: true },
);

module.exports = mongoose.Schema("Todo", todoSchema);
