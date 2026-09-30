"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";

const SEEN_KEY = "ap-nlp-seen";
const MIN_MS = 15_000;

function seen(): boolean {
  try {
    return Boolean(localStorage.getItem(SEEN_KEY));
  } catch {
    return true;
  }
}
function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode: simply never persist */
  }
}

/**
 * Newsletter pop-up. Never on entry: it waits at least 15 seconds and then
 * triggers on 60% homepage scroll, the end of an article, or desktop exit
 * intent. Shown at most once per visitor, never on consultation or contact.
 */
export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "" },
  });
  const mutation = useNewsletterSubscribe();

  const excluded = pathname.startsWith("/consultation") || pathname.startsWith("/contact");
  const isHome = pathname === "/";
  const isArticle = /^\/knowledge-hub\/.+/.test(pathname);

  const close = useCallback(() => {
    setOpen(false);
    markSeen();
  }, []);

  useEffect(() => {
    if (excluded || seen() || openedRef.current) return;
    const ready = Date.now() + MIN_MS;
    let disposed = false;

    const show = () => {
      if (disposed || openedRef.current || Date.now() < ready || seen()) return;
      openedRef.current = true;
      setOpen(true);
      markSeen();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const p = window.scrollY / max;
      if (isHome && p > 0.6) show();
      if (isArticle && p > 0.92) show();
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onExit);
    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onExit);
    };
  }, [excluded, isHome, isArticle, pathname]);

  // Escape closes; focus moves into the card and stays there (small trap).
  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    const first = card?.querySelector<HTMLElement>("input,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && card) {
        const items = [...card.querySelectorAll<HTMLElement>("input,button,a")].filter((el) => !el.hidden);
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (excluded || !open) return null;
  const done = mutation.isSuccess;

  return (
    <div
      className={`nlp${open ? " show" : ""}`}
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="nlp-title"
    >
      <button type="button" className="x" aria-label="Close" onClick={close}>
        ×
      </button>
      <div className="inner">
        <span className="lab">Anjan&rsquo;s notes</span>
        <h3 id="nlp-title">One operator&rsquo;s letter. Every week.</h3>
        {done ? (
          <p className="done-msg" role="status">
            <b>Thank you.</b> The next letter is on its way.
          </p>
        ) : (
          <>
            <p>
              What I&rsquo;m seeing inside Indian businesses right now, and what I&rsquo;d do about it. No motivation,
              only method.
            </p>
            <form noValidate onSubmit={handleSubmit((v) => mutation.mutate(v))}>
              <input placeholder="First name" aria-label="First name" autoComplete="given-name" {...register("name")} />
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                autoComplete="email"
                aria-invalid={Boolean(formState.errors.email)}
                {...register("email")}
              />
              <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Sending…" : "Send me the letter"}
              </button>
            </form>
            {formState.errors.email && (
              <span className="later" role="alert" style={{ textDecoration: "none", cursor: "default" }}>
                {formState.errors.email.message}
              </span>
            )}{" "}
            <button type="button" className="later" onClick={close}>
              Maybe later
            </button>
          </>
        )}
      </div>
    </div>
  );
}
