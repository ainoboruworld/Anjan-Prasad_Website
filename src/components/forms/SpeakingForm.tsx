"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ENGAGEMENTS, speakingSchema, type SpeakingValues } from "@/lib/validation/schemas";
import { useSubmitLead } from "@/hooks/mutations/useSubmitLead";
import { SelectField, SubmitButton, TextField, TextareaField } from "./fields";
import { FormSuccess } from "./FormSuccess";

/** Speaking invitation → /api/leads (kind: "speaking"). */
export function SpeakingForm() {
  const { register, handleSubmit, formState, getValues } = useForm<SpeakingValues>({
    resolver: zodResolver(speakingSchema),
    defaultValues: { engagement: "Podcast" },
  });
  const mutation = useSubmitLead();
  const e = formState.errors;
  const done = mutation.isSuccess;

  return (
    <form
      className={`fm${done ? " done" : ""}`}
      noValidate
      onSubmit={handleSubmit((values) => mutation.mutate({ kind: "speaking", values }))}
    >
      <div className="row2">
        <TextField label="Your name" required autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" required type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <div className="row2">
        <TextField
          label="Organisation or show" required
          autoComplete="organization"
          registration={register("organisation")}
          error={e.organisation?.message}
        />
        <SelectField label="Type of engagement" options={ENGAGEMENTS} registration={register("engagement")} error={e.engagement?.message} />
      </div>
      <div className="row2">
        <TextField label="When, roughly" placeholder="e.g. Second week of December" registration={register("date")} error={e.date?.message} />
        <TextField label="Audience" placeholder="e.g. 200 MBA students" registration={register("audience")} error={e.audience?.message} />
      </div>
      <TextareaField
        label="Tell me about the session" required
        rows={4}
        registration={register("details")}
        error={e.details?.message}
      />

      <SubmitButton pending={mutation.isPending}>Send the invitation</SubmitButton>
      {mutation.isError && (
        <span className="fail" role="alert">
          {mutation.error.message}
        </span>
      )}
      {done && (
        <FormSuccess
          title="Thank you for the invitation."
          reply="I read every invitation myself and reply within five working days — with a yes, a question about the audience, or a polite no."
          days="Five working days"
          workingDays={5}
          prefill={{ name: getValues("name"), email: getValues("email") }}
        />
      )}
    </form>
  );
}
