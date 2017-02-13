var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/user'); // connection to the database
var detail_schema = mongoose.Schema({   
name: String,
},{
    strict: true,
    collection: 'detail'
}); // collection detail schema....
var detail_object = conn.model('detail', detail_schema); // creating object of collection schema...
var details = detail_object.find({
    name: /saurabh0/i                        // here i is flag which set if data is find...
}, function (err, result) {
    console.log(result.length);
    if (err) {
        console.log(err);
        process.exit();
    }
    else {
        for (var j = 0; j < result.length; j++) {
            var row = result[j];
            console.log(result);
            process.exit ();
        }

    }
});