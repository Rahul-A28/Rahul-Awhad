var a = 1;
var b = 1;
var res = [];
var c = 0;
for(i=0;i<98;i++){
	c = a+b;
	res.push(c);
	a=b;
	b=c;
}

// document.getElementById("answer").innerHTML = "The first 100 fibonacci numbers are: 1,1,"+res;
var ans ="1<br>1<br>";
for(var i=0;i<res.length;i++){
	ans += res[i] + "<br>";
}

document.getElementById("answer").innerHTML = "The first 100 fibonacci numbers are:<br>"+ans;

console.log(res.length);