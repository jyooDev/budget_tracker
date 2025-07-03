
import { fetchCurrencyList } from "../apis/currencyAPI.js";
import { getAllAccounts } from "../controllers/AccountController.js";
import { getAllCreditCards, getAllDebitCards } from "../controllers/PaymentMethodController.js";

export function toggleItem(item){
    item.classList.toggle('hidden');
};

export function hideItem(item){
    item.classList.add('hidden');
}

export async function populateCurrencyDatalist(){
    const data = await fetchCurrencyList();
    const dataList = document.getElementById('currencyList');
    const currencyInput = document.getElementById('currencyInput');
    const currencyList = Object.entries(data).map(([abbr, full]) => `${abbr} - ${full}`);
    for(const item in currencyList){
        const option = document.createElement('option');
        option.value = item;
        dataList.appendChild(option);
    };

    const awesome = new Awesomplete(currencyInput, {
        list : currencyList,
        minChars: 1,
        autoFirst: true
    })

    awesome.evaluate();
}

export function populateAccountList(){
    const addIncomeAccountSelect = document.getElementById('addIncomeAccountSelect');
    const addCardAccountSelect = document.getElementById('addCardAccountSelect');
    const list = getAllAccounts();
    console.log(list);
    list.forEach(account => {
        const option = document.createElement('option');
        option.value = account.name;
        option.textContent = account.name;
        addIncomeAccountSelect.appendChild(option);
        addCardAccountSelect.appendChild(option);
    });
}

export function populateIncomeCategoryList(){
    const addIncomeCategorySelect = document.getElementById('addIncomeCategorySelect');
    let list = JSON.parse(localStorage.getItem('incomeTypes')) || [] ;
    if (list.length == 0){
        list = [
        'salary',
        'bonus',
        'side income',
        'pin money',
        'allowance'
        ];
        localStorage.setItem('incomeTypes', JSON.stringify(list));           
    }
    list.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        addIncomeCategorySelect.appendChild(option);
    })
}



export function populateExpenseCategoryList(){
    const addIncomeCategorySelect = document.getElementById('addExpenseCategorySelect');
    let list = JSON.parse(localStorage.getItem('expenseType')) || [] ;
    if (list.length == 0){
        list = [
        'groceries',
        'health',
        'housing/utilities',
        'education',
        'gas',
        'personal care',
        'clothing',
        'food/drink',
        'entertainment',
        'gift',
        'insurance',
        'health',
        'travel',
        'transportation',
        'miscellaneous',
        'self development',
        'subscription',
        'tithe',
        'household essentials',
        ];
        localStorage.setItem('expenseType', JSON.stringify(list));           
    }
    list.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        addIncomeCategorySelect.appendChild(option);
    })
}

export function populatePaymentMethodList(){
    const addExpensePaymentMethodSelect = document.getElementById('addExpensePaymentMethodSelect');
    const creditCards = getAllCreditCards();
    const debitCards = getAllDebitCards();
    const bankAccounts = getAllAccounts();
    let cashBalance = JSON.parse(localStorage.getItem('cash')) || 0;

    const option = document.createElement('option');
    option.value = 'cash',
    option.textContent= 'cash',
    option.setAttribute('paymentType', 'cash');
    option.dataset.balance = cashBalance;
    addExpensePaymentMethodSelect.appendChild(option);

    creditCards.forEach(card => {
        const option = document.createElement('option');
        option.value = card.name;
        option.textContent = card.name;
        option.setAttribute('paymentType', 'creditcard');
        option.dataset.balance = card.balance;
        addExpensePaymentMethodSelect.appendChild(option);
    })
    debitCards.forEach(card => {
        const option = document.createElement('option');
        option.value = card.name;
        option.textContent = card.name;
        option.dataset.balance = card.balance;
        option.setAttribute('paymentType', 'debitcard');
        addExpensePaymentMethodSelect.appendChild(option);
    })
    bankAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.name;
        option.textContent = `Bank Transfer : ${account.name}`;
        option.setAttribute('paymentType', 'account');
        option.dataset.balance = account.balance;
        addExpensePaymentMethodSelect.appendChild(option);
    })

}