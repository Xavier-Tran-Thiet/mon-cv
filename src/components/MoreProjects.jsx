import { useEffect, useRef, useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import './MoreProjects.css';

export default function MoreProjects() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const [open, setOpen] = useState(0);
  const first = useRef(true);

  // L'accordéon change la hauteur de la page : on recale les déclencheurs après la transition.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    const id = setTimeout(() => ScrollTrigger.refresh(), 550);
    return () => clearTimeout(id);
  }, [open]);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.more__item', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '.more__list', start: 'top 88%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="more section" aria-labelledby="more-title">
      <div className="container">
        <RevealTitle key={lang} className="h2 more__title" id="more-title">
          {t.more.title}
        </RevealTitle>
        <ul className="more__list">
          {t.more.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.id} className={`more__item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="more__row"
                  aria-expanded={isOpen}
                  aria-controls={`more-${it.id}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="more__name">{it.name}</span>
                  <span className="more__pitch">{it.pitch}</span>
                  <span className="more__tag">{it.tag}</span>
                  <Plus className="more__icon" aria-hidden="true" />
                </button>
                <div id={`more-${it.id}`} className="more__panel" role="region" aria-label={it.name} inert={!isOpen}>
                  <div className="more__panel-inner">
                    <div className="more__panel-content">
                      <p>{it.detail}</p>
                      <ul className="chips" aria-label="Stack">
                        {it.stack.map((s) => (
                          <li className="chip" key={s}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
