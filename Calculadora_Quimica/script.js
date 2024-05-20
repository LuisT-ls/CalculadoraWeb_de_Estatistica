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
    case 'conversaoUnidades':
      addInputField('valor', 'Valor:')
      addInputField('unidadeOrigem', 'Unidade de Origem:')
      addInputField('unidadeDestino', 'Unidade de Destino:')
      break
    case 'calculosestequiometricos':
      addInputField('massaReagente', 'Massa do Reagente:')
      addInputField('massaProduto', 'Massa do Produto:')
      break
    case 'massaMolar':
      addInputField('formulaQuimica', 'Fórmula Química:')
      break
    case 'concentracaoSolucoes':
      addInputField('massaSoluto', 'Massa do Soluto:')
      addInputField('volumeSolucao', 'Volume da Solução:')
      break
    case 'diluicaoSolucoes':
      addInputField('concentracaoInicial', 'Concentração Inicial:')
      addInputField('volumeInicial', 'Volume Inicial:')
      addInputField('volumeFinal', 'Volume Final:')
      break
    case 'reacoesQuimicas':
      addInputField('equacaoReacao', 'Equação da Reação:')
      break
    case 'balanceamentoEquacoesQuimicas':
      addInputField('equacaoNaoBalanceada', 'Equação Não Balanceada:')
      break
    case 'leiBoyleCharlesGayLussac':
      addInputField('pressaoInicial', 'Pressão Inicial:')
      addInputField('volumeInicial', 'Volume Inicial:')
      addInputField('temperaturaInicial', 'Temperatura Inicial:')
      addInputField('pressaoFinal', 'Pressão Final:')
      addInputField('volumeFinal', 'Volume Final:')
      addInputField('temperaturaFinal', 'Temperatura Final:')
      break
    case 'solucoesTampao':
      addInputField('concentracaoAcido', 'Concentração do Ácido:')
      addInputField('concentracaoBase', 'Concentração da Base:')
      break
    case 'constantesQuimicas':
      addInputField('constanteEquilibrio', 'Constante de Equilíbrio:')
      break
    case 'temperaturaPressaoPadrao':
      addInputField('temperatura', 'Temperatura:')
      addInputField('pressao', 'Pressão:')
      break
    case 'equilibrioQuimico':
      addInputField('equacaoEquilibrio', 'Equação de Equilíbrio:')
      break
    case 'leiLambertBeer':
      addInputField('absorbancia', 'Absorbância:')
      addInputField('concentracao', 'Concentração:')
      addInputField('caminhoOptico', 'Caminho Óptico:')
      break
    case 'cineticaQuimica':
      addInputField('concentracaoInicial', 'Concentração Inicial:')
      addInputField('tempoReacao', 'Tempo de Reação:')
      break
    case 'equacaoNernst':
      addInputField('potencialPadrao', 'Potencial Padrão:')
      addInputField('concentracaoIons', 'Concentração de Íons:')
      break
    case 'constanteEquilibrioPressaoParcial':
      addInputField('pressaoReagentes', 'Pressão dos Reagentes:')
      addInputField('pressaoProdutos', 'Pressão dos Produtos:')
      break
    case 'misturaGases':
      addInputField('volumeGas1', 'Volume do Gás 1:')
      addInputField('volumeGas2', 'Volume do Gás 2:')
      break
    case 'numeroOxidacao':
      addInputField('formulaQuimica', 'Fórmula Química:')
      break
    case 'teoriaColisoes':
      addInputField('concentracaoReagentes', 'Concentração dos Reagentes:')
      addInputField('temperatura', 'Temperatura:')
      break
    case 'conversoesTemperatura':
      addInputField('temperaturaOrigem', 'Temperatura de Origem:')
      addInputField('escalaOrigem', 'Escala de Origem:')
      addInputField('escalaDestino', 'Escala de Destino:')
      break
    case 'solucoesNaoIdeais':
      addInputField('composicaoSolucao', 'Composição da Solução:')
      addInputField('temperatura', 'Temperatura:')
      break
    case 'rendimentoReacao':
      addInputField('rendimentoTeorico', 'Rendimento Teórico:')
      addInputField('rendimentoPratico', 'Rendimento Prático:')
      break
    case 'equacoesTermoquimicas':
      addInputField('equacaoTermoquimica', 'Equação Termoquímica:')
      break
    default:
      break
  }
}

function addInputField(id, label) {
  const fieldDiv = document.createElement('div')
  fieldDiv.innerHTML = `
    <label for="${id}">${label}</label>
    <input type="number" id="${id}">
  `
  inputFields.appendChild(fieldDiv)
}

function calculateResult() {
  const selectedOperation = operationSelect.value
  let result = 0
  let formattedResult = ''

  const inputMappings = {
    conversaoUnidades: ['valor', 'unidadeOrigem', 'unidadeDestino'],
    calculosestequiometricos: ['massaReagente', 'massaProduto'],
    massaMolar: ['formulaQuimica'],
    concentracaoSolucoes: ['massaSoluto', 'volumeSolucao'],
    diluicaoSolucoes: ['concentracaoInicial', 'volumeInicial', 'volumeFinal'],
    reacoesQuimicas: ['equacaoReacao'],
    balanceamentoEquacoesQuimicas: ['equacaoNaoBalanceada'],
    leiBoyleCharlesGayLussac: [
      'pressaoInicial',
      'volumeInicial',
      'temperaturaInicial',
      'pressaoFinal',
      'volumeFinal',
      'temperaturaFinal'
    ],
    solucoesTampao: ['concentracaoAcido', 'concentracaoBase'],
    constantesQuimicas: ['constanteEquilibrio'],
    temperaturaPressaoPadrao: ['temperatura', 'pressao'],
    equilibrioQuimico: ['equacaoEquilibrio'],
    leiLambertBeer: ['absorbancia', 'concentracao', 'caminhoOptico'],
    cineticaQuimica: ['concentracaoInicial', 'tempoReacao'],
    equacaoNernst: ['potencialPadrao', 'concentracaoIons'],
    constanteEquilibrioPressaoParcial: ['pressaoReagentes', 'pressaoProdutos'],
    misturaGases: ['volumeGas1', 'volumeGas2'],
    numeroOxidacao: ['formulaQuimica'],
    teoriaColisoes: ['concentracaoReagentes', 'temperatura'],
    conversoesTemperatura: [
      'temperaturaOrigem',
      'escalaOrigem',
      'escalaDestino'
    ],
    solucoesNaoIdeais: ['composicaoSolucao', 'temperatura'],
    rendimentoReacao: ['rendimentoTeorico', 'rendimentoPratico'],
    equacoesTermoquimicas: ['equacaoTermoquimica']
  }

  const inputValues = {}

  inputMappings[selectedOperation].forEach(field => {
    inputValues[field] = parseFloat(document.getElementById(field).value)
  })

  switch (selectedOperation) {
    case 'conversaoUnidades':
      result = convertUnits(
        inputValues.valor,
        inputValues.unidadeOrigem,
        inputValues.unidadeDestino
      )
      formattedResult = `${result} ${inputValues.unidadeDestino}`
      break

    case 'calculosestequiometricos':
      result = calculateStoichiometry(
        inputValues.massaReagente,
        inputValues.massaProduto
      )
      formattedResult = `${result} g`
      break

    case 'massaMolar':
      result = calculateMolarMass(inputValues.formulaQuimica)
      formattedResult = `${result} g/mol`
      break

    case 'concentracaoSolucoes':
      result = calculateSolutionConcentration(
        inputValues.massaSoluto,
        inputValues.volumeSolucao
      )
      formattedResult = `${result} g/L`
      break

    case 'diluicaoSolucoes':
      result = diluteSolution(
        inputValues.concentracaoInicial,
        inputValues.volumeInicial,
        inputValues.volumeFinal
      )
      formattedResult = `${result} g/L`
      break

    case 'reacoesQuimicas':
      result = calculateChemicalReaction(inputValues.equacaoReacao)
      formattedResult = result
      break

    case 'balanceamentoEquacoesQuimicas':
      result = balanceChemicalEquation(inputValues.equacaoNaoBalanceada)
      formattedResult = result
      break

    case 'leiBoyleCharlesGayLussac':
      result = calculateBoyleCharlesGayLussac(
        inputValues.pressaoInicial,
        inputValues.volumeInicial,
        inputValues.temperaturaInicial,
        inputValues.pressaoFinal,
        inputValues.volumeFinal,
        inputValues.temperaturaFinal
      )
      formattedResult = `${result} L`
      break

    case 'solucoesTampao':
      result = calculateBufferSolution(
        inputValues.concentracaoAcido,
        inputValues.concentracaoBase
      )
      formattedResult = `${result} g/L`
      break

    case 'constantesQuimicas':
      result = calculateEquilibriumConstant(inputValues.constanteEquilibrio)
      formattedResult = result
      break

    case 'temperaturaPressaoPadrao':
      result = calculateStandardPressureTemperature(
        inputValues.temperatura,
        inputValues.pressao
      )
      formattedResult = `${result} atm`
      break

    case 'equilibrioQuimico':
      result = calculateChemicalEquilibrium(inputValues.equacaoEquilibrio)
      formattedResult = result
      break

    case 'leiLambertBeer':
      result = calculateLambertBeer(
        inputValues.absorbancia,
        inputValues.concentracao,
        inputValues.caminhoOptico
      )
      formattedResult = result
      break

    case 'cineticaQuimica':
      result = calculateChemicalKinetics(
        inputValues.concentracaoInicial,
        inputValues.tempoReacao
      )
      formattedResult = `${result} mol/L`
      break

    case 'equacaoNernst':
      result = calculateNernstEquation(
        inputValues.potencialPadrao,
        inputValues.concentracaoIons
      )
      formattedResult = `${result} V`
      break

    case 'constanteEquilibrioPressaoParcial':
      result = calculatePartialPressureEquilibriumConstant(
        inputValues.pressaoReagentes,
        inputValues.pressaoProdutos
      )
      formattedResult = result
      break

    case 'misturaGases':
      result = calculateGasMixture(
        inputValues.volumeGas1,
        inputValues.volumeGas2
      )
      formattedResult = `${result} L`
      break

    case 'numeroOxidacao':
      result = calculateOxidationNumber(inputValues.formulaQuimica)
      formattedResult = result
      break

    case 'teoriaColisoes':
      result = calculateCollisionTheory(
        inputValues.concentracaoReagentes,
        inputValues.temperatura
      )
      formattedResult = result
      break

    case 'conversoesTemperatura':
      result = convertTemperature(
        inputValues.temperaturaOrigem,
        inputValues.escalaOrigem,
        inputValues.escalaDestino
      )
      formattedResult = `${result}°`
      break

    case 'solucoesNaoIdeais':
      result = calculateNonIdealSolutions(
        inputValues.composicaoSolucao,
        inputValues.temperatura
      )
      formattedResult = `${result} atm`
      break

    case 'rendimentoReacao':
      result = calculateReactionYield(
        inputValues.rendimentoTeorico,
        inputValues.rendimentoPratico
      )
      formattedResult = `${result} %`
      break

    case 'equacoesTermoquimicas':
      result = calculateThermochemicalEquations(inputValues.equacaoTermoquimica)
      formattedResult = result
      break

    default:
      formattedResult = 'Operação inválida'
  }

  resultDiv.textContent = formattedResult
}

function formatCurrency(amount) {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}
