import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import About from "../components/About";
import TrustedBy from "../components/TrustedBy";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";

const projectsCta = {
  fr: "Voir mes projets",
  en: "View my projects",
};

const AboutPage = () => {
  const language = useLanguage();
  useSeo("about", language);
  return (
    <div className="pt-20 sm:pt-24">
      <About language={language} />
      <TrustedBy language={language} />
      <div className="page-container flex justify-center pb-16 sm:pb-20">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 border-b border-b-foreground/40 pb-1 text-xs font-bold uppercase tracking-[0.24em] text-foreground transition-all duration-200 hover:gap-3 hover:border-b-foreground"
        >
          <span>{projectsCta[language]}</span>
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
