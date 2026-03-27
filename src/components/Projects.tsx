import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "../pages/Index";

type Project = {
  title: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
  techs: string[];
  url?: string;
  badgeFr?: string;
  badgeEn?: string;
};

const projects: Project[] = [
  {
    title: "Landing page Bonne nouvelle",
    descriptionFr: "Landing page pour une application de cantiques chretiens.",
    descriptionEn: "Landing page for a Christian hymn application.",
    image: "/projects/bonne-nouvelle.png",
    techs: ["React", "Vite", "Tailwind"],
    url: "https://bonne-nouvelle-landing.vercel.app",
  },
  {
    title: "Motte africaine",
    descriptionFr: "Site de vente de produits electroniques.",
    descriptionEn: "E-commerce website for electronic products.",
    image: "/projects/motte-africaine.png",
    techs: ["React", "Next.js", "Tailwind"],
    url: "https://motte.vercel.app/",
  },
  {
    title: "Mon ecole pro",
    descriptionFr: "Application mobile de suivi scolaire.",
    descriptionEn: "Mobile school tracking application.",
    image: "/placeholder.svg",
    techs: ["Flutter", "Dart"],
    badgeFr: "Play Store en cours",
    badgeEn: "Play Store coming soon",
  },
  {
    title: "M nour site",
    descriptionFr: "Site d'une entreprise specialisee dans le mobilier de bureau.",
    descriptionEn: "Website for a company specialized in office furniture.",
    image: "/projects/m-nour.png",
    techs: ["React", "Vite", "Tailwind"],
    url: "https://m-nour.vercel.app/",
  },
];

const labels = { fr: "Projets", en: "Projects" };

const Projects = ({ language }: { language: SiteLanguage }) => (
  <motion.section id="projects" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
    <div className="page-container">
      <div className="mb-12 flex items-center justify-between gap-4">
        <span className="editorial-cross">+</span>
        <h2 className="text-center text-4xl text-foreground md:text-5xl">
          {labels[language]} <span className="text-foreground">/</span>
        </h2>
        <span className="editorial-cross">+</span>
      </div>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const description = language === "fr" ? project.descriptionFr : project.descriptionEn;
          const badge = language === "fr" ? project.badgeFr : project.badgeEn;
          return (
            <motion.article key={project.title} variants={fadeScale} className="group overflow-hidden border border-border bg-card transition-colors duration-200 hover:border-foreground/40">
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-black">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" width={1200} height={600} />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/60">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="text-2xl text-foreground transition-colors duration-200 group-hover:text-foreground/75">{project.title}</h3>
                  </div>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" aria-label={project.title} className="mt-1 text-foreground/80 transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground/75">
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <span className="mt-1 text-foreground/35"><ArrowUpRight size={18} /></span>
                  )}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => <span key={tech} className="project-tag">{tech}</span>)}
                  {badge ? <span className="project-tag">{badge}</span> : null}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </motion.section>
);

export default Projects;
