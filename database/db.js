// the middleware function
var Grid = require('gridfs-stream'); // 1.1.1"
var mongo = require('mongodb'); // 2.0.31
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/details');
    var db = new mongo.Db('details', new mongo.Server('127.0.0.1', 27017));
    var gfs;
    db.open(function(err, db) {
        if (err) throw err;
        gfs = Grid(db, mongo);
    });

    var conn = mongoose.connection;
    var users_schema = mongoose.Schema({
        firstname: String,
        email: String,
        password: String
    }, {
        strict: true,
        collection: 'Users'
    });
    var userobject = conn.model('user', users_schema); // user object
    return function(req, res, next) {
        req.object = userobject;
        req.object1 = gfs;
        next();
    }

};