var arr = [];
for(var i=1;i<405;i++){
	arr.push(i);
}


function on_all(){
	var ans = [];
	var count = 0;
	for(var i=0;i<=arr.length;i++){
		if(Math.pow(arr[i],1/2)%1===0){
			ans.push(arr[i]);
			count++;
		}
		if(count==20){
			break;
		}
	}

	document.getElementById("answer").innerHTML = "The first 20 perfect squares are: " + ans;

}