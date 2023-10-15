import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'animate.css'
import './index.css'
import { GameContextProvider } from './context/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GameContextProvider>
    <App />
  </GameContextProvider>
  // </React.StrictMode>
)
