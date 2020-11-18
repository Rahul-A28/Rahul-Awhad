var http = require("http");

var server = http.createServer(function(req,res){
    console.log("Listening from port: "+ req.url);
    res.writeHead(200,{"Content_type":"text/plain"});
    res.end("Success, im listening from port:3000");

});


server.listen(3000,"127.0.0.1");
console.log("Success, im listening from port:3000");