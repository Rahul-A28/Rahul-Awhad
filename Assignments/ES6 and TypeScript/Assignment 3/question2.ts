class Bank{
    private _total:number = 0;


    get total(){
        return this._total;
    }

    set total(amount){
        this._total += amount;
    }



    // static totalbalance(amount){

    //     this.total += amount;
    //     console.log(amount);
    // }
}

let bank = new Bank();



class Account{
    constructor(id:number,name:string,balance:number){
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
}

class SavingAccount extends Account{
    constructor(id:number,name:string,balance:number,interest:number){
        super(id,name,balance);
        this.interest = interest;
        bank.total = this.balance;
    }    

}

class CurrentAccount extends Account{
    constructor(id:number,name:string,balance:number,cash_credit:number){
        super(id,name,balance);
        this.cash_credit = cash_credit;
        bank.total = this.balance;
    }    

}


let s1 = new SavingAccount(111,"Rohan",10000,6);
let s2 = new SavingAccount(112,"Kartik",20000,6);

let c1 = new CurrentAccount(210,"Dharmesh",10000,1000);
let c2 = new CurrentAccount(211,"Aryan",20000,2000);

console.log(s1);
console.log(s2);
console.log(c1);
console.log(c2);


console.log("Total Balance in the bank: "+bank.total);

