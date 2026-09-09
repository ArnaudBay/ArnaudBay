import { useEffect, useState } from "react";
import { Outlet, useOutletContext, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export type SiteLanguage = "fr" | "en";
export type SiteTheme = "dark" | "light";

type LayoutCtx = { language: SiteLanguage; theme: SiteTheme };

const Layout = () => {
  const [language, setLanguage] = useState<SiteLanguage>("fr");
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window !== "undefined") {
      // Force le mode clair au premier chargement (reset unique des anciennes préférences).
      if (!localStorage.getItem("theme-default-light")) {
        localStorage.setItem("theme-default-light", "1");
        localStorage.setItem("theme", "light");
        return "light";
      }
      return (localStorage.getItem("theme") as SiteTheme) || "light";
    }
    return "light";
  });

  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="page-shell">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main className="flex-1">
        <Outlet context={{ language, theme } satisfies LayoutCtx} />
      </main>
      <Footer />
    </div>
  );
};

export const useLanguage = () => useOutletContext<LayoutCtx>().language;
export const useTheme = () => useOutletContext<LayoutCtx>().theme;

export default Layout;
