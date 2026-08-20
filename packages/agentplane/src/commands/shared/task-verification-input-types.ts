import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";

export type VerificationEnvironment = {
  platform: string;
  architecture: string;
  node_major: string;
  bun_major: string | null;
};

export type VerificationExecutionIdentity = {
  digest: `sha256:${string}`;
  primary_task_id: string;
  task_ids: string[];
  repository_mode: "direct" | "branch_pr";
  selected_mode: "direct" | "branch_pr";
  requested_mode: "auto" | "direct" | "branch_pr";
  route_source: TaskExecutionContext["route_source"];
  reason_codes: string[];
  base_ref: string;
  base_sha: string;
  authoritative_task_source: TaskExecutionContext["authoritative_task_source"];
};

export type VerificationEvidenceReference = {
  reference: string;
  path: string;
  fragment: string | null;
  source: "filesystem" | "git" | "missing" | "unsafe";
  digest: `sha256:${string}`;
};

export type VerificationInputIdentity = {
  schema_version: 2 | 3 | 4;
  kind: "task_verification_input";
  execution?: VerificationExecutionIdentity;
  implementation: {
    strategy: "branch_diff" | "tree";
    digest: `sha256:${string}`;
    target_sha: string;
    base_sha: string | null;
  };
  verify_steps_digest: `sha256:${string}`;
  verification_contract_digest?: `sha256:${string}`;
  context: { digest: `sha256:${string}`; paths: string[] };
  environment: { digest: `sha256:${string}`; runtime: VerificationEnvironment };
  evidence: {
    digest: `sha256:${string}`;
    details_digest: `sha256:${string}`;
    references: VerificationEvidenceReference[];
  };
  digest: `sha256:${string}`;
};
