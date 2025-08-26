import User from "../models/user.js";
import List from "../models/list.js"; 

export async function addTask (req, res) {
  try {
    const { title, body, id } = req.body;
    
    if (!title || !body || !id) {
      return res.status(400).json({ message: "Title, body, and user ID are required" });
    }

    const existUser = await User.findById(id);
    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newlist = new List({ title, body, user: existUser._id });
    await newlist.save();

    existUser.list.push(newlist._id);
    await existUser.save();

    return res.status(200).json({ message: "Task added", list: newlist });
  } catch (error) {
    console.error("Add Task Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid data provided", error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Failed to add task" });
  }
}

export async function updateTask (req, res) {
  try {
    const { title, body, userId } = req.body;
    const { id } = req.params;

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if task exists and belongs to user
    const existingTask = await List.findOne({ _id: id, user: userId });
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    const updatedTask = await List.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Task Updated", task: updatedTask });
  } catch (error) {
    console.error("Update error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid data provided", error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    res.status(500).json({ message: "Update failed" });
  }
}

export async function deleteTask (req, res) {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if task exists and belongs to user
    const task = await List.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    // Use transaction to ensure both operations succeed
    const existUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { list: taskId } }
    );

    if (!existUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only delete task if user update succeeded
    await List.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: "Delete failed" });
  }
}
export async function getTask (req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Remove unnecessary user check - just fetch tasks directly
    const list = await List.find({ user: id }).sort({ createdAt: -1 });

    if (list.length > 0) {
      res.status(200).json({ list });
    } else {
      res.status(200).json({ message: "No tasks found", list: [] });
    }
  } catch (error) {
    console.error("Get Task Error:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
} 