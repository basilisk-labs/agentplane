import type { TaskData } from "../../../backends/task-backend.js";
import type { PrHandoffNote } from "./note-store.js";
import { extractTaskSuffix, parseTaskSubjectTemplate } from "@agentplaneorg/core/commit";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

const AUTO_SUMMARY_START = "<!-- BEGIN AUTO SUMMARY -->";
const AUTO_SUMMARY_END = "<!-- END AUTO SUMMARY -->";
const SUMMARY_SECTION = "## Summary";
const SCOPE_SECTION = "## Scope";
const VERIFICATION_SECTION = "## Verification";
const RISKS_SECTION = "## Risks";
const HANDOFF_NOTES_MARKER = "## Handoff Notes";
const TASK_ID_SUFFIX_PATTERN = /\s*\[[^\]]+\]\s*$/u;

function sectionText(task: TaskData, name: string, fallback: string): string {
  const value = typeof task.sections?.[name] === "string" ? task.sections[name].trim() : "";
  return value || fallback;
}

function normalizeOneLine(value: string, maxChars: number): string {
  const trimmed = value.trim().replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed.length > maxChars ? `${trimmed.slice(0, Math.max(1, maxChars - 3))}...` : trimmed;
}

function defaultPrTitleEmojiForStatus(status: string): string {
  const normalized = normalizeTaskStatus(status);
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}

function renderVerificationSummary(task: TaskData): string {
  const state = task.verification?.state ?? "pending";
  const note = typeof task.verification?.note === "string" ? task.verification.note.trim() : "";
  const commands = Array.isArray(task.verify)
    ? task.verify.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      )
    : [];
  const plan = sectionText(
    task,
    "Verify Steps",
    commands.length > 0
      ? commands.map((command) => `- ${command.trim()}`).join("\n")
      : "- Not recorded.",
  );
  const statusLine =
    state === "ok"
      ? note || "Recorded as passed."
      : state === "needs_rework"
        ? note || "Recorded as needs rework."
        : note || "Not recorded yet.";
  return [
    "### Plan",
    "",
    plan,
    "",
    "### Current Status",
    "",
    `- State: ${state}`,
    `- Note: ${statusLine}`,
  ].join("\n");
}

function renderRiskSummary(task: TaskData): string {
  const riskLevel = typeof task.risk_level === "string" ? task.risk_level : "not recorded";
  const rollbackPlan = sectionText(
    task,
    "Rollback Plan",
    "- Revert task-related commit(s) if rollback is required.",
  );
  return [
    `- Risk level: ${riskLevel}`,
    `- Breaking change: ${task.breaking === true ? "yes" : "no"}`,
    "",
    "### Rollback",
    "",
    rollbackPlan,
  ].join("\n");
}

function renderReviewSections(opts: { task: TaskData; handoffNotes: PrHandoffNote[] }): string[] {
  return [
    SUMMARY_SECTION,
    "",
    sectionText(opts.task, "Summary", opts.task.title.trim() || "- Not recorded."),
    "",
    SCOPE_SECTION,
    "",
    sectionText(opts.task, "Scope", "- Not recorded."),
    "",
    VERIFICATION_SECTION,
    "",
    renderVerificationSummary(opts.task),
    "",
    RISKS_SECTION,
    "",
    renderRiskSummary(opts.task),
    "",
    HANDOFF_NOTES_MARKER,
    "",
    ...renderPrHandoffNotes(opts.handoffNotes),
    "",
  ];
}

function renderRelatedTasks(primaryTaskId: string, relatedTaskIds: string[]): string[] {
  const ids = relatedTaskIds.filter((id) => id !== primaryTaskId);
  if (ids.length === 0) return [];
  return [
    "## Related Tasks",
    "",
    `- Primary: \`${primaryTaskId}\``,
    ...ids.map((id) => `- Included: \`${id}\``),
    "",
  ];
}

function renderGithubVerificationSummary(task: TaskData): string {
  const state = task.verification?.state ?? "pending";
  const note = typeof task.verification?.note === "string" ? task.verification.note.trim() : "";
  const statusLine =
    state === "ok"
      ? note || "Recorded as passed."
      : state === "needs_rework"
        ? note || "Recorded as needs rework."
        : note || "Not recorded yet.";
  return [
    `- State: ${state}`,
    `- Note: ${statusLine}`,
    "- Full verification checklist lives in local review.md.",
  ].join("\n");
}

function renderGithubBodySections(opts: {
  task: TaskData;
  handoffNotes: PrHandoffNote[];
}): string[] {
  return [
    SUMMARY_SECTION,
    "",
    sectionText(opts.task, "Summary", opts.task.title.trim() || "- Not recorded."),
    "",
    SCOPE_SECTION,
    "",
    sectionText(opts.task, "Scope", "- Not recorded."),
    "",
    VERIFICATION_SECTION,
    "",
    renderGithubVerificationSummary(opts.task),
    "",
    HANDOFF_NOTES_MARKER,
    "",
    ...renderPrHandoffNotes(opts.handoffNotes),
    "",
  ];
}

export function buildGithubPrTitle(task: TaskData): string {
  const title = normalizeOneLine(task.title, 96) || "Untitled task";
  const suffix = extractTaskSuffix(task.id);
  return `${defaultPrTitleEmojiForStatus(task.status)} ${suffix || task.id} task: ${title} [${task.id}]`;
}

export function renderPrAutoSummary(opts: {
  updatedAt: string;
  branch: string;
  headSha: string | null;
  diffstat: string;
}): string {
  return [
    "<details>",
    "<summary>Raw evidence</summary>",
    "",
    `- Updated: ${opts.updatedAt}`,
    `- Branch: ${opts.branch}`,
    `- Head: ${opts.headSha ? opts.headSha.slice(0, 12) : "No commits yet"}`,
    "",
    "```text",
    opts.diffstat || "No changes detected.",
    "```",
    "",
    "</details>",
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
  task: TaskData;
  author?: string;
  createdAt: string;
  branch: string;
  relatedTaskIds?: string[];
  handoffNotes?: PrHandoffNote[];
  autoSummary: string;
}): string {
  return [
    "# PR Review",
    "",
    `Created: ${opts.createdAt || "UNKNOWN"}`,
    `Branch: ${opts.branch || "UNKNOWN"}`,
    "",
    ...renderRelatedTasks(opts.task.id, opts.relatedTaskIds ?? []),
    ...renderReviewSections({
      task: opts.task,
      handoffNotes: opts.handoffNotes ?? [],
    }),
    AUTO_SUMMARY_START,
    opts.autoSummary,
    AUTO_SUMMARY_END,
    "",
  ].join("\n");
}

export function renderGithubPrBody(opts: {
  task: TaskData;
  relatedTaskIds?: string[];
  handoffNotes?: PrHandoffNote[];
  autoSummary: string;
}): string {
  return [
    `Task: \`${opts.task.id}\``,
    `Title: ${normalizeOneLine(opts.task.title, 120) || "Untitled task"}`,
    "",
    ...renderRelatedTasks(opts.task.id, opts.relatedTaskIds ?? []),
    ...renderGithubBodySections({
      task: opts.task,
      handoffNotes: opts.handoffNotes ?? [],
    }),
    opts.autoSummary,
    "",
  ].join("\n");
}

export function validateReviewContents(review: string, errors: string[]): void {
  const requiredSections = [
    SUMMARY_SECTION,
    SCOPE_SECTION,
    VERIFICATION_SECTION,
    RISKS_SECTION,
    HANDOFF_NOTES_MARKER,
  ];
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

export function validateGithubPrBodyContents(body: string, errors: string[]): void {
  const requiredSections = [
    SUMMARY_SECTION,
    SCOPE_SECTION,
    VERIFICATION_SECTION,
    HANDOFF_NOTES_MARKER,
  ];
  for (const section of requiredSections) {
    if (!body.includes(section)) errors.push(`Missing section: ${section}`);
  }
  if (!body.includes("<details>")) {
    errors.push("Missing raw evidence details block");
  }
}

export function validateGithubPrTitleContents(
  title: string,
  taskId: string,
  errors: string[],
): void {
  const trimmed = title.trim();
  if (!trimmed) {
    errors.push("Missing GitHub PR title content");
    return;
  }

  const taskIdMarkerMatch = /\[([^\]]+)\]\s*$/u.exec(trimmed);
  if (!taskIdMarkerMatch?.[1]) {
    errors.push("Missing task id in GitHub PR title: expected [TASK-ID]");
    return;
  }
  if (taskIdMarkerMatch[1]?.trim() !== taskId) {
    errors.push(
      `GitHub PR title task id does not match artifact task id: ${taskIdMarkerMatch[1]?.trim()}`,
    );
  }

  const titleWithoutTaskId = trimmed.replace(TASK_ID_SUFFIX_PATTERN, "");
  const parsed = parseTaskSubjectTemplate(titleWithoutTaskId);
  if (!parsed) {
    errors.push("Invalid GitHub PR title format");
    return;
  }
  if (parsed.scope !== "task") {
    errors.push("Invalid GitHub PR title scope: expected task:");
  }
  const expectedSuffix = extractTaskSuffix(taskId);
  if (expectedSuffix && parsed.suffix.toLowerCase() !== expectedSuffix.toLowerCase()) {
    errors.push("GitHub PR title suffix does not match task id");
  }
}
