import { motion } from "framer-motion";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import type { SiteLanguage } from "./Layout";
import { useTheme } from "./Layout";
import { trustedPartners } from "../data/trusted";

const labels = {
  fr: { title: "Ils me font confiance" },
  en: { title: "Trusted by" },
};

const TrustedBy = ({ language }: { language: SiteLanguage }) => {
  const theme = useTheme();
  return (
  <motion.section
    id="trusted"
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
          {labels[language].title} <span className="text-foreground"></span>
        </h2>
        <span className="editorial-cross"></span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6"
      >
        {trustedPartners.map(({ name, logo, logoLight, url, invertOnDark }) => {
          const activeLogo = theme === "light" && logoLight ? logoLight : logo;
          const shouldInvert = invertOnDark && theme === "dark" && !logoLight;
          const inner = (
            <div className="group flex h-24 w-full flex-col items-center justify-center gap-2 rounded-sm border border-border bg-card px-3 py-4 hover:border-foreground/40 sm:h-28">
              {activeLogo ? (
                <img
                  src={activeLogo}
                  alt={name}
                  loading="lazy"
                  className={`max-h-10 max-w-[120px] object-contain grayscale transition duration-300 group-hover:grayscale-0${shouldInvert ? " invert group-hover:invert-0" : ""}`}
                />
              ) : (
                <div className="flex h-10 w-[120px] items-center justify-center border border-dashed border-border text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {name.slice(0, 2)}
                </div>
              )}
              <span className="text-center text-[11px] text-foreground/80 sm:text-[12px]">
                {name}
              </span>
            </div>
          );

          return (
            <motion.div key={name} variants={fadeScale}>
              {url ? (
                <a href={url} target="_blank" rel="noreferrer" aria-label={name}>
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </motion.section>
  );
};

export default TrustedBy;
