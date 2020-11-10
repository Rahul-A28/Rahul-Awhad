var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bank = /** @class */ (function () {
    function Bank() {
        this._total = 0;
        // static totalbalance(amount){
        //     this.total += amount;
        //     console.log(amount);
        // }
    }
    Object.defineProperty(Bank.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (amount) {
            this._total += amount;
        },
        enumerable: false,
        configurable: true
    });
    return Bank;
}());
var bank = new Bank();
var Account = /** @class */ (function () {
    function Account(id, name, balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
    return Account;
}());
var SavingAccount = /** @class */ (function (_super) {
    __extends(SavingAccount, _super);
    function SavingAccount(id, name, balance, interest) {
        var _this = _super.call(this, id, name, balance) || this;
        _this.interest = interest;
        bank.total = _this.balance;
        return _this;
    }
    return SavingAccount;
}(Account));
var CurrentAccount = /** @class */ (function (_super) {
    __extends(CurrentAccount, _super);
    function CurrentAccount(id, name, balance, cash_credit) {
        var _this = _super.call(this, id, name, balance) || this;
        _this.cash_credit = cash_credit;
        bank.total = _this.balance;
        return _this;
    }
    return CurrentAccount;
}(Account));
var s1 = new SavingAccount(111, "Rohan", 10000, 6);
var s2 = new SavingAccount(112, "Kartik", 20000, 6);
var c1 = new CurrentAccount(210, "Dharmesh", 10000, 1000);
var c2 = new CurrentAccount(211, "Aryan", 20000, 2000);
console.log(s1);
console.log(s2);
console.log(c1);
console.log(c2);
console.log("Total Balance in the bank: " + bank.total);
//# sourceMappingURL=question2.js.map