var express = require('express'); // require express module
var app = express(); // creatig insatnce of express function
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var Grid = require("gridfs-stream");
var mongo = require('mongodb'); // 2.0.31
var Busboy = require('busboy'); // 0.2.9
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

    object.remove({
        email: email
    }, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            var parsed = JSON.parse(result); // parsing json result...
            if (parsed.n == 1) {
                res.json("data removed")
            } else {
                res.json("data not found");
            }
        }

    });
});


// sending file into mongodb....
router.all('/file', function(req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.uploadDir = path.join(__dirname, '/uploads'); // store all uploads in the /uploads directory
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    })
    var gfs = req.object1;
    var busboy = new Busboy({
        headers: req.headers
    });
    var fileId = new mongo.ObjectId();
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('got file', filename, mimetype, encoding);
        var writeStream = gfs.createWriteStream({
            _id: fileId,
            filename: filename,
            mode: 'w',
            content_type: mimetype,
        });
        file.pipe(writeStream);
        res.json("file uploaded")
    })
    req.pipe(busboy);
});
module.exports = router;