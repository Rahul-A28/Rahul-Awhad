

function flipDie(){
	var attempt=0;
	
	while(true){
		var no = Math.floor(Math.random() * (6 - 1 +1)) + 1;
		attempt += 1;

		if (no==6) {
			break;
		}

	}

	document.getElementById("answer").innerHTML = "No of times dice is rolled are: " + attempt;
	return true;

}



