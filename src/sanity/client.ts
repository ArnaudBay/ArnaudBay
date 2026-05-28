import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Sanity] VITE_SANITY_PROJECT_ID is missing. Set it in your environment (.env or Vercel env vars)."
  );
}

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export const urlFor = (source: SanityImageSource) => builder?.image(source);
