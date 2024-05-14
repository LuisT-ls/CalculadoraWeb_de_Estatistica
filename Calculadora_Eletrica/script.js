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
  const showExplanationButton = document.getElementById('showExplanation')
  showExplanationButton.addEventListener('click', showExplanation)

  operationSelect.addEventListener('change', function () {
    unitSelection.innerHTML = ''
    inputFields.innerHTML = ''
    calcExplanation.textContent = ''

    setupCalculation()
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

      case 'corrente-curto-circuito':
        unitSelection.innerHTML = '<label for="voltage">Tensão (V):</label>'
        inputFields.innerHTML =
          '<input type="number" id="voltage" required>' +
          '<label for="impedance">Impedância (Ω):</label>' +
          '<input type="number" id="impedance" required>'
        break

      case 'queda-tensao-transmissao':
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

      case 'tempo-estabilizacao-controle':
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
    const calcExplanation = document.getElementById('calcExplanation')
    const isExplanationVisible = calcExplanation.classList.contains('show')

    calcExplanation.textContent = ''

    if (isExplanationVisible) {
      calcExplanation.classList.remove('show')
    } else {
      calcExplanation.classList.add('show')

      switch (selectedOperation) {
        case 'lei-ohm':
          calcExplanation.textContent =
            'A Lei de Ohm relaciona a tensão, corrente e resistência em um circuito elétrico.'
          break
        case 'lei-ohm-reversa':
          calcExplanation.textContent =
            'A Lei de Ohm Reversa é usada para calcular a resistência quando a tensão e a corrente são conhecidas.'
          break
        case 'potencia-eletrica':
          calcExplanation.textContent =
            'O cálculo da potência elétrica é obtido multiplicando a tensão pela corrente em um circuito.'
          break
        case 'resistencia-serie':
          calcExplanation.textContent =
            'A resistência total em um circuito em série é a soma das resistências individuais.'
          break
        case 'resistencia-paralelo':
          calcExplanation.textContent =
            'A resistência total em um circuito em paralelo é obtida utilizando a fórmula das resistências paralelas.'
          break
        case 'lkt':
          calcExplanation.textContent =
            'A Lei de Kirchhoff para tensões (LKT) afirma que a soma das tensões em um loop fechado é zero.'
          break
        case 'lkc':
          calcExplanation.textContent =
            'A Lei de Kirchhoff para correntes (LKC) estabelece que a soma das correntes em um nó é zero.'
          break
        case 'capacitancia-serie':
          calcExplanation.textContent =
            'A capacitância total em um circuito em série é inversamente proporcional à soma inversa das capacitâncias individuais.'
          break
        case 'capacitancia-paralelo':
          calcExplanation.textContent =
            'A capacitância total em um circuito em paralelo é a soma das capacitâncias individuais.'
          break
        case 'lei-joule':
          calcExplanation.textContent =
            'A Lei de Joule calcula a energia térmica gerada em um resistor, multiplicando a corrente ao quadrado pela resistência e pelo tempo.'
          break
        case 'constante-tempo-rc':
          calcExplanation.textContent =
            'A constante de tempo em um circuito RC é o produto da resistência e capacitância.'
          break
        case 'indutancia-serie':
          calcExplanation.textContent =
            'A indutância total em um circuito em série é a soma das indutâncias individuais.'
          break
        case 'indutancia-paralelo':
          calcExplanation.textContent =
            'A indutância total em um circuito em paralelo é obtida utilizando a fórmula das indutâncias paralelas.'
          break
        case 'impedancia-curto-circuito':
          calcExplanation.textContent =
            'A impedância de um circuito em curto-circuito é a razão entre a tensão e a corrente de curto-circuito.'
          break
        case 'ajuste-transformadores':
          calcExplanation.textContent =
            'O ajuste de transformadores envolve o cálculo da relação de transformação para atender a requisitos específicos de tensão.'
          break
        case 'secao-transversal-condutores':
          calcExplanation.textContent =
            'O cálculo da seção transversal de condutores é baseado na corrente e na temperatura ambiente.'
          break
        case 'corrente-curto-circuito':
          calcExplanation.textContent =
            'O cálculo da corrente de curto-circuito envolve a divisão da tensão pelo valor da impedância.'
          break
        case 'queda-tensao-transmissao':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em linhas de transmissão leva em consideração a corrente, impedância e distância.'
          break
        case 'calculo-dimensionamento-condutores':
          calcExplanation.textContent =
            'O dimensionamento de condutores é feito considerando a corrente e a queda de tensão desejada.'
          break
        case 'calculo-fator-potencia':
          calcExplanation.textContent =
            'O cálculo do fator de potência envolve a relação entre a potência real e a potência aparente.'
          break
        case 'calculo-potencia-trifasica':
          calcExplanation.textContent =
            'O cálculo da potência trifásica é obtido multiplicando a tensão de linha pela corrente de fase e pela raiz de 3.'
          break
        case 'calculo-ressonancia-circuitos-lc':
          calcExplanation.textContent =
            'O cálculo da ressonância em circuitos LC envolve a determinação da frequência de ressonância.'
          break
        case 'compensacao-fator-potencia':
          calcExplanation.textContent =
            'A compensação do fator de potência envolve o ajuste da potência reativa para atingir um fator de potência desejado.'
          break
        case 'dimensionamento-disjuntores-fusiveis':
          calcExplanation.textContent =
            'O dimensionamento de disjuntores e fusíveis envolve a escolha da corrente e do tempo de atuação adequados.'
          break
        case 'analise-harmonicos':
          calcExplanation.textContent =
            'A análise de harmônicos envolve a avaliação de componentes harmônicos em um sistema elétrico.'
          break
        case 'calculo-perda-energia-linhas-transmissao':
          calcExplanation.textContent =
            'O cálculo da perda de energia em linhas de transmissão leva em consideração a corrente, resistência e tempo de operação.'
          break
        case 'calculo-iluminacao':
          calcExplanation.textContent =
            'O cálculo da iluminação envolve a relação entre o fluxo luminoso e a iluminância desejada.'
          break
        case 'calculo-corrente-curto-circuito-disjuntores':
          calcExplanation.textContent =
            'O cálculo da corrente de curto-circuito para disjuntores envolve a divisão da potência de curto-circuito pela tensão.'
          break
        case 'calculo-tensao-toque-passo-linhas-aereas':
          calcExplanation.textContent =
            'O cálculo da tensão de toque em linhas aéreas leva em consideração a tensão e o espaçamento entre fases.'
          break
        case 'avaliacao-queda-tensao-linhas-distribuicao':
          calcExplanation.textContent =
            'A avaliação da queda de tensão em linhas de distribuição envolve a corrente, resistência e distância.'
          break
        case 'calculo-capacitores-correcao-fator-potencia':
          calcExplanation.textContent =
            'O cálculo de capacitores para correção do fator de potência envolve o ajuste da potência reativa.'
          break
        case 'calculo-temperatura-condutores':
          calcExplanation.textContent =
            'O cálculo da temperatura de condutores envolve a corrente, resistência do condutor e temperatura ambiente.'
          break
        case 'determinacao-resistencia-equivalente-circuitos-paralelo':
          calcExplanation.textContent =
            'A determinação da resistência equivalente em circuitos paralelos é obtida utilizando a fórmula das resistências paralelas.'
          break
        case 'calculo-consumo-energia':
          calcExplanation.textContent =
            'O cálculo do consumo de energia é obtido multiplicando a potência pelo tempo de operação.'
          break
        case 'calculo-perda-energia-motores':
          calcExplanation.textContent =
            'O cálculo da perda de energia em motores leva em consideração a eficiência do motor, potência e tempo de operação.'
          break
        case 'calculo-capacitancia-total-serie':
          calcExplanation.textContent =
            'O cálculo da capacitância total em circuitos em série é obtido pela soma inversa das capacitâncias individuais.'
          break
        case 'calculo-capacitancia-total-paralelo':
          calcExplanation.textContent =
            'O cálculo da capacitância total em circuitos em paralelo é a soma das capacitâncias individuais.'
          break
        case 'calculo-pico-corrente-circuitos-indutivos':
          calcExplanation.textContent =
            'O cálculo da corrente de pico em circuitos indutivos envolve a indutância e o tempo de interrupção.'
          break
        case 'calculo-corrente-curto-circuito':
          calcExplanation.textContent =
            'O cálculo da corrente de curto-circuito envolve a divisão da tensão pelo valor da impedância.'
          break
        case 'queda-tensao-condutores':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em condutores envolve a corrente, resistência do condutor e distância.'
          break
        case 'calculo-eficiencia-transformadores':
          calcExplanation.textContent =
            'O cálculo da eficiência de transformadores é obtido dividindo a potência de saída pela potência de entrada.'
          break
        case 'calculo-autotransformadores':
          calcExplanation.textContent =
            'O cálculo de autotransformadores envolve a determinação da relação de transformação para atender aos requisitos de tensão.'
          break
        case 'tempo-estabilizacao-controle':
          calcExplanation.textContent =
            'O tempo de estabilização em sistemas de controle é o intervalo necessário para que a resposta atinja a estabilidade após uma perturbação.'
          break
        case 'calculo-queda-tensao-transformadores':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em transformadores leva em consideração a corrente, impedância e fator de potência.'
          break
        case 'calculo-potencia-aparente':
          calcExplanation.textContent =
            'O cálculo da potência aparente é obtido pela raiz quadrada da soma dos quadrados da potência ativa e reativa.'
          break
        case 'calculo-corrente-nominal-motores':
          calcExplanation.textContent =
            'O cálculo da corrente nominal em motores é obtido pela potência e tensão de operação.'
          break
        case 'calculo-queda-tensao-cabos-alimentadores':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em cabos alimentadores leva em consideração a corrente, resistência e distância.'
          break
        case 'calculo-indutancia-total-serie':
          calcExplanation.textContent =
            'O cálculo da indutância total em circuitos em série é a soma das indutâncias individuais.'
          break
        case 'calculo-indutancia-total-paralelo':
          calcExplanation.textContent =
            'O cálculo da indutância total em circuitos em paralelo é obtido utilizando a fórmula das indutâncias paralelas.'
          break
        case 'calculo-corrente-fuga':
          calcExplanation.textContent =
            'O cálculo da corrente de fuga envolve a tensão e a resistência de isolamento em um circuito.'
          break
        case 'calculo-constante-tempo-rl':
          calcExplanation.textContent =
            'A constante de tempo em um circuito RL é o quociente da indutância pela resistência.'
          break
        case 'calculo-queda-tensao-luminarias':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em luminárias leva em consideração a corrente, resistência e distância.'
          break
        case 'calculo-tensao-induzida':
          calcExplanation.textContent =
            'O cálculo da tensão induzida em um condutor móvel em um campo magnético envolve a velocidade, comprimento do condutor e intensidade do campo.'
          break
        case 'calculo-queda-tensao-reatores':
          calcExplanation.textContent =
            'O cálculo da queda de tensão em reatores leva em consideração a corrente, resistência e distância.'
          break
        case 'calculo-corrente-nominal-transformadores':
          calcExplanation.textContent =
            'O cálculo da corrente nominal em transformadores é obtido pela potência e tensão de operação.'
          break
        case 'calculo-potencia-reativa':
          calcExplanation.textContent =
            'O cálculo da potência reativa é obtido pela multiplicação da tensão pela corrente e pelo seno do ângulo de defasagem.'
          break
        case 'calculo-corrente-curto-circuito-transformadores':
          calcExplanation.textContent =
            'O cálculo da corrente de curto-circuito em transformadores envolve a potência de curto-circuito e a tensão nominal.'
          break
        case 'calculo-corrente-fuga-transformadores':
          calcExplanation.textContent =
            'O cálculo da corrente de fuga em transformadores envolve a tensão, a resistência de isolamento e a capacitância.'
          break
        case 'resistor-protecao-leds':
          calcExplanation.textContent =
            'O resistor de proteção para LEDs é utilizado para limitar a corrente que passa pelo LED, protegendo-o contra danos causados por correntes excessivas.'
          break
        default:
          calcExplanation.textContent = 'Descrição da operação selecionada.'
      }
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
