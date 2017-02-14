var express = require('express');
var app = express();
var mongoose = require('mongoose'); 
const crypto = require('crypto');
var async=require('async');
var url = 'mongodb://localhost/userdetail'; //connection url of the database
var conn = mongoose.connect(url); //use the connect method to conenct to the server
var users_schema = mongoose.Schema({
  name:String
}, {
 collection: 'Users',
 strict: false,
});

var usersprofile_schema = mongoose.Schema({
 user_id: String,
 dob: String,
 mobile_no: Number,
}, {
 strict: true,
 collection: 'UsersProfile'
});

var userobject = conn.model('user', users_schema);    // user object
var users_profile = conn.model('userprofile', usersprofile_schema);// user profile object
var password='123';
var hash=crypto.createHash("md5",password).digest('hex');
var record_id=[];
var counter=0;
var record=[{
 "firstname": "saurabh",
 "email":"saurabh@gmail.com",
 "lastname":"kumar",
 "password": hash,
},
{
  "firstname": "saurabh",
  "email":"saurabh@gmail.com",
  "lastname":"kumar",
  "password": hash,
},
{
  "firstname": "saurabh",
  "email":"saurabh@gmail.com",
  "lastname":"kumar",
  "password": hash,
},
{
  "firstname": "saurabh",
  "email":"saurabh@gmail.com",
  "lastname":"kumar",
  "password": hash,
},
{
  "firstname": "saurabh",
  "email":"saurabh@gmail.com",
  "lastname":"kumar",
  "password": hash,
}]


app.get('/', function (req, res) {						//getting the data on browser
async.each(record, processData, function (err){
    if(err){
      res.json(err);
    }else{
    }
   });
res.json("data saved");
});


function processData(record,callback){
	var detail = new userobject(record);
   detail.save(function(err, records)            // data save in database
   {
   	if(err){
   		throw error;
   	} else {
   		var id = records.get('_id');
   		update(id);
   		callback();
   	}
   });
}

function update(item) {             //updating user profile details..
	var details = new users_profile({
		user_id: item,
		dob: "1993-09-18",
		mobile_no: "8585858585"
	});
	details.save(function(err) {
		if (err) {
			console.log(err);
		}
		else{
			return 1;
		}
	});
}

app.listen(3000, function () {
	console.log('Example hello listening on port 3000!')	//listning on port 30000
});