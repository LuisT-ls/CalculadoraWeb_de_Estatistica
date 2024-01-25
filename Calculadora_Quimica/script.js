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
  showExplanation(operationSelect.value)
})

calculateButton.addEventListener('click', () => {
  try {
    calculateResult()
  } catch (error) {
    resultDiv.textContent = `Erro ao calcular: ${error.message}`
  }
})

showExplanationButton.addEventListener('click', () => {
  const selectedOperation = operationSelect.value
  showExplanation(selectedOperation)
  const explanation = explanationText
  if (
    explanation.style.display === 'none' ||
    explanation.style.display === ''
  ) {
    explanation.style.display = 'block'
  } else {
    explanation.style.display = 'none'
  }
})

function updateInputFields() {
  const selectedOperation = operationSelect.value
  const explanationsVisible = explanationText.style.display === 'block'
  inputFields.innerHTML = ''
  if (!explanationsVisible) {
    explanationText.style.display = 'none'
  }

  if (selectedOperation === 'conversaoUnidades') {
    addUnitSelector('unidadeOriginal', 'Unidade de Origem:', unitOptions)
    addUnitSelector('unidadeAlvo', 'Unidade de Destino:', unitOptions)
    addInputField('valorAConverter', 'Valor a Converter:')
  } else if (selectedOperation === 'calculosestequiometricos') {
    addInputField('quantidadeReagente', 'Quantidade de Reagente (mol):')
    addInputField('coeficienteReagente', 'Coeficiente Estequiométrico:')
  } else if (selectedOperation === 'massaMolar') {
    addInputField('massa', 'Massa (g):')
    addInputField('numeroMoles', 'Número de Moles:')
  } else if (selectedOperation === 'concentracaoSolucoes') {
    addInputField('quantidadeSoluto', 'Quantidade de Soluto (mol):')
    addInputField('volumeSolucao', 'Volume de Solução (L):')
  } else if (selectedOperation === 'diluicaoSolucoes') {
    addInputField('concentracaoInicial', 'Concentração Inicial (mol/L):')
    addInputField('volumeInicial', 'Volume Inicial (L):')
    addInputField('concentracaoFinal', 'Concentração Final (mol/L):')
  } else if (selectedOperation === 'reacoesQuimicas') {
    addInputField('molecularReagente1', 'Molécula Reagente 1:')
    addInputField('molecularReagente2', 'Molécula Reagente 2:')
    addInputField('molecularProduto1', 'Molécula Produto 1:')
    addInputField('molecularProduto2', 'Molécula Produto 2:')
  } else if (selectedOperation === 'balanceamentoEquacoes') {
    addInputField('equacaoDesbalanceada', 'Equação Desbalanceada:')
  } else if (selectedOperation === 'leiBoyleCharlesGayLussac') {
    addInputField('volumeInicial', 'Volume Inicial (L):')
    addInputField('pressaoInicial', 'Pressão Inicial (atm):')
    addInputField('volumeFinal', 'Volume Final (L):')
    addInputField('pressaoFinal', 'Pressão Final (atm):')
    addInputField('temperatura', 'Temperatura (K):')
  } else if (selectedOperation === 'solucoesTampao') {
    addInputField('acidoFraco', 'Ácido Fraco (mol/L):')
    addInputField('sal', 'Sal (mol/L):')
  } else if (selectedOperation === 'constantesQuimicas') {
    // Não são necessários campos de entrada para constantes químicas
  } else if (selectedOperation === 'temperaturaPressaoPadrao') {
    // Não são necessários campos de entrada para temperatura e pressão padrão
  } else if (selectedOperation === 'equilibrioQuimico') {
    addInputField('coeficienteA', 'Coeficiente (A):')
    addInputField('coeficienteB', 'Coeficiente (B):')
    addInputField('coeficienteC', 'Coeficiente (C):')
    addInputField('coeficienteD', 'Coeficiente (D):')
  } else if (selectedOperation === 'leiLambertBeer') {
    addInputField('absorvancia', 'Absorvância:')
    addInputField('comprimentoCaminho', 'Comprimento do Caminho Óptico (cm):')
    addInputField('concentracao', 'Concentração (mol/L):')
  } else if (selectedOperation === 'cineticaQuimica') {
    addInputField('concentracaoA', 'Concentração (A) (mol/L):')
    addInputField('concentracaoB', 'Concentração (B) (mol/L):')
    addInputField('velocidade', 'Velocidade da Reação:')
  } else if (selectedOperation === 'equacaoNernst') {
    addInputField('potencialEletrodo', 'Potencial de Eletrodo (V):')
    addInputField('constanteEquilibrio', 'Constante de Equilíbrio (Q):')
    addInputField('temperatura', 'Temperatura (K):')
  } else if (selectedOperation === 'constanteEquilibrioPressaoParcial') {
    addInputField('pressaoA', 'Pressão Parcial (A) (atm):')
    addInputField('pressaoB', 'Pressão Parcial (B) (atm):')
    addInputField('pressaoC', 'Pressão Parcial (C) (atm):')
    addInputField('pressaoD', 'Pressão Parcial (D) (atm):')
  } else if (selectedOperation === 'misturaGases') {
    addInputField('pressaoTotal', 'Pressão Total (atm):')
    addInputField('fracaoMolar1', 'Fração Molar do Gás 1:')
    addInputField('constanteGases', 'Constante dos Gases (atm L/(mol K):')
  } else if (selectedOperation === 'numeroOxidacao') {
    addInputField('composto', 'Composto:')
  } else if (selectedOperation === 'teoriaColisoes') {
    // Não são necessários campos de entrada para teoria de colisões
  } else if (selectedOperation === 'conversoesTemperatura') {
    addInputField('temperaturaCelsius', 'Temperatura (°C):')
    addInputField('temperaturaFahrenheit', 'Temperatura (°F):')
  } else if (selectedOperation === 'solucoesNaoIdeais') {
    addInputField('concentracaoReal', 'Concentração Real (mol/L):')
    addInputField('concentracaoIdeal', 'Concentração Ideal (mol/L):')
  } else if (selectedOperation === 'rendimentoReacao') {
    addInputField('quantidadeReal', 'Quantidade Real:')
    addInputField('quantidadeTeorica', 'Quantidade Teórica:')
  } else if (selectedOperation === 'equacoesTermoquimicas') {
    addInputField('entalpia', 'Entalpia (kJ):')
    addInputField('temperaturaInicial', 'Temperatura Inicial (K):')
    addInputField('temperaturaFinal', 'Temperatura Final (K):')
    addInputField('quantidade', 'Quantidade (mol):')
  }
}

// Adicione esta função para criar um seletor de unidade com as opções fornecidas
function addUnitSelector(id, label, unitOptions) {
  const fieldDiv = document.createElement('div')
  fieldDiv.innerHTML = `
    <label for="${id}">${label}</label>
    <select id="${id}">
      ${unitOptions
        .map(option => `<option value="${option}">${option}</option>`)
        .join('')}
    </select>
  `
  inputFields.appendChild(fieldDiv)
}

// Adicione um array de opções de unidade (isso pode ser personalizado)
const unitOptions = ['Litro', 'Mol', 'Grama', 'outraUnidade']

function convertUnits(value, fromUnit, toUnit) {
  if (fromUnit === 'Litro' && toUnit === 'Mol') {
    return value / chemicalConstants.volumeMolarPadrao
  } else if (fromUnit === 'Mol' && toUnit === 'Litro') {
    return value * chemicalConstants.volumeMolarPadrao
  } else if (fromUnit === 'Grama' && toUnit === 'Mol') {
    return value / chemicalConstants.avogadro
  } else if (fromUnit === 'Mol' && toUnit === 'Grama') {
    return value * chemicalConstants.avogadro
  } else {
    throw new Error('Conversão não suportada para as unidades especificadas')
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

// Adicione a base de dados de constantes químicas
const chemicalConstants = {
  avogadro: 6.022e23, // constante de Avogadro em mol^-1
  gasIdeal: 8.314 // constante dos gases ideais em J/(mol·K)
  // Adicione outras constantes conforme necessário
}

// Adicione uma função para obter constantes químicas
function getChemicalConstant(constantName) {
  return chemicalConstants[constantName]
}

function equationOfReaction(inputs) {
  const reagente1 = inputs.molecularReagente1
  const reagente2 = inputs.molecularReagente2
  const produto1 = inputs.molecularProduto1
  const produto2 = inputs.molecularProduto2
  const equation = `${reagente1} + ${reagente2} → ${produto1} + ${produto2}`

  return equation
}

function balanceChemicalEquation(inputs) {
  // Implementação da lógica para balancear equações químicas
  let unbalancedEquation = inputs.equacaoDesbalanceada

  // Lógica para balancear a equação
  let balancedEquation = balanceEquation(unbalancedEquation)

  return balancedEquation
}

function calculateGasMixture(inputs) {
  // Adicione a lógica de cálculo considerando inputs.pressaoParcial1 e inputs.pressaoParcial2
  const totalPressure = inputs.pressaoTotal
  const partialPressure1 = inputs.pressaoParcial1
  const partialPressure2 = inputs.pressaoParcial2
  const moleFraction1 = partialPressure1 / totalPressure
  const moleFraction2 = partialPressure2 / totalPressure

  return {
    moleFraction1,
    moleFraction2
  }
}

function calculateOxidationNumber(inputs) {
  const compound = inputs.composto
  const oxidationNumbers = getOxidationNumbers(compound)

  return oxidationNumbers
}

function calculateResult() {
  const selectedOperation = operationSelect.value
  const inputElements = inputFields.querySelectorAll('input')
  const inputs = {}

  inputElements.forEach(input => {
    inputs[input.id] = parseFloat(input.value)
  })

  let result

  switch (selectedOperation) {
    case 'conversaoUnidades':
      const originalUnit = inputs.unidadeOriginal
      const targetUnit = inputs.unidadeAlvo
      const originalValue = inputs.valorAConverter
      result = convertUnits(originalValue, originalUnit, targetUnit)
      break
    case 'calculosestequiometricos':
      result = inputs.quantidadeReagente * inputs.coeficienteReagente
      break
    case 'massaMolar':
      result = inputs.massa / inputs.numeroMoles
      break
    case 'concentracaoSolucoes':
      result = inputs.quantidadeSoluto / inputs.volumeSolucao
      break
    case 'diluicaoSolucoes':
      result =
        (inputs.concentracaoInicial * inputs.volumeInicial) /
        inputs.concentracaoFinal
      break
    case 'reacoesQuimicas':
      result = equationOfReaction(inputs)
      break
    case 'balanceamentoEquacoes':
      result = balanceChemicalEquation(inputs)
      break
    case 'leiBoyleCharlesGayLussac':
      if (inputs.temperatura2 > inputs.temperatura1) {
        result = inputs.pressao1 * (inputs.temperatura2 / inputs.temperatura1)
      } else {
        result = inputs.pressao1 * (inputs.temperatura1 / inputs.temperatura2)
      }
      break
    case 'solucoesTampao':
      result = inputs.pH // Assuming pH is already calculated in the input
      break
    case 'constantesQuimicas':
      result = getChemicalConstant('gasIdeal') * inputs.temperatura
      break
    case 'temperaturaPressaoPadrao':
      result =
        inputs.temperatura * (1 + 0.00366 * (inputs.altitude - inputs.nivelMar))
      break
    case 'equilibrioQuimico':
      const Kc =
        (inputs.coeficienteC * inputs.coeficienteD) /
        (inputs.coeficienteA * inputs.coeficienteB)
      result = Kc
      break
    case 'leiLambertBeer':
      result =
        (Math.log10(inputs.absorvancia) / inputs.comprimentoCaminho) *
        inputs.concentracao
      break
    case 'cineticaQuimica':
      result = inputs.velocidade // Assuming velocity is already calculated in the input
      break
    case 'equacaoNernst':
      result =
        inputs.potencialEletrodo -
        (0.0592 / inputs.numeroEletrons) *
          Math.log10(inputs.constanteEquilibrio)
      break
    case 'constanteEquilibrioPressaoParcial':
      result =
        (inputs.pressaoA * inputs.pressaoB) /
        (inputs.pressaoC * inputs.pressaoD)
      break
    case 'misturaGases':
      result =
        (inputs.pressaoTotal * inputs.fracaoMolar1) / inputs.constanteGases
      break
    case 'numeroOxidacao':
      throw new Error('Operação não implementada: Número de Oxidação')
      break
    case 'teoriaColisoes':
      result = inputs.constanteVelocidade * Math.pow(inputs.concentracao, 2)
      break
    case 'conversoesTemperatura':
      if (inputs.escala1 === 'C' && inputs.escala2 === 'F') {
        result = (inputs.temperaturaCelsius * 9) / 5 + 32
      } else if (inputs.escala1 === 'F' && inputs.escala2 === 'C') {
        result = ((inputs.temperaturaFahrenheit - 32) * 5) / 9
      }
      break
    case 'solucoesNaoIdeais':
      result = inputs.concentracaoReal / inputs.concentracaoIdeal
      break
    case 'rendimentoReacao':
      result = (inputs.quantidadeReal / inputs.quantidadeTeorica) * 100
      break
    case 'equacoesTermoquimicas':
      result = inputs.entalpia
      break
    default:
      throw new Error('Operação desconhecida')
  }

  result = Math.round(result * 100) / 100

  const resultDiv = document.getElementById('result')
  resultDiv.textContent = `Resultado: ${result}`
}

function formatCurrency(amount) {
  return amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
}

function showExplanation(selectedOperation) {
  let explanation = ''

  if (selectedOperation === 'conversaoUnidades') {
    explanation = `
      <p>A Conversão de Unidades Químicas permite a conversão entre diferentes unidades de medida usadas na química, como gramas para mol, litros para moles, etc.</p>
      <p>Exemplos:</p>
      <p>1. Gramas para Moles:</p>
      <p>   Mol = Gramas / Peso Molecular</p>
      <p>2. Litros para Moles (em condições padrão):</p>
      <p>   Moles = Litros / Volume Molar Padrão</p>
    `
  } else if (selectedOperation === 'calculosestequiometricos') {
    explanation = `
      <p>Os Cálculos Estequiométricos são usados para determinar as quantidades de reagentes e produtos em uma reação química. As fórmulas variam de acordo com o tipo de problema estequiométrico.</p>
      <p>Exemplo:</p>
      <p>Para a reação A + 2B → C, se você tem 3 moles de A, calcule a quantidade de B necessária.</p>
      <p>Usando a proporção molar: 3 moles A * (2 moles B / 1 mole A) = 6 moles B</p>
    `
  } else if (selectedOperation === 'massaMolar') {
    explanation = `
      <p>A Massa Molar é a massa de um mol de átomos de uma substância. A fórmula é:</p>
      <p>Massa Molar = Massa / Número de Moles</p>
      <p>Exemplo:</p>
      <p>Calcular a massa molar da água (H2O):</p>
      <p>Massa Molar = (2 * Massa do H) + (1 * Massa do O)</p>
      <p>Massa Molar = (2 * 1) + (1 * 16) = 18 g/mol</p>
    `
  } else if (selectedOperation === 'concentracaoSolucoes') {
    explanation = `
      <p>A Concentração de Soluções é a quantidade de soluto presente em uma unidade de volume de solução. A fórmula é:</p>
      <p>Concentração = Quantidade de Soluto / Volume de Solução</p>
      <p>Exemplo:</p>
      <p>Preparar 500 mL de uma solução de NaCl com concentração de 0,2 mol/L:</p>
      <p>Quantidade de Soluto = 0,2 mol/L * 0,5 L = 0,1 mol</p>
    `
  } else if (selectedOperation === 'diluicaoSolucoes') {
    explanation = `
      <p>A Diluição de Soluções é o processo de adição de solvente para reduzir a concentração de uma solução. A fórmula é:</p>
      <p>Concentração Final = (Volume Inicial * Concentração Inicial) / Volume Final</p>
      <p>Exemplo:</p>
      <p>Diluir 100 mL de uma solução de HCl 2 mol/L para uma concentração de 0,5 mol/L:</p>
      <p>Concentração Final = (100 mL * 2 mol/L) / 500 mL = 0,4 mol/L</p>
    `
  } else if (selectedOperation === 'reacoesQuimicas') {
    explanation = `
      <p>As Reações Químicas descrevem a transformação de reagentes em produtos. As equações químicas representam essa transformação. Equacionar uma reação química é fundamental para realizar cálculos estequiométricos.</p>
      <p>Exemplo:</p>
      <p>Equacionar a reação de combustão do metano (CH4 + O2 → CO2 + H2O)</p>
    `
  } else if (selectedOperation === 'balanceamentoEquacoesQuimicas') {
    explanation = `
      <p>O Balanceamento de Equações Químicas é o processo de ajustar os coeficientes para garantir que o número de átomos de cada elemento seja o mesmo nos reagentes e produtos.</p>
      <p>Exemplo:</p>
      <p>Balancear a equação: N2 + H2 → NH3</p>
    `
  } else if (selectedOperation === 'leiBoyleCharlesGayLussac') {
    explanation = `
      <p>A Lei de Boyle, Charles e Gay-Lussac relaciona as variáveis de pressão, volume e temperatura para um gás ideal.</p>
      <p>Para a Lei de Boyle: PV = constante (a temperatura constante)</p>
      <p>Para a Lei de Charles: V/T = constante (a pressão constante)</p>
      <p>Para a Lei de Gay-Lussac: P/T = constante (o volume constante)</p>
    `
  } else if (selectedOperation === 'solucoesTampao') {
    explanation = `
      <p>As Soluções Tampão resistem a mudanças significativas no pH quando pequenas quantidades de ácido ou base são adicionadas. São compostas por um ácido fraco e seu sal ou uma base fraca e seu sal.</p>
      <p>Fórmula geral do tampão: Ácido Fraco + Sal (ou Base Fraca + Sal)</p>
    `
  } else if (selectedOperation === 'constantesQuimicas') {
    explanation = `
      <p>As Constantes Químicas são valores numéricos que descrevem propriedades específicas dos materiais. Exemplos incluem a constante de Avogadro, a constante de Planck e a constante dos gases ideais (R).</p>
    `
  } else if (selectedOperation === 'temperaturaPressaoPadrao') {
    explanation = `
      <p>A Temperatura e Pressão Padrão (TTP) são condições específicas usadas em cálculos estequiométricos. O TTP padrão é 0°C (273,15 K) e 1 atm (101,325 kPa).</p>
    `
  } else if (selectedOperation === 'equilibrioQuimico') {
    explanation = `
      <p>O Equilíbrio Químico ocorre quando a taxa de formação dos produtos é igual à taxa de formação dos reagentes. A constante de equilíbrio (Kc) é usada para expressar essa relação.</p>
      <p>Exemplo:</p>
      <p>Equação química: aA + bB ⇌ cC + dD</p>
      <p>Expressão para Kc: [C]^c[D]^d / [A]^a[B]^b</p>
    `
  } else if (selectedOperation === 'leiLambertBeer') {
    explanation = `
      <p>A Lei de Lambert-Beer relaciona a absorbância (A), a concentração (c) e o comprimento do caminho óptico (l) em uma medida de absorção em espectrofotometria.</p>
      <p>Fórmula: A = εcl</p>
      <p>onde ε é o coeficiente de extinção molar.</p>
    `
  } else if (selectedOperation === 'cineticaQuimica') {
    explanation = `
      <p>A Cinética Química estuda a velocidade das reações químicas. A velocidade média é a variação da concentração de um reagente ou produto em relação ao tempo.</p>
      <p>Exemplo:</p>
      <p>Velocidade = Δ[A] / Δt</p>
    `
  } else if (selectedOperation === 'equacaoNernst') {
    explanation = `
      <p>A Equação de Nernst é usada para calcular o potencial de eletrodo de uma célula eletroquímica em não condições padrão. Leva em consideração a concentração dos íons no eletrodo.</p>
      <p>Exemplo:</p>
      <p>Equação de Nernst: E = E° - (RT/nF) * ln(Q)</p>
      <p>onde E é o potencial de eletrodo, E° é o potencial padrão, R é a constante dos gases ideais, T é a temperatura, n é o número de elétrons na reação, F é a constante de Faraday e Q é o quociente de reação.</p>
    `
  } else if (selectedOperation === 'constanteEquilibrioPressaoParcial') {
    explanation = `
      <p>A Constante de Equilíbrio em Termos de Pressão Parcial é usada para expressar a relação entre as pressões parciais dos reagentes e produtos em uma reação em equilíbrio.</p>
      <p>Exemplo:</p>
      <p>Equação para Kp: Kp = (P_C^c * P_D^d) / (P_A^a * P_B^b)</p>
      <p>onde P_A, P_B, P_C e P_D são as pressões parciais dos reagentes e produtos, e a, b, c e d são os coeficientes estequiométricos na equação química.</p>
    `
  } else if (selectedOperation === 'misturaGases') {
    explanation = `
      <p>A Mistura de Gases envolve o cálculo das frações molares e das pressões parciais de gases em uma mistura gasosa.</p>
      <p>Exemplo:</p>
      <p>Fração molar (Xi) = Ni / N_total</p>
      <p>Pressão parcial (Pi) = Xi * Pressão total</p>
    `
  } else if (selectedOperation === 'numeroOxidacao') {
    explanation = `
      <p>O Número de Oxidação é um número que representa a carga que um átomo tem ou parece ter quando as ligações são consideradas de maneira iônica.</p>
      <p>Exemplo:</p>
      <p>Para o íon Cl⁻, o número de oxidação do cloro é -1.</p>
    `
  } else if (selectedOperation === 'teoriaColisoes') {
    explanation = `
      <p>A Teoria de Colisões explica como as colisões entre moléculas levam a reações químicas. A constante de velocidade (k) está relacionada à frequência e à eficácia dessas colisões.</p>
      <p>Exemplo:</p>
      <p>Lei da velocidade: k = A * exp(-Ea/RT)</p>
      <p>onde A é o fator de frequência, Ea é a energia de ativação, R é a constante dos gases ideais e T é a temperatura.</p>
    `
  } else if (selectedOperation === 'conversoesTemperatura') {
    explanation = `
      <p>As Conversões de Temperatura permitem converter entre diferentes escalas de temperatura, como Celsius e Fahrenheit.</p>
      <p>Exemplo:</p>
      <p>Converter 25°C para Fahrenheit:</p>
      <p>F = (25 * 9/5) + 32 = 77°F</p>
    `
  } else if (selectedOperation === 'solucoesNaoIdeais') {
    explanation = `
      <p>As Soluções Não Ideais desviam-se do comportamento previsto pelas leis ideais. A atividade é usada para corrigir os cálculos.</p>
      <p>Atividade = Concentração Real / Concentração Ideal</p>
    `
  } else if (selectedOperation === 'rendimentoReacao') {
    explanation = `
      <p>O Rendimento da Reação compara a quantidade real de produto obtido com a quantidade teórica esperada. É expresso como uma porcentagem.</p>
      <p>Rendimento (%) = (Quantidade Real / Quantidade Teórica) * 100</p>
    `
  } else if (selectedOperation === 'equacoesTermoquimicas') {
    explanation = `
      <p>As Equações Termoquímicas envolvem a variação de entalpia (ΔH) em uma reação química. Pode ser endotérmica (ΔH > 0) ou exotérmica (ΔH < 0).</p>
      <p>Exemplo:</p>
      <p>ΔH = Hprodutos - Hreagentes</p>
    `
  }

  explanationText.innerHTML = explanation
}

updateInputFields()
