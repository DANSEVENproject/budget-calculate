'use strict';

let expensesItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');

const getStart = document.querySelector('#start'),
    periodAmount = document.querySelector('.period-amount'),
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

class AppData {
    constructor() {
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
    };
    start() {
        this.budgetChecking();
        this.getExpInc();
        this.getBudget();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
        this.counter++;
    };
    budgetChecking() {
        this.budget = +salaryAmount.value;
    };
    showResult() {
        incomeValue.value = this.budgetMonth * periodSelect.value;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesValue.value = this.expensesMonth;
        additionaExpensesValue.value = this.addExpenses.join(', ');
        additionaIncomeValue.value = this.addIncome.join(', ');
        targetValue.value = this.getTargetMonth();
        incomeValue.value = this.budgetMonth * periodSelect.value;
    };

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') this.addExpenses.push(item);
        });
    };
    getAddIncome() {
        inputIncome.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== '') this.addIncome.push(itemValue);
        });
    };
    getAddExpInc() {

    };

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItem.forEach(count);
        expensesItem.forEach(count);
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    };
    getTargetMonth() {
        if (targetAmount.value === '') return 'Срок';
        return Math.ceil(targetAmount.value / this.budgetMonth);
    };
    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    };
    getPeriod() {
        periodAmount.textContent = +periodSelect.value;
    };
    isString(n) {
        return isNaN(parseFloat(n)) && !isFinite(n);
    };
    ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    };

    addExpensesBlock() {
        const cloneExpensesItem = expensesItem[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, expAdd);
        expensesItem = document.querySelectorAll('.expenses-items');
        expensesItem.forEach((item, i) => {
            appData.checkStringFirst(expensesItem[i], '.expenses-title');
        });
        if (expensesItem.length === 3) {
            expAdd.style.display = 'none';
        }
    };
    addIncomeBlock() {
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItem = document.querySelectorAll('.income-items');
        incomeItem.forEach((item, i) => {
            appData.checkStringFirst(incomeItem[i], '.income-title');
        });
        if (incomeItem.length === 3) {
            incomeAdd.style.display = 'none';
        }
    };
    addExpIncBlock(elem, selector, button) {
        const cloneIncomeItem = incomeItem[0].cloneNode(true);
        cloneIncomeItem.querySelector(`.${selector}-title`).value = '';
        cloneIncomeItem.querySelector(`.${selector}-amount`).value = '';
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, button);
        incomeItem = document.querySelectorAll(`.${selector}-items`);
        incomeItem.forEach((item, i) => {
            appData.checkStringFirst(incomeItem[i], `.${selector}-title`);
        });
        if (incomeItem.length === 3) {
            button.style.display = 'none';
        }
    };

    checkStringFirst(className, element) {
        className.querySelector(element).addEventListener('input', () => {
            className.querySelector(element).value = className.querySelector(element).value.replace(/[^А-я ,]/, '');
        });
    };
    checkStringSecond(className, element, position) {
        className.querySelectorAll(element)[position].addEventListener('input', () => {
            className.querySelectorAll(element)[position].value = className.querySelectorAll(element)[position].value.replace(/[^А-я ,]/, '');
        });
    };
    assignment(element, values) {
        element.querySelector(values).disabled = true;
    };
    resetInput(element, values) {
        element.querySelector(values).value = null;
        element.remove(values);
    };
    resetInputForFisrt(element, values) {
        element.querySelector(values).disabled = false;
        element.querySelector(values).value = '';
    };
    eventListener() {
        this.checkStringFirst(incomeItem[0], '.income-title');
        this.checkStringFirst(expensesItem[0], '.expenses-title');
        this.checkStringSecond(additionalIncome[0], '.additional_income-item', 0);
        this.checkStringSecond(additionalIncome[0], '.additional_income-item', 1);

        salaryAmount.addEventListener('input', () => {
            getStart.disabled = false;
        });

        buttonReset.addEventListener('click', () => {
            if (this.counter !== 0) {
                this.counter--;
                for (let i = 0; i < input.length - 7; i++) {
                    input[i].disabled = false;
                    input[i].value = '';
                }
                for (let i = 0; i < expensesItem.length; i++) {
                    if (i === 0) {
                        this.resetInputForFisrt(expensesItem[i], '.expenses-title');
                        this.resetInputForFisrt(expensesItem[i], '.expenses-amount');
                    } else {
                        this.resetInput(expensesItem[i], '.expenses-title');
                        this.resetInput(expensesItem[i], '.expenses-amount');
                    }
                }
                for (let i = 0; i < incomeItem.length; i++) {
                    if (i === 0) {
                        this.resetInputForFisrt(incomeItem[i], '.income-title');
                        this.resetInputForFisrt(incomeItem[i], '.income-amount');
                    } else {
                        this.resetInput(incomeItem[i], '.income-title');
                        this.resetInput(incomeItem[i], '.income-amount');
                    }
                }
                for (let i = 0; i < resultInputPlace.childElementCount - 1; i++) {
                    if (i === 6) resultInputPlace.children[i].querySelector('.result-total').value = 'Срок';
                    else if (i === 3 || i === 4) resultInputPlace.children[i].querySelector('.result-total').value = 'Наименования';
                    else resultInputPlace.children[i].querySelector('.result-total').value = 0;
                }
                expAdd.style.display = 'block';
                incomeAdd.style.display = 'block';
                incomeAdd.disabled = false;
                expAdd.disabled = false;
                buttonReset.style.display = 'none';
                getStart.style.display = 'block';
                periodAmount.textContent = 1;

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
                periodSelect.value = 1;
                this.showResult();
            }
        });
        getStart.addEventListener('click', () => {
            if (this.counter === 0 && salaryAmount.value !== '') {
                getStart.disabled = true;
                this.start();
                for (let i = 0; i < expensesItem.length; i++) {
                    this.assignment(expensesItem[i], '.expenses-title');
                    this.assignment(expensesItem[i], '.expenses-amount');
                }
                for (let i = 0; i < incomeItem.length; i++) {
                    this.assignment(incomeItem[i], '.income-title');
                    this.assignment(incomeItem[i], '.income-amount');
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

        expAdd.addEventListener('click', this.addExpensesBlock);

        incomeAdd.addEventListener('click', this.addIncomeBlock);

        periodSelect.addEventListener('input', this.getPeriod);
    };
}
const appData = new AppData();
if (salaryAmount.value === '') {
    getStart.disabled = true;
}
appData.eventListener();