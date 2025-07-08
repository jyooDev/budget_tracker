import { CreditCard, DebitCard } from "../models/PaymentMethod.js";
import { getAccountByName } from "./AccountController.js";

// CREDIT CARD
export function createCreditCard(card){
    let cards = JSON.parse(localStorage.getItem('creditcards')) || [];
    let newCard;

    const matchingAccount = cards.filter(item => item.name === card.name);
    if (matchingAccount.length > 0){
        console.warn(`Failed to add account ${card.name} : card with the same name already exists.`);
        return {'success': false, 'message': 'Card already exists.'};
    }

    if(card instanceof CreditCard){
        newCard = card.toJSON();
    }else{
        newCard = card;
    }
    cards.push(newCard);
    localStorage.setItem('creditcards', JSON.stringify(cards));
    return {'success': true, 'message': `New card ${card.name} is succesfully added!`};
}


export function getAllCreditCards(){
    let cards = JSON.parse(localStorage.getItem('creditcards')) || [];
    let cardObjs = [];
    Object.values(cards).forEach(item => {
        cardObjs.push(CreditCard.fromJSON(item));
    });
    return cardObjs;
}



// DEBIT CARD
export function createDebitCard(card){
    let cards = JSON.parse(localStorage.getItem('debitcards')) || [];
    let newCard;
    console.log(cards);
    const matchingAccount = cards.filter(item => item.name === card.name);
    if (matchingAccount.length > 0){
        console.warn(`Failed to add account ${card.name} : card with the same name already exists.`);
        return {'success': false, 'message': 'Card already exists.'};
    }
    
    if(card instanceof DebitCard){
        console.log('instance')
        newCard = card.toJSON();
    }else{
        newCard = card;
    }
    cards.push(newCard);
    localStorage.setItem('debitcards', JSON.stringify(cards));
    return {'success': true, 'message': `New card ${card.name} is succesfully added!`};
}

export function getAllDebitCards(){
    let cards = JSON.parse(localStorage.getItem('debitcards')) || [];
    let cardObjs = [];
    Object.values(cards).forEach(item => {
        cardObjs.push(DebitCard.fromJSON(item));
    });
    return cardObjs;
}