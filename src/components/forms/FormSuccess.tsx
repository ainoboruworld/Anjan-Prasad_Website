"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";
import { playSuccessChime } from "@/lib/successChime";
import { addWorkingDays, downloadReminder, formatReplyDate } from "@/lib/replyDate";
import { ARTICLES, articleHref } from "@/lib/data/articles";
import { areaNote } from "@/lib/journey/sequences";

/**
 * Post-submission panel shared by every lead form. Quiet and short:
 * a personal headline, the reply-by date, two reads, one-field opt-in.
 */
export function FormSuccess({
  title,
  reply = "I read every request myself. You'll hear from me either way.",
  days = "3–4 working days",
  workingDays = 4,
  area,
  prefill,
}: {
  title?: string;
  reply?: string;
  /** Kept for callers; the date below says it more precisely. */
  note?: string;
  days?: string;
  workingDays?: number;
  area?: string;
  prefill?: { name?: string; email?: string };
}) {
  const first = (prefill?.name ?? "").trim().split(/\s+/)[0];
  const heading = title ?? (first ? `Thank you, ${first}.` : "Thank you.");
  const replyBy = addWorkingDays(new Date(), workingDays);
  const pickArea = area && area.toLowerCase() !== "not sure yet" ? area : null;
  const lead = areaNote(pickArea).caseSlug;
  const picks = [ARTICLES.find((a) => a.slug === lead), ...ARTICLES.filter((a) => a.slug !== lead)]
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a))
    .slice(0, 2);

  const ref = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: prefill?.name ?? "", email: prefill?.email ?? "", source: "form" },
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
      <div className="ok-head">
        <div className="ok-mark" aria-hidden>
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" />
            <path d="M15 27l7.5 7.5L37 19" />
          </svg>
        </div>
        <div>
          <h3 className="ok-title">{heading}</h3>
          <p className="ok-reply">{reply}</p>
        </div>
      </div>

      <div className="ok-date">
        <div>
          <span className="ok-k">Reply by</span>
          <b>{formatReplyDate(replyBy)}</b>
          <small>{days} · personally, no assistant</small>
        </div>
        <button
          type="button"
          className="ok-remind"
          onClick={() =>
            downloadReminder(replyBy, "Reply from Anjan Prasad due", "Check your inbox for Anjan's reply.")
          }
        >
          Add to calendar
        </button>
      </div>

      <div className="ok-picks">
        <span className="ok-k">{pickArea ? `While you wait · ${pickArea}` : "While you wait"}</span>
        <div className="ok-picks-row">
          {picks.map((a) => (
            <a key={a.slug} href={articleHref(a.slug)} className="ok-pick">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.cardImage ?? a.image} alt="" loading="lazy" />
              <span>
                <small>{a.readTime}</small>
                <b>{a.title}</b>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="ok-nl">
        <div className="ok-nl-copy">
          <b>The weekly letter</b>
          <span>One short note a week for founders. Unsubscribe anytime.</span>
        </div>
        {subscribed ? (
          <p className="ok-nl-done">
            <i aria-hidden>✓</i> You&rsquo;re in.
          </p>
        ) : (
          /* Not a <form>: this panel lives inside the lead form, and forms can't nest. */
          <div className="ok-nl-form" onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submit())}>
            <input type="hidden" {...register("name")} />
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email"
              autoComplete="email"
              aria-invalid={Boolean(emailError)}
              {...register("email")}
            />
            <button type="button" onClick={submit} disabled={nl.isPending}>
              {nl.isPending ? "…" : "Join"}
            </button>
            {(emailError || nl.isError) && (
              <span className="ok-nl-err" role="alert">
                {emailError ?? nl.error?.message}
              </span>
            )}
          </div>
        )}
      </div>

      <p className="ok-note">
        Confirmation sent{prefill?.email ? ` to ${prefill.email}` : ""}. Deadline on this? Reply to it with the date.
      </p>
    </div>
  );
}
