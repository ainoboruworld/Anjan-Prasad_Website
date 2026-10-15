import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

/**
 * Instant publish: Sanity calls this webhook on every publish/update/delete
 * so the site refreshes immediately instead of waiting out the 5-minute
 * cache. Configure in sanity.io/manage → API → Webhooks:
 *   URL:    https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *   Dataset: production · Trigger on: create, update, delete
 * and set the same SANITY_REVALIDATE_SECRET in Vercel. GET works too, so
 * you can also open the URL in a browser to force a refresh by hand.
 */
function handle(req: Request) {
  const url = new URL(req.url);
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (secret && url.searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  // Content can surface anywhere (sections, articles, logos, SEO), so
  // refresh the whole site; pages re-render on their next request.
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: true, now: new Date().toISOString() });
}

export async function POST(req: Request) {
  return handle(req);
}

export async function GET(req: Request) {
  return handle(req);
}
