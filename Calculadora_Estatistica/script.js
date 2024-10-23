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

function formatValue(value) {
  if (Number.isInteger(value)) {
    return value.toString()
  } else {
    return value.toFixed(1).endsWith('.0')
      ? value.toFixed(1).replace('.0', '')
      : value.toFixed(1)
  }
}

function clearInput() {
  document.getElementById('numbers').value = ''
  const resultElements = document.querySelectorAll("span[id^='result']")
  resultElements.forEach(element => (element.textContent = ''))
  document.getElementById('frequencyTable').innerHTML = ''

  const additionalResultElements = [
    'rol',
    'amplitudeTotal',
    'tamanhoAmostra',
    'mean',
    'mode',
    'median',
    'modeType',
    'stdDev',
    'variance',
    'skewness',
    'kurtosis',
    'coefficientOfVariation',
    'firstQuartile',
    'thirdQuartile',
    'interquartileRange',
    'meanOfQuartiles'
  ]

  additionalResultElements.forEach(elementId => {
    document.getElementById(elementId).textContent = ''
  })

  clearChart()
}

function clearChart() {
  var chartElement = document.getElementById('frequencyChart')

  if (chartElement) {
    chartElement.remove()
    var newCanvas = document.createElement('canvas')
    newCanvas.id = 'frequencyChart'
    newCanvas.width = 400
    newCanvas.height = 200
    var container = document.querySelector('.container')
    container.appendChild(newCanvas)
  }
}

function exportResults() {
  const numbersInput = document.getElementById('numbers').value
  const numbers = numbersInput.split(/\s*,\s*| /).map(Number)

  const csvRows = []
  csvRows.push(['Estatística', 'Valor'])
  csvRows.push(['Rol', formatRol(numbers)])
  csvRows.push([
    'Amplitude Total',
    document.getElementById('amplitudeTotal').textContent
  ])
  csvRows.push([
    'Tamanho da Amostra',
    document.getElementById('tamanhoAmostra').textContent
  ])
  csvRows.push(['Média', document.getElementById('mean').textContent])
  csvRows.push(['Mediana', document.getElementById('median').textContent])
  csvRows.push(['Moda', document.getElementById('mode').textContent])
  csvRows.push([
    'Tipo de Moda',
    document.getElementById('modeType').textContent
  ])
  csvRows.push(['Desvio Padrão', document.getElementById('stdDev').textContent])
  csvRows.push(['Variância', document.getElementById('variance').textContent])
  csvRows.push(['Assimetria', document.getElementById('skewness').textContent])
  csvRows.push(['Curtose', document.getElementById('kurtosis').textContent])

  const csvContent = csvRows.map(row => row.join(',')).join('\n')
  const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent)

  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'estatisticas.csv')
  document.body.appendChild(link)
  link.click()
}

function exportResultsAsPDF() {
  const { jsPDF } = window.jspdf
  const doc = new jsPDF()

  const numbersInput = document.getElementById('numbers').value
  const numbers = numbersInput.split(/\s*,\s*| /).map(Number)

  let yPosition = 20
  doc.setFontSize(16)
  doc.text('Resultados da Calculadora de Estatísticas', 10, yPosition)
  yPosition += 10

  doc.setFontSize(12)
  doc.text(`Rol: ${formatRol(numbers)}`, 10, yPosition)
  yPosition += 10

  const resultFields = [
    { label: 'Amplitude Total', id: 'amplitudeTotal' },
    { label: 'Tamanho da Amostra', id: 'tamanhoAmostra' },
    { label: 'Média', id: 'mean' },
    { label: 'Mediana', id: 'median' },
    { label: 'Moda', id: 'mode' },
    { label: 'Tipo de Moda', id: 'modeType' },
    { label: 'Desvio Padrão', id: 'stdDev' },
    { label: 'Variância', id: 'variance' },
    { label: 'Assimetria', id: 'skewness' },
    { label: 'Curtose', id: 'kurtosis' },
    { label: 'Coeficiente de Variação', id: 'coefficientOfVariation' }
  ]

  resultFields.forEach(field => {
    const value = document.getElementById(field.id).textContent
    doc.text(`${field.label}: ${value}`, 10, yPosition)
    yPosition += 10
  })

  doc.save('estatisticas.pdf')
}

function calculateStatistics() {
  const input = document.getElementById('numbers').value
  const numbers = input.split(/\s*,\s*| /).map(Number)

  document.getElementById('errorMessage').textContent = ''

  if (isValidInput(numbers)) {
    const mean = formatValue(calculateMean(numbers))
    const median = formatValue(calculateMedian(numbers))
    const { mode, modeType } = calculateMode(numbers)
    const stdDev = formatValue(calculateStandardDeviation(numbers))
    const variance = formatValue(calculateVariance(numbers))
    const skewness = formatValue(calculateSkewness(numbers))
    const kurtosis = formatValue(calculateKurtosis(numbers))
    const coefficientOfVariation = formatValue(
      calculateCoefficientOfVariation(numbers)
    )

    document.getElementById('coefficientOfVariation').textContent =
      coefficientOfVariation

    document.getElementById('frequencyTable').innerHTML = ''

    const sortedNumbers = numbers.sort((a, b) => a - b)
    const rol = formatRol(sortedNumbers)

    const amplitudeTotal = formatValue(
      sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0]
    )
    const tamanhoAmostra = formatValue(numbers.length)

    document.getElementById('mean').textContent = mean
    document.getElementById('median').textContent = median
    document.getElementById('mode').textContent = mode
    document.getElementById('modeType').textContent = modeType
    document.getElementById('stdDev').textContent = stdDev
    document.getElementById('variance').textContent = variance
    document.getElementById('skewness').textContent = skewness
    document.getElementById('kurtosis').textContent = kurtosis

    document.getElementById('rol').textContent = rol
    document.getElementById('amplitudeTotal').textContent = amplitudeTotal
    document.getElementById('tamanhoAmostra').textContent = tamanhoAmostra

    const numberOfClasses = Math.ceil(1 + 3.322 * Math.log10(numbers.length))

    const frequencyTable = calculateFrequencyTable(numbers, numberOfClasses)
    displayFrequencyTable(frequencyTable)
  } else {
    displayErrorMessage(
      'Por favor, insira números válidos separados por vírgula ou espaço.'
    )
  }
}

function displayErrorMessage(message) {
  const errorMessageElement = document.getElementById('errorMessage')
  errorMessageElement.textContent = message
  errorMessageElement.style.color = 'red'
  errorMessageElement.style.fontWeight = 'bold'
}

function isValidInput(numbers) {
  return Array.isArray(numbers) && numbers.length > 0 && !numbers.includes(NaN)
}

function calculateQuartiles() {
  const input = document.getElementById('numbers').value
  const numbers = input.split(/\s*,\s*| /).map(Number)
  const sortedNumbers = numbers.sort((a, b) => a - b)

  const firstQuartile = calculatePercentile(sortedNumbers, 25)
  const median = calculateMedian(sortedNumbers)
  const thirdQuartile = calculatePercentile(sortedNumbers, 75)
  const meanOfQuartiles = formatValue(
    (firstQuartile + median + thirdQuartile) / 3
  )
  const interquartileRange = formatValue(thirdQuartile - firstQuartile)

  document.getElementById('firstQuartile').textContent =
    formatValue(firstQuartile)
  document.getElementById('thirdQuartile').textContent =
    formatValue(thirdQuartile)
  document.getElementById('interquartileRange').textContent = interquartileRange
  document.getElementById('meanOfQuartiles').textContent = meanOfQuartiles
}

function calculatePercentile(sortedNumbers, percentile) {
  const n = sortedNumbers.length
  const rank = (percentile / 100) * (n - 1)
  const lowerIndex = Math.floor(rank)
  const upperIndex = Math.ceil(rank)

  if (lowerIndex === upperIndex) {
    return sortedNumbers[lowerIndex]
  } else {
    const lowerValue = sortedNumbers[lowerIndex]
    const upperValue = sortedNumbers[upperIndex]
    const interpolationFactor = rank - lowerIndex
    return lowerValue + (upperValue - lowerValue) * interpolationFactor
  }
}

function calculateCoefficientOfVariation(numbers) {
  const mean = calculateMean(numbers)
  const stdDev = calculateStandardDeviation(numbers)
  return (stdDev / mean) * 100
}

function formatRol(sortedNumbers) {
  const formattedRol = []
  let currentGroup = [sortedNumbers[0]]

  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === sortedNumbers[i - 1]) {
      currentGroup.push(sortedNumbers[i])
    } else {
      formattedRol.push(currentGroup.join(', '))
      currentGroup = [sortedNumbers[i]]
    }
  }
  formattedRol.push(currentGroup.join(', '))
  return formattedRol.join('; ')
}

function calculateFrequencyTable(numbers, numberOfClasses) {
  const frequencyMap = {}
  let cumulativeFrequency = 0

  const min = Math.min(...numbers)
  const max = Math.max(...numbers)
  const classWidth = (max - min) / numberOfClasses

  for (let i = 0; i < numberOfClasses; i++) {
    const lowerBound = min + i * classWidth
    const upperBound = lowerBound + classWidth
    const className = `${formatValue(lowerBound)} - ${formatValue(upperBound)}`

    for (const num of numbers) {
      if (num >= lowerBound && num <= upperBound) {
        if (frequencyMap[className]) {
          frequencyMap[className]++
        } else {
          frequencyMap[className] = 1
        }
      }
    }
  }

  const sortedClasses = Object.keys(frequencyMap).sort((a, b) => {
    const aLower = parseFloat(a.split(' - ')[0])
    const bLower = parseFloat(b.split(' - ')[0])
    return aLower - bLower
  })

  const frequencyTable = sortedClasses.map(className => {
    const frequency = frequencyMap[className]
    cumulativeFrequency += frequency
    const relativeFrequency = frequency / numbers.length
    const relativeFrequencyPercentage =
      formatValue(relativeFrequency * 100) + '%'
    const [lowerBound, upperBound] = className.split(' - ').map(Number)
    const midpoint = formatValue((lowerBound + upperBound) / 2)
    const amplitude = formatValue(upperBound - lowerBound)

    return [
      className,
      midpoint,
      amplitude,
      frequency,
      formatValue(relativeFrequency),
      relativeFrequencyPercentage,
      cumulativeFrequency,
      formatValue((cumulativeFrequency / numbers.length) * 100) + '%'
    ]
  })

  return frequencyTable
}

function displayFrequencyTable(tableData) {
  const tableBody = document.getElementById('frequencyTable')
  tableBody.innerHTML = ''

  for (const row of tableData) {
    const tr = document.createElement('tr')

    for (const cellData of row) {
      const td = document.createElement('td')
      td.textContent = cellData
      tr.appendChild(td)
    }

    tableBody.appendChild(tr)
  }

  const sumRow = document.createElement('tr')

  const classCell = document.createElement('td')
  classCell.textContent = '∑'
  sumRow.appendChild(classCell)

  const midpointCell = document.createElement('td')
  midpointCell.textContent = '-'
  sumRow.appendChild(midpointCell)

  const amplitudeCell = document.createElement('td')
  amplitudeCell.textContent = '-'
  sumRow.appendChild(amplitudeCell)

  const fiSum = tableData.reduce((sum, row) => sum + (parseInt(row[3]) || 0), 0)
  const fiCell = document.createElement('td')
  fiCell.textContent = fiSum
  sumRow.appendChild(fiCell)

  const friCell = document.createElement('td')
  friCell.textContent = '1'
  sumRow.appendChild(friCell)

  const friPercentageCell = document.createElement('td')
  friPercentageCell.textContent = '100%'
  sumRow.appendChild(friPercentageCell)

  const FiCell = document.createElement('td')
  FiCell.textContent = '-'
  sumRow.appendChild(FiCell)

  const FriCell = document.createElement('td')
  FriCell.textContent = '-'
  sumRow.appendChild(FriCell)

  tableBody.appendChild(sumRow)
}

function calculateMean(numbers) {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0)
  return sum / numbers.length
}

function calculateMedian(numbers) {
  const sortedNumbers = numbers.sort((a, b) => a - b)
  const middle = Math.floor(numbers.length / 2)

  if (numbers.length % 2 === 0) {
    return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2
  } else {
    return sortedNumbers[middle]
  }
}

function calculateMode(numbers) {
  const numCounts = {}
  let maxCount = 0
  let modes = []

  for (const num of numbers) {
    numCounts[num] = (numCounts[num] || 0) + 1

    if (numCounts[num] > maxCount) {
      maxCount = numCounts[num]
      modes = [num]
    } else if (numCounts[num] === maxCount && !modes.includes(num)) {
      modes.push(num)
    }
  }

  let modeType = getModeType(modes)

  return { mode: modes.join(', '), modeType }
}

function getModeType(modes) {
  switch (modes.length) {
    case 1:
      return 'unimodal'
    case 2:
      return 'bimodal'
    case 3:
      return 'trimodal'
    default:
      return 'polimodal'
  }
}

function calculateStandardDeviation(numbers) {
  const mean = calculateMean(numbers)
  const squaredDifferences = numbers.map(x => Math.pow(x - mean, 2))
  const variance = squaredDifferences.reduce((acc, curr) => acc + curr, 0) / (numbers.length - 1)
  return Math.sqrt(variance)
}

function calculateVariance(numbers) {
  const mean = calculateMean(numbers)
  const squaredDifferences = numbers.map(x => Math.pow(x - mean, 2))
  return squaredDifferences.reduce((acc, curr) => acc + curr, 0) / (numbers.length - 1)
}

function calculateSkewness(numbers) {
  const mean = calculateMean(numbers)
  const stdDev = calculateStandardDeviation(numbers)
  const cubedDifferences = numbers.map(x => Math.pow(x - mean, 3))
  const sumCubedDifferences = cubedDifferences.reduce((acc, curr) => acc + curr, 0)
  return sumCubedDifferences / (numbers.length * Math.pow(stdDev, 3))
}

function calculateKurtosis(numbers) {
  const mean = calculateMean(numbers)
  const stdDev = calculateStandardDeviation(numbers)
  const fourthPowerDifferences = numbers.map(x => Math.pow(x - mean, 4))
  const sumFourthPowerDifferences = fourthPowerDifferences.reduce((acc, curr) => acc + curr, 0)
  const n = numbers.length
  return sumFourthPowerDifferences / (n * Math.pow(stdDev, 4)) - 3
}

function generateFrequencyChart() {
  const table = document.getElementById('frequencyTable')
  const labels = []
  const data = []
  const backgroundColors = []

  for (let i = 0; i < table.rows.length - 1; i++) {
    const row = table.rows[i]
    labels.push(row.cells[0].textContent)
    data.push(parseInt(row.cells[3].textContent))

    const baseColor = [173, 216, 230]
    const scaleFactor = i / (table.rows.length - 2)
    const scaledColor = baseColor.map(channel => Math.floor(channel * scaleFactor))
    backgroundColors.push(`rgba(${scaledColor.join(', ')}, 0.7)`)
  }

  const ctx = document.getElementById('frequencyChart').getContext('2d')
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frequência',
        data: data,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Distribuição de Frequência',
          font: {
            size: 16
          }
        },
        legend: {
          display: true,
          position: 'top',
          align: 'center',
          labels: {
            usePointStyle: true,
            boxWidth: 10
          }
        }
      }
    }
  })

  const legendContainer = document.querySelector('.chart-legend')
  if (legendContainer) {
    legendContainer.innerHTML = ''
    const legend = document.createElement('div')
    legend.classList.add('custom-legend')

    const icon = document.createElement('i')
    icon.classList.add('fas', 'fa-chart-bar')
    icon.style.fontSize = '24px'
    icon.style.color = 'rgba(75, 192, 192, 1)'

    const label = document.createElement('span')
    label.textContent = 'Frequência'
    label.style.fontFamily = 'Arial, sans-serif'
    label.style.fontSize = '14px'
    label.style.color = 'rgba(75, 192, 192, 1)'

    const description = document.createElement('span')
    description.textContent = 'Clique para ver a frequência'
    description.style.display = 'none'
    description.style.fontFamily = 'Arial, sans-serif'
    description.style.fontSize = '12px'
    description.style.color = 'rgba(75, 192, 192, 1)'

    icon.addEventListener('mouseover', () => {
      description.style.display = 'block'
    })
    icon.addEventListener('mouseout', () => {
      description.style.display = 'none'
    })

    legend.appendChild(icon)
    legend.appendChild(label)
    legend.appendChild(description)
    legendContainer.appendChild(legend)
  }
}