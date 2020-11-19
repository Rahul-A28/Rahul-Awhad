function checkans(){

	var no = document.getElementById("no").value;
	var sum = 0;

	for(var i=1;i<=no;i++){
		sum += i;
	}
    
    document.getElementById("answer").innerHTML = "The Summation is: " + sum;

}