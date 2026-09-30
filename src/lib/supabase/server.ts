import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, serverEnv } from "../env";

/**
 * Server-side Supabase client for route handlers only. Uses the service-role
 * key (bypasses RLS) so inserts work regardless of policies; the anon key is
 * the fallback and respects the "anon can insert" policies in
 * supabase/migrations. Returns `null` until Supabase is configured so the
 * site degrades gracefully (leads are still emailed / logged).
 */
let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient | null {
  const key = serverEnv.supabaseServiceRole || env.supabase.anonKey;
  if (!env.supabase.url || !key) return null;
  if (cached) return cached;
  cached = createClient(env.supabase.url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
