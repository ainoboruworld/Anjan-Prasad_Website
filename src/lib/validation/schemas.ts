/**
 * Zod schemas — the single validation layer, shared by every form and
 * re-used server-side by the API routes. Validation lives here, never in
 * components.
 */
import { z } from "zod";
import { AREA_NAMES } from "@/lib/data/areas";

const emailField = z.string().trim().min(1, "Email is required").email("Please enter a valid email address");
const nameField = z.string().trim().min(2, "Please enter your name").max(120);
const phoneOptional = z
  .string()
  .trim()
  .max(24, "Please enter a valid phone number")
  .optional()
  .or(z.literal(""));
const phoneRequired = z
  .string()
  .trim()
  .min(7, "Please enter your phone number")
  .max(24, "Please enter a valid phone number");

export const STAGES = ["Idea stage", "Early revenue", "Growing", "Established"] as const;
export const HEARD_FROM = ["LinkedIn", "Instagram", "An article", "A friend or founder", "Other"] as const;
export const IDENTITIES = [
  "Running a business",
  "Building an early-stage startup",
  "Planning to start a business",
] as const;
export const CONSULT_AREAS = ["Not sure yet", ...AREA_NAMES] as const;
export const CONTACT_REASONS = ["Speaking or events", "Collaboration", "Press or media", "Something else"] as const;

/* ── Business advisory application ──────────────────────────────────────── */
export const advisorySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneRequired,
  company: z.string().trim().max(160).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  stage: z.enum(STAGES),
  area: z.string().trim().max(80).optional().or(z.literal("")),
  decision: z.string().trim().min(10, "Tell me a little more about the decision"),
  tried: z.string().trim().max(4000).optional().or(z.literal("")),
  heardFrom: z.enum(HEARD_FROM),
});
export type AdvisoryValues = z.infer<typeof advisorySchema>;

/* ── Consultation request ───────────────────────────────────────────────── */
export const consultationSchema = z.object({
  name: nameField,
  email: emailField,
  identity: z.enum(IDENTITIES),
  phone: phoneRequired,
  area: z.string().trim().min(1, "Pick an area"),
  decision: z.string().trim().min(10, "Tell me a little more about the decision"),
});
export type ConsultationValues = z.infer<typeof consultationSchema>;

/* ── Speaking invitation ────────────────────────────────────────────────── */
export const ENGAGEMENTS = [
  "Podcast",
  "Business school",
  "Tech school or university",
  "Conference or summit",
  "Corporate event",
] as const;
export const speakingSchema = z.object({
  name: nameField,
  email: emailField,
  organisation: z.string().trim().min(2, "Please name the organisation or show").max(160),
  engagement: z.enum(ENGAGEMENTS),
  date: z.string().trim().max(80).optional().or(z.literal("")),
  audience: z.string().trim().max(200).optional().or(z.literal("")),
  details: z.string().trim().min(10, "Tell me a little about the session you have in mind"),
});
export type SpeakingValues = z.infer<typeof speakingSchema>;

/* ── Contact ────────────────────────────────────────────────────────────── */
export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  reason: z.enum(CONTACT_REASONS),
  message: z.string().trim().min(10, "Please add a few lines so I can help"),
});
export type ContactValues = z.infer<typeof contactSchema>;

/* ── Newsletter ─────────────────────────────────────────────────────────── */
export const newsletterSchema = z.object({
  name: z.string().trim().max(120).optional().or(z.literal("")),
  email: emailField,
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;

/* ── API envelope ───────────────────────────────────────────────────────── */
export const LEAD_KINDS = ["advisory", "consultation", "mentorship", "speaking", "contact"] as const;
export type LeadKind = (typeof LEAD_KINDS)[number];

export const leadRequestSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("advisory"), values: advisorySchema, sourcePage: z.string().optional() }),
  z.object({ kind: z.literal("consultation"), values: consultationSchema, sourcePage: z.string().optional() }),
  z.object({ kind: z.literal("mentorship"), values: consultationSchema, sourcePage: z.string().optional() }),
  z.object({ kind: z.literal("speaking"), values: speakingSchema, sourcePage: z.string().optional() }),
  z.object({ kind: z.literal("contact"), values: contactSchema, sourcePage: z.string().optional() }),
]);
export type LeadRequest = z.infer<typeof leadRequestSchema>;
