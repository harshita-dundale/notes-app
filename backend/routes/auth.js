import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", loginUser);     // /api/v1/signin ✅ REQUIRED


export default router;
