let a =0;
function *getNextArmstrong(){
    
    ++a;
    // if(a>1000){
    //     console.log("Excedded 1000");
    // }
    //else{
        // ++a;
        // let t = a.toString().length;
        let con = true;
        let sum = 0;
        while(con){
            // if(a>1000){
            //     console.log("Excedded 1000");
            //     break;
            // }
            let t = a.toString().length;
            let temp = a;
            let r = 0;
            for(let i=0;i<t;i++){
                r = temp%10;
                // console.log(r);
                sum = sum + Math.pow(r,t);
                temp = Math.floor(temp/10);
                

            }
            if(a==sum){
                con = false;
            }
            else{
                //console.log(sum);
                a++;
                sum = 0;
                // con = false;
            }
        }
        if(!(a>1000)){
            yield a;
        }
        else{
            a--;
            yield "Exceeded 1000";
        }    
   // }    
                

}


function clear(){
    console.log("Resetted armstrong numbers");
    a = 0;
}

console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
console.log(getNextArmstrong().next().value);
clear();
console.log(getNextArmstrong().next().value);



