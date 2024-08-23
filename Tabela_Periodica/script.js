// Função para alternar o modo escuro (simplificada com operador ternário)
function toggleDarkMode() {
  const body = document.body
  body.classList.toggle('dark-mode')
  const button = document.getElementById('toggleDarkMode')
  button.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙'
}

// Carrega o modo escuro ou claro assim que a página é carregada
document.addEventListener('DOMContentLoaded', () => {
  toggleDarkMode()

  // Otimização de desempenho para evitar criação repetida de elementos
  const elementInfoContainer = document.querySelector('.element-info')
  if (elementInfoContainer && !elementInfoContainer.hasChildNodes()) {
    elementInfoContainer.style.display = 'none'
  }
})

// Função para buscar e exibir informações do elemento
const searchInput = document.getElementById('search')
function searchElement() {
  const searchTerm = searchInput.value.toLowerCase().trim()
  if (searchTerm === '') {
    clearElementInfo()
    return
  }

  fetch('elements.json')
    .then(response => response.json())
    .then(elements => {
      const element = elements.find(
        el =>
          el.name.toLowerCase().includes(searchTerm) ||
          el.symbol.toLowerCase() === searchTerm
      )

      if (element) {
        displayElementInfo(element)
      } else {
        clearElementInfo()
      }
    })
    .catch(error => {
      clearElementInfo()
      const errorMessage = document.createElement('p')
      errorMessage.textContent =
        'Erro ao carregar os dados dos elementos químicos.'
      document.body.appendChild(errorMessage)
      console.error('Erro ao buscar os elementos:', error)
    })
}

// Função para carregar a tabela periódica do arquivo JSON
async function loadPeriodicTable() {
  const response = await fetch('periodicTable.json')
  const periodicTable = await response.json()
  return periodicTable
}

// Função para exibir tooltips
function createTooltip(element) {
  const tooltip = document.createElement('div')
  tooltip.className = 'tooltip'
  tooltip.innerHTML = `
    <strong>${element.name} (${element.symbol})</strong><br>
    Número Atômico: ${element.atomicNumber}<br>
    Massa Atômica: ${element.atomicMass || 'Desconhecida'}<br>
    Configuração Eletrônica: ${element.electronConfiguration || 'Desconhecida'}
  `
  document.body.appendChild(tooltip)

  return tooltip
}

function positionTooltip(tooltip, event) {
  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight
  const xOffset = 15 // Deslocamento horizontal
  const yOffset = 15 // Deslocamento vertical

  let left = event.pageX + xOffset
  let top = event.pageY + yOffset

  // Prevenção de overflow na borda da janela
  if (left + tooltipWidth > window.innerWidth) {
    left = event.pageX - tooltipWidth - xOffset
  }
  if (top + tooltipHeight > window.innerHeight) {
    top = event.pageY - tooltipHeight - yOffset
  }

  tooltip.style.left = `${left}px`
  tooltip.style.top = `${top}px`
}

// Função para associar tooltips às células da tabela
function addTooltipListeners(cell, element) {
  let tooltip

  cell.addEventListener('mouseenter', event => {
    tooltip = createTooltip(element)
    positionTooltip(tooltip, event)
  })

  cell.addEventListener('mousemove', event => {
    positionTooltip(tooltip, event)
  })

  cell.addEventListener('mouseleave', () => {
    tooltip.remove()
  })
}

// Função para exibir a tabela periódica completa
async function showPeriodicTable() {
  const container = document.getElementById('periodic-table-container')
  const lanthanidesContainer = document.getElementById('lanthanides-container')
  const actinidesContainer = document.getElementById('actinides-container')
  const button = document.getElementById('showPeriodicTable')

  if (container.style.display === 'grid') {
    container.style.display = 'none'
    lanthanidesContainer.style.display = 'none'
    actinidesContainer.style.display = 'none'
    button.textContent = 'Exibir a Tabela Periódica'
  } else {
    if (!container.innerHTML) {
      const periodicTable = await loadPeriodicTable()

      periodicTable.forEach(element => {
        const cell = document.createElement('div')
        cell.classList.add('periodic-table-cell')
        cell.innerHTML = `<strong>${element.symbol}</strong><br>${element.atomicNumber}`

        if (element.period === 6 && element.group === 3) {
          document.querySelector('.lanthanides-grid').appendChild(cell)
        } else if (element.period === 7 && element.group === 3) {
          document.querySelector('.actinides-grid').appendChild(cell)
        } else {
          cell.style.gridColumn = getGridColumn(element)
          cell.style.gridRow = getGridRow(element)
          container.appendChild(cell)
        }

        addTooltipListeners(cell, element)
        addModalListener(cell, element)
      })
    }
    container.style.display = 'grid'
    lanthanidesContainer.style.display = 'block'
    actinidesContainer.style.display = 'block'
    button.textContent = 'Ocultar a Tabela Periódica'
  }
}

// Função para criar a modal de detalhes
function createModal(element) {
  const modalOverlay = document.createElement('div')
  modalOverlay.className = 'modal-overlay'
  const modal = document.createElement('div')
  modal.className = 'modal'

  modal.innerHTML = `
    <h2>${element.name} (${element.symbol})</h2>
    <p><strong>Número Atômico:</strong> ${element.atomicNumber}</p>
    <p><strong>Massa Atômica:</strong> ${
      element.atomicMass || 'Desconhecida'
    }</p>
    <p><strong>Configuração Eletrônica:</strong> ${
      element.electronConfiguration || 'Desconhecida'
    }</p>
    <p><strong>Grupo:</strong> ${element.group}</p>
    <p><strong>Período:</strong> ${element.period}</p>
    <button class="close-modal">Fechar</button>
  `

  modalOverlay.appendChild(modal)
  document.body.appendChild(modalOverlay)

  modalOverlay.addEventListener('click', event => {
    if (
      event.target === modalOverlay ||
      event.target.classList.contains('close-modal')
    ) {
      modalOverlay.remove()
    }
  })
}

// Modificação na função de exibição das células para abrir a modal ao clicar
function addModalListener(cell, element) {
  cell.addEventListener('click', () => {
    createModal(element)
  })
}

// Função auxiliar para determinar a coluna da grade (grupo)
function getGridColumn(element) {
  return element.group === 0 ? 1 : element.group + 1
}

// Função auxiliar para determinar a linha da grade (período)
function getGridRow(element) {
  if (
    (element.period === 6 && element.group === 3) ||
    (element.period === 7 && element.group === 3)
  ) {
    return null // Exclui La-Lu e Ac-Lr da tabela principal
  }
  return element.period
}

// Função para exibir informações do elemento
function displayElementInfo(element) {
  clearElementInfo()

  const {
    name,
    symbol,
    atomicNumber,
    atomicMass,
    group,
    period,
    block,
    category,
    meltingPoint,
    boilingPoint,
    density,
    electronConfiguration
  } = element

  const infoContainer = document.createElement('div')
  infoContainer.classList.add('element-info')

  const title = document.createElement('h2')
  title.textContent = `${name} (${symbol})`
  infoContainer.appendChild(title)

  const table = document.createElement('table')
  table.classList.add('element-table')
  const headerRow = table.insertRow()
  headerRow.classList.add('element-header')
  ;['Propriedade', 'Valor'].forEach(text => {
    const th = document.createElement('th')
    th.textContent = text
    headerRow.appendChild(th)
  })

  const properties = [
    { label: 'Número Atômico', value: atomicNumber },
    { label: 'Massa Atômica', value: atomicMass },
    { label: 'Grupo', value: group },
    { label: 'Período', value: period },
    { label: 'Bloco', value: block },
    { label: 'Categoria', value: category },
    { label: 'Ponto de Fusão', value: meltingPoint },
    { label: 'Ponto de Ebulição', value: boilingPoint },
    { label: 'Densidade', value: density },
    { label: 'Configuração Eletrônica', value: electronConfiguration }
  ]
  properties.forEach(createTableRow)
  infoContainer.appendChild(table)

  // Insere o infoContainer dentro do main logo após a div de input
  const mainElement = document.querySelector('main')
  const inputDiv = document.querySelector('.input')
  mainElement.insertBefore(infoContainer, inputDiv.nextSibling)

  function createTableRow({ label, value }) {
    const row = table.insertRow()
    row.classList.add('element-cell')
    const labelCell = row.insertCell()
    const valueCell = row.insertCell()
    labelCell.textContent = label
    valueCell.textContent = value
  }
}

// Função para limpar informações do elemento
function clearElementInfo() {
  const infoContainer = document.querySelector('.element-info')
  if (infoContainer) {
    infoContainer.remove()
  }
}
