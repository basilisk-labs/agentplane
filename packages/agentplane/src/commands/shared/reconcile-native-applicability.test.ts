import path from "node:path";
import { defaultConfig } from "@agentplaneorg/core/config";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { CliError } from "../../shared/errors.js";
import { readTaskKernel } from "../task/kernel-read.js";
import { ensureReconciledBeforeMutation } from "./reconcile-check.js";
import type * as TaskBackend from "./task-backend.js";
import { loadTaskFromContext, type CommandContext } from "./task-backend.js";

vi.mock("./task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<typeof TaskBackend>()),
  loadTaskFromContext: vi.fn(),
}));
vi.mock("../task/kernel-read.js", () => ({ readTaskKernel: vi.fn() }));

function context(warnings: string[] = []) {
  const listTasks = vi.fn().mockResolvedValue([]);
  const ctx = {
    resolvedProject: { gitRoot: "/repo", agentplaneDir: "/repo/.agentplane" },
    config: defaultConfig(),
    taskBackend: {
      id: "local",
      capabilities: {
        canonical_source: "local",
        writes_task_readmes: true,
        atomic_task_record: true,
      },
      listTasks,
      getTask: vi.fn().mockResolvedValue(null),
      getLastListWarnings: () => warnings,
    },
    backendId: "local",
    git: { statusChangedPaths: vi.fn().mockResolvedValue([]) },
    memo: { taskWorktreeInventory: Promise.resolve([]) },
  } as unknown as CommandContext;
  return { ctx, listTasks };
}

const nativeTask = {
  id: "T-ACTIVE",
  extensions: { [TASK_KERNEL_EXTENSION]: {} },
} as Awaited<ReturnType<typeof loadTaskFromContext>>;

beforeEach(() => vi.resetAllMocks());

describe("native reconcile fast-path applicability", () => {
  it("uses strict scan when the requested root task is absent", async () => {
    const { ctx, listTasks } = context();
    vi.mocked(loadTaskFromContext).mockRejectedValue(
      new CliError({
        code: "E_IO",
        exitCode: 4,
        message: `ENOENT: no such file or directory, open '${path.join("/repo", ctx.config.paths.workflow_dir, "T-ACTIVE", "README.md")}'`,
      }),
    );
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", taskIds: ["T-ACTIVE"] }),
    ).resolves.toBeUndefined();
    expect(listTasks).toHaveBeenCalledOnce();
  });

  it("retains structured corrupt legacy README diagnostics", async () => {
    const { ctx } = context(["skip:T-ACTIVE: invalid_readme_frontmatter"]);
    vi.mocked(loadTaskFromContext).mockRejectedValue(
      new Error("Task README is missing YAML frontmatter"),
    );
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", taskIds: ["T-ACTIVE"] }),
    ).rejects.toMatchObject({
      context: { reason_code: "reconcile_task_scan_incomplete" },
      message:
        "reconcile check failed: task README for T-ACTIVE has invalid frontmatter and could not be parsed",
    });
  });

  it.each([
    new Error("unexpected owner read failure"),
    new CliError({
      code: "E_IO",
      exitCode: 4,
      message: "ENOENT: no such file or directory, open '/repo/owner/README.md'",
    }),
  ])("does not suppress an unexplained load failure after a clean scan", async (error) => {
    const { ctx } = context();
    vi.mocked(loadTaskFromContext).mockRejectedValue(error);
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", taskIds: ["T-ACTIVE"] }),
    ).rejects.toBe(error);
  });

  it("rejects malformed native state without falling back to a clean scan", async () => {
    const { ctx, listTasks } = context();
    vi.mocked(loadTaskFromContext).mockResolvedValue(nativeTask);
    vi.mocked(readTaskKernel).mockResolvedValue({
      kind: "malformed",
      reason: "invalid",
      fields: [],
    });
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", taskIds: ["T-ACTIVE"] }),
    ).rejects.toMatchObject({
      message:
        "reconcile check failed: task scan error (Required task T-ACTIVE has malformed native state)",
    });
    expect(listTasks).not.toHaveBeenCalled();
  });

  it("keeps missing native dependencies blocking", async () => {
    const { ctx, listTasks } = context();
    vi.mocked(loadTaskFromContext)
      .mockResolvedValueOnce({ ...nativeTask, depends_on: ["T-DEPENDENCY"] })
      .mockRejectedValueOnce(new Error("missing dependency"));
    vi.mocked(readTaskKernel).mockResolvedValue({ kind: "canonical" } as Awaited<
      ReturnType<typeof readTaskKernel>
    >);
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", taskIds: ["T-ACTIVE"] }),
    ).rejects.toMatchObject({
      message: "reconcile check failed: task scan error (missing dependency)",
    });
    expect(listTasks).not.toHaveBeenCalled();
  });
});
