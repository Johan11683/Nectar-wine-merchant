'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation('header');

  const currentLang = (i18n.language || 'en').slice(0, 2) as 'en' | 'fr';

  // Lang switch
  function handleChangeLang(lang: 'en' | 'fr') {
    if (lang === currentLang) return;
    setOpen(false);
    i18n.changeLanguage(lang);
  }

  // gestion scroll → header transparent tant que le Hero est visible, noir sinon
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const container = document.querySelector('.snap-container') as HTMLElement | null;
    const hero = document.getElementById('top'); // ton <section id="top" ...> du Hero

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // si le hero N'est plus visible => header noir
        setScrolled(!entry.isIntersecting);
      },
      {
        root: container ?? null, // si on a un conteneur scroll-snap, on l'utilise
        threshold: 0.6,          // ~60% visible -> encore considéré "dans le hero"
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Met à jour <html lang> + persiste la langue
  useEffect(() => {
    const shortLang = (i18n.language || 'en').slice(0, 2);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = shortLang;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nectar-lang', shortLang);
    }
  }, [i18n.language]);

  // Récupère la langue au montage (si déjà choisie)
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
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* LOGO */}
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/Logo_Transparent.png"
              alt="Nectar Wine Merchant Logo"
              fill
              sizes="220px"
              priority
              className={styles.logo}
            />
          </div>
        </a>

        {/* BURGER (mobile) */}
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

        {/* NAVIGATION */}
        <nav
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label={t('aria.main_nav')}
        >
          <div className={styles.navLinks}>
            <a href="#about" onClick={() => setOpen(false)}>
              {t('links.about')}
            </a>
            <a
              href="#contact"
              className={styles.contactLink}
              onClick={() => setOpen(false)}
            >
              {t('links.contact')}
            </a>
          <a
            className={styles.instaLink}
            href="https://www.instagram.com/nectar_wine_merchant/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — Nectar Wine Merchant"
          >
            <Image
              src="/images/instalogo.webp"
              alt="Instagram logo"
              width={22}
              height={22}
              className={styles.instaIcon}
            />
          </a>

          </div>

          {/* LANG SWITCH */}
          <div className={styles.langSwitch}>
            <button
              type="button"
              data-lang="fr"
              data-active={currentLang === 'fr'}
              onClick={() => handleChangeLang('fr')}
            >
              FR
            </button>

            <span className={styles.langDivider}>|</span>

            <button
              type="button"
              data-lang="en"
              data-active={currentLang === 'en'}
              onClick={() => handleChangeLang('en')}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
