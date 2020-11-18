var fs = require('fs');

var textarr = fs.readFileSync("./question5.txt","utf8").split(/[\s,.]/);

var key = "John";
var count = 0;

for(var word of textarr){
    if(word==key){
        count += 1;
    }
}

console.log(`${key} has ${count} occurances`);