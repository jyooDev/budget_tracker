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
        const account = getAccountByName(this.linkedAccount);
        return {
            name: this.name,
            linkedAccount: {
                name: account.name,
                nickname: account.nickname,
                type: account.type,
                currency: account.currency,
                balance: account.balance
            }
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