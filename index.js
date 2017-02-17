var express = require('express'); // require express module
var request = require('request');
var mongoose = require('mongoose'); // require moongose module
var app = express(); // creatig insatnce of express function
var bodyParser = require('body-parser'); // required body-parser module
const crypto = require('crypto'); // module for using md5 function
var db = require('./database/db.js');
var routes = require('./routes/get.js'); // create route for index
app.use(db());
app.use(bodyParser.urlencoded({ // getting the data from url
    extended: true
}));
app.use('/', routes);
app.post("/", function(req, res) { //getting post data from form...
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var hash = crypto.createHash("md5", pass).digest('hex');
    // console.log(typeof(name));
    if (!(name && email && pass)) {
        res.send("some fields are missing");
    } else {
        var detail = new req.object({
            "firstname": name,
            "email": email,
            "password": hash,
        });
        detail.save(function(err, records) // data save in database
            {
                if (err) {
                    res.json(err);
                } else {
                    res.json("data saved");
                }
            });
    }
});


app.listen(8080, function() {
    console.log("Server started at port number: 8080");
});