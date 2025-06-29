

export async function fetchCurrencyList(){
    const response = await fetch('https://openexchangerates.org/api/currencies.json');
    const data = await response.json();
    return data;
}