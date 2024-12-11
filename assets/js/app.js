// script.js
$(document).ready(function () {
    // Cargar el tema guardado o usar 'light' por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('html').attr('data-theme', savedTheme);
  
    // Cambiar tema al hacer clic en un botón
    $('button[data-theme]').on('click', function () {
      const theme = $(this).data('theme'); // Obtener el tema del botón
      $('html').attr('data-theme', theme); // Cambiar el atributo data-theme
      localStorage.setItem('theme', theme); // Guardar el tema en localStorage
    });


    let expression = ''; // Expresión matemática completa

  // Actualizar la pantalla
  function updateDisplay(value) {
    $('#calc-display').text(value);
  }

  // Manejar los números y el punto
  $('.number').on('click', function () {
    const number = $(this).data('number');
    expression += number;
    updateDisplay(expression);
  });

  // Manejar los operadores
  $('.operator').on('click', function () {
    const operator = $(this).data('operator');
    if (expression && !/[+\-*/.]$/.test(expression)) {
      // Solo añade el operador si no es el último carácter
      expression += operator;
      updateDisplay(expression);
    }
  });

  // Calcular el resultado
  $('.equals').on('click', function () {
    try {
      // Evalúa la expresión usando eval
      const result = eval(expression.replace(/×/g, '*').replace(/÷/g, '/'));
      expression = result.toString();
      updateDisplay(expression);
    } catch (error) {
      updateDisplay('Error');
      expression = '';
    }
  });

  // Limpiar todo (Reset)
  $('.action[data-action="clear"]').on('click', function () {
    expression = '';
    updateDisplay('');
  });

  // Borrar el último carácter (Delete)
  $('.action[data-action="delete"]').on('click', function () {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  });
    
  });