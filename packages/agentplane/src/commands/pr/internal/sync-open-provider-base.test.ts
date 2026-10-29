import type * as ProviderBase from "./provider-base.js";
import type * as SyncBranch from "./sync-branch.js";
import type * as StableWriter from "../../../shared/write-if-changed.js";
import * as ownership from "./branch-task-artifact-ownership.js";
import { syncPrArtifacts } from "./sync.js";
import { fixture } from "../../task/kernel-completed-external-rework.testkit.js";
import { loadCommandContext } from "../../shared/task-backend.js";
import { taskExecutionBaseFromExtensions } from "@agentplaneorg/core/tasks";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  base: vi.fn(),
  diffstat: vi.fn(),
  identity: vi.fn(),
  observe: vi.fn(),
  create: vi.fn(),
  write: vi.fn<(...args: unknown[]) => Promise<boolean>>().mockResolvedValue(false),
  realWrites: false,
}));
vi.mock("./provider-base.js", async (original) => ({
  ...(await original<typeof ProviderBase>()),
  resolveProviderBaseBranch: mocks.base,
}));
vi.mock("./sync-branch.js", async (original) => ({
  ...(await original<typeof SyncBranch>()),
  computePrDiffstat: mocks.diffstat,
}));
vi.mock("../../../shared/write-if-changed.js", async (original) => {
  const actual = await original<typeof StableWriter>();
  return {
    ...actual,
    writeJsonStableIfChanged: (...args: Parameters<typeof actual.writeJsonStableIfChanged>) =>
      mocks.realWrites ? actual.writeJsonStableIfChanged(...args) : mocks.write(...args),
    writeTextIfChanged: (...args: Parameters<typeof actual.writeTextIfChanged>) =>
      mocks.realWrites ? actual.writeTextIfChanged(...args) : mocks.write(...args),
  };
});
vi.mock("./change-request-provider.js", () => ({
  resolveChangeRequestIdentity: mocks.identity,
  observeExistingChangeRequestByBranch: mocks.observe,
  tryCreateChangeRequest: mocks.create,
  formatChangeRequestLink: () => "linked",
  shouldPersistObservedChangeRequestIdentity: () => false,
}));
vi.mock("./review-template.js", () => ({
  buildGithubPrTitle: () => "Test",
  renderGithubPrBody: () => "Test body",
  renderPrAutoSummary: () => "Summary",
  renderPrReviewDocument: () => "Review",
  validateArtifactsLanguage: vi.fn(),
}));

import { runPrOpenSync } from "./sync-open-step.js";
import type { PrSyncCommonState } from "./sync-model.js";

const sha = "a".repeat(40);
const identity = {
  provider: "github",
  hostname: "github.com",
  remote: "upstream",
  sourceProject: "fork/project",
  targetProject: "owner/project",
  sourceUrl: "https://github.com/fork/project.git",
  targetUrl: "https://github.com/owner/project.git",
};

function common(): PrSyncCommonState {
  return {
    task: {
      id: "202609291026-W1BM6F",
      title: "Exact base",
      status: "DOING",
      description: "Test provider base resolution",
      priority: "medium",
      owner: "CODER",
      depends_on: [],
      tags: [],
      extensions: { task_execution_context: { base_ref: sha, base_sha: sha } },
    },
    resolved: { gitRoot: "/repo" },
    workflowDir: ".agentplane",
    tasksPath: ".agentplane/tasks.json",
    prDir: "/repo/pr",
    metaPath: "/repo/pr/meta.json",
    diffstatPath: "/repo/pr/diffstat.txt",
    notesPath: "/repo/pr/notes.md",
    verifyLogPath: "/repo/pr/verify.log",
    reviewPath: "/repo/pr/review.md",
    githubTitlePath: "/repo/pr/title.txt",
    githubBodyPath: "/repo/pr/body.md",
    artifactsLanguage: "en",
    existingMeta: null,
    relatedTaskIds: [],
    handoffNotes: [],
    now: "2026-09-29T11:00:00Z",
    createdAt: "2026-09-29T11:00:00Z",
    branch: "task/exact-base",
    baseBranch: sha,
    headSha: "b".repeat(40),
    artifactRefresh: false,
    providerBaseBranch: "main",
  };
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.realWrites = false;
  mocks.base.mockResolvedValue("main");
  mocks.diffstat.mockResolvedValue("1 file changed");
  mocks.identity.mockResolvedValue(identity);
  mocks.observe.mockResolvedValue({ state: "absent" });
  mocks.create.mockResolvedValue({ observed: { prNumber: 12 }, stagedReason: null });
});

describe("provider base resolution phase", () => {
  it("does not require live base resolution during local artifact sync", async () => {
    mocks.base.mockRejectedValue(new Error("network unavailable"));
    await runPrOpenSync(common(), { remoteMode: "sync-only" });
    expect(mocks.base).not.toHaveBeenCalled();
    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.diffstat).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: sha }));
  });

  it("uses the mapped branch for hosted lookup and creation, but keeps the frozen diff base", async () => {
    const input = common();
    await runPrOpenSync(input, { remoteMode: "auto" });
    expect(mocks.base).toHaveBeenCalledWith({
      gitRoot: "/repo",
      baseRef: sha,
      baseSha: sha,
      identity,
    });
    expect(mocks.observe).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: "main" }));
    expect(mocks.create).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: "main" }));
    expect(mocks.diffstat).toHaveBeenCalledWith(expect.objectContaining({ baseBranch: sha }));
    expect(input.baseBranch).toBe(sha);
  });

  it("stops before hosted mutation when the live base cannot be proven", async () => {
    mocks.base.mockRejectedValue(new Error("base moved"));
    await expect(runPrOpenSync(common(), { remoteMode: "auto" })).rejects.toThrow("base moved");
    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.observe).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
  });
});

it(
  "routes the exact frozen Task context to ownership before PR artifact writes",
  { timeout: 120_000 },
  async () => {
    mocks.realWrites = true;
    const f = await fixture();
    mocks.realWrites = false;
    mocks.write.mockClear();
    const ctx = await loadCommandContext({ cwd: f.root, rootOverride: null });
    const task = (await ctx.taskBackend.getTask(f.id))!;
    const base = taskExecutionBaseFromExtensions(task.extensions)!;
    const spy = vi
      .spyOn(ownership, "assertBranchTaskArtifactOwnership")
      .mockRejectedValueOnce(new Error("ownership boundary reached"));
    try {
      await expect(
        syncPrArtifacts({ ctx, cwd: f.root, taskId: f.id, mode: "open", remoteMode: "sync-only" }),
      ).rejects.toThrow(/ownership boundary reached/);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          primaryTaskId: f.id,
          baseBranch: base.base_ref,
          providerUpdate: { command: ctx, frozenBase: base.base_sha },
        }),
      );
      expect(mocks.create).not.toHaveBeenCalled();
      expect(mocks.write).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  },
);
