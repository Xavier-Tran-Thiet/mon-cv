import { Asterisk } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { clients } from '../content.js';
import './Clients.css';

function Track({ hidden }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {clients.map((name) => (
        <li className="marquee__item" key={name}>
          <span className="marquee__name">{name}</span>
          <Asterisk className="marquee__sep" weight="bold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  const { t } = useLang();
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="container">
        <h2 className="clients__title" id="clients-title">
          {t.clients.title}
        </h2>
      </div>
      <div className="marquee">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
