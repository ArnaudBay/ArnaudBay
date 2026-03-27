import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { SiteLanguage } from "../pages/Index";

type Props = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
};

const links = [
  { href: "#about", labelFr: "\u00c0 propos", labelEn: "About" },
  { href: "#skills", labelFr: "Stacks", labelEn: "Skills" },
  { href: "#projects", labelFr: "Projets", labelEn: "Projects" },
  { href: "#contact", labelFr: "Contact", labelEn: "Contact" },
];

const Navbar = ({ language, onLanguageChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={
          scrolled
            ? "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/35 shadow-[0_8px_22px_rgba(0,0,0,0.18)] backdrop-blur-md supports-[backdrop-filter]:bg-black/22"
            : "fixed inset-x-0 top-0 z-50 bg-transparent"
        }
      >
        <div className="page-container flex h-20 items-center justify-between gap-6">
          <a href="#top" className="font-heading text-[2.9rem] leading-none text-foreground md:text-[3rem]">A.</a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {language === "fr" ? link.labelFr : link.labelEn}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
            <span className="text-foreground/30">/</span>
            <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
          </div>

          <button type="button" onClick={() => setOpen(true)} className="text-foreground lg:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="page-container flex h-20 items-center justify-between">
              <span className="font-heading text-[2.9rem] leading-none text-foreground md:text-[3rem]">A.</span>
              <button type="button" onClick={() => setOpen(false)} className="text-foreground" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="font-heading text-4xl text-foreground"
                >
                  {language === "fr" ? link.labelFr : link.labelEn}
                </motion.a>
              ))}
              <div className="mt-6 flex items-center gap-4">
                <button type="button" onClick={() => onLanguageChange("fr")} className="nav-link text-foreground">FR</button>
                <span className="text-foreground/30">/</span>
                <button type="button" onClick={() => onLanguageChange("en")} className="nav-link text-foreground">EN</button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
