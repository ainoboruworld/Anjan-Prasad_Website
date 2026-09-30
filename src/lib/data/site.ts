/** Site-wide constants: navigation, contact details, journey, videos, photos. */

export const SITE = {
  name: "Anjan Prasad",
  title: "Anjan Prasad | Business Consultant, Business Advisor and Business Mentor",
  description:
    "Anjan Prasad is a business consultant, business advisor and business mentor who has built profitable businesses. Strategy, growth, marketing and go-to-market guidance for founders and people starting out.",
  email: "performance@noboruworld.com",
  linkedin: "https://www.linkedin.com/in/anjanprasad/",
  instagram: "https://www.instagram.com/anjanpr/",
  twitterHandle: "@anjanpr",
} as const;

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV: NavItem[] = [
  {
    label: "Programs",
    href: "/business-advisory",
    children: [
      { label: "Business Advisory", href: "/business-advisory" },
      { label: "Consultation", href: "/consultation" },
    ],
  },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const JOURNEY = [
  {
    when: "Where I started",
    title: "Corporate life",
    text: "Accenture, then years inside global agencies like Mindshare and IPG Mediabrands.",
  },
  {
    when: "Learning growth",
    title: "Enterprise teams",
    text: "Growth and marketing roles at Zeta Global and Fareportal.",
  },
  {
    when: "The leap",
    title: "Noboru World",
    text: "I left the security of a salary and started my own company.",
  },
  {
    when: "Building more",
    title: "Lushful & Filing Buddy",
    text: "A food brand with farmers, and a compliance business I run as CEO.",
  },
  {
    when: "Today",
    title: "Helping founders",
    text: "Sharing what worked, and what didn't, with people making the same leap.",
    now: true,
  },
] as const;

export const VIDEOS = [
  {
    href: "https://youtu.be/U3otsv7eLKA?si=HD6D_Vxyt1GgfKap",
    title: "From Accenture to Serial Entrepreneur",
    text: "Anjan Prasad shares his entrepreneurial journey, lessons from building businesses, and transitioning from corporate leadership to entrepreneurship.",
    aboutText:
      "My journey from corporate leadership to building businesses, and what I learned along the way.",
  },
  {
    href: "https://youtu.be/ghVIlCZ7NMQ?si=wCAIR45JzpvLxSDY",
    title: "₹5/kg vs ₹150/kg: Farm to Consumer Business Model",
    text: "Learn how direct-to-consumer business models create value, improve profitability, and transform traditional industries.",
    aboutText: "How direct-to-consumer models create value and improve profitability.",
  },
] as const;

/** "Off the clock" photo strip. Placeholders until Anjan's own photos arrive. */
export const LIFE_PHOTOS = [
  { src: "/images/life-1.jpg", tag: "Weekday", caption: "Early mornings, before the calls begin", rotate: "-2.5deg" },
  { src: "/images/life-2.jpg", tag: "At the desk", caption: "Coffee and a notebook", rotate: "1.8deg" },
  { src: "/images/life-3.jpg", tag: "Weekend", caption: "Time by the water", rotate: "-1.2deg" },
  { src: "/images/life-4.jpg", tag: "Getaways", caption: "Somewhere quiet to think", rotate: "2.4deg" },
  { src: "/images/life-5.jpg", tag: "Evenings", caption: "Winding down", rotate: "-1.8deg" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Anjan rebuilt our operating model in a quarter. The business now runs on systems, not on any single person being available at 11pm.",
    initials: "RM",
    name: "Rhea Malhotra",
    role: "Founder & CEO, Meridian Foods",
  },
  {
    quote:
      "He is the rare advisor equally at home in the boardroom and in a process map. Our margins moved because of it.",
    initials: "DO",
    name: "Daniel Okafor",
    role: "Managing Director, Northwind Logistics",
  },
  {
    quote:
      "We went from firefighting to forecasting. The clarity Anjan brought made our next funding round almost straightforward.",
    initials: "AV",
    name: "Ananya Verma",
    role: "Co-founder, Aperture Health",
  },
  {
    quote:
      "Fifteen years of operating instinct in every conversation. He builds businesses, you feel it in the first meeting.",
    initials: "MF",
    name: "Marcus Feld",
    role: "Partner, Cavalt Capital",
  },
] as const;
