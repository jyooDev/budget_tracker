export class Account {
    constructor(name, type, currency, balance = 0, nickname = null){
        this.name = name;
        if(nickname == null ){
            this.nickname = this.name;
        }else{
            this.nickname = nickname
        }
        this.type = type;
        this.currency = currency;
        this.balance = balance;
    }

    toJSON() {
        return {
            name: this.name,
            nickname: this.nickname,
            type: this.type,
            currency: this.currency,
            balance: this.balance
        };
    }
    
    static fromJSON(account){
        return new Account(account.name, account.type, account.currency, account.balance, account.nickname);
    }
}