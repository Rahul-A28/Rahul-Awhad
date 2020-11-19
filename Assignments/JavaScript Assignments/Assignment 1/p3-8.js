

function isEven(){

	var no = parseInt(document.getElementById("no").value);
	
    var res = !(Boolean(no%2));

    document.getElementById("answer").innerHTML = "The result is: " + res;

}


