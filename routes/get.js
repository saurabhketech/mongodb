var express = require('express'); // require express module
var app = express(); // creatig insatnce of express function
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));



router.all('/users/:id', function(req, res) {
	var userid = req.params.id
	var object = req.object;
	object.find({
        '_id': userid // here i is flag which set if data is find...
    }, function(err, result) {
    	if (err) {
    		res.json({
    			status: 0,
    			message: 'user data is not found'
    		});
    	} else {
    		if (result.length == 0) {
    			res.json({
    				status: 0,
    				message: 'user data is not found'
    			});
    		} else {
    			res.json({
    				status: 1,
    				message: result
    			});
    		}
    	}
    });
});

//        data deletion from mongodb collection................

router.all('/user/:email', function(req, res) {
	var email = req.params.email;
	var object = req.object;
	object.remove({email:email}, function(err, result) {
		if (err) {
			res.json(err);
		}else{
			var parsed=JSON.parse(result);			// parsing json result...
			if(parsed.n==1){
				res.json("data removed")
			}else{
				res.json("data not found");
			}
		}
		
	});
});


// sending file into mongodb....
router.post("/file", function(req, res) { //getting post data from form...
  // create an incoming form object
  var form = new formidable.IncomingForm();
  var object = req.object;
  form.uploadDir = path.join(__dirname, '/uploads');  // store all uploads in the /uploads directory
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    console.log(file.name)
   fs.readFile(form.uploadDir+"/"+file.name, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  else{
  	console.log(file.name);
  	console.log(data);
  	var detail = new req.object({
            "filename": file.name,
            "content":data
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
});
  form.parse(req);			// parse the incoming request containing the form data

});	
module.exports = router;