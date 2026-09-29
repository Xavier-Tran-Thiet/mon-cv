import { ArrowUp } from '@phosphor-icons/react';
import { useLang } from '../i18n.jsx';
import { scrollToTarget } from '../lib/motion.js';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2026 Xavier Tran-Thiet</p>
        <p>
          {t.footer.built} {t.footer.analytics}
        </p>
        <a
          href="#top"
          className="footer__top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('#top');
          }}
        >
          {t.footer.top}
          <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
