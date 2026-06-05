import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroPortrait from "../assets/hero-portrait.jpg";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./SocialIcons";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "./Layout";

const socials = [
  { icon: GithubIcon, href: "https://github.com/ArnaudBay", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/arnaud-bayalé-57a35b2b9?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/Arnaud_GYL", label: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/arnaud_bayale?igsh=ODJxYTUybW41MXoy", label: "Instagram" },
  { icon: WhatsappIcon, href: "https://wa.me/23672151688", label: "WhatsApp" },
];

const copy = {
  fr: {
    role: "DÉVELOPPEUR FULLSTACK WEB & MOBILE",
    line: "Je conçois des ",
    highlight: "expériences web & mobile rapides, intuitives et élégantes",
    tail: ".",
    cta: "En savoir plus sur moi",
  },
  en: {
    role: "FULLSTACK WEB & MOBILE DEVELOPER",
    line: "I build ",
    highlight: "clean, fast, and thoughtful digital products",
    tail: " for web and mobile.",
    cta: "More about me",
  },
};

const Hero = ({ language }: { language: SiteLanguage }) => {
  const ctaLink = (
    <Link
      to="/about"
      className="group inline-flex items-center gap-2 border-b border-b-foreground/40 pb-1 text-xs font-bold uppercase tracking-[0.24em] text-foreground transition-all duration-200 hover:gap-3 hover:border-b-foreground"
    >
      <span>{copy[language].cta}</span>
      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );

  return (
    <motion.section id="top" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="page-container">
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="tag-label mb-4 sm:mb-6">{copy[language].role}</motion.p>
            <motion.h1 variants={fadeUp} className="mb-6 text-[42px] leading-[0.92] text-foreground sm:mb-8 sm:text-[56px] md:text-[80px] xl:text-[96px]">Arnaud Bayalé</motion.h1>
            <motion.p variants={fadeUp} className="max-w-xl text-lg leading-9 text-foreground/88 sm:text-xl sm:leading-10 md:text-2xl md:leading-[2.6rem]">
              {copy[language].line}
              <span className="text-foreground">{copy[language].highlight}</span>
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

          <motion.div variants={fadeScale} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center gap-6 sm:gap-8 lg:items-end">
            <div className="orbit-shell">
              <img
                src={heroPortrait}
                alt="Arnaud portrait"
                width={340}
                height={340}
                className="h-[250px] w-[250px] rounded-full border-4 border-[#9c6a45] object-cover sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px] lg:h-[320px] lg:w-[320px]"
              />
            </div>
            {/* Lien sous la photo, espacement adaptatif */}
            {ctaLink}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
