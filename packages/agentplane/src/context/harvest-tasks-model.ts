import { createHash } from "node:crypto";

import type { TaskData } from "../backends/task-backend.js";
import { CliError } from "../shared/errors.js";
import type { TaskHarvestLedgerRow, TaskHarvestMarker } from "./harvest-tasks-markers.js";

export type ContextHarvestTasksParsed = {
  status: string[];
  tag: string[];
  task: string[];
  since: string;
  until: string;
  afterTask: string;
  limit: string;
  writeProposals: boolean;
  createExtractionTasks: boolean;
  batchSize: string;
  batchBytes: string;
  promote: boolean;
  dryRun: boolean;
  format: "text" | "json";
};

export type HarvestTask = TaskData & { id: string; title: string; status: string };

export type TaskEvidence = {
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
  provenance_refs: string[];
  extracted_at: string;
  text_digest: string;
  source_text_lines: string[];
  excerpts: string[];
};

type TaskKnowledgeSignalKind =
  | "task_pr_decision"
  | "adr_or_public_api_candidate"
  | "stable_workflow_rule_candidate"
  | "recurring_evaluator_finding_candidate"
  | "resolved_conflict_candidate";

export type TaskKnowledgeSignal = {
  kind: TaskKnowledgeSignalKind;
  source_refs: string[];
  evidence: string;
};

export type TaskKnowledgeProposal = {
  schema_version: 1;
  id: string;
  kind: "task_knowledge_proposal";
  state: "candidate" | "duplicate" | "consolidation_required";
  publication_state: "not_published";
  source_task_id: string;
  source_digest: string;
  source_fingerprint_version: 1;
  title: string;
  source_refs: string[];
  signals: TaskKnowledgeSignal[];
  dedupe: {
    identity_key: string;
    duplicate_of: string[];
    consolidation_with: string[];
  };
  generated_at: string;
  generated_by: "context.harvest.tasks";
};

export type HarvestOutput = {
  selected: HarvestTask[];
  evidence: TaskEvidence[];
  proposals: TaskKnowledgeProposal[];
  reportPath: string;
  report: HarvestReport;
  markers: Record<string, TaskHarvestMarker>;
  ledgerRows: TaskHarvestLedgerRow[];
};

export type HarvestReport = {
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
    proposals: number;
    duplicate_proposals: number;
    consolidation_required: number;
  };
  selection_gate: {
    state: "ready" | "blocked";
    blockers: string[];
    requires_explicit_task_selection: true;
  };
  source_refs: string[];
};

export function normalizeTags(value: unknown): string[] {
  return Array.isArray(value)
    ? value
        .map(String)
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
}

export function parseLimit(value: string): number | null {
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

export function parsePositiveIntegerOption(
  value: string,
  fallback: number,
  optionName: string,
): number {
  if (!value.trim()) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid ${optionName} value: ${value}`,
    });
  }
  return parsed;
}

export function normalizeDateKey(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed
    .replaceAll(/[^0-9]/gu, "")
    .slice(0, 12)
    .padEnd(12, "0");
}

export function slug(value: string): string {
  const out = value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
  return out || "all";
}

export function stableHash(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

export function normalizeClaim(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[`*_()[\]{}:;,.!?/\\|-]+/gu, " ")
    .replaceAll(/\s+/gu, " ");
}
