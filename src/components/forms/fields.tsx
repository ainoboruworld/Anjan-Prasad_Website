import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Reusable, react-hook-form-aware fields in the prototype's `.fm label` shape:
 * the label text wraps the control. Presentational only — validation is Zod.
 */
type Base = { label: string; error?: string; required?: boolean; registration: UseFormRegisterReturn };

function Req({ required }: { required?: boolean }) {
  return required ? (
    <i className="req" aria-hidden>
      *
    </i>
  ) : null;
}

function Err({ id, error }: { id: string; error?: string }) {
  return error ? (
    <span className="err" id={id} role="alert">
      {error}
    </span>
  ) : null;
}

export function TextField({
  label,
  error,
  required,
  registration,
  ...props
}: Base & InputHTMLAttributes<HTMLInputElement>) {
  const errId = `${registration.name}-err`;
  return (
    <label>
      <span className="lbl">
        {label}
        <Req required={required} />
      </span>
      <input aria-invalid={Boolean(error)} aria-describedby={error ? errId : undefined} {...registration} {...props} />
      <Err id={errId} error={error} />
    </label>
  );
}

export function TextareaField({
  label,
  error,
  required,
  registration,
  ...props
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errId = `${registration.name}-err`;
  return (
    <label>
      <span className="lbl">
        {label}
        <Req required={required} />
      </span>
      <textarea aria-invalid={Boolean(error)} aria-describedby={error ? errId : undefined} {...registration} {...props} />
      <Err id={errId} error={error} />
    </label>
  );
}

export function SelectField({
  label,
  error,
  required,
  registration,
  options,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }) {
  const errId = `${registration.name}-err`;
  return (
    <label>
      <span className="lbl">
        {label}
        <Req required={required} />
      </span>
      <select aria-invalid={Boolean(error)} aria-describedby={error ? errId : undefined} {...registration} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Err id={errId} error={error} />
    </label>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: string }) {
  return (
    <button className="cta" type="submit" disabled={pending}>
      {pending ? "Sending…" : children} <span>→</span>
    </button>
  );
}
