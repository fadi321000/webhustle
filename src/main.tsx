import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AmbientBackground } from './components/AmbientBackground'
import './styles/tokens.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AmbientBackground />
      <div className="app-content"><App /></div>
    </BrowserRouter>
  </React.StrictMode>,
)
