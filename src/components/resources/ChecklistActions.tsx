"use client";

/** Print the checklist to PDF; the page's print stylesheet does the rest. */
export function ChecklistActions() {
  return (
    <div className="akeep">
      <div className="akeep-row">
        <span className="lab">Keep this one</span>
        <button type="button" className="akeep-btn" onClick={() => window.print()}>
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15h12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download as PDF
        </button>
      </div>
    </div>
  );
}
