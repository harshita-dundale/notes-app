import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  list: [
    {
      type: mongoose.Types.ObjectId,
      ref: "list",
    },
  ],
});

const User = mongoose.model("user", userSchema);
export default User;
