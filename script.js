function calcular(operacion) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const resultadoEl = document.getElementById('resultado');

  if (isNaN(num1) || isNaN(num2)) {
    resultadoEl.textContent = 'No olvides ingresar los dos números.';
    return;
  }

  if (operacion === '/' && num2 === 0) {
    resultadoEl.textContent = 'Invalido el dividir entre 0, intenta otro número.';
    return;
  }

  let resultado;
  switch (operacion) {
    case '+':
      resultado = num1 + num2;
      break;
    case '-':
      resultado = num1 - num2;
      break;
    case '*':
      resultado = num1 * num2;
      break;
    case '/':
      resultado = num1 / num2;
      break;
  }

  resultadoEl.textContent = `Resultado: ${resultado}`;
}
