import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'animate.css'
import './index.css'
import { GameContextProvider } from './context/index.ts'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </Router>
  </React.StrictMode>
)
