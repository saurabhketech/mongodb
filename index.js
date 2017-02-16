var express = require('express'); // require express module
var bodyParser = require('body-parser'); // required bodyParsar module
var mongoose =require('mongoose');// require moongose module
var app = express(); // creatig insatnce of express function
var db =require('./database/db.js');
var routes = require('./routes/get.js'); // create route for index

app.use(bodyParser.urlencoded({ extended: true }));  // urlencoded within bodyParsar , extract data from <form> element
app.use(db());
app.use('/', routes);


app.listen(8080, function() {
	console.log("Server started at port number: 8080");
});