"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation/schemas";
import { useNewsletterSubscribe } from "@/hooks/mutations/useNewsletterSubscribe";

const SEEN_KEY = "ap-nlp-seen";
const MIN_MS = 12_000;
const TRAP_STATE = { apTrap: true };

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

type Trigger = "scroll" | "exit" | "back" | "article";

/**
 * The leaving-visitor offer. Most people scroll and go; this catches that
 * moment once, with something worth stopping for: the seven questions Anjan
 * asks before a first call, sent by email (which starts the follow-up
 * journey). Triggers, all after 12 seconds on the page and never on entry:
 *   - back button: a history trap, so the first "back" shows the card
 *     instead of leaving (the second back leaves as normal)
 *   - desktop exit intent (cursor leaves through the top)
 *   - 60% scroll on the homepage, 92% at the end of an article
 * Shown at most once per visitor, never on the application pages.
 */
export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState<Trigger>("scroll");
  const openedRef = useRef(false);
  const trappedRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, formState } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "", source: "magnet" },
  });
  const mutation = useNewsletterSubscribe();

  const excluded =
    pathname.startsWith("/business-advisory") ||
    pathname.startsWith("/mentorship") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/resources") ||
    pathname.startsWith("/studio");
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

    const show = (t: Trigger) => {
      if (disposed || openedRef.current || Date.now() < ready || seen()) return;
      openedRef.current = true;
      setTrigger(t);
      setOpen(true);
      markSeen();
    };

    // Arm the back-button trap once the visitor has engaged a little.
    const arm = () => {
      if (trappedRef.current || seen()) return;
      trappedRef.current = true;
      try {
        history.pushState(TRAP_STATE, "", location.href);
      } catch {
        /* ignore */
      }
    };
    const onPop = () => {
      if (trappedRef.current && !openedRef.current && Date.now() >= ready) {
        show("back");
        trappedRef.current = false;
      }
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const p = window.scrollY / max;
      if (p > 0.25) arm();
      if (isHome && p > 0.6) show("scroll");
      if (isArticle && p > 0.92) show("article");
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.matchMedia("(pointer: fine)").matches) show("exit");
    };
    const armTimer = window.setTimeout(arm, MIN_MS);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    document.documentElement.addEventListener("mouseleave", onExit);
    return () => {
      disposed = true;
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
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
  const heading =
    trigger === "back"
      ? "Before you go, one page worth keeping."
      : trigger === "article"
        ? "If that was useful, this is the next step."
        : "Leaving with questions? Take these seven.";

  return (
    <div
      className={`nlp nlp-lg${open ? " show" : ""}`}
      ref={cardRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="nlp-title"
    >
      <button type="button" className="x" aria-label="Close" onClick={close}>
        ×
      </button>
      <div className="inner">
        <span className="lab">Free · one page · 5 min</span>
        <h3 id="nlp-title">{heading}</h3>
        {done ? (
          <p className="done-msg" role="status">
            <b>Sent.</b> The seven questions are on their way to your inbox. Answer them honestly, then reply to me with
            the one that stung.
          </p>
        ) : (
          <>
            <p>
              <b>The 7 questions I ask every founder before a first call.</b>{" "}Answer them in writing and half the
              decision settles itself. I&rsquo;ll email you the page, and a few short notes after it.
            </p>
            <ul className="nlp-pts">
              <li>How many days of cash you really have</li>
              <li>Which customers actually make your margin</li>
              <li>The decision you keep postponing</li>
            </ul>
            <form noValidate onSubmit={handleSubmit((v) => mutation.mutate({ ...v, source: "magnet" }))}>
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
                {mutation.isPending ? "Sending…" : "Send me the 7 questions"}
              </button>
            </form>
            {formState.errors.email && (
              <span className="later" role="alert" style={{ textDecoration: "none", cursor: "default" }}>
                {formState.errors.email.message}
              </span>
            )}
            {mutation.isError && (
              <span className="later" role="alert" style={{ textDecoration: "none", cursor: "default" }}>
                {mutation.error.message}
              </span>
            )}{" "}
            <button type="button" className="later" onClick={close}>
              No thanks, I&rsquo;ll manage
            </button>
          </>
        )}
      </div>
    </div>
  );
}
