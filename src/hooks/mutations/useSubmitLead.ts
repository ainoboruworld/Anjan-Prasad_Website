"use client";

import { useMutation } from "@tanstack/react-query";
import { submitLead } from "@/services/leads/leadsService";
import type { LeadRequest } from "@/lib/validation/schemas";

/** Mutation: submit an advisory / consultation / contact lead. */
export function useSubmitLead() {
  return useMutation({
    mutationFn: async (input: LeadRequest) => {
      const { data, error } = await submitLead(input);
      if (error) throw new Error(error);
      return data;
    },
  });
}
