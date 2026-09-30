/**
 * Centralised environment access — the single place the app reads config.
 *
 * Next.js inlines only `NEXT_PUBLIC_*` variables into the browser bundle, so
 * anything the client needs uses that prefix. Secrets are server-only and are
 * read exclusively inside route handlers / server modules.
 */

function normalizeSupabaseUrl(raw: string): string {
  return raw
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/(rest|auth|storage|realtime)\/v1$/i, "")
    .replace(/\/+$/, "");
}

/** Public (browser-safe) configuration. */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anjanprasad.com",
  supabase: {
    url: normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""),
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  },
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  },
} as const;

/**
 * Server-only secrets. These are empty in the browser bundle by design — use
 * only in route handlers, server components and server modules.
 */
export const serverEnv = {
  supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  sanityApiToken: process.env.SANITY_API_TOKEN ?? "",
  /** Verified "from" address for outbound mail. */
  resendFrom: process.env.RESEND_FROM_EMAIL ?? "Anjan Prasad <onboarding@resend.dev>",
  /** Where internal notifications (applications, requests, contact) are sent. */
  notifyAdminEmail: process.env.NOTIFY_ADMIN_EMAIL ?? "performance@noboruworld.com",
} as const;

/** Feature flags derived from configuration — drive graceful degradation. */
export const flags = {
  supabase: Boolean(env.supabase.url && (env.supabase.anonKey || serverEnv.supabaseServiceRole)),
  sanity: Boolean(env.sanity.projectId),
  resend: Boolean(serverEnv.resendApiKey),
} as const;
