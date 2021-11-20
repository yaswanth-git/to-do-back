const mongoose = require("mongoose");
const Tasks = new mongoose.Schema({
  text: {
    type: String,
  },
});
module.exports = mongoose.model("tasks", Tasks);
