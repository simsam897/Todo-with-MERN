import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { timeStamps: true },
);

module.exports = mongoose.model("User", userSchema);
