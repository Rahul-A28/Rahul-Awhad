var Fibo = /** @class */ (function () {
    function Fibo() {
        this.id = Symbol();
        this.previousNo = 0;
        this.currentNo = 1;
        this.count = 0;
    }
    Fibo.prototype.next = function () {
        if (this.count == 0) {
            this.count += 1;
            this.c = 0;
        }
        else if (this.count == 1) {
            ++this.count;
            this.c = 1;
        }
        else {
            this.c = this.previousNo + this.currentNo;
            this.previousNo = this.currentNo;
            this.currentNo = this.c;
        }
        return this.c;
    };
    return Fibo;
}());
var seq1 = new Fibo();
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
console.log(seq1.next());
//# sourceMappingURL=question1.js.map