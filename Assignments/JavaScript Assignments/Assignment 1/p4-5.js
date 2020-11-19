function checkans(){

	var no = document.getElementById("no").value;
	var sum = 0;

	for(var i=1;i<=no;i++){
			if(i%5==0 || i%3==0){
				sum += i;
			}
	}
    
    document.getElementById("answer").innerHTML = "The Summation is: " + sum;

}