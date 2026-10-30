import { stop, verifyUnsubscribe } from "@/lib/journey";

export const runtime = "nodejs";

function page(title: string, body: string): Response {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#F4F1EB;font-family:Geist,Helvetica,Arial,sans-serif;color:#0B1A2E"><div style="max-width:520px;margin:0 auto;padding:64px 20px"><div style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;margin-bottom:18px">A<span style="color:#CDB27A;font-style:italic">p</span></div><h1 style="font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:28px;margin:0 0 12px">${title}</h1><p style="font-size:16px;line-height:1.7">${body}</p><p style="font-size:14px"><a href="/" style="color:#0B1A2E">Back to anjanprasad.com</a></p></div></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

/** One-click stop for the follow-up emails. The weekly letter is separate. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("e") ?? "").trim();
  const token = url.searchParams.get("t") ?? "";
  if (!email || !token || !verifyUnsubscribe(email, token)) {
    return page("That link didn't work.", "It may have been cut off by your email client. Reply to any of my emails with “stop” and I’ll do it by hand.");
  }
  await stop(email, "unsubscribed");
  return page("Done. No more follow-ups.", "You won’t hear from me again unless you write first. If you ever want to pick the conversation back up, the door is open.");
}

/** RFC 8058 one-click unsubscribe (mail clients POST to the same link). */
export async function POST(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("e") ?? "").trim();
  const token = url.searchParams.get("t") ?? "";
  if (email && token && verifyUnsubscribe(email, token)) await stop(email, "unsubscribed");
  return new Response(null, { status: 204 });
}
