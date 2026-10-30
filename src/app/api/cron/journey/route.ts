import { NextResponse } from "next/server";
import { runDue } from "@/lib/journey";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Daily follow-up run (see vercel.json). Vercel calls it with
 * `Authorization: Bearer <CRON_SECRET>`; anything else is refused.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (!serverEnv.cronSecret || auth !== `Bearer ${serverEnv.cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await runDue();
  return NextResponse.json({ ok: true, data: result });
}
