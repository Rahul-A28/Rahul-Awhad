var args = process.argv.slice(2);
var text = args[0];

var fs = require('fs');

fs.writeFileSync("question10.txt",text);
console.log("The file was saved!");