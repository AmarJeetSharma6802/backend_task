import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",   
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
