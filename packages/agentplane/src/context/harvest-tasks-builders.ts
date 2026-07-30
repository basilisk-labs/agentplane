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

function buildEvidence(task: HarvestTask, now: string): TaskEvidence {
  const text = taskText(task);
  const refs = [`.agentplane/tasks/${task.id}/README.md#lines=1-80`];
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

function sourceText(row: TaskEvidence): string {
  return [row.title, ...row.excerpts, row.tags.join(" ")].join("\n").toLowerCase();
}

function buildSignals(row: TaskEvidence): TaskKnowledgeSignal[] {
  const text = sourceText(row);
  const signals: TaskKnowledgeSignal[] = [
    {
      kind: "task_pr_decision",
      source_refs: row.source_refs,
      evidence:
        "Completed task record and its task/PR decision evidence are available for CURATOR review.",
    },
  ];
  if (
    row.tags.some((tag) => ["adr", "api", "public-api"].includes(tag)) ||
    /\badr\b|public api|public interface/u.test(text)
  ) {
    signals.push({
      kind: "adr_or_public_api_candidate",
      source_refs: row.source_refs,
      evidence:
        "Task metadata contains an ADR or public-interface signal; this is not an asserted API or decision.",
    });
  }
  if (
    row.tags.includes("workflow") ||
    row.mutation_scope === "workflow" ||
    /workflow rule|workflow contract|lifecycle rule/u.test(text)
  ) {
    signals.push({
      kind: "stable_workflow_rule_candidate",
      source_refs: row.source_refs,
      evidence:
        "Task metadata contains a workflow signal; CURATOR must decide whether it is durable and reusable.",
    });
  }
  if (/recurring evaluator finding|recurring finding/u.test(text)) {
    signals.push({
      kind: "recurring_evaluator_finding_candidate",
      source_refs: row.source_refs,
      evidence:
        "Task evidence mentions a recurring evaluator finding; no recurrence is inferred by the CLI.",
    });
  }
  if (/resolved conflict|conflict resolved/u.test(text)) {
    signals.push({
      kind: "resolved_conflict_candidate",
      source_refs: row.source_refs,
      evidence:
        "Task evidence mentions a resolved conflict; CURATOR must preserve uncertainty or competing evidence when present.",
    });
  }
  return signals;
}

export function taskKnowledgeProposalId(row: Pick<TaskEvidence, "id" | "text_digest">): string {
  return `task-knowledge-${slug(row.id)}-${stableHash(row.text_digest)}`;
}

function buildProposals(evidence: TaskEvidence[], now: string): TaskKnowledgeProposal[] {
  const candidates = evidence.map((row) => {
    const signals = buildSignals(row);
    return {
      row,
      id: taskKnowledgeProposalId(row),
      identityKey: stableHash(
        JSON.stringify({
          title: normalizeClaim(row.title),
          signals: signals.map((signal) => signal.kind),
        }),
      ),
      signals,
    };
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
      source_refs: row.source_refs,
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
    source_refs: [...new Set(opts.evidence.flatMap((row) => row.source_refs))],
  };
}

function reportPathFor(parsed: ContextHarvestTasksParsed): string {
  return `.agentplane/context/derived/reports/task-knowledge-proposals-${stableHash(reportSlug(parsed))}.json`;
}

export function buildOutput(
  parsed: ContextHarvestTasksParsed,
  selected: HarvestTask[],
): HarvestOutput {
  const now = new Date().toISOString();
  const evidence = selected.map((task) => buildEvidence(task, now));
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
