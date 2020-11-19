

function checkans(){

	var name = document.getElementById("no").value;
	
    if(name=="Alice" || name=="Bob"){
    	document.getElementById("answer").innerHTML = "Hello " + name + " !!";
    }
    else{
    	document.getElementById("answer").innerHTML = "Hello !!";
    }	
}


