import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ApMark } from "../brand/ApMark";
import { ArticleActions } from "./ArticleActions";
import { Cta } from "../ui/Cta";
import { articleHref, articleMeta, splitTitle, type Article } from "@/lib/data/articles";
import type { CmsArticle } from "@/lib/sanity";

function slugId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

/** Plain text of a Portable Text block (for headings). */
function ptText(block: { children?: { text?: string }[] }): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("");
}

/** "In this article" box built from the H2s, like a proper long-form blog. */
function Toc({ headings }: { headings: string[] }) {
  if (headings.length < 2) return null;
  return (
    <aside className="toc" aria-label="In this article">
      <b>In this article</b>
      <ol>
        {headings.map((h) => (
          <li key={h}>
            <a href={`#${slugId(h)}`}>{h}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function EndCta() {
  return (
    <div className="endcta">
      <p>
        <em>If this is where your business is, tell me about it.</em>
      </p>
      <Cta href="/business-advisory#capply">Book a consultation</Cta>
    </div>
  );
}

/** One block renderer for every article: blogs and case studies share it. */
function Blocks({ blocks }: { blocks: NonNullable<Article["body"]> }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "lead":
            return (
              <p className="lead" key={i}>
                {b.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={slugId(b.text ?? "")}>
                {b.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i}>
                {b.strong && <b>{b.strong}</b>} {b.text}
              </blockquote>
            );
          case "img":
            // eslint-disable-next-line @next/next/no-img-element
            return <img key={i} src={b.src} alt={b.alt ?? ""} loading="lazy" />;
          case "imgs":
            return (
              <div className="imgrow" key={i}>
                {b.images?.map((im) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={im.src} src={im.src} alt={im.alt} loading="lazy" />
                ))}
              </div>
            );
          case "ul":
            return (
              <ul key={i}>
                {b.items?.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </>
  );
}

function SeedBody({ a }: { a: Article }) {
  const headings = a.body!.filter((b) => b.type === "h2" && b.text).map((b) => b.text!);
  return (
    <div id="abody">
      <Toc headings={headings} />
      <Blocks blocks={a.body!} />
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
        {(a as CmsArticle).cmsSections?.length ? (
          <SectionsList sections={(a as CmsArticle).cmsSections!} />
        ) : a.body?.length ? (
          <Blocks blocks={a.body} />
        ) : (
          <p>Full case study coming soon: the problem, what we tried, what worked and what we would do differently.</p>
        )}
        {c.quote && (
          <blockquote>
            “{c.quote[0]}”<cite>{c.quote[1]}</cite>
          </blockquote>
        )}
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

/** Pinkfly-style sections: heading + paragraphs + image below, with a TOC. */
function SectionsList({ sections }: { sections: NonNullable<CmsArticle["cmsSections"]> }) {
  const headings = sections.map((s) => s.heading).filter((h): h is string => Boolean(h));
  return (
    <>
      <Toc headings={headings} />
      {sections.map((s, i) => (
        <section key={i}>
          {s.heading && <h2 id={slugId(s.heading)}>{s.heading}</h2>}
          {s.text?.length ? <PortableText value={s.text} /> : null}
          {s.imageUrl && (
            <figure className="bimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.imageUrl} alt={s.imageAlt ?? ""} loading="lazy" />
              {s.imageCaption && <figcaption>{s.imageCaption}</figcaption>}
            </figure>
          )}
        </section>
      ))}
    </>
  );
}

function SectionsBody({ a }: { a: CmsArticle }) {
  return (
    <div id="abody">
      <SectionsList sections={a.cmsSections!} />
      <EndCta />
      {a.sources && <p className="srcs">{a.sources}</p>}
    </div>
  );
}

function CmsBody({ a }: { a: CmsArticle }) {
  const headings = a
    .portableBody!.filter((b) => b._type === "block" && (b as { style?: string }).style === "h2")
    .map((b) => ptText(b as { children?: { text?: string }[] }))
    .filter(Boolean);
  return (
    <div id="abody">
      <Toc headings={headings} />
      <PortableText
        value={a.portableBody!}
        components={{
          block: {
            h2: ({ children, value }) => <h2 id={slugId(ptText(value as { children?: { text?: string }[] }))}>{children}</h2>,
          },
          types: {
            image: ({ value }) => {
              const v = value as { asset?: { url?: string }; alt?: string; caption?: string };
              if (!v?.asset?.url) return null;
              return (
                <figure className="bimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.asset.url} alt={v.alt ?? ""} loading="lazy" />
                  {v.caption && <figcaption>{v.caption}</figcaption>}
                </figure>
              );
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
  const body = article.caseStudy ? (
    <CaseBody a={article} />
  ) : article.cmsSections?.length ? (
    <SectionsBody a={article} />
  ) : article.portableBody?.length ? (
    <CmsBody a={article} />
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
        <ArticleActions slug={article.slug} title={article.title} />

        <figure className="abn">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="abi" src={article.image} alt="" />
          <div className="abn-t">
            <small id="abk">{article.kicker}</small>
            <b id="abt">{article.bannerTitle ?? article.excerpt}</b>
          </div>
          {article.image.startsWith("/images/life-") && <figcaption>Placeholder banner: swap with final artwork</figcaption>}
        </figure>

        {body}

        <div className="more-r">
          <span className="lab">Keep reading</span>
          <div className="mr" id="mr">
            {related.map((r) => (
              <Link href={articleHref(r.slug)} key={r.slug}>
                <div className="im">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.cardImage ?? r.image} alt="" loading="lazy" />
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
