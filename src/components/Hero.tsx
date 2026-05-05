import { motion } from "framer-motion";
import heroPortrait from "../assets/hero-portrait.jpg";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "./SocialIcons";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

const socials = [
  { icon: GithubIcon, href: "https://github.com/ArnaudBay", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayale-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/Arnaud_GYL", label: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy", label: "Instagram" },
];

const copy = {
  fr: {
    role: "DÉVELOPPEUR WEB MOBILE FULLSTACK",
    line: "Je suis développeur web & mobile basé en Republique centrafricaine. ",
    highlight: "Je conçois des expériences digitales rapides, intuitives et élégantes.",
    tail: ".",
  },
  en: {
    role: "FULLSTACK WEB & MOBILE DEVELOPER",
    line: "I build ",
    highlight: "clean, fast, and thoughtful digital products",
    tail: " for web and mobile.",
  },
};

const Hero = ({ language }: { language: SiteLanguage }) => (
  <motion.section id="top" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block pt-28 sm:pt-36">
    <div className="page-container">
      <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="tag-label mb-4 sm:mb-6">{copy[language].role}</motion.p>
          <motion.h1 variants={fadeUp} className="mb-6 text-[42px] leading-[0.92] text-foreground sm:mb-8 sm:text-[56px] md:text-[80px] xl:text-[96px]">Arnaud.</motion.h1>
          <motion.p variants={fadeUp} className="max-w-xl text-base leading-8 text-foreground/88 sm:text-lg sm:leading-9 md:text-xl">
            {copy[language].line}
            <span className="italic text-foreground">{copy[language].highlight}</span>
            {copy[language].tail}
          </motion.p>
          <motion.div variants={staggerContainer} className="mt-8 flex items-center gap-5 sm:mt-10">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a key={label} variants={fadeUp} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-foreground transition-colors hover:opacity-75">
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeScale} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center lg:justify-end">
          <div className="orbit-shell">
            <div className="orbit-dot-ring" />
            <img
              src={heroPortrait}
              alt="Arnaud portrait"
              width={340}
              height={340}
              className="h-[250px] w-[250px] rounded-full border-2 border-foreground object-cover grayscale sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px]"
            />
          </div>
        </motion.div>
      </div>
      <div className="editorial-separator">
        <span className="editorial-cross">+</span>
      </div>
    </div>
  </motion.section>
);

export default Hero;
