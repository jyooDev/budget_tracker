import { toggleModal, populateCurrencyDatalist } from "../ui/renderModals.js";
import { Account } from "../models/Account.js";
import { createAccount } from "../controllers/AccountController.js";
const quickTools = {
    'indexAddAccountToggleButton' : 'addAccountModal',

};

const forms = [
    'addNewAccountForm'
]

export function bindIndexEvents(){
    for(const [buttonId, modalId] of Object.entries(quickTools)){
        quickToolBarEvent(buttonId, modalId);
    }
    populateCurrencyDatalist();
    addNewAccountFormSubmitEvent();
}

function quickToolBarEvent(buttonId, modalId){
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    const closeButton = document.querySelector('.modalCloseButton');
    button.addEventListener('click', () => {
        toggleModal(modal);
    });

    closeButton.addEventListener('click', () => {
        console.log("CLICKCED");
        toggleModal(modal);
    })
    
}


function addNewAccountFormSubmitEvent(){
    const form = document.getElementById('addNewAccountForm');
    console.log(form);

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