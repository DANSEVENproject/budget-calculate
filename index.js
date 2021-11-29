'use strict';

let expensesItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

const getStart = document.querySelector('#start'),
    input = document.querySelectorAll('input'),
    tagPlus = document.querySelectorAll('button'),
    incomeAdd = tagPlus[0],
    expAdd = tagPlus[1],
    checkBox = document.querySelector('#deposit-check'),
    inputIncome = document.querySelectorAll('.additional_income-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesValue = document.querySelector('.expenses_month-value'),
    additionaIncomeValue = document.querySelector('.additional_income-value'),
    additionaExpensesValue = document.querySelector('.additional_expenses-value'),
    incomeValue = document.querySelector('.income_period-value'),
    targetValue = document.querySelector('.target_month-value'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    additionalIncome = document.querySelectorAll('.additional_income'),
    expensesTitle = document.querySelector('.expenses-title'),
    buttonReset = document.querySelector('#cancel'),
    resultInputPlace = document.querySelector('.result'),
    targetAmount = document.querySelector('.target-amount');

const AppData = function() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budgetDay = 0;
    this.budget = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.counter = 0;
}
AppData.prototype.start = function() {
    appData.budgetChecking();
    appData.getExpenses();
    appData.getIncome();
    appData.getBudget();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.showResult();
    appData.counter++;
};
AppData.prototype.budgetChecking = function() {
    this.budget = +salaryAmount.value;
};
AppData.prototype.showResult = function() {
    incomeValue.value = this.budgetMonth * periodSelect.value;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesValue.value = this.expensesMonth;
    additionaExpensesValue.value = this.addExpenses.join(', ');
    additionaIncomeValue.value = this.addIncome.join(', ');
    targetValue.value = this.getTargetMonth();
    incomeValue.value = this.budgetMonth * periodSelect.value;
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') _this.addExpenses.push(item);
    });
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    inputIncome.forEach(function(item) {
        const itemValue = item.value.trim();
        if (itemValue !== '') _this.addIncome.push(itemValue);
    });
};
AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItem[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expAdd);
    expensesItem = document.querySelectorAll('.expenses-items');
    if (expensesItem.length === 2) {
        expensesItem[1].querySelector('.expenses-title').addEventListener('input', () => {
            appData.checkStringFirst(expensesItem[1], '.expenses-title');
        });
    }
    if (expensesItem.length === 3) {
        expensesItem[2].querySelector('.expenses-title').addEventListener('input', () => {
            appData.checkStringFirst(expensesItem[2], '.expenses-title');
        });
        expAdd.style.display = 'none';
    }

};
AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItem[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 2) {
        incomeItem[1].querySelector('.income-title').addEventListener('input', () => {
            appData.checkStringFirst(incomeItem[1], '.income-title');
        });
    }
    if (incomeItem.length === 3) {
        incomeItem[2].querySelector('.income-title').addEventListener('input', () => {
            appData.checkStringFirst(incomeItem[2], '.income-title');
        });
        incomeAdd.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    expensesItem.forEach(function(item) {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() {
    incomeItem.forEach(function(item) {
        const itemInCome = item.querySelector('.income-title').value;
        const cashInCome = item.querySelector('.income-amount').value;
        if (itemInCome !== '' && cashInCome !== '') {
            appData.income[itemInCome] = cashInCome;
        }
    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    if (targetAmount.value === '') return 'Срок';
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getExpensesMonth = function() {
    let sum = 0;
    for (let key in this.expenses) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
};
AppData.prototype.getPeriod = function() {
    periodAmount.textContent = +periodSelect.value;
};
AppData.prototype.isString = function(n) {
    return isNaN(parseFloat(n)) && !isFinite(n);
};
AppData.prototype.ucFirst = function(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
};
AppData.prototype.checkStringFirst = function(className, element) {
    className.querySelector(element).addEventListener('input', () => {
        className.querySelector(element).value = className.querySelector(element).value.replace(/[^А-я ,]/, '');
    });
};
AppData.prototype.checkStringSecond = function(className, element, position) {
    additionalIncome[0].querySelectorAll('.additional_income-item')[position].addEventListener('input', () => {
        className.querySelectorAll(element)[position].value = className.querySelectorAll(element)[position].value.replace(/[^А-я ,]/, '');
    });
};
AppData.prototype.assignment = function(element, values) {
    element.querySelector(values).disabled = true;
};
AppData.prototype.resetInput = function(element, values) {
    element.querySelector(values).disabled = false;
    element.querySelector(values).value = '';
};
AppData.prototype.eventListener = function() {
    appData.checkStringFirst(incomeItem[0], '.income-title');
    appData.checkStringFirst(expensesItem[0], '.expenses-title');
    appData.checkStringSecond(additionalIncome[0], '.additional_income-item', 0);
    appData.checkStringSecond(additionalIncome[0], '.additional_income-item', 1);

    salaryAmount.addEventListener('input', function() {
        getStart.disabled = false;
    });

    buttonReset.addEventListener('click', function() {
        if (appData.counter !== 0) {
            appData.counter--;
            for (let i = 0; i < expensesItem.length; i++) {
                appData.resetInput(expensesItem[i], '.expenses-title');
                appData.resetInput(expensesItem[i], '.expenses-amount');
            }
            for (let i = 0; i < incomeItem.length; i++) {
                appData.resetInput(incomeItem[i], '.income-title');
                appData.resetInput(incomeItem[i], '.income-amount');
            }
            for (let i = 0; i < input.length - 7; i++) {
                input[i].disabled = false;
                input[i].value = '';
            }
            for (let i = 0; i < resultInputPlace.childElementCount - 1; i++) {
                if (i === 6) resultInputPlace.children[i].querySelector('.result-total').value = 'Срок';
                else if (i === 3 || i === 4) resultInputPlace.children[i].querySelector('.result-total').value = 'Наименования';
                else resultInputPlace.children[i].querySelector('.result-total').value = 0;
            }

            incomeAdd.disabled = false;
            expAdd.disabled = false;
            buttonReset.style.display = 'none';
            getStart.style.display = 'block';
            periodAmount.textContent = 1;

            appData.income = {};
            appData.addIncome = [];
            appData.expenses = {};
            appData.addExpenses = [];
            appData.incomeMonth = 0;
            appData.deposit = false;
            appData.budgetMonth = 0;
            appData.expensesMonth = 0;
            appData.budgetDay = 0;
            appData.budget = 0;
            appData.percentDeposit = 0;
            appData.moneyDeposit = 0;
            appData.counter = 0;
            periodSelect.value = 1;
            appData.showResult();
        }
    });
    getStart.addEventListener('click', function() {
        if (appData.counter === 0 && salaryAmount.value !== '') {
            getStart.disabled = true;
            appData.start();
            for (let i = 0; i < expensesItem.length; i++) {
                appData.assignment(expensesItem[i], '.expenses-title');
                appData.assignment(expensesItem[i], '.expenses-amount');
            }
            for (let i = 0; i < incomeItem.length; i++) {
                appData.assignment(incomeItem[i], '.income-title');
                appData.assignment(incomeItem[i], '.income-amount');
            }
            for (let i = 0; i < input.length - 7; i++) {
                input[i].disabled = true;
            }
            incomeAdd.disabled = true;
            expAdd.disabled = true;
            buttonReset.style.display = 'block';
            getStart.style.display = 'none';
        }
    });

    expAdd.addEventListener('click', appData.addExpensesBlock);

    incomeAdd.addEventListener('click', appData.addIncomeBlock);

    periodSelect.addEventListener('input', appData.getPeriod);
}
const appData = new AppData();
if (salaryAmount.value === '') {
    getStart.disabled = true;
}
appData.eventListener();