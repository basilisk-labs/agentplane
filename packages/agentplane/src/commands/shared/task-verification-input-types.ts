import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { NativeTaskIdentity } from "./native-task-identity.js";

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

export type VerificationImplementationIdentity = {
  strategy: "branch_diff" | "tree";
  digest: `sha256:${string}`;
  target_sha: string;
  base_sha: string | null;
};

export type VerificationContextIdentity = { digest: `sha256:${string}`; paths: string[] };

export type VerificationEnvironmentIdentity = {
  digest: `sha256:${string}`;
  runtime: VerificationEnvironment;
};

export type VerificationEvidenceIdentity = {
  digest: `sha256:${string}`;
  details_digest: `sha256:${string}`;
  references: VerificationEvidenceReference[];
};

export type HistoricalVerificationInputIdentity = {
  schema_version: 2 | 3 | 4;
  kind: "task_verification_input";
  execution?: VerificationExecutionIdentity;
  implementation: VerificationImplementationIdentity;
  verify_steps_digest: `sha256:${string}`;
  verification_contract_digest?: `sha256:${string}`;
  context: VerificationContextIdentity;
  environment: VerificationEnvironmentIdentity;
  evidence: VerificationEvidenceIdentity;
  digest: `sha256:${string}`;
};

export type VerificationCommandIdentity = {
  check_id: string | null;
  command: string;
};

export type VerificationInputIdentityV5 = {
  schema_version: 5;
  kind: "task_verification_input";
  concurrency: {
    digest: `sha256:${string}`;
    execution: VerificationExecutionIdentity;
    task: NativeTaskIdentity;
  };
  checked_input: {
    digest: `sha256:${string}`;
    implementation: VerificationImplementationIdentity;
    commands: { digest: `sha256:${string}`; entries: VerificationCommandIdentity[] };
    context: VerificationContextIdentity;
    environment: VerificationEnvironmentIdentity;
    evidence: VerificationEvidenceIdentity;
  };
  obligations: {
    digest: `sha256:${string}`;
    verify_steps_digest: `sha256:${string}`;
    verification_contract_digest: `sha256:${string}`;
    required_check_ids: string[];
  };
  digest: `sha256:${string}`;
};

export type VerificationInputIdentity =
  | HistoricalVerificationInputIdentity
  | VerificationInputIdentityV5;
