var express = require('express');
var fs = require('fs');

var app = express();

var port = process.argv[2];

var file = process.argv[3];

var fileData = fs.readFileSync(file,"utf8");

var ob1 = JSON.parse(fileData);

app.get('/books', function(req,res){
    res.json(ob1);
});

app.listen(port);
console.log("Listening at port: "+port);