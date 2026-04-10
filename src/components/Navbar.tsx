import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { SiteLanguage, SiteTheme } from "../pages/Index";

type Props = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
  theme: SiteTheme;
  onThemeToggle: () => void;
};

const links = [
  { href: "#about", labelFr: "\u00c0 propos", labelEn: "About" },
  { href: "#skills", labelFr: "Stacks", labelEn: "Skills" },
  { href: "#projects", labelFr: "Projets", labelEn: "Projects" },
  { href: "#contact", labelFr: "Contact", labelEn: "Contact" },
];

const Navbar = ({ language, onLanguageChange, theme, onThemeToggle }: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={
          scrolled
            ? `fixed inset-x-0 top-0 z-50 border-b border-foreground/10 shadow-[0_8px_22px_rgba(0,0,0,0.18)] backdrop-blur-md ${theme === "dark" ? "bg-black/35 supports-[backdrop-filter]:bg-black/22" : "bg-white/70 supports-[backdrop-filter]:bg-white/60"}`
            : "fixed inset-x-0 top-0 z-50 bg-transparent"
        }
      >
        <div className="page-container flex h-16 items-center justify-between gap-4 sm:h-20">
          <a href="#top" className="font-heading text-[2.4rem] leading-none text-foreground sm:text-[2.9rem] md:text-[3rem]">A.</a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {language === "fr" ? link.labelFr : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onThemeToggle}
              className={`theme-toggle ${theme === "light" ? "is-light" : ""}`}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />

            <div className="hidden items-center gap-3 lg:flex">
              <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
              <span className="text-foreground/30">/</span>
              <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
            </div>

            <button type="button" onClick={() => setOpen(true)} className="text-foreground lg:hidden" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="page-container flex h-16 items-center justify-between sm:h-20">
              <span className="font-heading text-[2.4rem] leading-none text-foreground sm:text-[2.9rem] md:text-[3rem]">A.</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onThemeToggle}
                  className={`theme-toggle ${theme === "light" ? "is-light" : ""}`}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                />
                <button type="button" onClick={() => setOpen(false)} className="text-foreground" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-8 sm:h-[calc(100dvh-5rem)]"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="font-heading text-3xl text-foreground sm:text-4xl"
                >
                  {language === "fr" ? link.labelFr : link.labelEn}
                </motion.a>
              ))}
              <div className="mt-6 flex items-center gap-4">
                <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
                <span className="text-foreground/30">/</span>
                <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
