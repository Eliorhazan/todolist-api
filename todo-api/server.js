const Todolist = require('./routes/Todolist');
const Users = require('./routes/Users')
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express()
const port = 5000
const uri = 'mongodb+srv://eliordb:archi1989@cluster0.stnem.mongodb.net/tododb?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
const coonection = mongoose.connection;

coonection.once('open',()=>{
    console.log('connection sucessfull');
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/api/todos',Todolist)
app.use('/api/users',Users)
    

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app