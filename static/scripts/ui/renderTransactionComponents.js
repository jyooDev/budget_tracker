import { getAccountByName } from "../controllers/AccountController.js";
import { getAllExpenses, getAllIncomes, getAllTransactions } from "../controllers/TransactionController.js";


export function renderIncomes(){
    const tableBody=document.getElementById('income-transaction-table-body');
    tableBody.innerHTML = '';
    const incomes = getAllIncomes();

    incomes.forEach(income => {
        const row = `                    
        <tr class="text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700">
            <td class="px-6 py-1 font-medium text-gray-900 dark:text-white">
                ${String(income.date.month).padStart(2, '0')}-${String(income.date.date).padStart(2, '0')}-${String(income.date.year)}
            </td>
            <td class="px-6 py-1">
                ${income.category}
            </td>
            <td class="px-6 py-1">
                ${income.linkedAccount}
            </td>
            <td class="px-6 py-1">
                ${getAccountByName(income.linkedAccount).currency}
            </td>
            <td class="px-6 py-1">
                ${income.amount}
            </td>
            <td class="px-6 py-1 text-right">
                <button 
                class="delete-income-button font-medium text-blue-600 dark:text-blue-500 hover:underline"
                data-date='${JSON.stringify(income.date)}'
                data-amount='${income.amount}'
                data-category='${income.category}'
                data-account='${income.linkedAccount}'
                >Delete</a>
            </td>
        </tr>  
        `;
        tableBody.innerHTML += row;
    })
}



export function renderExpenses(){
    const tableBody=document.getElementById('expense-transaction-table-body');
    tableBody.innerHTML = '';
    const expenses = getAllExpenses();
    console.log(expenses);
    expenses.forEach(e => {
        const row = `                    
        <tr class="text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700">
            <td class="px-6 py-1 font-medium text-gray-900 dark:text-white">
                ${String(e.date.month).padStart(2, '0')}-${String(e.date.date).padStart(2, '0')}-${String(e.date.year)}
            </td>
            <td class="px-6 py-1">
                ${e.category}
            </td>
            <td class="px-6 py-1">
                ${e.paymentMethod}
            </td>
            <td class="px-6 py-1">
                ${e.amount}
            </td>
            <td class="px-6 py-1 text-right">
                <button 
                class="delete-expense-button font-medium text-blue-600 dark:text-blue-500 hover:underline"
                data-date='${JSON.stringify(e.date)}'
                data-amount='${e.amount}'
                data-category='${e.category}'
                data-method='${e.paymentMethod}'
                >Delete</a>
            </td>
        </tr>  
        `;
        tableBody.innerHTML += row;
        console.log(e);
    })
}