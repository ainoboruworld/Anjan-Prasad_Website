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

/**
 * Consultation request → /api/leads (kind: "consultation"). `presetArea` is
 * set by the diagnosis picker's CTA ("Book a consultation on finance").
 */
export function ConsultationForm({ presetArea }: { presetArea?: string }) {
  const { register, handleSubmit, formState, setValue } = useForm<ConsultationValues>({
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
      onSubmit={handleSubmit((values) => mutation.mutate({ kind: "consultation", values }))}
    >
      <div className="row2">
        <TextField label="Your name" autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <div className="row2">
        <SelectField label="I am" options={IDENTITIES} registration={register("identity")} error={e.identity?.message} />
        <TextField label="Phone" type="tel" autoComplete="tel" registration={register("phone")} error={e.phone?.message} />
      </div>
      <SelectField label="Area you need help with" id="area" options={CONSULT_AREAS} registration={register("area")} error={e.area?.message} />
      <TextareaField label="The decision you're facing" rows={4} registration={register("decision")} error={e.decision?.message} />

      <SubmitButton pending={mutation.isPending}>Send request</SubmitButton>
      {mutation.isError && (
        <span className="fail" role="alert">
          {mutation.error.message}
        </span>
      )}
      <div className="ok" role="status">
        <b>Thank you.</b> I&rsquo;ll be in touch soon.
      </div>
    </form>
  );
}
