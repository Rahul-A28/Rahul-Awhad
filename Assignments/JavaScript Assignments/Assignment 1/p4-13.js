var arr;
var key;

function checkans(){
	var arr = document.getElementById("no").value.split(",");
	key = document.getElementById("no2").value;

	var a = arr.find(exist);
	// console.log(a);

	if(a==undefined){
		document.getElementById("answer").innerHTML = "Element not found";
	}
	else{
		document.getElementById("answer").innerHTML = "Element found!";
	}


}

function exist(elem){
	// console.log(elem);
	return elem==key;
}