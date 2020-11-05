function checkans(){
    var f;
    var arr = [];
    var ins = "";
    var outs = "";

    for(var i=0;i<3;i++){
    	// document.getElementById("in").innerHTML = "<label for=\"no\">Input:</label><input type=\"text\" name=\"no\" id=\"no\">"
		f = Number(prompt("Enter number between 1 and 30 inclusive"));
		// console.log(f);
		if(f=="" ){
			alert("Please Enter in the Provided Text Box First !");
			--i;
		}
		else if(isNaN(f)){
			alert("Please Enter a number !");
			--i;
		}

		else if(!(f%1===0)){
			alert("Enter only Integer no decimals !");
			--i;
		}
		else if(f>30 || f<1){
			alert("Enter number only between 1 and 30 inclusive !");
			--i;
		}
		else{
			arr.push(f);
		}
	}

	for(var i=0;i<arr.length;i++){
		ins += "Input: " + arr[i] + "<br>";
	}

	document.getElementById("in").innerHTML = ins;

	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr[i];j++){
			outs += "*";
		}
		outs += "<br>";
	}

	document.getElementById("answer").innerHTML = outs;

}