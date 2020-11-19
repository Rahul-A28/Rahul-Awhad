

function checkans(){
	var arr = document.getElementById("no").value.split(",");
	arr = arr.reverse();
	document.getElementById("answer").innerHTML = "Reverse of the array is: " + arr;
}