const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const TodoModel = require("../models/models.TodoItem");


router.use(cookieParser());
router.get("/", (req, res, next) => {
  TodoModel.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error:", err));
});

router.post("/", (req, res) => {
  if (req.body) {
    const text = req.body.text;
    
    const newTodo = new TodoModel({ text: text, isCompleted: false });
    newTodo
      .save()
      .then((data) => res.json(data)) 
      .catch((err) => res.status(400).json("Error:", err));
  } else {
    throw new Error("cant create new todo");
  }
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  const filter = { _id: id };
  TodoModel.findOne(filter, (err, foundObject) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
         
          foundObject.text = req.body.text;

          foundObject.isCompleted = req.body.isCompleted;
        }
        foundObject.save((err, updatedObject) => {
          if (err) {
            res.status(500).send();
          } else {
            TodoModel.find()
            .then((todos) => res.json(todos))
            .catch((err) => res.status(400).json("Error:", err));
          }
        });
      }
    }
  );
});

router.delete('/:id',(req,res)=>{
  let id = req.params.id;
  const filter = { _id: id };
  TodoModel.deleteOne(filter, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }else{
      TodoModel.find()
      .then((todos) => res.json(todos))
      .catch((err) => res.status(400).json("Error:", err));
    }
  });

})

module.exports = router;
