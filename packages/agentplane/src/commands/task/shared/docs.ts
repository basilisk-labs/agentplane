import type { AgentplaneConfig } from "@agentplaneorg/core";

import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import type { TaskData } from "../../../backends/task-backend.js";

export function nowIso(): string {
  return new Date().toISOString();
}

export const VERIFY_STEPS_PLACEHOLDER =
  "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->";
export const VERIFICATION_RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";
export const VERIFICATION_RESULTS_END = "<!-- END VERIFICATION RESULTS -->";
export type TaskDocVersion = 2 | 3;

export function extractDocSection(doc: string, sectionName: string): string | null {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  let capturing = false;
  const out: string[] = [];

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (capturing) break;
      capturing = (match[1] ?? "").trim() === sectionName;
      continue;
    }
    if (capturing) out.push(line);
  }

  if (!capturing) return null;
  return out.join("\n").trimEnd();
}

export function isVerifyStepsFilled(sectionText: string | null): boolean {
  const normalized = (sectionText ?? "").trim();
  if (!normalized) return false;
  if (normalized.includes(VERIFY_STEPS_PLACEHOLDER)) return false;
  return true;
}

export function normalizeTaskDocVersion(
  value: unknown,
  fallback: TaskDocVersion = 2,
): TaskDocVersion {
  return value === 3 ? 3 : value === 2 ? 2 : fallback;
}

export function normalizeVerificationSectionLayout(
  sectionText: string | null,
  version: TaskDocVersion,
): string {
  const normalized = (sectionText ?? "").replaceAll("\r\n", "\n").trimEnd();

  if (version === 3) {
    const stripped = normalized
      .split("\n")
      .filter((line) => {
        const trimmed = line.trim();
        return trimmed !== "### Plan" && trimmed !== "### Results";
      })
      .join("\n")
      .replaceAll(/\n{3,}/g, "\n\n")
      .trim();

    if (!stripped) return [VERIFICATION_RESULTS_BEGIN, VERIFICATION_RESULTS_END].join("\n");

    const hasBegin = stripped.includes(VERIFICATION_RESULTS_BEGIN);
    const hasEnd = stripped.includes(VERIFICATION_RESULTS_END);
    if (hasBegin && hasEnd) return stripped;

    return [stripped, "", VERIFICATION_RESULTS_BEGIN, VERIFICATION_RESULTS_END].join("\n");
  }

  if (!normalized) {
    return [
      "### Plan",
      "",
      "",
      "### Results",
      "",
      "",
      VERIFICATION_RESULTS_BEGIN,
      VERIFICATION_RESULTS_END,
    ].join("\n");
  }

  const hasBegin = normalized.includes(VERIFICATION_RESULTS_BEGIN);
  const hasEnd = normalized.includes(VERIFICATION_RESULTS_END);
  if (hasBegin && hasEnd) return normalized;

  return [normalized, "", VERIFICATION_RESULTS_BEGIN, VERIFICATION_RESULTS_END].join("\n");
}

export function taskObservationSectionName(version: TaskDocVersion): "Notes" | "Findings" {
  return version === 3 ? "Findings" : "Notes";
}

export function extractTaskObservationSection(doc: string, version: TaskDocVersion): string | null {
  const primary = taskObservationSectionName(version);
  const fallback = primary === "Findings" ? "Notes" : "Findings";
  return extractDocSection(doc, primary) ?? extractDocSection(doc, fallback);
}

const DOC_PLACEHOLDER_RE = /<!--\s*TODO\b/i;
const DOC_SECTIONS_AUTO_MANAGED = new Set(["verification"]);
const DOC_SECTIONS_CONDITIONAL = new Set(["verify steps", "notes"]);

export function isDocSectionFilled(sectionText: string | null): boolean {
  const normalized = (sectionText ?? "").trim();
  if (!normalized) return false;
  if (DOC_PLACEHOLDER_RE.test(normalized)) return false;
  return true;
}

export function ensureAgentFilledRequiredDocSections(opts: {
  task: Pick<TaskData, "id">;
  config: AgentplaneConfig;
  doc: string;
  action: string;
}): void {
  const required = dedupeStrings(
    (opts.config.tasks.doc.required_sections ?? [])
      .map((section) => String(section ?? "").trim())
      .filter(Boolean),
  );
  const missing: string[] = [];

  for (const section of required) {
    const normalizedSection = section.trim().toLowerCase();
    if (DOC_SECTIONS_AUTO_MANAGED.has(normalizedSection)) continue;
    if (DOC_SECTIONS_CONDITIONAL.has(normalizedSection)) continue;

    const sectionText = extractDocSection(opts.doc, section);
    if (!isDocSectionFilled(sectionText)) {
      missing.push(section);
    }
  }

  if (missing.length === 0) return;

  const sectionList = missing.map((section) => `## ${section}`).join(", ");
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `${opts.task.id}: cannot ${opts.action}: required task doc sections are missing/empty: ${sectionList} ` +
      `(fill via \`agentplane task doc set ${opts.task.id} --section <name> --text "..."\`)`,
  });
}
