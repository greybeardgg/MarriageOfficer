import type { ContentPage } from '@/src/site/pages';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Perforation } from '@/components/brand/Action';
import { InPageQuiz, StartQuiz } from '@/components/front-door/InPageQuiz';
import { AffixedPrint } from '@/components/brand/AffixedPrint';
import { TestimonialBlock } from './TestimonialBlock';

/**
 * A content page behind the menu: what we say about one kind of work, one
 * photograph of it, one couple's words, and the way in. The way in is always
 * the questions, started on this page; nothing here hands anyone to a form
 * or a number.
 */
export function ContentPageView({ page }: { page: ContentPage }) {
  return (
    <>
      <Guilloche />
      <Chrome />
      <InPageQuiz>
      <main className="shell page" style={{ position: 'relative', zIndex: 1 }}>
        <header className="page-head">
          <div className="page-head-text">
            <p className="label page-eyebrow">{page.eyebrow}</p>
            <h1 className="headline page-title">{page.headline}</h1>
            {page.lede.map((p, i) => (
              <p key={i} className={`prose ${i === 0 ? 'page-lede' : 'page-lede-more'}`}>{p}</p>
            ))}
            <div className="page-head-act">
              <StartQuiz>Answer The Questions</StartQuiz>
            </div>
          </div>
          <div className="page-art">
            <AffixedPrint
              src={page.art.src}
              alt={page.art.alt}
              caption={page.art.caption}
              height="var(--page-art-h)"
              position={page.art.position}
              tilt={0.5}
              priority
            />
          </div>
        </header>

        <div className="page-parts">
          {page.sections.map((s, i) => (
            <section key={s.title} className="page-part" aria-labelledby={`${page.slug}-part-${i}`}>
              <h2 id={`${page.slug}-part-${i}`} className="plate page-part-title">{s.title}</h2>
              <div className="page-part-body">
                {s.body.map((p, j) => (
                  <p key={j} className="prose">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <TestimonialBlock t={page.testimonial} />

        <div className="team-close">
          <Perforation label="Your Turn" />
          <p className="prose" style={{ fontSize: 'var(--fs-md)', maxWidth: '52ch' }}>{page.close}</p>
          <div>
            <StartQuiz>Answer The Questions</StartQuiz>
          </div>
        </div>
      </main>
      </InPageQuiz>
    </>
  );
}
