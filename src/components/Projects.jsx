import { useRef } from 'react';
import { useLang } from '../i18n.jsx';
import { gsap, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import ProjectVisual from './ProjectVisual.jsx';
import './Projects.css';

// Même condition que le CSS : défilement horizontal épinglé sur grand écran, animations autorisées.
const PAN_QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

function Panel({ p }) {
  return (
    <article className="panel" aria-labelledby={`p-${p.id}`}>
      <div className="panel__media">
        <ProjectVisual id={p.id} label={`Logo ${p.name}`} />
      </div>
      <div className="panel__body">
        <div className="panel__top">
          <p className="panel__meta">
            <span className="panel__date">{p.date}</span>
            <span>{p.context}</span>
          </p>
          <h3 className="panel__name" id={`p-${p.id}`}>
            {p.name}
          </h3>
          <p className="panel__pitch">{p.pitch}</p>
          <p className="panel__detail">{p.detail}</p>
        </div>
        <div className="panel__bottom">
          <dl className="panel__metrics">
            {p.metrics.map(([value, label]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <ul className="chips" aria-label="Stack">
            {p.stack.map((s) => (
              <li className="chip" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { t, lang } = useLang();
  const section = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PAN_QUERY, () => {
        const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
        const pan = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        // Le fantôme du logo glisse derrière le logo pendant le défilement horizontal (effet de profondeur).
        gsap.utils.toArray('.panel').forEach((panel) => {
          gsap.fromTo(
            panel.querySelector('.visual__ghost'),
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: { trigger: panel, containerAnimation: pan, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });
      });

      mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.panel').forEach((panel) => {
          gsap.from(panel, {
            opacity: 0,
            y: 48,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: panel, start: 'top 88%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: section, dependencies: [lang], revertOnUpdate: true },
  );

  return (
    // id et data-scene sont sur le conteneur : sa hauteur inclut la durée d'épinglage.
    <div className="projects-wrap" id="projets" data-scene="projects">
      <section ref={section} className="projects" aria-labelledby="projects-title">
        <div className="container projects__head">
          <div className="projects__heading">
            <p className="eyebrow">{t.projects.eyebrow}</p>
            <RevealTitle key={lang} className="h2" id="projects-title">
              {t.projects.title}
            </RevealTitle>
            <p className="lede">{t.projects.sub}</p>
          </div>
          <div className="projects__progress" aria-hidden="true">
            <span ref={bar} />
          </div>
        </div>
        <div ref={track} className="projects__track">
          {t.projects.items.map((p) => (
            <Panel key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
