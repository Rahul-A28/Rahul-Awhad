// page1 question3

function flipCoin(){
	var no = document.getElementById("no").value;
	no = parseInt(no);
	var heads = 0;
	for (var i=0; i<no; i++) {
		var head_tail = Math.floor(Math.random() * (1 - 0 + 1) ) + 0;
		if (head_tail==1) {
			heads += 1;
		}
		// console.log(heads);

	}

	document.getElementById("answer").innerHTML = "No of Heads are: " + heads;
	return true;

}



