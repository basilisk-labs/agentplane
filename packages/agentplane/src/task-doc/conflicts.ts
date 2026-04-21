import { taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import { exitCodeForError } from "../cli/exit-codes.js";

import { CliError } from "../shared/errors.js";

function normalizeDocComparison(text: string | null | undefined): string {
  return String(text ?? "")
    .replaceAll("\r\n", "\n")
    .trim();
}

export function assertExpectedTaskDoc(opts: {
  taskId: string;
  currentDoc: string;
  expectedDoc: string | null | undefined;
}): void {
  if (normalizeDocComparison(opts.currentDoc) === normalizeDocComparison(opts.expectedDoc)) return;
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task README changed concurrently: ${opts.taskId} ` +
      "(re-read the task and re-apply your change)",
    context: {
      task_id: opts.taskId,
      reason_code: "task_readme_conflict",
    },
  });
}

export function assertExpectedTaskSection(opts: {
  taskId: string;
  currentDoc: string;
  section: string;
  expectedText: string | null | undefined;
}): void {
  const currentSections = taskDocToSectionMap(opts.currentDoc);
  const currentSection = normalizeDocComparison(currentSections[opts.section] ?? null);
  const expectedSection = normalizeDocComparison(opts.expectedText);
  if (currentSection === expectedSection) return;
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task README section changed concurrently: ${opts.taskId} ## ${opts.section} ` +
      "(re-read the task and re-apply your change)",
    context: {
      task_id: opts.taskId,
      section: opts.section,
      reason_code: "task_readme_section_conflict",
    },
  });
}
