import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, DownloadSimple, LinkedinLogo } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { profile } from '../content.js';
import { gsap, prefersReduced, useGSAP } from '../lib/motion.js';
import RevealTitle from './RevealTitle.jsx';
import './Contact.css';

export default function Contact() {
  const { t, lang } = useLang();
  const root = useRef(null);
  const mailRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from('.contact__reveal', {
        opacity: 0,
        y: 30,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Presse-papiers refusé : on sélectionne l'adresse pour une copie manuelle.
      const range = document.createRange();
      range.selectNodeContents(mailRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return (
    <section ref={root} id="contact" className="contact section" data-scene="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__inner">
          <RevealTitle key={lang} className="contact__title" id="contact-title">
            {t.contact.title}
          </RevealTitle>
          <p className="contact__sub contact__reveal">{t.contact.sub}</p>

          <div className="contact__mail-row contact__reveal">
            <a ref={mailRef} className="contact__mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button type="button" className="icon-btn contact__copy" onClick={copy} aria-label={copied ? t.contact.copied : t.contact.copy} title={t.contact.copy}>
              {copied ? <Check weight="bold" /> : <Copy />}
            </button>
            <span className="sr-only" role="status">
              {copied ? t.contact.copied : ''}
            </span>
          </div>

          <div className="contact__links contact__reveal">
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinLogo weight="fill" />
              {t.contact.linkedin}
              <ArrowUpRight />
            </a>
            <a className="btn btn--ghost" href={profile.cv.fr} download hrefLang="fr">
              <DownloadSimple weight="bold" />
              {t.contact.cvFr}
            </a>
            <a className="btn btn--ghost" href={profile.cv.en} download hrefLang="en">
              <DownloadSimple weight="bold" />
              {t.contact.cvEn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
