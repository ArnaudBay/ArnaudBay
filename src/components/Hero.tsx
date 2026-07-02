import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./SocialIcons";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "./Layout";

// Disposition du Hero sur mobile — basculer entre "editorial" | "sidebyside" | "banner"
type MobileHero = "editorial" | "sidebyside" | "banner";
const MOBILE_HERO = "sidebyside" as MobileHero;

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
    sub: "Toujours à la recherche de projets ambitieux et de belles collaborations.",
    cta: "Plus",
  },
  en: {
    role: "FULLSTACK WEB & MOBILE DEVELOPER",
    line: "I build ",
    highlight: "clean, fast, and thoughtful digital products",
    tail: " for web and mobile, from the first idea to deployment.",
    sub: "Always looking for ambitious projects and great collaborations.",
    cta: "More",
  },
};

const Hero = ({ language }: { language: SiteLanguage }) => {
  const c = copy[language];

  const ctaLink = (
    <Link
      to="/about"
      className="group inline-flex items-center gap-2 border-b border-b-foreground/40 pb-1 text-xs font-bold uppercase tracking-[0.24em] text-foreground transition-all duration-200 hover:gap-3 hover:border-b-foreground"
    >
      <span>{c.cta}</span>
      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );

  const description = (
    <motion.p variants={fadeUp} className="max-w-xl text-lg leading-9 text-foreground/88 sm:text-xl sm:leading-10 md:text-2xl md:leading-[2.6rem]">
      {c.line}
      <span className="text-foreground">{c.highlight}</span>
      {c.tail}
    </motion.p>
  );

  const renderSocials = (ctaClass = "") => (
    <motion.div variants={staggerContainer} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-5 sm:mt-6">
      {socials.map(({ icon: Icon, href, label }) => (
        <motion.a key={label} variants={fadeUp} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-foreground transition-colors hover:opacity-75">
          <Icon size={24} />
        </motion.a>
      ))}
      <motion.div variants={fadeUp} className={ctaClass}>{ctaLink}</motion.div>
    </motion.div>
  );

  const glow = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-[#9c6a45]/25 blur-[70px]"
    />
  );

  // Frise africaine discrète (losanges type kente / bogolan)
  const africanFrieze = (id: string, className: string) => (
    <svg viewBox="0 0 240 10" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="16" height="10" patternUnits="userSpaceOnUse">
          <path d="M8 1 L14 5 L8 9 L2 5 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="8" cy="5" r="0.8" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );

  return (
    <motion.section id="top" variants={fadeUp} initial="hidden" animate="visible" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="page-container">
        {/* ---------- DESKTOP (lg et +) ---------- */}
        <div className="hidden items-center gap-16 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="tag-label mb-6">{c.role}</motion.p>
            <motion.h1 variants={fadeUp} className="mb-6 text-[80px] leading-[0.92] text-foreground xl:text-[96px]">Arnaud Bayalé</motion.h1>
            <motion.div variants={fadeUp} className="mb-8">
              {africanFrieze("afroDiamondD", "h-2.5 w-[220px] text-[#9c6a45] opacity-40")}
            </motion.div>
            {description}
            {renderSocials("lg:ml-6")}
          </motion.div>
          <motion.div variants={fadeScale} initial="hidden" animate="visible" className="-mt-8 flex flex-col items-end gap-3">
            <img src="/arn.png" alt="Arnaud portrait" width={460} height={460} className="h-[460px] w-[460px] object-contain" />
            {africanFrieze("afroDiamondP", "h-2.5 w-[300px] text-[#9c6a45] opacity-40")}
          </motion.div>
        </div>

        {/* ---------- MOBILE (jusqu'à lg) ---------- */}
        <div className="flex min-h-[calc(100svh-9rem)] flex-col justify-center lg:hidden">
          {MOBILE_HERO === "editorial" && (
            <div className="flex flex-col gap-8">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.p variants={fadeUp} className="tag-label mb-4">{c.role}</motion.p>
                <motion.h1 variants={fadeUp} className="text-[56px] leading-[0.92] text-foreground sm:text-[68px]">Arnaud Bayalé</motion.h1>
              </motion.div>
              <motion.div variants={fadeScale} initial="hidden" animate="visible" className="-mt-2 flex justify-end">
                <div className="relative">
                  {glow}
                  <img src="/arn.png" alt="Arnaud portrait" width={240} height={240} className="h-[200px] w-[200px] object-contain sm:h-[240px] sm:w-[240px]" />
                </div>
              </motion.div>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                {description}
                {renderSocials()}
              </motion.div>
            </div>
          )}

          {MOBILE_HERO === "sidebyside" && (
            <div className="flex min-h-[inherit] flex-1 flex-col">
              {/* Haut : rôle en surtitre, puis photo + nom */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.p variants={fadeUp} className="tag-label mb-5">{c.role}</motion.p>
                <div className="flex items-center gap-5">
                  <motion.div variants={fadeScale} className="relative shrink-0">
                    {glow}
                    <img src="/arn.png" alt="Arnaud portrait" width={190} height={190} className="h-[150px] w-[150px] object-contain sm:h-[190px] sm:w-[190px]" />
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="min-w-0 text-[42px] leading-[0.86] tracking-tight text-foreground sm:text-[56px]">
                    <span className="block">Arnaud</span>
                    <span className="block text-[#9c6a45]">Bayalé</span>
                  </motion.h1>
                </div>
              </motion.div>

              {/* Touche africaine discrète : frise de losanges (kente / bogolan) */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
                {africanFrieze("afroDiamondM", "h-2.5 w-full text-[#9c6a45] opacity-40")}
              </motion.div>

              {/* Bas : texte enrichi + réseaux */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-8 flex flex-1 flex-col">
                {description}
                <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-8 text-foreground/70 sm:text-xl sm:leading-9">
                  {c.sub}
                </motion.p>
                <div className="mt-auto pt-10">
                  {renderSocials()}
                </div>
              </motion.div>
            </div>
          )}

          {MOBILE_HERO === "banner" && (
            <div className="flex flex-col gap-8">
              <motion.div variants={fadeScale} initial="hidden" animate="visible" className="relative overflow-hidden rounded-3xl">
                <img src="/arn.png" alt="Arnaud portrait" className="h-[420px] w-full object-cover object-top sm:h-[480px]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-6 pt-24">
                  <p className="tag-label mb-2">{c.role}</p>
                  <h1 className="text-[44px] leading-[0.95] text-foreground sm:text-[56px]">Arnaud Bayalé</h1>
                </div>
              </motion.div>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                {description}
                {renderSocials()}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
