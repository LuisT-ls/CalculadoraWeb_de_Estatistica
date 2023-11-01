function toggleDarkMode() {
  const body = document.body
  const button = document.getElementById('toggleDarkMode')

  // Verifica se o modo escuro está ativado
  const isDarkMode = body.classList.contains('dark-mode')

  // Alterna entre os modos escuro e claro
  if (isDarkMode) {
    // Desativa o modo escuro
    body.classList.remove('dark-mode')
    button.textContent = '🌙'
    button.classList.add('light-mode') // Adiciona a classe light-mode
  } else {
    // Ativa o modo escuro
    body.classList.add('dark-mode')
    button.textContent = '☀️'
    button.classList.remove('light-mode') // Remove a classe light-mode
  }
}

document.addEventListener('DOMContentLoaded', function () {
  toggleDarkMode() // Isso define o modo com base nas classes CSS existentes
})

const operationSelect = document.getElementById('operation')
const inputFields = document.getElementById('input-fields')
const calculateButton = document.getElementById('calculate')
const resultDiv = document.getElementById('result')

operationSelect.addEventListener('change', () => {
  updateInputFields()
})

calculateButton.addEventListener('click', () => {
  calculateResult()
})

function updateInputFields() {
  inputFields.innerHTML = ''

  const selectedOperation = operationSelect.value

  if (selectedOperation === 'capital') {
    addInputField('montante', 'Montante:')
    addInputField('taxa', 'Taxa de Juros (%):')
    addInputField('tempo', 'Tempo (meses):')
  } else if (selectedOperation === 'montante') {
    addInputField('principal', 'Principal:')
    addInputField('taxa', 'Taxa de Juros (%):')
    addInputField('tempo', 'Tempo (meses):')
  } else if (selectedOperation === 'juros') {
    addInputField('principal', 'Principal:')
    addInputField('montante', 'Montante:')
    addInputField('tempo', 'Tempo (meses):')
  } else if (selectedOperation === 'taxa') {
    addInputField('principal', 'Principal:')
    addInputField('montante', 'Montante:')
    addInputField('tempo', 'Tempo (meses):')
  } else if (selectedOperation === 'percentagem') {
    addInputField('valor', 'Valor:')
    addInputField('porcentagem', 'Porcentagem (%):')
  } else if (selectedOperation === 'variacao') {
    addInputField('valorInicial', 'Valor Inicial:')
    addInputField('valorFinal', 'Valor Final:')
  } else if (
    selectedOperation === 'jurosSimples' ||
    selectedOperation === 'jurosCompostos'
  ) {
    addInputField('principal', 'Principal:')
    addInputField('taxa', 'Taxa de Juros (%):')
    addInputField('tempo', 'Tempo (meses):')
  }
}

function addInputField(id, label) {
  const fieldDiv = document.createElement('div')
  fieldDiv.innerHTML = `
        <label for="${id}">${label}</label>
        <input type="number" id="${id}">
    `
  inputFields.appendChild(fieldDiv)
}

function calculateResult() {
  const selectedOperation = operationSelect.value
  let result = 0

  // Mapear os campos relevantes para a operação selecionada
  const inputMappings = {
    capital: ['montante', 'taxa', 'tempo'],
    montante: ['principal', 'taxa', 'tempo'],
    juros: ['principal', 'montante', 'tempo'],
    taxa: ['principal', 'montante', 'tempo'],
    percentagem: ['valor', 'porcentagem'],
    variacao: ['valorInicial', 'valorFinal'],
    jurosSimples: ['principal', 'taxa', 'tempo'],
    jurosCompostos: ['principal', 'taxa', 'tempo']
  }

  const inputValues = {}

  // Coletar os valores dos campos de entrada com base na operação selecionada
  inputMappings[selectedOperation].forEach(field => {
    inputValues[field] = parseFloat(document.getElementById(field).value)
  })

  // Realizar os cálculos com base nos campos coletados
  if (selectedOperation === 'capital') {
    result =
      inputValues.montante /
      (1 + (inputValues.taxa / 100) * (inputValues.tempo / 12))
  } else if (selectedOperation === 'montante') {
    result =
      inputValues.principal *
      (1 + (inputValues.taxa / 100) * (inputValues.tempo / 12))
  } else if (selectedOperation === 'juros') {
    result = inputValues.montante - inputValues.principal
  } else if (selectedOperation === 'taxa') {
    result =
      ((inputValues.montante / inputValues.principal - 1) /
        (inputValues.tempo / 12)) *
      100
  } else if (selectedOperation === 'percentagem') {
    result = (inputValues.porcentagem / 100) * inputValues.valor
  } else if (selectedOperation === 'variacao') {
    result =
      ((inputValues.valorFinal - inputValues.valorInicial) /
        inputValues.valorInicial) *
      100
  } else if (selectedOperation === 'jurosSimples') {
    result =
      inputValues.principal *
      (inputValues.taxa / 100) *
      (inputValues.tempo / 12)
  } else if (selectedOperation === 'jurosCompostos') {
    result =
      inputValues.principal *
        Math.pow(1 + inputValues.taxa / 100, inputValues.tempo / 12) -
      inputValues.principal
  }

  resultDiv.textContent = `Resultado: ${result.toFixed(2)}`
}

// Inicialmente, carregue os campos de entrada para a operação padrão.
updateInputFields()
