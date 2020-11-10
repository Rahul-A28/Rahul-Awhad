function Arms(){
    let a = 0;
    return {
        getNextArmstrong: function(){
            ++a;
            // let t = a.toString().length;
            let con = true;
            let sum = 0;
            while(con){
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
            return a;

        }
    }

    
}


let a1 = Arms();

console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
