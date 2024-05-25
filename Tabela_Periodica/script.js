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

// Função para exibir informações do elemento (modularizada)
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
  document.body.appendChild(infoContainer)

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
