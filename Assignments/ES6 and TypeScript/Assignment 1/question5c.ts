let printCapitalNames = function(){
    for(let i in arguments){
        console.log(arguments[i].toUpperCase());
    }
}

let friends = ["Abhishek","Binod","Chetan","Dharmesh","Ethan"];

printCapitalNames(...friends);