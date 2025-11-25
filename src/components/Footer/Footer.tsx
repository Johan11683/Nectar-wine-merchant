import styles from './Footer.module.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Bloc logo + baseline */}
        <div className={styles.brandBlock}>
          <p className={styles.tagline}>
            Négociant de vins d&apos;exception, au service de particuliers et de professionnels, à travers le monde.
          </p>
        </div>

        {/* Colonnes de liens */}
        <div className={styles.cols}>
          <div>
            <h3 className={styles.colTitle}>Navigation</h3>
            <a href="#about">À propos</a>
            <br />
            <a href="#gallery">Collection</a>
            <br />
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h3 className={styles.colTitle}>Contact</h3>
            <p>16 Place des Quinconces</p>
            <p>33000 Bordeaux • France</p>
            <a href="mailto:a.bellone@nectar-winemerchant.com">a.bellone@nectar-winemerchant.com</a>
          </div>

          <div>
            <h3 className={styles.colTitle}>Légal</h3>
            <a href="legal">Mentions légales</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {year} Nectar Wine Merchant. Tous droits réservés. L&apos;abus d&apos;alcool
          est dangereux pour la santé, à consommer avec modération.
        </p>
      </div>
    </footer>
  );
}
