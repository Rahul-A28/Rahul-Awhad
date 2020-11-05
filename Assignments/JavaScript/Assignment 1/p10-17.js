

function checkans(){

	var arr = document.getElementById("no1").value.split(",");
	var lar = [];
	var flag1 =0;
	var flag2 =0;
	var ans = "";

	for( var i=0;i<arr.length;i++){
		arr[i] = parseInt(arr[i]);
	}

    var n = parseInt(document.getElementById("no2").value);

    for(var i=1;i<arr.length-n;i++){
    	if(arr[n-i]!=undefined && flag1==0){
    		if(arr[n]<arr[n-i]){
    			lar.push(n-i);
    			flag1=1;
    		}
    	}
    	if(arr[n+i]!=undefined && flag2==0){
    		if(arr[n]<arr[n+i]){
    			lar.push(n+i);
    			flag2=1;
    		}
    	}
    	if(flag1==1 && flag2==1){
    		break;
    	}
    }

    if(lar.length==1){
    	ans = ans = "Larger element found: " + arr[lar[0]] + " at index " + lar[0];
    }
    else{
    		if(Math.abs(lar[0]-n)==Math.abs(lar[1]-n)){
		    	if(arr[lar[0]]-arr[n]>arr[lar[1]]-arr[n]){
		    		ans = "Larger element found: " + arr[lar[0]] + " at index " + lar[0];
		    	}
		    	else{
		    		ans = "Larger element found: " + arr[lar[1]] + " at index " + lar[1];
		    	}
		    }
		    else if(Math.abs(lar[0]-n)<Math.abs(lar[1]-n)){
		    	ans = "Larger element found: " + arr[lar[0]] + " at index " + lar[0];
		    }	
		    else{
		    	ans = "Larger element found: " + arr[lar[1]] + " at index " + lar[1];
		    }
    }

    console.log(lar);
    document.getElementById("answer").innerHTML = ans;

}


// if(arr[lar[0]]-arr[n]>arr[lar[1]]-arr[n]){
//     		ans = "Larger element found: " + arr[lar[0]] + " at index " + lar[0];
//     	}
//     	else{
//     		ans = "Larger element found: " + arr[lar[1]] + " at index " + lar[1];
//     	}