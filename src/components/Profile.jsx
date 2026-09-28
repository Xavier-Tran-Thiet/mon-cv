import { useRef } from 'react';
import { useLang } from '../i18n.jsx';
import { gsap, prefersReduced, useGSAP } from '../lib/motion.js';
import './Profile.css';

export default function Profile() {
  const { t, lang } = useLang();
  const root = useRef(null);

  // Les mots s'allument au rythme du défilement : la lecture suit le scroll.
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.fromTo(
        '.w',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.profile__text', start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
        },
      );
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true },
  );

  const words = t.profile.flatMap((seg, si) =>
    seg.t.split(/(\s+)/).map((w, wi) =>
      /^\s+$/.test(w) || w === '' ? (
        w
      ) : (
        <span key={`${si}-${wi}`} className={seg.hl ? 'w w--hl' : 'w'}>
          {w}
        </span>
      ),
    ),
  );

  return (
    <section ref={root} className="profile section" data-scene="profile">
      <div className="container">
        <p className="profile__text">{words}</p>
      </div>
    </section>
  );
}
