var mongoose = require('mongoose'); 
const crypto = require('crypto');
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
//console.log(hash);          
var conn = mongoose.createConnection(url, function(error, db) {
 if (error) {
   console.log("Unabel to connect to mongo server ERROR");
 } else {
   console.log("Connection succesfull");
   var detail = new userobject(
     [{
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
    }
  ]);
   detail.save(function(err, records)            // data save in database
   {
     if(err){
       throw error;
     } else {
       var id = records.get('_id');
       //console.log(id);
       update(id);
     }
   });
 }
});

function update(userid) {             //updating user profile details..
 var details = new users_profile({
   user_id: userid,
   dob: "1993-09-18",
   mobile_no: "8585858585"
 });
 details.save(function(err) {
   if (err) {
     console.log(err);
     process.exit();
   }
 });
}