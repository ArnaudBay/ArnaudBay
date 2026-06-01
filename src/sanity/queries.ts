export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(date desc) {
  "slug": slug.current,
  titleFr,
  titleEn,
  date,
  category,
  author,
  coverImage,
  descriptionFr,
  descriptionEn,
  tags,
  url,
  "viewCount": coalesce(viewCount, 0),
  "likeCount": coalesce(likeCount, 0),
  "charCountFr": length(pt::text(bodyFr)),
  "charCountEn": length(pt::text(bodyEn))
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  "slug": slug.current,
  titleFr,
  titleEn,
  date,
  category,
  author,
  coverImage,
  descriptionFr,
  descriptionEn,
  tags,
  url,
  "viewCount": coalesce(viewCount, 0),
  "likeCount": coalesce(likeCount, 0),
  bodyFr,
  bodyEn,
  "charCountFr": length(pt::text(bodyFr)),
  "charCountEn": length(pt::text(bodyEn))
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
  category?: string;
  author?: string;
  coverImage?: import("./client").SanityImageSource;
  descriptionFr?: string;
  descriptionEn?: string;
  tags?: string[];
  url?: string;
  viewCount?: number;
  likeCount?: number;
  charCountFr?: number;
  charCountEn?: number;
};

export type BlogPostFullDoc = BlogPostDoc & {
  bodyFr?: unknown[];
  bodyEn?: unknown[];
};

export type ProjectDoc = {
  _id: string;
  title: string;
  descriptionFr?: string;
  descriptionEn?: string;
  image?: import("./client").SanityImageSource;
  techs?: string[];
  url?: string;
  badgeFr?: string;
  badgeEn?: string;
};
