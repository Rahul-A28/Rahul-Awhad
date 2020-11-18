var express = require('express');
var moment = require('moment');

var app = express();

app.get('/year',function(req,res){
    var age = req.query.age;
    var year = parseInt(moment().format('yyyy'))-age;
    res.send("You were born in "+year);
});

app.listen(3000);