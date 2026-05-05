import type { ExecutionProfile } from "@agentplaneorg/core/config";

import type { WorkflowMode } from "../../../../agents/agents-template.js";
import type { PolicyGatewayFlavor } from "../../../../shared/policy-gateway.js";

export type InitIde = "codex" | "cursor" | "windsurf";

export type SetupProfilePreset = "light" | "normal" | "full-harness";
export type InitBackend = "local" | "redmine" | "cloud";

export type InitFlags = {
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
  executionProfile?: ExecutionProfile;
  strictUnsafeConfirm?: boolean;
  recipes?: string[];
  force?: boolean;
  backup?: boolean;
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
  executionProfile: ExecutionProfile;
  strictUnsafeConfirm: boolean;
};
