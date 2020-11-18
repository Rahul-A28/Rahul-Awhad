var fs =  require('fs');
var inputs = process.argv.slice(2);
var text = inputs[0];

fs.writeFileSync("question4.txt",text);
console.log("The file was saved!");