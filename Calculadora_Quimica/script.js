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

  if (inputMappings[selectedOperation]) {
    inputMappings[selectedOperation].forEach(field => {
      const fieldValue = document.getElementById(field).value.trim() // Remover espaços em branco
      if (fieldValue !== '') {
        inputValues[field] = parseFloat(fieldValue)
      } else {
        // Se algum campo estiver vazio, exiba uma mensagem de erro
        resultDiv.textContent = 'Preencha todos os campos de entrada.'
        return // Encerrar a execução da função corretamente
      }
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
        result = calculateThermochemicalEquations(
          inputValues.equacaoTermoquimica
        )
        formattedResult = result
        break

      default:
        formattedResult = 'Operação inválida'
    }

    resultDiv.textContent = formattedResult
  } else {
    // Se a operação selecionada não tiver mapeamento de entrada, exiba uma mensagem de erro
    resultDiv.textContent = 'Operação não suportada.'
  }
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
