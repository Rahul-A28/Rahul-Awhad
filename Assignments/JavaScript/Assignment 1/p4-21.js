function checkans(){
	
var arr1 = document.getElementById("no1").value.split(",");

for(var i=0;i<arr1.length;i++){
		arr1[i] = parseInt(arr1[i]);
	}

var arr2 = document.getElementById("no2").value.split(",");

for(var i=0;i<arr2.length;i++){
		arr2[i] = parseInt(arr2[i]);
	}

var arr3 = arr1.concat(arr2);

arr3 = arr3.sort()





document.getElementById("answer").innerHTML = "Sorted Array is Array is: " + arr3;


}