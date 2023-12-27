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

  // Get the elements
  const showExplanationButton = document.getElementById('showExplanation')
  const calcExplanation = document.getElementById('calcExplanation')
  const operationSelect = document.getElementById('operation')
  const unitSelectionContainer = document.getElementById('unit-selection')
  const inputFieldsContainer = document.getElementById('input-fields')
  const calculateButton = document.getElementById('calculate')
  const resultDisplay = document.getElementById('result')

  // Define an object to store explanations for each operation
  const explanations = {
    comprimento: `
      <div class="explanation-content">
        <h2>Comprimento</h2>
        <p>
          A unidade de <strong>comprimento</strong> refere-se à medida de distância entre dois pontos em uma linha reta. 
          Ela é comumente usada para medir dimensões lineares, como o comprimento de uma sala, a largura de uma estrada, etc.
        </p>
      </div>`,

    massa: `
      <div class="explanation-content">
        <h2>Massa</h2>
        <p>
          A unidade de <strong>massa</strong> é utilizada para medir a quantidade de matéria em um objeto. 
          Ela é essencial em diversas áreas, desde a física até a culinária, onde é usada para pesar ingredientes e calcular proporções em receitas.
        </p>
      </div>`,

    volume: `
      <div class="explanation-content">
        <h2>Volume</h2>
        <p>
          A unidade de <strong>volume</strong> representa o espaço tridimensional ocupado por um objeto ou substância. 
          É amplamente utilizada em geometria e física para medir o tamanho de recipientes, a capacidade de líquidos e objetos tridimensionais.
        </p>
      </div>`,

    area: `
      <div class="explanation-content">
        <h2>Área</h2>
        <p>
          A unidade de <strong>área</strong> refere-se à extensão de uma superfície bidimensional. 
          É comumente usada em geometria para medir o espaço ocupado por uma figura plana, como a área de um campo, de uma sala, ou de uma tela de computador.
        </p>
      </div>`,

    tempo: `
      <div class="explanation-content">
        <h2>Tempo</h2>
        <p>
          A unidade de <strong>tempo</strong> é fundamental para medir a duração de eventos. 
          Pode ser utilizada para calcular a velocidade, estimar a durabilidade de produtos, ou simplesmente marcar o tempo decorrido entre dois eventos.
        </p>
      </div>`,

    velocidade: `
      <div class="explanation-content">
        <h2>Velocidade</h2>
        <p>
          A unidade de <strong>velocidade</strong> mede a rapidez com que um objeto se move em relação ao tempo. 
          É frequentemente usada em física, engenharia e transporte para calcular a taxa de mudança de posição de um objeto em relação ao tempo.
        </p>
      </div>`,

    angulo: `
      <div class="explanation-content">
        <h2>Ângulo</h2>
        <p>
          A unidade de <strong>ângulo</strong> é utilizada para medir a abertura ou inclinação entre duas linhas ou planos. 
          É essencial em geometria e trigonometria, onde é usada para calcular distâncias, áreas, e resolver problemas relacionados à forma de objetos.
        </p>
      </div>`,

    pressao: `
      <div class="explanation-content">
        <h2>Pressão</h2>
        <p>
          A unidade de <strong>pressão</strong> mede a força exercida por uma substância em uma determinada área. 
          É usada em física, meteorologia, e engenharia para descrever a distribuição de forças em fluidos, gases e sólidos.
        </p>
      </div>`
  }

  const operationsWithInputs = [
    'comprimento',
    'massa',
    'volume',
    'area',
    'tempo',
    'velocidade',
    'angulo',
    'pressao'
  ]

  const lengthUnits = [
    'Quilômetro (km)',
    'Hectômetro (hm)',
    'Decâmetro (dam)',
    'Metro (m)',
    'Decímetro (dm)',
    'Centímetro (cm)',
    'Milímetro (mm)'
  ]

  const massUnits = [
    'Quilograma (kg)',
    'Hectograma (hg)',
    'Decagrama (dag)',
    'Grama (g)',
    'Decigrama (dg)',
    'Centigrama (cg)',
    'Miligrama (mg)'
  ]

  const volumeUnits = [
    'Quilômetro Cúbico (km³)',
    'Hectômetro Cúbico (hm³)',
    'Decâmetro Cúbico (dam³)',
    'Metro Cúbico (m³)',
    'Decímetro Cúbico (dm³)',
    'Centímetro Cúbico (cm³)',
    'Milímetro Cúbico (mm³)'
  ]

  const areaUnits = [
    'Quilômetro Quadrado (km²)',
    'Hectômetro Quadrado (hm²)',
    'Decâmetro Quadrado (dam²)',
    'Metro Quadrado (m²)',
    'Decímetro Quadrado (dm²)',
    'Centímetro Quadrado (cm²)',
    'Milímetro Quadrado (mm²)'
  ]

  const tempoUnits = [
    'Segundo (s)',
    'Minuto (min)',
    'Hora (h)',
    'Dia (dia)',
    'Semana (semana)',
    'Mês (mês)',
    'Ano (ano)'
  ]

  const velocidadeUnits = [
    'Quilômetro por Hora (km/h)',
    'Metro por Segundo (m/s)',
    'Milha por Hora (mph)',
    'Pé por Segundo (fps)',
    'Nó (kn)'
  ]

  const anguloUnits = ['Grau (°)', 'Radiano (rad)', 'Grau-minuto-segundo (GMS)']

  const pressaoUnits = [
    'Pascal (Pa)',
    'Quilopascal (kPa)',
    'Megapascal (MPa)',
    'Bar (bar)',
    'Psi (psi)'
  ]

  // Function to update and show/hide the explanation for the selected operation
  function updateExplanation() {
    const selectedOperation = operationSelect.value
    const explanation = explanations[selectedOperation]

    // Check if the button is active (explanation is visible)
    const isExplanationVisible =
      showExplanationButton.classList.contains('active')

    // Toggle the visibility of the explanation only if the button is active
    if (isExplanationVisible) {
      calcExplanation.innerHTML = explanation
    } else {
      calcExplanation.innerHTML = ''
    }
  }

  // Function to create the unit selection dropdown
  function createUnitSelection() {
    const selectedOperation = operationSelect.value

    // Check if the selected operation requires a unit selection
    if (operationsWithInputs.includes(selectedOperation)) {
      const label = document.createElement('label')
      label.textContent = 'Escolha a unidade:'

      const unitSelect = document.createElement('select')
      unitSelect.id = 'unit-select'

      // Use the appropriate units based on the selected operation
      let units
      switch (selectedOperation) {
        case 'comprimento':
          units = lengthUnits
          break

        case 'massa':
          units = massUnits
          break

        case 'volume':
          units = volumeUnits
          break

        case 'area':
          units = areaUnits
          break

        case 'tempo':
          units = tempoUnits
          break

        case 'velocidade':
          units = velocidadeUnits
          break

        case 'angulo':
          units = anguloUnits
          break

        case 'pressao':
          units = pressaoUnits
          break

        default:
          units = []
      }

      units.forEach(unit => {
        const option = document.createElement('option')
        option.value = unit
        option.textContent = unit
        unitSelect.appendChild(option)
      })

      unitSelectionContainer.innerHTML = ''
      unitSelectionContainer.appendChild(label)
      unitSelectionContainer.appendChild(unitSelect)

      // Create the input field after the user selects a unit
      unitSelect.addEventListener('change', function () {
        createInputField('Digite o valor:', 'number', 'user-input')
      })
    } else {
      unitSelectionContainer.innerHTML = ''
    }
  }

  function createInputField(labelText, inputType, inputId) {
    const selectedOperation = operationSelect.value

    // Check if the selected operation requires an input field
    if (operationsWithInputs.includes(selectedOperation)) {
      const label = document.createElement('label')
      label.textContent = labelText

      const input = document.createElement('input')
      input.type = inputType
      input.id = inputId

      inputFieldsContainer.innerHTML = ''
      inputFieldsContainer.appendChild(label)
      inputFieldsContainer.appendChild(input)
    } else {
      inputFieldsContainer.innerHTML = ''
    }
  }

  function calculateResult() {
    const selectedOperation = operationSelect.value
    const inputValue = parseFloat(document.getElementById('user-input').value)

    let resultTable

    const table = document.createElement('table')
    const headerRow = table.createTHead().insertRow(0)
    const headerCell1 = headerRow.insertCell(0)
    const headerCell2 = headerRow.insertCell(1)
    headerCell1.textContent = 'Unidade'
    headerCell2.textContent = 'Valor Convertido'

    switch (selectedOperation) {
      case 'comprimento':
        const selectedLengthUnit = document.getElementById('unit-select').value
        resultTable = generateComprimentoTable(inputValue, selectedLengthUnit)
        break

      // Adicione casos para outras operações conforme necessário

      default:
        resultTable = '<p>Operação não suportada</p>'
    }

    displayResult(resultTable)
  }

  function generateComprimentoTable(value, selectedUnit) {
    const units = [
      'Quilômetro (km)',
      'Hectômetro (hm)',
      'Decâmetro (dam)',
      'Metro (m)',
      'Decímetro (dm)',
      'Centímetro (cm)',
      'Milímetro (mm)'
    ]

    const tableRows = units.map(unit => {
      const convertedValue = convertComprimento(value, selectedUnit, unit)
      return `<tr><td>${unit}</td><td>${convertedValue.toFixed(6)}</td></tr>`
    })

    return `
      <table>
        <thead>
          <tr>
            <th>Unidade</th>
            <th>Valor Convertido</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows.join('')}
        </tbody>
      </table>
    `
  }

  function convertComprimento(value, fromUnit, toUnit) {
    const conversionFactors = {
      'Quilômetro (km)': 0.001,
      'Hectômetro (hm)': 0.01,
      'Decâmetro (dam)': 0.1,
      'Metro (m)': 1,
      'Decímetro (dm)': 10,
      'Centímetro (cm)': 100,
      'Milímetro (mm)': 1000
    }

    const valueInMeters = value * conversionFactors[fromUnit]
    return valueInMeters / conversionFactors[toUnit]
  }

  function displayResult(result) {
    resultDisplay.innerHTML = result
  }

  // Event listener for the "Responda-me" button
  showExplanationButton.addEventListener('click', function () {
    // Toggle the active class to track button state
    showExplanationButton.classList.toggle('active')
    updateExplanation()
  })

  // Event listener for operation change
  operationSelect.addEventListener('change', function () {
    updateExplanation()
    createUnitSelection() // Create unit selection dynamically
    createInputField('Digite o valor:', 'number', 'user-input') // Create input field dynamically

    // Check if the selected operation requires input fields
    if (operationsWithInputs.includes(operationSelect.value)) {
      // For "Comprimento," dynamically create the unit selection options
      if (operationSelect.value === 'comprimento') {
        const unitSelectLabel = document.createElement('label')
        unitSelectLabel.textContent = 'Escolha a unidade:'

        const unitSelect = document.createElement('select')
        unitSelect.id = 'unit-select'

        lengthUnits.forEach(unit => {
          const option = document.createElement('option')
          option.value = unit
          option.textContent = unit
          unitSelect.appendChild(option)
        })

        unitSelectionContainer.innerHTML = '' // Clear previous content
        unitSelectionContainer.appendChild(unitSelectLabel)
        unitSelectionContainer.appendChild(unitSelect)

        // Create the input field after the user selects a unit
        unitSelect.addEventListener('change', function () {
          createInputField('Digite o valor:', 'number', 'user-input')
        })
      } else {
        // For other operations, directly create the input field
        createInputField('Digite o valor:', 'number', 'user-input')
      }
    } else {
      unitSelectionContainer.innerHTML = '' // Clear unit selection
      inputFieldsContainer.innerHTML = '' // Clear input fields
    }
  })

  calculateButton.addEventListener('click', function () {
    calculateResult()
  })

  const clearButton = document.getElementById('clear')
  clearButton.addEventListener('click', function () {
    // Zerar o valor digitado no input
    document.getElementById('user-input').value = ''
    // Limpar apenas o conteúdo da tabela de resultados
    resultDisplay.innerHTML = ''
  })

  // Trigger initial creation of unit selection and input field for the default operation ("comprimento")
  createUnitSelection()
  createInputField('Digite o valor:', 'number', 'user-input')
})
