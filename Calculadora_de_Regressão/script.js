// Inicialização do dark mode
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('toggleDarkMode')
  button.textContent = '☀️'
})

// Dark mode functionality
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')
  const button = document.getElementById('toggleDarkMode')
  button.textContent = document.body.classList.contains('dark-mode')
    ? '☀️'
    : '🌙'
}

// Toggle description visibility
document
  .getElementById('toggleDescriptionBtn')
  .addEventListener('click', function () {
    const description = document.getElementById('description')
    const isHidden = description.classList.toggle('hidden')
    this.textContent = isHidden
      ? 'Mostrar Como Calcular'
      : 'Ocultar Como Calcular'
  })

// Format number function
function formatNumber(num) {
  if (Number.isInteger(num)) {
    return num.toString()
  }
  const numStr = num.toString()
  if (numStr.includes(',')) {
    return numStr
  }
  return num.toFixed(1)
}

// Parse input values function
function parseValues(input) {
  return input
    .replace(/\s+/g, ',')
    .split(',')
    .filter(val => val.trim() !== '')
    .map(Number)
    .filter(val => !isNaN(val))
}

// Calculate mean
function calculateMean(values) {
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

// Calculate correlation coefficient
function calculateCorrelation(xValues, yValues) {
  const n = xValues.length
  const meanX = calculateMean(xValues)
  const meanY = calculateMean(yValues)

  let numerator = 0
  let denominatorX = 0
  let denominatorY = 0

  for (let i = 0; i < n; i++) {
    const xDiff = xValues[i] - meanX
    const yDiff = yValues[i] - meanY
    numerator += xDiff * yDiff
    denominatorX += xDiff * xDiff
    denominatorY += yDiff * yDiff
  }

  return numerator / Math.sqrt(denominatorX * denominatorY)
}

// Calculate regression coefficients
function calculateRegressionCoefficients(xValues, yValues) {
  const n = xValues.length
  const meanX = calculateMean(xValues)
  const meanY = calculateMean(yValues)

  let numerator = 0
  let denominator = 0

  for (let i = 0; i < n; i++) {
    const xDiff = xValues[i] - meanX
    numerator += xDiff * (yValues[i] - meanY)
    denominator += xDiff * xDiff
  }

  const b = numerator / denominator
  const a = meanY - b * meanX

  return { a, b }
}

// Create regression table
function createRegressionTable(xValues, yValues, a, b) {
  const tableContainer = document.getElementById('table-container')

  // Calcular somatórios
  const sumX = xValues.reduce((sum, x) => sum + x, 0)
  const sumY = yValues.reduce((sum, y) => sum + y, 0)
  let sumYEstimated = 0
  let sumResidual = 0

  let html = `
    <table class="regression-table">
      <thead>
        <tr>
          <th>X</th>
          <th>Y</th>
          <th>Y Estimado</th>
          <th>Resíduo</th>
        </tr>
      </thead>
      <tbody>
  `

  xValues.forEach((x, i) => {
    const y = yValues[i]
    const yEstimated = a + b * x
    const residual = y - yEstimated

    sumYEstimated += yEstimated
    sumResidual += residual

    html += `
      <tr>
        <td>${formatNumber(x)}</td>
        <td>${formatNumber(y)}</td>
        <td>${formatNumber(yEstimated)}</td>
        <td>${formatNumber(residual)}</td>
      </tr>
    `
  })

  // Adicionar linha de somatório
  html += `
    <tr class="highlighted-row">
      <td>∑ = ${formatNumber(sumX)}</td>
      <td>∑ = ${formatNumber(sumY)}</td>
      <td>∑ = ${formatNumber(sumYEstimated)}</td>
      <td>∑ = ${formatNumber(sumResidual)}</td>
    </tr>
  `

  html += '</tbody></table>'
  tableContainer.innerHTML = html
}

// Create scatter plot
function createScatterPlot(xValues, yValues, a, b) {
  const scatterDiv = document.getElementById('scatter-plot')
  scatterDiv.classList.remove('hidden')

  // Generate regression line points
  const xMin = Math.min(...xValues)
  const xMax = Math.max(...xValues)
  const xLine = [xMin, xMax]
  const yLine = xLine.map(x => a + b * x)

  const trace1 = {
    x: xValues,
    y: yValues,
    mode: 'markers',
    type: 'scatter',
    name: 'Pontos',
    marker: { color: '#4f46e5' }
  }

  const trace2 = {
    x: xLine,
    y: yLine,
    mode: 'lines',
    type: 'scatter',
    name: 'Regressão',
    line: { color: '#dc2626' }
  }

  const layout = {
    title: 'Diagrama de Dispersão com Linha de Regressão',
    xaxis: { title: 'X' },
    yaxis: { title: 'Y' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: document.body.classList.contains('dark-mode')
        ? '#fafafa'
        : '#18181b'
    }
  }

  Plotly.newPlot('scatter-plot', [trace1, trace2], layout)
}

// Get interpretation text based on correlation coefficient
function getInterpretation(r) {
  const abs_r = Math.abs(r)
  if (abs_r > 0.9) {
    return `Correlação ${r > 0 ? 'positiva' : 'negativa'} muito forte`
  } else if (abs_r > 0.7) {
    return `Correlação ${r > 0 ? 'positiva' : 'negativa'} forte`
  } else if (abs_r > 0.5) {
    return `Correlação ${r > 0 ? 'positiva' : 'negativa'} moderada`
  } else if (abs_r > 0.3) {
    return `Correlação ${r > 0 ? 'positiva' : 'negativa'} fraca`
  } else {
    return 'Correlação muito fraca ou inexistente'
  }
}

// Main calculation function
function calculateRegression(event) {
  event.preventDefault()

  // Get input values
  const xInput = document.getElementById('xValues').value
  const yInput = document.getElementById('yValues').value

  // Parse values
  const xValues = parseValues(xInput)
  const yValues = parseValues(yInput)

  // Validate input
  if (xValues.length !== yValues.length || xValues.length < 2) {
    alert(
      'Por favor, insira o mesmo número de valores para X e Y (mínimo 2 valores).'
    )
    return
  }

  // Calculate correlation coefficient
  const r = calculateCorrelation(xValues, yValues)
  const r2 = r * r

  // Calculate regression coefficients
  const { a, b } = calculateRegressionCoefficients(xValues, yValues)

  // Update results
  document.getElementById('correlation').textContent = formatNumber(r)
  document.getElementById('determination').textContent = formatNumber(r2)
  document.getElementById('interpretation').textContent = getInterpretation(r)
  document.getElementById(
    'regressionEquation'
  ).textContent = `Equação de Regressão Ajustada: Y = ${formatNumber(
    b
  )}X + ${formatNumber(a)}`

  // Create table and plot
  createRegressionTable(xValues, yValues, a, b)
  createScatterPlot(xValues, yValues, a, b)
}

// Update plot on dark mode toggle
document
  .getElementById('toggleDarkMode')
  .addEventListener('click', function () {
    const scatterDiv = document.getElementById('scatter-plot')
    if (!scatterDiv.classList.contains('hidden')) {
      const newColor = document.body.classList.contains('dark-mode')
        ? '#fafafa'
        : '#18181b'
      Plotly.relayout('scatter-plot', {
        'font.color': newColor,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      })
    }
  })
