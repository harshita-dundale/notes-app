// import bcrypt from "bcryptjs";
// import User from "../models/user.js";

// export async function createUser(req, res) {
//   try {
//     const { email, username, password } = req.body;

//     const existUser = await User.findOne({ email });
//     if (existUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const newUser = new User({ email, username, password: hashedPassword });

//     await newUser.save();
//     return res.status(201).json({ message: "User sign up successful" }); // ✅
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }


// export async function loginUser(req, res) {
//   try {
//     console.log("Login called");
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       console.log("User not found for email:", req.body.email); // 👈
//       return res.status(404).json({ message: "Please sign up first" });
//     }

//     const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (error) {
//     console.error("Signin error:", error.message);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// }


import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

// POST /api/v1/register
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    
    return res.status(201).json({ 
      message: "User registered successfully"
    });
  } catch (error) {
    console.error("Signup Error:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Invalid data provided", error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/v1/signin
// authController.js
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ 
      message: "Login successful", 
      token,
      user: { id: existingUser._id, username: existingUser.username, email: existingUser.email }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
