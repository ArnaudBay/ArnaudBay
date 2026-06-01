import { createClient } from "@sanity/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const projectId =
  process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const client =
  projectId && token
    ? createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false })
    : null;

/**
 * Ajoute ou retire un like sur un article (toggle).
 * Body: { slug: string, action?: "like" | "unlike" }
 * Le compteur ne descend jamais en dessous de 0.
 */
export async function POST(request: Request) {
  try {
    if (!client) {
      return Response.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const { slug, action } = await request.json();
    if (!slug || typeof slug !== "string") {
      return Response.json({ error: "Missing slug" }, { status: 400 });
    }

    const doc = await client.fetch<{ _id: string; likeCount: number } | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]{ _id, "likeCount": coalesce(likeCount, 0) }`,
      { slug }
    );
    if (!doc?._id) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const delta = action === "unlike" ? -1 : 1;
    const next = Math.max(0, (doc.likeCount || 0) + delta);

    const updated = await client
      .patch(doc._id)
      .set({ likeCount: next })
      .commit({ returnDocuments: true });

    return Response.json({ likeCount: updated.likeCount ?? next });
  } catch (error) {
    console.error("likes API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
