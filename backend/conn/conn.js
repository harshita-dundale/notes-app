const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://harshuprajapati14:harshu1122@cluster0.qmsvcjh.mongodb.net/test?retryWrites=true&w=majority");
//"mongodb+srv://harshuprajapati14:<db_password>@cluster0.qmsvcjh.mongodb.net/"
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
