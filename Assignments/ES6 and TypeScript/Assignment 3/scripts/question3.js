var employee = {
    fname: "Raj",
    lname: "Mehta",
    print: function () {
        console.log("First Name: " + this.fname);
        console.log("Last Name: " + this.lname);
    }
};
var circle = {
    circle: "ABCD",
    print: function () {
        console.log("Circle: " + this.circle);
    }
};
function printAll(employee1, circle1) {
    employee1.print();
    circle1.print();
}
printAll(employee, circle);
//# sourceMappingURL=question3.js.map