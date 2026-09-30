import { NextResponse } from "next/server";
import { leadRequestSchema } from "@/lib/validation/schemas";
import { processLead } from "@/lib/leads";

export const runtime = "nodejs";

/** Advisory applications, consultation requests and contact messages. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  try {
    const result = await processLead(parsed.data);
    return NextResponse.json({ ok: true, data: { received: true, ...result } });
  } catch (err) {
    console.error("[leads] failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send just now. Please try again." }, { status: 500 });
  }
}
