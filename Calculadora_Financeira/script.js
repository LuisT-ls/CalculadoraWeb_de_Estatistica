function toggleDarkMode() {
  const body = document.body
  const button = document.getElementById('toggleDarkMode')

  const isDarkMode = body.classList.contains('dark-mode')

  if (isDarkMode) {
    body.classList.remove('dark-mode')
    button.textContent = '🌙'
    button.classList.add('light-mode')
  } else {
    body.classList.add('dark-mode')
    button.textContent = '☀️'
    button.classList.remove('light-mode')
  }
}

document.addEventListener('DOMContentLoaded', function () {
  toggleDarkMode()
})

const operationSelect = document.getElementById('operation')
const inputFields = document.getElementById('input-fields')
const calculateButton = document.getElementById('calculate')
const resultDiv = document.getElementById('result')
const showExplanationButton = document.getElementById('showExplanation')
const explanationText = document.getElementById('calcExplanation')

operationSelect.addEventListener('change', () => {
  updateInputFields()
})

calculateButton.addEventListener('click', () => {
  calculateResult()
})

showExplanationButton.addEventListener('click', () => {
  const selectedOperation = operationSelect.value
  showExplanation(selectedOperation)
  const explanation = explanationText // Use a referência já existente
  if (
    explanation.style.display === 'none' ||
    explanation.style.display === ''
  ) {
    explanation.style.display = 'block'
  } else {
    explanation.style.display = 'none'
  }
})

operationSelect.addEventListener('change', () => {
  updateInputFields();
  showExplanation(operationSelect.value);
});

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
  } else if (selectedOperation === 'desconto') {
    addInputField('precoOriginal', 'Preço Original:')
    addInputField('percentagemDesconto', 'Percentagem de Desconto (%):')
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
  let formattedResult = ''

  const inputMappings = {
    capital: ['montante', 'taxa', 'tempo'],
    montante: ['principal', 'taxa', 'tempo'],
    juros: ['principal', 'montante', 'tempo'],
    taxa: ['principal', 'montante', 'tempo'],
    percentagem: ['valor', 'porcentagem'],
    variacao: ['valorInicial', 'valorFinal'],
    jurosSimples: ['principal', 'taxa', 'tempo'],
    jurosCompostos: ['principal', 'taxa', 'tempo'],
    desconto: ['precoOriginal', 'percentagemDesconto']
  }

  const inputValues = {}

  inputMappings[selectedOperation].forEach(field => {
    inputValues[field] = parseFloat(document.getElementById(field).value)
  })

  if (selectedOperation === 'capital') {
    result =
      inputValues.montante /
      (1 + (inputValues.taxa / 100) * (inputValues.tempo / 12))
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  } else if (selectedOperation === 'montante') {
    result =
      inputValues.principal *
      (1 + (inputValues.taxa / 100) * (inputValues.tempo / 12))
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  } else if (selectedOperation === 'juros') {
    result = inputValues.montante - inputValues.principal
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  } else if (selectedOperation === 'desconto') {
    result = (inputValues.precoOriginal * inputValues.percentagemDesconto) / 100
    const precoComDesconto = inputValues.precoOriginal - result
    formattedResult = `
      Desconto: ${result.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })}
      /// Preço Atualizado: ${precoComDesconto.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })}
    `
  } else if (selectedOperation === 'taxa') {
    result =
      ((inputValues.montante / inputValues.principal - 1) /
        (inputValues.tempo / 12)) *
      100
    formattedResult = `Resultado: ${result.toFixed(2)}%`
  } else if (selectedOperation === 'percentagem') {
    result = (inputValues.porcentagem / 100) * inputValues.valor
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  } else if (selectedOperation === 'variacao') {
    result =
      ((inputValues.valorFinal - inputValues.valorInicial) /
        inputValues.valorInicial) *
      100
    formattedResult = `Resultado: ${result.toFixed(2)}%`
  } else if (selectedOperation === 'jurosSimples') {
    result =
      inputValues.principal *
      (inputValues.taxa / 100) *
      (inputValues.tempo / 12)
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  } else if (selectedOperation === 'jurosCompostos') {
    result =
      inputValues.principal *
      (Math.pow(1 + inputValues.taxa / 100 / 12, inputValues.tempo) - 1)
    formattedResult = `Resultado: ${result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    })}`
  }

  resultDiv.textContent = formattedResult
}

function showExplanation(selectedOperation) {
  let explanation = ''

  if (selectedOperation === 'capital') {
    explanation = `
      <p>O cálculo de capital é usado para determinar o montante de dinheiro que você deve investir ou emprestar para atingir um objetivo financeiro. Para calcular o capital, você precisa conhecer o montante desejado, a taxa de juros e o período de tempo.</p>
      <p>Exemplo:</p>
      <p>Suponha que você queira economizar R$ 10.000 em 2 anos com uma taxa de juros anual de 5%. O cálculo do capital é:</p>
      <p>Capital = Montante / (1 + (Taxa de Juros / 100) * (Tempo / 12))</p>
      <p>Capital = R$ 10.000 / (1 + (5 / 100) * (2 / 12))</p>
      <p>Capital ≈ R$ 9.568,49</p>
    `
  } else if (selectedOperation === 'montante') {
    explanation = `
      <p>O cálculo de montante é usado para determinar o valor total que você terá após um período de investimento, levando em consideração o capital inicial, a taxa de juros e o tempo. Para calcular o montante, você pode usar a fórmula:</p>
      <p>Montante = Principal * (1 + (Taxa de Juros / 100) * (Tempo / 12))</p>
    `
  } else if (selectedOperation === 'juros') {
    explanation = `
      <p>O cálculo de juros é usado para determinar a quantia de dinheiro que você ganha ou paga ao investir ou emprestar dinheiro. Para calcular os juros, subtrai-se o valor principal do montante final. A fórmula é:</p>
      <p>Juros = Montante - Principal</p>
    `
  } else if (selectedOperation === 'taxa') {
    explanation = `
      <p>O cálculo da taxa de juros é usado para determinar a taxa necessária para atingir um montante desejado em um período de tempo. A fórmula é:</p>
      <p>Taxa de Juros = ((Montante / Principal - 1) / (Tempo / 12)) * 100</p>
    `
  } else if (selectedOperation === 'percentagem') {
    explanation = `
      <p>O cálculo de percentagem é usado para calcular uma porcentagem de um valor. A fórmula é simples:</p>
      <p>Valor da Porcentagem = (Porcentagem / 100) * Valor</p>
    `
  } else if (selectedOperation === 'variacao') {
    explanation = `
      <p>O cálculo de variação percentual é usado para determinar a mudança percentual entre dois valores. A fórmula é:</p>
      <p>Variação Percentual = ((Valor Final - Valor Inicial) / Valor Inicial) * 100</p>
    `
  } else if (selectedOperation === 'jurosSimples') {
    explanation = `
      <p>O cálculo de juros simples é usado para determinar a quantia de juros ganhos ou pagos em um investimento ou empréstimo com base no principal, taxa de juros e tempo. A fórmula é:</p>
      <p>Juros Simples = Principal * (Taxa de Juros / 100) * (Tempo / 12)</p>
    `
  } else if (selectedOperation === 'jurosCompostos') {
    explanation = `
      <p>O cálculo de juros compostos é usado para determinar a quantia de juros ganhos ou pagos em um investimento ou empréstimo, levando em consideração a capitalização periódica. A fórmula é:</p>
      <p>Juros Compostos = Principal * (1 + Taxa de Juros / 100)^(Tempo / 12) - Principal</p>
    `
  } else if (selectedOperation === 'desconto') {
    explanation = `
      <p>O cálculo de desconto é usado para determinar a quantia de dinheiro economizada quando um desconto é aplicado a um preço original. A fórmula é:</p>
      <p>Desconto = (Preço Original * Percentagem de Desconto) / 100</p>
    `
  }

  explanationText.innerHTML = explanation
}

updateInputFields()
