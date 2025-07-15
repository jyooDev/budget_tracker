import { toggleItem, hideItem, populateCurrencyDatalist, populateAccountList, populateIncomeCategoryList, populateExpenseCategoryList, populatePaymentMethodList, populateCurrencyRateList, renderCurrencyChart} from "../ui/renderIndexComponents.js";
import { Account } from "../models/Account.js";
import { DebitCard, CreditCard } from "../models/PaymentMethod.js";
import { createAccount, getAccountByName } from "../controllers/AccountController.js";
import { createCreditCard, createDebitCard } from "../controllers/PaymentMethodController.js";
import { addIncome, addExpense, addTransaction } from "../controllers/TransactionController.js";
import { fetchCurrencyChange } from "../apis/currencyAPI.js";
import { createChart } from "../utils/chart.js";

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
    populateCurrencyRateList();
    populateExpenseCategoryList();
    populateIncomeCategoryList();
    populatePaymentMethodList();
    renderCurrencyChart();
    addNewAccountFormSubmitEvent();
    addIncomeFormSubmitEvent();
    addCardEvent();
    addExpenseFormSubmitEvent();
    currencyRateChangeEvent();
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
    let paymentType;
    addExpensePaymentMethodSelect.addEventListener('change', () => {
        const selected = addExpensePaymentMethodSelect.options[addExpensePaymentMethodSelect.selectedIndex];
        paymentType = selected.getAttribute('paymentType');
        const balance = selected.dataset.balance;
        console.log(paymentType);
        console.log(selected);
        console.log(balance);
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        let success;
        console.log(data);
        if(data.account==='cash'){
            let balance = JSON.parse(localStorage.getItem('cash')) || 0;
            let newBalance = parseFloat(balance) - parseFloat(data.amount);
            localStorage.setItem('cash', JSON.stringify(newBalance));
            addTransaction('expense', data.category, data.amount, newBalance, data.note, null, 'cash');
            success = { 'success' : true, 'message': `Transaction is processed successfully! \nNew Cash Balance: ${newBalance}`}; 
        }else{
            success = addExpense(data.category, data.amount, data.note, data.method, paymentType);
        }
        window.alert(success.message);
        location.reload();
    })    
}

function currencyRateChangeEvent(){
    const fromButton = document.getElementById('fromCurrencyRateDropdownButton');
    const fromDropdownWrapper = document.getElementById('currencyRateFrom');
    const fromDropdownList = document.getElementById('currencyRateFromList');
    const toButton = document.getElementById('toCurrencyRateDropdownButton');
    const toDropdownListWrapper = document.getElementById('currencyRateTo');
    const toDropdownList = document.getElementById('currencyRateToList');
    fromButton.addEventListener('click', () => {
        toggleItem(fromDropdownWrapper);
    });

    fromDropdownList.addEventListener('click', async function(event) {
        if (event.target && event.target.tagName === 'A') {
            const currencyCode = event.target.getAttribute('currency-code');
            //first render image 
            const imgElement = event.target.firstElementChild;
            const clone = imgElement.cloneNode(true);
            fromButton.firstElementChild.nextElementSibling.innerHTML = ''
            fromButton.firstElementChild.nextElementSibling.appendChild(clone);
            //store in local storage
            localStorage.setItem('fromCurrencyCode', currencyCode);
            console.log(localStorage.getItem('fromCurrencyCode'));
            //toggle off the dropdown
            toggleItem(fromDropdownWrapper);
            //check if both from and to are selected if it is show the currency changes
            const toSelect = localStorage.getItem('toCurrencyCode')

            if (toSelect != null){
                //fetchcurrencyinfo
                //render fetched currency info 
            }
        }
    });


    toButton.addEventListener('click', () => {
        toggleItem(toDropdownListWrapper);
    });
    

    toDropdownList.addEventListener('click', async function(event) {
        if (event.target && event.target.tagName === 'A') {
            const currencyCode = event.target.getAttribute('currency-code');
            //first render image 
            const imgElement = event.target.getElementsByTagName('img')[0];
            const clone = imgElement.cloneNode(true);
            toButton.firstElementChild.nextElementSibling.innerHTML = ''
            toButton.firstElementChild.nextElementSibling.appendChild(clone);
            //store in local storage
            localStorage.setItem('toCurrencyCode', currencyCode);
            //toggle off the dropdown
            toggleItem(toDropdownListWrapper);
            //check if both from and to are selected if it is show the currency changes
            const fromSelect = localStorage.getItem('fromCurrencyCode')
            if (fromSelect != null){
                const result = await fetchCurrencyChange(fromSelect, currencyCode);
                console.log(result);
                createChart(Chart, result.dates, result.currencyRates, fromSelect);
            }
        }
    });
}