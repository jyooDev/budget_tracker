import { CreditCard, DebitCard } from "../models/PaymentMethod.js";


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

export function createDebitCard(card){
    let cards = JSON.parse(localStorage.getItem('debitcards')) || [];
    let newCard;

    const matchingAccount = cards.filter(item => item.name === card.name);
    if (matchingAccount.length > 0){
        console.warn(`Failed to add account ${card.name} : card with the same name already exists.`);
        return {'success': false, 'message': 'Card already exists.'};
    }

    if(card instanceof DebitCard){
        newCard = card.toJSON();
    }else{
        newCard = card;
    }
    cards.push(newCard);
    localStorage.setItem('debitcards', JSON.stringify(cards));
    return {'success': true, 'message': `New card ${card.name} is succesfully added!`};
}