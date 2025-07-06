let currentInput = '0';
let previousInput = '';
let operation = null;
let shouldReset = false;

const currentOperationDisplay = document.getElementById('current-operation');
const previousOperationDisplay = document.getElementById('previous-operation');
const errorMessageDisplay = document.getElementById('error-message');

function updateDisplay() {
    currentOperationDisplay.textContent = currentInput;
    if (operation) {
        previousOperationDisplay.textContent = `${previousInput} ${operation}`;
    } else {
        previousOperationDisplay.textContent = '';
    }
}

function clearError() {
    errorMessageDisplay.textContent = '';
}

function showError(message) {
    errorMessageDisplay.textContent = message;
    setTimeout(clearError, 3000);
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
    clearError();
}

function inputNumber(number) {
    if (currentInput === '0' || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function inputDecimal() {
    if (shouldReset) {
        currentInput = '0.';
        shouldReset = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function inputOperator(op) {
    if (operation !== null) calculate();
    operation = op;
    previousInput = currentInput;
    shouldReset = true;
    updateDisplay();
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                showError('Ошибка: деление на ноль');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operation = null;
    shouldReset = true;
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function inputPercent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Обработка клавиатуры
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        inputOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === '%') {
        inputPercent();
    }
});

// Инициализация
updateDisplay();