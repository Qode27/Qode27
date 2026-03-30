import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const redirectedPath = window.sessionStorage.getItem('qode27.redirect')

if (redirectedPath) {
  window.sessionStorage.removeItem('qode27.redirect')
  window.history.replaceState(null, '', redirectedPath)
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
