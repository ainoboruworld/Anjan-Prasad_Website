import Link from "next/link";
import type { ReactNode } from "react";

/** Primary gold button: "Book a consultation →". */
export function Cta({
  href,
  children,
  className = "cta",
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children} <span>→</span>
    </Link>
  );
}
