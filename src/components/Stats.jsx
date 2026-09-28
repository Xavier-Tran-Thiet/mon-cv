import { useRef } from 'react';
import { useLang } from '../i18n.jsx';
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '../lib/motion.js';
import './Stats.css';

const format = (value, lang) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(value);

export default function Stats() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.stat', {
        opacity: 0,
        y: 32,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
      });
      // Les compteurs démarrent à 0 quand la bande entre à l'écran.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          root.current.querySelectorAll('[data-count]').forEach((el) => {
            const { count, prefix = '', suffix = '' } = el.dataset;
            const counter = { v: 0 };
            gsap.to(counter, {
              v: Number(count),
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = prefix + format(Math.round(counter.v), langRef.current) + suffix;
              },
            });
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stats" aria-label={lang === 'fr' ? 'En chiffres' : 'In numbers'}>
      <div className="container">
        <dl className="stats__grid">
          {t.stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__num">
                <span key={lang} data-count={s.value} data-prefix={s.prefix ?? ''} data-suffix={s.suffix ?? ''}>
                  {(s.prefix ?? '') + format(s.value, lang) + (s.suffix ?? '')}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
