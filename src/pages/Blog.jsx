import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeScale, fadeUp, staggerContainer } from "../utils/animations";
import { useLanguage } from "../components/Layout";
import { sanityClient } from "../sanity/client";
import { BLOG_POSTS_QUERY } from "../sanity/queries";

const labels = {
  fr: {
    title: "Blog",
    subtitle: "Notes, retours d'expérience et articles techniques.",
    loading: "Chargement…",
    empty: "Aucun article pour l'instant.",
  },
  en: {
    title: "Blog",
    subtitle: "Notes, experience reports and technical articles.",
    loading: "Loading…",
    empty: "No articles yet.",
  },
};

const Blog = () => {
  const language = useLanguage();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (!sanityClient) {
      setPosts([]);
      return;
    }
    let mounted = true;
    sanityClient
      .fetch(BLOG_POSTS_QUERY)
      .then((data) => mounted && setPosts(data || []))
      .catch(() => mounted && setPosts([]));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="section-block pt-28 sm:pt-36"
    >
      <div className="page-container">
        <div className="mb-12 flex items-center justify-between gap-4">
          <span className="editorial-cross">+</span>
          <h2 className="text-center text-4xl text-foreground md:text-5xl">
            {labels[language].title} <span className="text-foreground">/</span>
          </h2>
          <span className="editorial-cross">+</span>
        </div>
        <p className="section-copy mx-auto mb-12 max-w-2xl text-center">
          {labels[language].subtitle}
        </p>

        {posts === null ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].loading}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].empty}</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {posts.map((post, index) => {
              const description = language === "fr" ? post.descriptionFr : post.descriptionEn;
              const title = language === "fr" ? post.titleFr : post.titleEn;
              const date = new Date(post.date).toLocaleDateString(
                language === "fr" ? "fr-FR" : "en-US",
                { day: "numeric", month: "long", year: "numeric" }
              );

              return (
                <motion.article
                  key={post.slug}
                  variants={fadeScale}
                  className="group overflow-hidden border border-border bg-card hover:border-foreground/40"
                >
                  <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-1.5 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/60 sm:mb-2">
                          {String(index + 1).padStart(2, "0")} — {date}
                        </p>
                        <h3 className="text-xl text-foreground sm:text-2xl">{title}</h3>
                      </div>
                      {post.url ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={title}
                          className="mt-1 text-foreground/80 transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground/75"
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      ) : (
                        <span className="mt-1 text-foreground/35">
                          <ArrowUpRight size={18} />
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">{description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(post.tags || []).map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
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

export default Blog;
