var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/user');
var detail_schema = mongoose.Schema({
name: String,
},{
    strict: true,
    collection: 'detail'
});
var detail_object = conn.model('detail', detail_schema);
var details = detail_object.find({
    name: /sau/i
}, function (err, result) {
    if (err) {
        console.log(err);
        process.exit();
    }
    else {
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            console.log(row);
            process.exit ();
        }

    }
});