var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var c1 = new Set(["user1", "user2", "user3"]);
var c2 = new Set(["user4", "user5", "user6"]);
var chat1 = new Map();
chat1.set({ user: "user1", message: "Hiii" }, "user1");
chat1.set({ user: "user3", message: "Hello" }, "user3");
chat1.set({ user: "user2", message: "Hey" }, "user2");
chat1.set({ user: "user1", message: "Good Morning" }, "user1");
var chat2 = new Map();
chat2.set({ user: "user6", message: "Hiii How are you all?" }, "user6");
chat2.set({ user: "user4", message: "Good" }, "user4");
chat2.set({ user: "user5", message: "Hey doing great" }, "user5");
chat2.set({ user: "user4", message: "Good Morning" }, "user4");
function displayUsers(ch) {
    var e_1, _a;
    try {
        for (var ch_1 = __values(ch), ch_1_1 = ch_1.next(); !ch_1_1.done; ch_1_1 = ch_1.next()) {
            var user = ch_1_1.value;
            console.log(user);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ch_1_1 && !ch_1_1.done && (_a = ch_1.return)) _a.call(ch_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function displayChat(c) {
    var e_2, _a;
    try {
        for (var _b = __values(c.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            console.log(entry[0].user + ": " + entry[0].message);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
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
//# sourceMappingURL=question4.js.map