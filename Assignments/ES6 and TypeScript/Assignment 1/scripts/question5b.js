var ans = function (name) {
    var friends = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        friends[_i - 1] = arguments[_i];
    }
    console.log("Username: " + name);
    console.log("List of Friends");
    console.log(friends);
    for (var _a = 0, friends_1 = friends; _a < friends_1.length; _a++) {
        var i = friends_1[_a];
        console.log(i);
    }
};
ans("Raj", "Aman", "Binod", "Chetan", "Dharmesh", "Ethan");
//# sourceMappingURL=question5b.js.map