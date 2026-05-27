import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./SocialIcons";
import { fadeUp } from "../utils/animations";
import type { SiteLanguage } from "./Layout";

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

const copy = {
  fr: {
    title: "Collaborons.",
    subtitle: "Parlons de votre projet web, d'une collaboration ou simplement d'une idée à construire.",
    nameLabel: "Nom complet",
    namePlaceholder: "Ex : Jean Dupont",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "vous@exemple.com",
    messageLabel: "Votre message",
    messagePlaceholder: "Décrivez votre projet, vos objectifs, votre échéance…",
    messageHint: `Min. ${MESSAGE_MIN} caractères`,
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    success: "Message envoyé ! Je vous réponds très vite.",
    error: "Oups, l'envoi a échoué. Veuillez réessayer.",
  },
  en: {
    title: "Let's collaborate.",
    subtitle: "Let's talk about your web project, a collaboration, or simply an idea worth building.",
    nameLabel: "Full name",
    namePlaceholder: "e.g. John Doe",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    messageLabel: "Your message",
    messagePlaceholder: "Tell me about your project, goals, timeline…",
    messageHint: `Min. ${MESSAGE_MIN} characters`,
    submit: "Send message",
    sending: "Sending…",
    success: "Message sent! I'll get back to you shortly.",
    error: "Something went wrong. Please try again.",
  },
};

const socialLinks = [
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/ArnaudBay" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "X", icon: XIcon, href: "https://x.com/Arnaud_GYL" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy" },
  { label: "WhatsApp", icon: WhatsappIcon, href: "https://wa.me/23672151688" },
];

const Contact = ({ language }: { language: SiteLanguage }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const API_URL = import.meta.env.VITE_API_URL || "/api/contact";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 2000);
      } else {
        console.error("API error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.section id="contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
      <div className="page-container">
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="mb-6 text-5xl leading-none text-foreground md:text-7xl">{copy[language].title}</h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{copy[language].subtitle}</p>
          <form className="mt-12 space-y-8 text-left" onSubmit={handleSubmit} noValidate>
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />

            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].nameLabel}</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={copy[language].namePlaceholder}
                autoComplete="name"
                required
                className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-b-foreground focus:outline-none focus:ring-0"
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].emailLabel}</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={copy[language].emailPlaceholder}
                autoComplete="email"
                required
                className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-b-foreground focus:outline-none focus:ring-0"
              />
            </label>

            <label className="block">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].messageLabel}</span>
                <span className={`text-[10px] tracking-[0.15em] ${formData.message.length >= MESSAGE_MIN ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                  {formData.message.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                minLength={MESSAGE_MIN}
                maxLength={MESSAGE_MAX}
                placeholder={copy[language].messagePlaceholder}
                required
                className="w-full resize-none border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm leading-7 text-foreground placeholder:text-muted-foreground/60 focus:border-b-foreground focus:outline-none focus:ring-0"
              />
              <span className="mt-2 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                {copy[language].messageHint}
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center gap-2 border-b border-b-foreground/40 pb-1 text-xs uppercase tracking-[0.24em] text-foreground transition-all duration-200 hover:border-b-foreground hover:gap-3 disabled:opacity-50"
              >
                {status === "loading" ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                <span>{status === "loading" ? copy[language].sending : copy[language].submit}</span>
              </button>

              {status === "success" ? (
                <p className="text-xs uppercase tracking-[0.2em] text-green-500">{copy[language].success}</p>
              ) : status === "error" ? (
                <p className="text-xs uppercase tracking-[0.2em] text-red-500">{copy[language].error}</p>
              ) : null}
            </div>
          </form>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;