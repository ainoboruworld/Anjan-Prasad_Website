import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pg on" id="main">
      <div className="legal">
        <span className="lab">404</span>
        <h1>
          That page <em>isn&rsquo;t here.</em>
        </h1>
        <p>The link may be old. The Knowledge Hub is a good place to start again.</p>
        <p>
          <Link href="/knowledge-hub" className="cta">
            Knowledge Hub <span>→</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
