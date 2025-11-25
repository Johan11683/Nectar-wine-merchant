'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation('header');

  const currentLang = (i18n.language || 'en').slice(0, 2) as 'en' | 'fr';

  function handleChangeLang(lang: 'en' | 'fr') {
    if (lang === currentLang) return;

    i18n.changeLanguage(lang);
    // Met à jour <html lang="..."> pour accessibilité / SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* LOGO */}
        <a href="#top" className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/Logo_Transparent.png"
              alt="Nectar Wine Merchant Logo"
              fill
              priority
              className={styles.logo}
            />
          </div>
        </a>

        {/* BURGER BUTTON (mobile) */}
        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label={t('aria.menu_button')}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAVIGATION + LANG SWITCH */}
        <nav
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label={t('aria.main_nav')}
        >
          <a href="#about" onClick={() => setOpen(false)}>
            {t('links.about')}
          </a>
          <a href="#gallery" onClick={() => setOpen(false)}>
            {t('links.gallery')}
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            {t('links.contact')}
          </a>

          {/* Switch FR / EN */}
          <div className={styles.langSwitch}>
            <button
              type="button"
              data-lang="fr"
              data-active={currentLang === 'fr'}
              onClick={() => handleChangeLang('fr')}
            >
              {t('langSwitch.fr')}
            </button>

            <button
              type="button"
              data-lang="en"
              data-active={currentLang === 'en'}
              onClick={() => handleChangeLang('en')}
            >
              {t('langSwitch.en')}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
