import { useRef } from 'react';
import { gsap, prefersReduced, SplitText, useGSAP } from '../lib/motion.js';

/**
 * Titre révélé ligne par ligne derrière un masque quand il entre à l'écran.
 * Le parent le remonte (key={lang}) au changement de langue : SplitText
 * réécrit le DOM, React ne doit pas réconcilier ce contenu.
 */
export default function RevealTitle({ as: Tag = 'h2', className, children, id }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) return undefined;
      const split = SplitText.create(ref.current, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          }),
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
