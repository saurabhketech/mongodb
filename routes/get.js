var express = require('express'); // require express module
var app = express(); // creatig insatnce of express function
var router = express.Router();
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
module.exports = router;