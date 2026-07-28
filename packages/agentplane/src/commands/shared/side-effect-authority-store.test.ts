import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { buildStateFingerprint, type StateFingerprint } from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  evaluateWorkflowOperationAuthority,
  withSideEffectAuthorityState,
} from "./side-effect-authority.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "./side-effect-authority-store.js";
import type { WorkflowOperation } from "./workflow-step.js";

const execFileAsync = promisify(execFile);
const taskId = "202607281303-AUTHST";
const taskBranch = `task/${taskId}/authority-store`;
const operation = {
  id: "integration.enqueue",
  type: "integration_enqueue",
  params: { taskId, branch: taskBranch },
} as Pick<WorkflowOperation, "id" | "type" | "params">;

function fingerprint(): StateFingerprint {
  return buildStateFingerprint({
    task_id: taskId,
    task_revision: 3,
    git_head: "a".repeat(40),
    worktree: "/repo/.agentplane/worktrees/authority-store",
    components: {
      task: { state: "present", source: "fixture", value: { title: "Authority store" } },
      git: { state: "present", source: "fixture", value: { trackedContent: "source-tree" } },
      backend_projection: { state: "present", source: "fixture", value: { backend: "local" } },
      policy: { state: "present", source: "fixture", value: { rule: "workflow" } },
      blueprint: { state: "present", source: "fixture", value: { digest: "blueprint" } },
      knowledge: { state: "present", source: "fixture", value: { digest: "knowledge" } },
      provider: { state: "present", source: "fixture", value: { pr: "open" } },
      authority: { state: "present", source: "fixture", value: { route: operation.id } },
    },
  });
}

function approvedState() {
  const issuedAt = "2026-07-28T10:00:00.000Z";
  const grant = createSideEffectAuthorityRecord({
    id: "authority-store-fixture",
    actor: "USER",
    operation,
    fingerprint: fingerprint(),
    issuedAt,
    expiresAt: "2026-07-28T10:15:00.000Z",
  });
  return appendSideEffectAuthorityAudit({
    state: { schemaVersion: 1, grants: [grant], audit: [] },
    at: issuedAt,
    actor: "USER",
    operation,
    fingerprint: fingerprint(),
    authority: grant,
    outcome: "approved",
  });
}

async function git(root: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: root });
  return stdout.trim();
}

describe("side-effect authority store", () => {
  it("shares an auditable authority with the integration checkout without moving the PR head", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-authority-store-"));
    const integration = path.join(root, "integration");
    try {
      await git(root, ["init", "--initial-branch=main"]);
      await git(root, ["config", "user.name", "AgentPlane test"]);
      await git(root, ["config", "user.email", "test@example.test"]);
      await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
      await git(root, ["add", "seed.txt"]);
      await git(root, ["commit", "-m", "seed"]);
      await git(root, ["worktree", "add", "-b", taskBranch, integration]);
      const before = await git(integration, ["rev-parse", "HEAD"]);

      await persistSideEffectAuthorityState({
        gitRoot: integration,
        taskId,
        state: approvedState(),
      });

      expect(await git(integration, ["rev-parse", "HEAD"])).toBe(before);
      expect(await git(integration, ["status", "--porcelain"])).toBe("");
      const loaded = await loadSideEffectAuthorityState({
        gitRoot: root,
        taskId,
        task: { extensions: {} },
      });
      expect(loaded).toMatchObject({ source: "git_common_dir" });
      if (!loaded.state) throw new Error("Expected a persisted authority state.");
      expect(
        evaluateWorkflowOperationAuthority({
          task: { extensions: withSideEffectAuthorityState({ extensions: {} }, loaded.state) },
          operation,
          fingerprint: fingerprint(),
          now: new Date("2026-07-28T10:01:00.000Z"),
        }),
      ).toMatchObject({ state: "allowed", authorityRef: "authority:authority-store-fixture" });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("fails closed when the persisted authority envelope is malformed", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-authority-store-"));
    try {
      await git(root, ["init", "--initial-branch=main"]);
      const commonDir = await git(root, [
        "rev-parse",
        "--path-format=absolute",
        "--git-common-dir",
      ]);
      const target = path.join(commonDir, "agentplane", "side-effect-authority", `${taskId}.json`);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, "{not-json}\n", "utf8");
      await expect(
        loadSideEffectAuthorityState({
          gitRoot: root,
          taskId,
          task: { extensions: {} },
        }),
      ).resolves.toMatchObject({
        state: null,
        source: "invalid",
      });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
