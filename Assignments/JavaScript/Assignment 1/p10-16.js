

function checkans(){

	var a = document.getElementById("no1").value;
	var b = document.getElementById("no2").value;

	var arr = [];
	var temp = "";
	var temp2 = "";

	for(var i=0;i<a.length;i++){
		temp =a[i];
		for(var j=i+1;j<a.length;j++){
			// if(j==a.length-1){
			// 	break;
			// }
			temp += a[j];
			if(b.includes(temp) && !(arr.includes(temp))){
				arr.push(temp);
				//console.log(arr);
			} 
		}
	}
	var max = 0;
	for(var i=0;i<arr.length;i++){
		if(max<arr[i].length){
			max = arr[i].length;
		}
	}

	var res = [];
	for(var i=0;i<arr.length;i++){
		if(max==arr[i].length){
			res.push(arr[i]);
		}
	}


	console.log(res);

	document.getElementById("answer").innerHTML = "Answer: " + res;



}