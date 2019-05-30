const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  imagePath: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Task", TaskSchema);
