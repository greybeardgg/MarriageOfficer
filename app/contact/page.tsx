import type { Metadata } from 'next';
import { Chrome } from '@/components/brand/Chrome';
import { Guilloche } from '@/components/brand/Guilloche';
import { Action } from '@/components/brand/Action';
import { ContactAsk } from '@/components/pages/ContactAsk';
import { ContactWays } from '@/components/pages/ContactWays';

export const metadata: Metadata = {
  title: 'Contact · Ryan Hogarth Marriage Officers',
  description: 'Got a question, need more information, or want to book? Answer a few questions or ask us in your own words.',
};

/**
 * Contact. The live page is a form and a number; here the two ways in are the
 * questions and the box that answers, and the main number and WhatsApp line
 * take their place beneath once they are decided (Ryan, 30 September 2026).
 */
export default function Contact() {
  return (
    <>
      <Guilloche />
      <Chrome />
      <main className="shell page" style={{ position: 'relative', zIndex: 1 }}>
        <header className="page-head page-head-plain">
          <div className="page-head-text">
            <p className="label page-eyebrow">Contact</p>
            <h1 className="headline page-title">Got a question, need more information, or want to book?</h1>
            <p className="prose page-lede">
              The quickest way to an answer is a few questions about your plans. They show you your
              process, your price and who you will meet. Or tell us what you need in your own words
              and we answer it right here.
            </p>
          </div>
        </header>

        <div className="door-ways contact-doors">
          <section className="door-question" aria-labelledby="contact-questions">
            <h2 id="contact-questions" className="question door-q">Answer the questions</h2>
            <p className="prose door-way-lead">
              Where you are, what you need and when. It takes about a minute, and nothing is booked
              by answering.
            </p>
            <div>
              <Action href="/?start">Answer The Questions</Action>
            </div>
          </section>
          <ContactAsk />
        </div>

        <ContactWays />
      </main>
    </>
  );
}
