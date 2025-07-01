

export class Transaction {
    constructor(transactionType, category, amount, newBalance, note, linkedAccount=null, paymentMethod = null){
        this.transasctionType = transactionType
        this.category = category;
        this.amount = amount;
        this.newBalance = newBalance;
        this.linkedAccount = linkedAccount;
        this.paymentMethod = paymentMethod;
        this.note = note
        const today = new Date();
        this.date = {
            'date': today.getDate(),
            'month': today.getMonth(),
            'year': today.getFullYear()
        };
    }

    toJSON() {
        return {
            transasctionType: this.transasctionType,
            category: this.category,
            amount: this.amount,
            newBalance: this.newBalance,
            linkedAccount: this.linkedAccount,
            paymentMethod: this.paymentMethod,
            note: this.note,
            date: this.date['date'],
            month: this.date['month'],
            year: this.date['year']
        };
    }
    
    static fromJSON(transaction){
        const obj = new Transaction(transaction.transactionType, transaction.category, transaction.amount, transaction.newBalance, transaction.amount, transaction.newBalance, transaction.note, transaction.linkedAccount, transaction.paymentMethod);
        obj.date = {
            'date': transaction.date,
            'month': transaction.month,
            'year': transaction.year
        };
        return obj;
    }
}