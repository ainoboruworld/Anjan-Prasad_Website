/**
 * The nine areas of the 360° diagnosis. Shared by the home "wheel" and the
 * consultation page picker, so the copy lives in one place.
 */
export type AreaKey = "tech" | "mkt" | "fin" | "log" | "ops" | "rev" | "pro" | "hr" | "prd";

export interface Area {
  key: AreaKey;
  index: string;
  name: string;
  /** Position on the home wheel ring, in percentages. */
  pos: { left: string; top: string };
  /** Stroke-only icon path(s), 24×24 viewBox. */
  icon: string;
  headline: string;
  note: string;
  symptoms: [string, string, string];
  help: string;
}

export const AREAS: Area[] = [
  {
    key: "tech",
    index: "01",
    name: "Technology",
    pos: { left: "50.00%", top: "8.00%" },
    icon: '<path d="M4 6h16v10H4zM9 20h6M12 16v4"/>',
    headline: "7 out of 10 founders I meet have picked the wrong tech for their stage.",
    note: "At Noboru we've built 50+ products. The expensive mistakes were never about code. They were about choosing a tool before understanding the business.",
    symptoms: [
      "A ₹20 lakh app when a WhatsApp flow and a Google Sheet would have done",
      "Five tools, zero integration, and nobody trusts the numbers",
      "An agency that built what you asked for, not what you needed",
    ],
    help: "I help you choose the right stack for today's stage, and a clear upgrade path for tomorrow.",
  },
  {
    key: "mkt",
    index: "02",
    name: "Marketing and sales",
    pos: { left: "77.00%", top: "17.83%" },
    icon: '<path d="M3 11l14-6v14L3 13zM7 13v5"/>',
    headline: "Your ad spend doubled. Your customers didn't.",
    note: "I've managed ₹1200 Cr+ in marketing budgets. Most of the waste I've seen came from one thing: marketing a product before its positioning was clear.",
    symptoms: [
      "Meta and Google ads that bring clicks, but not paying customers",
      "Competing on discounts because nobody knows why you're different",
      "Sales still depends on you closing every deal yourself",
    ],
    help: "I help you fix positioning first, then build channels that bring in customers at a cost you can sustain.",
  },
  {
    key: "fin",
    index: "03",
    name: "Finance",
    pos: { left: "91.36%", top: "42.71%" },
    icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    headline: "Sales are growing. So why is cash always short at month end?",
    note: "I've had months at Noboru where the P&L looked healthy and I was still worrying about salaries. Profit and cash are two different stories.",
    symptoms: [
      "GST, vendor payments and salaries all landing in the same week",
      "Unit economics that nobody has actually worked out per order or per client",
      "Not ready when an investor or bank asks for clean numbers",
    ],
    help: "I help you set up a simple cash view, fix pricing and terms, and get investor-ready numbers.",
  },
  {
    key: "log",
    index: "04",
    name: "Logistics and supply chain",
    pos: { left: "86.37%", top: "71.00%" },
    icon: '<path d="M2 7h11v9H2zM13 10h5l3 3v3h-8M6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>',
    headline: "Stock-outs on your bestsellers. Dead stock on everything else.",
    note: "Building Lushful with farmers taught me that in physical businesses, the margin is made or lost in logistics, not in marketing.",
    symptoms: [
      "Your hero SKUs go out of stock just as demand picks up",
      "Courier and last-mile costs quietly eating 15 to 20% of order value",
      "One vendor or one warehouse failure stops the whole business",
    ],
    help: "I help you plan inventory around your hero SKUs, renegotiate logistics and build backup supply.",
  },
  {
    key: "ops",
    index: "05",
    name: "Operational efficiency",
    pos: { left: "64.36%", top: "89.47%" },
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    headline: "If you take a week off, does the business stop?",
    note: "For years, every decision at my own company came to me. It felt like control. It was actually the biggest thing slowing us down.",
    symptoms: [
      "No SOPs, so every task lives in one person's head",
      "The same fires, put out again every single week",
      "You're the bottleneck for approvals, hiring and client calls",
    ],
    help: "I help you write the SOPs, set up a simple review rhythm and hand decisions to the right people.",
  },
  {
    key: "rev",
    index: "06",
    name: "Revenue growth",
    pos: { left: "35.64%", top: "89.47%" },
    icon: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    headline: "Revenue has been stuck at the same number for months.",
    note: "Every business I've built has hit a plateau. Breaking through it was never about working harder. It was about finding the one lever we were ignoring.",
    symptoms: [
      "Chasing new customers while existing ones quietly stop buying",
      "No clear next channel, market or product to bet on",
      "Price increases you've been avoiding for two years",
    ],
    help: "I help you find the one or two levers that will move revenue in the next two quarters, and focus there.",
  },
  {
    key: "pro",
    index: "07",
    name: "Profit optimisation",
    pos: { left: "13.63%", top: "71.00%" },
    icon: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    headline: "Busy all year. Very little left at the end of it.",
    note: "The most common thing I see in Indian SMEs: revenue up 30%, profit flat. Growth that isn't priced right just multiplies the problem.",
    symptoms: [
      "Discounts that slowly became your default price",
      "Costs nobody has questioned in years because \"that's how it's done\"",
      "Clients or products that keep you busy but lose you money",
    ],
    help: "I help you find where margin is leaking, cut what doesn't pay and price for the value you deliver.",
  },
  {
    key: "hr",
    index: "08",
    name: "People and culture",
    pos: { left: "8.64%", top: "42.71%" },
    icon: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5.5"/>',
    headline: "You hire good people. They don't stay, or they don't align.",
    note: "Building teams across Noboru, Lushful and Filing Buddy, I learned that culture isn't posters. It's clear goals, fair pay and a founder who lets go.",
    symptoms: [
      "No OKRs, so everyone pulls in a different direction",
      "PF, payroll and compliance handled on the side, and always late",
      "Good people leaving within a year, taking your training with them",
    ],
    help: "I help you set up OKRs, a simple HR and payroll backbone, and a hiring process that finds people who stay.",
  },
  {
    key: "prd",
    index: "09",
    name: "Productivity",
    pos: { left: "23.00%", top: "17.83%" },
    icon: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    headline: "In India, employees are productive only about 30% of their working hours.",
    note: "Long hours are a badge of honour in Indian offices. But in every team I've worked with, output came from clarity, not from time spent at a desk.",
    symptoms: [
      "Meetings that fill the week and decide nothing",
      "No way to see what each person actually delivers",
      "Everyone busy, and still the important work slips",
    ],
    help: "I help you set weekly priorities, measure output instead of hours, and cut the work that doesn't matter.",
  },
];

export const AREA_NAMES = AREAS.map((a) => a.name);

export function findArea(key?: string | null): Area | undefined {
  return AREAS.find((a) => a.key === key);
}
