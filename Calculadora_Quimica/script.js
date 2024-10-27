document.addEventListener('DOMContentLoaded', () => {
  const operationSelect = document.getElementById('operation')
  const inputFields = document.getElementById('input-fields')
  const calculateButton = document.getElementById('calculate')
  const resultDiv = document.getElementById('result')
  const explanationButton = document.getElementById('showExplanation')
  const explanationText = document.getElementById('calcExplanation')

  const explanations = {
    conversaoUnidades:
      'A conversão de unidades é fundamental na química para transformar medidas entre diferentes sistemas, permitindo cálculos precisos e comparações adequadas entre quantidades.',
    calculosestequiometricos:
      'Cálculos estequiométricos são usados para determinar as quantidades de reagentes e produtos em uma reação química, baseando-se na proporção molar entre as substâncias.',
    massaMolar:
      'A massa molar é a massa de um mol de uma substância, essencial para converter entre massa e quantidade de matéria.',
    concentracaoSolucoes:
      'A concentração de soluções indica a quantidade de soluto presente em determinada quantidade de solução, podendo ser expressa em diferentes unidades como molaridade, normalidade, etc.',
    diluicaoSolucoes:
      'A diluição é o processo de adicionar solvente a uma solução para diminuir sua concentração, mantendo a quantidade de soluto constante.',
    reacoesQuimicas:
      'As reações químicas são processos onde substâncias (reagentes) são transformadas em outras substâncias (produtos), seguindo a lei da conservação da massa.',
    balanceamentoEquacoesQuimicas:
      'O balanceamento de equações químicas garante que a quantidade de átomos seja igual nos reagentes e produtos, seguindo a lei da conservação da massa.',
    leiBoyleCharlesGayLussac:
      'As leis dos gases ideais relacionam pressão, volume e temperatura, descrevendo o comportamento dos gases em condições ideais.',
    solucoesTampao:
      'Soluções tampão são misturas que resistem a mudanças de pH quando pequenas quantidades de ácido ou base são adicionadas.',
    constantesQuimicas:
      'Constantes químicas são valores fixos que aparecem em equações químicas e físicas, como a constante de Avogadro ou a constante dos gases.',
    temperaturaPressaoPadrao:
      'Condições padrão de temperatura e pressão são referências utilizadas para comparar propriedades de substâncias em diferentes situações.',
    equilibrioQuimico:
      'O equilíbrio químico é o estado onde as velocidades das reações direta e inversa se igualam, mantendo concentrações constantes.',
    leiLambertBeer:
      'A Lei de Lambert-Beer relaciona a absorção de luz com a concentração de uma solução, fundamental em análises espectrofotométricas.',
    cineticaQuimica:
      'A cinética química estuda a velocidade das reações e os fatores que a influenciam, como concentração, temperatura e catalisadores.',
    equacaoNernst:
      'A equação de Nernst relaciona o potencial de uma célula eletroquímica com as concentrações dos reagentes e produtos.',
    constanteEquilibrioPressaoParcial:
      'A constante de equilíbrio em termos de pressão parcial (Kp) é usada para reações gasosas em equilíbrio.',
    misturaGases:
      'O estudo de misturas gasosas envolve a lei de Dalton das pressões parciais e outras propriedades dos gases.',
    numeroOxidacao:
      'O número de oxidação indica o estado de oxidação de um átomo em uma molécula ou íon.',
    teoriaColisoes:
      'A teoria das colisões explica como as reações químicas ocorrem a nível molecular, considerando energia e orientação das colisões.',
    conversoesTemperatura:
      'As conversões de temperatura são importantes na química para trabalhar com diferentes escalas como Celsius, Kelvin e Fahrenheit.',
    solucoesNaoIdeais:
      'Soluções não ideais apresentam desvios do comportamento ideal devido a interações entre as moléculas do soluto e solvente.',
    rendimentoReacao:
      'O rendimento da reação compara a quantidade de produto obtido experimentalmente com a quantidade teórica prevista.',
    equacoesTermoquimicas:
      'Equações termoquímicas mostram as mudanças de energia durante uma reação química, incluindo calor absorvido ou liberado.'
  }

  const createInputField = (
    labelText,
    id,
    type = 'number',
    placeholder = ''
  ) => {
    const div = document.createElement('div')
    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = labelText
    const input = document.createElement('input')
    input.type = type
    input.id = id
    input.placeholder = placeholder
    div.appendChild(label)
    div.appendChild(input)
    return div
  }

  const createSelectField = (labelText, id, options) => {
    const div = document.createElement('div')
    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = labelText
    const select = document.createElement('select')
    select.id = id
    options.forEach(opt => {
      const option = document.createElement('option')
      option.value = opt.value || opt
      option.textContent = opt.text || opt
      select.appendChild(option)
    })
    div.appendChild(label)
    div.appendChild(select)
    return div
  }

  const updateInputFields = () => {
    inputFields.innerHTML = ''
    const operation = operationSelect.value

    switch (operation) {
      case 'conversaoUnidades':
        inputFields.appendChild(createInputField('Valor:', 'valor'))
        inputFields.appendChild(
          createSelectField('Unidade de Origem:', 'unidadeOrigem', [
            'g',
            'mg',
            'kg',
            'mol',
            'mmol',
            'L',
            'mL',
            'M',
            'N'
          ])
        )
        inputFields.appendChild(
          createSelectField('Unidade de Destino:', 'unidadeDestino', [
            'g',
            'mg',
            'kg',
            'mol',
            'mmol',
            'L',
            'mL',
            'M',
            'N'
          ])
        )
        break

      case 'calculosestequiometricos':
        inputFields.appendChild(
          createInputField('Massa do reagente (g):', 'massaReagente')
        )
        inputFields.appendChild(
          createInputField(
            'Massa molar do reagente (g/mol):',
            'massaMolarReagente'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Coeficiente estequiométrico do reagente:',
            'coefReagente'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Coeficiente estequiométrico do produto:',
            'coefProduto'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Massa molar do produto (g/mol):',
            'massaMolarProduto'
          )
        )
        break

      case 'massaMolar':
        inputFields.appendChild(
          createInputField('Fórmula Molecular:', 'formula', 'text', 'Ex: H2O')
        )
        break

      case 'concentracaoSolucoes':
        inputFields.appendChild(
          createInputField('Massa do soluto (g):', 'massaSoluto')
        )
        inputFields.appendChild(
          createInputField('Volume da solução (L):', 'volumeSolucao')
        )
        inputFields.appendChild(
          createInputField('Massa molar do soluto (g/mol):', 'massaMolar')
        )
        break

      case 'diluicaoSolucoes':
        inputFields.appendChild(
          createInputField(
            'Concentração inicial (mol/L):',
            'concentracaoInicial'
          )
        )
        inputFields.appendChild(
          createInputField('Volume inicial (L):', 'volumeInicial')
        )
        inputFields.appendChild(
          createInputField('Volume final (L):', 'volumeFinal')
        )
        break

      case 'reacoesQuimicas':
        inputFields.appendChild(
          createInputField('Reagentes:', 'reagentes', 'text', 'Ex: 2H2 + O2')
        )
        inputFields.appendChild(
          createInputField('Produtos:', 'produtos', 'text', 'Ex: 2H2O')
        )
        break

      case 'balanceamentoEquacoesQuimicas':
        inputFields.appendChild(
          createInputField(
            'Equação não balanceada:',
            'equacao',
            'text',
            'Ex: H2 + O2 -> H2O'
          )
        )
        break

      case 'leiBoyleCharlesGayLussac':
        inputFields.appendChild(createInputField('Pressão (atm):', 'pressao'))
        inputFields.appendChild(createInputField('Volume (L):', 'volume'))
        inputFields.appendChild(
          createInputField('Temperatura (K):', 'temperatura')
        )
        inputFields.appendChild(createInputField('Número de mols:', 'mols'))
        break

      case 'solucoesTampao':
        inputFields.appendChild(
          createInputField(
            'Concentração do ácido fraco [HA] (mol/L):',
            'concAcido'
          )
        )
        inputFields.appendChild(
          createInputField('Concentração do sal [A-] (mol/L):', 'concSal')
        )
        inputFields.appendChild(createInputField('Ka do ácido fraco:', 'ka'))
        break

      case 'constantesQuimicas':
        inputFields.appendChild(createInputField('Massa (g):', 'massa'))
        inputFields.appendChild(createInputField('Volume (L):', 'volume'))
        inputFields.appendChild(
          createInputField('Temperatura (K):', 'temperatura')
        )
        break

      case 'temperaturaPressaoPadrao':
        inputFields.appendChild(createInputField('Pressão (atm):', 'pressao'))
        inputFields.appendChild(createInputField('Volume (L):', 'volume'))
        inputFields.appendChild(
          createInputField('Temperatura (K):', 'temperatura')
        )
        break

      case 'equilibrioQuimico':
        inputFields.appendChild(
          createInputField(
            'Concentração inicial do reagente (mol/L):',
            'concInicial'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Constante de equilíbrio (K):',
            'constanteEquilibrio'
          )
        )
        break

      case 'leiLambertBeer':
        inputFields.appendChild(createInputField('Absorbância:', 'absorbancia'))
        inputFields.appendChild(
          createInputField(
            'Coeficiente de extinção molar (L/mol·cm):',
            'coeficienteExtincao'
          )
        )
        inputFields.appendChild(
          createInputField('Caminho óptico (cm):', 'caminhoOptico')
        )
        break

      case 'cineticaQuimica':
        inputFields.appendChild(
          createInputField(
            'Concentração inicial (mol/L):',
            'concentracaoInicial'
          )
        )
        inputFields.appendChild(createInputField('Tempo (s):', 'tempo'))
        inputFields.appendChild(
          createInputField('Constante de velocidade:', 'constanteVelocidade')
        )
        inputFields.appendChild(createInputField('Ordem da reação:', 'ordem'))
        break

      case 'equacaoNernst':
        inputFields.appendChild(
          createInputField('Potencial padrão (V):', 'potencialPadrao')
        )
        inputFields.appendChild(
          createInputField('Temperatura (K):', 'temperatura')
        )
        inputFields.appendChild(
          createInputField('Número de elétrons:', 'numeroEletrons')
        )
        inputFields.appendChild(
          createInputField('Quociente da reação:', 'quocienteReacao')
        )
        break

      case 'constanteEquilibrioPressaoParcial':
        inputFields.appendChild(
          createInputField(
            'Pressão parcial dos produtos (atm):',
            'pressaoProdutos'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Pressão parcial dos reagentes (atm):',
            'pressaoReagentes'
          )
        )
        break

      case 'misturaGases':
        inputFields.appendChild(
          createInputField('Pressão total (atm):', 'pressaoTotal')
        )
        inputFields.appendChild(
          createInputField('Fração molar do gás:', 'fracaoMolar')
        )
        break

      case 'numeroOxidacao':
        inputFields.appendChild(
          createInputField(
            'Fórmula química:',
            'formulaQuimica',
            'text',
            'Ex: H2SO4'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Elemento de interesse:',
            'elemento',
            'text',
            'Ex: S'
          )
        )
        break

      case 'teoriaColisoes':
        inputFields.appendChild(
          createInputField('Energia de ativação (kJ/mol):', 'energiaAtivacao')
        )
        inputFields.appendChild(
          createInputField('Temperatura (K):', 'temperatura')
        )
        break

      case 'conversoesTemperatura':
        inputFields.appendChild(createInputField('Temperatura:', 'temperatura'))
        inputFields.appendChild(
          createSelectField('Escala de Origem:', 'escalaOrigem', [
            'Celsius',
            'Kelvin',
            'Fahrenheit'
          ])
        )
        inputFields.appendChild(
          createSelectField('Escala de Destino:', 'escalaDestino', [
            'Celsius',
            'Kelvin',
            'Fahrenheit'
          ])
        )
        break

      case 'solucoesNaoIdeais':
        inputFields.appendChild(
          createInputField('Concentração real (mol/L):', 'concentracaoReal')
        )
        inputFields.appendChild(
          createInputField('Coeficiente de atividade:', 'coeficienteAtividade')
        )
        break

      case 'rendimentoReacao':
        inputFields.appendChild(
          createInputField('Rendimento teórico (g):', 'rendimentoTeorico')
        )
        inputFields.appendChild(
          createInputField(
            'Rendimento experimental (g):',
            'rendimentoExperimental'
          )
        )
        break

      case 'equacoesTermoquimicas':
        inputFields.appendChild(
          createInputField(
            'Entalpia dos produtos (kJ/mol):',
            'entalpiaProdutos'
          )
        )
        inputFields.appendChild(
          createInputField(
            'Entalpia dos reagentes (kJ/mol):',
            'entalpiaReagentes'
          )
        )
        break
    }
  }

  const calculate = () => {
    const operation = operationSelect.value
    let result = ''

    try {
      switch (operation) {
        case 'conversaoUnidades':
          result = converterUnidades(
            parseFloat(document.getElementById('valor').value),
            document.getElementById('unidadeOrigem').value,
            document.getElementById('unidadeDestino').value
          )
          break

        case 'calculosestequiometricos':
          result = calcularEstequiometria(
            parseFloat(document.getElementById('massaReagente').value),
            parseFloat(document.getElementById('massaMolarReagente').value),
            parseFloat(document.getElementById('coefReagente').value),
            parseFloat(document.getElementById('coefProduto').value),
            parseFloat(document.getElementById('massaMolarProduto').value)
          )
          break

        case 'massaMolar':
          result = calcularMassaMolar(document.getElementById('formula').value)
          break

        case 'concentracaoSolucoes':
          result = calcularConcentracao(
            parseFloat(document.getElementById('massaSoluto').value),
            parseFloat(document.getElementById('volumeSolucao').value),
            parseFloat(document.getElementById('massaMolar').value)
          )
          break

        case 'diluicaoSolucoes':
          result = calcularDiluicao(
            parseFloat(document.getElementById('concentracaoInicial').value),
            parseFloat(document.getElementById('volumeInicial').value),
            parseFloat(document.getElementById('volumeFinal').value)
          )
          break

        case 'leiBoyleCharlesGayLussac':
          result = calcularLeiGases(
            parseFloat(document.getElementById('pressao').value),
            parseFloat(document.getElementById('volume').value),
            parseFloat(document.getElementById('temperatura').value),
            parseFloat(document.getElementById('mols').value)
          )
          break

        case 'solucoesTampao':
          result = calcularTampao(
            parseFloat(document.getElementById('concAcido').value),
            parseFloat(document.getElementById('concSal').value),
            parseFloat(document.getElementById('ka').value)
          )
          break

        case 'constantesQuimicas':
          result = calcularConstantes(
            parseFloat(document.getElementById('massa').value),
            parseFloat(document.getElementById('volume').value),
            parseFloat(document.getElementById('temperatura').value)
          )
          break

        case 'temperaturaPressaoPadrao':
          result = calcularTemperaturaPressaoPadrao(
            parseFloat(document.getElementById('pressao').value),
            parseFloat(document.getElementById('volume').value),
            parseFloat(document.getElementById('temperatura').value)
          )
          break

        case 'equilibrioQuimico':
          result = calcularEquilibrio(
            parseFloat(document.getElementById('concInicial').value),
            parseFloat(document.getElementById('constanteEquilibrio').value)
          )
          break

        case 'leiLambertBeer':
          result = calcularLambertBeer(
            parseFloat(document.getElementById('absorbancia').value),
            parseFloat(document.getElementById('coeficienteExtincao').value),
            parseFloat(document.getElementById('caminhoOptico').value)
          )
          break

        case 'cineticaQuimica':
          result = calcularCinetica(
            parseFloat(document.getElementById('concentracaoInicial').value),
            parseFloat(document.getElementById('tempo').value),
            parseFloat(document.getElementById('constanteVelocidade').value),
            parseFloat(document.getElementById('ordem').value)
          )
          break

        case 'equacaoNernst':
          result = calcularNernst(
            parseFloat(document.getElementById('potencialPadrao').value),
            parseFloat(document.getElementById('temperatura').value),
            parseFloat(document.getElementById('numeroEletrons').value),
            parseFloat(document.getElementById('quocienteReacao').value)
          )
          break

        case 'constanteEquilibrioPressaoParcial':
          result = calcularEquilibrioPressaoParcial(
            parseFloat(document.getElementById('pressaoProdutos').value),
            parseFloat(document.getElementById('pressaoReagentes').value)
          )
          break

        case 'misturaGases':
          result = calcularMisturaGases(
            parseFloat(document.getElementById('pressaoTotal').value),
            parseFloat(document.getElementById('fracaoMolar').value)
          )
          break

        case 'numeroOxidacao':
          result = calcularNumeroOxidacao(
            document.getElementById('formulaQuimica').value,
            document.getElementById('elemento').value
          )
          break

        case 'teoriaColisoes':
          result = calcularColisoes(
            parseFloat(document.getElementById('energiaAtivacao').value),
            parseFloat(document.getElementById('temperatura').value)
          )
          break

        case 'conversoesTemperatura':
          result = converterTemperatura(
            parseFloat(document.getElementById('temperatura').value),
            document.getElementById('escalaOrigem').value,
            document.getElementById('escalaDestino').value
          )

          break

        case 'solucoesNaoIdeais':
          result = calcularSolucoesNaoIdeais(
            parseFloat(document.getElementById('concentracaoReal').value),
            parseFloat(document.getElementById('coeficienteAtividade').value)
          )
          break

        case 'rendimentoReacao':
          result = calcularRendimento(
            parseFloat(document.getElementById('rendimentoTeorico').value),
            parseFloat(document.getElementById('rendimentoExperimental').value)
          )
          break

        case 'equacoesTermoquimicas':
          result = calcularTermoquimicas(
            parseFloat(document.getElementById('entalpiaProdutos').value),
            parseFloat(document.getElementById('entalpiaReagentes').value)
          )
          break

        default:
          result = 'Operação não reconhecida'
      }
    } catch (error) {
      result = 'Erro ao calcular, verifique os valores inseridos'
    }

    resultDiv.textContent = result
  }

  const converterUnidades = (valor, unidadeOrigem, unidadeDestino) => {
    const fatoresConversao = {
      g: 1,
      mg: 0.001,
      kg: 1000,
      mol: null,
      mmol: null,
      L: null,
      mL: 0.001
    }

    if (unidadeOrigem === unidadeDestino) {
      return `${valor} ${unidadeDestino}`
    }

    if (
      (unidadeOrigem.includes('mol') && !unidadeDestino.includes('mol')) ||
      (!unidadeOrigem.includes('mol') && unidadeDestino.includes('mol'))
    ) {
      return 'Conversão entre mols e outras unidades requer massa molar'
    }

    if (
      (unidadeOrigem.includes('L') && !unidadeDestino.includes('L')) ||
      (!unidadeOrigem.includes('L') && unidadeDestino.includes('L'))
    ) {
      return 'Conversão entre volume e massa requer densidade'
    }

    const valorBase = valor * fatoresConversao[unidadeOrigem]
    const resultado = valorBase / fatoresConversao[unidadeDestino]

    return `${resultado.toFixed(4)} ${unidadeDestino}`
  }

  const calcularEstequiometria = (
    massaReagente,
    massaMolarReagente,
    coefReagente,
    coefProduto,
    massaMolarProduto
  ) => {
    const molsReagente = massaReagente / massaMolarReagente
    const molsProduto = (molsReagente * coefProduto) / coefReagente
    const massaProduto = molsProduto * massaMolarProduto

    return `Massa do produto: ${massaProduto.toFixed(4)} g`
  }

  const calcularMassaMolar = formula => {
    const massasAtomicas = {
      H: 1.008,
      He: 4.003,
      Li: 6.941,
      Be: 9.012,
      B: 10.811,
      C: 12.011,
      N: 14.007,
      O: 15.999,
      F: 18.998,
      Ne: 20.18,
      Na: 22.99,
      Mg: 24.305,
      Al: 26.982,
      Si: 28.086,
      P: 30.974,
      S: 32.065,
      Cl: 35.453,
      Ar: 39.948,
      K: 39.098,
      Ca: 40.078
    }

    let massaTotal = 0
    let elementoAtual = ''
    let numeroAtual = ''

    for (let i = 0; i < formula.length; i++) {
      const char = formula[i]

      if (char >= 'A' && char <= 'Z') {
        if (elementoAtual) {
          massaTotal += massasAtomicas[elementoAtual] * (numeroAtual || 1)
        }
        elementoAtual = char
        numeroAtual = ''
      } else if (char >= 'a' && char <= 'z') {
        elementoAtual += char
      } else if (char >= '0' && char <= '9') {
        numeroAtual += char
      }
    }

    if (elementoAtual) {
      massaTotal += massasAtomicas[elementoAtual] * (numeroAtual || 1)
    }

    return `Massa molar: ${massaTotal.toFixed(4)} g/mol`
  }

  const calcularConcentracao = (
    massaSoluto,
    volumeSolucao,
    massaMolarSoluto
  ) => {
    const mols = massaSoluto / massaMolarSoluto
    const concentracaoMolar = mols / volumeSolucao
    const concentracaoMassaVolume = massaSoluto / volumeSolucao

    return `Concentração Molar: ${concentracaoMolar.toFixed(
      4
    )} mol/L\nConcentração (m/V): ${concentracaoMassaVolume.toFixed(4)} g/L`
  }

  const calcularDiluicao = (c1, v1, v2) => {
    const c2 = (c1 * v1) / v2
    return `Concentração final: ${c2.toFixed(4)} mol/L`
  }

  const reacoesQuimicas = (reagentes, produtos) => {
    const reagentesSplit = reagentes.split('+').map(r => r.trim())
    const produtosSplit = produtos.split('+').map(p => p.trim())

    const reagentesMols = reagentesSplit.map(r => {
      const coef = parseFloat(r.split(' ')[0])
      const formula = r.split(' ').slice(1).join(' ')
      return { coef, formula }
    })

    const produtosMols = produtosSplit.map(p => {
      const coef = parseFloat(p.split(' ')[0])
      const formula = p.split(' ').slice(1).join(' ')
      return { coef, formula }
    })

    const reagentesMolsTotal = reagentesMols.reduce((acc, r) => {
      const massaMolar = calcularMassaMolar(r.formula)
      const mols = r.coef / massaMolar
      return acc + mols
    }, 0)

    const produtosMolsTotal = produtosMols.reduce((acc, p) => {
      const massaMolar = calcularMassaMolar(p.formula)
      const mols = p.coef / massaMolar
      return acc + mols
    }, 0)

    return `Reagentes: ${reagentesMolsTotal.toFixed(
      4
    )} mol\nProdutos: ${produtosMolsTotal.toFixed(4)} mol`
  }

  const balanceamentoEquacoesQuimicas = equacao => {
    const elementos = {}
    const lados = equacao.split('->')
    const reagentes = lados[0].split('+').map(r => r.trim())
    const produtos = lados[1].split('+').map(p => p.trim())

    reagentes.forEach(r => {
      const coef = parseFloat(r.split(' ')[0])
      const formula = r.split(' ').slice(1).join(' ')
      const elementosMols = calcularNumeroOxidacao(formula)
      Object.keys(elementosMols).forEach(e => {
        elementos[e] = (elementos[e] || 0) + coef * elementosMols[e]
      })
    })

    produtos.forEach(p => {
      const coef = parseFloat(p.split(' ')[0])
      const formula = p.split(' ').slice(1).join(' ')
      const elementosMols = calcularNumeroOxidacao(formula)
      Object.keys(elementosMols).forEach(e => {
        elementos[e] = (elementos[e] || 0) - coef * elementosMols[e]
      })
    })

    const coeficientes = {}
    let coeficienteAtual = 1
    let elementoAtual = Object.keys(elementos)[0]

    Object.keys(elementos).forEach(e => {
      if (elementos[e] !== 0) {
        coeficientes[e] = elementos[e]
        coeficienteAtual = 1
        elementoAtual = e
      }
    })

    Object.keys(elementos).forEach(e => {
      if (elementos[e] !== 0) {
        coeficientes[e] = elementos[e] / elementos[elementoAtual]
      }
    })

    return coeficientes
  }

  const leiBoyleCharlesGayLussac = (pressao, volume, temperatura, mols) => {
    const R = 0.08206 // Constante dos gases em L⋅atm/(mol⋅K)
    const n = (pressao * volume) / (R * temperatura)
    const pressao2 = (n * R * temperatura) / volume
    const volume2 = (n * R * temperatura) / pressao
    const temperatura2 = (pressao * volume) / (n * R)

    return `Número de mols: ${n.toFixed(4)} mol\nPressão 2: ${pressao2.toFixed(
      4
    )} atm\nVolume 2: ${volume2.toFixed(
      4
    )} L\nTemperatura 2: ${temperatura2.toFixed(4)} K`
  }

  const calcularTampao = (concAcido, concSal, ka) => {
    const ph = -Math.log10(ka) + Math.log10(concSal / concAcido)
    return `pH: ${ph.toFixed(4)}`
  }

  const calcularConstantes = (massa, volume, temperatura) => {
    const R = 0.08206 // Constante dos gases em L⋅atm/(mol⋅K)
    const n = massa / calcularMassaMolar('H2O')
    const pressao = (n * R * temperatura) / volume
    const molaridade = n / volume
    const normalidade = molaridade * 1000

    return `Pressão: ${pressao.toFixed(
      4
    )} atm\nMolaridade: ${molaridade.toFixed(
      4
    )} mol/L\nNormalidade: ${normalidade.toFixed(4)} N`
  }

  const calcularTemperaturaPressaoPadrao = (pressao, volume, temperatura) => {
    const R = 0.08206 // Constante dos gases em L⋅atm/(mol⋅K)
    const n = (pressao * volume) / (R * temperatura)
    const nPadrao = n * (273.15 / temperatura)
    const pressaoPadrao = (nPadrao * R * 273.15) / volume

    return `Número de mols: ${nPadrao.toFixed(
      4
    )} mol\nPressão Padrão: ${pressaoPadrao.toFixed(4)} atm`
  }

  const calcularEquilibrio = (concInicial, constanteEquilibrio) => {
    const x = Math.sqrt(constanteEquilibrio * concInicial)
    const concFinal = concInicial - x
    return `Concentração final: ${concFinal.toFixed(4)} mol/L`
  }

  const calcularLambertBeer = (
    absorbancia,
    coeficienteExtincao,
    caminhoOptico
  ) => {
    const concentracao = absorbancia / (coeficienteExtincao * caminhoOptico)
    return `Concentração: ${concentracao.toFixed(4)} mol/L`
  }

  const calcularCinetica = (concInicial, tempo, constanteVelocidade, ordem) => {
    const k = constanteVelocidade
    const t = tempo
    const n = ordem
    const c = concInicial

    const concFinal = c - k * t
    return `Concentração final: ${concFinal.toFixed(4)} mol/L`
  }

  const calcularNernst = (
    potencialPadrao,
    temperatura,
    numeroEletrons,
    quociente
  ) => {
    const R = 8.314 // Constante dos gases em J/(mol⋅K)
    const F = 96485 // Constante de Faraday em C/mol
    const E =
      potencialPadrao -
      ((R * temperatura) / (numeroEletrons * F)) * Math.log(quociente)
    return `Potencial de Célula: ${E.toFixed(4)} V`
  }

  const calcularEquilibrioPressaoParcial = (
    pressaoProdutos,
    pressaoReagentes
  ) => {
    const kp = pressaoProdutos / pressaoReagentes
    return `Constante de Equilíbrio: ${kp.toFixed(4)}`
  }

  const calcularMisturaGases = (pressaoTotal, fracaoMolar) => {
    const pressaoGases = pressaoTotal * fracaoMolar
    return `Pressão dos gases: ${pressaoGases.toFixed(4)} atm`
  }

  const calcularLeiGases = (pressao, volume, temperatura) => {
    const R = 0.08206 // Constante dos gases em L⋅atm/(mol⋅K)
    const mols = (pressao * volume) / (R * temperatura)
    return `Número de mols: ${mols.toFixed(4)} mol`
  }

  const calcularNumeroOxidacao = (formula, elemento) => {
    const massasAtomicas = {
      H: 1.008,
      He: 4.003,
      Li: 6.941,
      Be: 9.012,
      B: 10.811,
      C: 12.011,
      N: 14.007,
      O: 15.999,
      F: 18.998,
      Ne: 20.18,
      Na: 22.99,
      Mg: 24.305,
      Al: 26.982,
      Si: 28.086,
      P: 30.974,
      S: 32.065,
      Cl: 35.453,
      Ar: 39.948,
      K: 39.098,
      Ca: 40.078
    }

    const elementos = {}
    let elementoAtual = ''
    let numeroAtual = ''

    for (let i = 0; i < formula.length; i++) {
      const char = formula[i]

      if (char >= 'A' && char <= 'Z') {
        if (elementoAtual) {
          elementos[elementoAtual] = parseFloat(numeroAtual || 1)
        }
        elementoAtual = char
        numeroAtual = ''
      } else if (char >= 'a' && char <= 'z') {
        elementoAtual += char
      }
      if (char >= '0' && char <= '9') {
        numeroAtual += char
      }
    }

    if (elementoAtual) {
      elementos[elementoAtual] = parseFloat(numeroAtual || 1)
    }

    if (elemento) {
      return elementos[elemento]
    }

    return elementos
  }

  const calcularColisoes = (energiaAtivacao, temperatura) => {
    const R = 8.314 // Constante dos gases em J/(mol⋅K)
    const k = 1.38e-23 // Constante de Boltzmann em J/K
    const A = Math.exp(-energiaAtivacao / (R * temperatura))
    const b = Math.exp(-energiaAtivacao / (k * temperatura))
    return `Fator de Arrhenius: ${A.toFixed(
      4
    )}\nFator de Boltzmann: ${b.toFixed(4)}`
  }

  const converterTemperatura = (temperatura, escalaOrigem, escalaDestino) => {
    let kelvin

    switch (escalaOrigem) {
      case 'Celsius':
        kelvin = temperatura + 273.15
        break
      case 'Fahrenheit':
        kelvin = ((temperatura - 32) * 5) / 9 + 273.15
        break
      case 'Kelvin':
        kelvin = temperatura
        break
    }

    let resultado
    switch (escalaDestino) {
      case 'Celsius':
        resultado = kelvin - 273.15
        break
      case 'Fahrenheit':
        resultado = ((kelvin - 273.15) * 9) / 5 + 32
        break
      case 'Kelvin':
        resultado = kelvin
        break
    }

    return `Temperatura em ${escalaDestino}: ${resultado.toFixed(2)}°`
  }

  const calcularSolucoesNaoIdeais = (
    concentracaoReal,
    coeficienteAtividade
  ) => {
    const concentracaoIdeal = concentracaoReal / coeficienteAtividade
    return `Concentração Ideal: ${concentracaoIdeal.toFixed(4)} mol/L`
  }

  const calcularRendimento = (rendimentoTeorico, rendimentoExperimental) => {
    const rendimentoPercentual =
      (rendimentoExperimental / rendimentoTeorico) * 100
    return `Rendimento: ${rendimentoPercentual.toFixed(2)}%`
  }

  const calcularTermoquimicas = (entalpiaProdutos, entalpiaReagentes) => {
    const deltaH = entalpiaProdutos - entalpiaReagentes
    return `ΔH: ${deltaH.toFixed(4)} kJ/mol`
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode')
    const button = document.getElementById('toggleDarkMode')
    button.textContent = document.body.classList.contains('dark-mode')
      ? '☀️'
      : '🌙'

    const isDarkMode = document.body.classList.contains('dark-mode')
    localStorage.setItem('darkMode', isDarkMode)
  }

  window.toggleDarkMode = toggleDarkMode

  const initDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
      document.getElementById('toggleDarkMode').textContent = '☀️'
    }
  }

  operationSelect.addEventListener('change', () => {
    updateInputFields()
    const explanation = explanations[operationSelect.value]
    explanationText.textContent = explanation
  })

  calculateButton.addEventListener('click', calculate)

  explanationButton.addEventListener('click', () => {
    const explanation = explanations[operationSelect.value]
    explanationText.style.display =
      explanationText.style.display === 'block' ? 'none' : 'block'
    explanationText.textContent = explanation
  })

  initDarkMode()
  updateInputFields()
})
