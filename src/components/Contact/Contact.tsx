import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className={styles.inner}>
        <div className={styles.info}>
          <h2 id="contact-title" className={styles.heading}>
            Contactez-nous
          </h2>

          <p>
            Notre équipe est à votre disposition pour répondre à vos questions
            et vous accompagner dans la sélection de vos vins d&apos;exception.
          </p>

          <ul className={styles.details}>
            <li>
              <span className={styles.icon}>📍</span>
              <span>16 place des Quinconces<br />33000 Bordeaux, France</span>
            </li>
            <li>
              <span className={styles.icon}>📞</span>
              <a href="tel:+33681614257">+33 6 81 61 42 57</a>
            </li>
            <li>
              <span className={styles.icon}>✉️</span>
              <a href="mailto:a.bellone@nectar-winemerchant.com">a.bellone@nectar-winemerchant.com</a>
            </li>
          </ul>

          <div className={styles.hours}>
            <h3>Horaires d&apos;ouverture</h3>
            <p>Sur rendez-vous, contactez nous !</p>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Nom complet</label>
            <input id="name" name="name" type="text" autoComplete="name" />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} />
          </div>

          <button type="submit" className={styles.submit}>
            Envoyer le message
          </button>
        </form>
      </div>
    </section>
  );
}
