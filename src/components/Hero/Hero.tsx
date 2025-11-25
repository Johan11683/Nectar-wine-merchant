import Image from 'next/image';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      {/* Image plein écran */}
      <div className={styles.imageWrapper}>
        <Image
          src="/images/hero.png"
          alt="Sélection de grands vins"
          fill
          priority
          quality={75}
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


        <h1 className={styles.title}>Nectar <br/>Wine Merchant</h1>

        <p className={styles.subtitle}>
          Négociant en vins d&apos;exception
        </p>

        <span className={styles.divider} />

        <p className={styles.tagline}>
          Bonne ambiance, belles bouteilles. <br/> On s&apos;occupe des vins, vous profitez du moment.
        </p>
      </div>
    </section>
  );
}
