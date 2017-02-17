// the middleware function
module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1/details');
    var conn = mongoose.connection;
    var users_schema = mongoose.Schema({
        firstname: String,
        email: String,
        password: String,
        filename:String,
        content:String
    }, {
        strict: true,
        collection: 'Users'
    });
    var userobject = conn.model('user', users_schema); // user object
    return function(req, res, next) {
        req.object = userobject;
        next();
    }

};