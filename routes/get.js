var express = require('express'); // require express module
var app = express(); // creatig insatnce of express function
var router = express.Router();

router.all('/users/:id', function (req, res) {
	var userid = req.params.id
	console.log(userid);
	var object=req.object;
	object.find({
    '_id': userid                       // here i is flag which set if data is find...
}, function (err, result) {
	if (err) {
		res.json("data not found");
	}
	else {
		if(result.length==0){
			res.json("data not found")
		}else
		console.log(result)
		res.send("Name:"+result[0].firstname+"<br>"+"email:"+result[0].email);
	}

});
});
module.exports = router;