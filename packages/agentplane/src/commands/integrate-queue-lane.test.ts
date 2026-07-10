import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { PrFlowStatusReport } from "./pr/flow-status.js";
import type { CommandContext } from "./shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  loadBackendTask: vi.fn(),
  resolvePrFlowStatus: vi.fn(),
  output: {
    json: vi.fn(),
    line: vi.fn(),
    lines: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("./shared/task-backend.js", () => ({
  loadBackendTask: mocks.loadBackendTask,
}));

vi.mock("./pr/flow-status.js", () => ({
  resolvePrFlowStatus: mocks.resolvePrFlowStatus,
}));

vi.mock("../cli/output.js", () => ({
  createCliEmitter: () => mocks.output,
}));

import { runIntegrationQueueDoctor } from "./integrate-queue-doctor-command.js";
import { normalizeTerminalQueueEntries } from "./integrate-queue-lane.js";
import {
  readIntegrationQueue,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";

function queueEntry(): IntegrationQueueEntry {
  return {
    task_id: "T-1",
    branch: "task/T-1/work",
    base: "main",
    head_sha: "head",
    base_sha: "base",
    changed_paths: ["src/work.ts"],
    pr_number: 101,
    pr_url: "https://example.invalid/pull/101",
    priority: 0,
    status: "queued",
    enqueued_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

function report(
  pr: PrFlowStatusReport["pr"],
  closeTail: PrFlowStatusReport["closeTail"],
): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DONE", verification: "ok" },
    branch: { name: "task/T-1/work", headSha: "head", metaHeadSha: "head" },
    pr,
    closeTail,
    hostedChecks: { checked: false, reason: "not needed for queue recovery test" },
    reviewThreads: { checked: false, reason: "not needed for queue recovery test" },
    queue: { present: true, status: "queued", reason: null, updatedAt: null },
    handoff: { present: false },
    nextAction: "wait hosted checks",
  };
}

const openReport = report(
  {
    provider: "github",
    state: "OPEN",
    source: "lookup",
    prNumber: 101,
    prUrl: "https://example.invalid/pull/101",
    base: "main",
    headSha: "head",
    mergeCommit: null,
  },
  {
    state: "not_applicable",
    reason: "implementation PR is not merged or merge commit is unavailable",
  },
);

const completedReport = report(
  {
    provider: "github",
    state: "MERGED",
    source: "lookup",
    prNumber: 101,
    prUrl: "https://example.invalid/pull/101",
    base: "main",
    headSha: "head",
    mergeCommit: "merge",
  },
  { state: "recorded_on_base", base: "main" },
);

describe("integration queue terminal recovery", () => {
  const roots: string[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.loadBackendTask.mockResolvedValue({ task: { status: "DONE" } });
  });

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  async function makeQueueRoot(): Promise<string> {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-queue-terminal-"));
    roots.push(root);
    await writeIntegrationQueue(root, { schema_version: 1, entries: [queueEntry()] });
    return root;
  }

  it("does not normalize a pre-merge DONE task while its provider PR is open", async () => {
    const root = await makeQueueRoot();
    mocks.resolvePrFlowStatus.mockResolvedValue(openReport);

    await normalizeTerminalQueueEntries({
      ctx: {} as CommandContext,
      cwd: root,
      gitRoot: root,
      quiet: true,
    });

    const queue = await readIntegrationQueue(root);
    expect(queue.entries[0]?.status).toBe("queued");
    expect(mocks.resolvePrFlowStatus).toHaveBeenCalledOnce();
  });

  it("keeps doctor from repairing an open PR entry and closes it after Hosted Close evidence", async () => {
    const root = await makeQueueRoot();
    mocks.resolvePrFlowStatus.mockResolvedValueOnce(openReport);

    await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: true },
    });

    const openQueue = await readIntegrationQueue(root);
    expect(openQueue.entries[0]?.status).toBe("queued");

    mocks.resolvePrFlowStatus.mockResolvedValueOnce(completedReport);
    await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: true },
    });

    const completedQueue = await readIntegrationQueue(root);
    expect(completedQueue.entries[0]?.status).toBe("done");
  });
});
