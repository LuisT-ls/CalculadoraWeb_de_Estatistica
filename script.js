'use strict'

// Constants for DOM elements and configuration
const DARK_MODE_KEY = 'calculatorDarkMode'
const LAST_CALC_KEY = 'lastCalculator'
const ANIMATION_DURATION = 300

// Cache DOM elements
const darkModeToggle = document.getElementById('toggleDarkMode')
const container = document.querySelector('.container')
const buttons = document.querySelectorAll('.button-container button')

// State management
let isDarkMode = localStorage.getItem(DARK_MODE_KEY) === 'true'
let isTransitioning = false

// Initialize the application
function initializeApp() {
  // Set initial theme
  updateTheme(isDarkMode, false)

  // Add event listeners
  setupEventListeners()

  // Check for returning users
  handleReturningUser()

  // Add button hover effects
  setupButtonEffects()
}

// Set up event listeners
function setupEventListeners() {
  // Dark mode toggle
  darkModeToggle.addEventListener('click', handleDarkModeToggle)

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts)

  // Add transition end listener
  document.body.addEventListener('transitionend', () => {
    isTransitioning = false
  })
}

// Handle dark mode toggle
function handleDarkModeToggle() {
  if (isTransitioning) return

  isTransitioning = true
  isDarkMode = !isDarkMode

  updateTheme(isDarkMode, true)
  localStorage.setItem(DARK_MODE_KEY, isDarkMode)

  // Animate toggle button
  darkModeToggle.style.transform = 'scale(0.8) rotate(360deg)'
  setTimeout(() => {
    darkModeToggle.style.transform = ''
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙'
  }, ANIMATION_DURATION)
}

// Update theme
function updateTheme(darkMode, animate) {
  const body = document.body

  if (animate) {
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease'
  }

  if (darkMode) {
    body.classList.add('dark-mode')
  } else {
    body.classList.remove('dark-mode')
  }

  if (!animate) {
    setTimeout(() => {
      body.style.transition = ''
    }, 0)
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
  // Alt + D for dark mode toggle
  if (event.altKey && event.key.toLowerCase() === 'd') {
    event.preventDefault()
    handleDarkModeToggle()
  }
}

// Handle calculator redirections
function redirectToCalculator(path) {
  // Save last used calculator
  localStorage.setItem(LAST_CALC_KEY, path)

  // Add transition effect
  container.style.opacity = '0'
  container.style.transform = 'scale(0.98)'

  // Redirect after animation
  setTimeout(() => {
    window.location.href = path
  }, ANIMATION_DURATION)
}

// Setup button effects
function setupButtonEffects() {
  buttons.forEach(button => {
    button.addEventListener('mouseenter', handleButtonHover)
    button.addEventListener('mouseleave', handleButtonLeave)
    button.addEventListener('click', handleButtonClick)
  })
}

// Button hover effect
function handleButtonHover(event) {
  const button = event.currentTarget
  const span = button.querySelector('span')

  span.style.transform = 'scale(1.05)'
  button.style.transform = 'translateY(-8px) scale(1.02)'
}

// Button leave effect
function handleButtonLeave(event) {
  const button = event.currentTarget
  const span = button.querySelector('span')

  span.style.transform = ''
  button.style.transform = ''
}

// Button click effect
function handleButtonClick(event) {
  const button = event.currentTarget

  button.style.transform = 'translateY(2px) scale(0.98)'
  setTimeout(() => {
    button.style.transform = ''
  }, 150)
}

// Handle returning users
function handleReturningUser() {
  const lastCalc = localStorage.getItem(LAST_CALC_KEY)

  if (lastCalc) {
    const calculatorName = lastCalc
      .split('/')[0]
      .replace('Calculadora_', '')
      .replace('_', ' ')

    // Show welcome back message
    const welcomeMessage = document.querySelector('p')
    welcomeMessage.textContent = `Bem-vindo de volta! Sua última calculadora foi: ${calculatorName}`
  }
}

// Performance optimization for animations
function optimizeAnimations() {
  const supportsIntersectionObserver = 'IntersectionObserver' in window

  if (supportsIntersectionObserver) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.visibility = 'visible'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    buttons.forEach(button => {
      button.style.visibility = 'hidden'
      observer.observe(button)
    })
  }
}

// Error handling
function handleError(error) {
  console.error('An error occurred:', error)

  // Show user-friendly error message if needed
  const errorMessage = document.createElement('div')
  errorMessage.className = 'error-message'
  errorMessage.textContent = 'Ocorreu um erro. Por favor, recarregue a página.'

  document.body.appendChild(errorMessage)

  setTimeout(() => {
    errorMessage.remove()
  }, 5000)
}

// Initialize the application with error handling
try {
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp()
    optimizeAnimations()
  })
} catch (error) {
  handleError(error)
}

// Add service worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log(
          'ServiceWorker registered successfully:',
          registration.scope
        )
      })
      .catch(error => {
        console.error('ServiceWorker registration failed:', error)
      })
  })
}

function initializeFirebaseTracking() {
  if (firebase && firebase.analytics) {
    const analytics = firebase.analytics()
    const performance = firebase.performance()

    // Enhanced event tracking
    function trackEvent(eventName, eventData = {}) {
      try {
        analytics.logEvent(eventName, {
          ...eventData,
          page_location: window.location.href,
          page_path: window.location.pathname,
          timestamp: new Date().toISOString()
        })
      } catch (error) {
        console.error('Event tracking error:', error)
      }
    }

    // Page load performance tracking
    const pageLoadTrace = performance.trace('page_load')
    pageLoadTrace.start()

    window.addEventListener('load', () => {
      pageLoadTrace.stop()

      // Track page load performance
      trackEvent('page_performance', {
        load_time: performance.now()
      })
    })

    // Calculator interaction tracking
    document.querySelectorAll('.button-container button').forEach(button => {
      button.addEventListener('click', () => {
        const calculatorName = button.querySelector('span').textContent
        trackEvent('calculator_interaction', {
          calculator_type: calculatorName,
          interaction_type: 'click'
        })
      })
    })

    // Page engagement tracking
    let startTime = new Date()
    window.addEventListener('beforeunload', () => {
      const timeSpent = (new Date() - startTime) / 1000 // in seconds
      trackEvent('page_engagement', {
        time_on_page: timeSpent
      })
    })
  }
}

function redirectToCalculator(path) {
  if (typeof firebase !== 'undefined' && firebase.analytics) {
    const calculatorName = path
      .split('/')[0]
      .replace('Calculadora_', '')
      .replace('_', ' ')
    firebase.analytics().logEvent('calculator_selected', {
      calculator_type: calculatorName
    })
  }

  // Salvar último calculador usado
  localStorage.setItem(LAST_CALC_KEY, path)

  // Adicionar efeito de transição
  container.style.opacity = '0'
  container.style.transform = 'scale(0.98)'

  // Redirecionar após animação
  setTimeout(() => {
    window.location.href = path
  }, ANIMATION_DURATION)
}

// Adicionar inicialização do tracking quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeFirebaseTracking)
