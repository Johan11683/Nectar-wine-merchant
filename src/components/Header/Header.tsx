import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        
        <a href="#top" className={styles.brand}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/Logo_Transparent.png"
              alt="Nectar Wine Merchant Logo"
              fill
              priority
              className={styles.logo}
            />
          </div>
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          <a href="#about">À propos</a>
          <a href="#gallery">Collection</a>
          <a href="#contact">Contact</a>
        </nav>

      </div>
    </header>
  );
}
