import type { ReactNode } from "react";
import { AREAS, type AreaKey } from "@/lib/data/areas";

/**
 * The nine diagnosis panes. Shared by the home wheel and the consultation
 * picker; the CTA per pane is supplied by the parent.
 */
export function WheelPanes({
  active,
  cta,
}: {
  active: AreaKey;
  cta: (areaKey: AreaKey, areaName: string) => ReactNode;
}) {
  return (
    <div className="wpanes">
      {AREAS.map((a) => (
        <div className={`wp${a.key === active ? " on" : ""}`} data-k={a.key} key={a.key}>
          <span className="lab">
            {a.index} · {a.name}
          </span>
          <h3>{a.headline}</h3>
          <p className="wnote">
            {a.note}
            <span>Anjan</span>
          </p>
          <ul>
            {a.symptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="whelp">
            <b>How I help.</b> {a.help}
          </p>
          {cta(a.key, a.name)}
        </div>
      ))}
    </div>
  );
}

/** Stroke icon for an area, 24×24. */
export function AreaIcon({ svg }: { svg: string }) {
  return <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: svg }} />;
}
