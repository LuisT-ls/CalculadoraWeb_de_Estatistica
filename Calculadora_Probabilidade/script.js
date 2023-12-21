function toggleDarkMode() {
  const body = document.body
  const button = document.querySelector('#toggleDarkMode')
  const isDarkMode = body.classList.contains('dark-mode')

  if (isDarkMode) {
    body.classList.remove('dark-mode')
    button.textContent = '🌙'
    button.classList.add('light-mode')
    updateStyles(false) // Desativa o modo escuro
  } else {
    body.classList.add('dark-mode')
    button.textContent = '☀️'
    button.classList.remove('light-mode')
    updateStyles(true) // Ativa o modo escuro
  }
}

// Função para atualizar os estilos com base no modo escuro
function updateStyles(isDarkMode) {
  const root = document.documentElement

  if (isDarkMode) {
    root.style.setProperty('--background-color', '#333')
    root.style.setProperty('--text-color', '#fff')
  } else {
    // Restaure os estilos padrão
    root.style.removeProperty('--background-color')
    root.style.removeProperty('--text-color')
  }
}

const resultDiv = document.getElementById('result')

// Função para limpar os resultados e os campos de entrada
function clearInput() {
  // Limpar os campos de entrada
  const inputFields = document.querySelectorAll(
    '#totalResults, #eventsOccurred, #eventsOccurredA, #eventsOccurredB, #eventA, #eventB, #events, #probA, #repetitionsA, #probB, #repetitionsB'
  )
  inputFields.forEach(input => (input.value = ''))

  // Limpar os resultados
  resultDiv.innerHTML = ''

  // Limpar a explicação
  calcExplanationDiv.textContent = ''
}

// Adicione o event listener para o botão de limpar
const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', clearInput)

document.addEventListener('DOMContentLoaded', function () {
  toggleDarkMode()

  const operationSelect = document.getElementById('operation')
  const inputFieldsContainer = document.getElementById('input-fields')
  const calculateButton = document.getElementById('calculate')
  const clearButton = document.getElementById('clear')
  const resultDiv = document.getElementById('result')
  const showExplanationButton = document.getElementById('showExplanation')
  const calcExplanationDiv = document.getElementById('calcExplanation')

  let showingExplanation = false

  // Adicione um event listener para o botão "Responda-me"
  showExplanationButton.addEventListener('click', toggleExplanation)

  // Função para alternar a visibilidade da explicação
  function toggleExplanation() {
    if (calcExplanationDiv.style.display === 'block') {
      calcExplanationDiv.style.display = 'none'
      showingExplanation = false
    } else {
      calcExplanationDiv.style.display = 'block'
      showingExplanation = true
    }
  }

  operationSelect.addEventListener('change', handleOperationChange)
  calculateButton.addEventListener('click', calculateProbability)

  // Função para lidar com a mudança na operação selecionada
  function handleOperationChange() {
    const selectedOperation = operationSelect.value

    // Limpar campos de entrada
    inputFieldsContainer.innerHTML = ''
    if (!showingExplanation) {
      calcExplanationDiv.style.display = 'none'
    }

    // Atualizar a explicação com base na operação selecionada
    updateExplanation(selectedOperation)

    // Adicionar campos de entrada com base na operação selecionada
    if (selectedOperation === 'prob_uni') {
      // Lógica para a operação de probabilidade única
      inputFieldsContainer.innerHTML = `
          <label for="totalResults">Número de Resultados Possíveis:</label>
          <input type="number" id="totalResults" placeholder="Digite o número de resultados possíveis" min="1" required />
          <label for="eventsOccurred">Número de Eventos Ocorridos (n A):</label>
          <input type="number" id="eventsOccurred" placeholder="Digite o número de eventos ocorridos" min="0" required />
        `
    } else if (selectedOperation === 'prob_mulEv') {
      // Lógica para a operação de probabilidade de múltiplos eventos
      inputFieldsContainer.innerHTML = `
          <label for="totalResults">Número de Resultados Possíveis (n):</label>
          <input type="number" id="totalResults" placeholder="Digite o número de resultados possíveis" min="1" required />
          <label for="eventsOccurredA">Número de Eventos Ocorridos (n A):</label>
          <input type="number" id="eventsOccurredA" placeholder="Digite o número de eventos ocorridos para A" min="0" required />
          <label for="eventsOccurredB">Número de Eventos Ocorridos (n B):</label>
          <input type="number" id="eventsOccurredB" placeholder="Digite o número de eventos ocorridos para B" min="0" required />
        `
    } else if (selectedOperation === 'prob_doisEv') {
      // Lógica para a operação de probabilidade de dois eventos
      inputFieldsContainer.innerHTML = `
          <label for="eventA">Probabilidade do Evento A (entre 0 e 1):</label>
          <input type="number" id="eventA" placeholder="Digite a probabilidade do evento A" min="0" max="1" step="0.01" required />
          <label for="eventB">Probabilidade do Evento B (entre 0 e 1):</label>
          <input type="number" id="eventB" placeholder="Digite a probabilidade do evento B" min="0" max="1" step="0.01" required />
        `
    } else if (selectedOperation === 'Prob_nEv') {
      inputFieldsContainer.innerHTML = `
        <div class="input-column">
          <label for="probA">Probabilidade de A (entre 0 e 1):</label>
          <input type="number" id="probA" placeholder="Digite a probabilidade de A" min="0" max="1" step="0.01" required />
        </div>
        <div class="input-column">
          <label for="repetitionsA">Número de repetições de A:</label>
          <input type="number" id="repetitionsA" placeholder="Digite o número de repetições de A" min="1" required />
        </div>
        
        <br> <!-- Adicionando uma quebra de linha aqui -->
        
        <div class="input-column">
          <label for="probB">Probabilidade de B (entre 0 e 1):</label>
          <input type="number" id="probB" placeholder="Digite a probabilidade de B" min="0" max="1" step="0.01" required />
        </div>
        <div class="input-column">
          <label for="repetitionsB">Número de repetições de B:</label>
          <input type="number" id="repetitionsB" placeholder="Digite o número de repetições de B" min="1" required />
        </div>
      `
    } else if (selectedOperation === 'ProbCond') {
      // Lógica para a operação de probabilidade condicional P(A|B)
      inputFieldsContainer.innerHTML = `
          <label for="probA">Probabilidade de A (entre 0 e 1):</label>
          <input type="number" id="probA" placeholder="Digite a probabilidade de A" min="0" max="1" step="0.01" required />
          <label for="probB">Probabilidade de B (entre 0 e 1):</label>
          <input type="number" id="probB" placeholder="Digite a probabilidade de B" min="0" max="1" step="0.01" required />
        `
    }
  }

  // Função para atualizar a explicação com base na operação selecionada
  function updateExplanation(selectedOperation) {
    let explanation = ''

    if (selectedOperation === 'prob_uni') {
      explanation = `
          A probabilidade única representa a chance de ocorrência de um evento único.
          Digite um valor entre 0 e 1 para indicar a probabilidade desse evento acontecer.
        `
    } else if (selectedOperation === 'prob_mulEv') {
      explanation = `
          A probabilidade de múltiplos eventos é calculada multiplicando as probabilidades
          individuais de cada evento. Digite valores entre 0 e 1 para os eventos 1 e 2.
        `
    } else if (selectedOperation === 'prob_doisEv') {
      explanation = `
          A probabilidade de dois eventos é calculada somando as probabilidades de cada evento
          e subtraindo a probabilidade de ambos os eventos ocorrerem ao mesmo tempo.
          Digite valores entre 0 e 1 para os eventos A e B.
        `
    } else if (selectedOperation === 'Prob_nEv') {
      explanation = `
        <p>A probabilidade de uma série de eventos é calculada considerando a probabilidade de cada evento individualmente.</p>
        
        <p>Forneça a probabilidade de A (entre 0 e 1) e o número de vezes que o evento A ocorrerá.</p>
  
        <p>Além disso, forneça a probabilidade de B (também entre 0 e 1) e o número de vezes que o evento B ocorrerá.</p>
  
        <p>O cálculo mostrará diversas probabilidades, incluindo a probabilidade de A ocorrendo x vezes e B ocorrendo y vezes, assim como outras combinações.</p>
      `
    } else if (selectedOperation === 'ProbCond') {
      explanation = `
          A probabilidade condicional P(A|B) é calculada dividindo a probabilidade conjunta de A e B
          pela probabilidade de B. Digite valores entre 0 e 1 para as probabilidades de A e B.
        `
    }

    calcExplanationDiv.textContent = explanation
    calcExplanationDiv.innerHTML = explanation
  }

  function calculateProbability() {
    const selectedOperation = operationSelect.value

    // Lógica de cálculo com base na operação selecionada
    let results = {}

    // Limpar a tabela de resultados antes de exibir novos resultados
    resultDiv.innerHTML = ''

    if (selectedOperation === 'prob_uni') {
      // Lógica para a operação de probabilidade única
      const totalResults = parseFloat(
        document.getElementById('totalResults').value
      )
      const eventsOccurred = parseFloat(
        document.getElementById('eventsOccurred').value
      )

      const probA = eventsOccurred / totalResults
      const probNotA = 1 - probA

      results = {
        'Probabilidade de evento que ocorre P (A)': probA,
        "Probabilidade de evento que não ocorre P (A ')": probNotA
      }
    } else if (selectedOperation === 'prob_mulEv') {
      // Lógica para a operação de probabilidade de múltiplos eventos
      const totalResults = parseFloat(
        document.getElementById('totalResults').value
      )
      const eventsOccurredA = parseFloat(
        document.getElementById('eventsOccurredA').value
      )
      const eventsOccurredB = parseFloat(
        document.getElementById('eventsOccurredB').value
      )

      const probA = eventsOccurredA / totalResults
      const probNotA = 1 - probA

      const probB = eventsOccurredB / totalResults
      const probNotB = 1 - probB

      const probIntersectionAB =
        (eventsOccurredA / totalResults) * (eventsOccurredB / totalResults)
      const probUnionAB = probA + probB - probIntersectionAB

      results = {
        'Probabilidade de evento que ocorre P (A)': probA,
        "Probabilidade de evento que não ocorre P (A ')": probNotA,
        'Probabilidade do evento B ocorrer P (B)': probB,
        "Probabilidade de evento B não ocorrer P (B ')": probNotB,
        'Probabilidade de ambos os eventos ocorrerem P (A ∩ B)':
          probIntersectionAB,
        'Probabilidade de qualquer um dos eventos ocorrer P (A ∪ B)':
          probUnionAB
      }
    } else if (selectedOperation === 'prob_doisEv') {
      // Lógica para a operação de probabilidade de dois eventos
      const eventA = parseFloat(document.getElementById('eventA').value)
      const eventB = parseFloat(document.getElementById('eventB').value)

      const probA = eventA
      const probNotA = 1 - probA

      const probB = eventB
      const probNotB = 1 - probB

      const probIntersectionAB = eventA * eventB
      const probUnionAB = probA + probB - probIntersectionAB

      results = {
        'Probabilidade de evento que ocorre P (A)': probA,
        "Probabilidade de evento que não ocorre P (A ')": probNotA,
        'Probabilidade do evento B ocorrer P (B)': probB,
        "Probabilidade de evento B não ocorrer P (B ')": probNotB,
        'Probabilidade de ambos os eventos ocorrerem P (A ∩ B)':
          probIntersectionAB,
        'Probabilidade de qualquer um dos eventos ocorrer P (A ∪ B)':
          probUnionAB
      }
    } else if (selectedOperation === 'Prob_nEv') {
      const probA = parseFloat(document.getElementById('probA').value)
      const repetitionsA = parseFloat(
        document.getElementById('repetitionsA').value
      )
      const probB = parseFloat(document.getElementById('probB').value)
      const repetitionsB = parseFloat(
        document.getElementById('repetitionsB').value
      )

      const probNotA = 1 - probA
      const probNotB = 1 - probB

      const probAnyEventA = 1 - Math.pow(probNotA, repetitionsA)
      const probAnyEventB = 1 - Math.pow(probNotB, repetitionsB)

      const probAandNotB = probA * (1 - probB)
      const probBandNotA = probB * (1 - probA)

      // Adicionar probabilidades de ocorrência exata ao resultado
      const exactProbA = Math.pow(probA, repetitionsA)
      const exactProbB = Math.pow(probB, repetitionsB)

      // Adicionar novas entradas para representar diferentes combinações de ocorrências de A e B
      results = {
        'Probabilidade de A ocorrendo': probAnyEventA,
        'Probabilidade de B ocorrendo': probAnyEventB,
        'Probabilidade de A não ocorrendo': probNotA,
        'Probabilidade de B não ocorrendo': probNotB,
        'Probabilidade de A ocorrendo mas não B': probAandNotB,
        'Probabilidade de B ocorrendo mas não A': probBandNotA,
        ['Probabilidade de A ocorrendo ' +
        repetitionsA +
        ' vezes e B ocorrendo ' +
        repetitionsB +
        ' vezes']: exactProbA * exactProbB,
        ['Probabilidade de A ocorrendo ' + repetitionsA + ' vezes mas não B']:
          exactProbA * (1 - exactProbB),
        ['Probabilidade de B ocorrendo ' + repetitionsB + ' vezes mas não A']:
          exactProbB * (1 - exactProbA)
      }
    } else if (selectedOperation === 'ProbCond') {
      // Lógica para a operação de probabilidade condicional P(A|B)
      const probA = parseFloat(document.getElementById('probA').value)
      const probB = parseFloat(document.getElementById('probB').value)

      const probCondAB = (probA * probB) / probB

      results = {
        'Probabilidade condicional P(A|B)': probCondAB
      }
    }

    // Exibir os resultados
    displayResults(results)
  }

  function displayResults(results) {
    // Exibir os resultados formatados em uma tabela estilizada
    let resultText =
      '<table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #ddd;">'
    resultText +=
      '<thead style="background-color: #f2f2f2;"><tr><th style="padding: 8px; text-align: left;">Evento</th><th style="padding: 8px; text-align: center;">Probabilidade (em decimal)</th><th style="padding: 8px; text-align: center;">Probabilidade (em porcentagem)</th></tr></thead>'

    let isOddRow = false // Alternar cores de linhas
    for (const key in results) {
      if (results.hasOwnProperty(key)) {
        const value = results[key]
        const formattedValue = formatDecimal(value)
        const formattedPercentage = formatPercentage(value)
        // Adicionar linhas de tabela para cada resultado com cores alternadas
        const backgroundColor = isOddRow ? '#f9f9f9' : '#ffffff'
        resultText += `<tr style="background-color: ${backgroundColor}; border: 1px solid #ddd;"><td style="padding: 8px; text-align: left;">${key}</td><td style="padding: 8px; text-align: center;">${formattedValue}</td><td style="padding: 8px; text-align: center;">${formattedPercentage}</td></tr>`
        isOddRow = !isOddRow
      }
    }

    resultText += '</table>'

    // Exibir os resultados
    resultDiv.innerHTML = resultText // Use innerHTML para renderizar conteúdo HTML
  }

  function formatDecimal(value) {
    // Arredondar para 1 casa decimal se necessário
    const formattedValue =
      value % 1 === 0 && value < 10 ? value.toFixed(0) : value.toFixed(1)
    return formattedValue.replace(/\.0$/, '') // Remover ".0" se existir
  }

  function formatPercentage(value) {
    // Multiplicar por 100 e arredondar para 1 casa decimal se necessário
    const formattedPercentage = (value * 100).toFixed(1)
    return formattedPercentage.replace(/\.0%$/, '') + '%' // Remover ".0%" se existir
  }

  // Função para exibir uma explicação sobre a operação selecionada
  function showExplanation() {
    const selectedOperation = operationSelect.value

    // Lógica para exibir uma explicação com base na operação selecionada
    let explanation = ''

    if (selectedOperation === 'prob_uni') {
      explanation = `
        A probabilidade única representa a chance de ocorrência de um evento único.
        Digite um valor entre 0 e 1 para indicar a probabilidade desse evento acontecer.
      `
    } else if (selectedOperation === 'prob_mulEv') {
      explanation = `
        A probabilidade de múltiplos eventos é calculada multiplicando as probabilidades
        individuais de cada evento. Digite valores entre 0 e 1 para os eventos 1 e 2.
      `
    } else if (selectedOperation === 'prob_doisEv') {
      explanation = `
        A probabilidade de dois eventos é calculada somando as probabilidades de cada evento
        e subtraindo a probabilidade de ambos os eventos ocorrerem ao mesmo tempo.
        Digite valores entre 0 e 1 para os eventos A e B.
      `
    } else if (selectedOperation === 'Prob_nEv') {
      explanation = `
        A probabilidade de uma série de eventos é o inverso do número total de eventos.
        Digite o número total de eventos para calcular a probabilidade.
      `
    } else if (selectedOperation === 'ProbCond') {
      explanation = `
        A probabilidade condicional P(A|B) é calculada dividindo a probabilidade conjunta de A e B
        pela probabilidade de B. Digite valores entre 0 e 1 para as probabilidades de A e B.
      `
    }

    // Chamar handleOperationChange com "prob_uni" como padrão
    handleOperationChange()

    // Exemplo de exibição da explicação
    calcExplanationDiv.textContent = explanation
  }
})
