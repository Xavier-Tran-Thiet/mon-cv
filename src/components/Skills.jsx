import { useRef } from 'react';
import { Cube, Kanban, Sparkle, Translate } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { mainStack } from '../content.js';
import { gsap, prefersReduced, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import TechLogo from './TechLogo.jsx';
import './Skills.css';

export default function Skills() {
  const { t, lang } = useLang();
  const s = t.skills;
  const root = useRef(null);
  const grid = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.cell', {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: grid.current, start: 'top 85%', once: true },
      });
    },
    { scope: root },
  );

  // Bordure lumineuse qui suit le pointeur sur toutes les cellules.
  const onPointerMove = (e) => {
    grid.current?.querySelectorAll('.cell').forEach((cell) => {
      const r = cell.getBoundingClientRect();
      cell.style.setProperty('--mx', `${e.clientX - r.left}px`);
      cell.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  };

  return (
    <section ref={root} id="competences" className="skills section" data-scene="skills" aria-labelledby="skills-title">
      <div className="container">
        <RevealTitle key={lang} className="h2 skills__title" id="skills-title">
          {s.title}
        </RevealTitle>

        <div ref={grid} className="bento" onPointerMove={onPointerMove}>
          <article className="cell cell--stack">
            <div className="cell__pattern" aria-hidden="true" />
            <h3 className="cell__title">{s.stack.title}</h3>
            <p className="cell__text cell__lead">{s.stack.text}</p>
            <ul className="logos">
              {mainStack.map((id) => (
                <TechLogo key={id} id={id} />
              ))}
            </ul>
            <div className="cell__also">
              <p className="cell__label">{s.stack.alsoLabel}</p>
              <ul className="chips">
                {s.stack.also.map((x) => (
                  <li className="chip" key={x}>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="cell cell--transfo">
            <Sparkle className="cell__icon" weight="duotone" aria-hidden="true" />
            <h3 className="cell__title">{s.transfo.title}</h3>
            <p className="cell__text">{s.transfo.text}</p>
          </article>

          <article className="cell cell--applied">
            <h3 className="cell__title">{s.applied.title}</h3>
            <ul className="chips">
              {s.applied.chips.map((x) => (
                <li className="chip chip--strong" key={x}>
                  {x}
                </li>
              ))}
            </ul>
          </article>

          <article className="cell cell--production">
            <Kanban className="cell__icon" weight="duotone" aria-hidden="true" />
            <h3 className="cell__title">{s.production.title}</h3>
            <p className="cell__text">{s.production.text}</p>
          </article>

          <article className="cell cell--product">
            <Cube className="cell__icon" weight="duotone" aria-hidden="true" />
            <h3 className="cell__title">{s.product.title}</h3>
            <p className="cell__text">{s.product.text}</p>
          </article>

          <article className="cell cell--sectors">
            <div className="sectors">
              <div>
                <h3 className="cell__label">{s.sectors.title}</h3>
                <ul className="sectors__list">
                  {s.sectors.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="cell__label">
                  <Translate aria-hidden="true" /> {s.sectors.langTitle}
                </h3>
                <dl className="langs">
                  {s.sectors.langs.map(([name, level]) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{level}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
