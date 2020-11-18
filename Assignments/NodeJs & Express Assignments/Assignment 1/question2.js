var fs = require('fs');

var inputs = process.argv.slice(2);
var filename = inputs[0];

var filecontent = fs.readFileSync(filename,"utf8");

console.log(filecontent);
