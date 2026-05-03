import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { evaluatePolicy } from "./evaluate.js";
import type { PolicyContext } from "./model.js";

function makeCtx(partial: Partial<PolicyContext>): PolicyContext {
  const cfg = defaultConfig();
  return {
    action: "guard_commit",
    config: cfg,
    taskId: "202602071329-TEST01",
    git: { stagedPaths: ["packages/agentplane/src/cli/run-cli.ts"] },
    commit: { subject: "✅ TEST01 cli: test subject" },
    allow: {
      prefixes: ["packages/agentplane/src/cli"],
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
    },
    requireClean: false,
    ...partial,
  };
}

describe("policy/evaluatePolicy", () => {
  it("rejects empty commit subject", () => {
    const res = evaluatePolicy(makeCtx({ commit: { subject: "   " } }));
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain(
      "Commit message subject is empty",
    );
  });

  it("rejects missing allowlist prefixes for commit actions", () => {
    const res = evaluatePolicy(makeCtx({ allow: { prefixes: [] } }));
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain("--allow");
  });

  it("rejects repo-wide allowlist prefix", () => {
    const res = evaluatePolicy(makeCtx({ allow: { prefixes: ["."] } }));
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain("Repo-wide allowlist");
  });

  it("rejects protected policy paths without override", () => {
    const res = evaluatePolicy(
      makeCtx({
        git: { stagedPaths: ["AGENTS.md"] },
        allow: { prefixes: ["AGENTS.md"] },
      }),
    );
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain("protected");
  });

  it("allows canonical policy assets when --allow-policy is set", () => {
    const res = evaluatePolicy(
      makeCtx({
        git: { stagedPaths: ["packages/agentplane/assets/policy/incidents.md"] },
        allow: { prefixes: [], allowPolicy: true },
      }),
    );
    expect(res.ok).toBe(true);
  });

  it("renders hook-style protected path messages for pre-commit", () => {
    const res = evaluatePolicy(
      makeCtx({
        action: "hook_pre_commit",
        git: { stagedPaths: ["AGENTS.md"] },
      }),
    );
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain(
      "is protected by agentplane hooks",
    );
  });

  it("does not treat the optional tasks export snapshot as branch_pr single-writer state", () => {
    const cfg = defaultConfig();
    cfg.workflow_mode = "branch_pr";
    const res = evaluatePolicy(
      makeCtx({
        config: cfg,
        git: {
          stagedPaths: [cfg.paths.tasks_path],
          currentBranch: "feature",
          baseBranch: "main",
        },
        allow: { prefixes: [cfg.paths.tasks_path], allowTasks: true },
      }),
    );
    expect(res.ok).toBe(true);
  });

  it("enforces branch_pr base constraints for normal files", () => {
    const cfg = defaultConfig();
    cfg.workflow_mode = "branch_pr";
    const res = evaluatePolicy(
      makeCtx({
        config: cfg,
        git: {
          stagedPaths: ["packages/agentplane/src/index.ts"],
          currentBranch: "main",
          baseBranch: "main",
        },
        allow: { prefixes: ["packages/agentplane/src"] },
      }),
    );
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain(
      "Code commits are forbidden on main",
    );
  });

  it("allows a non-README artifact under the active task subtree when --allow-tasks is set", () => {
    const taskId = "202602071329-TEST01";
    const res = evaluatePolicy(
      makeCtx({
        taskId,
        git: { stagedPaths: [`.agentplane/tasks/${taskId}/evidence.json`] },
        allow: { prefixes: ["packages/agentplane/src"], allowTasks: true },
      }),
    );
    expect(res.ok).toBe(true);
  });

  it("allows task-only commit scope when --allow-tasks is set without explicit prefixes", () => {
    const taskId = "202602071329-TEST01";
    const res = evaluatePolicy(
      makeCtx({
        taskId,
        git: { stagedPaths: [`.agentplane/tasks/${taskId}/README.md`] },
        allow: { prefixes: [], allowTasks: true },
      }),
    );
    expect(res.ok).toBe(true);
  });

  it("allows CI-only commit scope when --allow-ci is set without explicit prefixes", () => {
    const res = evaluatePolicy(
      makeCtx({
        git: { stagedPaths: [".github/workflows/publish.yml"] },
        allow: { prefixes: [], allowCI: true },
      }),
    );
    expect(res.ok).toBe(true);
  });

  it("does not silently allow unrelated task README files", () => {
    const taskId = "202602071329-TEST01";
    const otherTaskId = "202602071329-OTHER1";
    const res = evaluatePolicy(
      makeCtx({
        taskId,
        git: { stagedPaths: [`.agentplane/tasks/${otherTaskId}/evidence.json`] },
        allow: { prefixes: ["packages/agentplane/src"], allowTasks: true },
      }),
    );
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain("outside allowlist");
  });
});
