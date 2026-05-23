import { describe } from "vitest";

import {
  TASKS_QUERY_CLI_TIMEOUT_MS,
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  seedTaskQueryFixture,
  splitOutputLines,
  useRunCliIntegrationHarness,
  writeConfig,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe("runCli task active", { timeout: TASKS_QUERY_CLI_TIMEOUT_MS }, () => {
  it("ranks active work with route and freshness fields", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const readyTaskId = "202603010150-AAAAAA";
    const blockedTaskId = "202603010151-BBBBBB";
    const doneTaskId = "202603010152-CCCCCC";
    await seedTaskQueryFixture(root, [
      {
        id: blockedTaskId,
        title: "Beta waiting",
        description: "Blocked by alpha",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [readyTaskId],
        tags: ["workflow"],
        verify: [],
      },
      {
        id: doneTaskId,
        title: "Historical done",
        description: "Must not be selected",
        status: "DONE",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["workflow"],
        verify: [],
      },
      {
        id: readyTaskId,
        title: "Alpha ready",
        description: "Ready active work",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["workflow"],
        verify: [],
        plan_approval: {
          state: "approved",
          updated_at: "2026-03-01T01:50:00.000Z",
          updated_by: "ORCHESTRATOR",
          note: null,
        },
      },
    ]);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const textIo = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--owner", "CODER", "--root", root]);
      expect(code).toBe(0);
      const lines = splitOutputLines(textIo.stdout);
      expect(lines[0]).toBe("ℹ️ task active");
      expect(lines[1]).toContain(readyTaskId);
      expect(lines[1]).toContain("next=start_or_recover_worktree");
      expect(lines[1]).toContain("blockers=");
      expect(lines[1]).toContain("source_freshness=live_local");
      expect(lines[2]).toContain(blockedTaskId);
      expect(lines[2]).toContain(`deps=wait:${readyTaskId}`);
      expect(textIo.stdout).not.toContain(doneTaskId);
    } finally {
      textIo.restore();
    }

    const jsonIo = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--owner", "CODER", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(jsonIo.stdout) as {
        source_freshness: string;
        items: {
          task: { id: string; owner: string };
          dependency_readiness: { state: string };
          next_action: { code: string };
          blocker_count: number;
          source_freshness: string;
        }[];
      };
      expect(parsed.source_freshness).toBe("live_local");
      expect(parsed.items.map((item) => item.task.id)).toEqual([readyTaskId, blockedTaskId]);
      expect(parsed.items[0]?.task.owner).toBe("CODER");
      expect(parsed.items[0]?.next_action.code).toBe("start_or_recover_worktree");
      expect(parsed.items[0]?.blocker_count).toBeGreaterThan(0);
      expect(parsed.items[0]?.source_freshness).toBe("live_local");
      expect(parsed.items[1]?.dependency_readiness.state).toBe("waiting");
    } finally {
      jsonIo.restore();
    }
  });

  it("uses canonical status keys when sorting merged-pending-close tasks", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const mergedTaskId = "202603010160-MERGED";
    const blockedTaskId = "202603010161-B1CKD";
    const approval = {
      state: "approved" as const,
      updated_at: "2026-03-01T02:00:00.000Z",
      updated_by: "ORCHESTRATOR",
      note: null,
    };
    await seedTaskQueryFixture(root, [
      {
        id: blockedTaskId,
        title: "Blocked tie breaker",
        description: "Ready but blocked",
        status: "BLOCKED",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["workflow"],
        verify: [],
        plan_approval: approval,
      },
      {
        id: mergedTaskId,
        title: "Merged close tail",
        description: "Merged but not closed",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["workflow"],
        verify: [],
        plan_approval: approval,
        extensions: {
          "agentplane.branch_pr_list_state": {
            kind: "merged_pending_close",
            status: "MERGED_PENDING_CLOSE",
            label: "MERGED->DONE?",
            prNumber: 123,
            mergeCommit: "abcdef1234567890",
          },
        },
      },
    ]);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--owner", "CODER", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(io.stdout) as {
        items: { task: { id: string; status: string } }[];
      };
      expect(parsed.items.map((item) => item.task.id)).toEqual([mergedTaskId, blockedTaskId]);
      expect(parsed.items[0]?.task.status).toBe("MERGED->DONE?");
    } finally {
      io.restore();
    }
  });
});
