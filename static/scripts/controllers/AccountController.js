import { Account } from "../models/Account.js";


export function createAccount(account){
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let newAccount;

    const matchingAccount = accounts.filter(item => item.name === account.name);
    if (matchingAccount.length > 0){
        console.error(`Failed to add account ${account.name} : account with the same name already exists.`);
        return {'success': false, 'message': 'Account already exists.'};
    }

    if(account instanceof Account){
        newAccount = account.toJSON();
    }else{
        newAccount = account
    }
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    return {'success': true, 'message': `New account ${account.name} is succesfully added!`};
}

export function updateAccountNickName(oldAccount, newAccount){
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    const matchingAccount = accounts.filter(item => item.name === oldAccount.name);
    console.log(matchingAccount);
}

export function getAllAccounts(){
    const accounts =  JSON.parse(localStorage.getItem('accounts')) || [];
    let accountObjs = [];
    Object.values(accounts).forEach(item => {
        accountObjs.push(Account.fromJSON(item));
    });
    return accountObjs;
}

export function getAccountByName(accountName){
    const accounts =  JSON.parse(localStorage.getItem('accounts')) || [];
    const matchingAccount = Object.values(accounts).filter(item => item.name === accountName);

    if (matchingAccount.length == 1){
        return Account.fromJSON(Object.values(matchingAccount)[0]);
    }else{
        console.warn(`No account found with name : ${accountName}`);
        return false;
    }
}

export function deleteAccountByName(accountName){
    const accounts =  JSON.parse(localStorage.getItem('accounts')) || [];
    const updatedAccounts = Object.values(accounts).filter(item => item.name !== accountName); 
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
}