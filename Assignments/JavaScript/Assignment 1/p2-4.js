

function checkans(){
	var no = document.getElementById("no").value;
	var strings = [];
	var counter =0;
	var flag = 1;
	var flag2 = 0;
	var temp ="";
	for (var i=0; i<no.length; i++) {
		
		if(no[i]=="a" || no[i]=="b"){
			// flag = 0;
			continue;
		}
		else{
			if(flag==2 || i==no.length-1){
				if(flag2==1){
					temp += no[i];
					flag =0;
					flag2 =0;
					strings[counter++] = temp;
					temp = "";
				}

			}
			else{
				flag = 1;
				if(   (no[i+1].charCodeAt(0)) - (no[i].charCodeAt(0)) == 1){
					var flag2 =1;
					temp += no[i];
					
				}
				else{
					if(flag2==1){
						temp += no[i];
						flag =0;
						flag2 =0;
						strings[counter++] = temp;
						temp = "";
					}
				}
				
			}
		}


		// console.log(heads);

	}
	var maximum =0;
	var result = [];
	var resultcounter =0;
	for(var i=0;i<strings.length;i++){
		if(strings[i].length>maximum){
			maximum = strings[i].length;
			// console.log(maximum);
		}
	}

	for(var i=0;i<strings.length;i++){
		if(strings[i].length==maximum){
			result[resultcounter++] = strings[i];
		}
	}


	document.getElementById("answer").innerHTML = "Strings are: " + result;
	return true;

}



