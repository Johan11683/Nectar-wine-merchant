"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NewsletterModal from "./NewsletterModal";

export default function NewsletterGate() {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation(); // instance i18n globale

  // 1) Au montage : on synchronise la langue avec celle déjà choisie (nectar-lang)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("nectar-lang") as "en" | "fr" | null;
    const currentShort = (i18n.language || "en").slice(0, 2) as "en" | "fr";

    if (saved && saved !== currentShort) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  // 2) Ouvrir la modale via un événement global (Footer / Contact → NewsletterGate)
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
