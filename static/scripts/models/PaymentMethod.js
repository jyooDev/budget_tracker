import { Account} from './Account.js';

export class CreditCard{
    constructor(name, limit, balance){
        this.name = name,
        this.limit = limit
        this.balance = balance
    };

    toJSON(){
        return {
            name: this.name,
            limit: this.limit
        };
    }

    static fromJSON(card){
        return new CreditCard(card.name, card.limit);
    }
}

export class DebitCard{
    constructor(name, linkedAccount){
        this.name = name,
        this.linkedAccount = linkedAccount
    };

    toJSON(){
        return {
            name: this.name,
            linkedAccount: this.linkedAccount
        }
    }

    static fromJSON(card){
        const linkedAccount = new Account(
            card.linkedAccount.name,
            card.linkedAccount.nickname,
            card.linkedAccount.type,
            card.linkedAccount.currency,
            card.linkedAccount.balance);
        return new DebitCard(card.name, linkedAccount);
    }
}