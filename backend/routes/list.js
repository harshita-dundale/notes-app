const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

 //Post (ADD/ Create)
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existUser = await User.findById(id);

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newlist = new List({ title, body, user: existUser._id });
    await newlist.save(); // ✅ await here instead of then()

    existUser.list.push(newlist._id);
    await existUser.save();

    return res.status(200).json({ message: "Task added", list: newlist }); // ✅ send single response
  } catch (error) {
    console.error("Add Task Error:", error);
    res.status(500).json({ message: "Failed to add task", error });
  }
});

//updatetask
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;

    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true } // return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Updated", task: updatedTask });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Update failed" });
  }
});


//delete
router.delete("/deletTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;         // ✅ from URL
    const { userId } = req.body;           // ✅ from body

    const existUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: taskId } }
    );

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await List.findByIdAndDelete(taskId);  // ✅ delete task from List

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.log("Delete Task Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});


//get (Read)
router.get("/getTask/:id", async (req, res) => {
  const list = await List.find({user: req.params.id}).sort({createdAt: -1});

  if(list.length !== 0){
    res.status(200).json({list});
  }else{
    res.status(200).json({message: "No Task"});
  }
})
module.exports = router;
