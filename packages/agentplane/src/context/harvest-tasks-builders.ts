import { isRecord } from "./context-utils.js";
import {
  buildTaskHarvestLedgerRows,
  buildTaskHarvestMarkers,
  taskText,
  taskTextDigest,
} from "./harvest-tasks-markers.js";
import {
  normalizeClaim,
  normalizeTags,
  parseLimit,
  slug,
  stableHash,
  type ContextHarvestTasksParsed,
  type GraphRow,
  type HarvestFact,
  type HarvestOutput,
  type HarvestReport,
  type HarvestTask,
  type TaskEvidence,
} from "./harvest-tasks-model.js";

function buildEvidence(task: HarvestTask, now: string): TaskEvidence {
  const text = taskText(task);
  const refs = [`.agentplane/tasks/${task.id}/README.md`];
  if (task.commit && typeof task.commit.hash === "string" && task.commit.hash.trim()) {
    refs.push(`commit:${task.commit.hash.trim()}`);
  }
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
    source_refs: refs,
    extracted_at: now,
    text_digest: taskTextDigest(task),
    excerpts: text
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter((line) => line.length >= 24)
      .slice(0, 6),
  };
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

function buildGraph(evidence: TaskEvidence[], facts: HarvestFact[]) {
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

function buildWikiProposal(evidence: TaskEvidence[], facts: HarvestFact[], report: HarvestReport) {
  const sourceRefs = [...new Set(evidence.flatMap((row) => row.source_refs))].slice(0, 40);
  const lines = [
    "---",
    "generated_by: context.harvest.tasks",
    "promotion_state: proposal",
    "source_refs:",
    ...sourceRefs.map((ref) => `  - ${JSON.stringify(ref)}`),
    "---",
    "",
    "# Completed task raw proposal scaffold",
    "",
    "This page is a raw proposal scaffold generated from completed task evidence. Semantic wiki,",
    "fact, and graph extraction belongs to CURATOR tasks by default. Promote only after reviewing",
    "the gate report, conflict markers, stale markers, and source references.",
    "",
    "## Promotion gate",
    "",
    `- State: ${report.promotion_gate.state}`,
    `- Blockers: ${report.promotion_gate.blockers.length}`,
    `- Warnings: ${report.promotion_gate.warnings.length}`,
    "",
    "## Scaffold claims",
    "",
  ];
  for (const fact of facts) {
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
  if (opts.task.length === 1) return `task-${slug(opts.task[0])}`;
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
    if (fact.status === "stale_candidate")
      warnings.push(`${fact.id}: stale marker requires review`);
  }
  const state = opts.parsed.promote
    ? blockers.length > 0
      ? "blocked"
      : "promoted"
    : blockers.length > 0
      ? "blocked"
      : "proposal";
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
      limit: parseLimit(opts.parsed.limit),
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

export function reportPathForWiki(wikiPath: string): string {
  return `.agentplane/context/derived/reports/task-harvest-${stableHash(wikiPath)}.json`;
}

export function buildOutput(
  parsed: ContextHarvestTasksParsed,
  selected: HarvestTask[],
): HarvestOutput {
  const now = new Date().toISOString();
  const evidence = selected.map((task) => buildEvidence(task, now));
  const claims = new Map<string, string[]>();
  for (const row of evidence) {
    const key = normalizeClaim(row.title);
    claims.set(key, [...(claims.get(key) ?? []), row.id]);
  }
  const conflicts = new Map([...claims].filter(([, ids]) => ids.length > 1));
  const facts = evidence.map((row) => buildFact(row, conflicts));
  const graph = buildGraph(evidence, facts);
  const wikiPath = `context/wiki/proposals/task-harvest/${reportSlug(parsed)}.md`;
  const promotedPath = `context/wiki/task-harvest/${reportSlug(parsed)}.md`;
  const report = buildReport({ parsed, facts, evidence, ...graph, wikiPath, promotedPath, now });
  const reportPath = reportPathForWiki(wikiPath);
  const markers = buildTaskHarvestMarkers({ evidence, facts, reportPath, wikiPath, report });
  return {
    selected,
    evidence,
    facts,
    ...graph,
    wikiProposal: buildWikiProposal(evidence, facts, report),
    wikiPath,
    promotedPath,
    reportPath,
    report,
    markers,
    ledgerRows: buildTaskHarvestLedgerRows(markers),
  };
}
