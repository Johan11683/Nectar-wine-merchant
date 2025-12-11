"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsletterModal from "./NewsletterModal";

const STORAGE_KEY = "newsletterLastShown";
// en prod : 15 minutes
const DELAY_MS = 15 * 60 * 1000;

export default function NewsletterGate() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const { i18n } = useTranslation(); // instance i18n globale

  // 1) Au montage : on synchronise la langue avec celle déjà choisie (nectar-lang)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("nectar-lang") as "en" | "fr" | null;
    const currentShort = (i18n.language || "en").slice(0, 2) as "en" | "fr";

    if (saved && saved !== currentShort) {
      i18n.changeLanguage(saved).finally(() => {
        setReady(true);
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
    }
  }, [i18n]);

  // 2) Une fois monté *et* langue synchro, on peut utiliser localStorage pour la modale
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;

    const now = Date.now();
    const raw = window.localStorage.getItem(STORAGE_KEY);

    let shouldOpen = false;

    // Jamais affichée → on ouvre
    if (!raw) {
      shouldOpen = true;
    } else {
      const last = Number(raw);
      if (Number.isNaN(last) || now - last >= DELAY_MS) {
        shouldOpen = true;
      }
    }

    if (shouldOpen) {
      window.localStorage.setItem(STORAGE_KEY, String(now));
      // Ici on synchronise l'état avec une source externe (localStorage) dans un effet.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [ready]);

  // 3) Ouvrir la modale via un événement global (Footer → NewsletterGate)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => {
      setOpen(true);
    };

    window.addEventListener("open-newsletter", handler);
    return () => {
      window.removeEventListener("open-newsletter", handler);
    };
  }, []);

  return (
    <NewsletterModal
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}
