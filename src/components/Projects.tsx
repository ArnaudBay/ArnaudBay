import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "../utils/animations";
import KenteDivider from "./KenteDivider";
import type { SiteLanguage } from "./Layout";
import { urlFor } from "../sanity/client";
import { useSanityQuery } from "../sanity/useSanityQuery";
import { PROJECTS_QUERY, type ProjectDoc } from "../sanity/queries";

const labels = {
  fr: { title: "Projets", loading: "Chargement…", empty: "Aucun projet pour l'instant." },
  en: { title: "Projects", loading: "Loading…", empty: "No projects yet." },
};

// Pastille discrète, dans l'esprit de titusgahissy (fond léger, casse normale).
const tagClass =
  "rounded bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-medium text-foreground/65";

const Projects = ({ language }: { language: SiteLanguage }) => {
  const projects = useSanityQuery<ProjectDoc[]>(PROJECTS_QUERY, {}, []);

  return (
    <motion.section id="projects" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-block">
      <div className="page-container">
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between gap-4">
            <span className="editorial-cross"></span>
            <h2 className="text-center text-4xl text-foreground md:text-5xl">
              {labels[language].title} <span className="text-foreground"></span>
            </h2>
            <span className="editorial-cross"></span>
          </div>
          <KenteDivider className="h-3 w-[150px] rounded-full opacity-90" />
        </div>

        {projects === undefined ? null : projects.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].empty}</p>
        ) : (
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col divide-y divide-border border-y border-border"
          >
            {projects.map((project, index) => {
              const description = language === "fr" ? project.descriptionFr : project.descriptionEn;
              const badge = language === "fr" ? project.badgeFr : project.badgeEn;
              const imageUrl = project.image
                ? urlFor(project.image)?.width(320).height(208).fit("crop").auto("format").quality(70).url() ?? "/placeholder.svg"
                : "/placeholder.svg";

              const techs = project.techs || [];

              const inner = (
                <div className="group flex items-start gap-4 py-6 sm:gap-6 sm:py-7">
                  <span className="pt-1.5 text-xs font-medium tabular-nums text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={imageUrl}
                    alt={project.title}
                    loading="lazy"
                    width={480}
                    height={320}
                    className="hidden h-[68px] w-[104px] shrink-0 rounded-md border border-border object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:block"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="flex items-center gap-1.5 text-xl text-foreground transition-colors group-hover:text-foreground/65 sm:text-2xl">
                        <span className="min-w-0">{project.title}</span>
                        {project.url ? (
                          <ArrowUpRight
                            size={18}
                            className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        ) : null}
                      </h3>
                      <div className="hidden shrink-0 flex-wrap items-center justify-end gap-1.5 sm:flex sm:max-w-[46%]">
                        {techs.slice(0, 4).map((tech) => (
                          <span key={tech} className={tagClass}>{tech}</span>
                        ))}
                        {badge ? <span className={tagClass}>{badge}</span> : null}
                      </div>
                    </div>
                    {description ? (
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground line-clamp-2">
                        {description}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-1.5 sm:hidden">
                      {techs.slice(0, 3).map((tech) => (
                        <span key={tech} className={tagClass}>{tech}</span>
                      ))}
                      {badge ? <span className={tagClass}>{badge}</span> : null}
                    </div>
                  </div>
                </div>
              );

              return (
                <motion.li key={project._id} variants={fadeUp}>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" aria-label={project.title}>
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.li>
              );
            })}
          </motion.ol>
        )}
      </div>
    </motion.section>
  );
};

export default Projects;
