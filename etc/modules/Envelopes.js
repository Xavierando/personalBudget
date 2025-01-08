import { Envelope } from "./Envelope.js";

export const Envelopes = () => {
    this.Envelopes = [];
}
Envelopes.createNewEnvelope = (name, amount) => {
    if(Object.hasOwn(this.Envelopes, name)) {
        throw new Error("Envelope with that name already exists");
    }
    this.Envelopes[name] = new Envelope(name, amount);
    return this.Envelopes[name];
}
Envelopes.Lists = () => {
    return this.Envelopes;
}
Envelopes.getEnvelope = (name) => {
    if(!Object.hasOwn(this.Envelopes, name)) {
        throw new Error("Envelope with that name doesn't exist");
    }
    return this.Envelopes[name];
}
Envelopes.removeEnvelope = (name) => {
    if(!Object.hasOwn(this.Envelopes, name)) {
        throw new Error("Envelope with that name doesn't exist");
    }
    delete this.Envelopes[name];
}
Envelopes.TotalAmount = () => {
    let total = 0;
    for(let name in this.Envelopes) {
        total += this.Envelopes[name].amount();
    }
    return total;
}
