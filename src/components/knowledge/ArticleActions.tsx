"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { sendArticleByEmail } from "@/services/articles/articlesService";

/**
 * "Keep this one": save the article as a clean, branded PDF (print
 * stylesheet, no download dependency) or have it emailed, which also adds
 * the reader to the weekly letter.
 */
export function ArticleActions({ slug, title }: { slug: string; title: string }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "" },
  });
  const send = useMutation({
    mutationFn: async (v: NewsletterValues) => {
      const { data, error } = await sendArticleByEmail({ slug, ...v });
      if (error) throw new Error(error);
      return data;
    },
  });
  const emailError = formState.errors.email?.message;

  const print = () => {
    document.title = `${title} — Anjan Prasad`;
    window.print();
  };

  return (
    <div className="akeep">
      <div className="akeep-row">
        <span className="lab">Keep this one</span>
        <button type="button" className="akeep-btn" onClick={print}>
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download as PDF
        </button>
        <button
          type="button"
          className={`akeep-btn${emailOpen ? " is-on" : ""}`}
          aria-expanded={emailOpen}
          onClick={() => setEmailOpen((o) => !o)}
        >
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M3 5h14v10H3zM3 5l7 6 7-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          Email me this article
        </button>
      </div>
      {emailOpen && (
        <div className="akeep-panel">
          {send.isSuccess ? (
            <p className="akeep-done">
              <i aria-hidden>✓</i> Sent. Check your inbox — and you&rsquo;re on the weekly letter too.
            </p>
          ) : (
            <form className="akeep-form" noValidate onSubmit={handleSubmit((v) => send.mutate(v))}>
              <p>I&rsquo;ll email you this article to read or forward at your own pace, and add you to the weekly letter. Unsubscribe anytime.</p>
              <div className="akeep-fields">
                <input type="text" placeholder="Name" aria-label="Name" autoComplete="given-name" {...register("name")} />
                <input type="email" placeholder="Email address" aria-label="Email" autoComplete="email" aria-invalid={Boolean(emailError)} {...register("email")} />
                <button type="submit" disabled={send.isPending}>
                  {send.isPending ? "Sending…" : "Send it"} <span aria-hidden>→</span>
                </button>
              </div>
              {(emailError || send.isError) && (
                <span className="akeep-err" role="alert">
                  {emailError ?? send.error?.message}
                </span>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
