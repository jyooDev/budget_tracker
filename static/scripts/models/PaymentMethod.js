import { getAccountByName } from '../controllers/AccountController.js';
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
            limit: this.limit,
            balance:  this.balance
        };
    }

    static fromJSON(card){
        return new CreditCard(card.name, card.limit, card.balance);
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
            linkedAccount: {
                name: this.linkedAccount.name,
                nickname: this.linkedAccount.nickname,
                type: this.linkedAccount.type,
                currency: this.linkedAccount.currency,
                balance: this.linkedAccount.balance
            }
        }
    }

    static fromJSON(card){
        return new DebitCard(card.name, card.linkedAccount.name);
    }
}