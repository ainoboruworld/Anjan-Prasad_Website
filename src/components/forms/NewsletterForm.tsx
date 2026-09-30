"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";

/** Footer newsletter signup: name + email → /api/newsletter. */
export function NewsletterForm() {
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "" },
  });
  const mutation = useNewsletterSubscribe();
  const done = mutation.isSuccess;
  const emailError = formState.errors.email?.message;

  return (
    <div>
      <form className="nlf" noValidate onSubmit={handleSubmit((v) => mutation.mutate(v))}>
        <input
          type="text"
          placeholder="Name"
          aria-label="Name"
          autoComplete="given-name"
          style={{ maxWidth: 130, borderRight: "1px solid rgba(169,189,209,.3)", marginRight: 14 }}
          disabled={done}
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email"
          autoComplete="email"
          aria-invalid={Boolean(emailError)}
          disabled={done}
          {...register("email")}
        />
        <button type="submit" disabled={mutation.isPending || done}>
          {done ? "Subscribed" : mutation.isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {emailError && (
        <span className="nlmsg" role="alert">
          {emailError}
        </span>
      )}
      {mutation.isError && (
        <span className="nlmsg" role="alert">
          {mutation.error.message}
        </span>
      )}
      {done && <span className="nlmsg">Thank you. The next letter is on its way.</span>}
    </div>
  );
}
