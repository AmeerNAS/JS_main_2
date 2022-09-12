/**
 * Calculator(previousOperandTextElement, currentOperandTextElement)
 * 
 * Takes the previous operand and the current operand to use for caclulations.
 * 
 * Translates the users inputs and requested operation using previousOperandTextElement and currentOperandTextElement through the function chooseOperation(operation).
 * 
 * Computes the requested calculation in the function compute().
 * 
 * Gets result as numbers through function getDisplayNumbers(number).
 * 
 * Outputs result from function getDisplayNumber through function updateDisplay().
 */
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  invert() {
    this.currentOperand = this.currentOperand - 2 * (this.currentOperand);
  }

  toPercent() {
    this.currentOperand = this.currentOperand/100;
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// impotion of DOM elements.
// includes: the numbers' buttons, the operations' buttons, the equl button, the delete button, clear all button, the previous operand, the current operand.
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const invertsButtons = document.querySelector("[data-invert-sign]");
const percentButton = document.querySelector("[data-percent]");
const clearAllButton = document.querySelector("[data-clear-all]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// creates a object calculator of class Calculator to translate and compute the requested operations from user's inputs
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// addition of event listeners for mouse pointer functionality
// numbers buttons event listener
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  });
});

//operations buttons event listener
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  });
});

// equal button event listener
equalsButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
});

// clear All button Event listener
clearAllButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
});

// invert button event listener
invertsButtons.addEventListener("click", button => {
  calculator.invert()
  calculator.updateDisplay();
})
// percent button event listener
percentButton.addEventListener("click", button => {
  calculator.toPercent()
  calculator.updateDisplay()
});

// addition of event listener for keyboard functionality
document.addEventListener("keydown", function (event) {
  let patternForNumbers = /[0-9]/g;
  let patternForOperators = /[+\-*\/]/g;
  if (event.key.match(patternForNumbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key === ".") {
    event.preventDefault();
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }
  if (event.key.match(patternForOperators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculator.compute();
    calculator.updateDisplay();
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    calculator.delete();
    calculator.updateDisplay();
  }
  if (event.key == "Delete") {
    event.preventDefault();
    calculator.clear();
    calculator.updateDisplay();
  }
  if (event.key === "%") {
    event.preventDefault();
    calculator.toPercent();
    calculator.updateDisplay();
  }

});