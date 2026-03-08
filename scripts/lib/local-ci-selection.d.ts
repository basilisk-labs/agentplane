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
        | "hooks"
        | "cli-help"
        | "cli-core"
        | "cli-runtime"
        | "release"
        | "upgrade"
        | "guard";
      reason: string;
      files: string[];
      lintTargets: string[];
      testFiles: string[];
    };

export function parseChangedFilesEnv(rawValue: unknown): string[];
export function selectFastCiPlan(changedFiles: string[]): FastCiPlan;
export function shouldRunCliDocsCheck(changedFiles: string[]): boolean;
