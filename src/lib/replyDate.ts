/** Reply-window helpers for the confirmation panel. */

/** `n` working days (Mon–Fri) after `from`. */
export function addWorkingDays(from: Date, n: number): Date {
  const d = new Date(from);
  let left = n;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) left--;
  }
  d.setHours(18, 0, 0, 0);
  return d;
}

export function formatReplyDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function ics(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/** Download a one-event .ics the visitor can drop into any calendar. */
export function downloadReminder(at: Date, title: string, description: string) {
  const end = new Date(at.getTime() + 30 * 60_000);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Anjan Prasad//Reply reminder//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@anjanprasad.com`,
    `DTSTAMP:${ics(new Date())}`,
    `DTSTART:${ics(at)}`,
    `DTEND:${ics(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "URL:https://anjanprasad.com",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "anjan-reply-reminder.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
