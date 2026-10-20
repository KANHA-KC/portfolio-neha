import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/content/config";

// Called by a Wix Automation ("CMS item created / updated / deleted" → "Send HTTP request")
// so published edits appear on the site without a redeploy.
export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret") || new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG, "max");
  return Response.json({ ok: true, revalidated: CONTENT_TAG });
}
