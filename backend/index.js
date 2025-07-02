const express = require("express");
const app = express();
const connectDB = require("./conn/conn.js")
const auth = require("./routes/auth.js")
const list = require("./routes/list.js")
const cors = require("cors");
app.use(cors())
app.use(express.json());

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION 💥", err);
//   process.exit(1);
// });

app.get("/", (req, res) => {
  res.send("hello")
})

connectDB();

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(5000, () => {
  console.log("`🚀 Server running on port 5000");
})