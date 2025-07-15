import { getAllAccounts } from './AccountController.js';
import { Transaction } from '../models/Transaction.js';
import { getAllCreditCards, getAllDebitCards } from './PaymentMethodController.js';
export function getAllTransactions(){
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let transactionObjs = [];
    Object.values(transactions).forEach(item => {
        transactionObjs.push(Transaction.fromJSON(item));
    });
    return transactionObjs;
}

export function getAllIncomes(){
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let incomeObjs = [];
    const incomes = transactions.filter(t => t.transaction === 'income');
    Object.values(incomes).forEach(item => {
        incomeObjs.push(Transaction.fromJSON(item));
    });
    return incomeObjs;
}

export function getAllExpenses(){
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let expenseObjs = [];
    const expense = transactions.filter(t => t.transaction === 'expense');
    Object.values(expense).forEach(item => {
        expenseObjs.push(Transaction.fromJSON(item));
    });
    return expenseObjs;
}

export function addIncome(category, amount, note, account){
    const accounts = getAllAccounts();
    const targetAccount = accounts.find(a => a.name === account);
    if(targetAccount){
        targetAccount.balance = parseFloat(amount) + parseFloat(targetAccount.balance);
        localStorage.setItem('accounts', JSON.stringify(accounts)); 
        addTransaction('income', category, amount, targetAccount.balance, note, account, null);
        return { 'success' : true, 'message': `Transaction is processed successfully! \nAccount: "${targetAccount.name}" New Balance: ${targetAccount.balance}`} ;
    }else{
        return { 'success' : false, 'message': `Account with name ${account} not found.`}; 
    }    
}

export function addExpense(category, amount, note, paymentMethod, paymentType){
    console.log(parseFloat(amount));
    const accounts = getAllAccounts();

    if (paymentType === 'creditcard'){
        const cards = getAllCreditCards();
        const card = cards.filter(c => c.name = paymentMethod)[0];
        card.balance = parseFloat(card.balance) - parseFloat(card.balance);
        localStorage.setItem('creditcards', JSON.stringify(cards));
        addTransaction('expense', category, amount, card.balance, note, null, paymentMethod);
        return { 'success' : true, 'message': `Transaction is processed successfully! \Card: "${card.name}" New Balance: ${card.balance}`} ;
    }else if (paymentType === 'debitcard'){
        const cards = getAllDebitCards();
        const card = cards.filter(c => c.name = paymentMethod)[0];
        card.balance = parseFloat(card.balance) - parseFloat(card.balance);
        localStorage.setItem('debitcards', JSON.stringify(cards));
        addTransaction('expense', category, amount, card.balance, note, null, paymentMethod);
        return { 'success' : true, 'message': `Transaction is processed successfully! \Card: "${card.name}" New Balance: ${card.balance}`} ;
    }else if (paymentType === 'bank-transfer'){
        console.log(accounts);
        const account = accounts.filter(a => a.name = paymentMethod.split(":")[0])[0];
        console.log(account);
        account.balance = parseFloat(account.balance).toFixed(2) - parseFloat(amount).toFixed(2);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        addTransaction('expense', category, amount, account.balance, note, null, paymentMethod);
        return { 'success' : true, 'message': `Transaction is processed successfully! \nAccount: "${account.name}" New Balance: ${account.balance}`} ;
    }
}

export function addTransaction(type, category, amount, balance, note, account, paymentmethod){
    const transaction = new Transaction(type, category, amount, balance, note, account, paymentmethod);
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction.toJSON());
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

export function deleteExpense(category, amount){
    // NEED LOGIS TO UPDATE RELATED ACCOUNT BALANCE IF Debit,bank transfer, or cash
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const tIndex = transactions.findIndex(t => t.transaction === 'expense' 
        && t.category === category && t.amount === amount);
    if(tIndex !== -1){
        transactions.splice(tIndex,1);
    }
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

export function deleteIncome(category, amount, account){
    const accounts = getAllAccounts();
    const targetAccount = accounts.find(a => a.name === account);
     if(targetAccount){
        targetAccount.balance = parseFloat(targetAccount.balance) - parseFloat(amount);
        localStorage.setItem('accounts', JSON.stringify(accounts)); 
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const tIndex = transactions.findIndex(t => t.transaction === 'income' 
            && t.category === category && t.linkedAccount === account);
        if(tIndex !== -1){
            transactions.splice(tIndex,1);
        }
        localStorage.setItem('transactions', JSON.stringify(transactions));
     }
}

