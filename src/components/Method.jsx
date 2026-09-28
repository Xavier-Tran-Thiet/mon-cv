import { useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import './Method.css';

export default function Method() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray('.method__step');
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (prefersReduced()) return;
      gsap.to('.method__bar', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.method__steps', start: 'top 60%', end: 'bottom 60%', scrub: true },
      });
      steps.forEach((step) => {
        gsap.from(step.children, {
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: step, start: 'top 75%', once: true },
        });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="methode" className="method section" data-scene="method">
      <div className="container method__grid">
        <div className="method__aside">
          <div className="method__sticky">
            <RevealTitle key={lang} className="h2">
              {t.method.title}
            </RevealTitle>
            <p className="lede">{t.method.intro}</p>
            <div className="method__index" aria-hidden="true">
              <span className="method__bar" />
              {t.method.steps.map((s, i) => (
                <span key={s.verb} className={i === active ? 'is-active' : undefined}>
                  {s.verb}
                </span>
              ))}
            </div>
          </div>
        </div>
        <ol className="method__steps">
          {t.method.steps.map((s) => (
            <li className="method__step" key={s.verb}>
              <h3 className="method__verb">{s.verb}</h3>
              <p className="method__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
