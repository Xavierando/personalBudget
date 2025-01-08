const Envelope = require('./Envelope.js')


class Envelopes {
    constructor() {
        this.Envelopes = {};
    }
    createNewEnvelope(name, amount) {
        if (Object.hasOwn(this.Envelopes, name)) {
            throw new Error("Envelope with that name already exists");
        }
        this.Envelopes[name] = new Envelope(name, amount);
        console.log(name);
        console.log(this.Envelopes[name]);
        return this.Envelopes[name];
    }
    Lists() {
        return this.Envelopes;
    }
    getEnvelope(name) {
        if (!Object.hasOwn(this.Envelopes, name)) {
            throw new Error("Envelope with that name doesn't exist");
        }
        return this.Envelopes[name];
    }
    removeEnvelope(name) {
        if (!Object.hasOwn(this.Envelopes, name)) {
            throw new Error("Envelope with that name doesn't exist");
        }
        delete this.Envelopes[name];
    }
    transferAmount(from, to, amount) {
        if (!Object.hasOwn(this.Envelopes, from)) {
            throw new Error("Envelope with that name doesn't exist");
        }
        if (!Object.hasOwn(this.Envelopes, to)) {
            throw new Error("Envelope with that name doesn't exist");
        }
        if (this.Envelopes[from].amount() < amount) {
            throw new Error("Envelope doesn't have enough amount");
        }
        this.Envelopes[from].removeAmount(amount);
        this.Envelopes[to].addAmount(amount);
    }
    TotalAmount() {
        let total = 0;
        for (let name in this.Envelopes) {
            total += this.Envelopes[name].amount();
        }
        return total;
    }
    changeEnvelopeName(oldName, newName) {
        if (!Object.hasOwn(this.Envelopes, oldName)) {
            throw new Error("Envelope with that name doesn't exist");
        }
        if (Object.hasOwn(this.Envelopes, newName)) {
            throw new Error("Envelope with that name already exists");
        }
        this.Envelopes[oldName].name = newName;
        this.Envelopes[newName] = this.Envelopes[oldName];
        delete this.Envelopes[oldName];
        return this.Envelopes[newName];
    }
}
module.exports = Envelopes;