import { useEffect, useRef } from 'react';
import { ParticleEngine } from '../three/ParticleEngine.js';
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion.js';
import { isDarkTheme } from '../lib/theme.js';

// Forme, position et opacité du nuage pour chaque section (attribut data-scene).
const SCENES = {
  hero: { shape: 0, x: 1.85, y: 0.05, scale: 1, alpha: 1, mobile: { x: 0, y: 1.35, scale: 0.78, alpha: 0.9 } },
  profile: { shape: 1, x: 0, y: -0.1, scale: 1, alpha: 0.55, mobile: { alpha: 0.4 } },
  method: { shape: 2, x: 3.75, y: 0, scale: 1, alpha: 0.55, mobile: { x: 0, alpha: 0.3 } },
  projects: { shape: 3, x: 0, y: 0, scale: 1.25, alpha: 0.45, mobile: { scale: 0.8, alpha: 0.3 } },
  skills: { shape: 4, x: 2.7, y: 0, scale: 1.1, alpha: 0.55, mobile: { x: 0, alpha: 0.3 } },
  timeline: { shape: 5, x: -2.3, y: -0.2, scale: 1, alpha: 0.8, mobile: { x: 0, scale: 0.7, alpha: 0.35 } },
  contact: { shape: 0, x: 2.3, y: 0, scale: 0.95, alpha: 1, mobile: { x: 0, y: 1.5, scale: 0.7, alpha: 0.6 } },
};

const isMobile = () => window.innerWidth < 900;
const configFor = (name) => {
  const { mobile, ...desktop } = SCENES[name] ?? SCENES.hero;
  return isMobile() ? { ...desktop, ...mobile } : desktop;
};

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let engine;
    try {
      engine = new ParticleEngine(canvas, { count: isMobile() ? 6500 : 14000, reduced: prefersReduced() });
    } catch {
      return undefined; // WebGL indisponible : le site reste complet sans la scène.
    }

    const applyTheme = () => {
      const styles = getComputedStyle(document.documentElement);
      engine.setTheme({
        base: styles.getPropertyValue('--particle').trim(),
        accent: styles.getPropertyValue('--particle-accent').trim(),
        dark: isDarkTheme(),
      });
    };
    applyTheme();
    window.addEventListener('xtt-theme', applyTheme);

    let current = 'hero';
    engine.setScene(configFor(current), true);

    const triggers = Array.from(document.querySelectorAll('[data-scene]')).map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return;
          current = el.dataset.scene;
          engine.setScene(configFor(current));
        },
      }),
    );

    let lastWidth = window.innerWidth;
    const onResize = () => {
      engine.resize();
      // Sur mobile, la barre d'adresse change la hauteur : on ne recale que si la largeur change.
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        engine.setScene(configFor(current), true);
      }
    };
    const onPointer = (e) => engine.pointer(e.clientX, e.clientY);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });

    engine.start();
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.out' });

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener('xtt-theme', applyTheme);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="field" aria-hidden="true" />;
}
