import { secHeading, type PageSection } from "@/lib/sections";

/**
 * The standard section header: small label plus a heading whose tail is
 * italic. Reads from an editable Page Section with built-in fallbacks.
 */
export function SecHead({
  sec,
  label,
  plain,
  em,
}: {
  sec?: PageSection;
  label: string;
  plain: string;
  em?: string;
}) {
  const h = secHeading(sec, { plain, em });
  return (
    <>
      <span className="lab">{sec?.label ?? label}</span>
      <h2>
        {h.plain}
        {h.em && <em>{h.em}</em>}
      </h2>
    </>
  );
}
