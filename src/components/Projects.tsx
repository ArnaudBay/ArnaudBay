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
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {projects.map((project, index) => {
              const description = language === "fr" ? project.descriptionFr : project.descriptionEn;
              const badge = language === "fr" ? project.badgeFr : project.badgeEn;
              const imageUrl = project.image
                ? urlFor(project.image)?.width(720).height(450).fit("crop").auto("format").quality(72).url() ?? "/placeholder.svg"
                : "/placeholder.svg";

              const techs = project.techs || [];

              const inner = (
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-foreground/[0.015] transition-colors duration-300 hover:border-foreground/25">
                  {/* Couverture */}
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      loading="lazy"
                      width={720}
                      height={450}
                      className="aspect-[16/9] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                    <span className="absolute left-3 top-3 rounded bg-background/80 px-2 py-0.5 text-[11px] font-medium tabular-nums text-foreground/70 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {badge ? (
                      <span className="absolute right-3 top-3 rounded bg-background/80 px-2 py-0.5 text-[11px] font-medium text-foreground/70 backdrop-blur">
                        {badge}
                      </span>
                    ) : null}
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="flex items-center gap-1.5 text-base text-foreground transition-colors group-hover:text-foreground/65">
                      <span className="min-w-0">{project.title}</span>
                      {project.url ? (
                        <ArrowUpRight
                          size={15}
                          className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      ) : null}
                    </h3>
                    {description ? (
                      <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground line-clamp-2">
                        {description}
                      </p>
                    ) : null}
                    {techs.length ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {techs.slice(0, 4).map((tech) => (
                          <span key={tech} className={tagClass}>{tech}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );

              return (
                <motion.li key={project._id} variants={fadeUp} className="h-full">
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" aria-label={project.title} className="block h-full">
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
