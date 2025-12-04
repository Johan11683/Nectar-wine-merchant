'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { t } = useTranslation('hero');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="top" className={styles.hero}>
      {/* IMAGE PLEIN ÉCRAN */}
      <div className={styles.imageWrapper}>
        {/* Desktop */}
        <Image
          src="/images/HB1.png"
          alt={t('image_alt')}
          fill
          priority
          quality={70}
          sizes="100vw"
          className={`${styles.image} ${styles.imageDesktop}`}
        />

        {/* Mobile */}
        <Image
          src="/images/HB1-2.png"
          alt={t('image_alt')}
          fill
          priority
          quality={70}
          sizes="100vw"
          className={`${styles.image} ${styles.imageMobile}`}
        />
      </div>

      {/* OVERLAY */}
      <div className={styles.overlay} />

      {/* LOGO CENTRÉ */}
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/logoWhite.png"
            alt="Nectar Wine Merchant"
            fill
            priority
            className={styles.logo}
            sizes="(max-width: 768px) 70vw, 320px"
          />
        </div>
      </div>

      {/* INDICATEUR DE SCROLL */}
      <a
        href="#about"
        className={`${styles.scrollIndicator} ${
          hasScrolled ? styles.scrollIndicatorHidden : ''
        }`}
        aria-label={t('scroll_label', { defaultValue: 'Scroll to discover' })}
      >
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
        <span className={styles.scrollText}>Scroll</span>
      </a>
    </section>
  );
}
