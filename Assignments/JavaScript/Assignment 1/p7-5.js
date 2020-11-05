document.getElementById("summary").disabled = true;

function info(){
			var a = document.activeElement.name;
			if(a=="form1" || a=="body1" || a=="html" || a==undefined){
				document.getElementById("info").innerHTML = "This text area provides you some help.";
			}
			else if(a=="name"){
				document.getElementById("info").innerHTML = "Put your Name";
			}
			else if(a=="email"){
				document.getElementById("info").innerHTML = "Put your email";
			}
			else if(a=="toppings"){
				document.getElementById("info").innerHTML = "Select toppings";
			}
			else if(a=="delivery"){
				document.getElementById("info").innerHTML = "Select whether you want a delivery at your home or you are coming up to pick up the food by yourself";
			}
			else if(a=="tip"){
				document.getElementById("info").innerHTML = "Select the amount of tip you wanna give";
			}
			else if(a=="address"){
				document.getElementById("info").innerHTML = "Enter the address of your house to get the delivery";
			}


		}

function check(){
	document.getElementById("summary").disabled = false;
}

function display(){

var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var address = document.getElementById("address").value;
var delivery = document.getElementById("del1").checked;
var tip = document.getElementById("tip").value;
var deliveryfee = 0;



 var str = "<tr><th>Name:</th><td>" + name + "</td></tr>" +
			"<tr><th>Email:</th><td>" + email + "</td></tr>" + 
			"<tr><th>Address:</th><td>" + address + "</td></tr>" +
			"<tr><th>Toppings:</th><td>" + "" + "</td></tr>";



var topping = document.getElementsByName("toppings");
var toppings = [];

for(var i=0;i<topping.length;i++){
	if(topping[i].checked){
		toppings.push(topping[i].value);
	}	
}


for(var i=0;i<toppings.length;i++){
	str += "<tr><th>Topping:"+(i+1)+"</th><td>" + toppings[i] + "</td></tr>";
}


if(delivery){
	deliveryfee = 5;
	str += "<tr><th>Delivery?:</th><td>" + "Yes" + "</td></tr>";
}
else{
	str += "<tr><th>Delivery?:</th><td>" + "No" + "</td></tr>";
}

str += "<tr><th>Tip Amount:</th><td>" + tip+"%" + "</td></tr>";

var amount = (10 + (1.5*toppings.length) + deliveryfee)*(1+(tip/100));

str += "<tr><th>Total:</th><td>" + "$" +amount.toFixed(2) + "</td></tr>";

document.getElementById("table1").innerHTML = str;



console.log(toppings);
console.log(tip);

return false;					

}		
