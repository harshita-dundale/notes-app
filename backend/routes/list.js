import express from "express";
import { addTask, updateTask, deleteTask, getTask } from "../controllers/listController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
 //Post (ADD/ Create)
router.post("/addTask", verifyToken, addTask);
router.put("/updateTask/:id", verifyToken, updateTask);
router.delete("/deleteTask/:taskId", verifyToken, deleteTask);
router.get("/getTask/:id", verifyToken, getTask);

export default router;