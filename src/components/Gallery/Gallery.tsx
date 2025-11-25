import styles from './Gallery.module.scss';
import Image from 'next/image';

const IMAGES = [
  '/images/theboyz.jpeg',
  '/images/palette.jpeg',
  '/images/image (1).jpeg',
  '/images/image (2).jpeg',
  '/images/image (3).jpeg',
  '/images/image (4).jpeg',
  '/images/image (5).jpeg',
  '/images/image (6).jpeg',
  '/images/image (7).jpeg',
  '/images/image (8).jpeg',
  '/images/image (9).jpeg',
  '/images/image (10).jpeg',
  '/images/image (11).jpeg',
  '/images/image (12).jpeg',
  '/images/image (13).jpeg',
  '/images/image (14).jpeg',
  '/images/image (15).jpeg',
  '/images/image (16).jpeg',
  '/images/image (17).jpeg',
  '/images/image (18).jpeg',
  '/images/image (19).jpeg',
  '/images/image (20).jpeg',
  '/images/image (21).jpeg',
  '/images/image (22).jpeg',
  '/images/image (23).jpeg',
  '/images/image (24).jpeg',
  '/images/image (25).jpeg',
  '/images/image (26).jpeg',
  '/images/image (27).jpeg',
  '/images/image (28).jpeg',
  '/images/image (29).jpeg',
  '/images/image (30).jpeg',
  '/images/image (31).jpeg',
  '/images/image (32).jpeg',
  '/images/image (33).jpeg',
  '/images/image (34).png',



];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className={styles.section}
      aria-labelledby="collection-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="collection-title">Notre collection</h2>
          <p>
            La recherche de vos plus grands vins est plus qu&apos;un métier, c&apos;est plus qu&apos;une passion,  c&apos;est notre lifestyle :
          </p>
          <span className={styles.underline} />
        </header>

        <div className={styles.grid} role="list">
          {IMAGES.map((src, index) => (
            <figure key={src} className={styles.card} role="listitem">
              <div className={styles.imageWrapper}>
                <Image
                  src={src}
                  alt={`Photo dans le thème du vin – visuel ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={styles.image}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
