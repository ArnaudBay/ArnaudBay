import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import type { SiteLanguage, SiteTheme } from "../pages/Index";

type Props = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
  theme: SiteTheme;
  onThemeToggle: () => void;
};

const links = [
  { href: "#top", labelFr: "Accueil", labelEn: "Home" },
  { href: "#about", labelFr: "À propos", labelEn: "About" },
  { href: "#skills", labelFr: "Stacks", labelEn: "Skills" },
  { href: "#projects", labelFr: "Projets", labelEn: "Projects" },
  { href: "#contact", labelFr: "Contact", labelEn: "Contact" },
];

const socials = [
  { icon: GithubIcon, href: "https://github.com/ArnaudBay", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/Arnaud_GYL", label: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy", label: "Instagram" },
];

const NAV_H = "h-16 sm:h-20";

const Navbar = ({ language, onLanguageChange, theme, onThemeToggle }: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const headerBg = scrolled
    ? theme === "dark"
      ? "bg-black/50 backdrop-blur-md border-b border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
      : "bg-white/75 backdrop-blur-md border-b border-black/8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    : "border-b border-transparent";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 ${headerBg}`}>
        <div className={`page-container flex items-center justify-between ${NAV_H}`}>
          <a href="#top" className="font-heading text-[2.4rem] leading-none text-foreground sm:text-[3.1rem]">A.</a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {language === "fr" ? link.labelFr : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onThemeToggle}
              className="theme-toggle p-1"
              style={{ backgroundColor: theme === "light" ? "black" : "white" }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />

            <div className="hidden items-center gap-3 lg:flex">
              <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
              <span className="text-foreground/30">/</span>
              <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
            </div>

            <button type="button" onClick={() => setOpen(true)} className="flex items-center justify-center p-1 text-foreground lg:hidden" aria-label="Open menu">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className={`page-container flex items-center justify-between ${NAV_H}`}>
              <span className="font-heading text-[2.4rem] leading-none text-foreground sm:text-[3.1rem]">A.</span>
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onThemeToggle}
                  className="theme-toggle p-1"
                  style={{ backgroundColor: theme === "light" ? "black" : "white" }}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                />
                <button type="button" onClick={() => setOpen(false)} className="flex items-center justify-center p-1 text-foreground" aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="flex h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-7 px-6 sm:h-[calc(100dvh-5rem)]"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="font-heading text-3xl text-foreground sm:text-4xl"
                >
                  {language === "fr" ? link.labelFr : link.labelEn}
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="mt-4 flex items-center gap-4"
              >
                <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
                <span className="text-foreground/30">/</span>
                <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-8 flex items-center gap-5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-foreground hover:opacity-75">
                    <Icon size={24} />
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
