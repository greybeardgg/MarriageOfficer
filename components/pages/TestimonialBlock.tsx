import type { Testimonial } from '@/src/site/pages';

/** One couple's words, verbatim, with their name and where they married. */
export function TestimonialBlock({ t }: { t: Testimonial }) {
  return (
    <figure className="testimony">
      <p className="label testimony-head">In Their Words</p>
      <blockquote className="testimony-quote">
        {t.quote.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </blockquote>
      <figcaption className="testimony-by">
        <span className="testimony-name">{t.name}</span>
        <span className="data testimony-place">{t.place}</span>
      </figcaption>
    </figure>
  );
}
