

function checkans(){

 var arr = document.getElementById("no1").value.split(",");

 for(var i=0;i<arr.length;i++){
		arr[i] = parseInt(arr[i]);
	}

 var n = parseInt(document.getElementById("no2").value);

 var rot = n%arr.length;
console.log("rot:"+rot);
 var temparr = [];
if(rot!=0){
	 for(var i=0;i<rot;i++){
	 	temparr.push(arr[i]);
	 }
	 console.log(temparr);
	 for(var i=0+rot;i<=arr.length;i++){
	 	arr[i-rot] = arr[i];
	 }
	console.log(arr);
	var k = 0;
	 for(var i=arr.length-rot;i<arr.length;i++){
	 	arr[i] = temparr[k++];
	 }
	//console.log(arr);
}	
 document.getElementById("answer").innerHTML = "Array after rotation is:" + arr;



}