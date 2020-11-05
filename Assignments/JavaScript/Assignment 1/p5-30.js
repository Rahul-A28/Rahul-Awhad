function checkans(){
	var arr = document.getElementById("no").value.split(" ");
	var ans = "";

	for(var i=0;i<arr.length;i++){
		for(var j=1;j<arr[i].length;j++){
			ans += arr[i][j];
		}
		ans += arr[i][0].toLowerCase() + "ay ";
	}

	document.getElementById("answer").innerHTML = "Pig Latin Conversion: " + ans;

}