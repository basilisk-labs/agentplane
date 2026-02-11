import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  fileExists: vi.fn(),
  readFile: vi.fn(),
  writeJsonStableIfChanged: vi.fn(),
  writeTextIfChanged: vi.fn(),
  gitDiffStat: vi.fn(),
  appendVerifyLog: vi.fn(),
  parsePrMeta: vi.fn(),
  cmdFinish: vi.fn(),
}));

vi.mock("../../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../../../../shared/write-if-changed.js", () => ({
  writeJsonStableIfChanged: mocks.writeJsonStableIfChanged,
  writeTextIfChanged: mocks.writeTextIfChanged,
}));
vi.mock("../../../shared/git-diff.js", () => ({ gitDiffStat: mocks.gitDiffStat }));
vi.mock("../../../shared/pr-meta.js", () => ({
  appendVerifyLog: mocks.appendVerifyLog,
  parsePrMeta: mocks.parsePrMeta,
}));
vi.mock("../../../task/index.js", () => ({ cmdFinish: mocks.cmdFinish }));

function baseOpts() {
  return {
    cwd: "/repo",
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
  beforeEach(() => {
    vi.clearAllMocks();
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
      verify: { status: "skipped" },
      merged_at: "2026-02-10T00:00:00.000Z",
    });
    mocks.gitDiffStat.mockResolvedValue(" src/app.ts | 1 +");
    mocks.cmdFinish.mockResolvedValue(0);

    await finalizeIntegrate({
      ...baseOpts(),
      verifyEntries: [{ header: "verify-1", content: "ok" }],
      verifyCommands: ["bun test"],
      shouldRunVerify: true,
    });

    expect(mocks.appendVerifyLog).toHaveBeenCalledTimes(1);
    expect(mocks.writeJsonStableIfChanged).toHaveBeenCalledTimes(1);
    const writeMetaCall = mocks.writeJsonStableIfChanged.mock.calls.at(-1)?.[1] as Record<
      string,
      unknown
    >;
    expect(writeMetaCall.status).toBe("MERGED");
    expect((writeMetaCall.verify as Record<string, unknown>)?.status).toBe("pass");
    expect(mocks.writeTextIfChanged).toHaveBeenCalledWith(
      "/repo/.agentplane/tasks/T-1/pr/diffstat.txt",
      " src/app.ts | 1 +\n",
    );
    expect(mocks.cmdFinish).toHaveBeenCalledTimes(1);
  });

  it("skips verify metadata update when verify commands are absent", async () => {
    const { finalizeIntegrate } = await import("./finalize.js");
    mocks.fileExists.mockResolvedValue(true);
    mocks.readFile.mockResolvedValue("{}");
    mocks.parsePrMeta.mockReturnValue({});
    mocks.gitDiffStat.mockResolvedValue("");
    mocks.cmdFinish.mockResolvedValue(0);

    await finalizeIntegrate(baseOpts());

    const writeMetaCall = mocks.writeJsonStableIfChanged.mock.calls[0]?.[1] as Record<
      string,
      unknown
    >;
    expect(writeMetaCall.last_verified_sha).toBeUndefined();
    expect(writeMetaCall.verify).toBeUndefined();
  });
});
