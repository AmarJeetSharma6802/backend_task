import Task from "../model/task.model.js"


const CreateTask = async(req,res)=>{

    const {title ,description} = req.body

    if(!title ||!title){
           return res.status(404).json({ message: "All fields are required" });
    }

    const task = await Task.create({
        user: req.user.id, 
        title,
        description
    })

    return res.status(201).json({ message: "Task create successfully",task });
}

const updateTaks = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    let updateTaks = { title, description };

   const uptTask = await Task.findOneAndUpdate(
  { _id: id, user: req.user.id },
  updateTaks,
  { new: true }
);

    if (!uptTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: uptTask,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {

     const { id } = req.params;

   const deletedTask = await Task.findOneAndDelete({
  _id: id,
  user: req.user.id,
});

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

      return res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
}

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export {
    CreateTask,
    updateTaks,
    deleteTask
    ,getTask
}