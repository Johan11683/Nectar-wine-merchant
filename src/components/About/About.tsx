'use client';

import styles from './About.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      
      <div className={styles.left}>
        <h2 id="about-title" className={styles.heading}>
          {t('title')}
        </h2>

        <p>{t('paragraphs.p1')}</p>
      </div>

      <div className={styles.right}>
  <div className={styles.imageWrapper}>
    <Image
      src="/images/imageMasseto.jpeg"
      alt="Palette de caisses de vin"
      fill
      priority
      className={styles.image}
    />
    <div className={styles.overlay}></div>
  </div>
</div>


    </section>
  );
}
