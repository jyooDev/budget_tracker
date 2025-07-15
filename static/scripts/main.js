import './utils/darkmode.js'; 
import { Account } from './models/Account.js';
import { createAccount, deleteAccountByName, getAccountByName, getAllAccounts } from './controllers/AccountController.js';
import { CreditCard, DebitCard } from './models/PaymentMethod.js';
import { bindIndexEvents } from './events/indexEvents.js';
import { getAllCreditCards, getAllDebitCards } from './controllers/PaymentMethodController.js';
import { getAllTransactions } from './controllers/TransactionController.js';
import { fetchCurrencyChange } from './apis/currencyAPI.js';
import { bindTransactionEvents } from './events/transactionEvents.js';
import { addExpense } from './controllers/TransactionController.js';
document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    if (url.includes('index.html')){
        bindIndexEvents();
    }
    else if (url.includes('transaction.html')){
        bindTransactionEvents();
    }
    // console.log(getAllAccounts());
    // console.log(getAllDebitCards());
    // console.log(getAllCreditCards());
    // console.log(getAllTransactions());

    // localStorage.removeItem('accounts');
    // localStorage.removeItem('creditcards');
    // localStorage.removeItem('debitcards');
    // localStorage.removeItem('transactions');
})
