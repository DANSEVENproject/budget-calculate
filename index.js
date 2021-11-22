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
    targetAmount = document.querySelector('.target-amount');

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
    counter: 0,
    budgetChecking: function() {
        this.budget = +salaryAmount.value;
    },
    showResult: function() {
        periodSelect.addEventListener('input', function() {
            incomeValue.value = appData.budgetMonth * periodSelect.value;
        });
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesValue.value = this.expensesMonth;
        additionaExpensesValue.value = this.addExpenses.join(', ');
        additionaIncomeValue.value = this.addIncome.join(', ');
        targetValue.value = this.getTargetMonth();
        incomeValue.value = this.budgetMonth * periodSelect.value;
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
            const itemValue = item.value.trim();
            if (itemValue !== '') appData.addIncome.push(itemValue);
        });
    },
    addExpensesBlock: function() {
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

    },
    addIncomeBlock: function() {
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
    },
    getExpenses: function() {
        expensesItem.forEach(function(item) {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
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
    },
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },
    getTargetMonth: function() {
        if (targetAmount.value === '') return 'Срок';
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getStatusIncome: function() {
        if (this.budgetDay >= 1200) return 'У вас высокий уровень дохода!';
        if (this.budgetDay <= 1200 && this.budgetDay >= 600) return 'У вас средний уровень дохода';
        if (this.budgetDay > 0 && this.budgetDay < 600) return 'К сожалению у вас уровень дохода ниже среднего';
        if (this.budgetDay <= 0) return 'Что то пошло не так';
    },
    getExpensesMonth: function() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getPeriod: function() {
        periodAmount.textContent = +periodSelect.value;
    },
    isString: function(n) {
        return isNaN(parseFloat(n)) && !isFinite(n);
    },
    getInfoDeposit: function() {
        if (this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?');

            this.moneyDeposit = prompt('Какая сумма заложена?');
        }
    },
    ucFirst: function(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    },
    checkStringFirst: function(className, element) {
        className.querySelector(element).value = className.querySelector(element).value.replace(/[^А-я ,]/, '');
    },
    checkStringSecond: function(className, element, position) {
        className.querySelectorAll(element)[position].value = className.querySelectorAll(element)[position].value.replace(/[^А-я ,]/, '');
    },
}


const start = function() {
    appData.budgetChecking();
    appData.getExpenses();
    appData.getIncome();
    appData.getBudget();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.showResult();
    appData.counter++;
}
start.bind(appData);


incomeItem[0].querySelector('.income-title').addEventListener('input', () => {
    appData.checkStringFirst(incomeItem[0], '.income-title');
});
expensesItem[0].querySelector('.expenses-title').addEventListener('input', () => {
    appData.checkStringFirst(expensesItem[0], '.expenses-title');
});

additionalIncome[0].querySelectorAll('.additional_income-item')[0].addEventListener('input', () => {
    appData.checkStringSecond(additionalIncome[0], '.additional_income-item', 0);
});
additionalIncome[0].querySelectorAll('.additional_income-item')[1].addEventListener('input', () => {
    appData.checkStringSecond(additionalIncome[0], '.additional_income-item', 1);
});


if (salaryAmount.value === '') {
    getStart.disabled = true;
}
salaryAmount.addEventListener('input', function() {
    getStart.disabled = false;
});


buttonReset.addEventListener('click', function() {
    if (appData.counter !== 0) {
        appData.counter--;

        if (expensesItem.length === 3) {
            expensesItem[2].querySelector('.expenses-title').disabled = false;
            expensesItem[2].querySelector('.expenses-amount').disabled = false;
        }
        if (incomeItem.length === 3) {
            incomeItem[2].querySelector('.income-title').disabled = false;
            incomeItem[2].querySelector('.income-amount').disabled = false;
        }
        if (expensesItem.length >= 2) {
            expensesItem[1].querySelector('.expenses-title').disabled = false;
            expensesItem[1].querySelector('.expenses-amount').disabled = false;
        }
        if (incomeItem.length >= 2) {
            incomeItem[1].querySelector('.income-title').disabled = false;
            incomeItem[1].querySelector('.income-amount').disabled = false;
        }

        for (let i = 0; i < input.length - 7; i++) {
            input[i].disabled = false;
        }
        incomeAdd.disabled = false;
        expAdd.disabled = false;
        buttonReset.style.display = 'none';
    }
});
getStart.addEventListener('click', function() {
    if (appData.counter === 0 && salaryAmount.value !== '') {
        getStart.disabled = true;
        start();

        if (expensesItem.length === 3) {
            expensesItem[2].querySelector('.expenses-title').disabled = true;
            expensesItem[2].querySelector('.expenses-amount').disabled = true;
            expensesItem[2].querySelector('.expenses-title').value = '';
            expensesItem[2].querySelector('.expenses-amount').value = '';
        }
        if (incomeItem.length === 3) {
            incomeItem[2].querySelector('.income-title').disabled = true;
            incomeItem[2].querySelector('.income-amount').disabled = true;
            incomeItem[2].querySelector('.income-title').value = '';
            incomeItem[2].querySelector('.income-amount').value = '';
        }
        if (expensesItem.length >= 2) {
            expensesItem[1].querySelector('.expenses-title').disabled = true;
            expensesItem[1].querySelector('.expenses-amount').disabled = true;
            expensesItem[1].querySelector('.expenses-title').value = '';
            expensesItem[1].querySelector('.expenses-amount').value = '';
        }
        if (incomeItem.length >= 2) {
            incomeItem[1].querySelector('.income-title').disabled = true;
            incomeItem[1].querySelector('.income-amount').disabled = true;
            incomeItem[1].querySelector('.income-title').value = '';
            incomeItem[1].querySelector('.income-amount').value = '';
        }

        for (let i = 0; i < input.length - 7; i++) {
            input[i].disabled = true;
            input[i].value = '';
        }
        incomeAdd.disabled = true;
        expAdd.disabled = true;
        buttonReset.style.display = 'block';
    }
});

expAdd.addEventListener('click', appData.addExpensesBlock);

incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriod);