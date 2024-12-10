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
  for (const button of buttons) {
    button.addEventListener('mouseenter', handleButtonHover)
    button.addEventListener('mouseleave', handleButtonLeave)
    button.addEventListener('click', handleButtonClick)
  }
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
