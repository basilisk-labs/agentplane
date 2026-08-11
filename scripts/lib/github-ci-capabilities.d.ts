export const GITHUB_CI_GATE_JOBS: readonly string[];

export type GithubCiCapabilities = {
  core: boolean;
  docs: boolean;
  dependency_review: boolean;
  workflow_lint: boolean;
  windows: boolean;
  coverage: boolean;
  cli_critical: boolean;
  package_runtime_core: boolean;
  package_runtime_recipes: boolean;
  codeql_javascript: boolean;
  codeql_actions: boolean;
};

export type GithubCiCapabilityPlan = {
  schema_version: 1;
  route: string;
  route_reason: string;
  selector_kind: string;
  bucket: string;
  buckets: string[];
  changed_files: string[];
  changed_files_count: number;
  exact_sha_recovery: boolean;
  release_ready: boolean;
  unknown_paths: boolean;
  capabilities: GithubCiCapabilities;
  codeql_languages: string[];
  expected_jobs: string[];
  executing_jobs_count: number;
  local_execution_plan: unknown;
};

export function buildGithubCiCapabilityPlan(input: {
  changedFiles: string[];
  eventName?: string;
  headRef?: string;
  ref?: string;
  exactShaRecovery?: boolean;
}): GithubCiCapabilityPlan;

export function evaluateGithubCiAggregate(input: {
  plan: GithubCiCapabilityPlan;
  jobResults: Record<string, string>;
}): {
  ok: boolean;
  findings: string[];
  expected_jobs: string[];
};
