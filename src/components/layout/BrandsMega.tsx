"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { BrandsMenuData } from "@/lib/brands";
import { sized } from "@/lib/sanity-image";

/**
 * The Brands mega menu: categories on the left, the chosen category's brands
 * in the middle, and a preview of the hovered brand on the right. Content
 * comes from the Brands catalogue (Sanity over the built-in brands), so a
 * brand published in the Studio appears here with no code change.
 */
export function BrandsMega({ data, open, onNavigate }: { data: BrandsMenuData; open: boolean; onNavigate: () => void }) {
  const cats = data.categories;
  const [cat, setCat] = useState(0);
  const [hot, setHot] = useState(0);
  const panelId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  // Reset to the first category and brand each time the menu opens.
  useEffect(() => {
    if (open) {
      setCat(0);
      setHot(0);
    }
  }, [open]);

  const current = cats[cat];

  if (!cats.length) return null;

  return (
    <div className={`mega${open ? " open" : ""}`} id={panelId} role="region" aria-label="Brands">
      <div className="mega-in">
        <div className="mega-cats" role="tablist" aria-orientation="vertical" aria-label="Brand categories">
          <span className="lab">Brands</span>
          {cats.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={i === cat}
              className={i === cat ? "on" : undefined}
              onMouseEnter={() => {
                setCat(i);
                setHot(0);
              }}
              onFocus={() => {
                setCat(i);
                setHot(0);
              }}
              onClick={() => {
                setCat(i);
                setHot(0);
                listRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
              }}
            >
              {c.name}
              <small>{c.brands.length}</small>
            </button>
          ))}
          <Link href="/brands" className="mega-all" onClick={onNavigate}>
            All brands →
          </Link>
        </div>

        <div className="mega-list" ref={listRef} role="tabpanel" key={current?.slug}>
          {current?.brands.map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className={i === hot ? "on" : undefined}
              onMouseEnter={() => setHot(i)}
              onFocus={() => setHot(i)}
              onClick={onNavigate}
            >
              <span>{b.name}</span>
              {b.role && <small>{b.role}</small>}
            </Link>
          ))}
        </div>

        <div className="mega-prev" aria-hidden>
          {current?.brands.map((b, i) => {
            const p = sized(b.previewUrl, 720, { height: 540 });
            const l = sized(b.logoUrl, 320);
            return (
              <div key={b.slug} className={`mega-card${i === hot ? " on" : ""}`}>
                {p ? (
                  <Image src={p} alt="" width={720} height={540} sizes="360px" />
                ) : l ? (
                  <span className="mega-logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l} alt="" />
                  </span>
                ) : (
                  <span className="mega-mono">{b.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("")}</span>
                )}
                <b>{b.name}</b>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
