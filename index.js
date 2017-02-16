var express = require('express'); // require express module
var request = require('request');
var mongoose = require('mongoose'); // require moongose module
var app = express(); // creatig insatnce of express function
var db = require('./database/db.js');
var routes = require('./routes/get.js'); // create route for index
app.use(db());
app.use('/', routes);
app.listen(8080, function() {
    console.log("Server started at port number: 8080");
});