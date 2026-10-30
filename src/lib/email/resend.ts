import "server-only";
import { Resend } from "resend";
import { serverEnv, flags } from "../env";

/** Resend client (server-only). `null` until RESEND_API_KEY is set. */
let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (!flags.resend) return null;
  if (cached) return cached;
  cached = new Resend(serverEnv.resendApiKey);
  return cached;
}

export interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  /** Plain-text alternative. Derived from the HTML when omitted. */
  text?: string;
  replyTo?: string;
  /** Extra headers, e.g. List-Unsubscribe on follow-up emails. */
  headers?: Record<string, string>;
}

/** Readable plain-text version of our simple HTML emails. */
export function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|li|tr|blockquote)>/gi, "\n")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `${label.trim()} (${href})`)
    .replace(/<[^>]+>/g, "")
    .replace(/&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&rarr;/g, "→")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
  skipped?: boolean;
}

/** Send one email. Never throws; returns a typed result. */
export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const resend = getResend();
  if (!resend) return { ok: false, skipped: true };
  try {
    const { data, error } = await resend.emails.send({
      from: serverEnv.resendFrom,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text ?? htmlToText(args.html),
      replyTo: args.replyTo ?? (serverEnv.replyTo || undefined),
      headers: args.headers,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
