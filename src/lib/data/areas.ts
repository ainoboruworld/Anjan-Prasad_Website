/**
 * The eight services of the 360° consulting view. Shared by the home "wheel" and
 * the advisory page picker, so the copy lives in one place. Each area leads
 * with a point of view, then what most advice gets wrong, then how Anjan
 * works on it.
 */
export type AreaKey = "tech" | "mkt" | "fin" | "log" | "ops" | "rev" | "pro" | "hr";

export interface Area {
  key: AreaKey;
  index: string;
  name: string;
  /** Position on the home wheel ring, in percentages. */
  pos: { left: string; top: string };
  /** Stroke-only icon path(s), 24×24 viewBox. */
  icon: string;
  /** Punchy stat hook shown on the home wheel. */
  stat: string;
  /** The opinionated one-liner: "My view". */
  headline: string;
  /** The personal story behind the view, signed Anjan. */
  note: string;
  /** Three founder-scannable points: the trap, the method, the proof. */
  points: [string, string, string];
}

export const AREAS: Area[] = [
  {
    key: "mkt",
    stat: "42% of businesses shut down because nobody really needed what they sold. More ads won’t change that.",
    index: "01",
    name: "Marketing",
    pos: { left: "50.00%", top: "8.00%" },
    icon: '<path d="M3 11l14-6v14L3 13zM7 13v5"/>',
    headline: "If you need discounts to sell, you don't have a marketing problem. You have a positioning problem.",
    note: "I spent years on the agency side managing over ₹1,200 Cr in budgets. I know how media plans are built, how agencies report success, and which metrics look good without meaning anything. Then I started spending my own money on marketing, and saw every one of those reports differently.",
    points: [
      "Spend amplifies whatever you are. If customers can't tell why you're different, more budget buys more confusion.",
      "We fix the message before the media: one clear customer, one reason to choose you, one price you can defend.",
      "I've read agency reports from both sides of ₹1,200 Cr in budgets. I'll show you which numbers mean anything.",
    ],
  },
  {
    key: "rev",
    stat: "Stuck at the same turnover? I took Lushful from zero to ₹2.5 Cr a year, mostly from existing customers.",
    index: "02",
    name: "Revenue optimisation",
    pos: { left: "79.70%", top: "20.30%" },
    icon: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    headline: "When revenue is stuck, the answer is usually inside the business, not outside it.",
    note: "Every business I've built has hit a ceiling. Each time, my instinct was to find new customers. Each time, the real growth came from something already there: a price we hadn't raised, customers we'd stopped looking after, an offer we hadn't packaged properly.",
    points: [
      "New channels and markets are exciting, expensive and slow. The fastest revenue sits in your existing customers.",
      "We study who already buys from you, why they stay and why they leave.",
      "Then we pick one or two levers that can move revenue in two quarters, and drop everything else.",
    ],
  },
  {
    key: "hr",
    stat: "Half your team could be job hunting right now. Would you even know?",
    index: "03",
    name: "HR",
    pos: { left: "92.00%", top: "50.00%" },
    icon: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5.5"/>',
    headline: "People don't leave companies that are clear. They leave companies that are confusing.",
    note: "I've built teams in a tech company, a food brand and a compliance business. Different industries, very different people. The teams that stayed weren't the ones with the best perks. They were the ones where everyone knew what mattered, who decided what, and that salary would land on time.",
    points: [
      "Perks and offsites matter less than clarity, fairness and salary landing on time.",
      "Every person gets a clear goal, and payroll and compliance get done right. I run a compliance business.",
      "We hire for the stage you're in, not the stage you hope to be in.",
    ],
  },
  {
    key: "fin",
    stat: "Profitable on paper, short on salary day? That’s how 4 in 10 businesses quietly close.",
    index: "04",
    name: "Finance",
    pos: { left: "79.70%", top: "79.70%" },
    icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    headline: "The most dangerous number in a growing business is profit.",
    note: "I've had months running my own company where the P&L looked good and I was still working out how to pay salaries. That's not a mistake you read about. It's one you feel. And it taught me that growth without cash planning can kill a perfectly good business.",
    points: [
      "A good CA keeps you compliant. Compliance looks backwards; a founder has to look forward.",
      "You get the view I use for my own companies: cash in, cash out, week by week, three months ahead.",
      "We work out the real margin on every product and client, so growth never surprises your bank balance.",
    ],
  },
  {
    key: "tech",
    stat: "7 out of 10 founders I meet are running on the wrong tech stack, and paying for it every month.",
    index: "05",
    name: "Technology",
    pos: { left: "50.00%", top: "92.00%" },
    icon: '<path d="M4 6h16v10H4zM9 20h6M12 16v4"/>',
    headline: "Most businesses don't have a technology problem. They have a clarity problem with a technology budget.",
    note: "I've seen it from both sides. At Noboru, we build software for businesses. As a founder, I've bought software. The projects that failed were never short of code. They were short of a clear answer to one question: what exactly should this do for the business?",
    points: [
      "“Digitise” is not a goal. A ₹20 lakh app on an unclear process only speeds up the confusion.",
      "First we map how an order, a lead or a rupee actually moves through your business. Then we build, buy or skip.",
      "I run a tech company, so I know what things should cost and how long they should take. You'll know when a vendor is overselling you.",
    ],
  },
  {
    key: "ops",
    stat: "If every decision waits for you, your team stops thinking. Only 23% of Indian employees truly care about their work.",
    index: "06",
    name: "Operational efficiency",
    pos: { left: "20.30%", top: "79.70%" },
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    headline: "The founder is usually the bottleneck, and usually the last person to see it.",
    note: "For years every decision at my company came through me. I thought I was being careful. I was actually the reason things were slow. Running three businesses at once forced me to change, because there simply wasn't enough of me.",
    points: [
      "“Delegate” fails without systems. You can't hand over what was never written down.",
      "We decide which calls only a founder should make, and write down the process for everything else.",
      "A weekly rhythm surfaces problems before they become fires. It's how I run three companies at once.",
    ],
  },
  {
    key: "log",
    stat: "Bestsellers out of stock, slow movers filling the godown. That’s where 18% of businesses start losing.",
    index: "07",
    name: "Logistics & supply chain",
    pos: { left: "8.00%", top: "50.00%" },
    icon: '<path d="M2 7h11v9H2zM13 10h5l3 3v3h-8M6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>',
    headline: "In a physical business, the real competition happens after the customer clicks “buy”.",
    note: "My marketing career taught me how to create demand. Lushful taught me the harder lesson: what happens when you can't fulfil it. Working with farmers and perishable produce, you learn quickly that margin is made or lost in the supply chain, and no campaign can fix a late or wrong delivery.",
    points: [
      "Growth advice treats supply as someone else's problem. Every late delivery turns a new customer into a lost one.",
      "We look from the warehouse out, not the ad account in: what each order really costs to deliver.",
      "We find where a single failure would stop everything, and fix that before we turn up growth.",
    ],
  },
  {
    key: "pro",
    stat: "A 1% price increase can lift profit by 8%. Still giving discounts?",
    index: "08",
    name: "Sales optimisation",
    pos: { left: "20.30%", top: "20.30%" },
    icon: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    headline: "Being busy is not the same as being profitable, and growth often hides the difference.",
    note: "Across agency life and my own companies, I've seen businesses double revenue and end up with the same profit, sometimes less. Usually it's not one big leak. It's twenty small ones nobody looked at because the top line kept growing.",
    points: [
      "Margin problems are rarely in the cost line. They hide in pricing, client mix and discounts that became your real price.",
      "We read profit by product, client and channel, the way I review my own businesses.",
      "Saying no to the wrong revenue is usually the fastest way to grow profit.",
    ],
  },
];

export const AREA_NAMES = AREAS.map((a) => a.name);

export function findArea(key?: string | null): Area | undefined {
  return key ? AREAS.find((a) => a.key === key) : undefined;
}
