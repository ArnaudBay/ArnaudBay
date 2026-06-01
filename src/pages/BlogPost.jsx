import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { fadeUp } from "../utils/animations";
import { useLanguage } from "../components/Layout";
import { readingTime } from "../utils/readingTime";
import { sanityClient, urlFor } from "../sanity/client";
import { BLOG_POST_BY_SLUG_QUERY } from "../sanity/queries";

const labels = {
  fr: {
    back: "Retour aux articles",
    loading: "Chargement…",
    notFound: "Article introuvable.",
    by: "Par",
    empty: "Cet article n'a pas encore de contenu.",
  },
  en: {
    back: "Back to all posts",
    loading: "Loading…",
    notFound: "Post not found.",
    by: "By",
    empty: "This post has no content yet.",
  },
};

/** Composants de rendu PortableText alignés sur l'esthétique éditoriale du site. */
const portableComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[15px] leading-8 text-muted-foreground sm:text-base">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl text-foreground sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-xl text-foreground sm:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-foreground/30 pl-5 text-base italic text-foreground/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-[15px] leading-8 text-muted-foreground sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-[15px] leading-8 text-muted-foreground sm:text-base">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlFor(value)?.width(1400).fit("max").auto("format").url();
      if (!src) return null;
      return (
        <figure className="my-10">
          <img
            src={src}
            alt={value?.alt || ""}
            loading="lazy"
            className="w-full border border-border"
          />
          {value?.alt ? (
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.16em] text-foreground/40">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

const BlogPost = () => {
  const language = useLanguage();
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = chargement, null = introuvable

  useEffect(() => {
    if (!sanityClient) {
      setPost(null);
      return;
    }
    let mounted = true;
    setPost(undefined);
    sanityClient
      .fetch(BLOG_POST_BY_SLUG_QUERY, { slug })
      .then((data) => mounted && setPost(data || null))
      .catch(() => mounted && setPost(null));
    return () => {
      mounted = false;
    };
  }, [slug]);

  const t = labels[language];

  const title = post ? (language === "fr" ? post.titleFr : post.titleEn) : "";

  useEffect(() => {
    if (title) document.title = `${title} | Arnaud BAYALE`;
  }, [title]);

  const locale = language === "fr" ? "fr-FR" : "en-US";

  const backLink = (
    <Link
      to="/blog"
      className="group inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
    >
      <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
      {t.back}
    </Link>
  );

  return (
    <section className="section-block pt-28 sm:pt-36">
      <div className="page-container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">{backLink}</div>

          {post === undefined ? (
            <p className="text-sm text-muted-foreground">{t.loading}</p>
          ) : post === null ? (
            <p className="text-sm text-muted-foreground">{t.notFound}</p>
          ) : (
            <motion.article variants={fadeUp} initial="hidden" animate="visible">
              <header className="mb-10">
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em]">
                  {post.category ? <span className="project-tag">{post.category}</span> : null}
                  {post.date ? (
                    <span className="text-foreground/40">
                      {new Date(post.date).toLocaleDateString(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  ) : null}
                  {(() => {
                    const charCount = language === "fr" ? post.charCountFr : post.charCountEn;
                    const minutes = readingTime(charCount, language);
                    return minutes ? <span className="text-foreground/40">{minutes}</span> : null;
                  })()}
                </div>
                <h1 className="text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
                  {title}
                </h1>
              </header>

              {post.coverImage
                ? (() => {
                    const src = urlFor(post.coverImage)
                      ?.width(1600)
                      .fit("max")
                      .auto("format")
                      .url();
                    if (!src) return null;
                    return (
                      <img
                        src={src}
                        alt={post.coverImage?.alt || title}
                        className="mb-12 w-full border border-border"
                      />
                    );
                  })()
                : null}

              <div>
                {(() => {
                  const body = language === "fr" ? post.bodyFr : post.bodyEn;
                  return Array.isArray(body) && body.length ? (
                    <PortableText value={body} components={portableComponents} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.empty}</p>
                  );
                })()}
              </div>

              {post.author ? (
                <footer className="mt-16 border-t border-border pt-6 font-body text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                  {t.by} {post.author}
                </footer>
              ) : null}
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
