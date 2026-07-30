import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../backends/task-backend.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../shared/write-if-changed.js";
import { fileExists, isRecord, parseJsonlLines, readText } from "./context-utils.js";
import { alreadyHarvestedUnchanged } from "./harvest-tasks-markers.js";
import {
  normalizeDateKey,
  normalizeTags,
  parseLimit,
  type ContextHarvestTasksParsed,
  type HarvestOutput,
  type HarvestReport,
  type HarvestTask,
} from "./harvest-tasks-model.js";

export { buildOutput } from "./harvest-tasks-builders.js";
export type {
  ContextHarvestTasksParsed,
  HarvestOutput,
  HarvestReport,
  HarvestTask,
} from "./harvest-tasks-model.js";

function asTaskList(value: TaskData[]): HarvestTask[] {
  return value
    .filter((task): task is HarvestTask => {
      return typeof task.id === "string" && typeof task.title === "string";
    })
    .map((task) => ({ ...task, status: String(task.status ?? "") }));
}

function taskMatches(task: HarvestTask, opts: ContextHarvestTasksParsed): boolean {
  const statuses = opts.status.length > 0 ? opts.status : ["DONE"];
  if (!statuses.some((status) => status.toUpperCase() === task.status.toUpperCase())) return false;
  if (opts.task.length > 0 && !opts.task.includes(task.id)) return false;
  const tags = new Set(normalizeTags(task.tags));
  if (opts.tag.length > 0 && !opts.tag.some((tag) => tags.has(tag))) return false;
  const key = task.id.slice(0, 12);
  const since = normalizeDateKey(opts.since);
  const until = normalizeDateKey(opts.until);
  if (since && key < since) return false;
  if (until && key > until) return false;
  if (opts.afterTask && task.id <= opts.afterTask) return false;
  return true;
}

async function readJsonlRecords(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  return parseJsonlLines(await readText(filePath));
}

async function mergeJsonl(filePath: string, rows: Record<string, unknown>[]): Promise<boolean> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const incoming = new Map(rows.map((row) => [String(row.id), row]));
  const records = await readJsonlRecords(filePath);
  const existing = records.filter((row) => !incoming.has(String(row.id)));
  const merged = [...existing, ...rows].toSorted((a, b) =>
    String(a.id).localeCompare(String(b.id)),
  );
  const text =
    merged.map((row) => JSON.stringify(row)).join("\n") + (merged.length > 0 ? "\n" : "");
  return await writeTextIfChanged(filePath, text);
}

export function selectTaskCandidates(
  tasks: TaskData[],
  parsed: ContextHarvestTasksParsed,
): HarvestTask[] {
  return asTaskList(tasks).filter((task) => taskMatches(task, parsed));
}

export function selectTasks(tasks: TaskData[], parsed: ContextHarvestTasksParsed): HarvestTask[] {
  const limit = parseLimit(parsed.limit);
  const selected = selectTaskCandidates(tasks, parsed)
    .filter((task) => !alreadyHarvestedUnchanged(task, parsed))
    .toSorted((a, b) => a.id.localeCompare(b.id));
  return limit === null ? selected : selected.slice(0, limit);
}

export async function writeOutputs(root: string, output: HarvestOutput): Promise<string[]> {
  const changed: string[] = [];
  await mkdir(path.join(root, "context/raw/tasks"), { recursive: true });
  for (const row of output.evidence) {
    const rel = `context/raw/tasks/${row.id}.json`;
    if (await writeJsonStableIfChanged(path.join(root, rel), row)) changed.push(rel);
  }

  await mkdir(path.dirname(path.join(root, output.reportPath)), { recursive: true });
  if (await writeJsonStableIfChanged(path.join(root, output.reportPath), output.report)) {
    changed.push(output.reportPath);
  }
  for (const proposal of output.proposals) {
    const rel = `.agentplane/context/derived/proposals/task-knowledge/${proposal.id}.json`;
    if (await writeJsonStableIfChanged(path.join(root, rel), proposal)) changed.push(rel);
  }
  if (
    await mergeJsonl(
      path.join(root, ".agentplane/context/derived/ingestion/tasks.jsonl"),
      output.ledgerRows,
    )
  ) {
    changed.push(".agentplane/context/derived/ingestion/tasks.jsonl");
  }
  return changed;
}

export function renderText(
  output: HarvestOutput,
  changed: string[],
  extraction?: { planned: number; created: string[] },
): string {
  return [
    "context harvest tasks",
    `- selected tasks: ${output.report.counts.selected_tasks}`,
    `- knowledge proposals: ${output.report.counts.proposals}`,
    `- consolidation required: ${output.report.counts.consolidation_required}`,
    `- selection gate: ${output.report.selection_gate.state}`,
    `- CURATOR work orders: ${extraction?.planned ?? 0}`,
    `- created extraction tasks: ${extraction?.created.length ?? 0}`,
    ...(extraction?.created ?? []).map((item) => `  - ${item}`),
    "- publication: CURATOR semantic result followed by CLI supervision only",
    `- changed paths: ${changed.length}`,
    ...changed.map((item) => `  - ${item}`),
  ].join("\n");
}

export async function readHarvestReport(filePath: string): Promise<HarvestReport | null> {
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    if (!isRecord(parsed) || parsed.generated_by !== "context.harvest.tasks") return null;
    if (!isRecord(parsed.selection_gate) || !Array.isArray(parsed.source_refs)) return null;
    return parsed as HarvestReport;
  } catch {
    return null;
  }
}
