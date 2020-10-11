const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const UserModel = require("../models/models.users");
const Todolist = require("./Todolist");
const TodoModel = require("../models/models.TodoItem");

router.use(cookieParser());

router.get("/", (req, res) => {
  TodoModel.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error:", err));
});
router.get("/todos", (req, res) => {
  UserModel.find({})
    .select()
    .populate('todos')
    .exec()
    .then((docs) => res.json({
        todos:docs.map(doc=>{
            return{
                _id:doc._id,
                text:doc.text,
                isCompleted:doc.isCompleted
            }
        })
    }));
});
router.post("/todo", (req, res) => {

//   user.save(err =>{
//       if(err) return err;
//       const newtodo = new TodoModel({
//         _id: new mongoose.Types.ObjectId(),
//         text: "new todo",
//         isCompleted: false,
//       });
//       user.todos.push(newtodo);
//   })

//   user.todos.push(newtodo);
//   user.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   });
 
});

  


module.exports = router;
