"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApMark } from "../brand/ApMark";
import { NAV, type NavChild } from "@/lib/data/site";
import type { BrandsMenuData } from "@/lib/brands";

/** Children in order, bucketed by their optional group heading. */
function groupChildren(children: NavChild[]): [string | undefined, NavChild[]][] {
  const out: [string | undefined, NavChild[]][] = [];
  for (const c of children) {
    const last = out[out.length - 1];
    if (last && last[0] === c.group) last[1].push(c);
    else out.push([c.group, [c]]);
  }
  return out;
}

/**
 * Site navigation. Desktop: the prototype's absolute header with a hover
 * "Programs" dropdown. Mobile: a full-screen navy sheet.
 */
export function Header({ brands }: { brands?: BrandsMenuData }) {
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDdKey(null);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
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
            {NAV.map((item0) => {
              // Brands: the catalogue (Sanity over built-in) supplies the groups.
              const item =
                item0.label === "Brands" && brands?.categories.length
                  ? {
                      ...item0,
                      children: [
                        ...brands.categories.flatMap((c) => c.brands.map((b) => ({ group: c.name, label: b.name, href: `/brands/${b.slug}` }))),
                        { label: "All brands", href: "/brands" },
                      ],
                    }
                  : item0;
              return item.children ? (
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
                  <div
                    className={`menu${item.children.some((c) => c.group) ? " grouped" : ""}`}
                    id={`dd-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {groupChildren(item.children).map(([group, links]) => (
                      <div className="menu-g" key={group ?? "_"}>
                        {group && <small>{group}</small>}
                        {links.map((c) => (
                          <Link key={c.href} href={c.href} className={isCurrent(c.href) ? "cur" : undefined}>
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className={isCurrent(item.href) ? "cur" : undefined}>
                  {item.label}
                </Link>
              );
            })}
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
        {brands?.categories.length
          ? brands.categories.map((c, i) => (
              <details key={c.slug} className="mb" open={i === 0}>
                <summary>
                  <small>{c.name}</small>
                  <span aria-hidden>+</span>
                </summary>
                {c.brands.map((b) => (
                  <Link href={`/brands/${b.slug}`} key={b.slug} className="mb-item">
                    {b.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.logoUrl} alt="" loading="lazy" />
                    ) : (
                      <i>{b.name[0]}</i>
                    )}
                    {b.name}
                  </Link>
                ))}
              </details>
            ))
          : groupChildren(NAV.find((n) => n.label === "Brands")?.children ?? []).map(([group, links]) => (
              <div key={group ?? "_brands"}>
                <small>{group ?? "Brands"}</small>
                {links.map((c) => (
                  <Link href={c.href} key={c.href}>
                    {c.label}
                  </Link>
                ))}
              </div>
            ))}
        {brands?.categories.length ? <Link href="/brands">All brands</Link> : null}
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
