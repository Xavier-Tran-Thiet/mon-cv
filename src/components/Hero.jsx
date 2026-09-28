import { useRef } from 'react';
import { ArrowDownRight, DownloadSimple } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { profile } from '../content.js';
import { gsap, prefersReduced, scrollToTarget, useGSAP, useMagnetic } from '../lib/motion.js';
import './Hero.css';

const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function NameLine({ text, className }) {
  // Au survol, chaque lettre s'élargit (axe « wdth » de la police variable) puis revient.
  const stretch = (e) => {
    if (prefersReduced() || !fine()) return;
    gsap.to(e.currentTarget, { '--wdth': 150, duration: 0.35, ease: 'power3.out', yoyo: true, repeat: 1, overwrite: true });
  };
  return (
    <span className={`hero__line ${className ?? ''}`} aria-hidden="true">
      {[...text].map((c, i) => (
        <span className="hero__char" key={i} onPointerEnter={stretch}>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const eyebrowRef = useRef(null);
  const primaryRef = useRef(null);
  useMagnetic(primaryRef, 0.2);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
        .from('.hero__char', { '--wdth': 50, opacity: 0, yPercent: 70, duration: 1.5, stagger: 0.035 })
        .from('.hero__eyebrow', { opacity: 0, y: 12, duration: 0.8 }, 0.15)
        .from('.hero__sub', { opacity: 0, y: 24, duration: 1.1 }, 0.55)
        .from('.hero__ctas > *', { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, 0.7);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (prefersReduced() || !eyebrowRef.current) return;
      gsap.to(eyebrowRef.current, {
        duration: 1.6,
        delay: 0.2,
        scrambleText: { text: t.hero.eyebrow, chars: '01<>/_#', revealDelay: 0.35, speed: 0.5 },
      });
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section ref={root} id="top" className="hero" data-scene="hero">
      <div className="container">
        <div className="hero__content">
          <p className="hero__eyebrow eyebrow">
            <span key={lang} ref={eyebrowRef}>
              {t.hero.eyebrow}
            </span>
          </p>
          <h1 className="hero__name" aria-label={profile.name}>
            <NameLine text="Xavier" className="hero__line--outline" />
            <NameLine text="Tran-Thiet" />
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__ctas">
            <a
              ref={primaryRef}
              href="#projets"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#projets');
              }}
            >
              {t.hero.primary}
              <ArrowDownRight weight="bold" />
            </a>
            <a href={profile.cv[lang]} className="btn btn--ghost" download>
              <DownloadSimple weight="bold" />
              {t.hero.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
