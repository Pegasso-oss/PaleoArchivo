// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [language, setLanguageState] = useState(() => localStorage.getItem('lang') || 'es');

  // Persistir tema + clase CSS
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${theme}-theme`);
    root.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // Persistir idioma en localStorage
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    language,
    setLanguage,
  }), [theme, language]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// useUser se exporta desde context/useUser.js — importa siempre desde ahí
