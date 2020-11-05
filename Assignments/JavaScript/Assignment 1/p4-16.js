

function checkans(){

	var str = document.getElementById("no").value;
	var temp = "";

	for(var i=str.length-1;i>=0;i--){
		temp += str[i];
	}

	if(temp==str){
		document.getElementById("answer").innerHTML = "Given String is a Palindrome.";
	}
	else{
		document.getElementById("answer").innerHTML = "Given String is not a Palindrome.";
	}
}




