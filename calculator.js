let numberOne = 0;
let numberTwo = 0;
let operator = "";
let shouldClearDisplay = false;
let waitingForNextOperation = false;

const all_buttons = document.querySelectorAll('.btn-general');
const display = document.querySelector("#display");
const divide_by_zero_responses = [
    "No.",
    "Your mom divides by zero!",
    "Ahh! Zero!!!",
    "I shall not.",
    "I don't think so",
    "Get outta here with that mess.",
    "Dividing by zero is undefined in standard mathematical operations because it leads to results that contradict fundamental arithmetic principles. While it's not an illegal operation, it's not possible to assign a meaningful value to division by zero within the usual mathematical framework.",
    "You've created a black hole that will suck everyone in and lead to the destruction of the universe.\nGood Job.\nNow we're all dead."];

function add(numOne, numTwo){
    return numOne + numTwo;
}

function subtract(numOne, numTwo){
    return numOne - numTwo;
}

function multiply(numOne, numTwo){
    return numOne * numTwo;
}

function divide(numOne, numTwo){
    if (numTwo === 0){
        const randomIndex = Math.floor(Math.random() * divide_by_zero_responses.length);
        return divide_by_zero_responses[randomIndex];
    }
    return numOne / numTwo;
}

function operate(numOne, numTwo, operator){
    numOne = parseFloat(numOne);
    numTwo = parseFloat(numTwo);

    if (operator === "+") return add(numOne, numTwo);
    if (operator === "-") return subtract(numOne, numTwo);
    if (operator === "X") return multiply(numOne, numTwo); // Changed from '*'
    if (operator === "÷") return divide(numOne, numTwo); // Changed from '/'
    return null;
}

function clearDisplay(){
    display.value = "0";
    numberOne = null;
    operator = "";
    shouldClearDisplay = false;
    waitingForNextOperation = false;
}

all_buttons.forEach(button => { 
    button.addEventListener('click', event => {
        const buttonValue = event.target.textContent;

        // --- Logic for Numbers and Decimal ---
        if (!isNaN(buttonValue) || buttonValue === '.') {
            if (shouldClearDisplay) {
                display.value = "";
                shouldClearDisplay = false;
            }
            if (buttonValue === '.' && display.value.includes('.')) {
                return;
            }
            if (display.value === "0" && buttonValue !== '.') {
                display.value = buttonValue;
            } else {
                display.value += buttonValue;
            }
            waitingForNextOperation = true;
        }

        // --- Logic for Operator Buttons ---
        else if (event.target.classList.contains('btn-operator') && buttonValue !== '=') {
            if (numberOne !== null && waitingForNextOperation) {
                const numberTwo = display.value;
                const result = operate(numberOne, numberTwo, operator);
                numberOne = result;
            } else if (numberOne === null) {
                numberOne = display.value;
            }
            operator = buttonValue;
            shouldClearDisplay = true;
            waitingForNextOperation = false;
        }

        // --- Logic for Equals Button ---
        else if (buttonValue === '=') {
            if (numberOne !== null && operator !== "" && waitingForNextOperation) {
                const numberTwo = display.value;
                const result = operate(numberOne, numberTwo, operator);
                if (divide_by_zero_responses.includes(result)) {
                    alert(result);
                } else {
                    display.value = 0;
                    numberOne = null;
                    numberTwo = null;
                    operator = "";
                    shouldClearDisplay = true;
                    waitingForNextOperation = false;
                }
            }
        }

        // --- Logic for All Clear (AC) ---
        else if (buttonValue === 'AC') {
            clearDisplay();
        }

        // --- Logic for Delete (Del) ---
        else if (buttonValue === 'Del') {
            if (display.value === "Error") {
                display.value = "0";
            } else if (display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            } else {
                display.value = "0";
            }
        }
  });
});

clearDisplay();