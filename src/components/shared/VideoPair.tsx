import { VIDEOS } from "@/lib/data/site";

/** Two YouTube feature cards. */
export function VideoPair({ variant = "home" }: { variant?: "home" | "about" }) {
  return (
    <div className="v2 rv on">
      {VIDEOS.map((v) => (
        <a className="vc" href={v.href} target="_blank" rel="noopener" key={v.href}>
          <div className="pl" />
          <div className="tx">
            <small>YouTube</small>
            <h3>{v.title}</h3>
            <p>{variant === "about" ? v.aboutText : v.text}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export function FeaturedMedia() {
  return (
    <section className="sec media">
      <div className="wrap">
        <div className="sh rv on">
          <div>
            <span className="lab">Featured Media</span>
            <h2>
              Watch <em>the method.</em>
            </h2>
          </div>
        </div>
        <VideoPair />
      </div>
    </section>
  );
}
