'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* LOGO */}
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

        {/* BURGER BUTTON (mobile) */}
        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* NAVIGATION + LANG SWITCH */}
        <nav
          className={`${styles.nav} ${open ? styles.open : ''}`}
          aria-label="Navigation principale"
        >
          <a href="#about" onClick={() => setOpen(false)}>
            À propos
          </a>
          <a href="#gallery" onClick={() => setOpen(false)}>
            Collection
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

          {/* Switch FR / EN */}
          <div className={styles.langSwitch}>
            <button type="button" data-lang="fr" data-active="true">
              FR
            </button>
            <button type="button" data-lang="en">
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
