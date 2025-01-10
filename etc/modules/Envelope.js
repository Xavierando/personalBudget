const db = require('./Database.js')
class Envelope {
    constructor(name, amount = 0) {
        this._name = name;
        this._amount = amount;
        const row = db.getEnvelope(name);
        if (row) {
            this.id = row.id;
            this.name = row.name;
            this.amount = row.amount;
        }else {
            const newRow = db.createNewEnvelope(name, amount);
            this.id = newRow.id;
            this.name = newRow.name;
            this.amount = newRow.amount;
        }
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        db.updateEnvelope(this.id, name);
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
        this.persist();
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
        this.persist();
        return this._amount;
    }
    async persist() {
        db.updateEnvelope(this.id, this.name, this.amount);
    }
}
module.exports = Envelope;