import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from "./components/ScrollToTop.jsx"; 
import './index.css' // Tailwind
import './app.css'   // Tus estilos personalizados (AÑADE ESTA LÍNEA)
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)