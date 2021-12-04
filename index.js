'use strict';

let expensesItem = document.querySelectorAll('.expenses-items'),
    incomeItem = document.querySelectorAll('.income-items');

const getStart = document.querySelector('#start'),
    periodAmount = document.querySelector('.period-amount'),
    input = document.querySelectorAll('input'),
    tagPlus = document.querySelectorAll('button'),
    incomeAdd = tagPlus[0],
    expAdd = tagPlus[1],
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
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncome = document.querySelectorAll('.additional_income'),
    expensesTitle = document.querySelector('.expenses-title'),
    buttonReset = document.querySelector('#cancel'),
    resultInputPlace = document.querySelector('.result'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    body = document.querySelector('.BODY'),
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
    }

    start() {
        this.budgetChecking();
        this.getExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
        this.counter++;
    }

    budgetChecking() {
        this.budget = +salaryAmount.value;
    }

    showResult() {
        incomeValue.value = this.budgetMonth * periodSelect.value;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesValue.value = this.expensesMonth;
        additionaExpensesValue.value = this.addExpenses.join(', ');
        additionaIncomeValue.value = this.addIncome.join(', ');
        targetValue.value = this.getTargetMonth();
        incomeValue.value = this.budgetMonth * periodSelect.value;
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') this.addExpenses.push(item);
        });
    }

    getAddIncome() {
        inputIncome.forEach(item => {
            const itemValue = item.value.trim();
            if (itemValue !== '') this.addIncome.push(itemValue);
        });
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        if (incomeItem) {
            incomeItem.forEach(count);
        }
        if (expensesItem) {
            expensesItem.forEach(count);
        }
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        if (targetAmount.value === '') return 'Срок';
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;
    }

    getPeriod() {
        periodAmount.textContent = +periodSelect.value;
    }

    addExpIncBlock(element, selector, button) {
        const cloneIncomeItem = element[0].cloneNode(true);
        cloneIncomeItem.querySelector(`.${selector}-title`).value = '';
        cloneIncomeItem.querySelector(`.${selector}-amount`).value = '';
        element[0].parentNode.insertBefore(cloneIncomeItem, button);
        console.log(element);
        element = document.querySelectorAll(`.${selector}-items`);
        element.forEach(item => {
            appData.checkStringFirst(item, `.${selector}-title`);
        });
        if (element.length === 3) {
            button.style.display = 'none';
        }
        return element;
    }

    checkStringFirst(className, element) {
        className.querySelector(element).addEventListener('input', () => {
            className.querySelector(element).value =
                className.querySelector(element).value.replace(/[^А-я ,]/, '');
        });
    }

    checkStringSecond(className, element, position) {
        className.querySelectorAll(element)[position].addEventListener('input', () => {
            className.querySelectorAll(element)[position].value =
                className.querySelectorAll(element)[position].value.replace(/[^А-я ,]/, '');
        });
    }

    assignment(element, values) {
        element.querySelector(values).disabled = true;
    }

    reset(element, id) {
        element.forEach((item, i) => {
            if (i === 0) {
                this.resetInputForFisrt(item, `.${id}-title`);
                this.resetInputForFisrt(item, `.${id}-amount`);
            } else {
                this.resetInput(item, `.${id}-title`);
                this.resetInput(item, `.${id}-amount`);
            }
        })
    }

    resetInput(element, values) {
        element.querySelector(values).value = null;
        element.remove(values);
    }

    resetInputForFisrt(element, values) {
        element.querySelector(values).disabled = false;
        element.querySelector(values).value = '';
    }

    startInput(element, id) {
        element.forEach((item) => {
            this.assignment(item, `.${id}-title`);
            this.assignment(item, `.${id}-amount`);
        })
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = valueSelect;

        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventListener() {
        this.checkStringFirst(incomeItem[0], '.income-title');
        this.checkStringFirst(expensesItem[0], '.expenses-title');
        this.checkStringSecond(additionalIncome[0], '.additional_income-item', 0);
        this.checkStringSecond(additionalIncome[0], '.additional_income-item', 1);

        salaryAmount.addEventListener('input', () => {
            getStart.disabled = false;
        });
        depositPercent.addEventListener('input', () => {
            getStart.disabled = false;
        });

        buttonReset.addEventListener('click', () => {
            if (this.counter !== 0) {
                this.counter--;
                for (let i = 0; i < input.length - 7; i++) {
                    input[i].disabled = false;
                    input[i].value = '';
                }
                if (expensesItem) {
                    this.reset(expensesItem, 'expenses');
                }
                if (incomeItem) {
                    this.reset(incomeItem, 'income');
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
                depositPercent.value = '';
                depositCheck.checked = false;
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositPercent.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                depositPercent.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
                depositBank.disabled = false;

                Object.assign(this, new AppData);
                periodSelect.value = 1;
                this.showResult();
            }
        });

        getStart.addEventListener('click', () => {
            getStart.disabled = true;

            if (depositPercent.value != '' && (depositPercent.value <= 0 || depositPercent.value > 100)) {
                alert('Введён неправильный диапазон, попробуйте снова!');
                getStart.disabled = true;
                depositPercent.value = '';
            } else if (this.counter === 0 && salaryAmount.value !== '') {
                getStart.disabled = false;
                this.start();
                if (expensesItem) {
                    this.startInput(expensesItem, 'expenses');
                }
                if (incomeItem) {
                    this.startInput(incomeItem, 'income');
                }
                for (let i = 0; i < input.length - 7; i++) {
                    input[i].disabled = true;
                }
                incomeAdd.disabled = true;
                expAdd.disabled = true;
                buttonReset.style.display = 'block';
                getStart.style.display = 'none';
                depositBank.disabled = true;
            }
            // this.save();
        });
        incomeAdd.addEventListener('click', () => {
            incomeItem = this.addExpIncBlock(incomeItem, 'income', incomeAdd);
        });
        expAdd.addEventListener('click', () => {
            expensesItem = this.addExpIncBlock(expensesItem, 'expenses', expAdd);
        });

        periodSelect.addEventListener('input', this.getPeriod.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

    }

    init() {
        //     if (localStorage.getItem('Calculator')) {
        //         this.getLocalStorage();
        //         let expensesItem = document.querySelectorAll('.expenses-items'),
        //             incomeItem = document.querySelectorAll('.income-items');

        //         const getStart = document.querySelector('#start'),
        //             periodAmount = document.querySelector('.period-amount'),
        //             input = document.querySelectorAll('input'),
        //             tagPlus = document.querySelectorAll('button'),
        //             incomeAdd = tagPlus[0],
        //             expAdd = tagPlus[1],
        //             inputIncome = document.querySelectorAll('.additional_income-item'),
        //             salaryAmount = document.querySelector('.salary-amount'),
        //             budgetDayValue = document.querySelector('.budget_day-value'),
        //             budgetMonthValue = document.querySelector('.budget_month-value'),
        //             expensesValue = document.querySelector('.expenses_month-value'),
        //             additionaIncomeValue = document.querySelector('.additional_income-value'),
        //             additionaExpensesValue = document.querySelector('.additional_expenses-value'),
        //             incomeValue = document.querySelector('.income_period-value'),
        //             targetValue = document.querySelector('.target_month-value'),
        //             additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        //             periodSelect = document.querySelector('.period-select'),
        //             depositCheck = document.querySelector('#deposit-check'),
        //             additionalIncome = document.querySelectorAll('.additional_income'),
        //             expensesTitle = document.querySelector('.expenses-title'),
        //             buttonReset = document.querySelector('#cancel'),
        //             resultInputPlace = document.querySelector('.result'),
        //             depositBank = document.querySelector('.deposit-bank'),
        //             depositAmount = document.querySelector('.deposit-amount'),
        //             depositPercent = document.querySelector('.deposit-percent'),
        //             body = document.querySelector('.BODY'),
        //             targetAmount = document.querySelector('.target-amount');
        //         this.eventListener();
        //     } else {
        //         this.eventListener();
        //     }
        this.eventListener();
    }

    getLocalStorage() {
        body.innerHTML = localStorage.getItem('Calculator');
    }

    save() {
        localStorage.setItem('Calculator', body.innerHTML);
    }
}

const appData = new AppData();
if (salaryAmount.value === '') {
    getStart.disabled = true;
}
appData.init();