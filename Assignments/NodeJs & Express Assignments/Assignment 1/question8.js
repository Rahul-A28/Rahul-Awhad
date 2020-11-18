var fs = require('fs');

var text = fs.readFileSync("./question8.txt","utf8").split(" ");
var sum = 0;


for( var i=0; i< text.length; i++){
    text[i] = parseInt(text[i]);
    sum += text[i];
}

console.log("Sum is: "+ sum);
