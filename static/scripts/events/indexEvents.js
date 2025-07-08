import { toggleItem, hideItem, populateCurrencyDatalist, populateAccountList, populateIncomeCategoryList, populateExpenseCategoryList, populatePaymentMethodList} from "../ui/renderModals.js";
import { Account } from "../models/Account.js";
import { DebitCard, CreditCard } from "../models/PaymentMethod.js";
import { createAccount, getAccountByName } from "../controllers/AccountController.js";
import { createCreditCard, createDebitCard } from "../controllers/PaymentMethodController.js";
import { addIncome, addExpense, addTransaction } from "../controllers/TransactionController.js";

const quickTools = {
    'indexAddAccountToggleButton' : 'addAccountModal',
    'indexAddCardToggleButton' : 'addCardModal',
    'indexAddIncomeToggleButton' : 'addIncomeModal',
    'indexAddExpenseToggleButton' : 'addExpenseModal',
};

export function bindIndexEvents(){
    for(const [buttonId, modalId] of Object.entries(quickTools)){
        quickToolBarEvent(buttonId, modalId);
    }
    populateCurrencyDatalist();
    populateAccountList();
    populateExpenseCategoryList();
    populateIncomeCategoryList();
    populatePaymentMethodList();
    addNewAccountFormSubmitEvent();
    addIncomeFormSubmitEvent();
    addCardEvent();
    addExpenseFormSubmitEvent();
}

function quickToolBarEvent(buttonId, modalId){
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    const closeButton = modal.querySelector('.modalCloseButton');
    button.addEventListener('click', () => {
        toggleItem(modal);
    });

    closeButton.addEventListener('click', () => {
        toggleItem(modal);
    })
    
}


function addNewAccountFormSubmitEvent(){
    const form = document.getElementById('addNewAccountForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        let account;
        if (data.nickname.trim() === ''){
            account = new Account(data.name, data.type, data.currency, data.balance);
        }else{
            account = new Account(data.name, data.type, data.currency, data.balance, data.nickname);
        }
        const success = createAccount(account);
        window.alert(success.message);
        location.reload();
    })
}

function addCardEvent(){
    const creditCardInputContainer = document.getElementById('creditCardInputContainer');
    const debitCardLinkedAccountContainer = document.getElementById('debitCardLinkedAccountContainer');
    const typeSelect = document.getElementById('cardType');
    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'credit'){
            toggleItem(creditCardInputContainer);
            hideItem(debitCardLinkedAccountContainer);
            debitCardLinkedAccountContainer.getElementsByTagName('select')[0].disabled = true;
            creditCardInputContainer.getElementsByTagName('input')[0].disabled = false;
            creditCardInputContainer.getElementsByTagName('input')[1].disabled = false;
            debitCardLinkedAccountContainer.getElementsByTagName('select')[0].setAttribute('required','False');
            creditCardInputContainer.getElementsByTagName('input')[0].setAttribute('required','True');
            creditCardInputContainer.getElementsByTagName('input')[1].setAttribute('required','True');

        }else if (typeSelect.value === 'debit'){
            toggleItem(debitCardLinkedAccountContainer);
            hideItem(creditCardInputContainer);
            debitCardLinkedAccountContainer.getElementsByTagName('select')[0].disabled = false;
            creditCardInputContainer.getElementsByTagName('input')[0].disabled = true;
            creditCardInputContainer.getElementsByTagName('input')[1].disabled = true;
            debitCardLinkedAccountContainer.getElementsByTagName('select')[0].setAttribute('required','True');
            creditCardInputContainer.getElementsByTagName('input')[0].setAttribute('required','False');
            creditCardInputContainer.getElementsByTagName('input')[1].setAttribute('required','False');
            
        }
    });
    addCardFormSubmitEvent();
}

function addCardFormSubmitEvent(){
    const form = document.getElementById('addCardForm');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        let success; 
        if(data.type === 'credit'){
            const creditCard = new CreditCard(data.name, data.limit, data.balance);
            success = createCreditCard(creditCard);
        }else if(data.type === 'debit'){
            const linkedAccount = getAccountByName(data.linkedAccount);
            const debitCard = new DebitCard(data.name, linkedAccount);
            success = createDebitCard(debitCard);
        }
        window.alert(success.message);
        location.reload();

    })
}

function addIncomeFormSubmitEvent(){
    const form = document.getElementById('addIncomeForm');
    const addIncomeAccountSelect = document.getElementById('addIncomeAccountSelect');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        let success;
        if(data.account==='cash'){
            let balance = JSON.parse(localStorage.getItem('cash')) || 0;
            let newBalnace = parseFloat(balance) + parseFloat(data.amount);
            localStorage.setItem('cash', JSON.stringify(newBalnace));
            addTransaction('income', data.category, data.amount, newBalnace, data.note, 'cash', null);
            success = { 'success' : true, 'message': `Transaction is processed successfully! \nNew Cash Balance: ${newBalnace}`}; 
        }else{
            success = addIncome(data.category, data.amount, data.note, data.account);
        }
        window.alert(success.message);
        location.reload();
    })
}

function addExpenseFormSubmitEvent(){
    const form = document.getElementById('addExpenseForm');
    const addExpensePaymentMethodSelect = document.getElementById('addExpensePaymentMethodSelect');

    addExpensePaymentMethodSelect.addEventListener('change', () => {
        const selected = addExpensePaymentMethodSelect.options[addExpensePaymentMethodSelect.selectedIndex];
        const paymentType = selected.getAttribute('paymenttype');
        const balance = selected.dataset.balance;
        console.log(balance);
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        addExpense('grocery', 300, 'weekly grocery chicken', 'credit card', 'credit card');
    })

    
}