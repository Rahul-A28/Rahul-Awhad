function checkans(){
	var arr = document.getElementById("no").value.split(",");
	var max = 0;
	for(var i=0;i<arr.length;i++){
		arr[i] = Number(arr[i]);
		if(arr[i]>max){
			max = arr[i];
		}
	}

	document.getElementById("answer").innerHTML = "Largest Element is: " + max;

}