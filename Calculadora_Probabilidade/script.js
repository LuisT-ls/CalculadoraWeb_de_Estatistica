// Dark mode management
const initDarkMode = () => {
  const isDarkMode = localStorage.getItem('darkMode') === 'true'
  document.body.classList.toggle('dark-mode', isDarkMode)
  document.getElementById('toggleDarkMode').textContent = isDarkMode
    ? '☀️'
    : '🌙'
}

const toggleDarkMode = () => {
  const isDarkMode = document.body.classList.toggle('dark-mode')
  localStorage.setItem('darkMode', isDarkMode)
  document.getElementById('toggleDarkMode').textContent = isDarkMode
    ? '☀️'
    : '🌙'
}

// Explanation texts for different probability operations
const explanations = {
  prob_uni: `A probabilidade única é usada para calcular a chance de um evento específico ocorrer. Por exemplo, a probabilidade de tirar uma carta específica de um baralho é 1/52.`,
  prob_mulEv: `A probabilidade de múltiplos eventos é usada quando queremos calcular a chance de vários eventos diferentes ocorrerem. Multiplicamos as probabilidades individuais quando os eventos são independentes.`,
  prob_doisEv: `A probabilidade de dois eventos é utilizada para calcular a chance de dois eventos específicos ocorrerem juntos. Podemos usar a regra da adição: P(A ou B) = P(A) + P(B) - P(A e B).`,
  Prob_nEv: `A probabilidade de uma série de eventos é usada para calcular a chance de uma sequência específica de eventos ocorrer. É calculada multiplicando as probabilidades individuais de cada evento na sequência.`,
  ProbCond: `A probabilidade condicional P(A|B) calcula a chance de um evento A ocorrer, dado que o evento B já ocorreu. É calculada como P(A|B) = P(A e B) / P(B).`
}

// Input field configurations for each operation type
const inputConfigurations = {
  prob_uni: [
    {
      id: 'eventOccur',
      label: 'Número de casos favoráveis:',
      type: 'number',
      required: true
    },
    {
      id: 'totalEvents',
      label: 'Número total de casos possíveis:',
      type: 'number',
      required: true
    }
  ],
  prob_mulEv: [
    {
      id: 'numEvents',
      label: 'Número de eventos:',
      type: 'number',
      min: 2,
      required: true
    },
    {
      id: 'probabilities',
      label: 'Probabilidades (separadas por vírgula):',
      type: 'text',
      required: true
    }
  ],
  prob_doisEv: [
    {
      id: 'probA',
      label: 'Probabilidade do evento A:',
      type: 'number',
      step: '0.01',
      required: true
    },
    {
      id: 'probB',
      label: 'Probabilidade do evento B:',
      type: 'number',
      step: '0.01',
      required: true
    },
    {
      id: 'probIntersection',
      label: 'Probabilidade da interseção (A e B):',
      type: 'number',
      step: '0.01',
      required: true
    }
  ],
  Prob_nEv: [
    {
      id: 'numSeriesEvents',
      label: 'Número de eventos na série:',
      type: 'number',
      min: 1,
      required: true
    },
    {
      id: 'seriesProbabilities',
      label: 'Probabilidades da série (separadas por vírgula):',
      type: 'text',
      required: true
    }
  ],
  ProbCond: [
    {
      id: 'probAandB',
      label: 'Probabilidade de A e B ocorrerem:',
      type: 'number',
      step: '0.01',
      required: true
    },
    {
      id: 'probB_cond',
      label: 'Probabilidade do evento B:',
      type: 'number',
      step: '0.01',
      required: true
    }
  ]
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode()
  updateInputFields()
  setupEventListeners()
})

// Setup event listeners
const setupEventListeners = () => {
  document.getElementById('operation').addEventListener('change', e => {
    updateInputFields()
    updateExplanation() // Add this line to update explanation when operation changes
  })
  document
    .getElementById('showExplanation')
    .addEventListener('click', toggleExplanation)
  document
    .getElementById('calculate')
    .addEventListener('click', calculateProbability)
  document.getElementById('clear').addEventListener('click', clearFields)
}

// Update input fields based on selected operation
const updateInputFields = () => {
  const operation = document.getElementById('operation').value
  const inputFieldsSection = document.getElementById('input-fields')
  inputFieldsSection.innerHTML = ''

  inputConfigurations[operation].forEach(field => {
    const div = document.createElement('div')
    div.className = 'input-group'

    const label = document.createElement('label')
    label.htmlFor = field.id
    label.textContent = field.label

    const input = document.createElement('input')
    input.id = field.id
    input.type = field.type
    if (field.min) input.min = field.min
    if (field.step) input.step = field.step
    input.required = field.required

    div.appendChild(label)
    div.appendChild(input)
    inputFieldsSection.appendChild(div)
  })
}

const updateExplanation = () => {
  const operation = document.getElementById('operation').value
  const explanationDiv = document.getElementById('calcExplanation')

  // Only update if the explanation is currently visible
  if (explanationDiv.style.display === 'block') {
    explanationDiv.textContent = explanations[operation]
  }
}

// Toggle explanation visibility
const toggleExplanation = () => {
  const operation = document.getElementById('operation').value
  const explanationDiv = document.getElementById('calcExplanation')
  const isVisible = explanationDiv.style.display === 'block'

  explanationDiv.style.display = isVisible ? 'none' : 'block'
  explanationDiv.textContent = explanations[operation]
  document.getElementById('showExplanation').textContent = isVisible
    ? 'Responda-me'
    : 'Ocultar'
}

// Clear all input fields and result
const clearFields = () => {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => (input.value = ''))
  document.getElementById('result').innerHTML = ''
  document.getElementById('result').className = 'result'
}

// Validate input values
const validateInputs = inputs => {
  for (const input of inputs) {
    if (input.required && !input.value) {
      showResult('Por favor, preencha todos os campos obrigatórios.', 'error')
      return false
    }
    if (input.type === 'number' && input.value < 0) {
      showResult('Os valores não podem ser negativos.', 'error')
      return false
    }
  }
  return true
}

// Calculate probability based on selected operation
const calculateProbability = () => {
  const operation = document.getElementById('operation').value
  const inputs = document.querySelectorAll('input')

  if (!validateInputs(inputs)) return

  try {
    let result
    switch (operation) {
      case 'prob_uni':
        result = calculateSingleProbability()
        break
      case 'prob_mulEv':
        result = calculateMultipleEventsProbability()
        break
      case 'prob_doisEv':
        result = calculateTwoEventsProbability()
        break
      case 'Prob_nEv':
        result = calculateSeriesEventsProbability()
        break
      case 'ProbCond':
        result = calculateConditionalProbability()
        break
    }
    showResult(result, 'success')
  } catch (error) {
    showResult(error.message, 'error')
  }
}

// Individual calculation functions
const calculateSingleProbability = () => {
  const favorable = parseFloat(document.getElementById('eventOccur').value)
  const total = parseFloat(document.getElementById('totalEvents').value)

  if (favorable > total) {
    throw new Error(
      'O número de casos favoráveis não pode ser maior que o total de casos.'
    )
  }

  const probability = favorable / total
  return `A probabilidade é ${(probability * 100).toFixed(
    2
  )}% ou ${favorable}/${total}`
}

const calculateMultipleEventsProbability = () => {
  const numEvents = parseInt(document.getElementById('numEvents').value)
  const probabilities = document
    .getElementById('probabilities')
    .value.split(',')
    .map(p => parseFloat(p.trim()) / 100)

  if (probabilities.length !== numEvents) {
    throw new Error(
      'O número de probabilidades deve corresponder ao número de eventos.'
    )
  }

  if (probabilities.some(p => p < 0 || p > 1)) {
    throw new Error('As probabilidades devem estar entre 0 e 100.')
  }

  const probability = probabilities.reduce((acc, curr) => acc * curr, 1)
  return `A probabilidade de todos os eventos ocorrerem é ${(
    probability * 100
  ).toFixed(2)}%`
}

const calculateTwoEventsProbability = () => {
  const probA = parseFloat(document.getElementById('probA').value)
  const probB = parseFloat(document.getElementById('probB').value)
  const intersection = parseFloat(
    document.getElementById('probIntersection').value
  )

  if (probA > 1 || probB > 1 || intersection > 1) {
    throw new Error('As probabilidades devem estar entre 0 e 1.')
  }

  if (intersection > Math.min(probA, probB)) {
    throw new Error(
      'A probabilidade da interseção não pode ser maior que as probabilidades individuais.'
    )
  }

  const probability = probA + probB - intersection
  return `A probabilidade de A ou B ocorrerem é ${(probability * 100).toFixed(
    2
  )}%`
}

const calculateSeriesEventsProbability = () => {
  const numEvents = parseInt(document.getElementById('numSeriesEvents').value)
  const probabilities = document
    .getElementById('seriesProbabilities')
    .value.split(',')
    .map(p => parseFloat(p.trim()) / 100)

  if (probabilities.length !== numEvents) {
    throw new Error(
      'O número de probabilidades deve corresponder ao número de eventos na série.'
    )
  }

  if (probabilities.some(p => p < 0 || p > 1)) {
    throw new Error('As probabilidades devem estar entre 0 e 100.')
  }

  const probability = probabilities.reduce((acc, curr) => acc * curr, 1)
  return `A probabilidade da série completa de eventos é ${(
    probability * 100
  ).toFixed(2)}%`
}

const calculateConditionalProbability = () => {
  const probAandB = parseFloat(document.getElementById('probAandB').value)
  const probB = parseFloat(document.getElementById('probB_cond').value)

  if (probAandB > probB) {
    throw new Error(
      'A probabilidade de A e B não pode ser maior que a probabilidade de B.'
    )
  }

  const probability = probAandB / probB
  return `A probabilidade condicional P(A|B) é ${(probability * 100).toFixed(
    2
  )}%`
}

// Display result with appropriate styling
const showResult = (message, type) => {
  const resultDiv = document.getElementById('result')
  resultDiv.textContent = message
  resultDiv.className = `result ${type}`
}
