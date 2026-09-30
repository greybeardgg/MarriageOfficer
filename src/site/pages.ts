/**
 * The content pages behind the menu: Marriage Registration, Wedding
 * Ceremonies, Same-Sex Weddings. The words are the live site's
 * (www.marriageofficer.co.za, read 30 September 2026), tidied: the WhatsApp
 * and form sections are gone because the questions are the way in, and the
 * facts agree with the answer library. Testimonials are verbatim.
 *
 * Pure data, no JSX, so the copy lifts into the main app with the rest of src/.
 */

export interface Testimonial {
  /** Verbatim, one string per paragraph. */
  quote: string[];
  name: string;
  place: string;
}

export interface PageSection {
  title: string;
  body: string[];
}

export interface ContentPage {
  /** The URL the live site already uses, kept so existing links and search results still land. */
  slug: string;
  /** The menu's name for it, set as the eyebrow. */
  eyebrow: string;
  headline: string;
  lede: string[];
  sections: PageSection[];
  testimonial: Testimonial;
  art: { src: string; alt: string; caption: string; position: string };
  /** The line above the way in. */
  close: string;
  meta: { title: string; description: string };
}

export const REGISTRATION: ContentPage = {
  slug: 'marriage-registrations',
  eyebrow: 'Marriage Registration',
  headline: 'Get legally married at home or at our offices',
  lede: [
    'Get legally married in South Africa at a time, on a date and at a place that suits you. It is the alternative to getting married at Home Affairs or in court.',
    'Whether you come to us or we come to you, we take care of all the paperwork, register your marriage with Home Affairs and give you a marriage certificate on the day.',
  ],
  sections: [
    {
      title: 'All it takes',
      body: [
        'Getting legally married is a simple process. All it needs is the two of you, two witnesses and a marriage officer. You can be married at home, at a venue or at our offices, at any time, on any day of the week.',
        'Small, private weddings are a speciality of ours. The reasons for choosing to be married this way are varied, and each is important.',
      ],
    },
    {
      title: 'What you need',
      body: [
        'Your IDs, your witnesses’ IDs, a divorce decree if either of you has been married before, and confirmation of your antenuptial contract if you have one.',
        'The questions tell you exactly what applies to the two of you, including what changes if one of you is not South African.',
      ],
    },
    {
      title: 'How soon',
      body: [
        'If you have your documents to hand you could be married today, so we can help at short notice. Once the paperwork is signed we submit it to Home Affairs within three days, and you leave with a marriage certificate on the day.',
      ],
    },
  ],
  testimonial: {
    quote: [
      'Thank you very much for making our day special.',
      'I would also like to thank you for an outstanding professionalism and a superb service you gave us from the time we started communicating.',
    ],
    name: 'Nonkululeko Duma',
    place: 'Lonehill',
  },
  art: {
    src: '/photography/registration-02.jpg',
    alt: 'A couple seated at a table in a garden, signing the marriage register while the officer stands beside them.',
    caption: 'A registration at home',
    position: '50% 62%',
  },
  close: 'Answer a few questions and we show you your process, your price and who you will meet, before you speak to anyone.',
  meta: {
    title: 'Marriage Registration · Ryan Hogarth Marriage Officers',
    description: 'Get legally married at home or at our offices, at a time and place that suits you. We handle the paperwork and register your marriage with Home Affairs.',
  },
};

export const CEREMONIES: ContentPage = {
  slug: 'wedding-ceremonies',
  eyebrow: 'Wedding Ceremonies',
  headline: 'From 5 people to 500, personal ceremonies created and delivered',
  lede: [
    'Weddings are as diverse as the people getting married. We understand this and work to personalise every ceremony we do. The perfect wedding ceremony is a collaboration between you and our 25 years of experience in performing weddings.',
  ],
  sections: [
    {
      title: 'What the ceremony does',
      body: [
        'The ceremony is the official start of a wedding celebration. It sets the tone and the mood. The perfect ceremony acknowledges the importance of the moment and, at the same time, brings out the celebration of the day.',
      ],
    },
    {
      title: 'Keeping it simple',
      body: [
        'You will also find that the ceremony is the least complicated part of the day. You want to think about it enough to get what you want, but not so much that it becomes complicated. We advise, guide and keep it simple.',
      ],
    },
    {
      title: 'The legal part, inside it',
      body: [
        'The registration is done properly inside the ceremony: the legal words, the register signed with your two witnesses, and the marriage lodged with Home Affairs. If you are already married, we do the ceremony on its own.',
      ],
    },
  ],
  testimonial: {
    quote: [
      'Ryan was absolutely wonderful! His authenticity, the actual wording of the service and the relevancy of this to both of us, the sincerity and again the warmth with which he engaged with us really stood out for us. He was a huge part of making the day the special day it was for us.',
      'Many of our guests came to us and spoke to us about Ryan as they were all so touched by his service. They all expressed that it was the most touching ceremony that they have attended.',
    ],
    name: 'Liz and Anina',
    place: 'Krugersdorp',
  },
  art: {
    src: '/photography/ceremony-04.jpg',
    alt: 'An outdoor ceremony under white flowers: the officiant at a microphone between a bride in a veil and the groom, guests seated in front.',
    caption: 'A ceremony, guests and all',
    position: '50% 38%',
  },
  close: 'Answer a few questions and we show you how a ceremony with us works, what it costs and who would officiate, before you speak to anyone.',
  meta: {
    title: 'Wedding Ceremonies · Ryan Hogarth Marriage Officers',
    description: 'Personal wedding ceremonies from 5 people to 500, with the legal registration done properly inside them.',
  },
};

export const SAME_SEX: ContentPage = {
  slug: 'same-sex-weddings',
  eyebrow: 'Same-Sex Weddings',
  headline: 'We are all registered Civil Union marriage officers',
  lede: [
    'From large formal weddings to a simple registration at our offices or at your home, you are in the right place.',
    'It is almost silly that we have to have a special category of service for same-sex weddings. But such is the nature of the world: change happens gradually.',
  ],
  sections: [
    {
      title: 'So it’s a wedding',
      body: [
        'Most people who attend a same-sex wedding have never seen one before, and there is often a curiosity about what will happen. Once it is over, the most regular comment is “oh, so it’s a wedding”. Of course it is.',
      ],
    },
    {
      title: 'Licensed marriage officers',
      body: [
        'All of our marriage officers are licensed to perform same-sex weddings. Everything you read on this website about weddings is true of all the weddings we perform, gay or straight.',
        'Between us we have performed over 100 gay and lesbian weddings, which means we have the experience to make yours exceptional.',
      ],
    },
  ],
  testimonial: {
    quote: [
      'Ryan Hogarth is by far the most eloquent and well spoken marriage officer we have ever had the privilege of meeting. His kindness, genuine care for others and understanding that love is something so special and rare, became abundantly clear to both of us. His ability to get to know you on a personal level and remember such wonderful details about you, as a couple, makes him incredible on the day. Every single guest fell in love with him during the ceremony and spoke non stop about how his personal touch elevated the wedding and their spirits. He was one of the most spoken about aspects of our wedding day, which proves his incredible value, not only as a marriage officer, but as a person.',
    ],
    name: 'Zavion and John',
    place: 'Sandton',
  },
  art: {
    src: '/photography/samesex-01.jpg',
    alt: 'Two grooms in black holding hands under a wooden arch dressed with greenery, the officer at a lectern between them.',
    caption: 'A wedding, Gauteng',
    position: '50% 45%',
  },
  close: 'The questions are the same for every couple. Answer them and we show you your process, your price and who you will meet.',
  meta: {
    title: 'Same-Sex Weddings · Ryan Hogarth Marriage Officers',
    description: 'Every one of our marriage officers is a registered Civil Union officer. Registrations and ceremonies for every couple.',
  },
};

export const CONTENT_PAGES: ContentPage[] = [REGISTRATION, CEREMONIES, SAME_SEX];
