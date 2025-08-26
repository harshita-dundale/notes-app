import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No authorization header provided." });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid authorization format. Use Bearer token." });
    }

    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token format." });
    }
    
    return res.status(401).json({ message: "Token verification failed." });
  }
};