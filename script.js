class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') {
      this.currentOperand = '0';
    }
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }
chooseOperation(operation) {
  if (this.currentOperand === '') return;

  if (this.previousOperand !== '') {
    this.compute();
  } else {
    // Si no hay previousOperand pero sí currentOperand,
    // movemos el current a previous para encadenar operaciones
    this.previousOperand = this.currentOperand;
  }

  this.operation = operation;
  this.currentOperand = ''; // limpia para el siguiente número
}


 compute() {
  let computation;
  const prev = parseFloat(this.previousOperand);
  const current = parseFloat(this.currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (this.operation) {
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
        computation = 'Error';
        break;
      }
      computation = prev / current;
      break;
    case '%':
      computation = prev % current;
      break;
    default:
      return;
  }

  this.currentOperand = computation.toString();
  this.operation = undefined;
  this.previousOperand = '';
}


  updateDisplay() {
    this.currentOperationText.innerText = this.currentOperand || '0';

    if (this.operation != null) {
      this.previousOperationText.innerText =
        `${this.previousOperand} ${this.operation}`;
    } else {
      this.previousOperationText.innerText = '';
    }
  }
}

// Selección de elementos
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-operation');
const equalsButton = document.querySelector('[data-value="="]');
const deleteButton = document.querySelector('[data-value="DEL"]');
const clearButton = document.querySelector('[data-value="C"]');
const percentButton = document.querySelector('[data-value="%"]');
const previousOperationText = document.querySelector('.previous-operation');
const currentOperationText = document.querySelector('.current-operation');

const calculator = new Calculator(previousOperationText, currentOperationText);

// Listeners para números
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const operation = button.getAttribute('data-value');
    
    switch (operation) {
      case '=':
        calculator.compute();
        break;
      case 'C':
        calculator.clear();
        break;
      case 'DEL':
        calculator.delete();
        break;
      case '%':
        calculator.currentOperand = (parseFloat(calculator.currentOperand) / 100).toString();
        break;
      default:
        calculator.chooseOperation(operation);
    }
    
    calculator.updateDisplay();
  });
});

