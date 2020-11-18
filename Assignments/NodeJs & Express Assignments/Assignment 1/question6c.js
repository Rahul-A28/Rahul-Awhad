var moment = require("moment");
var ops = require("./calculator.js");

console.log("Today is: "+moment().format("dddd, MMMM do yyyy, h:mm:ss a"));
console.log("The sum of 3 & 7 is: "+ops.sum(3,7));
console.log("The multiplication of 3 & 7 is: "+ops.multiplication(3,7));
