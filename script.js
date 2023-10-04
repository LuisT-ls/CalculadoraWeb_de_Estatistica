// Função genérica para formatar um valor com uma casa decimal, removendo .0 se houver
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
  // Limpar os resultados
  const resultElements = document.querySelectorAll("span[id^='result']")
  resultElements.forEach(element => (element.textContent = ''))

  // Limpar a tabela de frequência
  document.getElementById('frequencyTable').innerHTML = ''
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

function calculateStatistics() {
  const input = document.getElementById('numbers').value;
  const numbers = input.split(/\s*,\s*| /).map(Number);

  if (isValidInput(numbers)) {
    // Se a entrada for válida, continue com o cálculo
    const mean = formatValue(calculateMean(numbers));
    const median = formatValue(calculateMedian(numbers));
    const { mode, modeType } = calculateMode(numbers);
    const stdDev = formatValue(calculateStandardDeviation(numbers));
    const variance = formatValue(calculateVariance(numbers));
    const skewness = formatValue(calculateSkewness(numbers));
    const kurtosis = formatValue(calculateKurtosis(numbers));
    const coefficientOfVariation = formatValue(
      calculateCoefficientOfVariation(numbers)
    );

    document.getElementById('coefficientOfVariation').textContent =
      coefficientOfVariation;

    // Limpar a tabela de frequência antes de exibir os novos resultados
    document.getElementById('frequencyTable').innerHTML = '';

    // Ordena os números em ordem crescente
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const rol = formatRol(sortedNumbers);

    // Calcula a amplitude total e o tamanho da amostra
    const amplitudeTotal = formatValue(
      sortedNumbers[sortedNumbers.length - 1] - sortedNumbers[0]
    );
    const tamanhoAmostra = formatValue(numbers.length);

    document.getElementById('mean').textContent = mean;
    document.getElementById('median').textContent = median;
    document.getElementById('mode').textContent = mode;
    document.getElementById('modeType').textContent = modeType;
    document.getElementById('stdDev').textContent = stdDev;
    document.getElementById('variance').textContent = variance;
    document.getElementById('skewness').textContent = skewness;
    document.getElementById('kurtosis').textContent = kurtosis;

    // Exibe o rol, a amplitude total e o tamanho da amostra
    document.getElementById('rol').textContent = rol;
    document.getElementById('amplitudeTotal').textContent = amplitudeTotal;
    document.getElementById('tamanhoAmostra').textContent = tamanhoAmostra;

    // Calcula o número de classes usando a Fórmula de Sturges
    const numberOfClasses = Math.ceil(1 + 3.322 * Math.log10(numbers.length));

    // Calcula a tabela de frequência
    const frequencyTable = calculateFrequencyTable(numbers, numberOfClasses);
    displayFrequencyTable(frequencyTable);
  } else {
    // Se a entrada for inválida, exiba uma mensagem de erro
    alert('Por favor, insira números válidos separados por vírgula ou espaço.');
  }
}

function isValidInput(numbers) {
  // Verifica se a entrada é uma matriz de números válidos
  return Array.isArray(numbers) && numbers.length > 0 && !numbers.includes(NaN);
}

function calculateQuartiles() {
  const input = document.getElementById('numbers').value
  const numbers = input.split(/\s*,\s*| /).map(Number)

  // Ordenar os números em ordem crescente
  const sortedNumbers = numbers.sort((a, b) => a - b)

  const firstQuartile = calculatePercentile(sortedNumbers, 25)
  const median = calculateMedian(sortedNumbers)
  const thirdQuartile = calculatePercentile(sortedNumbers, 75)

  // Exibir os quartis na interface
  document.getElementById('firstQuartile').textContent =
    formatValue(firstQuartile)
  document.getElementById('thirdQuartile').textContent =
    formatValue(thirdQuartile)
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

  // Adicione a linha de somatório
  const sumRow = document.createElement('tr')

  // Classe: "-"
  const classCell = document.createElement('td')
  classCell.textContent = '∑'
  sumRow.appendChild(classCell)

  // Ponto Médio: "-"
  const midpointCell = document.createElement('td')
  midpointCell.textContent = '-'
  sumRow.appendChild(midpointCell)

  // Amplitude: "-"
  const amplitudeCell = document.createElement('td')
  amplitudeCell.textContent = '-'
  sumRow.appendChild(amplitudeCell)

  // Frequência Absoluta (fi): Soma das frequências absolutas
  const fiSum = tableData.reduce((sum, row) => sum + (parseInt(row[3]) || 0), 0)
  const fiCell = document.createElement('td')
  fiCell.textContent = fiSum
  sumRow.appendChild(fiCell)

  // Frequência Relativa (fri): Deve ser 1 (pois é a soma de todas as frequências relativas)
  const friCell = document.createElement('td')
  friCell.textContent = '1'
  sumRow.appendChild(friCell)

  // Frequência Relativa em Porcentagem (fri %): Deve ser 100% (pois é a soma de todas as frequências relativas em porcentagem)
  const friPercentageCell = document.createElement('td')
  friPercentageCell.textContent = '100%'
  sumRow.appendChild(friPercentageCell)

  // Frequência Acumulada (Fi): "-"
  const FiCell = document.createElement('td')
  FiCell.textContent = '-'
  sumRow.appendChild(FiCell)

  // Frequência Relativa Acumulada (Fri): "-"
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

  let modeType = ''
  if (modes.length === 1) {
    modeType = 'unimodal'
  } else if (modes.length === 2) {
    modeType = 'bimodal'
  } else if (modes.length === 3) {
    modeType = 'trimodal'
  } else if (modes.length >= 4) {
    modeType = 'polimodal'
  }

  return { mode: modes.join(', '), modeType }
}

function calculateStandardDeviation(numbers) {
  const mean = calculateMean(numbers)
  const squaredDifferences = numbers.map(x => Math.pow(x - mean, 2))
  const variance =
    squaredDifferences.reduce((acc, curr) => acc + curr, 0) /
    (numbers.length - 1) // Usar números.length - 1 para calcular a variância corretamente
  return Math.sqrt(variance) // Retornar a raiz quadrada da variância
}

function calculateVariance(numbers) {
  const mean = calculateMean(numbers)
  const squaredDifferences = numbers.map(x => Math.pow(x - mean, 2))
  return (
    squaredDifferences.reduce((acc, curr) => acc + curr, 0) /
    (numbers.length - 1)
  )
}

function calculateSkewness(numbers) {
  const mean = calculateMean(numbers)
  const stdDev = calculateStandardDeviation(numbers)
  const cubedDifferences = numbers.map(x => Math.pow(x - mean, 3))
  const sumCubedDifferences = cubedDifferences.reduce(
    (acc, curr) => acc + curr,
    0
  )
  return sumCubedDifferences / (numbers.length * Math.pow(stdDev, 3))
}

function calculateKurtosis(numbers) {
  const mean = calculateMean(numbers)
  const stdDev = calculateStandardDeviation(numbers)
  const fourthPowerDifferences = numbers.map(x => Math.pow(x - mean, 4))
  const sumFourthPowerDifferences = fourthPowerDifferences.reduce(
    (acc, curr) => acc + curr,
    0
  )
  const n = numbers.length
  return sumFourthPowerDifferences / (n * Math.pow(stdDev, 4)) - 3
}
