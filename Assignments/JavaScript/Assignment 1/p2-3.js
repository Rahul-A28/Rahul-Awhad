function checkans(){
	var strings = document.getElementById("no").value.split(",");
	console.log(strings);
	var num = numberArray(strings);
	console.log(num);
	document.getElementById("answer").innerHTML = "num = " + num ;
}

function numberArray(strings){
	for(var i=0;i<strings.length;i++){
		strings[i] = Number(strings[i]);
	}
	return strings;
}