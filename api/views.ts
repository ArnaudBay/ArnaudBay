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

/** Incrémente le compteur de vues d'un article et renvoie la nouvelle valeur. */
export async function POST(request: Request) {
  try {
    if (!client) {
      return Response.json(
        { error: "Sanity write client not configured" },
        { status: 500 }
      );
    }

    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return Response.json({ error: "Missing slug" }, { status: 400 });
    }

    const id = await client.fetch<string | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug }
    );
    if (!id) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    const updated = await client
      .patch(id)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit({ returnDocuments: true });

    return Response.json({ viewCount: updated.viewCount ?? 0 });
  } catch (error) {
    console.error("views API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
