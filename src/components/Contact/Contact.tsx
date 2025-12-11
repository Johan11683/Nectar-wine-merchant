'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import styles from './Contact.module.scss';
import { useTranslation } from 'react-i18next';

type ContactPerson = {
  id: string;
  name: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  isPrimary?: boolean;
};

const CONTACTS: ContactPerson[] = [
  {
    id: 'arnaud',
    name: 'Arnaud Bellone',
    phoneDisplay: '+33 6 81 61 42 57',
    phoneTel: '+33681614257',
    email: 'admin@nectar-winemerchant.com',
    isPrimary: true,
  },
  {
    id: 'hugo',
    name: 'Hugo Moronval',
    phoneDisplay: '+33 6 34 04 08 44',
    phoneTel: '+33634040844',
    email: '',
  },
];

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
          <p className={styles.eyebrow}>{t('title')}</p>

          <h2 id="contact-title" className={styles.heading}>
            {t('who')}
          </h2>

          <p className={styles.lead}>{t('hours_text')}</p>

          <div className={styles.block}>
            <p className={styles.label}>{t('address')}</p>
          </div>

          {/* ----- TELEPHONES ----- */}
          <div className={styles.block}>
            <p className={styles.label}>{t('phone_label')}</p>

            {CONTACTS.map((person) => {
              const waUrl = `https://wa.me/${person.phoneTel.replace('+', '')}`;

              return (
                <p key={person.id} className={`${styles.value} ${styles.item}`}>
                  <span className={styles.contactName}>{person.name} :</span>{' '}
                  <a href={`tel:${person.phoneTel}`}>{person.phoneDisplay}</a>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineWa}
                    aria-label={`WhatsApp ${person.name}`}
                  >
                    <Image
                      src="/images/waLogo.png"
                      alt="WhatsApp"
                      width={32}
                      height={32}
                      className={styles.waInlineIcon}
                    />
                  </a>
                </p>
              );
            })}
          </div>

          {/* ----- EMAILS + NEWSLETTER ----- */}
{/* ----- EMAILS + NEWSLETTER ----- */}
<div className={styles.block}>
  <p className={styles.label}>{t('email_label')}</p>

  {CONTACTS.filter((person) => person.email.trim()).map((person) => (
    <div key={person.id} className={styles.item}>
      <a
        href={`mailto:${person.email}`}
        className={styles.value}
      >
        {person.email}
      </a>
    </div>
  ))}

  {/* Sous-titre newsletter */}
  <p className={styles.label}>
    {t('newsletter_text')}
  </p>

  {/* Lien luxe qui ouvre la modale */}
  <button
    type="button"
    className={styles.newsletterLuxury}
    onClick={() => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-newsletter'));
      }
    }}
  >
    <span className={styles.text}>{t('newsletter_link')}</span>
    <span className={styles.decor}>→</span>
  </button>
</div>

        </div>

        {/* ----- FORMULAIRE ----- */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
            <p className={`${styles.status} ${styles.statusSuccess}`}>
              {t('form.success')}
            </p>
          )}

          {status === 'error' && (
            <p className={`${styles.status} ${styles.statusError}`}>
              {t('form.error')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
