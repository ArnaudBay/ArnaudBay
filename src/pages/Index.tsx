import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export type SiteLanguage = "fr" | "en";
export type SiteTheme = "dark" | "light";

const Index = () => {
  const [language, setLanguage] = useState<SiteLanguage>("fr");
  const [theme, setTheme] = useState<SiteTheme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as SiteTheme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="page-shell">
      <Navbar language={language} onLanguageChange={setLanguage} theme={theme} onThemeToggle={toggleTheme} />
      <main>
        <Hero language={language} />
        <About language={language} />
        <TechStack language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Index;
