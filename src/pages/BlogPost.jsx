import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
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
    views: "vues",
    like: "J'aime",
    likePrompt: "Cet article vous a plu ?",
  },
  en: {
    back: "Back to all posts",
    loading: "Loading…",
    notFound: "Post not found.",
    by: "By",
    empty: "This post has no content yet.",
    views: "views",
    like: "Like",
    likePrompt: "Enjoyed this post?",
  },
};

const linkClass =
  "text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground";

// Sépare les URL collées en texte brut (Sanity ne les rend pas cliquables
// sans annotation) tout en laissant passer les vrais liens annotés.
// Gère les URL complètes (http(s)://…) et les URL préfixées par « www. ».
const URL_RE = /((?:https?:\/\/|www\.)[^\s]+)/gi;
const linkify = (children) =>
  (Array.isArray(children) ? children : [children]).flatMap((child, i) => {
    if (typeof child !== "string") return [child];
    return child.split(URL_RE).map((part, j) => {
      if (!/^(?:https?:\/\/|www\.)/i.test(part)) return part;
      // Conserve la ponctuation finale hors du lien (« …url. » → lien + « . »).
      const m = part.match(/^(.*?)([.,;:!?)\]]*)$/);
      const label = m ? m[1] : part;
      const trail = m ? m[2] : "";
      // « www. » sans protocole → on préfixe https:// pour un href valide.
      const href = /^www\./i.test(label) ? `https://${label}` : label;
      return (
        <span key={`${i}-${j}`}>
          <a href={href} target="_blank" rel="noreferrer" className={linkClass}>
            {label}
          </a>
          {trail}
        </span>
      );
    });
  });

/** Composants de rendu PortableText alignés sur l'esthétique éditoriale du site. */
const portableComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-justify text-[15px] leading-8 text-muted-foreground sm:text-base">{linkify(children)}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl text-foreground sm:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-xl text-foreground sm:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-foreground/30 pl-5 text-base text-foreground/80">
        {linkify(children)}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-justify text-[15px] leading-8 text-muted-foreground sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-justify text-[15px] leading-8 text-muted-foreground sm:text-base">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => <li>{linkify(children)}</li>,
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="not-italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          className={linkClass}
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
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likePending, setLikePending] = useState(false);

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

  // Initialise les compteurs et l'état "aimé" à partir des données chargées.
  useEffect(() => {
    if (!post) return;
    setViews(post.viewCount || 0);
    setLikes(post.likeCount || 0);
    if (typeof window !== "undefined") {
      setLiked(localStorage.getItem(`liked:${post.slug}`) === "1");
    }
  }, [post]);

  // Incrémente les vues une seule fois par session et par article.
  useEffect(() => {
    if (!post || !slug || typeof window === "undefined") return;
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.viewCount === "number") {
          setViews(d.viewCount);
          sessionStorage.setItem(key, "1");
        }
      })
      .catch(() => {});
  }, [post, slug]);

  const handleLike = () => {
    if (likePending || !slug) return;
    const next = !liked;
    setLikePending(true);
    setLiked(next);
    setLikes((v) => Math.max(0, v + (next ? 1 : -1)));
    fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: next ? "like" : "unlike" }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.likeCount === "number") setLikes(d.likeCount);
        if (typeof window !== "undefined") {
          if (next) localStorage.setItem(`liked:${slug}`, "1");
          else localStorage.removeItem(`liked:${slug}`);
        }
      })
      .catch(() => {
        // Annule l'optimisme en cas d'échec réseau.
        setLiked(!next);
        setLikes((v) => Math.max(0, v + (next ? -1 : 1)));
      })
      .finally(() => setLikePending(false));
  };

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
                <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                  {post.category ? <span className="project-tag">{post.category}</span> : null}
                  {(() => {
                    const charCount = language === "fr" ? post.charCountFr : post.charCountEn;
                    const meta = [
                      post.date
                        ? new Date(post.date).toLocaleDateString(locale, {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : null,
                      readingTime(charCount, language) || null,
                      `${views} ${t.views}`,
                    ]
                      .filter(Boolean)
                      .join("  ·  ");
                    return <span className="leading-relaxed">{meta}</span>;
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
                        className="mb-12 h-auto w-full rounded-md border border-border object-contain"
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

              <div className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-10 text-center">
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                  {t.likePrompt}
                </p>
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={likePending}
                  aria-pressed={liked}
                  className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm uppercase tracking-[0.16em] transition-all disabled:opacity-60 ${
                    liked
                      ? "border-foreground text-foreground"
                      : "border-border text-foreground/60 hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  <Heart
                    size={18}
                    className={`shrink-0 transition-transform ${liked ? "scale-110" : ""}`}
                    style={
                      liked
                        ? { color: "#ef4444", fill: "#ef4444" }
                        : { fill: "none" }
                    }
                  />
                  <span>{t.like}</span>
                </button>
              </div>

              {post.author ? (
                <footer className="mt-10 text-center font-body text-[11px] uppercase tracking-[0.2em] text-foreground/50">
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
