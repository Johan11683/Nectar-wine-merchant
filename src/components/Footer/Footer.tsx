'use client';

import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

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
            <span>{t('cols.instagram')}</span>
          </a>
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
            <br />

            <a
              href="#"
              className={styles.newsletterLink}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-newsletter'));
              }}
            >
              {t('cols.newsletter_link')}
            </a>
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
