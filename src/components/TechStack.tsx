import { motion } from "framer-motion";
import { HardDriveDownload } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "./Layout";

type TechItem = {
  name: string;
  iconSrc?: string;
  icon?: typeof HardDriveDownload;
  invert?: boolean;
  href?: string;
};

type CategoryKey = "frontend" | "backend" | "mobile" | "devops" | "design";

type Group = {
  key: CategoryKey;
  titleFr: string;
  titleEn: string;
  items: TechItem[];
};

const groups: Group[] = [
  {
    key: "frontend",
    titleFr: "Frontend",
    titleEn: "Frontend",
    items: [
      { name: "HTML5", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/HTML" },
      { name: "CSS3", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/CSS" },
      { name: "JavaScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", href: "https://developer.mozilla.org/fr-FR/docs/Web/JavaScript" },
      { name: "TypeScript", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", href: "https://www.typescriptlang.org" },
      { name: "React.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", href: "https://react.dev" },
      { name: "Next.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true, href: "https://nextjs.org" },
      { name: "Tailwind", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", href: "https://tailwindcss.com" },
      { name: "TanStack", iconSrc: "https://avatars.githubusercontent.com/u/72518640?s=80", href: "https://tanstack.com" },
    ],
  },
  {
    key: "backend",
    titleFr: "Backend",
    titleEn: "Backend",
    items: [
      { name: "Node.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", href: "https://nodejs.org" },
      { name: "Express.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true, href: "https://expressjs.com" },
      { name: "Firebase", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", href: "https://firebase.google.com" },
      { name: "MySQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", href: "https://www.mysql.com" },
      { name: "PostgreSQL", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", href: "https://www.postgresql.org" },
      { name: "Sanity", iconSrc: "https://cdn.simpleicons.org/sanity/F03E2F", href: "https://www.sanity.io" },
      { name: "REST API", icon: HardDriveDownload },
    ],
  },
  {
    key: "mobile",
    titleFr: "Mobile",
    titleEn: "Mobile",
    items: [
      { name: "Dart", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", href: "https://dart.dev" },
      { name: "Flutter", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", href: "https://flutter.dev" },
      { name: "Android Studio", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", href: "https://developer.android.com/studio" },
    ],
  },
  {
    key: "devops",
    titleFr: "DevOps / Outils",
    titleEn: "DevOps / Tools",
    items: [
      { name: "Bun", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg", href: "https://bun.sh" },
      { name: "Git", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", href: "https://git-scm.com" },
      { name: "GitHub", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true, href: "https://github.com" },
      { name: "Vite.js", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", href: "https://vitejs.dev" },
      { name: "VS Code", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", href: "https://code.visualstudio.com" },
      { name: "Vercel", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true, href: "https://vercel.com" },
      { name: "Docker", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", href: "https://www.docker.com" },
      { name: "Railway", iconSrc: "https://cdn.simpleicons.org/railway/000000", invert: true, href: "https://railway.app" },
      { name: "Cloudflare", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", href: "https://www.cloudflare.com" },
    ],
  },
  {
    key: "design",
    titleFr: "Design",
    titleEn: "Design",
    items: [
      { name: "Figma", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", href: "https://www.figma.com" },
    ],
  },
];

const labels = { fr: "Stacks & Outils", en: "Stacks & Tools" };

const TechStack = ({ language }: { language: SiteLanguage }) => {
  // Catégories non vides, rangées par nombre d'outils décroissant pour
  // équilibrer les deux colonnes (les plus fournies en haut).
  const visibleGroups = groups
    .filter((g) => g.items.length > 0)
    .sort((a, b) => b.items.length - a.items.length);

  return (
    <motion.section
      id="skills"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="section-block"
    >
      <div className="page-container">
        <div className="mb-12 flex items-center justify-between gap-4">
          <span className="editorial-cross"></span>
          <h2 className="text-center text-4xl text-foreground md:text-5xl">
            {labels[language]} <span className="text-foreground"></span>
          </h2>
          <span className="editorial-cross"></span>
        </div>
        <div className="border-b border-border">
          {visibleGroups.map((group, index) => (
            <motion.div
              key={group.key}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-5 border-t border-border py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-10 lg:grid-cols-[220px_minmax(0,1fr)]"
            >
              <motion.div variants={fadeUp} className="md:pt-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-2xl text-[#9c6a45]/40 sm:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-2xl text-foreground sm:text-3xl">
                    {language === "fr" ? group.titleFr : group.titleEn}
                  </h3>
                </div>
                <p className="tag-label mt-2 md:mt-3">
                  {group.items.length}{" "}
                  {language === "fr"
                    ? group.items.length > 1 ? "outils" : "outil"
                    : group.items.length > 1 ? "tools" : "tool"}
                </p>
              </motion.div>

              <motion.div variants={staggerContainer} className="flex flex-wrap gap-3 sm:gap-4">
                {group.items.map(({ name, iconSrc, icon: Icon, invert, href }) => {
                  const icon = iconSrc ? (
                    <img
                      src={iconSrc}
                      alt={name}
                      className={`h-8 w-8 object-contain sm:h-9 sm:w-9${invert ? " icon-invert" : ""}`}
                      loading="lazy"
                      width={40}
                      height={40}
                    />
                  ) : Icon ? (
                    <Icon size={30} className="text-foreground" />
                  ) : null;

                  return (
                    <motion.div
                      key={name}
                      variants={fadeScale}
                      className="group flex min-h-[92px] w-[84px] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card px-2 py-3 hover:border-foreground/40 sm:min-h-[104px] sm:w-[100px] sm:gap-2.5 sm:py-4"
                    >
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer" className="flex h-9 items-center justify-center sm:h-10">
                          {icon}
                        </a>
                      ) : (
                        <div className="flex h-9 items-center justify-center sm:h-10">{icon}</div>
                      )}
                      <span className="text-center text-[11px] text-foreground/90 group-hover:text-foreground/75 sm:text-[12px]">
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechStack;
