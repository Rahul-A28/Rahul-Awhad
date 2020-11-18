var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var app = express();

app.get('/form',function(req,res){
    res.send(`<html>
    <head></head>
    <body>
        <form action="/form" method="POST"><input type="text" name="str"><br>
        <input type="submit">
        </form>
    </body>
</html>`);
});

app.post('/form',urlencodedParser,function(req,res){
    var str = req.body.str;
    var rev = "";
    for(var i=str.length-1;i>=0;i--){
        rev += str[i];
    }
    res.send(rev);
});

app.listen(3000);
console.log("Listening form port "+3000);