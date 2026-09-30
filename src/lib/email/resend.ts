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
  replyTo?: string;
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
      replyTo: args.replyTo,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
