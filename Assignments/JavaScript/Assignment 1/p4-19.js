

function checkans(){
	
var arr1 = document.getElementById("no1").value.split(",");

var arr2 = document.getElementById("no2").value.split(",");



var arr3 = arr1.concat(arr2);

document.getElementById("answer").innerHTML = "Concatenated Array is: " + arr3;


}