let ans = function(name,...friends){
    console.log("Username: "+name);
    console.log("List of Friends");
    console.log(friends);
    for(let i of friends){
        console.log(i);
    }
}


ans("Raj","Aman","Binod","Chetan","Dharmesh","Ethan");