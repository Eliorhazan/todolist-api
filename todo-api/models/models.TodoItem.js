const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoschema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  isCompleted: Boolean,
});

const TodoModel = mongoose.model("Todo", todoschema);
module.exports = TodoModel;
