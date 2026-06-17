import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./SocialIcons";
import type { SiteLanguage, SiteTheme } from "./Layout";

type Props = {
  language: SiteLanguage;
  onLanguageChange: (language: SiteLanguage) => void;
  theme: SiteTheme;
  onThemeToggle: () => void;
};

type NavLinkDef = { to: string; labelFr: string; labelEn: string };

const links: NavLinkDef[] = [
  { to: "/about", labelFr: "À propos", labelEn: "About" },
  { to: "/skills", labelFr: "Stacks", labelEn: "Skills" },
  { to: "/projects", labelFr: "Projets", labelEn: "Projects" },
  { to: "/contact", labelFr: "Contact", labelEn: "Contact" },
  { to: "/blog", labelFr: "Blog", labelEn: "Blog" },
];

const socials = [
  { icon: GithubIcon, href: "https://github.com/ArnaudBay", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayalé-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/Arnaud_GYL", label: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy", label: "Instagram" },
  { icon: WhatsappIcon, href: "https://wa.me/23672151688", label: "WhatsApp" },
];

const NAV_H = "h-16 sm:h-20";

const LOGO_DARK = "/logo-dark.png";
const LOGO_LIGHT = "/logo-light.png";

const Logo = ({ theme }: { theme: SiteTheme }) => (
  <img
    src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
    alt="Arnaud BAYALE"
    className="h-12 w-auto origin-left scale-x-90 sm:h-14"
    width={56}
    height={56}
  />
);

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
      ? "bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
      : "bg-white/30 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
    : "border-b border-transparent";

  const renderLink = (link: NavLinkDef, className: string) => (
    <NavLink
      key={link.to}
      to={link.to}
      end
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        isActive ? `${className} text-foreground` : className
      }
    >
      {language === "fr" ? link.labelFr : link.labelEn}
    </NavLink>
  );

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 ${headerBg}`}>
        <div className={`page-container flex items-center justify-between ${NAV_H}`}>
          <Link to="/" aria-label="Accueil" className="-ml-4 flex items-center sm:-ml-2 lg:-ml-4">
            <Logo theme={theme} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => renderLink(link, "nav-link"))}
          </nav>

          <div className="-mr-2 flex items-center gap-3 sm:-mr-0 sm:gap-4">
            <button
              type="button"
              onClick={onThemeToggle}
              className="theme-toggle p-1"
              style={{ backgroundColor: theme === "light" ? "black" : "white" }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            />

            <button
              type="button"
              onClick={() => onLanguageChange(language === "fr" ? "en" : "fr")}
              aria-label={language === "fr" ? "Switch to English" : "Passer en français"}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground lg:hidden"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>

            <div className="hidden items-center gap-3 lg:flex">
              <button type="button" onClick={() => onLanguageChange("fr")} className={language === "fr" ? "nav-link text-foreground" : "nav-link"}>FR</button>
              <span className="text-foreground/30">/</span>
              <button type="button" onClick={() => onLanguageChange("en")} className={language === "en" ? "nav-link text-foreground" : "nav-link"}>EN</button>
            </div>

            <button type="button" onClick={() => setOpen(true)} className="flex items-center justify-center p-1 text-foreground lg:hidden" aria-label="Open menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </svg>
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
              <Logo theme={theme} />
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
                <motion.div
                  key={link.to}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  {renderLink(link, "font-heading text-3xl text-foreground sm:text-4xl")}
                </motion.div>
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
