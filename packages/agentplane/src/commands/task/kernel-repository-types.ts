import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import type {
  DirectImplementationEvidence,
  DirectRepositoryStatus,
} from "./direct-task-finalization.js";

export type KernelRepositoryBaseline = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_baseline";
  task_id: string;
  work_item_id: string;
  task_revision: number;
  work_order_id: string;
  checkout: string;
  branch: string;
  head: string;
  tree: string;
  status: DirectRepositoryStatus;
}>;

export type KernelRepositoryEvidence = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_evidence";
  task_id: string;
  work_item_id: string;
  task_revision: number;
  work_order_id: string;
  checkout: string;
  branch: string;
  base_commit: string;
  implementation_commit: string;
  implementation_tree: string;
  changed_paths: readonly string[];
  evaluator_target: string;
  implementation_evidence: DirectImplementationEvidence;
  digest: k.Sha256Digest;
}>;

export type KernelRepositoryCommitIntent = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_commit_intent";
  task_id: string;
  work_order_id: string;
  base_commit: string;
  changed_paths: readonly string[];
  digest: k.Sha256Digest;
}>;

export type KernelRepositoryFollowupCommitIntent = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_followup_commit_intent";
  task_id: string;
  work_order_id: string;
  base_commit: string;
  changed_paths: readonly string[];
  digest: k.Sha256Digest;
}>;
