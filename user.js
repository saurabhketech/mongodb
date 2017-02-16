var express = require("express");
var app = express(); //creating instance of express module
var bodyParser = require('body-parser'); // required body-parser module
const crypto = require('crypto'); // module for using md5 function
var db = require('./database/db.js');
app.use(db());
app.use(bodyParser.urlencoded({ // getting the data from url
    extended: true
}));
app.post("/", function(req, res) { //getting post data from form...
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var hash = crypto.createHash("md5", pass).digest('hex');
    // console.log(name.length);
    if ((typeof(name&&email&&pass)=="undefined")||(name == "" || email == "" || pass == "")) {
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
                    res.send("data saved");
                }
            });
    }
}).listen(8080); //listning at 8080 port