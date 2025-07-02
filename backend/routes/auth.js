
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/user"); // ✅ Use capital U for model

//sign up
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existUser = await User.findOne({email});
    if(existUser){
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 = salt rounds

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "user sign up successful "});
  } catch (error) {
    res.status(200).json({ message: "Something went wrong (Fill It)" });
  }
});

//sign in
router.post("/signin", async (req, res) => {
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

    res.status(200).json(others); // ✅ includes _id
  } catch (error) {
    console.error("Signin error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;