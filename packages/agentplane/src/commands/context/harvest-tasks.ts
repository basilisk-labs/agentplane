/* eslint-disable unicorn/no-array-sort */
import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { fileExists, isRecord, parseJsonlLines, readText } from "./context-utils.js";

export type ContextHarvestTasksParsed = {
  status: string[];
  tag: string[];
  task: string[];
  since: string;
  until: string;
  afterTask: string;
  limit: string;
  writeProposals: boolean;
  promote: boolean;
  dryRun: boolean;
  format: "text" | "json";
};

type HarvestTask = TaskData & {
  id: string;
  title: string;
  status: string;
};

type TaskEvidence = {
  id: string;
  title: string;
  status: string;
  owner: string | null;
  priority: string | null;
  tags: string[];
  task_kind: string | null;
  mutation_scope: string | null;
  blueprint_request: string | null;
  commit: { hash?: string; message?: string } | null;
  source_refs: string[];
  extracted_at: string;
  text_digest: string;
  excerpts: string[];
};

type HarvestFact = {
  id: string;
  kind: "completed_task_claim";
  subject: string;
  predicate: "recorded_outcome";
  object: string;
  claim: string;
  status: "active" | "stale_candidate" | "conflict_candidate";
  confidence: number;
  source_refs: string[];
  task_id: string;
  tags: string[];
  generated_by: "context.harvest.tasks";
  promotion_state: "proposal";
  stale_marker?: string;
  conflict_markers?: string[];
};

type GraphRow = Record<string, unknown> & { id: string; source_refs: string[] };

type HarvestOutput = {
  selected: HarvestTask[];
  evidence: TaskEvidence[];
  facts: HarvestFact[];
  entities: GraphRow[];
  edges: GraphRow[];
  provenance: GraphRow[];
  wikiProposal: string;
  wikiPath: string;
  promotedPath: string;
  report: HarvestReport;
};

type HarvestReport = {
  schema_version: 1;
  generated_by: "context.harvest.tasks";
  generated_at: string;
  mode: {
    statuses: string[];
    tags: string[];
    tasks: string[];
    since: string | null;
    until: string | null;
    after_task: string | null;
    limit: number | null;
    order: "oldest_first";
  };
  counts: {
    selected_tasks: number;
    facts: number;
    entities: number;
    edges: number;
    provenance_edges: number;
    stale_candidates: number;
    conflict_candidates: number;
    promotion_blockers: number;
  };
  promotion_gate: {
    state: "proposal" | "promoted" | "blocked";
    blockers: string[];
    warnings: string[];
    proposal_path: string;
    promoted_path: string | null;
  };
  source_refs: string[];
};

function normalizeTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value
        .map(String)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

function taskDateKey(taskId: string): string {
  return taskId.slice(0, 12);
}

function normalizeDateKey(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed
    .replaceAll(/[^0-9]/gu, "")
    .slice(0, 12)
    .padEnd(12, "0");
}

function parseLimit(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid --limit value: ${value}`,
    });
  }
  return parsed;
}

function slug(value: string): string {
  const out = value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
  return out || "all";
}

function stableHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function normalizeClaim(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[`*_()[\]{}:;,.!?/\\|-]+/gu, " ")
    .replaceAll(/\s+/gu, " ");
}

function asTaskList(value: TaskData[]): HarvestTask[] {
  return value
    .filter((task): task is HarvestTask => {
      return typeof task.id === "string" && typeof task.title === "string";
    })
    .map((task) => ({
      ...task,
      status: String(task.status ?? ""),
    }));
}

function taskMatches(task: HarvestTask, opts: ContextHarvestTasksParsed): boolean {
  const statuses = opts.status.length > 0 ? opts.status : ["DONE"];
  if (!statuses.some((status) => status.toUpperCase() === task.status.toUpperCase())) return false;
  if (opts.task.length > 0 && !opts.task.includes(task.id)) return false;
  const tags = new Set(normalizeTags(task.tags));
  if (opts.tag.length > 0 && !opts.tag.some((tag) => tags.has(tag))) return false;
  const key = taskDateKey(task.id);
  const since = normalizeDateKey(opts.since);
  const until = normalizeDateKey(opts.until);
  if (since && key < since) return false;
  if (until && key > until) return false;
  if (opts.afterTask && task.id <= opts.afterTask) return false;
  return true;
}

function sectionText(task: TaskData, section: string): string {
  const sections = isRecord(task.sections) ? task.sections : {};
  const value = sections[section];
  return typeof value === "string" ? value.trim() : "";
}

function taskText(task: HarvestTask): string {
  const parts = [
    task.title,
    typeof task.description === "string" ? task.description : "",
    sectionText(task, "Summary"),
    sectionText(task, "Plan"),
    sectionText(task, "Verification"),
    sectionText(task, "Findings"),
    task.commit && typeof task.commit.message === "string" ? task.commit.message : "",
  ];
  if (Array.isArray(task.comments)) {
    for (const comment of task.comments) {
      if (isRecord(comment) && typeof comment.body === "string") parts.push(comment.body);
    }
  }
  return parts.filter((part) => part.trim()).join("\n\n");
}

function excerptLines(text: string): string[] {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length >= 24)
    .slice(0, 6);
}

function taskSourceRefs(task: HarvestTask): string[] {
  const refs = [`.agentplane/tasks/${task.id}/README.md`];
  if (task.commit && typeof task.commit.hash === "string" && task.commit.hash.trim()) {
    refs.push(`commit:${task.commit.hash.trim()}`);
  }
  return refs;
}

function buildEvidence(task: HarvestTask, now: string): TaskEvidence {
  const text = taskText(task);
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    owner: typeof task.owner === "string" ? task.owner : null,
    priority: typeof task.priority === "string" ? task.priority : null,
    tags: normalizeTags(task.tags),
    task_kind: typeof task.task_kind === "string" ? task.task_kind : null,
    mutation_scope: typeof task.mutation_scope === "string" ? task.mutation_scope : null,
    blueprint_request: typeof task.blueprint_request === "string" ? task.blueprint_request : null,
    commit: task.commit && isRecord(task.commit) ? task.commit : null,
    source_refs: taskSourceRefs(task),
    extracted_at: now,
    text_digest: `sha256:${createHash("sha256").update(text).digest("hex")}`,
    excerpts: excerptLines(text),
  };
}

function conflictMap(evidence: TaskEvidence[]): Map<string, string[]> {
  const byClaim = new Map<string, string[]>();
  for (const row of evidence) {
    const key = normalizeClaim(row.title);
    byClaim.set(key, [...(byClaim.get(key) ?? []), row.id]);
  }
  return new Map([...byClaim].filter(([, ids]) => ids.length > 1));
}

function buildFact(row: TaskEvidence, conflicts: Map<string, string[]>): HarvestFact {
  const duplicateIds = conflicts.get(normalizeClaim(row.title)) ?? [];
  const staleMarker =
    row.commit?.hash || row.excerpts.length > 0
      ? undefined
      : "Task lacks commit hash and extracted body evidence; review before promotion.";
  const conflictMarkers =
    duplicateIds.length > 1
      ? [`Similar completed task title found in: ${duplicateIds.join(", ")}`]
      : undefined;
  return {
    id: `task_fact_${row.id}`,
    kind: "completed_task_claim",
    subject: `task:${row.id}`,
    predicate: "recorded_outcome",
    object: row.title,
    claim: `${row.id} recorded completed work: ${row.title}`,
    status: conflictMarkers ? "conflict_candidate" : staleMarker ? "stale_candidate" : "active",
    confidence: conflictMarkers ? 0.55 : staleMarker ? 0.6 : 0.82,
    source_refs: row.source_refs,
    task_id: row.id,
    tags: row.tags,
    generated_by: "context.harvest.tasks",
    promotion_state: "proposal",
    stale_marker: staleMarker,
    conflict_markers: conflictMarkers,
  };
}

function buildGraph(
  evidence: TaskEvidence[],
  facts: HarvestFact[],
): {
  entities: GraphRow[];
  edges: GraphRow[];
  provenance: GraphRow[];
} {
  const entityRows = new Map<string, GraphRow>();
  const edges: GraphRow[] = [];
  const provenance: GraphRow[] = [];
  for (const row of evidence) {
    entityRows.set(`task:${row.id}`, {
      id: `task:${row.id}`,
      type: "task",
      label: row.title,
      task_id: row.id,
      source_refs: row.source_refs,
      generated_by: "context.harvest.tasks",
    });
    for (const tag of row.tags) {
      entityRows.set(`tag:${tag}`, {
        id: `tag:${tag}`,
        type: "tag",
        label: tag,
        source_refs: row.source_refs,
        generated_by: "context.harvest.tasks",
      });
      edges.push({
        id: `edge_${stableHash(`${row.id}:tag:${tag}`)}`,
        type: "task_has_tag",
        from: `task:${row.id}`,
        to: `tag:${tag}`,
        source_refs: row.source_refs,
        generated_by: "context.harvest.tasks",
      });
    }
  }
  for (const fact of facts) {
    provenance.push({
      id: `prov_${stableHash(fact.id)}`,
      type: "fact_source",
      target: fact.id,
      source_refs: fact.source_refs,
      generated_by: "context.harvest.tasks",
    });
  }
  return { entities: [...entityRows.values()], edges, provenance };
}

function buildWikiProposal(opts: {
  evidence: TaskEvidence[];
  facts: HarvestFact[];
  report: HarvestReport;
}): string {
  const sourceRefs = [...new Set(opts.evidence.flatMap((row) => row.source_refs))].slice(0, 40);
  const lines = [
    "---",
    "generated_by: context.harvest.tasks",
    "promotion_state: proposal",
    "source_refs:",
    ...sourceRefs.map((ref) => `  - ${JSON.stringify(ref)}`),
    "---",
    "",
    "# Completed task knowledge proposal",
    "",
    "This page is a proposal generated from completed task evidence. Promote only after reviewing",
    "the gate report, conflict markers, stale markers, and source references.",
    "",
    "## Promotion gate",
    "",
    `- State: ${opts.report.promotion_gate.state}`,
    `- Blockers: ${opts.report.promotion_gate.blockers.length}`,
    `- Warnings: ${opts.report.promotion_gate.warnings.length}`,
    "",
    "## Extracted claims",
    "",
  ];
  for (const fact of opts.facts) {
    lines.push(
      `### ${fact.task_id}`,
      "",
      `- Claim: ${fact.claim}`,
      `- Status: ${fact.status}`,
      `- Confidence: ${fact.confidence}`,
      `- Tags: ${fact.tags.join(", ") || "none"}`,
      `- source_refs: ${fact.source_refs.join(", ")}`,
      "",
    );
    if (fact.stale_marker) lines.push(`- Stale marker: ${fact.stale_marker}`, "");
    if (fact.conflict_markers) {
      for (const marker of fact.conflict_markers) lines.push(`- Conflict marker: ${marker}`);
      lines.push("");
    }
  }
  return `${lines.join("\n").trim()}\n`;
}

function reportSlug(opts: ContextHarvestTasksParsed): string {
  if (opts.task.length === 1) return `task-${opts.task[0]}`;
  const tagPart = opts.tag.length > 0 ? opts.tag.map((tag) => slug(tag)).join("-") : "all-tags";
  const statusPart = (opts.status.length > 0 ? opts.status : ["DONE"])
    .map((status) => slug(status))
    .join("-");
  return `${statusPart}-${tagPart}`;
}

function buildReport(opts: {
  parsed: ContextHarvestTasksParsed;
  facts: HarvestFact[];
  evidence: TaskEvidence[];
  entities: GraphRow[];
  edges: GraphRow[];
  provenance: GraphRow[];
  wikiPath: string;
  promotedPath: string;
  now: string;
}): HarvestReport {
  const warnings: string[] = [];
  const blockers: string[] = [];
  if (opts.evidence.length === 0) blockers.push("No completed tasks matched the harvest filters.");
  for (const fact of opts.facts) {
    if (fact.source_refs.length === 0) blockers.push(`${fact.id}: missing source refs`);
    if (fact.status === "conflict_candidate") {
      blockers.push(`${fact.id}: conflict marker requires manual review before promotion`);
    }
    if (fact.status === "stale_candidate") {
      warnings.push(`${fact.id}: stale marker requires review`);
    }
  }
  const state = opts.parsed.promote
    ? blockers.length > 0
      ? "blocked"
      : "promoted"
    : blockers.length > 0
      ? "blocked"
      : "proposal";
  const limit = parseLimit(opts.parsed.limit);
  return {
    schema_version: 1,
    generated_by: "context.harvest.tasks",
    generated_at: opts.now,
    mode: {
      statuses: opts.parsed.status.length > 0 ? opts.parsed.status : ["DONE"],
      tags: opts.parsed.tag,
      tasks: opts.parsed.task,
      since: opts.parsed.since || null,
      until: opts.parsed.until || null,
      after_task: opts.parsed.afterTask || null,
      limit,
      order: "oldest_first",
    },
    counts: {
      selected_tasks: opts.evidence.length,
      facts: opts.facts.length,
      entities: opts.entities.length,
      edges: opts.edges.length,
      provenance_edges: opts.provenance.length,
      stale_candidates: opts.facts.filter((fact) => fact.status === "stale_candidate").length,
      conflict_candidates: opts.facts.filter((fact) => fact.status === "conflict_candidate").length,
      promotion_blockers: blockers.length,
    },
    promotion_gate: {
      state,
      blockers,
      warnings,
      proposal_path: opts.wikiPath,
      promoted_path: state === "promoted" ? opts.promotedPath : null,
    },
    source_refs: [...new Set(opts.evidence.flatMap((row) => row.source_refs))],
  };
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
  const merged = [...existing, ...rows].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  const text =
    merged.map((row) => JSON.stringify(row)).join("\n") + (merged.length > 0 ? "\n" : "");
  return await writeTextIfChanged(filePath, text);
}

async function writeOutputs(
  root: string,
  output: HarvestOutput,
  promote: boolean,
): Promise<string[]> {
  const changed: string[] = [];
  const rawRoot = path.join(root, "context/raw/tasks");
  await mkdir(rawRoot, { recursive: true });
  for (const row of output.evidence) {
    const rel = `context/raw/tasks/${row.id}.json`;
    if (await writeJsonStableIfChanged(path.join(root, rel), row)) changed.push(rel);
  }

  const reportPath = `.agentplane/context/derived/reports/task-harvest-${stableHash(output.wikiPath)}.json`;
  await mkdir(path.dirname(path.join(root, reportPath)), { recursive: true });
  if (await writeJsonStableIfChanged(path.join(root, reportPath), output.report)) {
    changed.push(reportPath);
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

async function assertContextWorkspaceReady(root: string): Promise<void> {
  const required = [
    ".agentplane/context/agentplane.context.yaml",
    ".agentplane/context/policies/context.rules.md",
    ".agentplane/context/policies/wiki.rules.md",
    ".agentplane/context/policies/redaction.rules.yaml",
  ];
  const missing: string[] = [];
  for (const rel of required) {
    if (!(await fileExists(path.join(root, rel)))) missing.push(rel);
  }
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        "context harvest writes require an initialized context workspace. " +
        `Run agentplane context init first. Missing: ${missing.join(", ")}`,
    });
  }
}

function buildOutput(parsed: ContextHarvestTasksParsed, selected: HarvestTask[]): HarvestOutput {
  const now = new Date().toISOString();
  const evidence = selected.map((task) => buildEvidence(task, now));
  const conflicts = conflictMap(evidence);
  const facts = evidence.map((row) => buildFact(row, conflicts));
  const graph = buildGraph(evidence, facts);
  const baseSlug = reportSlug(parsed);
  const wikiPath = `context/wiki/proposals/task-harvest/${baseSlug}.md`;
  const promotedPath = `context/wiki/task-harvest/${baseSlug}.md`;
  const report = buildReport({
    parsed,
    facts,
    evidence,
    ...graph,
    wikiPath,
    promotedPath,
    now,
  });
  const wikiProposal = buildWikiProposal({ evidence, facts, report });
  return {
    selected,
    evidence,
    facts,
    ...graph,
    wikiProposal,
    wikiPath,
    promotedPath,
    report,
  };
}

function selectTasks(tasks: TaskData[], parsed: ContextHarvestTasksParsed): HarvestTask[] {
  const limit = parseLimit(parsed.limit);
  const selected = asTaskList(tasks)
    .filter((task) => taskMatches(task, parsed))
    .sort((a, b) => a.id.localeCompare(b.id));
  return limit === null ? selected : selected.slice(0, limit);
}

function renderText(output: HarvestOutput, changed: string[]): string {
  return [
    "context harvest tasks",
    `- selected tasks: ${output.report.counts.selected_tasks}`,
    `- facts: ${output.report.counts.facts}`,
    `- entities: ${output.report.counts.entities}`,
    `- edges: ${output.report.counts.edges}`,
    `- stale candidates: ${output.report.counts.stale_candidates}`,
    `- conflict candidates: ${output.report.counts.conflict_candidates}`,
    `- promotion gate: ${output.report.promotion_gate.state}`,
    `- proposal: ${output.wikiPath}`,
    `- promoted: ${output.report.promotion_gate.promoted_path ?? "not promoted"}`,
    `- changed paths: ${changed.length}`,
    ...changed.map((item) => `  - ${item}`),
  ].join("\n");
}

async function readAllTasks(ctx: CommandContext): Promise<TaskData[]> {
  return await ctx.taskBackend.listTasks();
}

export async function cmdContextHarvestTasks(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: ContextHarvestTasksParsed;
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const root = ctx.resolvedProject.gitRoot;
  const selected = selectTasks(await readAllTasks(ctx), opts.parsed);
  const output = buildOutput(opts.parsed, selected);
  const shouldWrite = opts.parsed.writeProposals || opts.parsed.promote;
  if (!opts.parsed.dryRun && shouldWrite) {
    await assertContextWorkspaceReady(root);
  }
  const changed =
    opts.parsed.dryRun || !shouldWrite ? [] : await writeOutputs(root, output, opts.parsed.promote);

  const payload = {
    ...output.report,
    selected_task_ids: selected.map((task) => task.id),
    changed_paths: changed,
  };
  if (opts.parsed.format === "json") {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else {
    process.stdout.write(`${renderText(output, changed)}\n`);
  }

  if (opts.parsed.promote && output.report.promotion_gate.state === "blocked") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context harvest promotion blocked: ${output.report.promotion_gate.blockers.join("; ")}`,
    });
  }
  return 0;
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
