const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title:{type: String, requires: true},
  body :{type: String, requires: true},
  user : [{
    type: mongoose.Types.ObjectId, ref : "user",
  },],
},
{timestamps : true}
);

module.exports = mongoose.model("list", listSchema);