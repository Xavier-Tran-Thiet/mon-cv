import { siDocker, siPostgresql, siPython, siReact, siVite } from 'simple-icons';

const ICONS = {
  react: siReact,
  vite: siVite,
  python: siPython,
  docker: siDocker,
  postgresql: siPostgresql,
};

/** Logo officiel (Simple Icons) : couleur du texte au repos, couleur de la marque au survol. */
export default function TechLogo({ id }) {
  const icon = ICONS[id];
  if (!icon) return null;
  return (
    <li className="logo" style={{ '--brand': `#${icon.hex}` }}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={icon.path} />
      </svg>
      <span>{icon.title}</span>
    </li>
  );
}
