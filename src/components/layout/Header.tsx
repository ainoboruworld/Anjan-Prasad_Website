"use client";

import { useEffect, useState } from "react";
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
                <div className="dd" key={item.label}>
                  <span>
                    {item.label} <small style={{ fontSize: 10 }}>▾</small>
                  </span>
                  <div className="menu">
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
        <Link href="/consultation">Consultation</Link>
        <small>More</small>
        <Link href="/knowledge-hub">Knowledge Hub</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <div className="mcta">
          <Link href="/consultation#capply" className="cta">
            Book a consultation <span>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
