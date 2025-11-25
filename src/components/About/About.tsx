import styles from './About.module.scss';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 id="about-title" className={styles.heading}>
            L&apos;Excellence, sur mesure
          </h2>

          <p>
            Nectar Wine Merchant est un négociant bordelais indépendant, reconnu pour un
            sourcing précis et exigeant des grands vins. Chaque sélection est
            construite bouteille par bouteille, avec un seul objectif&nbsp;: proposer des vins
            d&apos;exception, parfaitement maîtrisés.
          </p>

          <p>
            Nous travaillons en lien direct avec les propriétés et quelques partenaires
            triés sur le volet. Millésimes, provenances, conditions de stockage&nbsp;: chaque
            détail compte. C&apos;est une approche de haute couture, pensée pour des clients
            qui attendent du sur mesure plutôt qu&apos;un catalogue.
          </p>

          <p>
            99&nbsp;% de nos volumes sont expédiés à l&apos;international, via un réseau discret
            de distributeurs spécialisés, de caves privées et de belles tables. Une
            clientèle à la fois prestigieuse et discrète, qui nous fait confiance pour la
            qualité de notre sourcing et la fiabilité de notre distribution.
          </p>

          <p className={styles.signature}>
            Expertise reconnue • Sourcing de précision • Distribution internationale
          </p>
        </div>

<div className={styles.galleryGrid}>
  <div className={styles.galleryItem}>
    <Image
      src="/images/palette1.jpeg"
      alt="Palette de caisses de vin"
      fill
      className={styles.image}
    />
  </div>

  <div className={styles.galleryItem}>
    <Image
      src="/images/lineBottles1.png"
      alt="Sélection de bouteilles"
      fill
      className={styles.image}
    />
  </div>

  <div className={styles.galleryItem}>
    <Image
      src="/images/duo.jpg"
      alt="Les deux fondateurs"
      fill
      className={styles.image}
    />
  </div>

  <div className={styles.galleryItem}>
    <Image
      src="/images/barrels.jpg"
      alt="Palette de caisses de vin"
      fill
      className={styles.image}
    />
  </div>
</div>

      </div>
    </section>
  );
}
