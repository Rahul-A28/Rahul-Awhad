var n = 0;
var n2 = 0;
function checkans(){

	 n = parseInt(document.getElementById("no").value);

	document.getElementById("answer1").innerHTML = "Enter 1 for summation or enter 2 for product from 1 to n:<input type=\"text\" id=\"choice\"><button onclick=\"calculate()\">Calculate</button>";

}

function calculate(){
	n2 = parseInt(document.getElementById("choice").value);
	var sum = 0;
	var prod = 1;
	if(n2!=1 && n2!=2){
		document.getElementById("answer2").innerHTML = "Bye!!";
	}
	else{
		if(n2==1){
			for(var i=1;i<=n;i++){
				sum += i;
			}
			document.getElementById("answer2").innerHTML = "Summation is: " + sum;
		}
		else{
			for(var i=1;i<=n;i++){
				prod *= i;
			}
			document.getElementById("answer2").innerHTML = "Product is: " + prod;
		}
	}
}