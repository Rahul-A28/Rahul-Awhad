function checkans(){

	var f = Number(document.getElementById("no").value);
	// console.log(f);
	if(f=="" && f!=0){
		alert("Please Enter in the Provided Text Box First !");
	}
	else if(isNaN(f)){
		alert("Please Enter a number");
	}
	else{
		var c = (f-32) * (5/9);
		document.getElementById("answer").innerHTML = c + " degree Celsius";
	}

}