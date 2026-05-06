import React from 'react';
import { inject } from '@vercel/analytics';
inject();
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { TimelineProvider } from './hooks/useTimeline.jsx'
import ScrollToTop from './components/ScrollToTop'
import './app.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <FavoritesProvider>
        <TimelineProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </TimelineProvider>
      </FavoritesProvider>
    </UserProvider>
  </React.StrictMode>,
)
