import './utils/darkmode.js'; 
import { Account } from './models/Account.js';
import { createAccount, deleteAccountByName, getAccountByName, getAllAccounts } from './controllers/AccountController.js';
import { CreditCard, DebitCard } from './models/PaymentMethod.js';
import { bindIndexEvents } from './events/indexEvents.js';
import { getAllDebitCards } from './controllers/PaymentMethodController.js';

document.addEventListener('DOMContentLoaded', () => {
    bindIndexEvents();
    console.log(getAllDebitCards());
})