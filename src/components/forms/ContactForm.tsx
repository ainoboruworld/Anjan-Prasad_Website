"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, CONTACT_REASONS, type ContactValues } from "@/lib/validation/schemas";
import { useSubmitLead } from "@/hooks/mutations/useSubmitLead";
import { SelectField, SubmitButton, TextField, TextareaField } from "./fields";

/** Contact message → /api/leads (kind: "contact"). */
export function ContactForm() {
  const { register, handleSubmit, formState } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { reason: "Speaking or events" },
  });
  const mutation = useSubmitLead();
  const e = formState.errors;
  const done = mutation.isSuccess;

  return (
    <form
      className={`fm${done ? " done" : ""}`}
      noValidate
      onSubmit={handleSubmit((values) => mutation.mutate({ kind: "contact", values }))}
    >
      <div className="row2">
        <TextField label="Your name" autoComplete="name" registration={register("name")} error={e.name?.message} />
        <TextField label="Email" type="email" autoComplete="email" registration={register("email")} error={e.email?.message} />
      </div>
      <SelectField label="Reason" options={CONTACT_REASONS} registration={register("reason")} error={e.reason?.message} />
      <TextareaField label="Message" rows={5} registration={register("message")} error={e.message?.message} />

      <SubmitButton pending={mutation.isPending}>Send message</SubmitButton>
      {mutation.isError && (
        <span className="fail" role="alert">
          {mutation.error.message}
        </span>
      )}
      <div className="ok" role="status">
        <b>Thank you.</b> I&rsquo;ll reply soon.
      </div>
    </form>
  );
}
