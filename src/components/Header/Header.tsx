'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation('header');

  const currentLang = (i18n.language || 'en').slice(0, 2) as 'en' | 'fr';

  function handleChangeLang(lang: 'en' | 'fr') {
    if (lang === currentLang) return;

    // ferme le menu si on change de langue (mobile)
    setOpen(false);
    i18n.changeLanguage(lang);
  }

  // met à jour <html lang> + persiste la langue
  useEffect(() => {
    const shortLang = (i18n.language || 'en').slice(0, 2);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = shortLang;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nectar-lang', shortLang);
    }
  }, [i18n.language]);

  // récupère la langue au montage (si déjà choisie)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem('nectar-lang') as 'en' | 'fr' | null;
    if (!saved) return;

    const currentShort = (i18n.language || 'en').slice(0, 2);
    if (saved !== currentShort) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* LOGO */}
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
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
          onClick={() => setOpen((prev) => !prev)}
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
