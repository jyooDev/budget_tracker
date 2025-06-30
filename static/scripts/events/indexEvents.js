import { toggleItem, hideItem, populateCurrencyDatalist, populateLinkedAccountList } from "../ui/renderModals.js";
import { Account } from "../models/Account.js";
import { DebitCard, CreditCard } from "../models/PaymentMethod.js";
import { createAccount } from "../controllers/AccountController.js";
import { createCreditCard, createDebitCard } from "../controllers/PaymentMethodController.js";

const quickTools = {
    'indexAddAccountToggleButton' : 'addAccountModal',
    'indexAddCardToggleButton' : 'addCardModal'
};

export function bindIndexEvents(){
    for(const [buttonId, modalId] of Object.entries(quickTools)){
        quickToolBarEvent(buttonId, modalId);
    }
    populateCurrencyDatalist();
    populateLinkedAccountList();
    addNewAccountFormSubmitEvent();
    addCardEvent();
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
            let card = new CreditCard(data.name, data.limit, data.balance);
            console.log(card);
            success = createCreditCard(card);
        }else if(data.type === 'debit'){
            let card = new DebitCard(data.name, data.linkedAccount);
            console.log(card);

            success = createDebitCard(card);
        }
        window.alert(success.message);

    })
}