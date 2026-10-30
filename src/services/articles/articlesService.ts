/** Article service — email a Knowledge Hub article to a reader. */
import { postJson, type ServiceResponse } from "../types";

export interface SendArticleInput {
  slug: string;
  email: string;
  name?: string;
}

export async function sendArticleByEmail(input: SendArticleInput): Promise<ServiceResponse<{ sent: true }>> {
  return postJson<{ sent: true }>("/api/articles/send", input);
}
