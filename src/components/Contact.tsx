import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  },
  en: {
    title: "Let's collaborate.",
    subtitle: "Let's talk about your web project, a collaboration, or simply an idea worth building.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
  },
};

const socialLinks = [
  { label: "GitHub", icon: GithubIcon, href: "https://github.com/ArnaudBay" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { label: "X", icon: XIcon, href: "https://x.com/Arnaud_GYL" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy" },
];

const Contact = ({ language }: { language: SiteLanguage }) => (
  <motion.section id="contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
    <div className="page-container">
      <div className="mx-auto max-w-[600px] text-center">
        <div className="editorial-separator"><span className="editorial-cross">+</span></div>
        <h2 className="mb-6 text-5xl leading-none text-foreground md:text-7xl">{copy[language].title}</h2>
        <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground md:text-base">{copy[language].subtitle}</p>
        <form className="mt-12 space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].name}</span>
            <input type="text" placeholder={copy[language].name} className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0" />
          </label>
          <label className="block">
            <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].email}</span>
            <input type="email" placeholder="arnaud@gmail.com" className="w-full border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0" />
          </label>
          <label className="block">
            <span className="mb-3 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy[language].message}</span>
            <textarea rows={4} placeholder={copy[language].message} className="w-full resize-none border-0 border-b border-b-[#333333] bg-transparent px-0 pb-3 pt-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-b-foreground focus:outline-none focus:ring-0" />
          </label>
          <button type="submit" className="inline-flex items-center gap-2 text-sm text-foreground transition-all duration-200 hover:opacity-75">
            <span>{copy[language].submit}</span>
            <ArrowRight size={16} />
          </button>
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

export default Contact;
