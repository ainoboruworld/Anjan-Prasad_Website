import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation/schemas";
import { processNewsletter } from "@/lib/leads";

export const runtime = "nodejs";

/** Footer newsletter subscription. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  try {
    const result = await processNewsletter(parsed.data);
    return NextResponse.json({ ok: true, data: { subscribed: true, ...result } });
  } catch (err) {
    console.error("[newsletter] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not subscribe just now. Please try again." }, { status: 500 });
  }
}
