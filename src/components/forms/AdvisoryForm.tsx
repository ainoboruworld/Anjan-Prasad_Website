"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { advisorySchema, CONSULT_AREAS, HEARD_FROM, STAGES, type AdvisoryValues } from "@/lib/validation/schemas";
import { useSubmitLead } from "@/hooks/mutations/useSubmitLead";
import { SelectField, SubmitButton, TextField, TextareaField } from "./fields";
import { FormSuccess } from "./FormSuccess";

/**
 * Advisory application → /api/leads (kind: "advisory"). `presetArea` is set
 * by the diagnosis picker's CTA ("Book a consultation on finance").
 */
export function AdvisoryForm({ presetArea }: { presetArea?: string }) {
  const { register, handleSubmit, formState, setValue, getValues } = useForm<AdvisoryValues>({
    resolver: zodResolver(advisorySchema),
    defaultValues: { stage: "Idea stage", heardFrom: "LinkedIn", area: presetArea ?? "Not sure yet" },
  });
  useEffect(() => {
    if (presetArea) setValue("area", presetArea, { shouldDirty: true });
  }, [presetArea, setValue]);
  const mutation = useSubmitLead();
  const e = formState.errors;
  const done = mutation.isSuccess;

  return (
    <form
      className={`fm${done ? " done" : ""}`}
      noValidate
      onSubmit={handleSubmit((values) => mutation.mutate({ kind: "advisory", values }))}
    >
      <div className="row2">
        <TextField label="Your name" required autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" required type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <div className="row2">
        <TextField label="Phone" required type="tel" autoComplete="tel" registration={register("phone")} error={e.phone?.message} />
        <TextField label="Company" autoComplete="organization" registration={register("company")} error={e.company?.message} />
      </div>
      <div className="row2">
        <TextField label="Website" placeholder="https://" inputMode="url" registration={register("website")} error={e.website?.message} />
        <SelectField label="Stage" options={STAGES} registration={register("stage")} error={e.stage?.message} />
      </div>
      <SelectField label="Area you need help with" id="area" options={CONSULT_AREAS} registration={register("area")} error={e.area?.message} />
      <TextareaField
        label="What's the decision in front of you right now?" required
        rows={4}
        registration={register("decision")}
        error={e.decision?.message}
      />
      <TextareaField label="What have you already tried?" rows={3} registration={register("tried")} error={e.tried?.message} />
      <SelectField label="How did you hear about me?" options={HEARD_FROM} registration={register("heardFrom")} error={e.heardFrom?.message} />

      <SubmitButton pending={mutation.isPending}>Send application</SubmitButton>
      {mutation.isError && (
        <span className="fail" role="alert">
          {mutation.error.message}
        </span>
      )}
      {done && (
        <FormSuccess
          reply="I read every application myself. A first session proposed, or a straight no with the reason."
          days="Five working days"
          workingDays={5}
          area={getValues("area") || undefined}
          prefill={{ name: getValues("name"), email: getValues("email") }}
        />
      )}
    </form>
  );
}
