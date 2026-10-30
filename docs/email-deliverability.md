# Why the emails land in spam, and how to fix it

The confirmation emails are currently sent through Gmail SMTP from
`hello.anjanprasad@gmail.com`. Gmail is fine for one-to-one mail, but
automated mail from a free Gmail address, with HTML, links and a display
name that does not match the domain, is exactly what spam filters flag.
No amount of copy changes fixes that on its own.

## What the code now does (merged)

- Every email carries a plain-text version alongside the HTML.
- Follow-up emails carry `List-Unsubscribe` and one-click unsubscribe headers,
  which Gmail and Outlook reward.
- Confirmation emails are short, personal and link-free apart from the footer.
- `REPLY_TO_EMAIL` (optional) sets the Reply-To on everything, so replies
  land where Anjan reads them even when the sender address is a system one.

## What has to change outside the code (one-time, about an hour)

1. **Send from the domain, not Gmail.** Use `hello@anjanprasad.com` (or
   `anjan@anjanprasad.com`). Two good options:
   - **Resend** (already supported: set `RESEND_API_KEY` and
     `RESEND_FROM_EMAIL="Anjan Prasad <hello@anjanprasad.com>"`, and remove
     `SMTP_USER`/`SMTP_PASS`). Resend shows you the exact DNS records to add.
   - **Google Workspace** on the domain, then keep SMTP but with the
     Workspace address and app password.
2. **Add the three DNS records** at the domain registrar. The provider gives
   the exact values:
   - **SPF**: `v=spf1 include:<provider> ~all`
   - **DKIM**: the CNAME or TXT the provider shows
   - **DMARC**: `_dmarc.anjanprasad.com` TXT `v=DMARC1; p=quarantine; rua=mailto:hello@anjanprasad.com`
3. **Warm up gently.** The first week, volume is naturally low; that is fine.
4. **Check** at mail-tester.com: send one confirmation to the address it
   gives you. Aim for 9/10 or better. Also look at Gmail Postmaster Tools
   once volume grows.

## Settings to set in Vercel

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | from Resend |
| `RESEND_FROM_EMAIL` | `Anjan Prasad <hello@anjanprasad.com>` |
| `REPLY_TO_EMAIL` | the inbox Anjan reads, e.g. `hello.anjanprasad@gmail.com` |
| `CRON_SECRET` | any long random string (follow-up journey) |

Remove `SMTP_USER` and `SMTP_PASS` once Resend is live, or the SMTP path
keeps being used first.
