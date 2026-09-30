"use client";

import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/services/newsletter/newsletterService";
import type { NewsletterValues } from "@/lib/validation/schemas";

/** Mutation: subscribe to the weekly letter. */
export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: async (input: NewsletterValues) => {
      const { data, error } = await subscribeToNewsletter(input);
      if (error) throw new Error(error);
      return data;
    },
  });
}
