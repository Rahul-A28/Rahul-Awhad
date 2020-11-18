var express = require('express');
var moment = require('moment');

var app = express();

var port = process.env.PORT || 8080;

app.get('/',function(req,res){
    res.send("Hello World");
});

app.get('/time',function(req,res){
    res.send(moment().format());
});

app.listen(port);
console.log("Listening from port: "+port);