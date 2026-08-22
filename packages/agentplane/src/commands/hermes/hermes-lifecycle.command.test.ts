import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { captureStdIO } from "@agentplane/testkit";

describe("Hermes lifecycle commands", () => {
  it("renders lifecycle callbacks without touching Hermes in dry-run mode", async () => {
    const previousTask = process.env.HERMES_KANBAN_TASK;
    const previousBoard = process.env.HERMES_KANBAN_BOARD;
    const previousHermesBin = process.env.HERMES_BIN;
    process.env.HERMES_KANBAN_TASK = "hk_123";
    process.env.HERMES_KANBAN_BOARD = "repo-board";
    process.env.HERMES_BIN = "/opt/hermes/bin/hermes";
    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "lifecycle",
        "comment",
        "--body",
        '{"agentplane_task_id":"202605311941-K4FCKS"}',
        "--dry-run",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        action: string;
        hermes_run: { task_id: string; board: string };
        result: { executed: boolean; command: string[] };
      };
      expect(payload.action).toBe("comment");
      expect(payload.hermes_run.task_id).toBe("hk_123");
      expect(payload.hermes_run.board).toBe("repo-board");
      expect(payload.result.executed).toBe(false);
      expect(payload.result.command).toEqual([
        "/opt/hermes/bin/hermes",
        "kanban",
        "--board",
        "repo-board",
        "comment",
        "hk_123",
        "--body",
        '{"agentplane_task_id":"202605311941-K4FCKS"}',
      ]);
    } finally {
      io.restore();
      if (previousTask === undefined) delete process.env.HERMES_KANBAN_TASK;
      else process.env.HERMES_KANBAN_TASK = previousTask;
      if (previousBoard === undefined) delete process.env.HERMES_KANBAN_BOARD;
      else process.env.HERMES_KANBAN_BOARD = previousBoard;
      if (previousHermesBin === undefined) delete process.env.HERMES_BIN;
      else process.env.HERMES_BIN = previousHermesBin;
    }
  });

  it("rejects lifecycle mutations without the claimed board", async () => {
    const keys = [
      "HERMES_KANBAN_TASK",
      "HERMES_KANBAN_BOARD",
      "HERMES_KANBAN_RUN_ID",
      "HERMES_KANBAN_CLAIM_LOCK",
      "HERMES_KANBAN_WORKSPACE",
    ] as const;
    const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
    Object.assign(process.env, {
      HERMES_KANBAN_TASK: "hk_123",
      HERMES_KANBAN_RUN_ID: "run_123",
      HERMES_KANBAN_CLAIM_LOCK: "claim_123",
      HERMES_KANBAN_WORKSPACE: "/workspace/repo",
    });
    delete process.env.HERMES_KANBAN_BOARD;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "lifecycle",
        "comment",
        "--body",
        "claim-scoped update",
        "--json",
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("HERMES_KANBAN_BOARD");
    } finally {
      io.restore();
      for (const key of keys) {
        const value = previous[key];
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  });
});
