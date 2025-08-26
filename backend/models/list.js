import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user: {
    type: mongoose.Types.ObjectId, 
    ref: "user",
    required: true
  }
}, { timestamps: true });

const List = mongoose.model("list", listSchema);
export default List;