/**
 * Questions founders actually ask before they write in, answered plainly.
 * Rendered on the page and as FAQPage schema so search and AI assistants
 * can quote the answers directly.
 */
export interface Faq {
  q: string;
  a: string;
}

export const ADVISORY_FAQS: Faq[] = [
  {
    q: "What is the difference between a business advisor and a business consultant?",
    a: "A consultant is usually hired to deliver a project: a strategy document, a marketing plan, a process redesign. A business advisor sits beside the founder over time and helps make the decisions themselves, using the founder's own numbers. I work as an advisor: I have built and run businesses, so I bring operating experience to the decision in front of you rather than a report about it.",
  },
  {
    q: "Who is business advisory for?",
    a: "Founders and business owners at a turning point: a business that has stopped growing, a pricing or hiring decision that will not resolve, a launch, a raise, or a leadership team that needs an outside view. It is for people already running something. If you are at the idea stage, mentorship is the better door.",
  },
  {
    q: "How does a consultation with Anjan Prasad work?",
    a: "You send the decision you are facing through the form, with your numbers if you have them. I read it myself and reply within three to four working days with a time to talk, or an honest note if I am not the right person. The first session is focused on that one decision. Some founders need one session; others move to an ongoing advisory seat.",
  },
  {
    q: "How much does business advisory cost?",
    a: "It depends on the format: a single focused session, a short engagement around one decision, or an ongoing seat at your table. I quote after reading your request, because the right format depends on the problem. I keep the number of clients small so each gets real attention.",
  },
  {
    q: "Which areas of a business does Anjan advise on?",
    a: "Pricing and unit economics, finance and cash, marketing and go-to-market, sales process, hiring and team, operations and supply chain, and technology decisions made against a growth number. Most engagements start in one area and touch two or three.",
  },
  {
    q: "What results have founders seen?",
    a: "Across the businesses I have built and advised: a D2C brand from zero to ₹2.5 Cr ARR, a dermatology chain that grew revenue nine times in twelve months with cost per patient down 55%, and an EV launch that took 5,000 bookings in four days. The case studies in the Knowledge Hub give the full numbers and the mistakes along the way.",
  },
  {
    q: "Does Anjan work with businesses outside India?",
    a: "Most of my work is with founders building in India, and the examples on this site come from there. I take on founders elsewhere when the decision is one I have genuinely faced. Write in and I will tell you honestly.",
  },
];

export const MENTORSHIP_FAQS: Faq[] = [
  {
    q: "What is the difference between mentorship and advisory?",
    a: "Advisory answers a question; mentorship walks the road. Advisory is for an established business with a decision in front of it. Mentorship is for founders near the start, an idea taking shape or a young startup finding its first customers, and runs over months or years rather than sessions.",
  },
  {
    q: "Who does Anjan Prasad mentor?",
    a: "A small number of early-stage founders at a time, chosen for honesty and commitment rather than polish. You do not need a deck. You need to be all in and clear about where you really are.",
  },
  {
    q: "How do I apply for mentorship?",
    a: "Tell me your story through the form: where you are, what you are building and why it matters to you. I read every application myself and reply within three to four working days, with a yes and a first conversation or an honest no with the reason.",
  },
  {
    q: "Does mentorship involve equity?",
    a: "Sometimes. For a few early startups I believe in, I take a long-term seat at the table with equity, so I have skin in the game alongside you. It is discussed openly once we both know it is a fit, never as a condition of the first conversation.",
  },
  {
    q: "How long does mentorship last?",
    a: "As long as it is useful. Most relationships run well past a year, because the point is to know your business almost as well as you do and be there for the decisions that come after the first few.",
  },
  {
    q: "What should I prepare before applying?",
    a: "Answer the seven questions I ask before a first call, honestly and in writing. They are free on this site. If you can answer them, your application will be sharper and our first conversation will start further along.",
  },
];

export const SPEAKING_FAQS: Faq[] = [
  {
    q: "What does Anjan Prasad speak about?",
    a: "Building profitable businesses in India, told with real numbers: unit economics, pricing, the mistakes of a first-time founder, direct-to-consumer models, and the shift from corporate leadership to entrepreneurship. Sessions are practical and leave founders with something to use on Monday.",
  },
  {
    q: "What kinds of events does Anjan speak at?",
    a: "Podcasts, business schools and universities, conferences and summits, and corporate events. He also teaches at IIFT and IMT Ghaziabad, so classroom formats are familiar ground.",
  },
  {
    q: "How do I invite Anjan to speak?",
    a: "Use the invitation form with the format, audience and date you have in mind. He reads every invitation himself and replies within five working days.",
  },
];
