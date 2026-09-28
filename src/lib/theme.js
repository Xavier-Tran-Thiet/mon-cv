import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'xtt-theme';
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

/** Thème effectif : choix explicite (data-theme) sinon préférence système. */
export function isDarkTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit === 'dark';
  return darkQuery().matches;
}

export function useTheme() {
  const [dark, setDark] = useState(isDarkTheme);

  useEffect(() => {
    const mq = darkQuery();
    const onChange = () => {
      setDark(isDarkTheme());
      window.dispatchEvent(new Event('xtt-theme'));
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = isDarkTheme() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* stockage indisponible : le choix vaut pour la session */
    }
    setDark(next === 'dark');
    window.dispatchEvent(new Event('xtt-theme'));
  }, []);

  return { dark, toggle };
}
