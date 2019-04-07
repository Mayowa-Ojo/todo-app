const express = require('express');
const chalk = require('chalk');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const log = console.log;
const todoRoutes = require('./routes/todos')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
// tell our app to use the routes in todds.js
// also predefining /api/todos/ since its present in all routes
app.use('/api/todos', todoRoutes);

// Routes
app.get("/", function(req, res){
    res.send("Hello world");
});



// Port
app.listen(port, function(){
    log("Serving todo API");
});
