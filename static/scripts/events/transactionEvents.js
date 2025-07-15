
import { renderIncomes, renderExpenses } from '../ui/renderTransactionComponents.js';
import { deleteExpense, deleteIncome } from '../controllers/TransactionController.js';
import { Transaction } from '../models/Transaction.js';

export function bindTransactionEvents(){
    renderIncomes();
    renderExpenses();
    deleteIncomeEvent();
    deleteExpenseEvent();
}

function deleteIncomeEvent(){
    const buttons = document.querySelectorAll('.delete-income-button');
    buttons.forEach(button => {
        const incomeData = button.dataset;
        button.addEventListener('click', () => {
            deleteIncome(incomeData.category, incomeData.amount, incomeData.account);
            renderIncomes();
        })
    })
}


function deleteExpenseEvent(){
    const buttons = document.querySelectorAll('.delete-expense-button');
    buttons.forEach(button => {
        const expenseData = button.dataset;
        button.addEventListener('click', () => {
            deleteExpense(expenseData.category, expenseData.amount, expenseData.method);
            renderExpenses();
        })
    })
}


