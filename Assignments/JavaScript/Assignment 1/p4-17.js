

function checkans(){

	var numbers = document.getElementById("no").value.split(",");

	for(var i=0;i<numbers.length;i++){
		numbers[i] = parseInt(numbers[i]);
	}

	var for_add = 0;
	var while_add = 0;
	var rec_add = recadd(numbers,numbers.length-1);

	for(var i=0;i<numbers.length;i++){
		for_add += numbers[i];
	}
	var k=0;
	while(k!=numbers.length){
		while_add += numbers[k++];
	}



	document.getElementById("answer").innerHTML = "Addition through for loop:"+for_add+"<br>Addition through while loop:"+while_add+"<br>Addition through recursion:"+rec_add;

}

function recadd(arr,length){

	if(length<0){
		return 0;
	}

	return recadd(arr,length-1) + arr[length];

}