import { motion } from "framer-motion";
import { HardDriveDownload } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

type TechItem = {
  name: string;
  iconSrc?: string;
  icon?: typeof HardDriveDownload;
  invert?: boolean;
  href?: string;
};

type Group = {
  titleFr: string;
  titleEn: string;
  items: TechItem[];
};

const groups: Group[] = [
  {
    titleFr: "Front-End",
    titleEn: "Front-End",
    items: [
      { name: "HTML5", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/HTML" },
      { name: "CSS3", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/CSS" },
      { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/JavaScript" },
      { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", href: "https://www.typescriptlang.org" },
      { name: "React.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", href: "https://react.dev" },
      { name: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true, href: "https://nextjs.org" },
      { name: "Tailwind", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", href: "https://tailwindcss.com" },
    ],
  },
  {
    titleFr: "Back-End",
    titleEn: "Back-End",
    items: [
      { name: "Node.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", href: "https://nodejs.org" },
      { name: "Express.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true, href: "https://expressjs.com" },
      { name: "Firebase", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", href: "https://firebase.google.com" },
      { name: "MySQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", href: "https://www.mysql.com" },
    ],
  },
  {
    titleFr: "Langages & Mobile",
    titleEn: "Languages & Mobile",
    items: [
      { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/JavaScript" },
      { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", href: "https://www.typescriptlang.org" },
      { name: "Dart", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", href: "https://dart.dev" },
      { name: "Flutter", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", href: "https://flutter.dev" },
    ],
  },
  {
    titleFr: "Outils",
    titleEn: "Tools",
    items: [
      { name: "Bun", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg", href: "https://bun.sh" },
      { name: "Git", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", href: "https://git-scm.com" },
      { name: "GitHub", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true, href: "https://github.com" },
      { name: "Vite.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", href: "https://vitejs.dev" },
      { name: "VS Code", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", href: "https://code.visualstudio.com" },
      { name: "Figma", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", href: "https://www.figma.com" },
      { name: "Android Studio", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", href: "https://developer.android.com/studio" },
      { name: "REST API", icon: HardDriveDownload },
    ],
  },
];

const labels = { fr: "Stacks & Outils", en: "Stacks & Tools" };

const TechStack = ({ language }: { language: SiteLanguage }) => (
  <motion.section id="skills" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
    <div className="page-container">
      <div className="mb-12 flex items-center justify-between gap-4">
        <span className="editorial-cross">+</span>
        <h2 className="text-center text-4xl text-foreground md:text-5xl">
          {labels[language]} <span className="text-foreground">/</span>
        </h2>
        <span className="editorial-cross">+</span>
      </div>
      <div className="grid gap-12 md:grid-cols-2">
        {groups.map((group) => (
          <motion.div key={group.titleEn} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">
            <motion.h3 variants={fadeUp} className="font-heading text-3xl text-foreground">
              {language === "fr" ? group.titleFr : group.titleEn} <span className="text-foreground">()</span>
            </motion.h3>
            <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-4">
              {group.items.map(({ name, iconSrc, icon: Icon, invert, href }) => (
                <motion.div key={name} variants={fadeScale} className="group flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-sm border border-border bg-card px-2 py-3 sm:min-h-[124px] sm:gap-3 sm:px-3 sm:py-4 hover:border-foreground/40">
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="flex h-10 items-center justify-center sm:h-12">
                      {iconSrc ? (
                        <img src={iconSrc} alt={name} className={`h-8 w-8 object-contain sm:h-10 sm:w-10${invert ? " icon-invert" : ""}`} loading="lazy" width={40} height={40} />
                      ) : Icon ? (
                        <Icon size={32} className="text-foreground sm:h-9 sm:w-9" />
                      ) : null}
                    </a>
                  ) : (
                    <div className="flex h-10 items-center justify-center sm:h-12">
                      {iconSrc ? (
                        <img src={iconSrc} alt={name} className={`h-8 w-8 object-contain sm:h-10 sm:w-10${invert ? " icon-invert" : ""}`} loading="lazy" width={40} height={40} />
                      ) : Icon ? (
                        <Icon size={32} className="text-foreground sm:h-9 sm:w-9" />
                      ) : null}
                    </div>
                  )}
                  <span className="text-center text-[11px] text-foreground/90 group-hover:text-foreground/75 sm:text-[12px]">{name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default TechStack;
