var curdate = new Date();
var year = curdate.getFullYear() + 1;
var count =0;
var leapyears =[];


while(count!=20){

	if( year%4==0 && (year%100!=0 || year%400==0  ) ){
		leapyears.push(year);
		year += 1;
		++count;
	}
	else{
		year +=1;
	}


}



document.getElementById("answer").innerHTML = "Next 20 leap years are: " + leapyears;