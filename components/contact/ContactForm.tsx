"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  institution: string;
  subject: string;
  message: string;
  consent: boolean;
}

const initialData: FormData = {
  name: "",
  email: "",
  institution: "",
  subject: "general",
  message: "",
  consent: false,
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-riiba-green/15 bg-white text-riiba-green-dark placeholder:text-riiba-green-dark/40 focus:outline-none focus:ring-2 focus:ring-riiba-orange focus:border-transparent transition-all";

const labelClass = "block text-sm font-semibold text-riiba-green-dark mb-2";

export default function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [data, setData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // ─────────────────────────────────────────────────────────
      // TODO: Reemplazar este bloque por la llamada al backend NestJS
      //
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      //
      // if (!res.ok) throw new Error("Request failed");
      // ─────────────────────────────────────────────────────────

      // Placeholder: simula un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus("success");
      setData(initialData);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // ─── Vista de éxito ─────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="p-10 rounded-2xl bg-riiba-green-bg border border-riiba-green/20 text-center">
        <FiCheckCircle size={44} className="text-riiba-green mx-auto mb-4" />
        <h3 className="text-xl font-bold text-riiba-green-dark mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-riiba-green-dark/70 mb-6 max-w-sm mx-auto">
          {t("successMessage")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-riiba-orange hover:text-riiba-orange-light transition-colors"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  // ─── Formulario ────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
          <FiAlertCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{t("errorTitle")}</p>
            <p className="text-sm">{t("errorMessage")}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t("name")} <span className="text-riiba-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={data.name}
            onChange={handleChange}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t("email")} <span className="text-riiba-orange">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="institution" className={labelClass}>
          {t("institution")}
        </label>
        <input
          id="institution"
          name="institution"
          type="text"
          value={data.institution}
          onChange={handleChange}
          placeholder={t("institutionPlaceholder")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          {t("subject")} <span className="text-riiba-orange">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={data.subject}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="general">{t("subjects.general")}</option>
          <option value="membership">{t("subjects.membership")}</option>
          <option value="collaboration">{t("subjects.collaboration")}</option>
          <option value="press">{t("subjects.press")}</option>
          <option value="other">{t("subjects.other")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")} <span className="text-riiba-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={data.message}
          onChange={handleChange}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent"
          required
          checked={data.consent}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-riiba-green/30 text-riiba-orange focus:ring-riiba-orange"
        />
        <span className="text-sm text-riiba-green-dark/70 leading-relaxed">
          {t("consent")}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white bg-riiba-orange hover:bg-riiba-orange-light shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          t("submitting")
        ) : (
          <>
            {t("submit")}
            <FiSend size={16} />
          </>
        )}
      </button>
    </form>
  );
}