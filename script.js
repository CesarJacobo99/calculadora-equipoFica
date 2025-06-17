function calcular(operacion) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const resultadoEl = document.getElementById('resultado');

  if (isNaN(num1) || isNaN(num2)) {
    resultadoEl.textContent = 'Por favor, introduce ambos números.';
    return;
  }

  if (operacion === '/' && num2 === 0) {
    resultadoEl.textContent = 'No se puede dividir entre cero.';
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
