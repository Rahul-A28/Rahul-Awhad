var add = require("./operations/sum.js");
var sub = require("./operations/subtraction.js");
var mul = require("./operations/multiplication.js");
var div = require("./operations/division.js");

console.log("Addition:  "+add.sum(3,7));
console.log("Subtraction:  "+sub.subtraction(3,7));
console.log("Multiplication:  "+mul.multiplication(3,7));
console.log("Division:  "+div.division(3,7));