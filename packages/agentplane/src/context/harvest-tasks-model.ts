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
  extracted_at: string;
  text_digest: string;
  excerpts: string[];
};

export type HarvestFact = {
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

export type GraphRow = Record<string, unknown> & { id: string; source_refs: string[] };

export type HarvestOutput = {
  selected: HarvestTask[];
  evidence: TaskEvidence[];
  facts: HarvestFact[];
  entities: GraphRow[];
  edges: GraphRow[];
  provenance: GraphRow[];
  wikiProposal: string;
  wikiPath: string;
  promotedPath: string;
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
