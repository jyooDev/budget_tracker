import './utils/darkmode.js'; 
import { Account } from './models/Account.js';
import { createAccount, deleteAccountByName, getAccountByName, getAllAccounts } from './controllers/AccountController.js';
import { CreditCard, DebitCard } from './models/PaymentMethod.js';
import { bindIndexEvents } from './events/indexEvents.js';

document.addEventListener('DOMContentLoaded', () => {

    const account1 = new Account('chase 0604', 'savings', 'USD', 5000, 'chase long term saving');
    const account2 = new Account('chase 1234', 'checking', 'USD', 5000, 'daily usage');

    bindIndexEvents();
    // const result = createAccount(account1);
    // const result2 = createAccount(account2);
    // console.log(getAllAccounts());
    // getAccountByName(account1.name);
    // getAllAccounts();
    // deleteAccountByName(account1.name);
})