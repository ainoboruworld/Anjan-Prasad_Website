"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";
import { playSuccessChime } from "@/lib/successChime";

/**
 * Premium post-submission panel shared by every lead form. Replaces the
 * fields once a request has gone through: a soft chime, an animated check,
 * a clear reply window, and a one-step newsletter opt-in prefilled with the
 * name and email the visitor just typed.
 */
export function FormSuccess({
  title = "Thank you. Your request is in.",
  reply = "I read every request myself and reply within 3–4 working days.",
  note = "A confirmation is on its way to your inbox. If there's a deadline on this decision, reply to it with the date and I'll move you up.",
  days = "3–4 working days",
  prefill,
}: {
  title?: string;
  reply?: string;
  note?: string;
  days?: string;
  prefill?: { name?: string; email?: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: prefill?.name ?? "", email: prefill?.email ?? "" },
  });
  const nl = useNewsletterSubscribe();
  const subscribed = nl.isSuccess;
  const emailError = formState.errors.email?.message;
  const submit = handleSubmit((v) => nl.mutate(v));

  useEffect(() => {
    playSuccessChime();
    ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="ok" role="status" aria-live="polite" tabIndex={-1} ref={ref}>
      <div className="ok-mark" aria-hidden>
        <svg viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27l7.5 7.5L37 19" />
        </svg>
      </div>
      <span className="ok-eyebrow">Request received</span>
      <h3 className="ok-title">{title}</h3>
      <p className="ok-reply">{reply}</p>

      <ol className="ok-steps">
        <li className="is-done">
          <span>Now</span>Your note has reached my inbox.
        </li>
        <li>
          <span>Next</span>I read it personally — no assistant, no template.
        </li>
        <li>
          <span>{days}</span>You hear back from me, either way.
        </li>
      </ol>

      <div className="ok-nl">
        <div className="ok-nl-copy">
          <b>While you wait, join the letter.</b>
          <p>One short note a week on the decisions founders actually face. No noise, unsubscribe anytime.</p>
        </div>
        {subscribed ? (
          <p className="ok-nl-done">
            <i aria-hidden>✓</i> You&rsquo;re on the list. The next letter is on its way.
          </p>
        ) : (
          /* Not a <form>: this panel lives inside the lead form, and forms can't nest. */
          <div className="ok-nl-form" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submit())}>
            <input type="text" placeholder="Name" aria-label="Name" autoComplete="given-name" {...register("name")} />
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email"
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
              {...register("email")}
            />
            <button type="button" onClick={submit} disabled={nl.isPending}>
              {nl.isPending ? "Subscribing…" : "Subscribe"} <span aria-hidden>→</span>
            </button>
            {(emailError || nl.isError) && (
              <span className="ok-nl-err" role="alert">
                {emailError ?? nl.error?.message}
              </span>
            )}
          </div>
        )}
      </div>

      <p className="ok-note">{note}</p>
    </div>
  );
}
