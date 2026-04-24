// src/hooks/useTranslation.js
// Uso: const { t, tSection } = useTranslation();
//   t('header.login')           → string
//   tSection('dinoDetail')      → objeto completo de la sección
//   t('profile.viewAll', { n: 5 }) → interpola {n}
//
// dietLabels se genera dinámicamente desde dietConfig.js —
// NO está en translations.js para evitar duplicación.

import { useUser } from '../context/useUser';
import { translations } from '../data/translations';
import { DIET_CONFIG } from '../data/dietConfig';

/**
 * Accede a cualquier clave de traducción con notación de punto.
 * Interpolación simple: t('profile.viewAll', { n: 5 })
 */
const resolve = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const interpolate = (str, vars = {}) => {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
};

export const useTranslation = () => {
  const { language } = useUser();
  const lang = translations[language] || translations['es'];

  /**
   * t('header.login') → "Iniciar Sesión"
   * t('profile.viewAll', { n: 7 }) → "Ver los 7 favoritos →"
   */
  const t = (path, vars) => {
    const value = resolve(lang, path);
    if (value === undefined) {
      // fallback a español
      const fallback = resolve(translations['es'], path);
      return interpolate(fallback ?? path, vars);
    }
    return interpolate(value, vars);
  };

  /**
   * tSection('dinoDetail') → objeto completo de la sección
   * tSection('dietLabels') → generado dinámicamente desde dietConfig
   */
  const tSection = (section) => {
    if (section === 'dietLabels') {
      // Genera el mapa { dieta: label } para el idioma activo
      return Object.fromEntries(
        Object.entries(DIET_CONFIG).map(([key, cfg]) => [
          key,
          cfg.labels[language] ?? cfg.labels['es'] ?? key,
        ])
      );
    }
    return lang[section] || translations['es'][section] || {};
  };

  return { t, tSection, language };
};
