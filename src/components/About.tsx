import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

const copy = {
  fr: {
    title: "Je suis un d\u00e9veloppeur Fullstack et un b\u00e2tisseur cr\u00e9atif.",
    body1: "Je suis Arnaud BAYALE, d\u00e9veloppeur web et mobile fullstack avec une vraie passion pour la cr\u00e9ation d'exp\u00e9riences digitales utiles, \u00e9l\u00e9gantes et m\u00e9morables.",
    body2: "Je con\u00e7ois des interfaces dynamiques et interactives, je reste \u00e0 jour sur les outils modernes, et je travaille sur des projets vari\u00e9s allant des sites personnels aux applications plus ambitieuses.",
  },
  en: {
    title: "I am a Fullstack Developer and creative digital builder.",
    body1: "I am Arnaud BAYALE, a web and mobile fullstack developer passionate about building useful, elegant, and memorable digital experiences.",
    body2: "I design dynamic and interactive interfaces, stay current with modern tools, and work on projects ranging from showcase websites to more ambitious applications.",
  },
};

const About = ({ language }: { language: SiteLanguage }) => (
  <motion.section id="about" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
    <div className="page-container max-w-4xl">
      <div className="editorial-separator"><span className="editorial-cross">+</span></div>
      <h2 className="mb-8 text-4xl leading-tight text-foreground md:text-[52px]">{copy[language].title}</h2>
      <div className="space-y-6">
        <p className="section-copy">{copy[language].body1}</p>
        <p className="section-copy">{copy[language].body2}</p>
      </div>
      <div className="editorial-separator"><span className="editorial-cross">+</span></div>
    </div>
  </motion.section>
);

export default About;
