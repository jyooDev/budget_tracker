import './utils/darkmode.js'; 
import { Account } from './models/Account.js';
import { createAccount, deleteAccountByName, getAccountByName, getAllAccounts } from './controllers/AccountController.js';
import { CreditCard, DebitCard } from './models/PaymentMethod.js';
import { bindIndexEvents } from './events/indexEvents.js';
import { getAllCreditCards, getAllDebitCards } from './controllers/PaymentMethodController.js';
import { getAllTransactions } from './controllers/TransactionController.js';

document.addEventListener('DOMContentLoaded', () => {
    bindIndexEvents();
    console.log(getAllAccounts());
    console.log(getAllDebitCards());
    console.log(getAllCreditCards());
    // console.log(getCash());
    console.log(getAllTransactions());
})