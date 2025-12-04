'use client';

import styles from './About3.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      
      <div className={styles.left}>
        <h2 id="about-title" className={styles.heading}>
          {t('title3')}
        </h2>

        <p>{t('paragraphs.p3')}</p>

      </div>
<div className={styles.right}>
  <Image
    src="/images/palettePetrus.jpeg"
    alt="Palette de caisses de vin"
    fill
    priority
    className={styles.image}
  />
  <div className={styles.overlay} aria-hidden="true" />
</div>


    </section>
  );
}
