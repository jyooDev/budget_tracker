import { getAllAccounts } from './AccountController.js';
import { Transaction } from '../models/Transaction.js';

export function getAllTransactions(){

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

export function addTransaction(type, category, amount, balance, note, account, paymentmethod){
    const transaction = new Transaction(type, category, amount, balance, note, account, paymentmethod);
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction.toJSON());
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

export function addExpense(accountName, expense){
    const accounts = getAllAccounts();
    const targetAccount = accounts.find(account => account.name === accountName);
    if(targetAccount){
        targetAccount.balance = parseFloat(targetAccount.balance) - parseFloat(expense);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        return { 'success' : true, 'message': `Transaction is processed successfully! \nAccount: "${targetAccount.name}" New Balance: ${targetAccount.balance}`} ;
    }else{
        return { 'success' : false, 'message': `Account with name ${accountName} not found.`}; 
    }    
}