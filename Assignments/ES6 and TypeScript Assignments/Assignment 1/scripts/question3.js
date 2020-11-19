var Order = function (id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.printOrder = function () {
        console.log(this.id);
        console.log(this.title);
        console.log(this.price);
    };
    this.getPrice = function () {
        console.log(this.price);
    };
};
var ab = new Order(1, "Books", 2000);
console.log("Original Object");
console.log(ab);
console.log("Copied object");
var bc = Object.assign({}, ab);
console.log(bc);
bc.printOrder();
//# sourceMappingURL=question3.js.map