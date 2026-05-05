import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { CommitTaskIntent } from "@agentplaneorg/core/commit";
import type { PolicyActionId } from "./taxonomy.js";

export type PolicyAction = PolicyActionId;

export type PolicyProblemCode = "E_USAGE" | "E_GIT" | "E_INTERNAL";

export type PolicyProblem = {
  code: PolicyProblemCode;
  exitCode: number;
  message: string;
};

export type PolicyResult = {
  ok: boolean;
  errors: PolicyProblem[];
  warnings: PolicyProblem[];
};

export type PolicyContext = {
  action: PolicyAction;

  config: AgentplaneConfig;
  taskId: string;

  // Git facts must be injected; policy code must not run git itself.
  git: {
    stagedPaths: string[];
    unstagedTrackedPaths?: string[];
    currentBranch?: string;
    baseBranch?: string | null;
  };

  commit?: {
    subject?: string;
    taskIntent?: CommitTaskIntent;
  };

  allow?: {
    prefixes?: string[];
    allowTasks?: boolean;
    allowBase?: boolean;
    allowPolicy?: boolean;
    allowConfig?: boolean;
    allowHooks?: boolean;
    allowCI?: boolean;
  };

  requireClean?: boolean;
};
