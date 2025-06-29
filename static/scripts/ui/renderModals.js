
import { fetchCurrencyList } from "../apis/currencyAPI.js";

export function toggleModal(modal){
    modal.classList.toggle('hidden');
};


export async function populateCurrencyDatalist(){
    const data = await fetchCurrencyList();
    const dataList = document.getElementById('currencyList');
    const currencyInput = document.getElementById('currencyInput');
    console.log(data);
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