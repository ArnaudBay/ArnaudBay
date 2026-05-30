import { useEffect } from "react";
import type { SiteLanguage } from "../components/Layout";

// TODO: remplacer par le domaine definitif une fois achete
export const SITE_URL = "https://arnaudbayale.com";

const PERSON_NAME = "Arnaud BAYALE";
const PROFILE_IMAGE = `${SITE_URL}/profile.png`;
const SAME_AS = [
  "https://github.com/ArnaudBay",
  "https://www.linkedin.com/in/arnaud-bayalé-57a35b2b9",
  "https://www.instagram.com/arnaud_bayale",
  "https://x.com/Arnaud_GYL",
];

export type PageKey = "home" | "about" | "skills" | "projects" | "contact" | "blog";

type LocalizedMeta = { title: string; description: string };

type PageMeta = {
  path: string;
  fr: LocalizedMeta;
  en: LocalizedMeta;
};

export const PAGES: Record<PageKey, PageMeta> = {
  home: {
    path: "/",
    fr: {
      title: "Arnaud BAYALE | Développeur web & mobile",
      description:
        "Portfolio d'Arnaud BAYALE, développeur fullstack web et mobile. Création de sites web et d'applications modernes avec React, Flutter et Node.js.",
    },
    en: {
      title: "Arnaud BAYALE | Web & Mobile Developer",
      description:
        "Portfolio of Arnaud BAYALE, fullstack web and mobile developer. Building modern websites and apps with React, Flutter and Node.js.",
    },
  },
  about: {
    path: "/about",
    fr: {
      title: "À propos | Arnaud BAYALE",
      description:
        "Découvrez le parcours d'Arnaud BAYALE, développeur fullstack web et mobile, et les clients qui lui font confiance.",
    },
    en: {
      title: "About | Arnaud BAYALE",
      description:
        "Learn about Arnaud BAYALE, fullstack web and mobile developer, and the clients who trust him.",
    },
  },
  skills: {
    path: "/skills",
    fr: {
      title: "Compétences | Arnaud BAYALE",
      description:
        "Les technologies maîtrisées par Arnaud BAYALE : React, Flutter, Node.js, TypeScript, Tailwind CSS, Firebase et plus encore.",
    },
    en: {
      title: "Skills | Arnaud BAYALE",
      description:
        "Technologies mastered by Arnaud BAYALE: React, Flutter, Node.js, TypeScript, Tailwind CSS, Firebase and more.",
    },
  },
  projects: {
    path: "/projects",
    fr: {
      title: "Projets | Arnaud BAYALE",
      description:
        "Sélection de projets web et mobiles réalisés par Arnaud BAYALE, développeur fullstack.",
    },
    en: {
      title: "Projects | Arnaud BAYALE",
      description:
        "Selected web and mobile projects built by Arnaud BAYALE, fullstack developer.",
    },
  },
  contact: {
    path: "/contact",
    fr: {
      title: "Contact | Arnaud BAYALE",
      description:
        "Contactez Arnaud BAYALE pour discuter de votre projet web ou mobile.",
    },
    en: {
      title: "Contact | Arnaud BAYALE",
      description: "Get in touch with Arnaud BAYALE to discuss your web or mobile project.",
    },
  },
  blog: {
    path: "/blog",
    fr: {
      title: "Blog | Arnaud BAYALE",
      description:
        "Notes, retours d'expérience et articles techniques d'Arnaud BAYALE sur le développement web et mobile.",
    },
    en: {
      title: "Blog | Arnaud BAYALE",
      description:
        "Notes, experience reports and technical articles by Arnaud BAYALE about web and mobile development.",
    },
  },
};

/** Crée ou met à jour une balise <meta> identifiée par un attribut/valeur. */
function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Crée ou met à jour le <link rel="canonical">. */
function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Injecte / remplace le bloc JSON-LD géré par le SEO (id stable). */
function upsertJsonLd(data: unknown) {
  const id = "seo-jsonld";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function buildJsonLd(page: PageKey, language: SiteLanguage, url: string) {
  const meta = PAGES[page][language];
  const locale = language === "fr" ? "fr-FR" : "en-US";

  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON_NAME,
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: language === "fr" ? "Développeur web & mobile" : "Web & Mobile Developer",
    sameAs: SAME_AS,
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${PERSON_NAME} | Portfolio`,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, webpage],
  };
}

/**
 * Met à jour les balises SEO du <head> pour la page et la langue courantes.
 * Sans dépendance externe : manipule directement le DOM du <head>.
 */
export function useSeo(page: PageKey, language: SiteLanguage) {
  useEffect(() => {
    const meta = PAGES[page][language];
    const url = `${SITE_URL}${PAGES[page].path}`;
    const locale = language === "fr" ? "fr_FR" : "en_US";

    document.title = meta.title;
    document.documentElement.lang = language;

    upsertMeta("name", "description", meta.description);
    upsertCanonical(url);

    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", locale);
    upsertMeta("property", "og:image", PROFILE_IMAGE);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", PROFILE_IMAGE);

    upsertJsonLd(buildJsonLd(page, language, url));
  }, [page, language]);
}
