import { JOURNEY } from "@/lib/data/site";

/** "From a corporate desk to building my own." — used on Home and About. */
export function Journey() {
  return (
    <section className="jr">
      <div className="wrap">
        <div className="sh rv on">
          <div>
            <span className="lab">My journey</span>
            <h2>
              From a corporate desk <em>to building my own.</em>
            </h2>
          </div>
          <p>If you&rsquo;re somewhere on this road right now, I&rsquo;ve probably been there too.</p>
        </div>
        <ol className="jpath rv on">
          {JOURNEY.map((j) => (
            <li key={j.title} className={"now" in j && j.now ? "now" : undefined}>
              <span className="dt">{j.when}</span>
              <b>{j.title}</b>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
