var express = require('express');

var app = express();

var path = process.argv[2];


if(process.argv.length==3){
    app.set('views',path);
}


app.set('view engine','pug');


app.get('/home',function(req,res){
    res.render("index", {date:new Date().toDateString()});
});

app.get('/',function(req,res){
    res.send("Type /home in url");
});

app.listen(3000);
console.log("Listening from port 3000");