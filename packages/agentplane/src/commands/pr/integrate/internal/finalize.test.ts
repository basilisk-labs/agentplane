import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  createCliEmitter: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  writeJsonStableIfChanged: vi.fn(),
  writeTextIfChanged: vi.fn(),
  gitDiffStat: vi.fn(),
  appendVerifyLog: vi.fn(),
  parsePrMeta: vi.fn(),
  buildIntegratedPrMeta: vi.fn(),
  readCommitInfo: vi.fn(),
  writeFinishedTasks: vi.fn(),
  refreshAcrArtifactsForFinishedTasks: vi.fn(),
  createTaskCloseCommit: vi.fn(),
  collectTaskIncidents: vi.fn(),
}));

vi.mock("../../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("../../../../cli/output.js", () => ({ createCliEmitter: mocks.createCliEmitter }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../../../../shared/write-if-changed.js", () => ({
  writeJsonStableIfChanged: mocks.writeJsonStableIfChanged,
  writeTextIfChanged: mocks.writeTextIfChanged,
}));
vi.mock("@agentplaneorg/core/git", () => ({ gitDiffStat: mocks.gitDiffStat }));
vi.mock("../../../shared/pr-meta.js", () => ({
  appendVerifyLog: mocks.appendVerifyLog,
  parsePrMeta: mocks.parsePrMeta,
  buildIntegratedPrMeta: mocks.buildIntegratedPrMeta,
}));
vi.mock("../../../task/shared.js", () => ({ readCommitInfo: mocks.readCommitInfo }));
vi.mock("../../../incidents/shared.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    collectTaskIncidents: mocks.collectTaskIncidents,
  };
});
vi.mock("../../../task/finish-shared.js", () => ({
  writeFinishedTasks: mocks.writeFinishedTasks,
  refreshAcrArtifactsForFinishedTasks: mocks.refreshAcrArtifactsForFinishedTasks,
  createTaskCloseCommit: mocks.createTaskCloseCommit,
}));

function baseOpts() {
  return {
    cwd: "/repo",
    ctx: { config: {}, git: {}, taskBackend: {} },
    task: { id: "T-1", status: "DOING", title: "Task" },
    gitRoot: "/repo",
    prDir: "/repo/.agentplane/tasks/T-1/pr",
    metaPath: "/repo/.agentplane/tasks/T-1/pr/meta.json",
    diffstatPath: "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
    verifyLogPath: "/repo/.agentplane/tasks/T-1/pr/verify.log",
    taskId: "T-1",
    branch: "task/T-1",
    base: "main",
    mergeStrategy: "squash" as const,
    mergeHash: "deadbeef",
    branchHeadSha: "deadbeef",
    baseShaBeforeMerge: "cafebabe",
    verifyEntries: [] as { header: string; content: string }[],
    verifyCommands: [] as string[],
    alreadyVerifiedSha: null as string | null,
    shouldRunVerify: false,
    quiet: true,
  };
}

describe("pr/integrate/internal/finalize", () => {
  let emitter: { info: ReturnType<typeof vi.fn>; success: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    emitter = {
      info: vi.fn(),
      success: vi.fn(),
    };
    mocks.createCliEmitter.mockReturnValue(emitter);
    mocks.collectTaskIncidents.mockResolvedValue({
      loaded: null,
      registryPath: "/repo/.agentplane/policy/incidents.md",
      registryText: "",
      registry: null,
      plan: { candidates: [], skipped: [], promotable: [], duplicates: [], issues: [] },
      wrote: false,
    });
  });

  it("rejects when PR directory is missing", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(false);
    await expect(finalizeIntegrate(baseOpts())).rejects.toMatchObject<CliError>({
      code: "E_VALIDATION",
    });
  });

  it("appends verify log entries and writes merged meta with verify pass", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue('{"verify":{"status":"skipped"}}');
    mocks.parsePrMeta.mockReturnValue({
      schema_version: 1,
      task_id: "T-1",
      verify: { status: "skipped" },
      merged_at: "2026-02-10T00:00:00.000Z",
    });
    mocks.buildIntegratedPrMeta.mockReturnValue({
      schema_version: 1,
      task_id: "T-1",
      status: "MERGED",
      verify: { status: "pass" },
    });
    mocks.gitDiffStat.mockResolvedValue(" src/app.ts | 1 +");
    mocks.readCommitInfo.mockResolvedValue({ hash: "deadbeef", message: "merge" });

    await finalizeIntegrate({
      ...baseOpts(),
      quiet: false,
      verifyEntries: [{ header: "verify-1", content: "ok" }],
      verifyCommands: ["bun test"],
      shouldRunVerify: true,
    });

    expect(mocks.appendVerifyLog).toHaveBeenCalledTimes(1);
    expect(mocks.writeJsonStableIfChanged).toHaveBeenCalledTimes(1);
    expect(mocks.buildIntegratedPrMeta).toHaveBeenCalledWith(
      expect.objectContaining({
        branch: "task/T-1",
        base: "main",
        mergeStrategy: "squash",
        verifyCommands: ["bun test"],
      }),
    );
    expect(mocks.writeTextIfChanged).toHaveBeenCalledWith(
      "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      " src/app.ts | 1 +\n",
    );
    expect(mocks.writeFinishedTasks).toHaveBeenCalledTimes(1);
    expect(mocks.writeFinishedTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        loadedTasks: [{ taskId: "T-1", task: { id: "T-1", status: "DOING", title: "Task" } }],
        metaTaskId: "T-1",
        taskCommitInfo: { hash: "deadbeef", message: "merge" },
      }),
    );
    expect(mocks.refreshAcrArtifactsForFinishedTasks).toHaveBeenCalledWith(
      expect.objectContaining({
        loadedTasks: [{ taskId: "T-1", task: { id: "T-1", status: "DOING", title: "Task" } }],
        taskCommitInfo: { hash: "deadbeef", message: "merge" },
        author: "INTEGRATOR",
      }),
    );
    expect(mocks.createTaskCloseCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        baseBranchOverride: "main",
        allowPolicy: false,
        closeRefreshTaskArtifacts: false,
      }),
    );
    expect(mocks.collectTaskIncidents).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ taskId: "T-1", write: false }),
    );
    const secondIncidentCall = mocks.collectTaskIncidents.mock.calls[1];
    expect(secondIncidentCall).toBeDefined();
    expect(secondIncidentCall?.[0]).toMatchObject({
      taskId: "T-1",
      task: { id: "T-1" },
      write: true,
    });
  });

  it("skips verify metadata update when verify commands are absent", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue("{}");
    mocks.parsePrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.buildIntegratedPrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.gitDiffStat.mockResolvedValue("");
    mocks.readCommitInfo.mockResolvedValue({ hash: "deadbeef", message: "merge" });

    await finalizeIntegrate(baseOpts());

    expect(mocks.buildIntegratedPrMeta).toHaveBeenCalledWith(
      expect.objectContaining({
        verifyCommands: [],
        shouldRunVerify: false,
        alreadyVerifiedSha: null,
      }),
    );
  });

  it("reports skipped structured findings when integrate does not promote incidents", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue("{}");
    mocks.parsePrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.buildIntegratedPrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.gitDiffStat.mockResolvedValue("");
    mocks.readCommitInfo.mockResolvedValue({ hash: "deadbeef", message: "merge" });
    mocks.collectTaskIncidents.mockResolvedValue({
      loaded: null,
      registryPath: "/repo/.agentplane/policy/incidents.md",
      registryText: "",
      registry: null,
      plan: {
        candidates: [],
        skipped: [
          {
            observation: "transport drift",
            line: 1,
            reason: "not_marked_external_or_promotable",
            rawFields: {},
          },
        ],
        promotable: [],
        duplicates: [],
        issues: [],
      },
      wrote: false,
    });

    await finalizeIntegrate({ ...baseOpts(), quiet: false });

    expect(emitter.info).toHaveBeenCalledWith(
      expect.stringContaining("structured finding stayed task-local"),
    );
  });

  it("explains plain Findings text when integrate sees no structured incident blocks", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue("{}");
    mocks.parsePrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.buildIntegratedPrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.gitDiffStat.mockResolvedValue("");
    mocks.readCommitInfo.mockResolvedValue({ hash: "deadbeef", message: "merge" });
    mocks.collectTaskIncidents.mockResolvedValue({
      loaded: null,
      registryPath: "/repo/.agentplane/policy/incidents.md",
      registryText: "",
      registry: null,
      plan: {
        candidates: [],
        skipped: [],
        promotable: [],
        duplicates: [],
        issues: [],
        findingsTextPresent: true,
        structuredFindingCount: 0,
      },
      wrote: false,
    });

    await finalizeIntegrate({ ...baseOpts(), quiet: false });

    expect(emitter.info).toHaveBeenCalledWith(
      expect.stringContaining("plain Findings text stays task-local"),
    );
  });

  it("uses a meta-only recovery path when the task is already DONE", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue("{}");
    mocks.parsePrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.buildIntegratedPrMeta.mockReturnValue({ schema_version: 1, task_id: "T-1" });
    mocks.gitDiffStat.mockResolvedValue("");
    mocks.readCommitInfo.mockResolvedValue({ hash: "deadbeef", message: "merge" });

    await finalizeIntegrate({
      ...baseOpts(),
      quiet: false,
      task: { id: "T-1", status: "DONE", title: "Task", commit: { hash: "task-sha" } },
    });

    expect(mocks.writeFinishedTasks).not.toHaveBeenCalled();
    expect(mocks.readCommitInfo).not.toHaveBeenCalled();
    expect(mocks.createTaskCloseCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        baseBranchOverride: "main",
      }),
    );
    expect(emitter.info).toHaveBeenCalledWith(
      "task already DONE; integrating only missing PR metadata and close artifacts",
    );
  });
});
