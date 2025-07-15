
import { fetchCurrencyChange, fetchCurrencyList } from "../apis/currencyAPI.js";
import { getAllAccounts, getAccountByName } from "../controllers/AccountController.js";
import { getAllCreditCards, getAllDebitCards } from "../controllers/PaymentMethodController.js";
import { currencyInfo } from "../utils/constants.js";
import { createChart } from "../utils/chart.js";


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
    const accountSelectDropdowns = document.querySelectorAll('.account-select-dropdown');
    const list = getAllAccounts();
    list.forEach(account => {
        const option1 = document.createElement('option');   

        option1.value = account.name;
        option1.textContent = account.name;
        addIncomeAccountSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = account.name;
        option2.textContent = account.name;
        addCardAccountSelect.appendChild(option2);
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

export function populateCurrencyRateList(){
    const dropDownLists = document.querySelectorAll('.currencyRateList');
    Object.entries(currencyInfo).forEach(([currencyCode, imgApiCode]) => {
        dropDownLists.forEach(dropdown => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" currency-code=${currencyCode} class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <img class="w-6 h-6 me-2 rounded-full" src="https://flagsapi.com/${imgApiCode}/flat/24.png" alt="${imgApiCode}-flag">
          ${currencyCode}
        </a>`;
          dropdown.appendChild(li);
      })
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
        option.dataset.balance = getAccountByName(card.linkedAccount).balance
        option.setAttribute('paymentType', 'debitcard');
        addExpensePaymentMethodSelect.appendChild(option);
    })
    bankAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.name;
        option.textContent = `Bank Transfer : ${account.name}`;
        option.setAttribute('paymentType', 'bank-transfer');
        option.dataset.balance = account.balance;
        addExpensePaymentMethodSelect.appendChild(option);
    })

}

export async function renderCurrencyChart(){
    const fromSelect = localStorage.getItem('fromCurrencyCode');
    const toSelect = localStorage.getItem('toCurrencyCode');

    const fromButton = document.getElementById('fromCurrencyRateDropdownButton');
    const toButton = document.getElementById('toCurrencyRateDropdownButton');
    if(fromSelect && toSelect){
        const data = await fetchCurrencyChange(fromSelect,toSelect);
        const toImg = document.querySelector(`[currency-code="${toSelect}"]`).firstElementChild;
        const fromImg = document.querySelector(`[currency-code="${fromSelect}"]`).firstElementChild;
        const cloneTo = toImg.cloneNode(true);
        const cloneFrom = fromImg.cloneNode(true);
        toButton.firstElementChild.nextElementSibling.innerHTML = '';
        toButton.firstElementChild.nextElementSibling.appendChild(cloneTo);
        fromButton.firstElementChild.nextElementSibling.innerHTML = '';
        fromButton.firstElementChild.nextElementSibling.appendChild(cloneFrom);
        createChart(Chart, data.dates, data.currencyRates, fromSelect);
    }
}