import { useEffect, useRef, useState } from 'react';
import { List, Moon, Sun, X } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { useTheme } from '../lib/theme.js';
import { ScrollTrigger, scrollToTarget, setScrollLocked, useMagnetic } from '../lib/motion.js';
import './Nav.css';

const SECTION_IDS = ['projets', 'methode', 'competences', 'parcours', 'contact'];

function LangSwitch({ lang, setLang, label }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {['fr', 'en'].map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const { dark, toggle } = useTheme();
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);
  const ctaRef = useRef(null);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);
  useMagnetic(ctaRef, 0.22);

  useEffect(() => {
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    const top = ScrollTrigger.create({
      trigger: '#top',
      start: 'top top',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActive(null),
    });
    const sections = SECTION_IDS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(id),
      }),
    );
    return () => [progress, top, ...sections].forEach((s) => s.kill());
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (open) {
      firstLinkRef.current?.focus();
      const onKey = (e) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return undefined;
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    menuBtnRef.current?.focus();
  };

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    setScrollLocked(false);
    scrollToTarget(`#${id}`);
  };

  const themeLabel = dark ? t.nav.theme.toLight : t.nav.theme.toDark;

  return (
    <header className="nav">
      <div className="nav__bar">
        <a className="nav__logo" href="#top" onClick={(e) => go(e, 'top')} aria-label={`Xavier Tran-Thiet, ${t.nav.home}`}>
          XTT<i aria-hidden="true" />
        </a>

        <nav className="nav__links" aria-label="Sections">
          {t.nav.links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link${active === l.id ? ' is-active' : ''}`}
              aria-current={active === l.id ? 'true' : undefined}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.lang} />
          <button type="button" className="icon-btn" onClick={toggle} aria-label={themeLabel} title={themeLabel}>
            {dark ? <Sun weight="regular" /> : <Moon weight="regular" />}
          </button>
          <a ref={ctaRef} href="#contact" className="btn btn--primary nav__cta" onClick={(e) => go(e, 'contact')}>
            {t.nav.contact}
          </a>
          <button
            ref={menuBtnRef}
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
            onClick={() => setOpen(true)}
          >
            <List />
          </button>
        </div>
        <span className="nav__progress" ref={progressRef} aria-hidden="true" />
      </div>

      <div id="mobile-menu" className={`menu${open ? ' is-open' : ''}`} inert={!open} aria-label={t.nav.menu}>
        <button type="button" className="icon-btn menu__close" onClick={closeMenu} aria-label={t.nav.close}>
          <X />
        </button>
        <nav className="menu__links" aria-label="Sections">
          {[...t.nav.links, { id: 'contact', label: t.nav.contact }].map((l, i) => (
            <a
              key={l.id}
              ref={i === 0 ? firstLinkRef : undefined}
              href={`#${l.id}`}
              style={{ '--i': i }}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
