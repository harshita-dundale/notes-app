const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Sign Up
async function createUser(req, res) {
  try {
    const { email, username, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ message: "User sign up successful" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Sign In
async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Please sign up first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// ✅ Register routes with handlers
module.exports = { createUser, loginUser };