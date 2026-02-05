import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Elite Fallback: Garantir que o fundo comece escuro para evitar flicker
if (typeof document !== 'undefined') {
  document.body.style.backgroundColor = '#0A0A0A';
  document.body.style.color = '#F8FAFC';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)