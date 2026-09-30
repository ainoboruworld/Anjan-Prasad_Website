import Image from "next/image";
import { Cta } from "../ui/Cta";

/** Home hero: the opening statement and Anjan's portrait on the soft-blue arch. */
export function Hero() {
  return (
    <header className="hero">
      <div className="stage">
        <div className="ring" aria-hidden="true" />
        <div className="arch" aria-hidden="true" />
        <Image
          className="fig"
          src="/images/hero-anjan.webp"
          alt="Anjan Prasad, seated at a table"
          width={900}
          height={1200}
          priority
          sizes="(max-width: 900px) 90vw, 600px"
        />
      </div>

      <div className="wrap">
        <h1>
          Build a Business That <em>Outlasts You.</em>
        </h1>
        <p>
          I left a corporate career to build my own companies, and learned the hard way what keeps a business alive.
          Now I sit beside founders who are serious about building something that lasts.
        </p>
        <div className="more">
          <Cta href="/consultation#capply">Book a consultation</Cta>
        </div>
      </div>
    </header>
  );
}
