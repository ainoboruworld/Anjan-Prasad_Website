import Link from "next/link";
import { ApMark } from "../brand/ApMark";
import { NewsletterForm } from "../forms/NewsletterForm";
import { SITE } from "@/lib/data/site";

export function Footer() {
  return (
    <footer id="newsletter">
      <div className="fwm" aria-hidden="true">
        <ApMark tone="dark" />
      </div>

      <div className="wrap nl7">
        <div>
          <h5>Newsletter</h5>
          <h4>One operator&rsquo;s letter. Every week.</h4>
          <p>
            Playbooks, margins, and field notes on building profitable businesses in India. No motivation, only
            method.
          </p>
        </div>
        <NewsletterForm />
      </div>

      <div className="wrap ft7">
        <div>
          <Link href="/" className="logo" aria-label="Ap">
            <ApMark tone="dark" />
          </Link>
          <p>
            I work with founders as a business mentor and advisor, helping them build businesses that are profitable,
            scalable and built to last.
          </p>
          <span className="motto">0 → 1 → Scale</span>
        </div>

        <div>
          <h5>Programs &amp; Services</h5>
          <Link href="/business-advisory">Business Advisory</Link>
          <Link href="/consultation">Consultation</Link>
          <Link href="/about">About</Link>
        </div>

        <div>
          <h5>Knowledge Hub</h5>
          <Link href="/knowledge-hub">Blogs</Link>
          <Link href="/knowledge-hub?cat=Case%20Studies">Case Studies</Link>
          <Link href="/about#hear">Featured Media</Link>
          <a href="#newsletter">Newsletter</a>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h5>Connect</h5>
          <a href={SITE.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener">
            Instagram
          </a>
          <span style={{ opacity: 0.6 }}>YouTube (coming soon)</span>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>

      <div className="fb">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Anjan Prasad. All rights reserved.</span>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
