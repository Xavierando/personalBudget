class Envelope {
    constructor(name, amount) {
        this._name = name;
        this._amount = amount;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        return this._name;
    }

    get amount() {
        return this._amount;
    }
    addAmount(amount) {
        if (!isNumber(amount)) {
            throw new Error("Invalid Input, amount must be a number");
        }
        this._amount += amount;
        return this._amount;
    }
    removeAmount(amount) {
        if (!isNumber(amount)) {
            throw new Error("Invalid Input, amount must be a number");
        }
        if (this._amount - amount < 0) {
            throw new Error("Envelope can't have a negative amount");
        }
        this._amount -= amount;
        return this._amount;
    }
    persist() {
    }
}
module.exports = Envelope;