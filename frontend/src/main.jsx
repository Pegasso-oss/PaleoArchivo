import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { FavoritesProvider } from './context/FavoritesContext' // 1. Importamos el nuevo Provider
import ScrollToTop from './components/ScrollToTop'
import './app.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      {/* 2. Envolvemos con el sistema de favoritos */}
      <FavoritesProvider> 
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </UserProvider>
  </React.StrictMode>,
)