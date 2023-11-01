function redirectToCalculator(calculatorPage) {
  window.location.href = calculatorPage;
}

function toggleDarkMode() {
  const body = document.body;
  const button = document.getElementById('toggleDarkMode');

  // Verifica se o modo escuro está ativado
  const isDarkMode = body.classList.contains('dark-mode');

  // Alterna entre os modos escuro e claro
  if (isDarkMode) {
    // Desativa o modo escuro
    body.classList.remove('dark-mode');
    button.textContent = '🌙';
    button.classList.add('light-mode'); // Adiciona a classe light-mode
  } else {
    // Ativa o modo escuro
    body.classList.add('dark-mode');
    button.textContent = '☀️';
    button.classList.remove('light-mode'); // Remove a classe light-mode
  }
}

document.addEventListener('DOMContentLoaded', function() {
  toggleDarkMode(); // Isso define o modo com base nas classes CSS existentes
});