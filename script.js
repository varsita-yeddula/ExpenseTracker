let totalIncome = 0;
let totalExpenses = 0;
const expenses = []; // To store all expense entries

// Add Income
document.getElementById('income-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const incomeTitle = document.getElementById('income-title').value;
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);

    if (incomeTitle && incomeAmount) {
        totalIncome += incomeAmount;
        updateSummary();
        // Clear form
        document.getElementById('income-title').value = '';
        document.getElementById('income-amount').value = '';
        document.getElementById('income-date').value = '';
    }
});

// Add Expense
document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseTitle = document.getElementById('expense-title').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseDate = document.getElementById('expense-date').value;

    if (expenseTitle && expenseAmount && expenseDate) {
        const expense = { title: expenseTitle, amount: expenseAmount, date: expenseDate };
        expenses.push(expense);
        totalExpenses += expenseAmount;

        // Update Expense History
        const expenseList = document.getElementById('expense-items');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expenseTitle} - ₹${expenseAmount} - ${expenseDate}</span>
            <button class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(listItem);

        // Delete event
        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            totalExpenses -= expenseAmount;
            expenses.splice(expenses.indexOf(expense), 1);
            updateSummary();
            listItem.remove();
        });

        updateSummary();

        // Clear form
        document.getElementById('expense-title').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-date').value = '';
    }
});

// Update Summary
function updateSummary() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = (totalIncome - totalExpenses).toFixed(2);
}

// Filter Expenses
document.getElementById('filter-expenses').addEventListener('click', function () {
    const year = document.getElementById('filter-year').value;
    const month = document.getElementById('filter-month').value;
    const filteredExpenses = expenses.filter(exp => {
        const date = new Date(exp.date);
        const matchesYear = year ? date.getFullYear() === parseInt(year) : true;
        const matchesMonth = month ? date.getMonth() + 1 === parseInt(month) : true;
        return matchesYear && matchesMonth;
    });

    const expenseList = document.getElementById('expense-items');
    expenseList.innerHTML = ''; // Clear existing list

    filteredExpenses.forEach(exp => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${exp.title} - ₹${exp.amount} - ${exp.date}</span>
        `;
        expenseList.appendChild(listItem);
    });
});
// Add Expense with Delete Option
document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseTitle = document.getElementById('expense-title').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseDate = document.getElementById('expense-date').value;

    if (expenseTitle && expenseAmount && expenseDate) {
        const expense = { title: expenseTitle, amount: expenseAmount, date: expenseDate };
        expenses.push(expense);
        totalExpenses += expenseAmount;

        // Update Expense History
        const expenseList = document.getElementById('expense-items');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expense.title} - ₹${expense.amount} - ${expense.date}</span>
            <button class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(listItem);

        // Add Event Listener to Delete Button
        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            deleteExpense(expense, listItem);
        });

        updateSummary();

        // Clear form
        document.getElementById('expense-title').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-date').value = '';
    }
});

// Delete Expense Function
function deleteExpense(expense, listItem) {
    // Update total expenses and remove from array
    totalExpenses -= expense.amount;
    const index = expenses.indexOf(expense);
    if (index !== -1) expenses.splice(index, 1);

    // Remove list item from DOM
    listItem.remove();

    // Update Summary
    updateSummary();
}

// Update Summary Function (no changes from previous)
function updateSummary() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = (totalIncome - totalExpenses).toFixed(2);
}
