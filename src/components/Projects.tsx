import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "./Layout";
import { sanityClient } from "../sanity/client";
import { urlFor } from "../sanity/client";
import { PROJECTS_QUERY, type ProjectDoc } from "../sanity/queries";

const labels = {
  fr: { title: "Projets", loading: "Chargement…", empty: "Aucun projet pour l'instant." },
  en: { title: "Projects", loading: "Loading…", empty: "No projects yet." },
};

const Projects = ({ language }: { language: SiteLanguage }) => {
  const [projects, setProjects] = useState<ProjectDoc[] | null>(null);

  useEffect(() => {
    if (!sanityClient) {
      setProjects([]);
      return;
    }
    let mounted = true;
    sanityClient
      .fetch<ProjectDoc[]>(PROJECTS_QUERY)
      .then((data) => mounted && setProjects(data || []))
      .catch(() => mounted && setProjects([]));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.section id="projects" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
      <div className="page-container">
        <div className="mb-12 flex items-center justify-between gap-4">
          <span className="editorial-cross">+</span>
          <h2 className="text-center text-4xl text-foreground md:text-5xl">
            {labels[language].title} <span className="text-foreground">/</span>
          </h2>
          <span className="editorial-cross">+</span>
        </div>

        {projects === null ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].loading}</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].empty}</p>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const description = language === "fr" ? project.descriptionFr : project.descriptionEn;
              const badge = language === "fr" ? project.badgeFr : project.badgeEn;
              const imageUrl = project.image
                ? urlFor(project.image).width(1200).height(750).fit("crop").url()
                : "/placeholder.svg";
              return (
                <motion.article key={project._id} variants={fadeScale} className="group overflow-hidden border border-border bg-card hover:border-foreground/40">
                  <div className="aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                    <img src={imageUrl} alt={project.title} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" loading="lazy" width={1200} height={600} />
                  </div>
                  <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-1.5 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/60 sm:mb-2">{String(index + 1).padStart(2, "0")}</p>
                        <h3 className="text-xl text-foreground sm:text-2xl">{project.title}</h3>
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
                      {(project.techs || []).map((tech) => <span key={tech} className="project-tag">{tech}</span>)}
                      {badge ? <span className="project-tag">{badge}</span> : null}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;
