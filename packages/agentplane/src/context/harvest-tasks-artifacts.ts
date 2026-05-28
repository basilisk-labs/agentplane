import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../backends/task-backend.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../shared/write-if-changed.js";
import { fileExists, isRecord, parseJsonlLines, readText } from "./context-utils.js";
import { alreadyQueuedForExtractionUnchanged } from "./harvest-tasks-extraction.js";
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

export function selectTasks(tasks: TaskData[], parsed: ContextHarvestTasksParsed): HarvestTask[] {
  const limit = parseLimit(parsed.limit);
  const selected = asTaskList(tasks)
    .filter((task) => taskMatches(task, parsed))
    .filter((task) =>
      parsed.createExtractionTasks
        ? !alreadyQueuedForExtractionUnchanged(task, parsed)
        : !alreadyHarvestedUnchanged(task, parsed),
    )
    .toSorted((a, b) => a.id.localeCompare(b.id));
  return limit === null ? selected : selected.slice(0, limit);
}

export async function writeOutputs(
  root: string,
  output: HarvestOutput,
  promote: boolean,
): Promise<string[]> {
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
  if (
    await mergeJsonl(
      path.join(root, ".agentplane/context/derived/ingestion/tasks.jsonl"),
      output.ledgerRows,
    )
  ) {
    changed.push(".agentplane/context/derived/ingestion/tasks.jsonl");
  }
  if (
    await mergeJsonl(path.join(root, ".agentplane/context/derived/facts/facts.jsonl"), output.facts)
  ) {
    changed.push(".agentplane/context/derived/facts/facts.jsonl");
  }
  if (
    await mergeJsonl(
      path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
      output.entities,
    )
  ) {
    changed.push(".agentplane/context/derived/graph/entities.jsonl");
  }
  if (
    await mergeJsonl(path.join(root, ".agentplane/context/derived/graph/edges.jsonl"), output.edges)
  ) {
    changed.push(".agentplane/context/derived/graph/edges.jsonl");
  }
  if (
    await mergeJsonl(
      path.join(root, ".agentplane/context/derived/graph/provenance_edges.jsonl"),
      output.provenance,
    )
  ) {
    changed.push(".agentplane/context/derived/graph/provenance_edges.jsonl");
  }
  await mkdir(path.dirname(path.join(root, output.wikiPath)), { recursive: true });
  if (await writeTextIfChanged(path.join(root, output.wikiPath), output.wikiProposal)) {
    changed.push(output.wikiPath);
  }
  if (promote && output.report.promotion_gate.state === "promoted") {
    await mkdir(path.dirname(path.join(root, output.promotedPath)), { recursive: true });
    const promoted = output.wikiProposal.replace(
      "promotion_state: proposal",
      "promotion_state: semi-canonical",
    );
    if (await writeTextIfChanged(path.join(root, output.promotedPath), promoted)) {
      changed.push(output.promotedPath);
    }
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
    `- facts: ${output.report.counts.facts}`,
    `- entities: ${output.report.counts.entities}`,
    `- edges: ${output.report.counts.edges}`,
    `- stale candidates: ${output.report.counts.stale_candidates}`,
    `- conflict candidates: ${output.report.counts.conflict_candidates}`,
    `- promotion gate: ${output.report.promotion_gate.state}`,
    `- extraction task batches: ${extraction?.planned ?? 0}`,
    `- created extraction tasks: ${extraction?.created.length ?? 0}`,
    ...(extraction?.created ?? []).map((item) => `  - ${item}`),
    `- proposal: ${output.wikiPath}`,
    `- promoted: ${output.report.promotion_gate.promoted_path ?? "not promoted"}`,
    `- changed paths: ${changed.length}`,
    ...changed.map((item) => `  - ${item}`),
  ].join("\n");
}

export async function readHarvestReport(filePath: string): Promise<HarvestReport | null> {
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    if (!isRecord(parsed) || parsed.generated_by !== "context.harvest.tasks") return null;
    if (!isRecord(parsed.promotion_gate) || !Array.isArray(parsed.source_refs)) return null;
    return parsed as HarvestReport;
  } catch {
    return null;
  }
}
