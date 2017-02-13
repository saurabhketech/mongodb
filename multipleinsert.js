var mongoose = require('mongoose');
var async=require('async');
var conn = mongoose.createConnection('mongodb://127.0.0.1/user');
var detail_schema = mongoose.Schema({
    name:String,
    email:String
}, {
    strict: false,
    collection: 'detail'
});
var detail = conn.model("detail", detail_schema);
var records = [];
for (var i = 0; i < 10; i++) {
    records.push({

        name: 'saurabh' +i,
        email: 'saurabh'+i+'@gmail.com'
    });
}
insert(records, function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log('sucess');
    process.exit();
});
function insert(records, main_callback) {
    async.eachSeries(records, function(row,callback) {
        var new_detail = new detail({
            name: row.name,
            email: row.email
        });
        new_detail.save(function(err, row) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                callback();
            }
        });
    }, function(err) {
        main_callback(err);
    });
}