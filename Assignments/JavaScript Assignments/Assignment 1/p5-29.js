function checkans(){
	var arr = document.getElementById("no").value.split(",");
	var ans = "*****************<br>";
	
	for(var i=0;i<arr.length;i++){
		ans += "* " + arr[i] + " *<br>";
	}

	ans += "*****************<br>";

	document.getElementById("answer").innerHTML = ans;

}