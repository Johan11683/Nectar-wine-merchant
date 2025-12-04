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
      // dès qu'on a quitté un peu le hero
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // état initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="top" className={styles.hero}>
      {/* Image plein écran */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/HeroBanana.png"
          alt={t('image_alt')}
          fill
          sizes="100vw"
          priority
          quality={70}
          className={styles.image}
        />
      </div>

      {/* Overlay simple */}
      <div className={styles.overlay} />

      <div className={styles.content}>
<div className={styles.logoWrapper}>
  <Image
    src="/images/Logo11.png"
    alt="Nom du domaine du client"
    fill
    priority
    className={styles.logo}
    sizes="(max-width: 768px) 70vw, 320px"
  />
</div>

</div>

      {/* Contenu centré
      <div className={styles.content}>
        <p className={styles.title}>
          {t('kicker')}
        </p>
        <p className={styles.kicker}>
          {t('kicker2')}
        </p>
      </div> */}

      {/* Indicateur de scroll */}
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
