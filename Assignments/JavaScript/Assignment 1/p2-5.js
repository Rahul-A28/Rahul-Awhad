function checkans(){


	var strings = document.getElementById("no").value.split(",");
	var filteredStrings = strings.filter(checkCondition);
	var result = filteredStrings.reduce(addLengths,0);





	document.getElementById("answer").innerHTML = "Total length is: " + result;




}



function addLengths(total, str){
	return total + str.length;
}


function checkCondition(str){

return str.indexOf("q")==-1;	 


}