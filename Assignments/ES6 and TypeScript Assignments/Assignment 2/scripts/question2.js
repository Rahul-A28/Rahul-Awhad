function Arms() {
    var a = 0;
    return {
        getNextArmstrong: function () {
            ++a;
            // let t = a.toString().length;
            var con = true;
            var sum = 0;
            while (con) {
                var t = a.toString().length;
                var temp = a;
                var r = 0;
                for (var i = 0; i < t; i++) {
                    r = temp % 10;
                    // console.log(r);
                    sum = sum + Math.pow(r, t);
                    temp = Math.floor(temp / 10);
                }
                if (a == sum) {
                    con = false;
                }
                else {
                    //console.log(sum);
                    a++;
                    sum = 0;
                    // con = false;
                }
            }
            return a;
        }
    };
}
var a1 = Arms();
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
console.log(a1.getNextArmstrong());
//# sourceMappingURL=question2.js.map