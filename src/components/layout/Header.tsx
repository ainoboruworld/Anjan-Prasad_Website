"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApMark } from "../brand/ApMark";
import { NAV } from "@/lib/data/site";

/**
 * Site navigation. Desktop: the prototype's absolute header with a hover
 * "Programs" dropdown. Mobile: a full-screen navy sheet.
 */
export function Header() {
  const pathname = usePathname();
  // Keyed open-state: any navigation renders the sheet closed without an effect.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  // Programs dropdown: hover on desktop, click as well; closes on outside click.
  // Keyed like the sheet: navigating closes the dropdown without an effect.
  // Keyed by "<pathname>|<menu label>" so each dropdown opens on its own.
  const [ddKey, setDdKey] = useState<string | null>(null);
  const isDdOpen = (label: string) => ddKey === `${pathname}|${label}`;
  const setDdOpen = (label: string, next: boolean) => setDdKey(next ? `${pathname}|${label}` : null);
  const ddRef = useRef<HTMLDivElement>(null);
  const anyDdOpen = ddKey !== null && ddKey.startsWith(`${pathname}|`);
  useEffect(() => {
    if (!anyDdOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdKey(null);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [anyDdOpen]);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <nav aria-label="Primary">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="Ap, home">
            <span className="lg-l">
              <ApMark title="Anjan Prasad" />
            </span>
          </Link>

          <div className="l">
            {NAV.map((item) =>
              item.children ? (
                <div className={`dd${isDdOpen(item.label) ? " open" : ""}`} key={item.label} ref={isDdOpen(item.label) ? ddRef : undefined}>
                  <button
                    type="button"
                    className="ddbtn"
                    aria-haspopup="true"
                    aria-controls={`dd-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    aria-expanded={isDdOpen(item.label)}
                    onClick={() => setDdOpen(item.label, !isDdOpen(item.label))}
                  >
                    {item.label}
                    <svg viewBox="0 0 10 6" aria-hidden>
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                  <div className="menu" id={`dd-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className={isCurrent(c.href) ? "cur" : undefined}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={isCurrent(item.href) ? "cur" : undefined}>
                  {item.label}
                </Link>
              )
            )}
          </div>

          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </nav>

      <div id="mobile-nav" className={`mnav${open ? " open" : ""}`} aria-hidden={!open}>
        <button type="button" className="mclose" aria-label="Close menu" onClick={() => setOpen(false)}>
          ×
        </button>
        <small>Programs</small>
        <Link href="/business-advisory">Business Advisory</Link>
        <Link href="/mentorship">Mentorship</Link>
        <small>Brands</small>
        {NAV.find((n) => n.label === "Brands")?.children?.map((c) => (
          <Link href={c.href} key={c.href}>
            {c.label}
          </Link>
        ))}
        <small>More</small>
        <Link href="/knowledge-hub">Knowledge Hub</Link>
        <Link href="/speaking">Speaker</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <div className="mcta">
          <Link href="/business-advisory#capply" className="cta">
            Book a consultation <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
