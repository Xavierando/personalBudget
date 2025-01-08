export const Envelope = (name, amount) => {
        this._name = name;
        this._amount = amount;
    }   
    Envelope.name = () => {
        return this._name;
    }
    Envelope.amount = () => {
        return this._amount;
    }
    Envelope.addAmount = (amount) => {
        if(!isNumber(amount)) {
            throw new Error("Invalid Input, amount must be a number");
        }
        this._amount += amount;
        return this._amount;
    }
    Envelope.removeAmount = (amount) => {
        if(!isNumber(amount)) {
            throw new Error("Invalid Input, amount must be a number");
        }
        if(this._amount - amount < 0) {
            throw new Error("Envelope can't have a negative amount");
        }
        this._amount -= amount;
        return this._amount;
    }
    Envelope.persist = () => {
    }