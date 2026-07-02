import { motion } from "framer-motion";
import { fadeScale, fadeUp } from "../utils/animations";
import AfricanFrieze from "./AfricanFrieze";
import type { SiteLanguage } from "./Layout";

const copy = {
  fr: {
    title: "Je suis un développeur Fullstack et un bâtisseur créatif.",
    body1: "Je suis Arnaud BAYALE, développeur web et mobile fullstack avec une vraie passion pour la création d'expériences digitales utiles, élégantes et mémorables.",
    body2: "Je conçois des interfaces dynamiques et interactives, je reste à jour sur les outils modernes, et je travaille sur des projets variés allant des sites personnels aux applications plus ambitieuses.",
    quote: "Seul on va plus vite, ensemble on va plus loin.",
    quoteAuthor: "Proverbe africain",
  },
  en: {
    title: "I am a Fullstack Developer and creative digital builder.",
    body1: "I am Arnaud BAYALE, a web and mobile fullstack developer passionate about building useful, elegant, and memorable digital experiences.",
    body2: "I design dynamic and interactive interfaces, stay current with modern tools, and work on projects ranging from showcase websites to more ambitious applications.",
    quote: "Alone we go faster, together we go further.",
    quoteAuthor: "African proverb",
  },
};

const PROFILE_PHOTO = "/profile.png";

const About = ({ language }: { language: SiteLanguage }) => (
  <motion.section
    id="about"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="section-block"
  >
    <div className="page-container">
      <div className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-12 xl:gap-20">
        <motion.div
          variants={fadeScale}
          className="flex justify-center md:justify-start"
        >
          <img
            src={PROFILE_PHOTO}
            alt="Arnaud BAYALE"
            width={320}
            height={320}
            loading="lazy"
            className="profile-photo h-[220px] w-[220px] rounded-full border-2 border-foreground object-cover grayscale shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition duration-500 hover:grayscale-0 sm:h-[260px] sm:w-[260px] md:h-[280px] md:w-[280px]"
          />
        </motion.div>

        <div>
          <h2 className="mb-5 text-4xl leading-tight text-foreground md:text-[44px]">
            {copy[language].title}
          </h2>
          <AfricanFrieze className="mb-6 h-2 w-[130px] text-[#9c6a45] opacity-40" />
          <div className="max-w-2xl space-y-4">
            <p className="section-copy hyphens-auto text-justify lg:text-left">{copy[language].body1}</p>
            <p className="section-copy hyphens-auto text-justify lg:text-left">{copy[language].body2}</p>
          </div>
          <figure className="mt-8 max-w-2xl border-l-2 border-[#9c6a45]/60 pl-4">
            <blockquote className="font-heading text-lg italic leading-snug text-foreground/85 md:text-xl">
              « {copy[language].quote} »
            </blockquote>
            <figcaption className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#c99a3f]">
              {copy[language].quoteAuthor}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </motion.section>
);

export default About;
