import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskCentricDigest,
  withTaskCentricAggregate,
  type ResourceClaimSpec,
  type ValidationPlan,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { observeBranchBaseSync } from "./branch-base-sync-route.js";

const NOW = "2026-09-14T00:00:00.000Z";

function validation(): ValidationPlan {
  return {
    schema_version: 1,
    criteria: [{ id: "criterion", description: "sync", required: true, check_ids: ["check"] }],
    checks: [{ id: "check", kind: "deterministic", required: true, capability: "test" }],
    evidence_fingerprint: taskCentricDigest("sync"),
  };
}

function taskWithClaim(claim: ResourceClaimSpec, baseSha: string): TaskData {
  const taskId = "202609140657-5REY71";
  const check = validation();
  const proposal = {
    schema_version: 1 as const,
    task_id: taskId,
    planning_baseline: createRepositorySnapshot({
      git: { kind: "commit", sha: baseSha, ref: "refs/heads/main" },
      dirty_paths: [],
      policy_digest: null,
      config_digest: null,
      context_digest: null,
      task_history_cursor: null,
      captured_at: NOW,
    }),
    work_items: {
      schema_version: 1 as const,
      work_items: [
        {
          id: "sync-base",
          objective: "Synchronize the approved base before implementation.",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["sync-result"],
          scope_roots: ["packages/agentplane/src"],
          acceptance_criteria: check.criteria,
          validation: check,
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "medium" as const,
          capabilities: ["task.verify"],
          resource_claims: [claim],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: check,
  };
  const plan = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const approved = approveTaskPlan({
    plan,
    expected_digest: plan.digest,
    actor: "USER",
    approved_at: NOW,
  });
  const aggregate = materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: taskId,
      revision: 1,
      title: "Sync base",
      description: "Sync base",
      status: "DOING",
      acceptance_criteria: ["sync"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan: approved,
    now: NOW,
  });
  return {
    id: taskId,
    title: "Sync base",
    description: "Sync base",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    plan_approval: { state: "approved", approved_by: "USER", approved_at: NOW },
    extensions: withTaskCentricAggregate({}, aggregate),
  };
}

async function git(cwd: string, ...args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, { cwd });
  return result.stdout.trim();
}

describe("branch base synchronization route observation", () => {
  it("emits an exact ready operation only for a ready exclusive plan claim", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-sync-route-"));
    await git(root, "init", "-b", "main");
    await git(root, "config", "user.name", "Test User");
    await git(root, "config", "user.email", "test@example.com");
    await writeFile(path.join(root, "base.txt"), "one\n", "utf8");
    await git(root, "add", ".");
    await git(root, "commit", "-m", "test: initial");
    await git(root, "checkout", "-b", "task/sync");
    await writeFile(path.join(root, "task.txt"), "task\n", "utf8");
    await git(root, "add", ".");
    await git(root, "commit", "-m", "test: task");
    const taskHead = await git(root, "rev-parse", "HEAD");
    await git(root, "checkout", "main");
    await writeFile(path.join(root, "base.txt"), "two\n", "utf8");
    await git(root, "commit", "-am", "test: base");
    const baseSha = await git(root, "rev-parse", "HEAD");
    const worktreePath = path.join(root, "task-worktree");
    await git(root, "worktree", "add", worktreePath, "task/sync");

    await expect(
      observeBranchBaseSync({
        gitRoot: root,
        task: taskWithClaim(
          { kind: "exclusive", resource: `branch-base:main@${baseSha}`, mode: "exclusive" },
          baseSha,
        ),
        configuredBaseBranch: "main",
        taskWorktree: {
          state: "clean",
          branch: "task/sync",
          worktreePath,
          changedPaths: [],
        },
      }),
    ).resolves.toEqual({
      state: "ready",
      workItemId: "sync-base",
      branch: "task/sync",
      baseBranch: "main",
      expectedHeadSha: taskHead,
      expectedBaseSha: baseSha,
    });
  });

  it("fails closed for a branch-base claim with the wrong authority kind", async () => {
    const baseSha = "a".repeat(40);
    await expect(
      observeBranchBaseSync({
        gitRoot: "/unused",
        task: taskWithClaim(
          { kind: "path", resource: `branch-base:main@${baseSha}`, mode: "write" },
          baseSha,
        ),
        configuredBaseBranch: "main",
        taskWorktree: {
          state: "not_present",
          branch: "task/sync",
          worktreePath: null,
          changedPaths: [],
        },
      }),
    ).resolves.toMatchObject({ state: "invalid", workItemId: "sync-base" });
  });
});
