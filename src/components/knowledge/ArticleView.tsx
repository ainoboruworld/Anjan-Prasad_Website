import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ApMark } from "../brand/ApMark";
import { Cta } from "../ui/Cta";
import { articleHref, articleMeta, splitTitle, type Article } from "@/lib/data/articles";
import type { CmsArticle } from "@/lib/sanity";

function EndCta() {
  return (
    <div className="endcta">
      <p>
        <em>If this is where your business is, tell me about it.</em>
      </p>
      <Cta href="/consultation#capply">Book a consultation</Cta>
    </div>
  );
}

function SeedBody({ a }: { a: Article }) {
  return (
    <div id="abody">
      {a.body!.map((b, i) => {
        switch (b.type) {
          case "lead":
            return (
              <p className="lead" key={i}>
                {b.text}
              </p>
            );
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "quote":
            return (
              <blockquote key={i}>
                {b.strong && <b>{b.strong}</b>} {b.text}
              </blockquote>
            );
          case "img":
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={i} src={b.src} alt={b.alt ?? ""} loading="lazy" />;
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
      <EndCta />
      {a.sources && <p className="srcs">{a.sources}</p>}
    </div>
  );
}

function CaseBody({ a }: { a: Article }) {
  const c = a.caseStudy!;
  return (
    <div id="aalt">
      <div className="csb">
        <p className="lead">{c.summary}</p>
        <div className="csmx">
          {c.metrics.map(([v, l]) => (
            <div key={l}>
              <b>{v}</b>
              <small>{l}</small>
            </div>
          ))}
        </div>
        <div className="tags">
          {c.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {c.quote && (
          <blockquote>
            “{c.quote[0]}”<cite>{c.quote[1]}</cite>
          </blockquote>
        )}
        <p>Full case study coming soon: the problem, what we tried, what worked and what we would do differently.</p>
      </div>
      <EndCta />
    </div>
  );
}

function DraftBody() {
  return (
    <div id="aalt">
      <span className="ph-flag">Draft: full article coming soon</span>
      <p className="gen">
        I&rsquo;m writing this one from my own notes and the founders I&rsquo;ve sat with. It will follow the same shape
        as everything I write here: the real problem, what I tried, what worked, and what I&rsquo;d do differently if I
        started again tomorrow.
      </p>
      <EndCta />
    </div>
  );
}

function CmsBody({ a }: { a: CmsArticle }) {
  return (
    <div id="abody">
      <PortableText
        value={a.portableBody!}
        components={{
          types: {
            image: ({ value }) => {
              const url = (value as { asset?: { url?: string }; alt?: string })?.asset?.url;
              // eslint-disable-next-line @next/next/no-img-element
              return url ? <img src={url} alt={(value as { alt?: string }).alt ?? ""} loading="lazy" /> : null;
            },
          },
        }}
      />
      <EndCta />
      {a.sources && <p className="srcs">{a.sources}</p>}
    </div>
  );
}

/** Full article page: header, banner, body and "keep reading". */
export function ArticleView({ article, related }: { article: CmsArticle; related: Article[] }) {
  const { head, tail } = splitTitle(article.title);
  const body = article.portableBody?.length ? (
    <CmsBody a={article} />
  ) : article.caseStudy ? (
    <CaseBody a={article} />
  ) : article.body?.length ? (
    <SeedBody a={article} />
  ) : (
    <DraftBody />
  );

  return (
    <article className="art">
      <div className="aw">
        <Link href="/knowledge-hub" className="back">
          ← Knowledge Hub
        </Link>
        <span className="lab" id="alab">
          {articleMeta(article)} · {article.readTime}
        </span>
        <h1 id="ah">
          {head}
          {tail && <em>{tail}</em>}
        </h1>
        <div className="by">
          <ApMark />
          <span>Anjan Prasad</span>
        </div>

        <figure className="abn">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="abi" src={article.image} alt="" />
          <div className="abn-t">
            <small id="abk">{article.kicker}</small>
            <b id="abt">{article.bannerTitle ?? article.excerpt}</b>
          </div>
          {article.image.startsWith("/images/") && <figcaption>Placeholder banner: swap with final artwork</figcaption>}
        </figure>

        {body}

        <div className="more-r">
          <span className="lab">Keep reading</span>
          <div className="mr" id="mr">
            {related.map((r) => (
              <Link href={articleHref(r.slug)} key={r.slug}>
                <div className="im">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt="" loading="lazy" />
                </div>
                <small>{r.category}</small>
                <h4>{r.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
