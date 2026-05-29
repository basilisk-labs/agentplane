import { createHash } from "node:crypto";

import {
  normalizeVerificationSectionLayout,
  VERIFICATION_RESULTS_BEGIN,
  VERIFICATION_RESULTS_END,
} from "./docs.js";

export function appendVerificationEntryBetweenMarkers(
  sectionText: string,
  entryText: string,
  version: 2 | 3,
): string {
  const ensured = normalizeVerificationSectionLayout(sectionText, version);
  const beginIdx = ensured.indexOf(VERIFICATION_RESULTS_BEGIN);
  const endIdx = ensured.indexOf(VERIFICATION_RESULTS_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Verification results markers are malformed");
  }

  const beforeEnd = ensured.slice(0, endIdx).trimEnd();
  const afterEnd = ensured.slice(endIdx).trimStart();
  const entry = entryText.trimEnd();

  const parts: string[] = [
    beforeEnd,
    ...(beforeEnd.endsWith(VERIFICATION_RESULTS_BEGIN) ? [] : [""]),
    entry,
    "",
    afterEnd,
  ];
  return parts.join("\n").trimEnd();
}

function trimLineEndings(text: string): string {
  return text
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

export function renderVerificationEntry(opts: {
  at: string;
  state: "ok" | "needs_rework" | "blocked_external";
  attempts: number;
  by: string;
  note: string;
  details?: string | null;
  verifyStepsRef?: string | null;
}): string {
  const lines = [
    `### ${opts.at} — VERIFY — ${opts.state}`,
    "",
    `By: ${opts.by}`,
    "",
    `Note: ${opts.note}`,
    `Attempts: ${opts.attempts}`,
  ];
  const verifyStepsRef = (opts.verifyStepsRef ?? "").trim();
  if (verifyStepsRef) {
    lines.push("", `VerifyStepsRef: ${verifyStepsRef}`);
  }
  const details = trimLineEndings(opts.details ?? "");
  if (details) {
    lines.push("", "Details:", "", details);
  }
  return `${trimLineEndings(lines.join("\n"))}\n`;
}

export function sha256Hex(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
