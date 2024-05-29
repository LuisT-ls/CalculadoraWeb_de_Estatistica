// Função para alternar o modo escuro (simplificada com operador ternário)
function toggleDarkMode() {
  const body = document.body
  const button = document.getElementById('toggleDarkMode')

  body.classList.toggle('dark-mode')
  button.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙'
  button.classList.toggle('light-mode', !body.classList.contains('dark-mode'))
}

document.addEventListener('DOMContentLoaded', toggleDarkMode)

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

// Função para exibir a tabela periódica completa
async function showPeriodicTable() {
  const container = document.getElementById('periodic-table-container')
  const button = document.getElementById('showPeriodicTable') // Obter o botão

  if (container.style.display === 'grid') {
    // A tabela está visível, então vamos ocultá-la
    container.style.display = 'none'
    button.textContent = 'Exibir a Tabela Periódica'
  } else {
    container.innerHTML = '' // Limpa o contêiner caso esteja vazio

    const periodicTable = await loadPeriodicTable()

    periodicTable.forEach(element => {
      const cell = document.createElement('div')
      cell.classList.add('periodic-table-cell')
      cell.style.gridColumn = getGridColumn(element)
      cell.style.gridRow = getGridRow(element)
      cell.innerHTML = `<strong>${element.symbol}</strong><br>${element.atomicNumber}`
      container.appendChild(cell)
    })

    container.style.display = 'grid'
    button.textContent = 'Ocultar a Tabela Periódica'
  }
}

// Função auxiliar para determinar a coluna da grade (grupo)
function getGridColumn(element) {
  if (element.period === 6 && element.group >= 3 && element.group <= 12) {
    return element.group + 2 // Adaptação para a série dos lantanídeos
  } else if (
    element.period === 7 &&
    element.group >= 3 &&
    element.group <= 12
  ) {
    return element.group + 2 // Adaptação para a série dos actinídeos
  }
  return element.group
}

// Função auxiliar para determinar a linha da grade (período)
function getGridRow(element) {
  if (element.period >= 6 && element.group >= 3 && element.group <= 12) {
    return element.period + 1 // Adaptação para a série dos lantanídeos e actinídeos
  }
  return element.period
}

// Função para exibir informações do elemento (sem alterações)
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

// Função para limpar informações do elemento (sem alterações)
function clearElementInfo() {
  const infoContainer = document.querySelector('.element-info')
  if (infoContainer) {
    infoContainer.remove()
  }
}

// Event listener para o botão de mostrar a tabela periódica completa
document
  .getElementById('show-periodic-table-btn')
  .addEventListener('click', showPeriodicTable)
