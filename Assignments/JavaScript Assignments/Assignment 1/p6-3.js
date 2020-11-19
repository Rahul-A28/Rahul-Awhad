function checkans(){

	var row = parseInt(document.getElementById("no1").value);
	var col = parseInt(document.getElementById("no2").value);
	var ans = "<table>";


	for(var i=1;i<=row;i++){
		ans += "<tr>"
		for(var j=1;j<=col;j++){
			ans += "<td>" + i + "," + j + "</td>";
		}
		ans += "</tr>"

	}

	ans += "</table>";


	document.getElementById("answer").innerHTML = ans;



}