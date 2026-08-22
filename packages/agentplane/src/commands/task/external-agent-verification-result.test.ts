import { beforeEach, describe, expect, it, vi } from "vitest";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", {
    value: <T>(factory: () => T): T => factory(),
  });
}

const mocks = vi.hoisted(() => ({
  readFile: vi.fn(),
  loadTask: vi.fn(),
  verify: vi.fn(),
  commit: vi.fn(),
  status: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));
vi.mock("./verify-record.js", () => ({ cmdVerifyParsed: mocks.verify }));
vi.mock("./direct-task-finalization.js", () => ({
  readDirectRepositoryStatus: mocks.status,
}));

import { applyExternalVerificationResult } from "./external-agent-verification-result.js";

const command = {
  config: { paths: { workflow_dir: ".agentplane/tasks" } },
  resolvedProject: { gitRoot: "/repo" },
} as never;
const exchange = {
  task_id: "202608190000-ABC123",
  checkout: "/repo",
} as never;

function semantic(status: "completed" | "failed" | "blocked") {
  return {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: "work-order",
    summary: `tester ${status}`,
    findings: [],
    uncertainty: [],
    status,
    ...(status === "blocked"
      ? { blocker: { summary: "blocked", recommended_action: "rework" } }
      : {}),
  } as never;
}

describe("external verification result", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.loadTask.mockResolvedValue({
      verification: { updated_by: "SUPERVISOR", note: "old" },
      execution_contract: {
        verification: {
          contract: {
            selected_checks: ["full_regression", "hosted_integration", "task_outcome"],
          },
        },
      },
    });
    mocks.verify.mockResolvedValue(0);
    mocks.commit.mockResolvedValue(0);
    mocks.status.mockResolvedValue({
      lines: [" M .agentplane/tasks/202608190000-ABC123/README.md"],
    });
  });

  it("records blocked TESTER output as needs_rework without claiming passed checks", async () => {
    await applyExternalVerificationResult({ command, exchange, semantic: semantic("blocked") });

    expect(mocks.readFile).not.toHaveBeenCalled();
    expect(mocks.verify).toHaveBeenCalledWith(
      expect.objectContaining({ state: "needs_rework", by: "TESTER", repoFixable: true }),
    );
    expect(mocks.commit).toHaveBeenCalledOnce();
  });

  it("accepts completed TESTER output only with passed supervisor-owned checks", async () => {
    mocks.readFile.mockResolvedValue(
      JSON.stringify({
        status: "passed",
        checks: [
          { command: "bun run test:fast", check_ids: ["task_outcome"], exit_code: 0 },
          {
            command: "bun run ci:local:full",
            check_ids: ["full_regression", "task_outcome"],
            exit_code: 0,
          },
        ],
      }),
    );

    await applyExternalVerificationResult({ command, exchange, semantic: semantic("completed") });

    const verifyInput: unknown = mocks.verify.mock.calls[0]?.[0];
    expect(verifyInput).toMatchObject({ state: "ok", by: "TESTER", repoFixable: false });
    if (
      !verifyInput ||
      typeof verifyInput !== "object" ||
      !("details" in verifyInput) ||
      typeof verifyInput.details !== "string"
    ) {
      throw new Error("expected structured verification details");
    }
    expect(verifyInput.details).toContain("Check: full_regression");
    expect(verifyInput.details).toContain("Command: bun run ci:local:full");
    expect(verifyInput.details).not.toContain("Check: hosted_integration");
    expect(verifyInput.details).toContain(
      ".agentplane/tasks/202608190000-ABC123/supervision/declared-checks.json#checks",
    );
  });

  it("rejects completed TESTER output when full regression has no concrete command", async () => {
    mocks.readFile.mockResolvedValue(
      JSON.stringify({
        status: "passed",
        checks: [{ command: "bun run test:fast", check_ids: ["task_outcome"], exit_code: 0 }],
      }),
    );

    await expect(
      applyExternalVerificationResult({ command, exchange, semantic: semantic("completed") }),
    ).rejects.toThrow("lacks concrete evidence for full_regression");
    expect(mocks.verify).not.toHaveBeenCalled();
  });

  it("rejects completed TESTER output when declared checks did not pass", async () => {
    mocks.readFile.mockResolvedValue(
      JSON.stringify({
        status: "failed",
        checks: [{ command: "bun run test:fast", exit_code: 1 }],
      }),
    );

    await expect(
      applyExternalVerificationResult({ command, exchange, semantic: semantic("completed") }),
    ).rejects.toThrow("requires a passed supervisor-owned declared-checks artifact");
    expect(mocks.verify).not.toHaveBeenCalled();
  });

  it("is idempotent after the same TESTER verdict was persisted", async () => {
    mocks.loadTask.mockResolvedValue({
      verification: { updated_by: "TESTER", note: "tester blocked" },
    });
    mocks.status.mockResolvedValue({ lines: [] });

    await applyExternalVerificationResult({ command, exchange, semantic: semantic("blocked") });

    expect(mocks.verify).not.toHaveBeenCalled();
    expect(mocks.commit).not.toHaveBeenCalled();
  });
});
