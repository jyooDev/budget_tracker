
import { fetchCurrencyList } from "../apis/currencyAPI.js";
import { getAllAccounts } from "../controllers/AccountController.js";

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

export async function populateAccountList(){
    const selectContainer = document.getElementById('indexLinkedAccount');
    const addIncomeAccountSelect = document.getElementById('addIncomeAccountSelect');
    const list = getAllAccounts();
    list.forEach(account => {
        const option = document.createElement('option');
        option.value = account.name;
        option.textContent = account.name;
        selectContainer.appendChild(option);
        addIncomeAccountSelect.appendChild(option);
    });
}

export async function populateIncomeCategoryList(){
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