

export async function fetchCurrencyList(){
    try{
        const response = await fetch('https://openexchangerates.org/api/currencies.json');
        const data = await response.json();
        return data;
    }catch (error){
        console.error(error);
    }
}

export async function fetchCurrencyChange(from, to){
    try{
        const today = new Date();
        const pastDate = new Date(today);
        const urls = [];
        for (let i = 4; i >= 0; i --){
            pastDate.setDate(today.getDate() - i);
            const dmy = formatDate(pastDate);
            urls.push(`https://api.frankfurter.app/${dmy}?from=${from}&to=${to}`);
        }
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        const dates = data.map(data => data.date);
        const currency = data.map(data => data.rates[`${to}`]);
        return {dates: dates, currencyRates : currency};
    } catch(error){
        console.error(error);
    }
}


// HELPER METHOD
function formatDate(date){
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
}