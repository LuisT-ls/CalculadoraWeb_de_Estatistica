// Configuração inicial e gerenciamento do modo escuro
class DarkModeManager {
  constructor() {
    this.init()
  }

  init() {
    this.loadInitialState()
    this.setupEventListeners()
  }

  prefersDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  }

  loadDarkModePreference() {
    const savedPreference = localStorage.getItem('darkMode')
    return savedPreference === null
      ? this.prefersDarkMode()
      : savedPreference === 'true'
  }

  saveDarkModePreference(isDark) {
    localStorage.setItem('darkMode', isDark)
  }

  updateUI(isDark) {
    const body = document.body
    const button = document.getElementById('toggleDarkMode')

    body.classList.toggle('dark-mode', isDark)

    button.innerHTML = isDark
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'

    button.setAttribute(
      'aria-label',
      isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
    )
  }

  toggle() {
    const isDark = !document.body.classList.contains('dark-mode')
    this.updateUI(isDark)
    this.saveDarkModePreference(isDark)
  }

  loadInitialState() {
    const shouldBeDark = this.loadDarkModePreference()
    this.updateUI(shouldBeDark)
  }

  setupEventListeners() {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
          if (localStorage.getItem('darkMode') === null) {
            this.updateUI(e.matches)
          }
        })
    }
  }
}

// Gerenciamento da Tabela Periódica
class PeriodicTableManager {
  constructor() {
    this.container = document.getElementById('periodic-table-container')
    this.lanthanidesContainer = document.getElementById('lanthanides-container')
    this.actinidesContainer = document.getElementById('actinides-container')
    this.button = document.getElementById('showPeriodicTable')
    this.elementsData = null
    this.periodicTable = null
  }

  async loadData() {
    try {
      const [elementsResponse, tableResponse] = await Promise.all([
        fetch('elements.json'),
        fetch('periodicTable.json')
      ])
      this.elementsData = await elementsResponse.json()
      this.periodicTable = await tableResponse.json()
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  getGridPosition(element) {
    if (
      (element.period === 6 && element.group === 3) ||
      (element.period === 7 && element.group === 3)
    ) {
      return { column: null, row: null }
    }
    return {
      column: element.group === 0 ? 1 : element.group + 1,
      row: element.period
    }
  }

  createElementCell(element, index) {
    const cell = document.createElement('div')
    cell.classList.add('periodic-table-cell')
    cell.innerHTML = `
      <div class="atomic-number">${element.atomicNumber}</div>
      <div class="symbol">${element.symbol}</div>
      <div class="name">${element.name}</div>
      <div class="mass">${element.atomicMass}</div>
    `
    cell.style.setProperty('--animation-delay', `${index * 0.05}s`)

    this.addInteractivity(cell, element)
    return cell
  }

  addInteractivity(cell, element) {
    let tooltip = null

    cell.addEventListener('mouseenter', event => {
      tooltip = this.createTooltip(element)
      this.positionTooltip(tooltip, event)
    })

    cell.addEventListener('mousemove', event => {
      this.positionTooltip(tooltip, event)
    })

    cell.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.remove()
    })

    cell.addEventListener('click', () => {
      this.showModal(element)
    })
  }

  createTooltip(element) {
    const tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.innerHTML = `
      <strong>${element.name} (${element.symbol})</strong><br>
      Número Atômico: ${element.atomicNumber}<br>
      Massa Atômica: ${element.atomicMass || 'Desconhecida'}<br>
      Configuração Eletrônica: ${
        element.electronConfiguration || 'Desconhecida'
      }
    `
    document.body.appendChild(tooltip)
    return tooltip
  }

  positionTooltip(tooltip, event) {
    if (!tooltip) return

    const padding = 15
    let x = event.pageX + padding
    let y = event.pageY + padding

    const tooltipRect = tooltip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    if (x + tooltipRect.width > viewportWidth) {
      x = event.pageX - tooltipRect.width - padding
    }
    if (y + tooltipRect.height > viewportHeight) {
      y = event.pageY - tooltipRect.height - padding
    }

    tooltip.style.left = `${x}px`
    tooltip.style.top = `${y}px`
  }

  showModal(element) {
    const modalHTML = `
      <div class="modal-overlay">
        <div class="modal">
          <h2>${element.name} (${element.symbol})</h2>
          <div class="modal-content">
            <p><strong>Número Atômico:</strong> ${element.atomicNumber}</p>
            <p><strong>Massa Atômica:</strong> ${
              element.atomicMass || 'Desconhecida'
            }</p>
            <p><strong>Configuração Eletrônica:</strong> ${
              element.electronConfiguration || 'Desconhecida'
            }</p>
            <p><strong>Grupo:</strong> ${element.group}</p>
            <p><strong>Período:</strong> ${element.period}</p>
            <p><strong>Categoria:</strong> ${element.category}</p>
            <p><strong>Densidade:</strong> ${
              element.density || 'Desconhecida'
            }</p>
            <p><strong>Ponto de Fusão:</strong> ${
              element.meltingPoint || 'Desconhecido'
            }</p>
            <p><strong>Ponto de Ebulição:</strong> ${
              element.boilingPoint || 'Desconhecido'
            }</p>
          </div>
          <button class="close-modal">Fechar</button>
        </div>
      </div>
    `

    const modalElement = document
      .createRange()
      .createContextualFragment(modalHTML)
    document.body.appendChild(modalElement)

    document
      .querySelector('.modal-overlay')
      .addEventListener('click', event => {
        if (event.target.matches('.modal-overlay, .close-modal')) {
          document.querySelector('.modal-overlay').remove()
        }
      })
  }

  async toggleDisplay() {
    const isVisible = this.container.style.display === 'grid'

    if (isVisible) {
      this.container.style.display = 'none'
      this.lanthanidesContainer.style.display = 'none'
      this.actinidesContainer.style.display = 'none'
      this.button.textContent = 'Exibir a Tabela Periódica'
    } else {
      if (!this.elementsData) {
        await this.loadData()
      }

      if (!this.container.innerHTML) {
        this.renderTable()
      }

      this.container.style.display = 'grid'
      this.lanthanidesContainer.style.display = 'block'
      this.actinidesContainer.style.display = 'block'
      this.button.textContent = 'Ocultar a Tabela Periódica'
    }
  }

  renderTable() {
    this.elementsData.forEach((element, index) => {
      const cell = this.createElementCell(element, index)
      const { column, row } = this.getGridPosition(element)

      if (row === null) {
        if (element.period === 6) {
          document.querySelector('.lanthanides-grid').appendChild(cell)
        } else {
          document.querySelector('.actinides-grid').appendChild(cell)
        }
      } else {
        cell.style.gridColumn = column
        cell.style.gridRow = row
        this.container.appendChild(cell)
      }
    })
  }
}

// Gerenciamento da Busca
class SearchManager {
  constructor() {
    this.searchInput = document.getElementById('search')
    this.suggestionsList = document.getElementById('suggestions-list')
    this.elementsData = null
    this.init()
  }

  async init() {
    try {
      const response = await fetch('elements.json')
      this.elementsData = await response.json()
      this.setupEventListeners()
    } catch (error) {
      console.error('Erro ao carregar elementos:', error)
    }
  }

  setupEventListeners() {
    this.searchInput.addEventListener('input', () => this.handleSearch())
    document.addEventListener('click', e => {
      if (
        !this.searchInput.contains(e.target) &&
        !this.suggestionsList.contains(e.target)
      ) {
        this.clearSuggestions()
      }
    })
  }

  handleSearch() {
    const searchTerm = this.searchInput.value.toLowerCase().trim()
    if (!searchTerm) {
      this.clearSuggestions()
      return
    }

    const matches = this.elementsData.filter(
      element =>
        element.name.toLowerCase().startsWith(searchTerm) ||
        element.symbol.toLowerCase().startsWith(searchTerm)
    )

    this.displaySuggestions(matches)
  }

  displaySuggestions(matches) {
    this.clearSuggestions()

    if (matches.length === 0) {
      this.suggestionsList.classList.remove('show')
      return
    }

    matches.forEach(element => {
      const li = document.createElement('li')
      li.textContent = `${element.name} (${element.symbol})`
      li.tabIndex = 0
      li.addEventListener('click', () => {
        this.searchInput.value = element.name
        this.clearSuggestions()
        this.displayElementInfo(element)
      })
      this.suggestionsList.appendChild(li)
    })

    this.suggestionsList.style.display = 'block'
    this.searchInput.setAttribute('aria-expanded', 'true')
  }

  clearSuggestions() {
    this.suggestionsList.innerHTML = ''
    this.suggestionsList.style.display = 'none'
    this.searchInput.setAttribute('aria-expanded', 'false')
  }

  displayElementInfo(element) {
    const infoContainer =
      document.querySelector('.element-info') || document.createElement('div')
    infoContainer.className = 'element-info'
    infoContainer.innerHTML = `
      <h2>${element.name} (${element.symbol})</h2>
      <table class="element-table">
        <tr class="element-header">
          <th>Propriedade</th>
          <th>Valor</th>
        </tr>
        ${this.createInfoRows(element)}
      </table>
    `

    const mainElement = document.querySelector('main')
    const inputDiv = document.querySelector('.input')
    mainElement.insertBefore(infoContainer, inputDiv.nextSibling)
  }

  createInfoRows(element) {
    const properties = [
      { label: 'Número Atômico', value: element.atomicNumber },
      { label: 'Massa Atômica', value: element.atomicMass },
      { label: 'Grupo', value: element.group },
      { label: 'Período', value: element.period },
      { label: 'Bloco', value: element.block },
      { label: 'Categoria', value: element.category },
      { label: 'Ponto de Fusão', value: element.meltingPoint },
      { label: 'Ponto de Ebulição', value: element.boilingPoint },
      { label: 'Densidade', value: element.density },
      { label: 'Configuração Eletrônica', value: element.electronConfiguration }
    ]

    return properties
      .map(
        ({ label, value }) => `
        <tr class="element-cell">
          <td>${label}</td>
          <td>${value || 'Não disponível'}</td>
        </tr>
      `
      )
      .join('')
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const darkMode = new DarkModeManager()
  const periodicTable = new PeriodicTableManager()
  const search = new SearchManager()

  // Event Listeners
  document
    .getElementById('toggleDarkMode')
    .addEventListener('click', () => darkMode.toggle())
  document
    .getElementById('showPeriodicTable')
    .addEventListener('click', () => periodicTable.toggleDisplay())
})
