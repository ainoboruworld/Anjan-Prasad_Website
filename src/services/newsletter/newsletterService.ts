/** Newsletter service — subscribe an email via the server route. */
import type { NewsletterValues } from "@/lib/validation/schemas";
import { postJson, type ServiceResponse } from "../types";

export async function subscribeToNewsletter(
  input: NewsletterValues
): Promise<ServiceResponse<{ subscribed: true }>> {
  return postJson<{ subscribed: true }>("/api/newsletter", input);
}
