"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  consultationSchema,
  CONSULT_AREAS,
  IDENTITIES,
  type ConsultationValues,
} from "@/lib/validation/schemas";
import { useSubmitLead } from "@/hooks/mutations/useSubmitLead";
import { SelectField, SubmitButton, TextField, TextareaField } from "./fields";
import { FormSuccess } from "./FormSuccess";

/**
 * Consultation or mentorship request → /api/leads (kind prop decides).
 * `presetArea` is set by the diagnosis picker's CTA.
 */
export function ConsultationForm({
  presetArea,
  kind = "consultation",
}: {
  presetArea?: string;
  kind?: "consultation" | "mentorship";
}) {
  const { register, handleSubmit, formState, setValue, getValues } = useForm<ConsultationValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { identity: "Running a business", area: presetArea ?? "Not sure yet" },
  });
  const mutation = useSubmitLead();
  const e = formState.errors;
  const done = mutation.isSuccess;

  useEffect(() => {
    if (presetArea) setValue("area", presetArea, { shouldDirty: true });
  }, [presetArea, setValue]);

  return (
    <form
      className={`fm${done ? " done" : ""}`}
      noValidate
      onSubmit={handleSubmit((values) => mutation.mutate({ kind, values }))}
    >
      <div className="row2">
        <TextField label="Your name" required autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" required type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <div className="row2">
        <SelectField label="I am" options={IDENTITIES} registration={register("identity")} error={e.identity?.message} />
        <TextField label="Phone" required type="tel" autoComplete="tel" registration={register("phone")} error={e.phone?.message} />
      </div>
      <SelectField label="Area you need help with" id="area" options={CONSULT_AREAS} registration={register("area")} error={e.area?.message} />
      <TextareaField label="The decision you're facing" required rows={4} registration={register("decision")} error={e.decision?.message} />

      <SubmitButton pending={mutation.isPending}>Send request</SubmitButton>
      {mutation.isError && (
        <span className="fail" role="alert">
          {mutation.error.message}
        </span>
      )}
      {done && (
        <FormSuccess
          reply={kind === "mentorship" ? "I take on very few mentees and read every story myself. You'll hear from me either way." : "I read every request myself. You'll hear from me either way."}
          area={getValues("area")}
          prefill={{ name: getValues("name"), email: getValues("email") }}
        />
      )}
    </form>
  );
}
