import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content } from './content.js';

const LangContext = createContext(null);
const STORAGE_KEY = 'xtt-lang';

function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    /* stockage indisponible */
  }
  return (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
