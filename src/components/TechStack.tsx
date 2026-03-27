import { motion } from "framer-motion";
import { HardDriveDownload } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

type TechItem = {
  name: string;
  iconSrc?: string;
  icon?: typeof HardDriveDownload;
  invert?: boolean;
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
      { name: "HTML5", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "Tailwind", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    titleFr: "Back-End",
    titleEn: "Back-End",
    items: [
      { name: "Node.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
      { name: "Firebase", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "MySQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
    ],
  },
  {
    titleFr: "Langages & Mobile",
    titleEn: "Languages & Mobile",
    items: [
      { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Dart", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      { name: "Flutter", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    ],
  },
  {
    titleFr: "Outils",
    titleEn: "Tools",
    items: [
      { name: "Bun", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg" },
      { name: "Git", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
      { name: "Vite.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
      { name: "VS Code", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Figma", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Android Studio", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
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
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4">
              {group.items.map(({ name, iconSrc, icon: Icon, invert }) => (
                <motion.div key={name} variants={fadeScale} className="group flex min-h-[124px] flex-col items-center justify-center gap-3 rounded-sm border border-border bg-card px-3 py-4 transition-colors duration-200 hover:border-foreground/40">
                  <div className="flex h-12 items-center justify-center">
                    {iconSrc ? (
                      <img src={iconSrc} alt={name} className={invert ? "h-10 w-10 object-contain invert" : "h-10 w-10 object-contain"} loading="lazy" width={40} height={40} />
                    ) : Icon ? (
                      <Icon size={36} className="text-foreground" />
                    ) : null}
                  </div>
                  <span className="text-center text-[12px] text-foreground/90 group-hover:text-foreground/75">{name}</span>
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
