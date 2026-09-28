import { useId } from 'react';
import { siModelcontextprotocol } from 'simple-icons';
import { GOLUM_WORDMARK, MEILLEURTAUX_M, TENDER_WORDMARK } from '../data/logoPaths.js';
import './ProjectVisual.css';

/*
  Logos repris des repos de chaque produit :
  Michel (src/app/icon.svg), IM.data (frontend/public/favicon.svg),
  MeilleurTaux (App/front/public/favicon.svg), Golum (components/Logo.tsx),
  Tender (logotype de l'AppShell). Le connecteur Teamleader n'a pas de logo propre :
  on affiche celui du protocole MCP (Simple Icons), puisque c'est un serveur MCP.
*/

function MichelMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#6d3b6b" />
      <path fill="#fff" d="M7 24V8h4.6l4.4 7.2L20.4 8H25v16h-4v-9.4l-3.6 5.8h-2.8L11 14.6V24z" />
    </svg>
  );
}

function ImdataMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#F07B28" />
      <g fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.6 10.8 V21.2" />
        <path d="M14.4 21.2 V10.8 L18.6 16.6 L22.8 10.8 V21.2" />
      </g>
    </svg>
  );
}

function MeilleurTauxMark() {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2693c" />
          <stop offset="1" stopColor="#c0552e" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${id})`} />
      <path fill="#fff" d={MEILLEURTAUX_M} />
    </svg>
  );
}

function GolumRing() {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0c75e" />
          <stop offset=".55" stopColor="#c8962a" />
          <stop offset="1" stopColor="#7d5a12" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="46" fill="none" stroke={`url(#${id})`} strokeWidth="16" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#fff6d6" strokeWidth="3" strokeDasharray="30 400" strokeDashoffset="-40" opacity=".9" />
    </svg>
  );
}

function GolumLockup() {
  return (
    <span className="lockup">
      <GolumRing />
      <svg className="lockup__word" viewBox={GOLUM_WORDMARK.viewBox} aria-hidden="true">
        <path fill="#f4ecd6" d={GOLUM_WORDMARK.d} />
      </svg>
    </span>
  );
}

function TenderWordmark() {
  return (
    <svg viewBox={TENDER_WORDMARK.viewBox} aria-hidden="true">
      <path fill="#ffffff" d={TENDER_WORDMARK.d} />
    </svg>
  );
}

function McpMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#f2f4f8" d={siModelcontextprotocol.path} />
    </svg>
  );
}

// bg : fond de la scène (couleur sombre de la marque) ; glow : couleur du halo.
const LOGOS = {
  tender: { Mark: TenderWordmark, kind: 'wordmark', bg: '#0e1b22', glow: '#1c7fae' },
  michel: { Mark: MichelMark, kind: 'icon', bg: '#170c17', glow: '#8c4f89' },
  golum: { Mark: GolumLockup, kind: 'lockup', bg: '#141008', glow: '#c8962a' },
  imdata: { Mark: ImdataMark, kind: 'icon', bg: '#0e1b2a', glow: '#f07b28' },
  teamleader: { Mark: McpMark, kind: 'icon', bg: '#0b0c10', glow: '#6f7a94' },
  meilleurtaux: { Mark: MeilleurTauxMark, kind: 'icon', bg: '#1a0d08', glow: '#d2693c' },
};

export default function ProjectVisual({ id, label }) {
  const cfg = LOGOS[id];
  if (!cfg) return null;
  const { Mark } = cfg;
  return (
    <div className={`visual visual--${cfg.kind}`} style={{ '--v-bg': cfg.bg, '--v-glow': cfg.glow }} role="img" aria-label={label}>
      <div className="visual__ghost" aria-hidden="true">
        <Mark />
      </div>
      <div className="visual__logo">
        <Mark />
      </div>
    </div>
  );
}
