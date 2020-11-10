interface Printable{
    fname?: string;
    lname?: string;
    circle?: string;
    print();
}

let employee: Printable = {
    fname: "Raj",
    lname: "Mehta",
    print: function(){
        console.log("First Name: "+ this.fname);
        console.log("Last Name: "+ this.lname);
    }
}

let circle: Printable = {
    circle: "ABCD",
    print: function(){
        console.log("Circle: "+this.circle);
    }
}  


function printAll(employee1,circle1){
    employee1.print();
    circle1.print();
}

printAll(employee,circle);