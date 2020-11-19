var printCapitalNames = function () {
    for (var i in arguments) {
        console.log(arguments[i].toUpperCase());
    }
};
var friends = ["Abhishek", "Binod", "Chetan", "Dharmesh", "Ethan"];
printCapitalNames.apply(void 0, friends);
//# sourceMappingURL=question5c.js.map