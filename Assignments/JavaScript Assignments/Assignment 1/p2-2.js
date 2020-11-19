var arr = [];
for(i=0;i<100;i++){
	arr.push(Math.random());
}

var ans = "";
for(var i=0;i<arr.length;i++){
	ans += arr[i] + "<br>";
}

document.getElementById("answer").innerHTML = "Array is:<br>"+ans; 

