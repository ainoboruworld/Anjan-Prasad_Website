/**
 * Shared contracts for the service layer. Every service function returns a
 * `ServiceResponse<T>` so UI and mutation hooks handle success/error
 * uniformly. Business logic and API calls live here — never in components.
 */
export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

export function ok<T>(data: T): ServiceResponse<T> {
  return { data, error: null };
}

export function fail<T = never>(error: string): ServiceResponse<T> {
  return { data: null, error };
}

/** POST JSON to one of our route handlers; never throws. */
export async function postJson<T>(url: string, body: unknown): Promise<ServiceResponse<T>> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; data?: T } | null;
    if (!res.ok || !json?.ok) return fail(json?.error ?? "Something went wrong. Please try again.");
    return ok((json.data ?? null) as T);
  } catch {
    return fail("Network error. Please check your connection and try again.");
  }
}
