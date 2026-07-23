import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { assessPreMergeClosureFreshness } from "./hosted-close-premerge.js";

const execFileAsync = promisify(execFile);
const roots: string[] = [];

async function commit(
  root: string,
  fileName: string,
  text: string,
  message: string,
): Promise<string> {
  await writeFile(path.join(root, fileName), text, "utf8");
  await execFileAsync("git", ["add", fileName], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

async function makeHistory() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-premerge-"));
  roots.push(root);
  await execFileAsync("git", ["init", "-b", "task/T-1/work"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  const implementation = await commit(root, "impl.txt", "implementation\n", "implementation");
  const basis = await commit(root, "quality.txt", "quality\n", "quality artifacts");
  const head = await commit(root, "closure.txt", "closure\n", "pre-merge closure");
  return { root, implementation, basis, head };
}

function task(implementation: string): TaskData {
  return {
    id: "T-1",
    title: "Task",
    description: "Task",
    status: "DONE",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    plan_approval: {
      state: "approved",
      updated_at: "2026-01-01T00:00:00.000Z",
      updated_by: "ORCHESTRATOR",
      note: null,
    },
    verification: {
      state: "ok",
      attempts: 1,
      updated_at: "2026-01-01T00:10:00.000Z",
      updated_by: "CODER",
      note: "ok",
    },
    quality_review: {
      state: "pass",
      updated_at: "2026-01-01T00:20:00.000Z",
      updated_by: "EVALUATOR",
      note: "pass",
      evaluated_sha: implementation,
      blueprint_digest: null,
      evidence_refs: ["quality-report.json"],
      findings: ["No blocking findings."],
    },
    commit: { hash: implementation, message: "implementation" },
  };
}

function meta(basis: string) {
  return {
    schema_version: 1 as const,
    task_id: "T-1",
    branch: "task/T-1/work",
    base: "main",
    status: "OPEN" as const,
    pr_number: 101,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    verify: { status: "pass" as const },
    pre_merge_closure: {
      state: "closed_before_merge",
      branch: "task/T-1/work",
      basis_commit: basis,
      recorded_at: "2026-01-01T00:30:00.000Z",
      pr_number: 101,
    },
  };
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("pre-merge closure freshness", () => {
  it("accepts the verified and reviewed implementation-to-basis-to-head chain", async () => {
    const history = await makeHistory();

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: task(history.implementation),
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toEqual({ fresh: true, basisCommit: history.basis });
  });

  it("rejects an old closure after a newer task commit", async () => {
    const history = await makeHistory();
    const changedTask = task(history.head);

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: changedTask,
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "task commit is not covered by the closure basis commit",
    });
  });

  it("rejects a closure recorded before the latest verification", async () => {
    const history = await makeHistory();
    const changedTask = task(history.implementation);
    changedTask.verification = {
      ...changedTask.verification!,
      updated_at: "2026-01-01T00:40:00.000Z",
    };

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: changedTask,
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "pre-merge closure predates the latest verification",
    });
  });

  it("rejects a closure recorded before the latest quality review", async () => {
    const history = await makeHistory();
    const changedTask = task(history.implementation);
    changedTask.quality_review = {
      ...changedTask.quality_review!,
      updated_at: "2026-01-01T00:40:00.000Z",
    };

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: changedTask,
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "pre-merge closure predates the latest quality review",
    });
  });

  it("rejects a closure marker cleared after verification rework", async () => {
    const history = await makeHistory();
    const reworkTask = task(history.implementation);
    reworkTask.verification = {
      ...reworkTask.verification!,
      state: "needs_rework",
      updated_at: "2026-01-01T00:40:00.000Z",
    };
    const { pre_merge_closure: _clearedMarker, ...clearedMeta } = meta(history.basis);

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: reworkTask,
        meta: clearedMeta,
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "pre-merge closure marker is missing",
    });
  });

  it("rejects a reviewed SHA outside the closure basis history", async () => {
    const history = await makeHistory();
    await execFileAsync("git", ["checkout", "-b", "review-side", history.implementation], {
      cwd: history.root,
    });
    const outsideReview = await commit(
      history.root,
      "review-side.txt",
      "outside review\n",
      "outside review",
    );
    await execFileAsync("git", ["checkout", "task/T-1/work"], { cwd: history.root });
    const changedTask = task(history.implementation);
    changedTask.quality_review = {
      ...changedTask.quality_review!,
      evaluated_sha: outsideReview,
    };

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: changedTask,
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: history.head,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "quality-reviewed commit is not covered by the closure basis",
    });
  });

  it("rejects a closure basis outside the current branch head history", async () => {
    const history = await makeHistory();
    await execFileAsync("git", ["checkout", "-b", "alternate-head", history.implementation], {
      cwd: history.root,
    });
    const alternateHead = await commit(
      history.root,
      "alternate.txt",
      "alternate\n",
      "alternate head",
    );
    await execFileAsync("git", ["checkout", "task/T-1/work"], { cwd: history.root });

    await expect(
      assessPreMergeClosureFreshness({
        gitRoot: history.root,
        task: task(history.implementation),
        meta: meta(history.basis),
        branch: "task/T-1/work",
        prNumber: 101,
        branchHeadSha: alternateHead,
      }),
    ).resolves.toMatchObject({
      fresh: false,
      reason: "closure basis is not an ancestor of the current branch head",
    });
  });
});
