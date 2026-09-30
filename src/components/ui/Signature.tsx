import { ApMark } from "../brand/ApMark";

/** Small mark + "Anjan" used as a sign-off under section intros. */
export function Signature({ label = "Anjan" }: { label?: string }) {
  return (
    <div className="sig">
      <ApMark />
      <span>{label}</span>
    </div>
  );
}
