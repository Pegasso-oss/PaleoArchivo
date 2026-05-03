// src/hooks/useTranslatedDescription.js
import { useState, useEffect, useRef } from 'react';
import apiClient from '../api/apiClient';

// Cache global para no repetir llamadas entre navegaciones
const cache = {};

const useTranslatedDescription = (text, language) => {
  const [translated, setTranslated] = useState(text || '');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    // Español — no hace falta traducir
    if (!text || language === 'es' || text === null) {
      setTranslated(text);
      return;
    }

    const cacheKey = `${language}::${text.slice(0, 40)}`;

    // Usar caché si ya está traducido
    if (cache[cacheKey]) {
      setTranslated(cache[cacheKey]);
      return;
    }

    // Abortar llamada anterior si el idioma cambió rápido
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    apiClient.post('/translate', { text, target: language }, { signal: controller.signal })
      .then(res => {
        cache[cacheKey] = res.data.translated;
        setTranslated(res.data.translated);
      })
      .catch(err => {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          // Si falla, mostrar el texto original en español
          setTranslated(text);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [text, language]);

  return { translated, loading };
};

export default useTranslatedDescription;