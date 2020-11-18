var fs = require('fs');
var concat = require('concat-stream');

// var arr = [];



var myConcatStream = concat(function(data){console.log(data.split(" "))});
var myReadStream = fs.createReadStream("./question9.txt","utf8");



// myConcatStream.write(fs.readFileSync("./question9.txt","utf8").split(""));
myReadStream.pipe(myConcatStream);








