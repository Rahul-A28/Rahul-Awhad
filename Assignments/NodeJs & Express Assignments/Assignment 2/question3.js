var express = require('express');

var app = express();

var port = process.argv[2];

app.get('/',function(req,res){
    res.send("goto /home");
});

app.get('/home',function(req,res){
    res.send("Hello World!");
});

app.listen(port);
console.log("Listening from port: "+port);