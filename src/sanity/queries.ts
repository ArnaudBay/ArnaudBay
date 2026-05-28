export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(date desc) {
  "slug": slug.current,
  titleFr,
  titleEn,
  date,
  descriptionFr,
  descriptionEn,
  tags,
  url
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(order, 999) asc, _createdAt asc) {
  _id,
  title,
  descriptionFr,
  descriptionEn,
  image,
  techs,
  url,
  badgeFr,
  badgeEn
}`;

export type BlogPostDoc = {
  slug: string;
  titleFr: string;
  titleEn: string;
  date: string;
  descriptionFr?: string;
  descriptionEn?: string;
  tags?: string[];
  url?: string;
};

export type ProjectDoc = {
  _id: string;
  title: string;
  descriptionFr?: string;
  descriptionEn?: string;
  image?: import("@sanity/image-url/lib/types/types").SanityImageSource;
  techs?: string[];
  url?: string;
  badgeFr?: string;
  badgeEn?: string;
};
