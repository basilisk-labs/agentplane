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
    "## Handoff Notes",
    "",
    "<!-- Add review notes here. -->",
    "",
    "<!-- BEGIN AUTO SUMMARY -->",
    "<!-- END AUTO SUMMARY -->",
    "",
  ].join("\n");
}

export function updateAutoSummaryBlock(text: string, summary: string): string {
  const start = "<!-- BEGIN AUTO SUMMARY -->";
  const end = "<!-- END AUTO SUMMARY -->";
  const startIdx = text.indexOf(start);
  const endIdx = text.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return `${text.trimEnd()}\n\n${start}\n${summary}\n${end}\n`;
  }
  const before = text.slice(0, startIdx + start.length);
  const after = text.slice(endIdx);
  return `${before}\n${summary}\n${after}`;
}

export function appendHandoffNote(review: string, note: string): string {
  const marker = "## Handoff Notes";
  const idx = review.indexOf(marker);
  if (idx === -1) return `${review.trimEnd()}\n\n${marker}\n\n- ${note}\n`;
  const head = review.slice(0, idx + marker.length);
  const tail = review.slice(idx + marker.length);
  const trimmedTail = tail.startsWith("\n") ? tail.slice(1) : tail;
  return `${head}\n\n- ${note}\n${trimmedTail}`;
}

export function validateReviewContents(review: string, errors: string[]): void {
  const requiredSections = ["## Summary", "## Checklist", "## Handoff Notes"];
  for (const section of requiredSections) {
    if (!review.includes(section)) errors.push(`Missing section: ${section}`);
  }
  if (!review.includes("<!-- BEGIN AUTO SUMMARY -->")) {
    errors.push("Missing auto summary start marker");
  }
  if (!review.includes("<!-- END AUTO SUMMARY -->")) {
    errors.push("Missing auto summary end marker");
  }
}
