'use client';

import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('footer');
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        
        {/* Bloc logo + baseline */}
        <div className={styles.brandBlock}>
          <p className={styles.tagline}>
            {t('brand_tagline')}
          </p>
        </div>

        {/* Colonnes de liens */}
        <div className={styles.cols}>
          
          {/* Navigation */}
          <div>
            <h3 className={styles.colTitle}>{t('cols.navigation_title')}</h3>

            <a href="#about">{t('cols.nav_links.about')}</a>
            <br />
            <a href="#gallery">{t('cols.nav_links.gallery')}</a>
            <br />
            <a href="#contact">{t('cols.nav_links.contact')}</a>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.colTitle}>{t('cols.contact_title')}</h3>

            <p>{t('cols.address.line1')}</p>
            <p>{t('cols.address.line2')}</p>

            <a href="mailto:a.bellone@nectar-winemerchant.com">
              {t('cols.email')}
            </a>
          </div>

          {/* Légal */}
          <div>
            <h3 className={styles.colTitle}>{t('cols.legal_title')}</h3>

            <a href="/legal">
              {t('cols.legal_link')}
            </a>
          </div>

        </div>
      </div>

      <div className={styles.bottom}>
        <p>{t('bottom.full_notice', { year })}</p>
      </div>
    </footer>
  );
}
