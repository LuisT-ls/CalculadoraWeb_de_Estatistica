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

  // Gerar o diagrama de dispersão
  generateScatterPlot(xValues, yValues)

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
      color: 'rgba(17, 122, 196, 0.7)',
      size: 14,
      line: {
        color: 'rgba(255, 255, 255, 0.8)',
        width: 2
      },
      opacity: 0.9,
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
    title: {
      text: 'Diagrama de Dispersão',
      font: {
        family: 'Arial, sans-serif',
        size: 24,
        color: 'rgba(50, 50, 50, 0.9)'
      }
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
      l: 50,
      r: 50,
      b: 80,
      t: 50,
      pad: 4
    },
    transition: {
      duration: 500, // Adiciona uma animação de transição
      easing: 'ease-in-out'
    }
  }

  Plotly.newPlot('scatter-plot', [trace], layout)
}
