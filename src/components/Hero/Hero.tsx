'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation('hero');

  return (
    <section id="top" className={styles.hero}>
      {/* Image plein écran */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/hero1.webp"
          alt={t('image_alt')}
          fill
          sizes="100vw"   // ← LA bonne valeur pour un hero fullscreen
          priority
          quality={70}    // valeur idéale pour un hero
          className={styles.image}
        />
      </div>

      {/* Overlays luxe */}
      <div className={styles.darkOverlay} />
      <div className={styles.bordeauxOverlay} />
      <div className={styles.vignette} />
      <div className={styles.grain} />

      {/* Contenu */}
      <div className={styles.content}>
        <div className={styles.heroLogoWrapper}>
          <Image
            src="/images/logo.png"
            alt="Nectar Wine Merchant"
            width={80}
            height={80}
            priority
            className={styles.heroLogo}
          />
        </div>

        <h1 className={styles.title}>
          {t('title_line1')} <br />
          {t('title_line2')}
        </h1>

        <p className={styles.subtitle}>
          {t('subtitle')}
        </p>

        <span className={styles.divider} />

        <p className={styles.tagline}>
          {t('tagline1')} <br />
          {t('tagline2')} <br />
          {t('tagline3')}
        </p>
      </div>
    </section>
  );
}
