var ans = "";

for(var i=1;i<=12;i++){
	for(var j=1;j<=10;j++){
		ans += i + " * " + j + " = " + (i*j) + "<br>";
	}
	ans += "<br>";
}

document.getElementById("answer").innerHTML = ans;