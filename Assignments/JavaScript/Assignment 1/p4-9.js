function checkans(){	
	var key = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
	// var ans = "";
	var attempt = 0;
	var track = 0;
	while(true){
		
		var a = Number(prompt("Guess the secret number between 1 and 10."));

		if(track==a){
			continue;
		}

		if(key==a){
			attempt += 1;
			alert("You Guess is Correct !!");
			break;
		}
		else if(Math.abs(key - a)<=3){
			alert("Close!");
			attempt += 1;
			track = a;
		}
		else if(Math.abs(key - a)>3){
			alert("Too far !");
			attempt += 1;
			track = a;
		}


	}


	document.getElementById("answer").innerHTML = "Number of attempts: " + attempt;
	attempt = 0;
	track = 0;
}	