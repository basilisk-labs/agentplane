import type { PrHandoffNote } from "./note-store.js";

const AUTO_SUMMARY_START = "<!-- BEGIN AUTO SUMMARY -->";
const AUTO_SUMMARY_END = "<!-- END AUTO SUMMARY -->";
const HANDOFF_NOTES_MARKER = "## Handoff Notes";

export function renderPrReviewTemplate(opts: {
  author: string;
  createdAt: string;
  branch: string;
}): string {
  return [
    "# PR Review",
    "",
    `Opened by ${opts.author} on ${opts.createdAt}`,
    `Branch: ${opts.branch}`,
    "",
    "## Summary",
    "",
    "- ",
    "",
    "## Checklist",
    "",
    "- [ ] Tests added/updated",
    "- [ ] Lint/format passes",
    "- [ ] Verify passed",
    "- [ ] Docs updated (if needed)",
    "",
    HANDOFF_NOTES_MARKER,
    "",
    ...renderPrHandoffNotes([]),
    "",
    AUTO_SUMMARY_START,
    AUTO_SUMMARY_END,
    "",
  ].join("\n");
}

export function renderPrAutoSummary(opts: {
  updatedAt: string;
  branch: string;
  headSha: string | null;
  diffstat: string;
}): string {
  return [
    `- Updated: ${opts.updatedAt}`,
    `- Branch: ${opts.branch}`,
    `- Head: ${opts.headSha ? opts.headSha.slice(0, 12) : "No commits yet"}`,
    "- Diffstat:",
    "```",
    opts.diffstat || "No changes detected.",
    "```",
  ].join("\n");
}

export function updateAutoSummaryBlock(text: string, summary: string): string {
  const startIdx = text.indexOf(AUTO_SUMMARY_START);
  const endIdx = text.indexOf(AUTO_SUMMARY_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return `${text.trimEnd()}\n\n${AUTO_SUMMARY_START}\n${summary}\n${AUTO_SUMMARY_END}\n`;
  }
  const before = text.slice(0, startIdx + AUTO_SUMMARY_START.length);
  const after = text.slice(endIdx);
  return `${before}\n${summary}\n${after}`;
}

export function extractAutoSummaryBlock(text: string): string | null {
  const startIdx = text.indexOf(AUTO_SUMMARY_START);
  const endIdx = text.indexOf(AUTO_SUMMARY_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return null;
  return text.slice(startIdx + AUTO_SUMMARY_START.length, endIdx).trim();
}

function formatNoteTimestamp(value: string): string {
  return value.replace(/\.\d{3}Z$/, "Z");
}

export function renderPrHandoffNotes(notes: PrHandoffNote[]): string[] {
  if (notes.length === 0) {
    return ["- No handoff notes recorded yet. Use `agentplane pr note ...` to append one."];
  }
  return notes.map(
    (note) => `- ${formatNoteTimestamp(note.created_at)} ${note.author}: ${note.body}`,
  );
}

export function updateHandoffNotesBlock(text: string, notes: PrHandoffNote[]): string {
  const markerIdx = text.indexOf(HANDOFF_NOTES_MARKER);
  const nextIdx =
    markerIdx === -1
      ? text.indexOf(AUTO_SUMMARY_START)
      : text.indexOf(AUTO_SUMMARY_START, markerIdx);
  const renderedNotes = renderPrHandoffNotes(notes).join("\n");
  if (markerIdx === -1) {
    if (nextIdx === -1) {
      return `${text.trimEnd()}\n\n${HANDOFF_NOTES_MARKER}\n\n${renderedNotes}\n`;
    }
    return `${text.slice(0, nextIdx).trimEnd()}\n\n${HANDOFF_NOTES_MARKER}\n\n${renderedNotes}\n\n${text.slice(nextIdx)}`;
  }
  const before = text.slice(0, markerIdx + HANDOFF_NOTES_MARKER.length);
  const after = nextIdx === -1 ? "" : text.slice(nextIdx);
  return `${before}\n\n${renderedNotes}\n\n${after}`.trimEnd() + "\n";
}

export function renderPrReviewDocument(opts: {
  existingReview: string | null;
  author?: string;
  createdAt: string;
  branch: string;
  handoffNotes?: PrHandoffNote[];
  autoSummary?: string | null;
}): string {
  const baseReview =
    opts.existingReview ??
    renderPrReviewTemplate({
      author: (opts.author ?? "").trim() || "UNKNOWN",
      createdAt: opts.createdAt,
      branch: opts.branch,
    });
  const withNotes = updateHandoffNotesBlock(baseReview, opts.handoffNotes ?? []);
  return opts.autoSummary ? updateAutoSummaryBlock(withNotes, opts.autoSummary) : withNotes;
}

export function validateReviewContents(review: string, errors: string[]): void {
  const requiredSections = ["## Summary", "## Checklist", HANDOFF_NOTES_MARKER];
  for (const section of requiredSections) {
    if (!review.includes(section)) errors.push(`Missing section: ${section}`);
  }
  if (!review.includes(AUTO_SUMMARY_START)) {
    errors.push("Missing auto summary start marker");
  }
  if (!review.includes(AUTO_SUMMARY_END)) {
    errors.push("Missing auto summary end marker");
  }
}
