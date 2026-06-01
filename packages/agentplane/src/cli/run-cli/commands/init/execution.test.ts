import { describe, expect, it } from "vitest";

import { buildInitPlan, GITHUB_CLI_INIT_RECOMMENDATION } from "./execution.js";
import type { InitAnswers } from "./answers.js";

const answers = {
  setupProfile: "normal",
  setupProfileDescription: "team",
  policyGateway: "codex",
  ide: "codex",
  workflow: "branch_pr",
  directCloseDirtyPolicy: "allow_other_task_readmes",
  backend: "local",
  hooks: true,
  requirePlanApproval: false,
  requireNetworkApproval: false,
  requireVerifyApproval: false,
  executionProfile: "balanced",
  strictUnsafeConfirm: false,
  recipes: [],
  blueprints: [],
} satisfies InitAnswers;

describe("init execution planning", () => {
  it("recommends user-installed gh for branch_pr when GitHub CLI is missing", () => {
    const plan = buildInitPlan({
      paths: {
        gitRoot: "/repo",
        gitRootExisted: true,
        parentGitRoot: null,
        agentplaneDir: "/repo/.agentplane",
        workflowPath: "/repo/.agentplane/WORKFLOW.md",
        legacyConfigPath: "/repo/.agentplane/config.json",
        backendPath: "/repo/.agentplane/backends/local/backend.json",
      },
      answers,
      conflicts: [],
      conflictMode: { backup: false, force: false },
      outputMode: "json",
      includeInstallCommit: true,
      initMode: "quick",
      githubCliInstalled: false,
    });

    expect(plan.context.githubCliInstalled).toBe(false);
    expect(plan.warnings).toContain(GITHUB_CLI_INIT_RECOMMENDATION);
    expect(plan.nextSteps[0]).toContain("Install GitHub CLI yourself");
  });
});
