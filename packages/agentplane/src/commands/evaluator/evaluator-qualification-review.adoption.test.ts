import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { TaskData } from "../../backends/task-backend.js";
import { createExistingPrAdoptionStore } from "../pr/adoption-store.js";
import type { AdoptedPrIdentity } from "../pr/adoption-identity.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";

const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/repo",
  targetProject: "example/repo",
  sourceUrl: "https://github.com/example/repo.git",
  targetUrl: "https://github.com/example/repo.git",
};
const head = "a".repeat(40);
const base = "b".repeat(40);
const observe = vi.fn(() =>
  Promise.resolve({
    state: "found" as const,
    pr: {
      provider: "github" as const,
      identity,
      prNumber: 42,
      prUrl: "https://github.com/example/repo/pull/42",
      status: "OPEN" as const,
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: base,
      headRef: "upgrade",
      headSha: head,
    },
  }),
);
vi.mock("../pr/internal/change-request-provider.js", () => ({
  resolveChangeRequestIdentity: () => Promise.resolve(identity),
  observeExistingChangeRequestByNumber: observe,
}));
const { resolveEvaluatorReviewTarget } = await import("./evaluator-qualification-review.js");

const roots: string[] = [];
afterEach(async () =>
  Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true }))),
);

describe("adopted evaluator target", () => {
  it("uses the exact current hosted PR SHA for preparation and staleness", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-adopted-review-"));
    roots.push(root);
    await execFileAsync("git", ["init", root], { cwd: root });
    const receipt = {
      schema_version: 1,
      task_id: "T-1",
      provider: "github",
      hostname: "github.com",
      remote: "origin",
      source_project: "example/repo",
      target_project: "example/repo",
      pr_number: 42,
      head_ref: "upgrade",
      base_ref: "main",
      head_sha: head,
      base_sha: base,
      observed_at: "2026-10-27T00:00:00Z",
      readback_digest: `sha256:${"c".repeat(64)}`,
      authority_digest: `sha256:${"d".repeat(64)}`,
    } as AdoptedPrIdentity;
    await createExistingPrAdoptionStore({ gitRoot: root, workflowDir: "tasks" }).createIfUnbound(
      receipt,
    );
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: "tasks" } },
    } as CommandContext;
    const task = { id: "T-1" } as TaskData;
    const execution = { selected_mode: "branch_pr", base_ref: "main" } as TaskExecutionContext;
    await expect(
      resolveEvaluatorReviewTarget({ ctx, task, reason: "preparation", execution }),
    ).resolves.toEqual({ evaluatedSha: head, qualificationPacket: null });
    observe.mockResolvedValueOnce({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: 42,
        prUrl: null,
        status: "OPEN",
        mergedAt: null,
        mergeCommit: null,
        base: "main",
        baseSha: base,
        headRef: "upgrade",
        headSha: "e".repeat(40),
      },
    });
    await expect(
      resolveEvaluatorReviewTarget({ ctx, task, reason: "staleness", execution }),
    ).resolves.toEqual({ evaluatedSha: "e".repeat(40), qualificationPacket: null });
  });
});
