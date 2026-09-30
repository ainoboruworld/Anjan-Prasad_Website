/**
 * Leads service — advisory applications, consultation requests and contact
 * messages all go through one route handler that stores the lead (Supabase)
 * and notifies Anjan (Resend). The UI only ever calls this function.
 */
import type { LeadRequest } from "@/lib/validation/schemas";
import { postJson, type ServiceResponse } from "../types";

export async function submitLead(input: LeadRequest): Promise<ServiceResponse<{ received: true }>> {
  const sourcePage = typeof window !== "undefined" ? window.location.pathname : undefined;
  return postJson<{ received: true }>("/api/leads", { ...input, sourcePage });
}
