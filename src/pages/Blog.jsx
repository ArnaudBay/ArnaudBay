import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, Heart } from "lucide-react";
import { fadeUp, staggerContainer } from "../utils/animations";
import { useLanguage } from "../components/Layout";
import { useSeo } from "../utils/seo";
import { readingTime } from "../utils/readingTime";
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

/** Regroupe les articles par année (déjà triés par date décroissante en amont). */
function groupByYear(posts) {
  const groups = new Map();
  for (const post of posts) {
    const year = post.date ? new Date(post.date).getFullYear() : "—";
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(post);
  }
  return [...groups.entries()];
}

const Blog = () => {
  const language = useLanguage();
  useSeo("blog", language);
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

  const locale = language === "fr" ? "fr-FR" : "en-US";

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
        <p className="section-copy mx-auto mb-16 max-w-2xl text-center">
          {labels[language].subtitle}
        </p>

        {posts === null ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].loading}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">{labels[language].empty}</p>
        ) : (
          <div className="mx-auto max-w-3xl space-y-16">
            {groupByYear(posts).map(([year, yearPosts]) => (
              <div key={year}>
                <h3 className="mb-6 font-body text-sm font-bold uppercase tracking-[0.24em] text-foreground/40">
                  {year}
                </h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="divide-y divide-border"
                >
                  {yearPosts.map((post) => {
                    const title = language === "fr" ? post.titleFr : post.titleEn;
                    const charCount =
                      language === "fr" ? post.charCountFr : post.charCountEn;
                    const minutes = readingTime(charCount, language);
                    const day = post.date
                      ? new Date(post.date).toLocaleDateString(locale, {
                          day: "numeric",
                          month: "short",
                        })
                      : "";
                    const isExternal = Boolean(post.url);

                    const meta = (
                      <>
                        <div className="mb-3 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em]">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            {post.category ? (
                              <span className="project-tag">{post.category}</span>
                            ) : null}
                            {minutes ? (
                              <span className="text-foreground/40">{minutes}</span>
                            ) : null}
                          </div>
                          <span className="shrink-0 whitespace-nowrap text-foreground/40">
                            {day}
                          </span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-xl text-foreground transition-colors group-hover:text-foreground/70 sm:text-2xl">
                            {title}
                          </span>
                          {isExternal ? (
                            <ArrowUpRight
                              size={16}
                              className="mt-1 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5"
                            />
                          ) : null}
                        </div>
                        <div className="mt-3 flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-foreground/40">
                          <span className="inline-flex items-center gap-1.5">
                            <Eye size={13} />
                            {post.viewCount || 0}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Heart size={13} />
                            {post.likeCount || 0}
                          </span>
                        </div>
                      </>
                    );

                    return (
                      <motion.li key={post.slug} variants={fadeUp}>
                        {isExternal ? (
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block py-6"
                          >
                            {meta}
                          </a>
                        ) : (
                          <Link to={`/blog/${post.slug}`} className="group block py-6">
                            {meta}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Blog;
