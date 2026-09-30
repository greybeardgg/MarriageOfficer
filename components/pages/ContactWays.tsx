import { CONTACT, displayNumber, hasContact, whatsappLink } from '@/src/site/contact';
import type { ContactDetails } from '@/src/site/contact';

const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';

/**
 * The business's main number and WhatsApp line. Shown only once they are set
 * in src/site/contact.ts; until then the public sees nothing, and a draft
 * build shows where they will go. The number is printed as selectable text
 * as well as a link, because a tel: link does nothing on a desktop.
 */
export function ContactWays({ contact = CONTACT }: { contact?: ContactDetails }) {
  if (!hasContact(contact)) {
    if (!SHOW_DRAFTS) return null;
    return (
      <section className="contact-ways" aria-labelledby="contact-ways-head">
        <h2 id="contact-ways-head" className="plate page-part-title">
          Call or WhatsApp<span className="draft">Draft</span>
        </h2>
        <p className="prose contact-pending">
          A main contact number and a WhatsApp option will be listed here once they are decided.
          Nothing is shown to the public until then.
        </p>
      </section>
    );
  }

  return (
    <section className="contact-ways" aria-labelledby="contact-ways-head">
      <h2 id="contact-ways-head" className="plate page-part-title">Call or WhatsApp</h2>
      <dl className="contact-list">
        {contact.phone ? (
          <div className="contact-row">
            <dt className="label">Call us</dt>
            <dd>
              <a className="data contact-number" href={`tel:+${contact.phone}`}>{displayNumber(contact.phone)}</a>
            </dd>
          </div>
        ) : null}
        {contact.whatsapp ? (
          <div className="contact-row">
            <dt className="label">WhatsApp</dt>
            <dd>
              <a className="data contact-number" href={whatsappLink(contact.whatsapp)}>{displayNumber(contact.whatsapp)}</a>
            </dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
