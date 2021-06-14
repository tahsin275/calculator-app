// Selectors
const display = document.querySelector('h1');
const buttons = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear');

// Variables
let firstValue = 0;
let operatorValue = '';
let nextInQueue = false;

const calculation = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

// Functions
function displayItem(item) {
    if (nextInQueue) {
        display.textContent = item;
        nextInQueue = false;
    } else {
        const displayValue = display.textContent;
        display.textContent = displayValue == '0' ? item : displayValue + item;
    }
}

function useOperator(operator) {
    const currentValue = Number(display.textContent);
    // if (operatorValue && nextInQueue) {
    //     operatorValue = operator;
    // }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculate = calculation[operatorValue](firstValue, currentValue);
        display.textContent = calculate;
        firstValue = calculate;
    }
    operatorValue = operator;
    nextInQueue = true;
}

function addDecimal() {
    if (nextInQueue) {
        return;
    }
    if (!display.textContent.includes('.')) {
        display.textContent = `${display.textContent}.`;
    }
}

function reset() {
    firstValue = 0;
    operatorValue = '';
    nextInQueue = false;
    display.textContent = '0';
}

// Event Listeners
buttons.forEach((inputBtn) => {
    if (inputBtn.classList.length == 0) {
        inputBtn.addEventListener('click', () => displayItem(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

clearBtn.addEventListener('click', reset);

// 14  -  7 + 15 / * + 14
