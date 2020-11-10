class Fibo{
    private id = Symbol();
    private previousNo = 0;
    private currentNo = 1;
    private count = 0;
    private c;


        next(){

            if(this.count==0){
                this.count += 1;
                 this.c=0;
            }
            else if(this.count==1){
                ++this.count;
                 this.c=1;
            }
            else{
                this.c = this.previousNo + this.currentNo;
                this. previousNo = this.currentNo;
                this.currentNo = this.c;
            }

       
       
        return this.c;

    }


}


let seq1 = new Fibo();

console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());