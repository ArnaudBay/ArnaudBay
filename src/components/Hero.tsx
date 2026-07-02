import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    tail: ", de la première idée jusqu'au déploiement.",
    cta: "Plus",
  },
  en: {
    role: "FULLSTACK WEB & MOBILE DEVELOPER",
    line: "I build ",
    highlight: "clean, fast, and thoughtful digital products",
    tail: " for web and mobile, from the first idea to deployment.",
    cta: "More",
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
    <motion.section id="top" variants={fadeUp} initial="hidden" animate="visible" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="page-container">
        <div className="grid items-center gap-8 sm:gap-16 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="order-1 text-center lg:hidden">
            <motion.p variants={fadeUp} className="tag-label mb-4">{copy[language].role}</motion.p>
            <motion.h1 variants={fadeUp} className="text-[42px] leading-[0.92] text-foreground sm:text-[56px]">Arnaud Bayalé</motion.h1>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="order-3 text-center lg:order-1 lg:text-left">
            <motion.p variants={fadeUp} className="tag-label mb-4 hidden sm:mb-6 lg:block">{copy[language].role}</motion.p>
            <motion.h1 variants={fadeUp} className="mb-6 hidden text-[42px] leading-[0.92] text-foreground sm:mb-8 sm:text-[56px] md:text-[80px] lg:block xl:text-[96px]">Arnaud Bayalé</motion.h1>
            <motion.p variants={fadeUp} className="mx-auto max-w-xl text-lg leading-9 text-foreground/88 sm:text-xl sm:leading-10 md:text-2xl md:leading-[2.6rem] lg:mx-0">
              {copy[language].line}
              <span className="text-foreground">{copy[language].highlight}</span>
              {copy[language].tail}
            </motion.p>
            <motion.div variants={staggerContainer} className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:mt-6 lg:justify-start">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a key={label} variants={fadeUp} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-foreground transition-colors hover:opacity-75">
                  <Icon size={24} />
                </motion.a>
              ))}
              <motion.div variants={fadeUp} className="lg:ml-6">{ctaLink}</motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeScale} initial="hidden" animate="visible" className="relative order-2 flex flex-col items-center gap-6 sm:gap-8 lg:order-2 lg:mt-6 lg:items-end">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9c6a45]/25 blur-[70px] sm:h-[340px] sm:w-[340px] lg:hidden"
            />
            <img
              src="/arn.png"
              alt="Arnaud portrait"
              width={340}
              height={340}
              className="h-[240px] w-[240px] object-contain sm:h-[280px] sm:w-[280px] md:h-[400px] md:w-[400px] lg:h-[360px] lg:w-[360px]"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
