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

  const operationSelect = document.getElementById('operation')
  const unitSelection = document.getElementById('unit-selection')
  const inputFields = document.getElementById('input-fields')
  const calcExplanation = document.getElementById('calcExplanation')

  operationSelect.addEventListener('change', function () {
    unitSelection.innerHTML = ''
    inputFields.innerHTML = ''
    calcExplanation.textContent = ''

    setupCalculation()
    showExplanation()
  })

  function setupCalculation() {
    const selectedOperation = operationSelect.value

    // Limpa campos de entrada e explicações anteriores
    unitSelection.innerHTML = ''
    inputFields.innerHTML = ''
    calcExplanation.textContent = ''

    switch (selectedOperation) {
      case 'lei-ohm':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML = '<input type="number" id="voltage" required>'
        break
      case 'lei-ohm-reversa':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="voltage">Tensão (V):</label>' +
          '<input type="number" id="voltage_reverse" required>'
        break
      case 'potencia-eletrica':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="current">Corrente (A):</label>' +
          '<input type="number" id="current" required>'
        break

      case 'resistencia-serie':
        unitSelection.innerHTML =
          '<label for="resistance1">Resistência 1 (Ω):</label>'
        inputFields.innerHTML =
          '<input type="number" id="resistance1" required>' +
          '<label for="resistance2">Resistência 2 (Ω):</label>' +
          '<input type="number" id="resistance2" required>'
        break

      case 'resistencia-paralelo':
        unitSelection.innerHTML =
          '<label for="resistance1">Resistência 1 (Ω):</label>'
        inputFields.innerHTML =
          '<input type="number" id="resistance1" required>' +
          '<label for="resistance2">Resistência 2 (Ω):</label>' +
          '<input type="number" id="resistance2" required>'
        break

      case 'lkt':
        unitSelection.innerHTML = '<label for="voltage1">Tensão 1 (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage1" required>' +
          '<label for="voltage2">Tensão 2 (V):</label>' +
          '<input type="number" id="voltage2" required>'
        break

      case 'lkc':
        unitSelection.innerHTML =
          '<label for="current1">Corrente 1 (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current1" required>' +
          '<label for="current2">Corrente 2 (A):</label>' +
          '<input type="number" id="current2" required>'
        break

      case 'capacitancia-serie':
        unitSelection.innerHTML =
          '<label for="capacitance1">Capacitância 1 (F):</label>'
        inputFields.innerHTML =
          '<input type="number" id="capacitance1" required>' +
          '<label for="capacitance2">Capacitância 2 (F):</label>' +
          '<input type="number" id="capacitance2" required>'
        break

      case 'capacitancia-paralelo':
        unitSelection.innerHTML =
          '<label for="capacitance1">Capacitância 1 (F):</label>'
        inputFields.innerHTML =
          '<input type="number" id="capacitance1" required>' +
          '<label for="capacitance2">Capacitância 2 (F):</label>' +
          '<input type="number" id="capacitance2" required>'
        break

      case 'lei-joule':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="resistance">Resistência (Ω):</label>' +
          '<input type="number" id="resistance" required>' +
          '<label for="time">Tempo (s):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'constante-tempo-rc':
        unitSelection.innerHTML =
          '<label for="resistance">Resistência (Ω):</label>'
        inputFields.innerHTML =
          '<input type="number" id="resistance" required>' +
          '<label for="capacitance">Capacitância (F):</label>' +
          '<input type="number" id="capacitance" required>'
        break

      case 'indutancia-serie':
      case 'indutancia-paralelo':
        unitSelection.innerHTML =
          '<label for="inductance">Indutância (H):</label>'
        inputFields.innerHTML = '<input type="number" id="inductance" required>'
        break

      case 'impedancia-curto-circuito':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="shortCircuitCurrent">Corrente de Curto-Circuito (A):</label>' +
          '<input type="number" id="shortCircuitCurrent" required>'
        break

      case 'ajuste-transformadores':
        unitSelection.innerHTML =
          '<label for="primaryVoltage">Tensão Primária (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="primaryVoltage" required>' +
          '<label for="secondaryVoltage">Tensão Secundária (V):</label>' +
          '<input type="number" id="secondaryVoltage" required>'
        break

      case 'secao-transversal-condutores':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="temperature">Temperatura (°C):</label>' +
          '<input type="number" id="temperature" required>'
        break

      case 'calculo-corrente-curto-circuito':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="impedance">Impedância (Ω):</label>' +
          '<input type="number" id="impedance" required>'
        break

      case 'calculo-queda-tensao-linhas-transmissao':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="impedance">Impedância (Ω):</label>' +
          '<input type="number" id="impedance" required>' +
          '<label for="distance">Distância (m):</label>' +
          '<input type="number" id="distance" required>'
        break

      case 'calculo-dimensionamento-condutores':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="voltageDrop">Queda de Tensão (%):</label>' +
          '<input type="number" id="voltageDrop" required>'
        break

      case 'calculo-fator-potencia':
        unitSelection.innerHTML =
          '<label for="apparentPower">Potência Aparente (VA):</label>'
        inputFields.innerHTML =
          '<input type="number" id="apparentPower" required>' +
          '<label for="realPower">Potência Real (W):</label>' +
          '<input type="number" id="realPower" required>'
        break

      case 'calculo-potencia-trifasica':
        unitSelection.innerHTML =
          '<label for="lineVoltage">Tensão de Linha (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="lineVoltage" required>' +
          '<label for="current">Corrente de Fase (A):</label>' +
          '<input type="number" id="current" required>'
        break

      case 'calculo-ressonancia-circuitos-lc':
        unitSelection.innerHTML =
          '<label for="inductance">Indutância (H):</label>'
        inputFields.innerHTML =
          '<input type="number" id="inductance" required>' +
          '<label for="capacitance">Capacitância (F):</label>' +
          '<input type="number" id="capacitance" required>'
        break

      case 'compensacao-fator-potencia':
        unitSelection.innerHTML =
          '<label for="powerFactor">Fator de Potência Atual:</label>'
        inputFields.innerHTML =
          '<input type="number" id="powerFactor" required>' +
          '<label for="desiredPowerFactor">Fator de Potência Desejado:</label>' +
          '<input type="number" id="desiredPowerFactor" required>'
        break

      case 'dimensionamento-disjuntores-fusiveis':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="time">Tempo de Atuação (s):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'analise-harmonicos':
        unitSelection.innerHTML =
          '<label for="harmonicOrder">Ordem Harmônica:</label>'
        inputFields.innerHTML =
          '<input type="number" id="harmonicOrder" required>' +
          '<label for="current">Corrente (A):</label>' +
          '<input type="number" id="current" required>'
        break

      case 'calculo-perda-energia-linhas-transmissao':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="resistance">Resistência da Linha (Ω):</label>' +
          '<input type="number" id="resistance" required>' +
          '<label for="time">Tempo de Operação (h):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'calculo-iluminacao':
        unitSelection.innerHTML =
          '<label for="luminousFlux">Fluxo Luminoso (lm):</label>'
        inputFields.innerHTML =
          '<input type="number" id="luminousFlux" required>' +
          '<label for="illuminance">Iluminância (lux):</label>' +
          '<input type="number" id="illuminance" required>'
        break

      case 'calculo-corrente-curto-circuito-disjuntores':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="shortCircuitPower">Potência de Curto-Circuito (VA):</label>' +
          '<input type="number" id="shortCircuitPower" required>'
        break

      case 'calculo-tensao-toque-passo-linhas-aereas':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="spacing">Espaçamento entre Fases (m):</label>' +
          '<input type="number" id="spacing" required>'
        break

      case 'avaliacao-queda-tensao-linhas-distribuicao':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="resistance">Resistência da Linha (Ω):</label>' +
          '<input type="number" id="resistance" required>' +
          '<label for="distance">Distância (m):</label>' +
          '<input type="number" id="distance" required>'
        break

      case 'calculo-capacitores-correcao-fator-potencia':
        unitSelection.innerHTML =
          '<label for="powerFactor">Fator de Potência Atual:</label>'
        inputFields.innerHTML =
          '<input type="number" id="powerFactor" required>' +
          '<label for="desiredPowerFactor">Fator de Potência Desejado:</label>' +
          '<input type="number" id="desiredPowerFactor" required>' +
          '<label for="systemVoltage">Tensão do Sistema (V):</label>' +
          '<input type="number" id="systemVoltage" required>'
        break

      case 'calculo-temperatura-condutores':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="resistance">Resistência do Condutor (Ω/km):</label>' +
          '<input type="number" id="resistance" required>' +
          '<label for="ambientTemperature">Temperatura Ambiente (°C):</label>' +
          '<input type="number" id="ambientTemperature" required>'
        break

      case 'determinacao-resistencia-equivalente-circuitos-paralelo':
        unitSelection.innerHTML =
          '<label for="resistance1">Resistência 1 (Ω):</label>'
        inputFields.innerHTML =
          '<input type="number" id="resistance1" required>' +
          '<label for="resistance2">Resistência 2 (Ω):</label>' +
          '<input type="number" id="resistance2" required>'
        break

      case 'calculo-consumo-energia':
        unitSelection.innerHTML = '<label for="power">Potência (W):</label>'
        inputFields.innerHTML =
          '<input type="number" id="power" required>' +
          '<label for="time">Tempo (h):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'calculo-perda-energia-motores':
        unitSelection.innerHTML =
          '<label for="efficiency">Eficiência do Motor (%):</label>'
        inputFields.innerHTML =
          '<input type="number" id="efficiency" required>' +
          '<label for="power">Potência do Motor (W):</label>' +
          '<input type="number" id="power" required>' +
          '<label for="time">Tempo de Operação (h):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'calculo-capacitancia-total-serie':
        unitSelection.innerHTML =
          '<label for="capacitance1">Capacitância 1 (F):</label>'
        inputFields.innerHTML =
          '<input type="number" id="capacitance1" required>' +
          '<label for="capacitance2">Capacitância 2 (F):</label>' +
          '<input type="number" id="capacitance2" required>'
        break

      case 'calculo-capacitancia-total-paralelo':
        unitSelection.innerHTML =
          '<label for="capacitance1">Capacitância 1 (F):</label>'
        inputFields.innerHTML =
          '<input type="number" id="capacitance1" required>' +
          '<label for="capacitance2">Capacitância 2 (F):</label>' +
          '<input type="number" id="capacitance2" required>'
        break

      case 'calculo-pico-corrente-circuitos-indutivos':
        unitSelection.innerHTML =
          '<label for="inductance">Indutância (H):</label>'
        inputFields.innerHTML =
          '<input type="number" id="inductance" required>' +
          '<label for="time">Tempo de Interrupção (s):</label>' +
          '<input type="number" id="time" required>'
        break

      case 'calculo-corrente-curto-circuito':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="shortCircuitPower">Potência de Curto-Circuito (VA):</label>' +
          '<input type="number" id="shortCircuitPower" required>'
        break

      case 'queda-tensao-condutores':
        unitSelection.innerHTML = '<label for="current">Corrente (A):</label>'
        inputFields.innerHTML =
          '<input type="number" id="current" required>' +
          '<label for="resistance">Resistência do Condutor (Ω/km):</label>' +
          '<input type="number" id="resistance" required>' +
          '<label for="distance">Distância (m):</label>' +
          '<input type="number" id="distance" required>'
        break

      case 'calculo-eficiencia-transformadores':
        unitSelection.innerHTML =
          '<label for="inputPower">Potência de Entrada (VA):</label>'
        inputFields.innerHTML =
          '<input type="number" id="inputPower" required>' +
          '<label for="outputPower">Potência de Saída (VA):</label>' +
          '<input type="number" id="outputPower" required>'
        break

      case 'calculo-autotransformadores':
        unitSelection.innerHTML =
          '<label for="primaryVoltage">Tensão Primária (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="primaryVoltage" required>' +
          '<label for="secondaryVoltage">Tensão Secundária (V):</label>' +
          '<input type="number" id="secondaryVoltage" required>'
        break

      case 'tempo-estabilizacao-circuito-rc':
        unitSelection.innerHTML =
          '<label for="resistance">Resistência (Ω):</label>'
        inputFields.innerHTML =
          '<input type="number" id="resistance" required>' +
          '<label for="capacitance">Capacitância (F):</label>' +
          '<input type="number" id="capacitance" required>'
        break

      case 'resistor-protecao-leds':
        unitSelection.innerHTML =
          '<label for="forwardVoltage">Tensão Direta (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="forwardVoltage" required>' +
          '<label for="forwardCurrent">Corrente Direta (A):</label>' +
          '<input type="number" id="forwardCurrent" required>'
        break
      default:
    }
  }

  function showExplanation() {
    const selectedOperation = operationSelect.value

    // Lógica para exibir a explicação correspondente
    // Pode ser uma instrução switch ou if-else
    // Exemplo:
    switch (selectedOperation) {
      case 'lei-ohm':
        calcExplanation.textContent =
          'A Lei de Ohm relaciona a tensão, corrente e resistência em um circuito elétrico.'
        break
      case 'lei-ohm-reversa':
        calcExplanation.textContent =
          'A Lei de Ohm Reversa é usada para calcular a resistência quando a tensão e a corrente são conhecidas.'
        break
      // Adicione mais casos conforme necessário
      default:
        calcExplanation.textContent = 'Descrição da operação selecionada.'
    }
  }

  const calculateButton = document.getElementById('calculate')
  calculateButton.addEventListener('click', function () {
    const selectedOperation = operationSelect.value
    performCalculation(selectedOperation)

    const resultDiv = document.getElementById('result')
    resultDiv.textContent = 'Resultado do cálculo aqui.'
  })

  const clearButton = document.getElementById('clear')
  clearButton.addEventListener('click', function () {
    unitSelection.innerHTML = ''
    inputFields.innerHTML = ''
    calcExplanation.textContent = ''
    const resultDiv = document.getElementById('result')
    resultDiv.textContent = ''
  })

  function performCalculation(operation) {
    // Adicione lógica para realizar cálculos com base na operação selecionada
    // Exemplo:
    switch (operation) {
      case 'lei-ohm':
        const voltage = parseFloat(document.getElementById('voltage').value)
        const current = parseFloat(document.getElementById('current').value)
        const resistance = voltage / current
        displayResult(resistance)
        break
      // Adicione mais casos conforme necessário
      default:
      // Adicione lógica para outras operações
    }
  }

  function displayResult(result) {
    const resultDiv = document.getElementById('result')
    resultDiv.textContent = 'Resultado do cálculo: ' + result
  }
})
