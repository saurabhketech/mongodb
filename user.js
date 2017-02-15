var express=require("express")
var app=express();						//creating instance of express function
var bodyParser=require('body-parser');	// required body-parser module
var mongoose = require('mongoose');
const crypto = require('crypto');		// module for using md5 function
var async = require('async');
var url = 'mongodb://localhost/details'; //connection url of the database
var conn = mongoose.connect(url); //use the connect method to conenct to the server
var users_schema = mongoose.Schema({
name: String
}, {
collection: 'Users',
strict: false,
});

var userobject = conn.model('user', users_schema); // user object
app.use(bodyParser.urlencoded({
extended: true
}));
app.post("/", function (req, res) {			//getting post data from form...
var name=req.body.name;
var email=req.body.email;
var pass=req.body.password;
console.log(name+email+pass);
var password =pass ;
var hash = crypto.createHash("md5", password).digest('hex');
var record = [{
    "firstname": name,
    "email": email,
    "password": hash,
}]

async.each(record, processData, function(err) {
    if (err) {
        res.json(err);
    } else {
    	res.json("data saved");
    }
});

function processData(record, callback) {
var detail = new userobject(record);
detail.save(function(err, records) // data save in database
    {
        if (err) {
            throw error;
        } else {
            var id = records.get('_id');
            callback();
        }
    });
}
}).listen(8080);  //listning at 8080 port