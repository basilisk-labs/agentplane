import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";

export type InitIde = "codex" | "cursor" | "windsurf";

export type SetupProfilePreset = "light" | "normal" | "full-harness";
export type InitMode = "quick" | "guided" | "advanced" | "ci";
export type UserFacingProfile = "solo" | "team" | "strict" | "custom";
export type InitTool = "codex" | "claude" | "cursor" | "windsurf" | "multiple" | "manual";
export type InitBackend = "local" | "redmine" | "cloud";

export type InitFlags = {
  initMode?: InitMode;
  tool?: InitTool;
  setupProfile?: SetupProfilePreset;
  policyGateway?: PolicyGatewayFlavor;
  ide?: InitIde;
  workflow?: "direct" | "branch_pr";
  directCloseDirtyPolicy?: "allow_other_task_readmes" | "strict";
  backend?: InitBackend;
  hooks?: boolean;
  gitignoreAgents?: boolean;
  requirePlanApproval?: boolean;
  requireNetworkApproval?: boolean;
  requireVerifyApproval?: boolean;
  feedbackGithubIssues?: boolean;
  feedbackAnonymousCloud?: boolean;
  executionProfile?: ExecutionProfile;
  strictUnsafeConfirm?: boolean;
  recipes?: string[];
  blueprints?: string[];
  force?: boolean;
  backup?: boolean;
  dryRun?: boolean;
  yes: boolean;
};

export type InitParsed = Omit<InitFlags, "yes"> & { yes: boolean };

export type InitDefaults = {
  policyGateway: PolicyGatewayFlavor;
  ide: InitIde;
  workflow: WorkflowMode;
  directCloseDirtyPolicy: NonNullable<InitFlags["directCloseDirtyPolicy"]>;
  backend: NonNullable<InitFlags["backend"]>;
  hooks: boolean;
  recipes: string[];
  requirePlanApproval: boolean;
  requireNetworkApproval: boolean;
  requireVerifyApproval: boolean;
  feedbackGithubIssues: boolean;
  feedbackAnonymousCloud: boolean;
  executionProfile: ExecutionProfile;
  strictUnsafeConfirm: boolean;
  blueprints: string[];
};

export type InitEffectKind =
  | "create_dir"
  | "write_file"
  | "update_file"
  | "backup_path"
  | "delete_path"
  | "git_init"
  | "git_commit"
  | "install_hooks"
  | "sync_ide"
  | "vendor_recipe"
  | "install_blueprint";

export type InitEffectRisk = "none" | "low" | "medium" | "high";

export type InitEffect = {
  kind: InitEffectKind;
  path?: string;
  summary: string;
  destructive: boolean;
  reversible: boolean;
  requiresNetwork: boolean;
  risk: InitEffectRisk;
};

export type InitPlan = {
  schemaVersion: "init-plan/v1";
  agentplaneVersion: string;
  root: string;
  mode: InitMode;
  profile: UserFacingProfile;
  internalSetupProfile: SetupProfilePreset;
  answers: {
    policyGateway: PolicyGatewayFlavor;
    ide: InitIde;
    workflow: WorkflowMode;
    backend: InitBackend;
    hooks: boolean;
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
    requireVerifyApproval: boolean;
    feedbackGithubIssues: boolean;
    feedbackAnonymousCloud: boolean;
    executionProfile: ExecutionProfile;
    strictUnsafeConfirm: boolean;
    recipes: string[];
    blueprints: string[];
  };
  context: {
    gitRootExisted: boolean;
    parentGitRoot: string | null;
    outputMode: "text" | "json";
    githubCliInstalled: boolean | null;
  };
  effects: InitEffect[];
  conflicts: string[];
  warnings: string[];
  nextSteps: string[];
};
