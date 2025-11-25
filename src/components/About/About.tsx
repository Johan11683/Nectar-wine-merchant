'use client';

import styles from './About.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 id="about-title" className={styles.heading}>
            {t('title')}
          </h2>

          <p>{t('paragraphs.p1')}</p>
          <p>{t('paragraphs.p2')}</p>
          <p>{t('paragraphs.p3')}</p>

          <p className={styles.signature}>
            {t('signature')}
          </p>
        </div>

        <div className={styles.galleryGrid}>
          <div className={styles.galleryItem}>
            <Image
              src="/images/palette1.jpeg"
              alt="Palette de caisses de vin"
              fill
              sizes="240px"
              className={styles.image}
            />
          </div>

          <div className={styles.galleryItem}>
            <Image
              src="/images/lineBottles1.png"
              alt="Sélection de bouteilles"
              fill
              sizes="240px"
              className={styles.image}
            />
          </div>

          <div className={styles.galleryItem}>
            <Image
              src="/images/duo.jpg"
              alt="Les deux fondateurs"
              fill
              sizes="240px"
              className={styles.image}
            />
          </div>

          <div className={styles.galleryItem}>
            <Image
              src="/images/barrels.jpg"
              alt="Palette de caisses de vin"
              fill
              sizes="240px"
              className={styles.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
