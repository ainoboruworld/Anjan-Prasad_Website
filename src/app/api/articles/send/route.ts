import { NextResponse } from "next/server";
import { z } from "zod";
import { newsletterSchema } from "@/lib/validation/schemas";
import { getArticle } from "@/lib/sanity";
import { sendArticle } from "@/lib/leads";

export const runtime = "nodejs";

const schema = newsletterSchema.extend({ slug: z.string().trim().min(1).max(200) });

/** "Email me this article": sends the piece and subscribes the reader. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const article = await getArticle(parsed.data.slug);
  if (!article) return NextResponse.json({ ok: false, error: "Article not found." }, { status: 404 });

  try {
    await sendArticle(parsed.data, article);
    return NextResponse.json({ ok: true, data: { sent: true } });
  } catch (err) {
    console.error("[articles/send] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send just now. Please try again." }, { status: 500 });
  }
}
