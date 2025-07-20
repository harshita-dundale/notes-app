const express = require("express");
const router = express.Router();

// ✅ Import controller functions
const { createUser, loginUser } = require("../controllers/authController");

// ✅ Register routes with handler functions
router.post("/register", createUser);
router.post("/signin", loginUser);

module.exports = router;
