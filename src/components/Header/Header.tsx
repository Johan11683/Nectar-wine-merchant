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

  // gestion scroll (inchangé)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const container = document.querySelector('.snap-container') as HTMLElement | null;
    const hero = document.getElementById('top');

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: container ?? null,
        threshold: 0.6,
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 1) Au premier montage : on lit la langue sauvegardée (nectar-lang)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem('nectar-lang') as 'en' | 'fr' | null;
    if (!saved) return;

    const currentShort = (i18n.language || 'en').slice(0, 2) as 'en' | 'fr';
    if (saved !== currentShort) {
      i18n.changeLanguage(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← on ne veut le faire qu'une seule fois au montage

  // 2) Dès que la langue change : on met à jour <html lang> + localStorage
  useEffect(() => {
    const shortLang = (i18n.language || 'en').slice(0, 2) as 'en' | 'fr';

    if (typeof document !== 'undefined') {
      document.documentElement.lang = shortLang;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nectar-lang', shortLang);
    }
  }, [i18n.language]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* LOGO */}
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <div className={styles.logoWrapper}>
            <Image
              src={scrolled ? "/images/Logo11.png" : "/images/logo.png"}
              alt="Nectar Wine Merchant Logo"
              fill
              sizes="220px"
              priority
              className={styles.logo}
            />
          </div>
        </a>

        {/* BURGER */}
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

        {/* NAV */}
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
