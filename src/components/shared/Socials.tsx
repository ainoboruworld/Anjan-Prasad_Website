/**
 * Social icon row for the footer and contact page. Renders one icon link per
 * network that has a URL (CMS first, code fallback). Icons are inline SVGs so
 * they inherit currentColor and need no extra requests.
 */

const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.49 2.49 0 1 1-.02 4.98 2.49 2.49 0 0 1 .02-4.98ZM3 9h4v12H3V9Zm6.5 0H13v1.7h.05c.49-.9 1.68-1.85 3.45-1.85 3.69 0 4.5 2.3 4.5 5.3V21h-4v-6.1c0-1.45-.03-3.3-2.1-3.3-2.1 0-2.4 1.57-2.4 3.2V21h-4V9Z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.76 2.76 0 0 0-1.94-1.95C17.95 4.8 12 4.8 12 4.8s-5.95 0-7.66.45A2.76 2.76 0 0 0 2.4 7.2 28.9 28.9 0 0 0 1.95 12c0 1.62.15 3.23.45 4.8a2.76 2.76 0 0 0 1.94 1.95c1.71.45 7.66.45 7.66.45s5.95 0 7.66-.45a2.76 2.76 0 0 0 1.94-1.95c.3-1.57.45-3.18.45-4.8s-.15-3.23-.45-4.8ZM10 15.2V8.8l5.2 3.2-5.2 3.2Z" />
    </svg>
  ),
  Substack: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5h16v2.2H4V3.5Zm0 4.3h16V10H4V7.8Zm0 4.3h16V21l-8-4.4L4 21v-8.9Z" />
    </svg>
  ),
  "Twitter / X": (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.7 3h3l-6.6 7.6L21.9 21h-6.1l-4.8-6.3L5.5 21h-3l7.1-8.1L2.3 3h6.3l4.3 5.7L17.7 3Zm-1.1 16.2h1.7L7.7 4.7H5.9l10.7 14.5Z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

export function Socials({ links }: { links: { name: string; href?: string }[] }) {
  const live = links.filter((l) => l.href);
  if (!live.length) return null;
  return (
    <div className="socl">
      {live.map((l) => (
        <a
          key={l.name}
          href={l.href}
          aria-label={l.name}
          title={l.name}
          {...(l.href!.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener" })}
        >
          {ICONS[l.name]}
        </a>
      ))}
    </div>
  );
}
