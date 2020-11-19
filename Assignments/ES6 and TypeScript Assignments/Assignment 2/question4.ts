let c1 = new Set(["user1","user2","user3"]);
let c2 = new Set(["user4","user5","user6"]);

let chat1 = new Map();
chat1.set({user:"user1",message:"Hiii"},"user1");
chat1.set({user:"user3",message:"Hello"},"user3");
chat1.set({user:"user2",message:"Hey"},"user2");
chat1.set({user:"user1",message:"Good Morning"},"user1");

let chat2 = new Map();
chat2.set({user:"user6",message:"Hiii How are you all?"},"user6");
chat2.set({user:"user4",message:"Good"},"user4");
chat2.set({user:"user5",message:"Hey doing great"},"user5");
chat2.set({user:"user4",message:"Good Morning"},"user4");



function displayUsers(ch){
    for(let user of ch){
        console.log(user);
    }
}

function displayChat(c){
    for(let entry of c.entries()){
        console.log(entry[0].user+": "+entry[0].message);
    }
}


console.log("Displaying Users of Chatroom 1");
displayUsers(c1);
console.log("Displaying Users of Chatroom 2");
displayUsers(c2);

console.log("Displaying Chat of Chatroom 1");
displayChat(chat1);
console.log("Displaying Chat of Chatroom 2");
displayChat(chat2);


