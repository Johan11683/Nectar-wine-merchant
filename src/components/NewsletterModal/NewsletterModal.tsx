"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./NewsletterModal.module.scss";

type NewsletterModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const { t } = useTranslation("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ❌ – Croix de fermeture */}
        <button
          type="button"
          className={styles.close}
          aria-label="Close newsletter modal"
          onClick={onClose}
        >
          ×
        </button>

        {/* Titre */}
        <h2 className={styles.title}>{t("title")}</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder={t("placeholderEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">{t("button")}</button>
        </form>

        {/* Statuts */}
        {status === "success" && <p className={styles.ok}>{t("success")}</p>}
        {status === "error" && <p className={styles.err}>{t("error")}</p>}
      </div>
    </div>
  );
}
