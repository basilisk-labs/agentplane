import { captureStdIO } from "@agentplane/testkit";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

const listTaskSummariesMemo = vi.fn<(...args: unknown[]) => Promise<unknown>>();
const listCompletedScopeDiagnosticProjection = vi.fn<(...args: unknown[]) => Promise<unknown>>();

vi.mock("../shared/task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  listTaskSummariesMemo: (...args: unknown[]) => listTaskSummariesMemo(...args),
}));
vi.mock("../shared/task-backend-branch-snapshot.js", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  listCompletedScopeDiagnosticProjection: (...args: unknown[]) =>
    listCompletedScopeDiagnosticProjection(...args),
}));

const { listTaskSummariesForDisplay } = await import("./list.js");

const ctx = {} as CommandContext;
const unproven = new CliError({
  code: "E_VALIDATION",
  message: "Completed scope source authentication failed: ENOENT",
  context: { reason_code: "completed_scope_admission_unproven", task_id: "T-1" },
});

describe("task list in a checkout without local completed-scope evidence", () => {
  beforeEach(() => {
    listTaskSummariesMemo.mockReset();
    listCompletedScopeDiagnosticProjection.mockReset();
  });

  it("falls back to the diagnostic projection and warns instead of failing", async () => {
    listTaskSummariesMemo.mockRejectedValue(unproven);
    const tasks = [{ id: "T-1" }, { id: "T-2" }];
    listCompletedScopeDiagnosticProjection.mockResolvedValue({
      tasks,
      failures: new Map([["T-1", unproven]]),
    });
    const io = captureStdIO();
    try {
      await expect(
        listTaskSummariesForDisplay(ctx, { projectionStatus: undefined, strictRead: false }),
      ).resolves.toBe(tasks);
      expect(io.stderr).toContain("completed-scope admission is unproven");
      expect(io.stderr).toContain("T-1");
    } finally {
      io.restore();
    }
  });

  it("keeps failing under --strict-read", async () => {
    listTaskSummariesMemo.mockRejectedValue(unproven);
    await expect(
      listTaskSummariesForDisplay(ctx, { projectionStatus: undefined, strictRead: true }),
    ).rejects.toBe(unproven);
    expect(listCompletedScopeDiagnosticProjection).not.toHaveBeenCalled();
  });

  it("does not mask unrelated listing errors", async () => {
    const other = new CliError({ code: "E_IO", message: "disk error" });
    listTaskSummariesMemo.mockRejectedValue(other);
    await expect(
      listTaskSummariesForDisplay(ctx, { projectionStatus: undefined, strictRead: false }),
    ).rejects.toBe(other);
    expect(listCompletedScopeDiagnosticProjection).not.toHaveBeenCalled();
  });
});
