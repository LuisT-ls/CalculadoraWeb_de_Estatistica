// Unit conversion rates and configurations
const unitConfigs = {
  comprimento: {
    units: [
      'metros',
      'quilômetros',
      'centímetros',
      'milímetros',
      'polegadas',
      'pés',
      'jardas',
      'milhas',
      'micrómetros',
      'nanômetros',
      'anos-luz'
    ],
    baseUnit: 'metros',
    conversions: {
      metros: 1,
      quilômetros: 0.001,
      centímetros: 100,
      milímetros: 1000,
      polegadas: 39.3701,
      pés: 3.28084,
      jardas: 1.09361,
      milhas: 0.000621371,
      micrómetros: 1000000,
      nanômetros: 1000000000,
      'anos-luz': 1.057e-16
    },
    explanation:
      'A conversão de comprimento é fundamental na engenharia, construção civil, navegação e em diversas áreas científicas. Permite transformar medidas entre diferentes sistemas de unidades, como o métrico e o imperial.'
  },
  massa: {
    units: [
      'quilogramas',
      'gramas',
      'miligramas',
      'libras',
      'onças',
      'toneladas',
      'microgramas',
      'stones',
      'quilates',
      'toneladas métricas'
    ],
    baseUnit: 'quilogramas',
    conversions: {
      quilogramas: 1,
      gramas: 1000,
      miligramas: 1000000,
      libras: 2.20462,
      onças: 35.274,
      toneladas: 0.001,
      microgramas: 1e9,
      stones: 0.157473,
      quilates: 5000,
      'toneladas métricas': 0.001
    },
    explanation:
      'A conversão de massa é essencial em áreas como medicina, culinária, indústria e comércio. Permite converter entre diferentes unidades de peso, facilitando cálculos precisos e padronização de medidas.'
  },
  volume: {
    units: [
      'litros',
      'mililitros',
      'metros cúbicos',
      'galões',
      'onças líquidas',
      'copos',
      'centímetros cúbicos',
      'pés cúbicos',
      'polegadas cúbicas',
      'barris'
    ],
    baseUnit: 'litros',
    conversions: {
      litros: 1,
      mililitros: 1000,
      'metros cúbicos': 0.001,
      galões: 0.264172,
      'onças líquidas': 33.814,
      copos: 4.22675,
      'centímetros cúbicos': 1000,
      'pés cúbicos': 0.0353147,
      'polegadas cúbicas': 61.0237,
      barris: 0.00628981
    },
    explanation:
      'A conversão de volume é crucial em laboratórios, indústria química, culinária e engenharia hidráulica. Permite calcular quantidades de líquidos e materiais em diferentes unidades de medida.'
  },
  area: {
    units: [
      'metros quadrados',
      'quilômetros quadrados',
      'hectares',
      'acres',
      'pés quadrados',
      'polegadas quadradas',
      'centímetros quadrados',
      'milímetros quadrados',
      'jardas quadradas',
      'alqueires'
    ],
    baseUnit: 'metros quadrados',
    conversions: {
      'metros quadrados': 1,
      'quilômetros quadrados': 0.000001,
      hectares: 0.0001,
      acres: 0.000247105,
      'pés quadrados': 10.7639,
      'polegadas quadradas': 1550,
      'centímetros quadrados': 10000,
      'milímetros quadrados': 1000000,
      'jardas quadradas': 1.19599,
      alqueires: 0.0000413223
    },
    explanation:
      'A conversão de área é fundamental no planejamento urbano, agricultura, arquitetura e construção civil. Permite calcular superfícies em diferentes escalas e sistemas de medida.'
  },
  tempo: {
    units: [
      'segundos',
      'minutos',
      'horas',
      'dias',
      'semanas',
      'meses',
      'anos',
      'décadas',
      'séculos',
      'milissegundos',
      'microssegundos',
      'nanossegundos'
    ],
    baseUnit: 'segundos',
    conversions: {
      segundos: 1,
      minutos: 1 / 60,
      horas: 1 / 3600,
      dias: 1 / 86400,
      semanas: 1 / 604800,
      meses: 1 / 2592000,
      anos: 1 / 31536000,
      décadas: 1 / 315360000,
      séculos: 1 / 3153600000,
      milissegundos: 1000,
      microssegundos: 1000000,
      nanossegundos: 1000000000
    },
    explanation:
      'A conversão de tempo é utilizada em cronometragem, planejamento, astronomia e física. Permite converter entre diferentes unidades de tempo para cálculos precisos de duração e intervalos.'
  },
  velocidade: {
    units: [
      'metros por segundo',
      'quilômetros por hora',
      'milhas por hora',
      'nós',
      'pés por segundo',
      'mach',
      'velocidade da luz'
    ],
    baseUnit: 'metros por segundo',
    conversions: {
      'metros por segundo': 1,
      'quilômetros por hora': 3.6,
      'milhas por hora': 2.23694,
      nós: 1.94384,
      'pés por segundo': 3.28084,
      mach: 0.00292,
      'velocidade da luz': 3.33564e-9
    },
    explanation:
      'A conversão de velocidade é essencial na física, navegação, aviação e transportes. Permite converter entre diferentes unidades de velocidade usadas em diversos contextos.'
  },
  angulo: {
    units: [
      'graus',
      'radianos',
      'grados',
      'minutos de arco',
      'segundos de arco',
      'rotações'
    ],
    baseUnit: 'graus',
    conversions: {
      graus: 1,
      radianos: 0.0174533,
      grados: 1.11111,
      'minutos de arco': 60,
      'segundos de arco': 3600,
      rotações: 0.00277778
    },
    explanation:
      'A conversão de ângulos é fundamental na matemática, engenharia, navegação e astronomia. Permite converter entre diferentes sistemas de medição angular.'
  },
  pressao: {
    units: [
      'pascal',
      'bar',
      'psi',
      'atmosferas',
      'torr',
      'quilopascal',
      'megapascal',
      'milímetros de mercúrio'
    ],
    baseUnit: 'pascal',
    conversions: {
      pascal: 1,
      bar: 0.00001,
      psi: 0.000145038,
      atmosferas: 0.00000986923,
      torr: 0.00750062,
      quilopascal: 0.001,
      megapascal: 0.000001,
      'milímetros de mercúrio': 0.00750062
    },
    explanation:
      'A conversão de pressão é crucial em meteorologia, engenharia mecânica e processos industriais. Permite converter entre diferentes unidades de pressão usadas em diversos campos.'
  }
}

// Theme management
const themeManager = {
  isDarkMode: false,

  initialize() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.setTheme(savedTheme === 'dark')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      this.setTheme(prefersDark)
    }

    // Listen for system theme changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches)
        }
      })
  },

  setTheme(dark) {
    this.isDarkMode = dark
    document.body.classList.toggle('dark-mode', dark)
    const darkModeButton = document.getElementById('toggleDarkMode')
    darkModeButton.textContent = dark ? '☀️' : '🌙'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },

  toggle() {
    this.setTheme(!this.isDarkMode)
  }
}

// Input validation and formatting
const inputValidator = {
  isValidNumber(value) {
    return !isNaN(value) && isFinite(value)
  },

  formatNumber(number) {
    return new Intl.NumberFormat('pt-BR', {
      maximumSignificantDigits: 10,
      minimumSignificantDigits: 1
    }).format(number)
  },

  sanitizeInput(input) {
    return input.replace(/[^0-9.-]/g, '')
  }
}

// History management
const historyManager = {
  history: [],
  maxHistoryItems: 10,

  add(conversion) {
    this.history.unshift(conversion)
    if (this.history.length > this.maxHistoryItems) {
      this.history.pop()
    }
    this.saveToLocalStorage()
    this.updateUI()
  },

  clear() {
    this.history = []
    this.saveToLocalStorage()
    this.updateUI()
  },

  saveToLocalStorage() {
    localStorage.setItem('conversionHistory', JSON.stringify(this.history))
  },

  loadFromLocalStorage() {
    const savedHistory = localStorage.getItem('conversionHistory')
    if (savedHistory) {
      this.history = JSON.parse(savedHistory)
      this.updateUI()
    }
  },

  updateUI() {
    const historyContainer = document.getElementById('conversionHistory')
    if (!historyContainer) return

    historyContainer.innerHTML = this.history
      .map(
        item => `
      <div class="history-item">
        <span>${item.fromValue} ${item.fromUnit} = ${item.toValue} ${
          item.toUnit
        }</span>
        <small>${new Date(item.timestamp).toLocaleString()}</small>
      </div>
    `
      )
      .join('')
  }
}

// DOM Elements
const operationSelect = document.getElementById('operation')
const unitSelectionDiv = document.getElementById('unit-selection')
const inputFieldsDiv = document.getElementById('input-fields')
const calculateButton = document.getElementById('calculate')
const clearButton = document.getElementById('clear')
const resultDiv = document.getElementById('result')
const showExplanationButton = document.getElementById('showExplanation')
const explanationText = document.getElementById('calcExplanation')

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  themeManager.initialize()

  // Initialize converter
  updateUnitSelections()
  loadLastUsedOptions()

  // Add event listeners
  operationSelect.addEventListener('change', updateUnitSelections)
  calculateButton.addEventListener('click', performCalculation)
  clearButton.addEventListener('click', clearFields)
  showExplanationButton.addEventListener('click', toggleExplanation)
  document
    .getElementById('toggleDarkMode')
    .addEventListener('click', () => themeManager.toggle())

  // Load conversion history
  historyManager.loadFromLocalStorage()

  // Add input validation
  document.getElementById('value').addEventListener('input', e => {
    e.target.value = inputValidator.sanitizeInput(e.target.value)
  })

  // Add keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      performCalculation()
    } else if (e.key === 'Escape') {
      clearFields()
    }
  })
})

// Save last used options
function saveLastUsedOptions() {
  const options = {
    operation: operationSelect.value,
    fromUnit: document.getElementById('fromUnit').value,
    toUnit: document.getElementById('toUnit').value
  }
  localStorage.setItem('lastUsedOptions', JSON.stringify(options))
}

// Load last used options
function loadLastUsedOptions() {
  const savedOptions = localStorage.getItem('lastUsedOptions')
  if (savedOptions) {
    const options = JSON.parse(savedOptions)
    operationSelect.value = options.operation
    updateUnitSelections()
    setTimeout(() => {
      document.getElementById('fromUnit').value = options.fromUnit
      document.getElementById('toUnit').value = options.toUnit
    }, 0)
  }
}

// Update unit selection dropdowns
function updateUnitSelections() {
  const selectedOperation = operationSelect.value
  const config = unitConfigs[selectedOperation]

  unitSelectionDiv.innerHTML = `
    <div>
      <label for="fromUnit">De:</label>
      <select id="fromUnit">
        ${config.units
          .map(unit => `<option value="${unit}">${unit}</option>`)
          .join('')}
      </select>
    </div>
    <div>
      <label for="toUnit">Para:</label>
      <select id="toUnit">
        ${config.units
          .map(unit => `<option value="${unit}">${unit}</option>`)
          .join('')}
      </select>
    </div>
  `

  inputFieldsDiv.innerHTML = `
    <div>
      <label for="value">Valor:</label>
      <input type="text" id="value" placeholder="Digite o valor" autocomplete="off">
    </div>
  `

  explanationText.textContent = config.explanation

  // Add change listeners for saving options
  document
    .getElementById('fromUnit')
    .addEventListener('change', saveLastUsedOptions)
  document
    .getElementById('toUnit')
    .addEventListener('change', saveLastUsedOptions)
}

// Perform the conversion calculation
// Perform the conversion calculation
function performCalculation() {
  const selectedOperation = operationSelect.value
  const config = unitConfigs[selectedOperation]
  const fromUnit = document.getElementById('fromUnit').value
  const toUnit = document.getElementById('toUnit').value
  const inputValue = document.getElementById('value').value.trim()

  // Validate empty input
  if (!inputValue) {
    showResult('Por favor, insira um valor para converter.', 'error')
    return
  }

  const value = parseFloat(inputValue)

  // Validate number input
  if (!inputValidator.isValidNumber(value)) {
    showResult('Por favor, digite um valor numérico válido.', 'error')
    return
  }

  try {
    // Convert to base unit first, then to target unit
    const valueInBaseUnit = value / config.conversions[fromUnit]
    const result = valueInBaseUnit * config.conversions[toUnit]

    // Validate result
    if (!inputValidator.isValidNumber(result)) {
      throw new Error('O resultado do cálculo é inválido.')
    }

    if (result === 0 || !isFinite(result)) {
      throw new Error('O resultado está fora do intervalo permitido.')
    }

    const formattedResult = inputValidator.formatNumber(result)
    const message = `${inputValidator.formatNumber(
      value
    )} ${fromUnit} = ${formattedResult} ${toUnit}`

    // Add to history
    historyManager.add({
      operation: selectedOperation,
      fromValue: inputValidator.formatNumber(value),
      fromUnit,
      toValue: formattedResult,
      toUnit,
      timestamp: new Date().toISOString(),
      successful: true
    })

    // Show result
    showResult(message, 'success')

    // Save last successful conversion
    saveLastConversion({
      value: inputValue,
      fromUnit,
      toUnit,
      operation: selectedOperation
    })
  } catch (error) {
    showResult(`Erro na conversão: ${error.message}`, 'error')

    // Add failed conversion to history
    historyManager.add({
      operation: selectedOperation,
      fromValue: inputValidator.formatNumber(value),
      fromUnit,
      toUnit,
      timestamp: new Date().toISOString(),
      successful: false,
      error: error.message
    })
  }
}

// Clear all fields and maintain focus
function clearFields() {
  const valueInput = document.getElementById('value')
  valueInput.value = ''
  resultDiv.textContent = ''
  resultDiv.className = 'result'
  valueInput.focus()
}

// Show result with appropriate styling and animation
function showResult(message, type) {
  resultDiv.textContent = message
  resultDiv.className = `result ${type}`

  // Add animation
  resultDiv.style.animation = 'none'
  resultDiv.offsetHeight // Trigger reflow
  resultDiv.style.animation = 'fadeIn 0.5s ease-out'
}

// Toggle explanation visibility with animation
function toggleExplanation() {
  const isVisible = explanationText.classList.contains('active')

  if (isVisible) {
    explanationText.style.opacity = '0'
    explanationText.style.transform = 'translateY(-10px)'
    setTimeout(() => {
      explanationText.classList.remove('active')
    }, 300)
  } else {
    explanationText.classList.add('active')
    setTimeout(() => {
      explanationText.style.opacity = '1'
      explanationText.style.transform = 'translateY(0)'
    }, 10)
  }

  showExplanationButton.textContent = isVisible
    ? 'Responda-me'
    : 'Ocultar Explicação'
}

// Save last successful conversion
function saveLastConversion(data) {
  localStorage.setItem('lastConversion', JSON.stringify(data))
}

// Load last successful conversion
function loadLastConversion() {
  const lastConversion = localStorage.getItem('lastConversion')
  if (lastConversion) {
    const data = JSON.parse(lastConversion)
    operationSelect.value = data.operation
    updateUnitSelections()

    setTimeout(() => {
      document.getElementById('fromUnit').value = data.fromUnit
      document.getElementById('toUnit').value = data.toUnit
      document.getElementById('value').value = data.value
    }, 0)
  }
}

// Add copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showResult('Resultado copiado para a área de transferência!', 'success')
      setTimeout(() => {
        resultDiv.className = 'result'
      }, 2000)
    })
    .catch(() => {
      showResult('Não foi possível copiar o resultado.', 'error')
    })
}

// Add copy button to result
resultDiv.addEventListener('click', () => {
  if (resultDiv.textContent && !resultDiv.textContent.includes('Erro')) {
    copyToClipboard(resultDiv.textContent)
  }
})

// Handle keyboard shortcuts
document.addEventListener('keydown', e => {
  // Prevent shortcuts when typing in input
  if (e.target.tagName === 'INPUT' && e.key !== 'Enter') {
    return
  }

  if (e.key === 'Enter') {
    performCalculation()
  } else if (e.key === 'Escape') {
    clearFields()
  } else if (e.ctrlKey && e.key === 'c' && resultDiv.textContent) {
    copyToClipboard(resultDiv.textContent)
  }
})

// Initialize swap button functionality
function initializeSwapButton() {
  const swapButton = document.createElement('button')
  swapButton.innerHTML = '↔️'
  swapButton.className = 'swap-button'
  swapButton.title = 'Trocar unidades'
  unitSelectionDiv.appendChild(swapButton)

  swapButton.addEventListener('click', () => {
    const fromUnit = document.getElementById('fromUnit')
    const toUnit = document.getElementById('toUnit')
    const tempValue = fromUnit.value

    fromUnit.value = toUnit.value
    toUnit.value = tempValue

    if (document.getElementById('value').value) {
      performCalculation()
    }
  })
}

// Add custom CSS for swap button
const style = document.createElement('style')
style.textContent = `
  .swap-button {
    background: var(--primary-color);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .swap-button:hover {
    background: var(--primary-hover);
    transform: translateY(-50%) scale(1.1);
  }

  #unit-selection {
    position: relative;
  }

  .history-item {
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .history-item:last-child {
    border-bottom: none;
  }

  .history-item small {
    color: var(--text-secondary);
  }
`

document.head.appendChild(style)

// Initialize swap button after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeSwapButton()
  loadLastConversion()
})
