var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello')
})

app.listen(3000, function () {
  console.log('Example hello listening on port 3000!')
})