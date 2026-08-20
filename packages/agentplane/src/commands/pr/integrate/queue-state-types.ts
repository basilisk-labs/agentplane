import type { LegacyProtectedConflictAdoptionReceipt } from "./queue-state-legacy-adoption.js";

export type IntegrationQueueStatus =
  | "queued"
  | "claimed"
  | "handoff"
  | "done"
  | "rework"
  | "superseded";

export type IntegrationQueueEntry = {
  task_id: string;
  route?: "direct" | "branch_pr";
  branch: string;
  base: string;
  head_sha: string;
  base_sha: string;
  changed_paths: string[];
  implementation_commit?: string;
  verified_input_digest?: string;
  workspace_id?: string;
  pr_number: number | null;
  pr_url: string | null;
  priority: number;
  status: IntegrationQueueStatus;
  enqueued_at: string;
  updated_at: string;
  claimed_by?: string;
  claimed_at?: string;
  lease_expires_at?: string;
  claim_token?: string;
  active_operation?: "integration";
  reason?: string;
  superseded_by_task_id?: string;
  legacy_protected_conflict_adoption?: LegacyProtectedConflictAdoptionReceipt;
};

export type IntegrationQueueState = {
  schema_version: 1;
  entries: IntegrationQueueEntry[];
};

export type IntegrationQueueMutexInspection =
  | { state: "absent" }
  | { state: "dead_same_host"; owner: { pid: number; host: string } }
  | { state: "live"; owner: { pid: number; host: string } }
  | { state: "foreign_host"; owner: { pid: number; host: string } }
  | { state: "invalid"; reason: string };

export type QueueClock = { now: () => Date };
