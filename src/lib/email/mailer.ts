import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { serverEnv, flags } from "../env";
import { htmlToText, sendEmail as sendViaResend, type SendArgs, type SendResult } from "./resend";

/**
 * One mail door for the whole app. Transport is picked from configuration:
 *   1. SMTP (Gmail app password or any SMTP server) when SMTP_USER/SMTP_PASS
 *      are set — free, no third-party account needed;
 *   2. otherwise Resend when RESEND_API_KEY is set;
 *   3. otherwise the send is skipped (callers log the lead instead).
 * Never throws.
 */

let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!flags.smtp) return null;
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: serverEnv.smtpHost,
    port: serverEnv.smtpPort,
    secure: serverEnv.smtpPort === 465,
    auth: { user: serverEnv.smtpUser, pass: serverEnv.smtpPass },
  });
  return cached;
}

export type { SendArgs, SendResult };

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const smtp = getTransport();
  if (!smtp) return sendViaResend(args);
  try {
    // Gmail rewrites the from address to the authenticated account; keep the
    // display name from RESEND_FROM_EMAIL when one is configured.
    const name = serverEnv.resendFrom.replace(/<[^>]*>/, "").trim() || "Anjan Prasad";
    const info = await smtp.sendMail({
      from: { name, address: serverEnv.smtpUser },
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text ?? htmlToText(args.html),
      replyTo: args.replyTo ?? (serverEnv.replyTo || undefined),
      headers: args.headers,
    });
    return { ok: true, id: info.messageId };
  } catch (err) {
    console.warn("[mailer] smtp send failed:", (err as Error).message);
    return { ok: false, error: (err as Error).message };
  }
}
