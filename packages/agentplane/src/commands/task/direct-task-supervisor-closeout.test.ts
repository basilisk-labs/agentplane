import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  finish: vi.fn(),
  formalOperation: vi.fn(),
  resolveCommit: vi.fn(),
  runChecks: vi.fn(),
  verify: vi.fn(),
}));

vi.mock("./direct-task-finalization.js", () => ({
  finishDirectTask: mocks.finish,
  resolveDirectImplementationCommit: mocks.resolveCommit,
}));
vi.mock("./direct-task-supervisor-formal-operation.js", () => ({
  recordDirectTaskFormalOperation: mocks.formalOperation,
}));
vi.mock("./direct-task-verification.js", () => ({ runDirectTaskVerification: mocks.runChecks }));
vi.mock("./verify-record.js", () => ({ cmdVerifyParsed: mocks.verify }));

import { closeDirectTask, verifyDirectTask } from "./direct-task-supervisor-closeout.js";

const TASK_ID = "202607290000-RF10A1";
const journal = {
  status: "running",
  cursor: { episode: 2, phase: "ready", operation_key: null },
  usage: {
    episodes: 2,
    agent_runs: 1,
    input_tokens: 1,
    output_tokens: 1,
    total_tokens: 2,
    wall_time_ms: 1,
    changed_files: 1,
    diff_lines: 0,
    no_progress_episodes: 0,
  },
  stop: null,
  digest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
} as never;
const completion = {
  task: { status: "DOING", verification: "ok" },
  workflowStep: { kind: "terminal", id: "task.complete.input" },
} as never;
const verificationRoute = {
  task: { status: "DOING", verification: null },
  workflowStep: {
    kind: "cli_operation",
    id: "runner.follow",
    operation: { id: "runner.follow", params: { mode: "run" } },
  },
} as never;

describe("direct task supervisor closeout", () => {
  it("records declared checks in the evaluator-accepted verification evidence shape", async () => {
    mocks.runChecks.mockResolvedValue({
      status: "passed",
      checks: [{ command: "bun run test:critical" }, { command: "bun run test:scope" }],
      artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/declared-checks.json`,
    });
    mocks.verify.mockResolvedValue(0);
    mocks.formalOperation.mockImplementation(async (opts: { run: () => Promise<unknown> }) => {
      await opts.run();
      return {
        journal,
        journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
        decision: completion,
      };
    });

    const result = await verifyDirectTask({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: "/repo" },
      } as never,
      task_id: TASK_ID,
      task: { verify: ["bun run test:critical", "bun run test:scope"] },
      decision: vi.fn().mockResolvedValue(verificationRoute),
      journal: { journal, journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json" },
    });

    expect(result).toMatchObject({ status: "verified" });
    expect(mocks.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        details: [
          "Command: bun run test:critical",
          "Result: pass",
          `Evidence: .agentplane/tasks/${TASK_ID}/supervision/declared-checks.json#check-1`,
          `Scope: direct task ${TASK_ID} declared verification`,
          "",
          "Command: bun run test:scope",
          "Result: pass",
          `Evidence: .agentplane/tasks/${TASK_ID}/supervision/declared-checks.json#check-2`,
          `Scope: direct task ${TASK_ID} declared verification`,
        ].join("\n"),
      }),
    );
  });

  it("classifies formal verification failures without exposing the error message", async () => {
    mocks.runChecks.mockResolvedValue({
      status: "passed",
      checks: [{ command: "bun run test:critical" }],
      artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/declared-checks.json`,
    });
    mocks.formalOperation.mockRejectedValue(new Error("private provider token: secret-value"));

    const result = await verifyDirectTask({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: "/repo" },
      } as never,
      task_id: TASK_ID,
      task: { verify: ["bun run test:critical"] },
      decision: vi.fn().mockResolvedValue(verificationRoute),
      journal: { journal, journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json" },
    });

    expect(result).toMatchObject({
      status: "stopped",
      stop: {
        code: "verification_check_failed",
        reason: "The formal verification operation did not complete successfully (Error).",
      },
    });
    expect(JSON.stringify(result)).not.toContain("secret-value");
  });

  it("stops after verification and before finish when committed EXECUTOR paths exceed work-order authority", async () => {
    mocks.runChecks.mockResolvedValue({
      status: "passed",
      checks: [{ command: "bun run test:critical" }],
      artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/declared-checks.json`,
    });
    mocks.formalOperation.mockResolvedValue({
      journal,
      journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
      decision: completion,
    });
    mocks.resolveCommit.mockResolvedValue({
      status: "scope_violation",
      paths: ["README.md"],
      reason: "The EXECUTOR committed paths outside its approved scope: README.md.",
    });

    const result = await closeDirectTask({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: "/repo" },
      } as never,
      task_id: TASK_ID,
      task: { verify: ["bun run test:critical"] },
      evaluator: {
        evaluator_id: "recovery-context",
        result_path: `.agentplane/tasks/${TASK_ID}/quality/result.json`,
        report_path: `.agentplane/tasks/${TASK_ID}/quality/report.json`,
        receipt_path: `.agentplane/tasks/${TASK_ID}/quality/receipt.json`,
      },
      decision: vi.fn().mockResolvedValueOnce(verificationRoute).mockResolvedValue(completion),
      execution_base_commit: "abc123",
      allowed_paths: ["packages/agentplane/src/commands/task"],
      observed_changed_paths: ["packages/agentplane/src/commands/task/direct-task-supervisor.ts"],
      journal: { journal, journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json" },
    });

    expect(result).toMatchObject({
      status: "stopped",
      stop: { code: "implementation_scope_violation" },
    });
    expect(mocks.resolveCommit).toHaveBeenCalledWith(
      expect.objectContaining({ allowed_paths: ["packages/agentplane/src/commands/task"] }),
    );
    expect(mocks.finish).not.toHaveBeenCalled();
  });
});
