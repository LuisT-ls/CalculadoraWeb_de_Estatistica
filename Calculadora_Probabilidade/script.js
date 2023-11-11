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
    // Adicione estilos para o modo escuro
    root.style.setProperty('--background-color', '#333')
    root.style.setProperty('--text-color', '#fff')
    // Adicione mais estilos conforme necessário
  } else {
    // Restaure os estilos padrão
    root.style.removeProperty('--background-color')
    root.style.removeProperty('--text-color')
    // Restaure mais estilos conforme necessário
  }
}

document.addEventListener('DOMContentLoaded', function () {
  toggleDarkMode()

  const operationSelect = document.getElementById('operation')
  const inputFieldsContainer = document.getElementById('input-fields')
  const calculateButton = document.getElementById('calculate')
  const resultDiv = document.getElementById('result')
  const showExplanationButton = document.getElementById('showExplanation')
  const calcExplanationDiv = document.getElementById('calcExplanation')

  // Adicione os event listeners necessários
  operationSelect.addEventListener('change', handleOperationChange)
  calculateButton.addEventListener('click', calculateProbability)
  showExplanationButton.addEventListener('click', showExplanation)

  // Função para lidar com a mudança na operação selecionada
  function handleOperationChange() {
    const selectedOperation = operationSelect.value

    // Limpar campos de entrada
    inputFieldsContainer.innerHTML = ''

    // Adicionar campos de entrada com base na operação selecionada
    if (selectedOperation === 'prob_uni') {
      // Lógica para a operação de probabilidade única
      // Adicione campos de entrada relevantes
      inputFieldsContainer.innerHTML = `
          <label for="totalResults">Número de Resultados Possíveis:</label>
          <input type="number" id="totalResults" placeholder="Digite o número de resultados possíveis" min="1" required />
          <label for="eventsOccurred">Número de Eventos Ocorridos (n A):</label>
          <input type="number" id="eventsOccurred" placeholder="Digite o número de eventos ocorridos" min="0" required />
        `
    } else if (selectedOperation === 'prob_mulEv') {
      // Lógica para a operação de probabilidade de múltiplos eventos
      // Adicione campos de entrada relevantes
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
      // Adicione campos de entrada relevantes
      inputFieldsContainer.innerHTML = `
          <label for="eventA">Probabilidade do Evento A (entre 0 e 1):</label>
          <input type="number" id="eventA" placeholder="Digite a probabilidade do evento A" min="0" max="1" step="0.01" required />
          <label for="eventB">Probabilidade do Evento B (entre 0 e 1):</label>
          <input type="number" id="eventB" placeholder="Digite a probabilidade do evento B" min="0" max="1" step="0.01" required />
        `
    } else if (selectedOperation === 'Prob_nEv') {
      // Lógica para a operação de probabilidade de uma série de eventos
      // Adicione campos de entrada relevantes
      inputFieldsContainer.innerHTML = `
          <label for="events">Número total de Eventos:</label>
          <input type="number" id="events" placeholder="Digite o número total de eventos" min="1" required />
        `
    } else if (selectedOperation === 'ProbCond') {
      // Lógica para a operação de probabilidade condicional P(A|B)
      // Adicione campos de entrada relevantes
      inputFieldsContainer.innerHTML = `
          <label for="probA">Probabilidade de A (entre 0 e 1):</label>
          <input type="number" id="probA" placeholder="Digite a probabilidade de A" min="0" max="1" step="0.01" required />
          <label for="probB">Probabilidade de B (entre 0 e 1):</label>
          <input type="number" id="probB" placeholder="Digite a probabilidade de B" min="0" max="1" step="0.01" required />
        `
    }
  }

  // Função para calcular a probabilidade com base nos campos de entrada
  function calculateProbability() {
    const selectedOperation = operationSelect.value

    // Lógica de cálculo com base na operação selecionada
    let results = {}

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
      // Lógica para a operação de probabilidade de uma série de eventos
      const events = parseFloat(document.getElementById('events').value)
      const probAnyEvent = 1 / events

      results = {
        'Probabilidade de qualquer um dos eventos ocorrer P (A ∪ B)':
          probAnyEvent
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
        const formattedValue = (value * 100).toFixed(2)
        // Adicionar linhas de tabela para cada resultado com cores alternadas
        const backgroundColor = isOddRow ? '#f9f9f9' : '#ffffff'
        resultText += `<tr style="background-color: ${backgroundColor}; border: 1px solid #ddd;"><td style="padding: 8px; text-align: left;">${key}</td><td style="padding: 8px; text-align: center;">${value.toFixed(
          4
        )}</td><td style="padding: 8px; text-align: center;">${formattedValue}%</td></tr>`
        isOddRow = !isOddRow
      }
    }

    resultText += '</table>'

    // Exibir os resultados
    resultDiv.innerHTML = resultText // Use innerHTML para renderizar conteúdo HTML
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

    // Exemplo de exibição da explicação
    calcExplanationDiv.textContent = explanation
  }
})
