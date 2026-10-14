/**
 * The nine areas of the 360° consulting view. Shared by the home "wheel" and
 * the advisory page picker, so the copy lives in one place. Each area leads
 * with a point of view, then what most advice gets wrong, then how Anjan
 * works on it.
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
  /** The opinionated one-liner: "My view". */
  headline: string;
  /** The personal story behind the view, signed Anjan. */
  note: string;
  /** What most advice gets wrong. */
  wrong: string;
  /** How I work on it. */
  help: string;
}

export const AREAS: Area[] = [
  {
    key: "tech",
    index: "01",
    name: "Technology",
    pos: { left: "50.00%", top: "8.00%" },
    icon: '<path d="M4 6h16v10H4zM9 20h6M12 16v4"/>',
    headline: "Most businesses don't have a technology problem. They have a clarity problem with a technology budget.",
    note: "I've seen it from both sides. At Noboru, we build software for businesses. As a founder, I've bought software. The projects that failed were never short of code. They were short of a clear answer to one question: what exactly should this do for the business?",
    wrong:
      "Founders are told to “digitise” or “automate” as if technology were the goal. It isn't. A ₹20 lakh app that automates an unclear process just makes the confusion faster.",
    help: "I sit with you and map how an order, a lead or a rupee actually moves through your business today. Only then do we decide what to build, buy or skip. Because I run a tech company, I can tell you what something should cost and how long it should take, so no vendor oversells you again.",
  },
  {
    key: "mkt",
    index: "02",
    name: "Marketing and sales",
    pos: { left: "77.00%", top: "17.83%" },
    icon: '<path d="M3 11l14-6v14L3 13zM7 13v5"/>',
    headline: "If you need discounts to sell, you don't have a marketing problem. You have a positioning problem.",
    note: "I spent years on the agency side managing over ₹1,200 Cr in budgets. I know how media plans are built, how agencies report success, and which metrics look good without meaning anything. Then I started spending my own money on marketing, and saw every one of those reports differently.",
    wrong:
      "Most marketing advice starts with channels: more Meta, more Google, more content. But spend amplifies whatever you are. If customers can't tell why you're different, more spend just buys more confusion.",
    help: "We fix the message before the media. One clear customer, one clear reason to choose you, one price you can defend. Then I help you set the right acquisition cost and read your agency's reports the way the agency reads them.",
  },
  {
    key: "fin",
    index: "03",
    name: "Finance",
    pos: { left: "91.36%", top: "42.71%" },
    icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    headline: "The most dangerous number in a growing business is profit.",
    note: "I've had months running my own company where the P&L looked good and I was still working out how to pay salaries. That's not a mistake you read about. It's one you feel. And it taught me that growth without cash planning can kill a perfectly good business.",
    wrong:
      "Founders are told to get a good CA. A CA keeps you compliant. That's not the same as running the business on numbers. Compliance looks backwards. Founders need to look forward.",
    help: "I give you the view I use for my own businesses: what cash comes in, what goes out, week by week, for the next three months. Then we work out the real margin on every product or client, so you know what growth will actually do to your bank balance before it happens.",
  },
  {
    key: "log",
    index: "04",
    name: "Logistics and supply chain",
    pos: { left: "86.37%", top: "71.00%" },
    icon: '<path d="M2 7h11v9H2zM13 10h5l3 3v3h-8M6 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>',
    headline: "In a physical business, the real competition happens after the customer clicks “buy”.",
    note: "My marketing career taught me how to create demand. Lushful taught me the harder lesson: what happens when you can't fulfil it. Working with farmers and perishable produce, you learn quickly that margin is made or lost in the supply chain, and no campaign can fix a late or wrong delivery.",
    wrong:
      "Growth advice treats supply as someone else's problem. So brands scale demand faster than they can deliver, and every new customer becomes a disappointed one.",
    help: "We look at your business from the warehouse out, not the ad account in. Which products drive the business, what it really costs to deliver each one, and where a single failure would stop everything. Then we fix those before we turn up growth.",
  },
  {
    key: "ops",
    index: "05",
    name: "Operational efficiency",
    pos: { left: "64.36%", top: "89.47%" },
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    headline: "The founder is usually the bottleneck, and usually the last person to see it.",
    note: "For years every decision at my company came through me. I thought I was being careful. I was actually the reason things were slow. Running three businesses at once forced me to change, because there simply wasn't enough of me.",
    wrong:
      "Founders are told to “delegate”. But you can't hand over what was never written down. Delegation without systems just means the same mistakes, made by someone else.",
    help: "I show you how I run three companies without being in every room: which decisions only a founder should make, which processes need to be written down first, and a weekly rhythm that tells you what's going wrong before it becomes a fire.",
  },
  {
    key: "rev",
    index: "06",
    name: "Revenue growth",
    pos: { left: "35.64%", top: "89.47%" },
    icon: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    headline: "When revenue is stuck, the answer is usually inside the business, not outside it.",
    note: "Every business I've built has hit a ceiling. Each time, my instinct was to find new customers. Each time, the real growth came from something already there: a price we hadn't raised, customers we'd stopped looking after, an offer we hadn't packaged properly.",
    wrong:
      "Growth advice loves new things: new channels, new markets, new products. New is exciting. It's also expensive and slow. The fastest revenue is usually sitting in your existing customer list.",
    help: "We look at who already buys from you, why they stay and why they leave. Then we pick one or two levers that can move revenue in the next two quarters, and drop everything else until they do.",
  },
  {
    key: "pro",
    index: "07",
    name: "Profit optimisation",
    pos: { left: "13.63%", top: "71.00%" },
    icon: '<path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    headline: "Being busy is not the same as being profitable, and growth often hides the difference.",
    note: "Across agency life and my own companies, I've seen businesses double revenue and end up with the same profit, sometimes less. Usually it's not one big leak. It's twenty small ones nobody looked at because the top line kept growing.",
    wrong:
      "Profit advice usually means “cut costs”. But the biggest margin problems are rarely in the cost line. They're in pricing, in which clients you keep, and in discounts that quietly became your real price.",
    help: "We look at profit by product, client and channel, the way I review my own businesses. Some customers will turn out to cost you money. Some products will deserve a higher price. Most founders find that saying no to the wrong revenue is the fastest way to grow profit.",
  },
  {
    key: "hr",
    index: "08",
    name: "People and culture",
    pos: { left: "8.64%", top: "42.71%" },
    icon: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 2 6 5.5"/>',
    headline: "People don't leave companies that are clear. They leave companies that are confusing.",
    note: "I've built teams in a tech company, a food brand and a compliance business. Different industries, very different people. The teams that stayed weren't the ones with the best perks. They were the ones where everyone knew what mattered, who decided what, and that salary would land on time.",
    wrong:
      "Culture advice focuses on values, offsites and perks. Those matter less than people think. What matters is clarity, fairness and a founder who genuinely hands over ownership.",
    help: "I help you set clear goals for every person, get the basics of payroll and compliance right (I run a compliance business, so this part is close to home), and hire for the stage you're in, not the stage you hope to be in.",
  },
  {
    key: "prd",
    index: "09",
    name: "Productivity",
    pos: { left: "23.00%", top: "17.83%" },
    icon: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
    headline: "A team's output is decided in the founder's calendar, not on the employees' desks.",
    note: "I learned this running multiple businesses at once. When my priorities were unclear, my teams were busy but nothing important moved. When I was clear, the same people delivered twice as much without working longer.",
    wrong:
      "Productivity advice focuses on employees: tools, tracking, longer hours. But teams mirror the founder. If the top is unclear, no app will fix the bottom.",
    help: "We start with your week, not your team's. Three priorities, fewer meetings, clear owners. Then we roll the same rhythm down to every team, and measure what got delivered, not how long people stayed online.",
  },
];

export const AREA_NAMES = AREAS.map((a) => a.name);

export function findArea(key?: string | null): Area | undefined {
  return key ? AREAS.find((a) => a.key === key) : undefined;
}
