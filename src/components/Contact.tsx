import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import { fadeUp } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

const copy = {
  fr: {
    title: "Collaborons.",
    subtitle: "Parlons de votre projet web, d'une collaboration ou simplement d'une idee a construire.",
    name: "Nom",
    email: "Email",
    message: "Message",
    submit: "Envoyer le message",
    success: "Message envoye ! Je vous repondrai sous peu.",
    error: "Une erreur est survenue. Veuillez reessayer.",
  },
  en: {
    title: "Let's collaborate.",
    subtitle: "Let's talk about your web project, a collaboration, or simply an idea worth building.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
    success: "Message sent! I'll get back to you soon.",
    error: "An error occurred. Please try again.",
  },
};

const socialLinks = [
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/ArnaudBay" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "X", icon: XIcon, href: "https://x.com/Arnaud_GYL" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy" },
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
          <div className="editorial-separator"><span className="editorial-cross">+</span></div>
          <h2 className="mb-6 text-5xl leading-none text-foreground md:text-7xl">{copy[language].title}</h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{copy[language].subtitle}</p>
          <form className="mt-12 space-y-8 text-left" onSubmit={handleSubmit}>
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].name}</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={copy[language].name}
                required
                className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0"
              />
            </label>
            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].email}</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="arnaud@gmail.com"
                required
                className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0"
              />
            </label>
            <label className="block">
              <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].message}</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder={copy[language].message}
                required
                className="w-full resize-none border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0"
              />
            </label>
            {status === "success" ? (
              <p className="text-sm text-green-500">{copy[language].success}</p>
            ) : status === "error" ? (
              <p className="text-sm text-red-500">{copy[language].error}</p>
            ) : (
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 text-sm text-foreground transition-all duration-200 hover:opacity-75 disabled:opacity-50"
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                <span>{copy[language].submit}</span>
              </button>
            )}
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