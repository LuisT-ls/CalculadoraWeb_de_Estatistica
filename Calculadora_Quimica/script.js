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
      const unidadesOrigem = ['g', 'mol', 'L']
      const unidadesDestino = ['g', 'mol', 'L']
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

function formatCurrency(amount) {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

function calculateResult() {
  const selectedOperation = operationSelect.value
  let result = ''

  switch (selectedOperation) {
    case 'conversaoUnidades':
      const valor = parseFloat(document.getElementById('valor').value)
      const unidadeOrigem = document.getElementById('unidadeOrigem').value
      const unidadeDestino = document.getElementById('unidadeDestino').value
      result = convertUnits(valor, unidadeOrigem, unidadeDestino)
      break
    case 'calculosestequiometricos':
      const massaReagente = parseFloat(
        document.getElementById('massaReagente').value
      )
      const massaProduto = parseFloat(
        document.getElementById('massaProduto').value
      )
      result = calculateStoichiometry(massaReagente, massaProduto)
      break
    case 'massaMolar':
      const formulaQuimica = document.getElementById('formulaQuimica').value
      result = calculateMolarMass(formulaQuimica)
      break
    case 'reacoesQuimicas':
      const equacaoReacao = document.getElementById('equacaoReacao').value
      result = calculateReaction(equacaoReacao)
      break
    case 'balanceamentoEquacoesQuimicas':
      const equacaoNaoBalanceada = document.getElementById(
        'equacaoNaoBalanceada'
      ).value
      result = balanceChemicalEquation(equacaoNaoBalanceada)
      break
    case 'leiBoyleCharlesGayLussac':
      const pressaoInicial = parseFloat(
        document.getElementById('pressaoInicial').value
      )
      const volumeInicial = parseFloat(
        document.getElementById('volumeInicial').value
      )
      const temperaturaInicial = parseFloat(
        document.getElementById('temperaturaInicial').value
      )
      const pressaoFinal = parseFloat(
        document.getElementById('pressaoFinal').value
      )
      const volumeFinal = parseFloat(
        document.getElementById('volumeFinal').value
      )
      const temperaturaFinal = parseFloat(
        document.getElementById('temperaturaFinal').value
      )
      result = calculateGasLaw(
        pressaoInicial,
        volumeInicial,
        temperaturaInicial,
        pressaoFinal,
        volumeFinal,
        temperaturaFinal
      )
      break
    case 'constantesQuimicas':
      const constanteEquilibrio = parseFloat(
        document.getElementById('constanteEquilibrio').value
      )
      result = calculateChemicalConstants(constanteEquilibrio)
      break
    case 'temperaturaPressaoPadrao':
      const temperatura = parseFloat(
        document.getElementById('temperatura').value
      )
      const pressao = parseFloat(document.getElementById('pressao').value)
      result = calculateStandardConditions(temperatura, pressao)
      break
    case 'equilibrioQuimico':
      // Calculate chemical equilibrium based on input values
      result = calculateChemicalEquilibrium()
      break
    case 'leiLambertBeer':
      const absorbancia = parseFloat(
        document.getElementById('absorbancia').value
      )
      const concentracao = parseFloat(
        document.getElementById('concentracao').value
      )
      const caminhoOptico = parseFloat(
        document.getElementById('caminhoOptico').value
      )
      result = calculateLambertBeerLaw(absorbancia, concentracao, caminhoOptico)
      break
    case 'cineticaQuimica':
      const concentracaoInicialCin = parseFloat(
        document.getElementById('concentracaoInicial').value
      )
      const tempoReacao = parseFloat(
        document.getElementById('tempoReacao').value
      )
      result = calculateChemicalKinetics(concentracaoInicialCin, tempoReacao)
      break
    case 'equacaoNernst':
      const potencialPadrao = parseFloat(
        document.getElementById('potencialPadrao').value
      )
      const concentracaoIons = parseFloat(
        document.getElementById('concentracaoIons').value
      )
      result = calculateNernstEquation(potencialPadrao, concentracaoIons)
      break
    case 'constanteEquilibrioPressaoParcial':
      const pressaoReagentes = parseFloat(
        document.getElementById('pressaoReagentes').value
      )
      const pressaoProdutos = parseFloat(
        document.getElementById('pressaoProdutos').value
      )
      result = calculatePartialPressureEquilibrium(
        pressaoReagentes,
        pressaoProdutos
      )
      break
    case 'misturaGases':
      const volumeGas1 = parseFloat(document.getElementById('volumeGas1').value)
      const volumeGas2 = parseFloat(document.getElementById('volumeGas2').value)
      result = calculateGasMixture(volumeGas1, volumeGas2)
      break
    case 'numeroOxidacao':
      const formulaQuimicaNO = document.getElementById('formulaQuimica').value
      result = calculateOxidationNumber(formulaQuimicaNO)
      break
    case 'teoriaColisoes':
      const concentracaoReagentes = parseFloat(
        document.getElementById('concentracaoReagentes').value
      )
      const temperaturaColisoes = parseFloat(
        document.getElementById('temperatura').value
      )
      result = calculateCollisionTheory(
        concentracaoReagentes,
        temperaturaColisoes
      )
      break
    case 'conversoesTemperatura':
      const temperaturaOrigem = parseFloat(
        document.getElementById('temperaturaOrigem').value
      )
      const escalaOrigem = document.getElementById('escalaOrigem').value
      const escalaDestino = document.getElementById('escalaDestino').value
      result = convertTemperature(
        temperaturaOrigem,
        escalaOrigem,
        escalaDestino
      )
      break
    case 'solucoesNaoIdeais':
      const composicaoSolucao = parseFloat(
        document.getElementById('composicaoSolucao').value
      )
      const temperaturaSolucao = parseFloat(
        document.getElementById('temperatura').value
      )
      result = calculateNonIdealSolutions(composicaoSolucao, temperaturaSolucao)
      break
    case 'rendimentoReacao':
      const rendimentoTeorico = parseFloat(
        document.getElementById('rendimentoTeorico').value
      )
      const rendimentoPratico = parseFloat(
        document.getElementById('rendimentoPratico').value
      )
      result = calculateReactionYield(rendimentoTeorico, rendimentoPratico)
      break
    case 'equacoesTermoquimicas':
      const equacaoTermoquimica = document.getElementById(
        'equacaoTermoquimica'
      ).value
      result = calculateThermochemicalEquations(equacaoTermoquimica)
      break
    case 'solucoesTampao':
      // Calculation logic for Soluções Tampão
      const concentrationAcid = parseFloat(
        document.getElementById('concentrationAcid').value
      )
      const concentrationBase = parseFloat(
        document.getElementById('concentrationBase').value
      )
      result = calculateBufferSolution(concentrationAcid, concentrationBase)
      break
    default:
      result = 'Nenhum cálculo realizado para a operação selecionada'
      break
  }

  resultDiv.textContent = result
}

function addDropdown(id, label, options) {
  const fieldDiv = document.createElement('div')
  const dropdown = document.createElement('select')
  dropdown.id = id
  options.forEach(option => {
    const optionElement = document.createElement('option')
    optionElement.value = option
    optionElement.textContent = option
    dropdown.appendChild(optionElement)
  })
  fieldDiv.innerHTML = `
    <label for="${id}">${label}</label>
  `
  fieldDiv.appendChild(dropdown)
  inputFields.appendChild(fieldDiv)
}

function convertUnits(value, unitFrom, unitTo) {
  let result = 0
  switch (unitFrom) {
    case 'g':
      if (unitTo === 'mol') {
        result = value / 18.01528
      } else if (unitTo === 'L') {
        result = value / 1000
      }
      break
    case 'mol':
      if (unitTo === 'g') {
        result = value * 18.01528
      } else if (unitTo === 'L') {
        result = value / 55.55
      }
      break
    case 'L':
      if (unitTo === 'g') {
        result = value * 1000
      } else if (unitTo === 'mol') {
        result = value * 55.55
      }
      break
    default:
      result = 'Conversão de unidades não suportada'
      break
  }
  return result
}

function calculateStoichiometry(massReactant, massProduct) {
  const stoichiometry = massProduct / massReactant
  return `A relação estequiométrica entre os reagentes e produtos é de ${stoichiometry}`
}

function calculateMolarMass(chemicalFormula) {
  const atomicMasses = {
    H: 1.008,
    He: 4.0026,
    Li: 6.94,
    Be: 9.0122,
    B: 10.81,
    C: 12.011,
    N: 14.007,
    O: 15.999,
    F: 18.998,
    Ne: 20.18,
    Na: 22.99,
    Mg: 24.305,
    Al: 26.982,
    Si: 28.085,
    P: 30.974,
    S: 32.06,
    Cl: 35.45,
    K: 39.098,
    Ar: 39.948,
    Ca: 40.078,
    Sc: 44.956,
    Ti: 47.867,
    V: 50.942,
    Cr: 51.996,
    Mn: 54.938,
    Fe: 55.845,
    Ni: 58.693,
    Co: 58.933,
    Cu: 63.546,
    Zn: 65.38,
    Ga: 69.723,
    Ge: 72.63,
    As: 74.922,
    Se: 78.971,
    Br: 79.904,
    Kr: 83.798,
    Rb: 85.468,
    Sr: 87.62,
    Y: 88.906,
    Zr: 91.224,
    Nb: 92.906,
    Mo: 95.95,
    Tc: 98,
    Ru: 101.07,
    Rh: 102.91,
    Pd: 106.42,
    Ag: 107.87,
    Cd: 112.41,
    In: 114.82,
    Sn: 118.71,
    Sb: 121.76,
    I: 126.9,
    Te: 127.6,
    Xe: 131.29,
    Cs: 132.91,
    Ba: 137.33,
    La: 138.91,
    Ce: 140.12,
    Pr: 140.91,
    Nd: 144.24,
    Pm: 145,
    Sm: 150.36,
    Eu: 151.96,
    Gd: 157.25,
    Tb: 158.93,
    Dy: 162.5,
    Ho: 164.93,
    Er: 167.26,
    Tm: 168.93,
    Yb: 173.05,
    Lu: 174.97,
    Hf: 178.49,
    Ta: 180.95,
    W: 183.84,
    Re: 186.21,
    Os: 190.23,
    Ir: 192.22,
    Pt: 195.08,
    Au: 196.97,
    Hg: 200.59,
    Tl: 204.38,
    Pb: 207.2,
    Bi: 208.98,
    Th: 232.04,
    Pa: 231.04,
    U: 238.03,
    Np: 237,
    Pu: 244,
    Am: 243,
    Cm: 247,
    Bk: 247,
    Cf: 251,
    Es: 252,
    Fm: 257,
    Md: 258,
    No: 259,
    Lr: 262,
    Rf: 267,
    Db: 270,
    Sg: 271,
    Bh: 270,
    Hs: 277,
    Mt: 276,
    Ds: 281,
    Rg: 280,
    Cn: 285,
    Nh: 284,
    Fl: 289,
    Mc: 288,
    Lv: 293,
    Ts: 294,
    Og: 294
  }

  let molarMass = 0
  for (let i = 0; i < chemicalFormula.length; i++) {
    const element = chemicalFormula[i]
    let count = ''
    while (i + 1 < chemicalFormula.length && !isNaN(chemicalFormula[i + 1])) {
      count += chemicalFormula[i + 1]
      i++
    }
    count = count === '' ? 1 : parseInt(count)
    molarMass += atomicMasses[element] * count
  }

  return molarMass
}

function calculateConcentration(mass, volume) {
  const concentration = mass / volume
  return `A concentração da solução é ${concentration} g/L`
}

function calculateDilution(initialConcentration, initialVolume, finalVolume) {
  const finalConcentration =
    initialConcentration * (initialVolume / finalVolume)
  return `A concentração final da solução é ${finalConcentration} mol/L`
}

function calculateReaction(equation) {
  const reactants = equation.split('->')[0].split('+')
  const products = equation.split('->')[1].split('+')
  const reactantMolarMass = reactants
    .map(reactant => calculateMolarMass(reactant))
    .reduce((acc, mass) => acc + mass, 0)
  const productMolarMass = products
    .map(product => calculateMolarMass(product))
    .reduce((acc, mass) => acc + mass, 0)
  return `A massa molar dos reagentes é ${reactantMolarMass} g/mol e dos produtos é ${productMolarMass} g/mol`
}

function balanceChemicalEquation(unbalancedEquation) {
  const equation = unbalancedEquation.split('->')
  const reactants = equation[0].split('+')
  const products = equation[1].split('+')
  const reactantElements = {}
  const productElements = {}
  const elements = new Set()
  const coefficients = { reactants: [], products: [] }
  reactants.forEach(reactant => {
    const element = reactant.trim().match(/[A-Z][a-z]*/g)
    element.forEach(el => {
      const count = reactant.trim().match(/\d+/g)
      reactantElements[el] = count ? parseInt(count) : 1
      elements.add(el)
    })
  })
  products.forEach(product => {
    const element = product.trim().match(/[A-Z][a-z]*/g)
    element.forEach(el => {
      const count = product.trim().match(/\d+/g)
      productElements[el] = count ? parseInt(count) : 1
      elements.add(el)
    })
  })
  const matrix = []
  elements.forEach(el => {
    const row = []
    reactants.forEach(reactant => {
      const count = reactantElements[el] || 0
      row.push(-count)
    })
    products.forEach(product => {
      const count = productElements[el] || 0
      row.push(count)
    })
    matrix.push(row)
  })
  const coefficientsMatrix = math.matrix(matrix)
  const constants = math.zeros(matrix.length)
  const solutions = math.lusolve(coefficientsMatrix, constants)
  for (let i = 0; i < reactants.length; i++) {
    coefficients.reactants.push(solutions[i][0])
  }
  for (let i = reactants.length; i < solutions.length; i++) {
    coefficients.products.push(solutions[i][0])
  }
  return `Equação balanceada: ${reactants
    .map((reactant, i) => `${coefficients.reactants[i]} ${reactant}`)
    .join(' + ')} -> ${products
    .map((product, i) => `${coefficients.products[i]} ${product}`)
    .join(' + ')}`.replace(/1 /g, '')
}

function calculateGasLaw(
  initialPressure,
  initialVolume,
  initialTemperature,
  finalPressure,
  finalVolume,
  finalTemperature
) {
  const R = 0.0821
  let result = ''
  if (initialPressure && initialVolume && initialTemperature) {
    if (finalPressure && finalVolume && finalTemperature) {
      const initialMoles =
        (initialPressure * initialVolume) / (R * initialTemperature)
      const finalMoles = (finalPressure * finalVolume) / (R * finalTemperature)
      result = `O número de mols iniciais é ${initialMoles} e o número de mols finais é ${finalMoles}`
    } else {
      result = 'Favor preencher todos os campos para cálculo'
    }
  } else {
    result = 'Favor preencher todos os campos para cálculo'
  }
  return result
}

function calculateChemicalConstants(equilibriumConstant) {
  const constants = { Kc: '', Kp: '', Kf: '', Ka: '', Kb: '', Kw: '' }
  const result =
    equilibriumConstant === 0
      ? 'Constante de equilíbrio inválida'
      : equilibriumConstant === 1
      ? 'Constante de equilíbrio igual a 1'
      : equilibriumConstant > 1
      ? 'Constante de equilíbrio maior que 1'
      : 'Constante de equilíbrio menor que 1'
  constants.Kc = equilibriumConstant
  constants.Kp = equilibriumConstant
  constants.Kf = equilibriumConstant
  constants.Ka = equilibriumConstant
  constants.Kb = equilibriumConstant
  constants.Kw = equilibriumConstant
  return result
}

function calculateStandardConditions(temperature, pressure) {
  const standardConditions = { temperature: 273.15, pressure: 1 }
  const result =
    temperature === standardConditions.temperature &&
    pressure === standardConditions.pressure
      ? 'Condições padrão'
      : 'Condições não padrão'
  return result
}

function calculateChemicalEquilibrium() {
  // Calculate chemical equilibrium based on input values
  return 'Cálculo de equilíbrio químico'
}

function calculateLambertBeerLaw(absorbance, concentration, opticalPath) {
  const molarAbsorptivity = absorbance / (concentration * opticalPath)
  return `A absortividade molar é ${molarAbsorptivity} L/(mol*cm)`
}

function calculateChemicalKinetics(initialConcentration, reactionTime) {
  const rateConstant = initialConcentration / reactionTime
  return `A constante de velocidade da reação é ${rateConstant} mol/L*s`
}

function calculateNernstEquation(standardPotential, ionConcentration) {
  const R = 8.314
  const temperature = 298
  const nernstPotential =
    standardPotential - ((R * temperature) / 2.303) * Math.log(ionConcentration) // Corrige a fórmula
  return `O potencial de Nernst é ${nernstPotential} V`
}

function calculatePartialPressureEquilibrium(
  pressureReactants,
  pressureProducts
) {
  const equilibriumConstant = pressureProducts / pressureReactants
  return `A constante de equilíbrio de pressão parcial é ${equilibriumConstant}`
}

function calculateGasMixture(volumeGas1, volumeGas2) {
  const totalVolume = volumeGas1 + volumeGas2
  const partialPressureGas1 = (volumeGas1 / totalVolume) * 1
  const partialPressureGas2 = (volumeGas2 / totalVolume) * 1
  return `A pressão parcial do gás 1 é ${partialPressureGas1} atm e do gás 2 é ${partialPressureGas2} atm`
}

function calculateOxidationNumber(chemicalFormula) {
  const oxidationNumbers = {
    H: 1,
    O: -2,
    F: -1,
    Na: 1,
    Mg: 2,
    Al: 3,
    Si: 4,
    P: 5,
    S: 6,
    Cl: -1,
    K: 1,
    Ca: 2,
    Cr: 6,
    Mn: 7,
    Fe: 3,
    Co: 3,
    Ni: 2,
    Cu: 2,
    Zn: 2,
    Br: -1,
    Ag: 1,
    I: -1,
    Ba: 2,
    Hg: 2,
    Pb: 2
  }

  let oxidationNumber = 0
  for (let i = 0; i < chemicalFormula.length; i++) {
    const element = chemicalFormula[i]
    let count = ''
    while (i + 1 < chemicalFormula.length && !isNaN(chemicalFormula[i + 1])) {
      count += chemicalFormula[i + 1]
      i++
    }
    count = count === '' ? 1 : parseInt(count)
    oxidationNumber += oxidationNumbers[element] * count
  }

  return oxidationNumber
}

function calculateCollisionTheory(reactantConcentration, temperature) {
  const collisionFrequency =
    reactantConcentration * Math.sqrt((8 * 8.314 * temperature) / Math.PI)
  return `A frequência de colisão é ${collisionFrequency} colisões/s`
}

function convertTemperature(temperature, scaleFrom, scaleTo) {
  let convertedTemperature = 0
  if (scaleFrom === scaleTo) {
    convertedTemperature = temperature
  } else if (scaleFrom === 'C' && scaleTo === 'F') {
    convertedTemperature = (temperature * 9) / 5 + 32
  } else if (scaleFrom === 'F' && scaleTo === 'C') {
    convertedTemperature = ((temperature - 32) * 5) / 9
  } else if (scaleFrom === 'C' && scaleTo === 'K') {
    convertedTemperature = temperature + 273.15
  } else if (scaleFrom === 'K' && scaleTo === 'C') {
    convertedTemperature = temperature - 273.15
  } else if (scaleFrom === 'F' && scaleTo === 'K') {
    convertedTemperature = ((temperature - 32) * 5) / 9 + 273.15
  } else if (scaleFrom === 'K' && scaleTo === 'F') {
    convertedTemperature = ((temperature - 273.15) * 9) / 5 + 32
  } else {
    convertedTemperature = 'Conversão de temperatura não suportada'
  }

  return convertedTemperature
}

function calculateNonIdealSolutions(solutionComposition, solutionTemperature) {
  const nonIdealFactor = 1 + solutionComposition * solutionTemperature
  return `O fator de não idealidade é ${nonIdealFactor}`
}

function calculateReactionYield(theoreticalYield, practicalYield) {
  const reactionYield = (practicalYield / theoreticalYield) * 100
  return `O rendimento da reação é de ${reactionYield}%`
}

function calculateThermochemicalEquations(thermochemicalEquation) {
  const equation = thermochemicalEquation.split('->')
  const reactants = equation[0].split('+')
  const products = equation[1].split('+')
  const reactantEnthalpy = reactants
    .map(reactant => calculateMolarMass(reactant))
    .reduce((acc, mass) => acc + mass, 0)
  const productEnthalpy = products
    .map(product => calculateMolarMass(product))
    .reduce((acc, mass) => acc + mass, 0)
  return `A entalpia dos reagentes é ${reactantEnthalpy} kJ/mol e dos produtos é ${productEnthalpy} kJ/mol`
}

function calculateBufferSolution(acidConcentration, baseConcentration) {
  const pH =
    0.5 * (Math.log10(acidConcentration) - Math.log10(baseConcentration))
  return `O pH da solução tampão é ${pH}`
}

function showExplanation(selectedOperation) {
  let explanation = ''

  if (selectedOperation === 'conversaoUnidades') {
    explanation = `
      <p>A conversão de unidades é usada para transformar uma quantidade de uma unidade para outra. Por exemplo, você pode converter de gramas para moles, litros para mililitros, etc.</p>
      <p>A fórmula geral para a conversão de unidades depende dos tipos de unidades envolvidos.</p>
    `
  } else if (selectedOperation === 'calculosestequiometricos') {
    explanation = `
      <p>Os cálculos estequiométricos envolvem a relação entre as quantidades de reagentes e produtos em uma reação química. Isso inclui o cálculo da massa, volume ou quantidade de substâncias envolvidas.</p>
      <p>As proporções estequiométricas são determinadas pela estequiometria da equação química balanceada.</p>
    `
  } else if (selectedOperation === 'massaMolar') {
    explanation = `
      <p>A massa molar é a massa de uma molécula ou composto expressa em unidades de massa atômica unificada (u). É calculada somando-se as massas atômicas dos átomos constituintes de uma molécula ou fórmula química.</p>
      <p>A massa molar é uma propriedade física importante usada em muitos cálculos químicos, como na conversão de unidades de massa para quantidade de substância em moles.</p>
    `
  } else if (selectedOperation === 'concentracaoSolucoes') {
    explanation = `
      <p>A concentração de soluções é a quantidade de soluto presente em uma dada quantidade de solvente ou solução. Pode ser expressa de várias maneiras, incluindo molaridade, porcentagem em massa, fração molar, entre outras.</p>
      <p>É importante entender a concentração das soluções para preparar soluções com as propriedades desejadas e para realizar cálculos envolvendo reações químicas e equilíbrios.</p>
    `
  } else if (selectedOperation === 'diluicaoSolucoes') {
    explanation = `
      <p>A diluição de soluções é o processo de diminuir a concentração de uma solução adicionando mais solvente. Isso é feito para obter uma solução menos concentrada a partir de uma solução mais concentrada, sem alterar a quantidade total de soluto presente.</p>
      <p>A diluição é comumente usada em laboratórios para preparar soluções de concentração conhecida a partir de soluções mais concentradas.</p>
    `
  } else if (selectedOperation === 'reacoesQuimicas') {
    explanation = `
      <p>As reações químicas são processos nos quais as substâncias (reagentes) se transformam em novas substâncias (produtos) com diferentes propriedades químicas. As reações químicas são representadas por equações químicas balanceadas.</p>
      <p>É importante entender as reações químicas para prever os produtos de uma reação, determinar as quantidades de reagentes necessárias e avaliar a estequiometria da reação.</p>
    `
  } else if (selectedOperation === 'balanceamentoEquacoesQuimicas') {
    explanation = `
      <p>O balanceamento de equações químicas é o processo de ajustar os coeficientes das fórmulas químicas dos reagentes e produtos para garantir que o número de átomos de cada elemento seja o mesmo nos reagentes e nos produtos.</p>
      <p>As leis da conservação da massa e da conservação da carga elétrica exigem que as equações químicas estejam balanceadas.</p>
    `
  } else if (selectedOperation === 'leiBoyleCharlesGayLussac') {
    explanation = `
      <p>As leis de Boyle, Charles e Gay-Lussac são leis empíricas que descrevem o comportamento dos gases em diferentes condições de pressão, volume e temperatura.</p>
      <p>A lei de Boyle afirma que, a temperatura constante, o volume de uma quantidade fixa de gás é inversamente proporcional à sua pressão.</p>
      <p>A lei de Charles afirma que, a pressão constante, o volume de uma quantidade fixa de gás é diretamente proporcional à sua temperatura absoluta (em Kelvin).</p>
      <p>A lei de Gay-Lussac afirma que, o volume de uma quantidade fixa de gás, mantida a pressão constante, é diretamente proporcional à sua temperatura absoluta.</p>
    `
  } else if (selectedOperation === 'solucoesTampao') {
    explanation = `
      <p>As soluções tampão são soluções que resistem a mudanças significativas no pH quando ácidos ou bases são adicionados. Elas são compostas por um ácido fraco e seu conjugado de base fraca, ou uma base fraca e seu conjugado de ácido fraco.</p>
      <p>As soluções tampão são importantes em muitos processos biológicos e químicos nos quais é necessário manter um pH constante.</p>
    `
  } else if (selectedOperation === 'constantesQuimicas') {
    explanation = `
      <p>As constantes de equilíbrio são valores numéricos que descrevem a relação entre as concentrações de reagentes e produtos em uma reação química em equilíbrio. Elas são usadas para prever a direção e a extensão de uma reação química.</p>
      <p>As constantes de equilíbrio são determinadas pela estequiometria da reação e pelas concentrações dos reagentes e produtos em equilíbrio.</p>
    `
  } else if (selectedOperation === 'temperaturaPressaoPadrao') {
    explanation = `
      <p>A temperatura e a pressão padrão são condições de referência usadas em muitos cálculos químicos. A temperatura padrão é de 0°C (273,15 K) e a pressão padrão é de 1 atm (101,325 kPa).</p>
      <p>Essas condições são usadas para padronizar os cálculos e garantir a consistência nos resultados obtidos em diferentes experimentos e situações.</p>
    `
  } else if (selectedOperation === 'equilibrioQuimico') {
    explanation = `
      <p>O equilíbrio químico é um estado em que a taxa de formação de produtos em uma reação química é igual à taxa de formação de reagentes. Nesse estado, as concentrações de reagentes e produtos permanecem constantes ao longo do tempo.</p>
      <p>O equilíbrio químico é regido pela lei de ação das massas e pelas constantes de equilíbrio da reação.</p>
    `
  } else if (selectedOperation === 'leiLambertBeer') {
    explanation = `
      <p>A lei de Lambert-Beer descreve a relação entre a absorbância de uma solução, a concentração do soluto e o caminho óptico do feixe de luz que passa pela solução. É usada para determinar a concentração de uma solução desconhecida a partir de sua absorbância.</p>
      <p>A lei de Lambert-Beer é amplamente utilizada em espectrofotometria para quantificar a concentração de soluções coloridas ou opacas.</p>
    `
  } else if (selectedOperation === 'cineticaQuimica') {
    explanation = `
      <p>A cinética química é o estudo da velocidade das reações químicas e dos fatores que a influenciam. Ela descreve como a concentração dos reagentes e produtos muda ao longo do tempo.</p>
      <p>A cinética química é importante para entender a rapidez com que as reações ocorrem e para otimizar as condições de reação em processos industriais e laboratoriais.</p>
    `
  } else if (selectedOperation === 'equacaoNernst') {
    explanation = `
      <p>A equação de Nernst é uma equação que descreve a relação entre o potencial de um eletrodo e a concentração dos íons em solução. É usada para calcular o potencial de um eletrodo em condições não padrão.</p>
      <p>A equação de Nernst é importante em eletroquímica para prever o comportamento dos eletrodos em diferentes condições de concentração e temperatura.</p>
    `
  } else if (selectedOperation === 'constanteEquilibrioPressaoParcial') {
    explanation = `
      <p>A constante de equilíbrio de pressão parcial é uma constante que descreve a relação entre as pressões parciais dos reagentes e produtos em uma reação química gasosa em equilíbrio. É usada para prever a direção e a extensão da reação.</p>
      <p>A constante de equilíbrio de pressão parcial é determinada pela estequiometria da reação e pelas pressões parciais dos reagentes e produtos em equilíbrio.</p>
    `
  } else if (selectedOperation === 'misturaGases') {
    explanation = `
      <p>A mistura de gases é o resultado da combinação de dois ou mais gases em um recipiente. A pressão total da mistura é a soma das pressões parciais dos gases individuais, de acordo com a lei de Dalton.</p>
      <p>As misturas de gases são comuns em muitos processos químicos e físicos, como a atmosfera terrestre e os sistemas de ar condicionado.</p>
    `
  } else if (selectedOperation === 'numeroOxidacao') {
    explanation = `
      <p>O número de oxidação é um número que representa a carga real ou aparente de um átomo em um composto. Ele é usado para determinar como os elétrons são transferidos em uma reação química.</p>
      <p>O número de oxidação é importante para o balanceamento de equações químicas e para determinar a estequiometria das reações.</p>
    `
  } else if (selectedOperation === 'teoriaColisoes') {
    explanation = `
      <p>A teoria das colisões é uma teoria que descreve como as colisões entre moléculas levam à formação de produtos em uma reação química. Ela considera a energia cinética e a orientação das moléculas durante a colisão.</p>
      <p>A teoria das colisões é importante para entender a cinética das reações químicas e para otimizar as condições de reação em processos industriais e laboratoriais.</p>
    `
  } else if (selectedOperation === 'conversoesTemperatura') {
    explanation = `
      <p>As conversões de temperatura são usadas para transformar uma temperatura de uma escala para outra. Existem várias escalas de temperatura, como Celsius, Fahrenheit e Kelvin, que são usadas em diferentes contextos.</p>
      <p>As conversões de temperatura são importantes para garantir a consistência nos cálculos e medições de temperatura em diferentes sistemas e experimentos.</p>
    `
  } else if (selectedOperation === 'solucoesNaoIdeais') {
    explanation = `
      <p>As soluções não ideais são soluções que não seguem o comportamento ideal previsto pelas leis da termodinâmica. Elas podem exibir desvios da lei de Raoult ou da lei de Henry devido a interações intermoleculares específicas.</p>
      <p>As soluções não ideais são importantes em muitos processos químicos e físicos, como a formação de azeótropos e a separação de misturas.</p>
    `
  } else if (selectedOperation === 'rendimentoReacao') {
    explanation = `
      <p>O rendimento de uma reação é a quantidade de produto obtida em relação à quantidade teórica máxima que poderia ser obtida. É uma medida da eficiência da reação e pode ser expresso como uma porcentagem.</p>
      <p>O rendimento de uma reação depende de vários fatores, como a pureza dos reagentes, as condições de reação e a estequiometria da equação química.</p>
    `
  } else if (selectedOperation === 'equacoesTermoquimicas') {
    explanation = `
      <p>As equações termoquímicas são equações químicas que incluem informações sobre a quantidade de energia liberada ou absorvida durante uma reação química. Elas são usadas para calcular a entalpia de uma reação.</p>
      <p>As equações termoquímicas são importantes para entender a termodinâmica das reações químicas e para prever a direção e a extensão das reações.</p>
    `
  }
  explanationText.innerHTML = explanation
}
