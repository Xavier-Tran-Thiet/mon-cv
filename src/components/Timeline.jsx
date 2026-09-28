import { useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import './Timeline.css';

export default function Timeline() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const yearRef = useRef(null);
  const [active, setActive] = useState(0);
  const role = t.timeline.roles[active];

  useGSAP(
    () => {
      gsap.utils.toArray('.role').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      if (prefersReduced()) return;
      gsap.to('.roles__fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.roles', start: 'top 55%', end: 'bottom 55%', scrub: true },
      });
      gsap.from('.role', {
        opacity: 0,
        x: 30,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.roles', start: 'top 80%', once: true },
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  // L'année affichée se « décode » à chaque changement de poste.
  useGSAP(
    () => {
      if (prefersReduced() || !yearRef.current) return;
      gsap.to(yearRef.current, {
        duration: 0.9,
        scrambleText: { text: role.year, chars: '0123456789', speed: 0.6 },
      });
    },
    { scope: root, dependencies: [role.year] },
  );

  return (
    <section ref={root} id="parcours" className="timeline section" data-scene="timeline" aria-labelledby="timeline-title">
      <div className="container">
        <div className="timeline__head">
          <p className="eyebrow">{t.timeline.eyebrow}</p>
          <RevealTitle key={lang} className="h2" id="timeline-title">
            {t.timeline.title}
          </RevealTitle>
        </div>

        <div className="timeline__grid">
          <div className="timeline__aside" aria-hidden="true">
            <div className="timeline__sticky">
              <p className="timeline__year">
                <span key={role.year} ref={yearRef}>
                  {role.year}
                </span>
              </p>
              <p className="timeline__current">{role.title}</p>
            </div>
          </div>

          <div>
            <div className="roles-wrap">
              <span className="roles__track" aria-hidden="true">
                <span className="roles__fill" />
              </span>
              <ol className="roles">
              {t.timeline.roles.map((r, i) => (
                <li key={r.dates} className={`role${i === active ? ' is-active' : ''}`}>
                  <p className="role__dates">{r.dates}</p>
                  <h3 className="role__title">{r.title}</h3>
                  <p className="role__place">{r.place}</p>
                  <p className="role__text">{r.text}</p>
                </li>
              ))}
              </ol>
            </div>

            <div className="edu">
              <h3 className="edu__title">{t.timeline.eduTitle}</h3>
              <ul className="edu__list">
                {t.timeline.education.map((e) => (
                  <li key={e.school} className="edu__item">
                    <p className="role__dates">{e.dates}</p>
                    <p className="edu__school">{e.school}</p>
                    <p className="edu__text">{e.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
