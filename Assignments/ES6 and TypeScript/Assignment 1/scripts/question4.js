var strings = ["Tom", "Ivan", "Jerry"];
var convert1 = function (arr) {
    var ans = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var i = arr_1[_i];
        ans.push({ name: i, length: i.length });
    }
    return ans;
};
var res = convert1(strings);
console.log(res);
// return [{arr[0],arr[0].length}].concat(convert(arr.slice(1,0))); 
//# sourceMappingURL=question4.js.map