let expensesItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

const getStart = document.querySelector('#start'),
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
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    targetAmount = document.querySelector('.target-amount');

'use strict';

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    incomeMonth: 0,
    deposit: false,
    budgetMonth: 0,
    expensesMonth: 0,
    budgetDay: 0,
    budget: 0,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function() {
        appData.budgetChecking();
        appData.getExpenses();
        appData.getIncome();
        appData.getBudget();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.showResult();
    },
    budgetChecking: function() {
        if (salaryAmount.value === '') {
            getStart.disabled = true;
        }
        appData.budget = +salaryAmount.value;
    },
    showResult: function() {
        periodSelect.addEventListener('input', function() {
            incomeValue.value = appData.budgetMonth * periodSelect.value;
        });
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesValue.value = appData.expensesMonth;
        additionaExpensesValue.value = appData.addExpenses.join(', ');
        additionaIncomeValue.value = appData.addIncome.join(', ');
        targetValue.value = appData.getTargetMonth();
        incomeValue.value = appData.budgetMonth * periodSelect.value;
        salaryAmount.addEventListener('input', function() {
            getStart.disabled = false;

        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') appData.addExpenses.push(item);
        });
    },
    getAddIncome: function() {
        inputIncome.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') appData.addIncome.push(itemValue);
        });
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItem[0].cloneNode(true);
        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expAdd);
        expensesItem = document.querySelectorAll('.expenses-items');
        if (expensesItem.length === 2) {
            expensesItem[1].querySelector('.expenses-title').addEventListener('input', () => {
                expensesItem[1].querySelector('.expenses-title').value = expensesItem[1].querySelector('.expenses-title').value.replace(/[^А-я ,]/, '');
            });
        }
        if (expensesItem.length === 3) {
            expensesItem[2].querySelector('.expenses-title').addEventListener('input', () => {
                expensesItem[2].querySelector('.expenses-title').value = expensesItem[2].querySelector('.expenses-title').value.replace(/[^А-я ,]/, '');
            });
            expAdd.style.display = 'none';
        }

    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 2) {
            incomeItem[1].querySelector('.income-title').addEventListener('input', () => {
                incomeItem[1].querySelector('.income-title').value = incomeItem[1].querySelector('.income-title').value.replace(/[^А-я ,]/, '');
            });
        }
        if (incomeItem.length === 3) {
            incomeItem[2].querySelector('.income-title').addEventListener('input', () => {
                incomeItem[2].querySelector('.income-title').value = incomeItem[2].querySelector('.income-title').value.replace(/[^А-я ,]/, '');
            });
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItem.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItem.forEach(function(item) {
            let itemInCome = item.querySelector('.income-title').value;
            let cashInCome = item.querySelector('.income-amount').value;
            if (itemInCome !== '' && cashInCome !== '') {
                appData.income[itemInCome] = cashInCome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) return 'У вас высокий уровень дохода!';
        if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) return 'У вас средний уровень дохода';
        if (appData.budgetDay > 0 && appData.budgetDay < 600) return 'К сожалению у вас уровень дохода ниже среднего';
        if (appData.budgetDay <= 0) return 'Что то пошло не так';
    },
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getPeriod: function() {
        periodAmount.textContent = +periodSelect.value;
    },
    checkNumber: function(number) {
        while (!appData.isNumber(number)) {
            number = prompt('Повторите попытку...');
        }
        return number;
    },
    checkString: function(string) {
        while (!appData.isString(string)) {
            string = prompt('Повторите попытку...');
        }
        return string;
    },
    isNumber: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isString: function(n) {
        return isNaN(parseFloat(n)) && !isFinite(n);
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?');
            appData.percentDeposit = appData.checkNumber(percentDeposit);
            appData.moneyDeposit = prompt('Какая сумма заложена?');
            appData.moneyDeposit = appData.checkNumber(moneyDeposit);
        }
    },
    ucFirst: function(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }
}
incomeItem[0].querySelector('.income-title').addEventListener('input', () => {
    incomeItem[0].querySelector('.income-title').value = incomeItem[0].querySelector('.income-title').value.replace(/[^А-я ,]/, '');
});
additionalIncomeItem[0].addEventListener('input', () => {
    additionalIncomeItem[0].value = additionalIncomeItem[0].value.replace(/[^А-я ,]/, '');
});
additionalIncomeItem[1].addEventListener('input', () => {
    additionalIncomeItem[1].value = additionalIncomeItem[1].value.replace(/[^А-я ,]/, '');
});
expensesItem[0].querySelector('.expenses-title').addEventListener('input', () => {
    expensesItem[0].querySelector('.expenses-title').value = expensesItem[0].querySelector('.expenses-title').value.replace(/[^А-я ,]/, '');
});

getStart.addEventListener('click', appData.start);

expAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriod);