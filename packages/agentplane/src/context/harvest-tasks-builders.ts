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
  type HarvestOutput,
  type HarvestReport,
  type HarvestTask,
  type TaskEvidence,
  type TaskKnowledgeProposal,
  type TaskKnowledgeSignal,
} from "./harvest-tasks-model.js";

function rawEvidencePath(taskId: string): string {
  return `context/raw/tasks/${taskId}.json`;
}

function sourceLineRef(taskId: string, line: number): string {
  return `${rawEvidencePath(taskId)}#source_text_lines=${line}`;
}

function buildEvidence(
  task: HarvestTask,
  now: string,
  provenanceRefs: readonly string[],
): TaskEvidence {
  const text = taskText(task);
  const sourceTextLines = text.split(/\r?\n/u);
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
    source_refs: sourceTextLines.map((_, index) => sourceLineRef(task.id, index + 1)),
    provenance_refs: [...new Set(provenanceRefs)].toSorted(),
    extracted_at: now,
    text_digest: taskTextDigest(task),
    source_text_lines: sourceTextLines,
    excerpts: sourceTextLines
      .map((line) => line.trim())
      .filter((line) => line.length >= 24)
      .slice(0, 6),
  };
}

function signalRefs(row: TaskEvidence, pattern: RegExp): string[] {
  return row.source_text_lines.flatMap((line, index) =>
    pattern.test(line) ? [sourceLineRef(row.id, index + 1)] : [],
  );
}

function candidateSignal(opts: {
  row: TaskEvidence;
  kind: TaskKnowledgeSignal["kind"];
  pattern: RegExp;
  evidence: string;
}): TaskKnowledgeSignal | null {
  const refs = signalRefs(opts.row, opts.pattern);
  if (refs.length === 0) return null;
  return {
    kind: opts.kind,
    source_refs: refs,
    evidence: opts.evidence,
  };
}

function buildSignals(row: TaskEvidence): TaskKnowledgeSignal[] {
  return [
    candidateSignal({
      row,
      kind: "task_pr_decision",
      pattern: /^(?:#{1,6}\s*)?decision(?:\s*:|\s*$)/iu,
      evidence: "An explicit task decision is captured at the cited source line.",
    }),
    candidateSignal({
      row,
      kind: "adr_or_public_api_candidate",
      pattern: /\badr\b|\bpublic (?:api|interface)\b/iu,
      evidence: "An explicit ADR or public-interface marker is captured at the cited source line.",
    }),
    candidateSignal({
      row,
      kind: "stable_workflow_rule_candidate",
      pattern: /\b(?:stable\s+)?workflow (?:rule|contract)\b|\blifecycle rule\b/iu,
      evidence: "An explicit reusable workflow-rule marker is captured at the cited source line.",
    }),
    candidateSignal({
      row,
      kind: "recurring_evaluator_finding_candidate",
      pattern: /\brecurring (?:evaluator )?finding\b/iu,
      evidence: "An explicit recurring-finding marker is captured at the cited source line.",
    }),
    candidateSignal({
      row,
      kind: "resolved_conflict_candidate",
      pattern: /\b(?:resolved conflict|conflict resolved)\b/iu,
      evidence: "An explicit resolved-conflict marker is captured at the cited source line.",
    }),
  ].flatMap((signal) => (signal ? [signal] : []));
}

export function taskKnowledgeProposalId(row: Pick<TaskEvidence, "id" | "text_digest">): string {
  return `task-knowledge-${slug(row.id)}-${stableHash(row.text_digest)}`;
}

function buildProposals(evidence: TaskEvidence[], now: string): TaskKnowledgeProposal[] {
  const candidates = evidence.flatMap((row) => {
    const signals = buildSignals(row);
    if (signals.length === 0) return [];
    return [
      {
        row,
        id: taskKnowledgeProposalId(row),
        identityKey: stableHash(
          JSON.stringify({
            title: normalizeClaim(row.title),
            signals: signals.map((signal) => signal.kind),
          }),
        ),
        signals,
      },
    ];
  });
  const byIdentity = new Map<string, string[]>();
  for (const candidate of candidates) {
    byIdentity.set(candidate.identityKey, [
      ...(byIdentity.get(candidate.identityKey) ?? []),
      candidate.id,
    ]);
  }
  const bySourceDigest = new Map<string, string[]>();
  for (const candidate of candidates) {
    bySourceDigest.set(candidate.row.text_digest, [
      ...(bySourceDigest.get(candidate.row.text_digest) ?? []),
      candidate.id,
    ]);
  }
  return candidates.map(({ row, id, identityKey, signals }) => {
    const related = (byIdentity.get(identityKey) ?? []).filter((candidateId) => candidateId !== id);
    const sourceDuplicates = (bySourceDigest.get(row.text_digest) ?? []).filter(
      (candidateId) => candidateId !== id,
    );
    const duplicateOf = sourceDuplicates.filter((candidateId) => candidateId < id);
    return {
      schema_version: 1,
      id,
      kind: "task_knowledge_proposal",
      state:
        duplicateOf.length > 0
          ? "duplicate"
          : related.length > 0
            ? "consolidation_required"
            : "candidate",
      publication_state: "not_published",
      source_task_id: row.id,
      source_digest: row.text_digest,
      source_fingerprint_version: 1,
      title: row.title,
      source_refs: [
        ...new Set([...signals.flatMap((signal) => signal.source_refs), ...row.provenance_refs]),
      ].toSorted(),
      signals,
      dedupe: {
        identity_key: identityKey,
        duplicate_of: duplicateOf,
        consolidation_with: related.filter(
          (candidateId) => !sourceDuplicates.includes(candidateId),
        ),
      },
      generated_at: now,
      generated_by: "context.harvest.tasks",
    };
  });
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
  proposals: TaskKnowledgeProposal[];
  evidence: TaskEvidence[];
  now: string;
}): HarvestReport {
  const blockers: string[] = [];
  if (opts.proposals.length === 0) blockers.push("No completed tasks matched the harvest filters.");
  for (const proposal of opts.proposals) {
    if (proposal.source_refs.length === 0) blockers.push(`${proposal.id}: missing source refs`);
  }
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
      proposals: opts.proposals.length,
      duplicate_proposals: opts.proposals.filter((proposal) => proposal.state === "duplicate")
        .length,
      consolidation_required: opts.proposals.filter(
        (proposal) => proposal.state === "consolidation_required",
      ).length,
    },
    selection_gate: {
      state: blockers.length > 0 ? "blocked" : "ready",
      blockers,
      requires_explicit_task_selection: true,
    },
    source_refs: [...new Set(opts.proposals.flatMap((proposal) => proposal.source_refs))],
  };
}

function reportPathFor(parsed: ContextHarvestTasksParsed): string {
  return `.agentplane/context/derived/reports/task-knowledge-proposals-${stableHash(reportSlug(parsed))}.json`;
}

export function buildOutput(
  parsed: ContextHarvestTasksParsed,
  selected: HarvestTask[],
  provenanceRefsByTask: ReadonlyMap<string, readonly string[]> = new Map(),
): HarvestOutput {
  const now = new Date().toISOString();
  const evidence = selected.map((task) =>
    buildEvidence(task, now, provenanceRefsByTask.get(task.id) ?? []),
  );
  const proposals = buildProposals(evidence, now);
  const reportPath = reportPathFor(parsed);
  const report = buildReport({ parsed, proposals, evidence, now });
  const markers = buildTaskHarvestMarkers({ evidence, proposals, reportPath, report });
  return {
    selected,
    evidence,
    proposals,
    reportPath,
    report,
    markers,
    ledgerRows: buildTaskHarvestLedgerRows(markers),
  };
}
