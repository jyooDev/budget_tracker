
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

export async function populateLinkedAccountList(){
    const selectContainer = document.getElementById('indexLinkedAccount');
    const list = getAllAccounts();
    list.forEach(account => {
        const option = document.createElement('option');
        option.value = account.name;
        option.textContent = account.name;
        selectContainer.appendChild(option);
    })
    selectContainer.addEventListener('change', () => {
    })
}