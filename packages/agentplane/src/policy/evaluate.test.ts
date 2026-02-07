import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { evaluatePolicy } from "./evaluate.js";
import type { PolicyContext } from "./types.js";

function makeCtx(partial: Partial<PolicyContext>): PolicyContext {
  const cfg = defaultConfig();
  return {
    action: "guard_commit",
    config: cfg,
    taskId: "202602071329-TEST01",
    git: { stagedPaths: ["packages/agentplane/src/cli/help.ts"] },
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
    expect(res.errors.map((e) => e.message).join("\n")).toContain("Provide at least one allowlist");
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

  it("enforces branch_pr base constraints", () => {
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
    expect(res.ok).toBe(false);
    expect(res.errors.map((e) => e.message).join("\n")).toContain("commits are allowed only on");
  });
});
