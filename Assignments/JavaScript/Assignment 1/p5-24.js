function checkans(){
	var n = Math.floor(Number(document.getElementById("no").value));
	var n2 = String(n);
	var arr = [];
	for(i = 0;i<n2.length;i++){
		arr.push(Number(n2[i]));
	}
	console.log(arr);
	document.getElementById("answer").innerHTML = arr;
}