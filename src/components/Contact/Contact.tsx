'use client';

import { useState, FormEvent } from 'react';
import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation('contact');

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
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.inner}>
        
        {/* ----- COLONNE INFO ----- */}
        <div className={styles.info}>
          <h2 id="contact-title" className={styles.heading}>
            {t('title')}
          </h2>

          <p>{t('intro')}</p>

          <ul className={styles.details}>
            <li>
              <span className={styles.icon}>📍</span>
              <span>
                {t('16 Place des Quinconces - 33000 Bordeaux - France')}<br />
              </span>
            </li>

            <li>
              <span className={styles.icon}>📞</span>
              <a href={`tel:+33681614257`}>{t('phone_label')}: +33 6 81 61 42 57</a>
            </li>

            <li>
              <span className={styles.icon}>✉️</span>
              <a href="mailto:a.bellone@nectar-winemerchant.com">
                {t('email_label')}: a.bellone@nectar-winemerchant.com
              </a>
            </li>
          </ul>

          <div className={styles.hours}>
            <h3>{t('hours_title')}</h3>
            <p>{t('hours_text')}</p>
          </div>
        </div>

        {/* ----- FORMULAIRE ----- */}
        <form className={styles.form} onSubmit={handleSubmit}>
          
          <div className={styles.field}>
            <label htmlFor="name">{t('form.fullname_label')}</label>
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
            <label htmlFor="email">{t('form.email_label')}</label>
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
            <label htmlFor="phone">{t('form.phone_label')}</label>
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
            <label htmlFor="message">{t('form.message_label')}</label>
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
            {status === 'loading'
              ? t('form.submit_loading')
              : t('form.submit_idle')}
          </button>

          {status === 'success' && (
            <p style={{ fontSize: '0.9rem', color: 'green', marginTop: '0.75rem' }}>
              {t('form.success')}
            </p>
          )}
          {status === 'error' && (
            <p style={{ fontSize: '0.9rem', color: 'crimson', marginTop: '0.75rem' }}>
              {t('form.error')}
            </p>
          )}
        </form>

      </div>
    </section>
  );
}
