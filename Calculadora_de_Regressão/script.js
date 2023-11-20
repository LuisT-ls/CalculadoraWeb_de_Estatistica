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
  setupEventListeners()
})

// Função para configurar os ouvintes de eventos
function setupEventListeners() {
  const toggleDescriptionBtn = document.getElementById('toggleDescriptionBtn')

  if (toggleDescriptionBtn) {
    toggleDescriptionBtn.addEventListener('click', toggleDescription)
  }
}

function toggleDescription() {
  const descriptionDiv = document.getElementById('description')

  // Verifica o estilo 'display'
  const isHidden =
    descriptionDiv.style.display === 'none' ||
    window.getComputedStyle(descriptionDiv).display === 'none'

  // Toggle do estilo display para controlar a visibilidade
  if (isHidden) {
    descriptionDiv.style.display = 'block'
    document.getElementById('toggleDescriptionBtn').textContent =
      'Ocultar Como Calcular'
  } else {
    descriptionDiv.style.display = 'none'
    document.getElementById('toggleDescriptionBtn').textContent =
      'Mostrar Como Calcular'
  }
}

function calculateRegression(event) {
  // Prevenir o envio padrão do formulário
  event.preventDefault()

  // Obter os valores de entrada
  const xValuesInput = document.getElementById('xValues').value
  const yValuesInput = document.getElementById('yValues').value

  // Verificar se há valores de entrada
  if (!xValuesInput || !yValuesInput) {
    alert('Por favor, insira valores para X e Y.')
    return
  }

  // Converter os valores de string para arrays numéricos
  const xValues = parseInputValues(xValuesInput)
  const yValues = parseInputValues(yValuesInput)

  // Calcular o coeficiente de correlação
  const correlation = calculateCorrelation(xValues, yValues)

  // Calcular os coeficientes da regressão linear
  const regressionCoefficients = calculateRegressionCoefficients(
    xValues,
    yValues
  )

  // Gerar a tabela
  generateTable(xValues, yValues)

  // Gerar o diagrama de dispersão
  generateScatterPlot(xValues, yValues)

  // Exibir a div do diagrama de dispersão removendo a classe 'hidden'
  document.getElementById('scatter-plot').classList.remove('hidden')

  // Calcular o coeficiente de determinação
  const determination = correlation ** 2

  // Interpretar os resultados
  let interpretation = ''
  if (determination >= 0.8) {
    interpretation = 'Fortemente correlacionado'
  } else if (determination >= 0.6) {
    interpretation = 'Moderadamente correlacionado'
  } else {
    interpretation = 'Fraco ou sem correlação'
  }

  // Exibir os resultados
  document.getElementById('correlation').innerText = correlation.toFixed(2)
  document.getElementById('determination').innerText = determination.toFixed(2)
  document.getElementById('interpretation').innerText = interpretation

  // Exibir a equação de regressão ajustada
  displayRegressionEquation(regressionCoefficients)
}

// Função para gerar a tabela
function generateTable(xValues, yValues) {
  const tableContainer = document.getElementById('table-container')

  // Limpar a tabela existente, se houver
  tableContainer.innerHTML = ''

  // Criar a tabela e os cabeçalhos
  const table = document.createElement('table')
  table.classList.add('regression-table') // Adiciona uma classe para estilização
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')
  const headers = ['X', 'Y', 'X²', 'Y²', 'X • Y']

  // Adicionar cabeçalhos à linha do cabeçalho
  const headerRow = document.createElement('tr')
  headers.forEach(headerText => {
    const th = document.createElement('th')
    th.textContent = headerText
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)

  // Inicializar os somatórios
  let sumX = 0
  let sumY = 0
  let sumXSquared = 0
  let sumYSquared = 0
  let sumXY = 0

  // Preencher os dados na tabela
  for (let i = 0; i < xValues.length; i++) {
    const x = xValues[i]
    const y = yValues[i]
    const xSquare = x ** 2
    const ySquare = y ** 2
    const xy = x * y

    // Atualizar os somatórios
    sumX += x
    sumY += y
    sumXSquared += xSquare
    sumYSquared += ySquare
    sumXY += xy

    // Criar uma nova linha na tabela
    const row = document.createElement('tr')

    // Adicionar células com os valores calculados
    ;[x, y, xSquare, ySquare, xy].forEach(value => {
      const cell = document.createElement('td')
      cell.textContent = value
      row.appendChild(cell)
    })

    // Adicionar a linha à tbody
    tbody.appendChild(row)
  }

  // Adicionar a linha de somatórios ao tbody com uma classe de destaque
  const sumRow = document.createElement('tr')
  sumRow.classList.add('highlighted-row')
  const sumLabels = ['Σ', 'Σ', 'Σ', 'Σ', 'Σ']
  ;[sumX, sumY, sumXSquared, sumYSquared, sumXY].forEach((sum, index) => {
    const cell = document.createElement('td')
    const label = document.createElement('span')
    label.textContent = `${sumLabels[index]}:`
    cell.appendChild(label)
    cell.textContent += sum
    sumRow.appendChild(cell)
  })
  tbody.appendChild(sumRow)

  // Adicionar thead e tbody à tabela
  table.appendChild(thead)
  table.appendChild(tbody)

  // Adicionar a tabela ao contêiner
  tableContainer.appendChild(table)
}

// Função para calcular os coeficientes da regressão linear
function calculateRegressionCoefficients(xValues, yValues) {
  const n = xValues.length
  const sumX = xValues.reduce((sum, x) => sum + x, 0)
  const sumY = yValues.reduce((sum, y) => sum + y, 0)
  const sumXY = xValues
    .map((x, i) => x * yValues[i])
    .reduce((sum, xy) => sum + xy, 0)
  const sumXSquare = xValues
    .map(x => x ** 2)
    .reduce((sum, xSquare) => sum + xSquare, 0)

  // Coeficientes da regressão linear
  const slope = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX ** 2)
  const intercept = (sumY - slope * sumX) / n

  return { slope, intercept }
}

// Função para exibir a equação de regressão ajustada
function displayRegressionEquation(coefficients) {
  const equationContainer = document.getElementById('regressionEquation')
  const equation = `Equação de Regressão: y = ${coefficients.slope.toFixed(
    2
  )}x + ${coefficients.intercept.toFixed(2)}`
  equationContainer.innerText = equation
}

// Função para analisar os valores de entrada
function parseInputValues(input) {
  // Verifica se a entrada contém vírgulas
  if (input.includes(',')) {
    // Separa os valores por vírgulas e converte para números
    return input.split(',').map(Number)
  } else {
    // Se não houver vírgulas, assume que os valores estão separados por espaços
    return input.split(' ').map(Number)
  }
}

function calculateCorrelation(xValues, yValues) {
  const n = xValues.length
  const sumX = xValues.reduce((sum, x) => sum + x, 0)
  const sumY = yValues.reduce((sum, y) => sum + y, 0)
  const sumXY = xValues
    .map((x, i) => x * yValues[i])
    .reduce((sum, xy) => sum + xy, 0)
  const sumXSquare = xValues
    .map(x => x ** 2)
    .reduce((sum, xSquare) => sum + xSquare, 0)
  const sumYSquare = yValues
    .map(y => y ** 2)
    .reduce((sum, ySquare) => sum + ySquare, 0)

  const numerator = n * sumXY - sumX * sumY
  const denominatorX = n * sumXSquare - sumX ** 2
  const denominatorY = n * sumYSquare - sumY ** 2

  const correlation = numerator / Math.sqrt(denominatorX * denominatorY)
  return correlation
}

function generateScatterPlot(xValues, yValues) {
  const trace = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'scatter',
    marker: {
      color: 'rgba(50, 171, 96, 0.9)', // Cor mais agradável
      size: 16, // Aumentei o tamanho
      line: {
        color: 'rgba(255, 255, 255, 0.8)',
        width: 2
      },
      opacity: 1, // Aumentei a opacidade
      symbol: 'circle',
      sizemode: 'diameter'
    }
  }

  const layout = {
    xaxis: {
      title: 'Valores de X',
      zeroline: false,
      gridcolor: 'rgba(200, 200, 200, 0.2)',
      showline: true,
      linecolor: 'rgba(100, 100, 100, 0.8)',
      linewidth: 2
    },
    yaxis: {
      title: 'Valores de Y',
      zeroline: false,
      gridcolor: 'rgba(200, 200, 200, 0.2)',
      showline: true,
      linecolor: 'rgba(100, 100, 100, 0.8)',
      linewidth: 2
    },
    showlegend: false,
    paper_bgcolor: 'rgba(240, 240, 240, 0.95)',
    plot_bgcolor: 'rgba(240, 240, 240, 0.95)',
    hovermode: 'closest', // Adiciona interação com o hover
    hoverlabel: {
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      bordercolor: 'rgba(100, 100, 100, 0.8)',
      font: {
        color: 'rgba(50, 50, 50, 0.9)'
      }
    },
    margin: {
      l: 80,
      r: 50,
      b: 80,
      t: 50,
      pad: 4
    },
    transition: {
      duration: 1000, // Adiciona uma animação de transição
      easing: 'ease-out'
    }
  }

  Plotly.newPlot('scatter-plot', [trace], layout)
}
