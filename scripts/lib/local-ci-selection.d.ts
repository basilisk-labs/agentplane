export type FastCiPlan =
  | {
      kind: "full-fast";
      reason: string;
      files?: string[];
    }
  | {
      kind: "docs-only";
      reason: string;
      files: string[];
    }
  | {
      kind: "targeted";
      bucket:
        | "task"
        | "doctor"
        | "backend"
        | "hooks"
        | "workflow"
        | "cli-help"
        | "cli-core"
        | "cli-runtime"
        | "pr"
        | "hosted-close-pr"
        | "pr-flow-status"
        | "pr-integrate"
        | "release"
        | "upgrade"
        | "guard"
        | "colocated"
        | "mixed";
      buckets?: string[];
      reason: string;
      files: string[];
      lintTargets: string[];
      testFiles: string[];
      vitestPool: "threads" | "forks";
    };

export function parseChangedFilesEnv(rawValue: unknown): string[];
export function selectFastCiPlan(changedFiles: string[]): FastCiPlan;
export function shouldRunCliDocsCheck(changedFiles: string[]): boolean;
export function buildLocalCiExecutionPlan(options: {
  mode: "smoke" | "fast" | "full";
  changedFiles: string[];
  phase?: "local" | "pr" | "release";
  declaredRepositoryEffects?: string[];
  declaredExternalEffects?: string[];
  observedRepositoryEffects?: string[];
  observedExternalEffects?: string[];
}): {
  schema_version: 1;
  mode: string;
  route: string;
  changed_files: string[];
  selector: FastCiPlan;
  verification_contract: Record<string, unknown>;
  steps: Array<Record<string, unknown>>;
  skipped_steps: Array<Record<string, unknown>>;
};
