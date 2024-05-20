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

const operationSelect = document.getElementById('operation')
const inputFields = document.getElementById('input-fields')
const calculateButton = document.getElementById('calculate')
const resultDiv = document.getElementById('result')
const showExplanationButton = document.getElementById('showExplanation')
const explanationText = document.getElementById('calcExplanation')

operationSelect.addEventListener('change', () => {
  updateInputFields()
})

calculateButton.addEventListener('click', () => {
  calculateResult()
})

showExplanationButton.addEventListener('click', () => {
  const selectedOperation = operationSelect.value
  showExplanation(selectedOperation)
  const explanation = explanationText // Use a referência já existente
  if (
    explanation.style.display === 'none' ||
    explanation.style.display === ''
  ) {
    explanation.style.display = 'block'
  } else {
    explanation.style.display = 'none'
  }
})

operationSelect.addEventListener('change', () => {
  updateInputFields()
  showExplanation(operationSelect.value)
})

function updateInputFields() {
  const selectedOperation = operationSelect.value

  const explanationsVisible = explanationText.style.display === 'block'
  inputFields.innerHTML = ''
  if (!explanationsVisible) {
    explanationText.style.display = 'none'
  }

  switch (selectedOperation) {
    case 'lei-ohm':
      addInputField('voltagem', 'Voltagem (V):')
      addInputField('corrente', 'Corrente (A):')
      break
    case 'lei-ohm-reversa':
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('corrente', 'Corrente (A):')
      break
    case 'potencia-eletrica':
      addInputField('voltagem', 'Voltagem (V):')
      addInputField('corrente', 'Corrente (A):')
      break
    case 'resistencia-serie':
      addInputField('resistencias', 'Resistências (Ω) (separadas por vírgula):')
      break
    case 'resistencia-paralelo':
      addInputField('resistencias', 'Resistências (Ω) (separadas por vírgula):')
      break
    case 'lkt':
      addInputField('tensoes', 'Tensões (V) (separadas por vírgula):')
      break
    case 'lkc':
      addInputField('correntes', 'Correntes (A) (separadas por vírgula):')
      break
    case 'capacitancia-serie':
      addInputField(
        'capacitancias',
        'Capacitâncias (F) (separadas por vírgula):'
      )
      break
    case 'capacitancia-paralelo':
      addInputField(
        'capacitancias',
        'Capacitâncias (F) (separadas por vírgula):'
      )
      break
    case 'lei-joule':
      addInputField('corrente', 'Corrente (A):')
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('tempo', 'Tempo (s):')
      break
    case 'constante-tempo-rc':
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('capacitancia', 'Capacitância (F):')
      break
    case 'indutancia-serie':
      addInputField('indutancias', 'Indutâncias (H) (separadas por vírgula):')
      break
    case 'indutancia-paralelo':
      addInputField('indutancias', 'Indutâncias (H) (separadas por vírgula):')
      break
    case 'impedancia-curto-circuito':
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('indutancia', 'Indutância (H):')
      break
    case 'ajuste-transformadores':
      addInputField('potencia', 'Potência (VA):')
      addInputField('tensaoPrimaria', 'Tensão Primária (V):')
      addInputField('tensaoSecundaria', 'Tensão Secundária (V):')
      break
    case 'secao-transversal-condutores':
      addInputField('corrente', 'Corrente (A):')
      addInputField('comprimento', 'Comprimento (m):')
      addInputField('quedaTensao', 'Queda de Tensão (%):')
      break
    case 'corrente-curto-circuito':
      addInputField('impedancia', 'Impedância (Ω):')
      addInputField('tensao', 'Tensão (V):')
      break
    case 'queda-tensao-transmissao':
      addInputField('corrente', 'Corrente (A):')
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('comprimento', 'Comprimento (m):')
      break
    case 'calculo-dimensionamento-condutores':
      addInputField('corrente', 'Corrente (A):')
      addInputField('comprimento', 'Comprimento (m):')
      addInputField('tipoCondutor', 'Tipo de Condutor:')
      break
    case 'calculo-fator-potencia':
      addInputField('potenciaAtiva', 'Potência Ativa (W):')
      addInputField('potenciaReativa', 'Potência Reativa (VAR):')
      break
    case 'calculo-potencia-trifasica':
      addInputField('tensao', 'Tensão (V):')
      addInputField('corrente', 'Corrente (A):')
      addInputField('fatorPotencia', 'Fator de Potência:')
      break
    case 'calculo-ressonancia-circuitos-lc':
      addInputField('indutancia', 'Indutância (H):')
      addInputField('capacitancia', 'Capacitância (F):')
      break
    case 'compensacao-fator-potencia':
      addInputField('potenciaAparente', 'Potência Aparente (VA):')
      addInputField('fatorPotenciaAtual', 'Fator de Potência Atual:')
      addInputField('fatorPotenciaDesejado', 'Fator de Potência Desejado:')
      break
    case 'dimensionamento-disjuntores-fusiveis':
      addInputField('corrente', 'Corrente (A):')
      addInputField('tensao', 'Tensão (V):')
      addInputField('tipoCarga', 'Tipo de Carga:')
      break
    case 'analise-harmonicos':
      addInputField(
        'correntesHarmonicas',
        'Correntes Harmônicas (A) (separadas por vírgula):'
      )
      break
    case 'calculo-perda-energia-linhas-transmissao':
      addInputField('corrente', 'Corrente (A):')
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('comprimento', 'Comprimento (m):')
      break
    case 'calculo-iluminacao':
      addInputField('area', 'Área (m²):')
      addInputField('nivelIluminacao', 'Nível de Iluminação (lux):')
      break
    case 'calculo-corrente-curto-circuito-disjuntores':
      addInputField('tensao', 'Tensão (V):')
      addInputField('impedancia', 'Impedância (Ω):')
      break
    case 'calculo-tensao-toque-passo-linhas-aereas':
      addInputField('correnteFuga', 'Corrente de Fuga (A):')
      addInputField('resistenciaSolo', 'Resistência do Solo (Ω):')
      break
    case 'avaliacao-queda-tensao-linhas-distribuicao':
      addInputField('corrente', 'Corrente (A):')
      addInputField('resistencia', 'Resistência (Ω):')
      addInputField('comprimento', 'Comprimento (m):')
      break
    case 'calculo-capacitores-correcao-fator-potencia':
      addInputField('potenciaReativa', 'Potência Reativa (VAR):')
      addInputField('fatorPotenciaAtual', 'Fator de Potência Atual:')
      addInputField('fatorPotenciaDesejado', 'Fator de Potência Desejado:')
      break
    case 'calculo-temperatura-condutores':
      addInputField('corrente', 'Corrente (A):')
      addInputField('resistenciaTermica', 'Resistência Térmica (°C/W):')
      break
    case 'determinacao-resistencia-equivalente-circuitos-paralelo':
      addInputField('resistencias', 'Resistências (Ω) (separadas por vírgula):')
      break
    case 'calculo-consumo-energia':
      addInputField('potencia', 'Potência (W):')
      addInputField('tempo', 'Tempo de Uso (h):')
      break
    case 'calculo-perda-energia-motores':
      addInputField('potencia', 'Potência (W):')
      addInputField('eficiencia', 'Eficiência (%):')
      break
    case 'calculo-capacitancia-total-serie':
      addInputField(
        'capacitancias',
        'Capacitâncias (F) (separadas por vírgula):'
      )
      break
    case 'calculo-capacitancia-total-paralelo':
      addInputField(
        'capacitancias',
        'Capacitâncias (F) (separadas por vírgula):'
      )
      break
    case 'calculo-pico-corrente-circuitos-indutivos':
      addInputField('indutancia', 'Indutância (H):')
      addInputField('tensao', 'Tensão (V):')
      break
    case 'calculo-corrente-curto-circuito':
      addInputField('tensao', 'Tensão (V):')
      addInputField('impedancia', 'Impedância (Ω):')
      break
    case 'queda-tensao-condutores':
      addInputField('corrente', 'Corrente (A):')
      addInputField('comprimento', 'Comprimento (m):')
      break
    case 'calculo-eficiencia-transformadores':
      addInputField('potenciaEntrada', 'Potência de Entrada (W):')
      addInputField('potenciaSaida', 'Potência de Saída (W):')
      break
    case 'calculo-autotransformadores':
      addInputField('potencia', 'Potência (VA):')
      addInputField('tensaoPrimaria', 'Tensão Primária (V):')
      addInputField('tensaoSecundaria', 'Tensão Secundária (V):')
      break
    case 'tempo-estabilizacao-controle':
      addInputField('tempoResposta', 'Tempo de Resposta (s):')
      addInputField('percentOvershoot', 'Percentual de Overshoot (%):')
      break
    case 'resistor-protecao-leds':
      addInputField('tensaoFonte', 'Tensão da Fonte (V):')
      addInputField('correnteLed', 'Corrente do LED (A):')
      addInputField('tensaoLed', 'Tensão do LED (V):')
      break
  }
}

function addInputField(id, label) {
  const inputField = document.createElement('div')
  inputField.className = 'input-field'
  inputField.innerHTML = `<label for="${id}">${label}</label><input type="number" id="${id}" />`
  inputFields.appendChild(inputField)
}

document
  .getElementById('operation')
  .addEventListener('change', updateInputFields)
updateInputFields() // Initialize input fields on page load

function calculateResult() {
  const selectedOperation = operationSelect.value
  let result = 0
  let formattedResult = ''

  const inputValues = {}
  document.querySelectorAll('.input-field input').forEach(input => {
    inputValues[input.id] = parseFloat(input.value)
  })

  switch (selectedOperation) {
    case 'lei-ohm':
      result = inputValues.voltagem / inputValues.corrente
      formattedResult = `Resultado (Resistência): ${result.toFixed(2)} Ω`
      break
    case 'lei-ohm-reversa':
      result = inputValues.resistencia * inputValues.corrente
      formattedResult = `Resultado (Voltagem): ${result.toFixed(2)} V`
      break
    case 'potencia-eletrica':
      result = inputValues.voltagem * inputValues.corrente
      formattedResult = `Resultado (Potência): ${result.toFixed(2)} W`
      break
    case 'resistencia-serie':
      const resistenciasSerie = inputValues.resistencias.split(',').map(Number)
      result = resistenciasSerie.reduce((total, r) => total + r, 0)
      formattedResult = `Resultado (Resistência Equivalente): ${result.toFixed(
        2
      )} Ω`
      break
    case 'resistencia-paralelo':
      const resistenciasParalelo = inputValues.resistencias
        .split(',')
        .map(Number)
      result = 1 / resistenciasParalelo.reduce((total, r) => total + 1 / r, 0)
      formattedResult = `Resultado (Resistência Equivalente): ${result.toFixed(
        2
      )} Ω`
      break
    case 'lkt':
      const tensoes = inputValues.tensoes.split(',').map(Number)
      result = tensoes.reduce((total, t) => total + t, 0)
      formattedResult = `Resultado (Soma das Tensões): ${result.toFixed(2)} V`
      break
    case 'lkc':
      const correntes = inputValues.correntes.split(',').map(Number)
      result = correntes.reduce((total, c) => total + c, 0)
      formattedResult = `Resultado (Soma das Correntes): ${result.toFixed(2)} A`
      break
    case 'capacitancia-serie':
      const capacitanciasSerie = inputValues.capacitancias
        .split(',')
        .map(Number)
      result = 1 / capacitanciasSerie.reduce((total, c) => total + 1 / c, 0)
      formattedResult = `Resultado (Capacitância Equivalente): ${result.toFixed(
        2
      )} F`
      break
    case 'capacitancia-paralelo':
      const capacitanciasParalelo = inputValues.capacitancias
        .split(',')
        .map(Number)
      result = capacitanciasParalelo.reduce((total, c) => total + c, 0)
      formattedResult = `Resultado (Capacitância Equivalente): ${result.toFixed(
        2
      )} F`
      break
    case 'lei-joule':
      result =
        Math.pow(inputValues.corrente, 2) *
        inputValues.resistencia *
        inputValues.tempo
      formattedResult = `Resultado (Energia Dissipada): ${result.toFixed(2)} J`
      break
    case 'constante-tempo-rc':
      result = inputValues.resistencia * inputValues.capacitancia
      formattedResult = `Resultado (Constante de Tempo): ${result.toFixed(2)} s`
      break
    case 'indutancia-serie':
      const indutanciasSerie = inputValues.indutancias.split(',').map(Number)
      result = indutanciasSerie.reduce((total, l) => total + l, 0)
      formattedResult = `Resultado (Indutância Equivalente): ${result.toFixed(
        2
      )} H`
      break
    case 'indutancia-paralelo':
      const indutanciasParalelo = inputValues.indutancias.split(',').map(Number)
      result = 1 / indutanciasParalelo.reduce((total, l) => total + 1 / l, 0)
      formattedResult = `Resultado (Indutância Equivalente): ${result.toFixed(
        2
      )} H`
      break
    case 'impedancia-curto-circuito':
      result = Math.sqrt(
        Math.pow(inputValues.resistencia, 2) +
          Math.pow(2 * Math.PI * 60 * inputValues.indutancia, 2)
      )
      formattedResult = `Resultado (Impedância): ${result.toFixed(2)} Ω`
      break
    case 'ajuste-transformadores':
      result =
        inputValues.potencia /
        (inputValues.tensaoSecundaria / inputValues.tensaoPrimaria)
      formattedResult = `Resultado (Ajuste): ${result.toFixed(2)} A`
      break
    case 'secao-transversal-condutores':
      result =
        (inputValues.corrente * inputValues.comprimento) /
        (inputValues.quedaTensao / 100)
      formattedResult = `Resultado (Seção Transversal): ${result.toFixed(
        2
      )} mm²`
      break
    case 'corrente-curto-circuito':
      result = inputValues.tensao / inputValues.impedancia
      formattedResult = `Resultado (Corrente de Curto-Circuito): ${result.toFixed(
        2
      )} A`
      break
    case 'queda-tensao-transmissao':
      result =
        inputValues.corrente * inputValues.resistencia * inputValues.comprimento
      formattedResult = `Resultado (Queda de Tensão): ${result.toFixed(2)} V`
      break
    case 'calculo-dimensionamento-condutores':
      result = (inputValues.corrente * inputValues.comprimento) / 56 // 56 is a constant for copper conductors
      formattedResult = `Resultado (Dimensão do Condutor): ${result.toFixed(
        2
      )} mm²`
      break
    case 'calculo-fator-potencia':
      result =
        inputValues.potenciaAtiva /
        Math.sqrt(
          Math.pow(inputValues.potenciaAtiva, 2) +
            Math.pow(inputValues.potenciaReativa, 2)
        )
      formattedResult = `Resultado (Fator de Potência): ${result.toFixed(2)}`
      break
    case 'calculo-potencia-trifasica':
      result =
        inputValues.tensao *
        inputValues.corrente *
        Math.sqrt(3) *
        inputValues.fatorPotencia
      formattedResult = `Resultado (Potência Trifásica): ${result.toFixed(2)} W`
      break
    case 'calculo-ressonancia-circuitos-lc':
      result =
        1 /
        (2 *
          Math.PI *
          Math.sqrt(inputValues.indutancia * inputValues.capacitancia))
      formattedResult = `Resultado (Frequência de Ressonância): ${result.toFixed(
        2
      )} Hz`
      break
    case 'compensacao-fator-potencia':
      const potenciaAtiva =
        inputValues.potenciaAparente * inputValues.fatorPotenciaAtual
      const potenciaReativaAtual = Math.sqrt(
        Math.pow(inputValues.potenciaAparente, 2) - Math.pow(potenciaAtiva, 2)
      )
      const potenciaReativaDesejada =
        potenciaAtiva * Math.tan(Math.acos(inputValues.fatorPotenciaDesejado))
      result = potenciaReativaAtual - potenciaReativaDesejada
      formattedResult = `Resultado (Compensação Necessária): ${result.toFixed(
        2
      )} VAR`
      break
    case 'dimensionamento-disjuntores-fusiveis':
      result = inputValues.corrente * 1.25 // safety factor of 25%
      formattedResult = `Resultado (Corrente do Disjuntor/Fusível): ${result.toFixed(
        2
      )} A`
      break
    case 'analise-harmonicos':
      const correntesHarmonicas = inputValues.correntesHarmonicas
        .split(',')
        .map(Number)
      result = Math.sqrt(
        correntesHarmonicas.reduce((total, c) => total + Math.pow(c, 2), 0)
      )
      formattedResult = `Resultado (Corrente Harmônica Total): ${result.toFixed(
        2
      )} A`
      break
    case 'calculo-perda-energia-linhas-transmissao':
      result =
        Math.pow(inputValues.corrente, 2) *
        inputValues.resistencia *
        inputValues.comprimento
      formattedResult = `Resultado (Perda de Energia): ${result.toFixed(2)} W`
      break
    case 'calculo-iluminacao':
      result = (inputValues.area * inputValues.nivelIluminacao) / 1000 // 1000 to convert lux to lumens
      formattedResult = `Resultado (Quantidade de Lâmpadas): ${result.toFixed(
        2
      )} lâmpadas`
      break
    case 'calculo-corrente-curto-circuito-disjuntores':
      result = inputValues.tensao / inputValues.impedancia
      formattedResult = `Resultado (Corrente de Curto-Circuito): ${result.toFixed(
        2
      )} A`
      break
    case 'calculo-tensao-toque-passo-linhas-aereas':
      result = inputValues.correnteFuga * inputValues.resistenciaSolo
      formattedResult = `Resultado (Tensão de Toque/Passo): ${result.toFixed(
        2
      )} V`
      break
    case 'avaliacao-queda-tensao-linhas-distribuicao':
      result =
        inputValues.corrente * inputValues.resistencia * inputValues.comprimento
      formattedResult = `Resultado (Queda de Tensão): ${result.toFixed(2)} V`
      break
    case 'calculo-capacitores-correcao-fator-potencia':
      const potenciaAtivaFatorCorrecao =
        inputValues.potenciaAparente * inputValues.fatorPotenciaAtual
      const potenciaReativaAtualFatorCorrecao = Math.sqrt(
        Math.pow(inputValues.potenciaAparente, 2) -
          Math.pow(potenciaAtivaFatorCorrecao, 2)
      )
      const potenciaReativaDesejadaFatorCorrecao =
        potenciaAtivaFatorCorrecao *
        Math.tan(Math.acos(inputValues.fatorPotenciaDesejado))
      result =
        potenciaReativaAtualFatorCorrecao - potenciaReativaDesejadaFatorCorrecao
      formattedResult = `Resultado (Capacitor Necessário): ${result.toFixed(
        2
      )} VAR`
      break
    case 'calculo-temperatura-condutores':
      result = (inputValues.corrente * inputValues.comprimento) / 58 // 58 is a constant for aluminum conductors
      formattedResult = `Resultado (Temperatura): ${result.toFixed(2)} °C`
      break
    case 'determinacao-resistencia-equivalente-circuitos-paralelo':
      const resistenciasEquivalenteParalelo = inputValues.resistencias
        .split(',')
        .map(Number)
      result =
        1 /
        resistenciasEquivalenteParalelo.reduce((total, r) => total + 1 / r, 0)
      formattedResult = `Resultado (Resistência Equivalente): ${result.toFixed(
        2
      )} Ω`
      break
    case 'calculo-consumo-energia':
      result = (inputValues.potencia * inputValues.tempo) / 1000 // Convert W to kWh
      formattedResult = `Resultado (Consumo de Energia): ${result.toFixed(
        2
      )} kWh`
      break
    case 'calculo-perda-energia-motores':
      result = inputValues.potencia * (1 - inputValues.eficiencia / 100)
      formattedResult = `Resultado (Perda de Energia): ${result.toFixed(2)} W`
      break
    case 'calculo-capacitancia-total-serie':
      const capacitanciasTotalSerie = inputValues.capacitancias
        .split(',')
        .map(Number)
      result =
        1 / capacitanciasTotalSerie.reduce((total, c) => total + 1 / c, 0)
      formattedResult = `Resultado (Capacitância Total): ${result.toFixed(2)} F`
      break
    case 'calculo-capacitancia-total-paralelo':
      const capacitanciasTotalParalelo = inputValues.capacitancias
        .split(',')
        .map(Number)
      result = capacitanciasTotalParalelo.reduce((total, c) => total + c, 0)
      formattedResult = `Resultado (Capacitância Total): ${result.toFixed(2)} F`
      break
    case 'calculo-pico-corrente-circuitos-indutivos':
      result = inputValues.voltagem / inputValues.resistencia
      formattedResult = `Resultado (Pico de Corrente): ${result.toFixed(2)} A`
      break
    case 'queda-tensao-condutores':
      result = (inputValues.corrente * inputValues.comprimento) / 58 // 58 is a constant for aluminum conductors
      formattedResult = `Resultado (Queda de Tensão): ${result.toFixed(2)} V`
      break
    case 'calculo-eficiencia-transformadores':
      result = (inputValues.potenciaSaida / inputValues.potenciaEntrada) * 100
      formattedResult = `Resultado (Eficiência): ${result.toFixed(2)}%`
      break
    case 'calculo-autotransformadores':
      result =
        inputValues.potencia *
        (inputValues.tensaoSecundaria / inputValues.tensaoPrimaria)
      formattedResult = `Resultado (Autotransformador): ${result.toFixed(2)} VA`
      break
    case 'tempo-estabilizacao-controle':
      result =
        -inputValues.tempoResposta /
        Math.log(inputValues.percentOvershoot / 100)
      formattedResult = `Resultado (Tempo de Estabilização): ${result.toFixed(
        2
      )} s`
      break
    case 'resistor-protecao-leds':
      result =
        (inputValues.tensaoFonte - inputValues.tensaoLed) /
        inputValues.correnteLed
      formattedResult = `Resultado (Resistor): ${result.toFixed(2)} Ω`
      break
    default:
      formattedResult = 'Operação não suportada'
  }

  resultDiv.textContent = formattedResult
}

document.getElementById('calculate').addEventListener('click', calculateResult)

function showExplanation(selectedOperation) {
  let explanation = ''

  switch (selectedOperation) {
    case 'lei-ohm':
      explanation = `
        <p>A Lei de Ohm é usada para determinar a relação entre voltagem, corrente e resistência em um circuito elétrico. A fórmula é:</p>
        <p>Resistência (R) = Voltagem (V) / Corrente (I)</p>
      `
      break
    case 'lei-ohm-reversa':
      explanation = `
        <p>A Lei de Ohm reversa é usada para calcular a voltagem em um circuito, dado a resistência e a corrente. A fórmula é:</p>
        <p>Voltagem (V) = Resistência (R) * Corrente (I)</p>
      `
      break
    case 'potencia-eletrica':
      explanation = `
        <p>O cálculo da potência elétrica é usado para determinar a quantidade de energia consumida por um circuito. A fórmula é:</p>
        <p>Potência (P) = Voltagem (V) * Corrente (I)</p>
      `
      break
    case 'resistencia-serie':
      explanation = `
        <p>O cálculo da resistência equivalente em série é usado para determinar a resistência total em um circuito com resistores em série. A fórmula é:</p>
        <p>Resistência Equivalente (R) = R1 + R2 + ... + Rn</p>
      `
      break
    case 'resistencia-paralelo':
      explanation = `
        <p>O cálculo da resistência equivalente em paralelo é usado para determinar a resistência total em um circuito com resistores em paralelo. A fórmula é:</p>
        <p>1 / Resistência Equivalente (R) = 1 / R1 + 1 / R2 + ... + 1 / Rn</p>
      `
      break
    case 'lkt':
      explanation = `
        <p>A Lei de Kirchhoff para tensões (LKT) afirma que a soma das tensões em qualquer malha fechada de um circuito é igual a zero. A fórmula é:</p>
        <p>Soma das Tensões = V1 + V2 + ... + Vn = 0</p>
      `
      break
    case 'lkc':
      explanation = `
        <p>A Lei de Kirchhoff para correntes (LKC) afirma que a soma das correntes que entram em um nó é igual à soma das correntes que saem desse nó. A fórmula é:</p>
        <p>Soma das Correntes = I1 + I2 + ... + In = 0</p>
      `
      break
    case 'capacitancia-serie':
      explanation = `
        <p>O cálculo da capacitância equivalente em série é usado para determinar a capacitância total em um circuito com capacitores em série. A fórmula é:</p>
        <p>1 / Capacitância Equivalente (C) = 1 / C1 + 1 / C2 + ... + 1 / Cn</p>
      `
      break
    case 'capacitancia-paralelo':
      explanation = `
        <p>O cálculo da capacitância equivalente em paralelo é usado para determinar a capacitância total em um circuito com capacitores em paralelo. A fórmula é:</p>
        <p>Capacitância Equivalente (C) = C1 + C2 + ... + Cn</p>
      `
      break
    case 'lei-joule':
      explanation = `
        <p>A Lei de Joule é usada para calcular a energia dissipada em um resistor em forma de calor. A fórmula é:</p>
        <p>Energia Dissipada (E) = Corrente^2 (I^2) * Resistência (R) * Tempo (t)</p>
      `
      break
    case 'constante-tempo-rc':
      explanation = `
        <p>A constante de tempo de um circuito RC (resistor e capacitor) é o tempo necessário para que a tensão no capacitor atinja aproximadamente 63% do seu valor final após uma mudança de tensão. A fórmula é:</p>
        <p>Constante de Tempo (τ) = Resistência (R) * Capacitância (C)</p>
      `
      break
    case 'indutancia-serie':
      explanation = `
        <p>O cálculo da indutância equivalente em série é usado para determinar a indutância total em um circuito com indutores em série. A fórmula é:</p>
        <p>Indutância Equivalente (L) = L1 + L2 + ... + Ln</p>
      `
      break
    case 'indutancia-paralelo':
      explanation = `
        <p>O cálculo da indutância equivalente em paralelo é usado para determinar a indutância total em um circuito com indutores em paralelo. A fórmula é:</p>
        <p>1 / Indutância Equivalente (L) = 1 / L1 + 1 / L2 + ... + 1 / Ln</p>
      `
      break
    case 'impedancia-curto-circuito':
      explanation = `
        <p>O cálculo da impedância de curto-circuito é usado para determinar a impedância total em um circuito durante um curto-circuito. A fórmula é:</p>
        <p>Impedância (Z) = √(Resistência^2 (R^2) + (2π * Frequência (f) * Indutância (L))^2)</p>
      `
      break
    case 'ajuste-transformadores':
      explanation = `
        <p>O ajuste de transformadores é usado para calcular a corrente em um transformador baseado na potência e na relação de tensão entre os enrolamentos primário e secundário. A fórmula é:</p>
        <p>Corrente (I) = Potência (P) / (Tensão Secundária (Vs) / Tensão Primária (Vp))</p>
      `
      break
    case 'secao-transversal-condutores':
      explanation = `
        <p>O cálculo da seção transversal de condutores é usado para determinar a área necessária de um condutor elétrico para transportar uma corrente específica com uma queda de tensão permitida. A fórmula é:</p>
        <p>Seção Transversal (A) = (Corrente (I) * Comprimento (L)) / (Queda de Tensão (ΔV) / 100)</p>
      `
      break
    case 'corrente-curto-circuito':
      explanation = `
        <p>O cálculo da corrente de curto-circuito é usado para determinar a corrente que flui em um circuito durante um curto-circuito. A fórmula é:</p>
        <p>Corrente de Curto-Circuito (Isc) = Tensão (V) / Impedância (Z)</p>
      `
      break
    case 'queda-tensao-transmissao':
      explanation = `
        <p>O cálculo da queda de tensão em linhas de transmissão é usado para determinar a queda de tensão em um condutor devido à resistência ao transportar corrente. A fórmula é:</p>
        <p>Queda de Tensão (ΔV) = Corrente (I) * Resistência (R) * Comprimento (L)</p>
      `
      break
    case 'calculo-dimensionamento-condutores':
      explanation = `
        <p>O cálculo do dimensionamento de condutores é usado para determinar a área necessária de um condutor para transportar uma corrente específica com base em um fator de segurança. A fórmula é:</p>
        <p>Dimensão do Condutor (A) = Corrente (I) * Comprimento (L) / 56 (constante para condutores de cobre)</p>
      `
      break
    case 'calculo-fator-potencia':
      explanation = `
        <p>O cálculo do fator de potência é usado para determinar a relação entre a potência ativa e a potência aparente em um circuito. A fórmula é:</p>
        <p>Fator de Potência (PF) = Potência Ativa (P) / √(Potência Ativa^2 (P^2) + Potência Reativa^2 (Q^2))</p>
      `
      break
    case 'calculo-potencia-trifasica':
      explanation = `
        <p>O cálculo da potência trifásica é usado para determinar a potência total em um sistema trifásico. A fórmula é:</p>
        <p>Potência Trifásica (P) = Tensão (V) * Corrente (I) * √3 * Fator de Potência (PF)</p>
      `
      break
    case 'calculo-ressonancia-circuitos-lc':
      explanation = `
        <p>O cálculo da frequência de ressonância em circuitos LC é usado para determinar a frequência na qual a impedância de um circuito LC é mínima. A fórmula é:</p>
        <p>Frequência de Ressonância (f) = 1 / (2π * √(Indutância (L) * Capacitância (C)))</p>
      `
      break
    case 'compensacao-fator-potencia':
      explanation = `
        <p>A compensação do fator de potência é usada para calcular a quantidade de capacitância necessária para corrigir o fator de potência de um sistema elétrico. A fórmula é:</p>
        <p>Capacitância Necessária (C) = Potência Reativa (Q) / (2π * Frequência (f) * Tensão^2 (V^2))</p>
      `
      break
    case 'calculo-potencia-reativa':
      explanation = `
        <p>O cálculo da potência reativa é usado para determinar a potência que oscila entre o gerador e o campo magnético em um circuito AC. A fórmula é:</p>
        <p>Potência Reativa (Q) = Tensão (V) * Corrente (I) * sen(φ)</p>
      `
      break
    case 'determinacao-capacidade-conducao-condutores':
      explanation = `
        <p>A determinação da capacidade de condução dos condutores é usada para calcular a corrente máxima que um condutor pode transportar sem sobreaquecer. A fórmula é baseada em normas e fatores de correção específicos.</p>
      `
      break
    case 'corrente-rms-circuitos-ac':
      explanation = `
        <p>O cálculo da corrente RMS (Root Mean Square) em circuitos AC é usado para determinar o valor eficaz da corrente. A fórmula é:</p>
        <p>Corrente RMS (Irms) = Corrente de Pico (Ipeak) / √2</p>
      `
      break
    case 'avaliacao-queda-tensao-linhas-distribuicao':
      explanation = `
        <p>A avaliação da queda de tensão em linhas de distribuição é usada para determinar a queda de tensão ao longo de uma linha de transmissão de energia elétrica. A fórmula é:</p>
        <p>Queda de Tensão (ΔV) = Corrente (I) * Resistência (R) * Comprimento (L)</p>
      `
      break
    case 'calculo-capacitores-correcao-fator-potencia':
      explanation = `
        <p>O cálculo dos capacitores para correção do fator de potência é usado para determinar a quantidade de capacitância necessária para melhorar o fator de potência de um sistema. A fórmula é:</p>
        <p>Capacitância Necessária (C) = Potência Reativa Atual (Q) * (1 - Fator de Potência Atual / Fator de Potência Desejado) / (2π * Frequência (f) * Tensão^2 (V^2))</p>
      `
      break
    case 'calculo-temperatura-condutores':
      explanation = `
        <p>O cálculo da temperatura dos condutores é usado para determinar a temperatura de operação de um condutor com base na corrente e na resistência. A fórmula é:</p>
        <p>Temperatura (T) = Corrente (I) * Comprimento (L) / 58 (constante para condutores de alumínio)</p>
      `
      break
    case 'determinacao-resistencia-equivalente-circuitos-paralelo':
      explanation = `
        <p>A determinação da resistência equivalente em circuitos paralelo é usada para calcular a resistência total de um circuito com resistores em paralelo. A fórmula é:</p>
        <p>1 / Resistência Equivalente (R) = 1 / R1 + 1 / R2 + ... + 1 / Rn</p>
      `
      break
    case 'calculo-consumo-energia':
      explanation = `
        <p>O cálculo do consumo de energia é usado para determinar a quantidade de energia consumida por um dispositivo elétrico ao longo do tempo. A fórmula é:</p>
        <p>Consumo de Energia (E) = Potência (P) * Tempo (t) / 1000 (para converter W para kWh)</p>
      `
      break
    case 'calculo-perda-energia-motores':
      explanation = `
        <p>O cálculo da perda de energia em motores é usado para determinar a quantidade de energia perdida devido à ineficiência de um motor. A fórmula é:</p>
        <p>Perda de Energia (P) = Potência (P) * (1 - Eficiência (η) / 100)</p>
      `
      break
    case 'calculo-capacitancia-total-serie':
      explanation = `
        <p>O cálculo da capacitância total em série é usado para determinar a capacitância equivalente de capacitores conectados em série. A fórmula é:</p>
        <p>1 / Capacitância Equivalente (C) = 1 / C1 + 1 / C2 + ... + 1 / Cn</p>
      `
      break
    case 'calculo-capacitancia-total-paralelo':
      explanation = `
        <p>O cálculo da capacitância total em paralelo é usado para determinar a capacitância equivalente de capacitores conectados em paralelo. A fórmula é:</p>
        <p>Capacitância Equivalente (C) = C1 + C2 + ... + Cn</p>
      `
      break
    case 'calculo-pico-corrente-circuitos-indutivos':
      explanation = `
        <p>O cálculo do pico de corrente em circuitos indutivos é usado para determinar a corrente máxima em um circuito com um indutor. A fórmula é:</p>
        <p>Pico de Corrente (Ipeak) = Voltagem (V) / Resistência (R)</p>
      `
      break
    case 'queda-tensao-condutores':
      explanation = `
        <p>O cálculo da queda de tensão em condutores é usado para determinar a queda de tensão ao longo de um condutor devido à resistência ao transportar corrente. A fórmula é:</p>
        <p>Queda de Tensão (ΔV) = Corrente (I) * Comprimento (L) / 58 (constante para condutores de alumínio)</p>
      `
      break
    case 'calculo-eficiencia-transformadores':
      explanation = `
        <p>O cálculo da eficiência de transformadores é usado para determinar a eficiência de um transformador ao converter energia. A fórmula é:</p>
        <p>Eficiência (η) = (Potência de Saída (Pout) / Potência de Entrada (Pin)) * 100</p>
      `
      break
    case 'calculo-autotransformadores':
      explanation = `
        <p>O cálculo de autotransformadores é usado para determinar a potência em um autotransformador com base nas tensões primária e secundária. A fórmula é:</p>
        <p>Autotransformador (VA) = Potência (P) * (Tensão Secundária (Vs) / Tensão Primária (Vp))</p>
      `
      break
    case 'tempo-estabilizacao-controle':
      explanation = `
        <p>O cálculo do tempo de estabilização no controle é usado para determinar o tempo necessário para que uma variável de controle atinja um valor estável após uma mudança. A fórmula é:</p>
        <p>Tempo de Estabilização (ts) = -Tempo de Resposta (tr) / ln(Percentual de Overshoot (OS) / 100)</p>
      `
      break
    case 'resistor-protecao-leds':
      explanation = `
        <p>O cálculo do resistor de proteção para LEDs é usado para determinar o valor do resistor necessário para limitar a corrente através de um LED. A fórmula é:</p>
        <p>Resistor (R) = (Tensão da Fonte (Vf) - Tensão do LED (Vled)) / Corrente do LED (Iled)</p>
      `
      break
    default:
      explanation = 'Operação não suportada'
  }

  explanationText.innerHTML = explanation
}

document.getElementById('showExplanation').addEventListener('click', () => {
  const selectedOperation = operationSelect.value
  showExplanation(selectedOperation)
})
updateInputFields()
