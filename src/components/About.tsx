import { motion } from "framer-motion";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import AfricanFrieze from "./AfricanFrieze";
import type { SiteLanguage } from "./Layout";

const copy = {
  fr: {
    location: "Basé en Afrique. Disponible dans le monde entier.",
    titleName: "Je suis Arnaud Bayalé",
    titleRest: " Je transforme des idées en produits digitaux que l'on aime utiliser.",
    body1: "Développeur web et mobile fullstack, j'accompagne porteurs de projets, startups et entreprises qui ont une vision claire mais qui ont besoin d'une exécution concrète pour la faire exister.",
    body2: "De la conception de l'interface à la mise en production, je façonne des expériences rapides, intuitives et élégantes en restant à jour sur les outils modernes et en soignant chaque détail, du premier prototype jusqu'au déploiement.",
    quote: "Seul on va plus vite, ensemble on va plus loin.",
    quoteAuthor: "Proverbe africain",
  },
  en: {
    location: "Based in Africa. Working worldwide.",
    titleName: "I'm Arnaud Bayalé",
    titleRest: " I turn ideas into digital products people love to use.",
    body1: "A fullstack web and mobile developer, I work alongside founders, startups and companies that have a clear vision but need the hands-on execution to bring it to life.",
    body2: "From interface design to production, I craft fast, intuitive and elegant experiences staying current with modern tools and caring about every detail, from the first prototype all the way to deployment.",
    quote: "Alone we go faster, together we go further.",
    quoteAuthor: "African proverb",
  },
};

const PROFILE_PHOTO = "/profile.png";

const About = ({ language }: { language: SiteLanguage }) => {
  const c = copy[language];

  return (
    <motion.section
      id="about"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="section-block"
      style={{ fontFamily: '"General Sans", ui-sans-serif, system-ui, sans-serif' }}
    >
      <div className="page-container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.div variants={fadeScale} className="self-start">
            <img
              src={PROFILE_PHOTO}
              alt="Arnaud BAYALE"
              width={320}
              height={320}
              loading="lazy"
              className="profile-photo h-[132px] w-[132px] rounded-full border-2 border-foreground object-cover grayscale shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition duration-500 hover:grayscale-0 sm:h-[150px] sm:w-[150px]"
            />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: '"General Sans", ui-sans-serif, system-ui, sans-serif' }}
            className="mt-8 w-full text-left text-[26px] font-medium leading-[1.18] tracking-tight text-foreground sm:text-[30px] md:text-[34px]"
          >
            <span className="text-[#9c6a45]">{c.titleName}</span>
            <span>{c.titleRest}</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-7 w-full space-y-5">
            <p className="hyphens-auto text-justify text-base font-medium leading-8 text-foreground/80 md:text-lg md:leading-9">{c.body1}</p>
            <p className="hyphens-auto text-justify text-base font-medium leading-8 text-foreground/80 md:text-lg md:leading-9">{c.body2}</p>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-base text-muted-foreground/80 md:text-lg">
            {c.location}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center gap-4">
            <AfricanFrieze className="h-2 w-[110px] text-[#9c6a45] opacity-40" />
            <figure>
              <blockquote className="font-heading text-lg italic leading-snug text-foreground/85 md:text-xl">
                « {c.quote} »
              </blockquote>
              <figcaption className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-[#c99a3f]">
                {c.quoteAuthor}
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
