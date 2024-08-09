const displayResult = document.getElementById('result');
const displayOperation = document.getElementById('current-operation');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.id === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = null;
            displayResult.textContent = '0';
            displayOperation.textContent = '';
        } else if (button.id === 'delete') {
            currentInput = currentInput.slice(0, -1);
            displayResult.textContent = currentInput || '0';
        } else if (button.id === 'equal') {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                displayResult.textContent = currentInput;
                displayOperation.textContent = '';
                previousInput = '';
                operator = null;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput) {
                if (previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                displayOperation.textContent = `${previousInput} ${operator}`;
            }
        } else {
            currentInput += value;
            displayResult.textContent = currentInput;
            if (operator) {
                displayOperation.textContent = `${previousInput} ${operator} ${currentInput}`;
            }
        }
    });
});

function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            return (num1 / num2).toString();
        default:
            return '';
    }
}
