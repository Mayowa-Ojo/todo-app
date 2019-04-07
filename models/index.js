const mongoose = require('mongoose'); 
mongoose.set('debug', true);
mongoose.connect("mongodb://localhost:27017/todo_api", {useNewUrlParser: true});

mongoose.Promise = Promise;

// import the Todo schema from todo.js and export altogether in one line
module.exports.Todo = require("./todo");