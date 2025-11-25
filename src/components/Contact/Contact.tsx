'use client';

import { useState, FormEvent } from 'react';
import styles from './Contact.module.scss';

export default function Contact() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        console.error('CONTACT_ERROR', data);
        setStatus('error');
        return;
      }

      setStatus('success');
      setFullname('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('CONTACT_ERROR', err);
      setStatus('error');
    }
  }

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
              <span>
                16 place des Quinconces
                <br />
                33000 Bordeaux, France
              </span>
            </li>
            <li>
              <span className={styles.icon}>📞</span>
              <a href="tel:+33681614257">+33 6 81 61 42 57</a>
            </li>
            <li>
              <span className={styles.icon}>✉️</span>
              <a href="mailto:a.bellone@nectar-winemerchant.com">
                a.bellone@nectar-winemerchant.com
              </a>
            </li>
          </ul>

          <div className={styles.hours}>
            <h3>Horaires d&apos;ouverture</h3>
            <p>Sur rendez-vous, contactez-nous !</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              name="fullname"
              type="text"
              autoComplete="name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Téléphone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
          </button>

          {status === 'success' && (
            <p style={{ fontSize: '0.9rem', color: 'green', marginTop: '0.75rem' }}>
              Merci, votre message a bien été envoyé.
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '0.9rem', color: 'crimson', marginTop: '0.75rem' }}>
              Une erreur est survenue. Merci de réessayer plus tard.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
