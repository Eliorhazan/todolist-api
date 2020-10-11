const mongoose = require("mongoose");
const TodoModel = require("../models/models.TodoItem");

const Schema = mongoose.Schema;

const userschema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: "Enter Password"
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo"
    },
  ],
});

const UserModel = mongoose.model("User", userschema,'user');
module.exports = UserModel;
