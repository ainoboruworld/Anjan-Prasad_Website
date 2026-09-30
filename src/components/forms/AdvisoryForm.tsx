"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { advisorySchema, HEARD_FROM, STAGES, type AdvisoryValues } from "@/lib/validation/schemas";
import { useSubmitLead } from "@/hooks/mutations/useSubmitLead";
import { SelectField, SubmitButton, TextField, TextareaField } from "./fields";

/** Business advisory application → /api/leads (kind: "advisory"). */
export function AdvisoryForm() {
  const { register, handleSubmit, formState } = useForm<AdvisoryValues>({
    resolver: zodResolver(advisorySchema),
    defaultValues: { stage: "Idea stage", heardFrom: "LinkedIn" },
  });
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
        <TextField label="Your name" autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <div className="row2">
        <TextField label="Phone" type="tel" autoComplete="tel" registration={register("phone")} error={e.phone?.message} />
        <TextField label="Company" autoComplete="organization" registration={register("company")} error={e.company?.message} />
      </div>
      <div className="row2">
        <TextField label="Website" placeholder="https://" inputMode="url" registration={register("website")} error={e.website?.message} />
        <SelectField label="Stage" options={STAGES} registration={register("stage")} error={e.stage?.message} />
      </div>
      <TextareaField
        label="What's the decision in front of you right now?"
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
      <div className="ok" role="status">
        <b>Thank you.</b> I&rsquo;ll read this myself and reply within five working days.
      </div>
    </form>
  );
}
