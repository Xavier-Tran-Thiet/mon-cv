import { lazy, Suspense, useEffect } from 'react';
import { useLang } from './i18n.jsx';
import { initSmoothScroll, ScrollTrigger } from './lib/motion.js';
import { track } from './lib/track.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Profile from './components/Profile.jsx';
import Method from './components/Method.jsx';
import Projects from './components/Projects.jsx';
import MoreProjects from './components/MoreProjects.jsx';
import Skills from './components/Skills.jsx';
import Clients from './components/Clients.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// Three.js est chargé à part : le texte s'affiche avant la scène WebGL.
const ParticleField = lazy(() => import('./components/ParticleField.jsx'));

function refreshTriggers() {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}

export default function App() {
  const { lang } = useLang();

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    document.fonts?.ready.then(refreshTriggers);
  }, []);

  // Mesure d'audience : jusqu'où les visiteurs descendent (un événement par section et par visite).
  useEffect(() => {
    const sections = ['methode', 'projets', 'competences', 'parcours', 'contact'];
    const triggers = sections.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        once: true,
        onEnter: () => track(`vu-${id}`, `Section « ${id} » atteinte`),
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Changer de langue modifie la hauteur des blocs : on recalcule les déclencheurs.
  useEffect(() => {
    const id = requestAnimationFrame(refreshTriggers);
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return (
    <>
      <a className="skip-link" href="#main">
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Profile />
        <Method />
        <Projects />
        <MoreProjects />
        <Skills />
        <Clients />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </>
  );
}
