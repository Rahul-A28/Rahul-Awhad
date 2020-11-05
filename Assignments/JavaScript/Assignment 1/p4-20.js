function checkans(){
	
var arr1 = document.getElementById("no1").value.split(",");

var arr2 = document.getElementById("no2").value.split(",");

var arr3 = [];

for(var i=0;i<arr1.length;i++){
	arr3.push(arr1[i]);
	arr3.push(arr2[i]);
}



document.getElementById("answer").innerHTML = "Concatenated Array is: " + arr3;


}