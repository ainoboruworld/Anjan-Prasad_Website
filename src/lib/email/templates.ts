/**
 * Plain, brand-toned HTML emails. Kept deliberately simple so they render in
 * every client. Navy #0B1A2E, off-white #F4F1EB, gold #CDB27A.
 */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function shell(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F4F1EB;font-family:Geist,Helvetica,Arial,sans-serif;color:#0B1A2E">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
  <div style="font-family:'Instrument Serif',Georgia,serif;font-size:30px;line-height:1.1;margin-bottom:6px">A<span style="color:#CDB27A;font-style:italic">p</span></div>
  <h1 style="font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:26px;line-height:1.2;margin:18px 0 12px">${esc(title)}</h1>
  ${body}
  <p style="font-size:12px;color:#4C6B8A;margin-top:36px;border-top:1px solid rgba(11,26,46,.12);padding-top:14px">Anjan Prasad · Business advisor · anjanprasad.com</p>
</div></body></html>`;
}

function rows(fields: Record<string, string | undefined>): string {
  return Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#4C6B8A;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;font-size:15px;line-height:1.6">${esc(v as string).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
}

export function adminNotification(kind: string, fields: Record<string, string | undefined>): string {
  return shell(`New ${kind}`, `<table style="border-collapse:collapse">${rows(fields)}</table>`);
}

export function autoReply(name: string, kind: "advisory" | "consultation" | "contact"): string {
  const first = name.split(" ")[0] || "there";
  const lines: Record<typeof kind, string> = {
    advisory: "Thank you for applying. I read every application myself and reply within five working days.",
    consultation:
      "Thank you for the request. I'll read what you've shared and come back with a time that works.",
    contact: "Thank you for writing. I'll reply soon.",
  };
  return shell(
    `Thank you, ${first}.`,
    `<p style="font-size:16px;line-height:1.7">${esc(lines[kind])}</p><p style="font-size:16px;line-height:1.7">Anjan</p>`
  );
}

export function newsletterWelcome(name?: string): string {
  const first = (name ?? "").split(" ")[0];
  return shell(
    first ? `Welcome, ${first}.` : "Welcome.",
    `<p style="font-size:16px;line-height:1.7">One operator's letter, every week. Playbooks, margins and field notes on building profitable businesses in India. No motivation, only method.</p><p style="font-size:16px;line-height:1.7">Anjan</p>`
  );
}
