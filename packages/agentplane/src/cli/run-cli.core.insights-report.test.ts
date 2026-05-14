import { describe } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";

import {
  captureStdIO,
  expect,
  it,
  mkGitRepoRoot,
  runCli,
  seedTaskQueryFixture,
  splitOutputLines,
  useRunCliIntegrationHarness,
  writeConfig,
  writeFile,
  path,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe("runCli insights report", () => {
  it("prints a local-only readable diagnostic report without task prose", async () => {
    const root = await mkGitRepoRoot();
    await seedTaskQueryFixture(root, [
      {
        id: "202605010101-AAAAAA",
        title: "Sensitive task title should not appear",
        description: "Sensitive task description should not appear",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["code", "secret-tag"],
        verify: ["bun test"],
        plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
        verification: {
          state: "pending",
          attempts: 0,
          updated_at: null,
          updated_by: null,
          note: null,
        },
        events: [
          {
            type: "comment",
            at: "2026-05-01T01:01:01.000Z",
            author: "CODER",
            body: "Sensitive comment should not appear",
          },
        ],
      },
      {
        id: "202605010102-BBBBBB",
        title: "Done task title should not appear",
        description: "Done task description should not appear",
        status: "DONE",
        priority: "med",
        owner: "DOCS",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["insights", "report", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).toBe("");
      expect(io.stdout).toContain("insights report: local diagnostic summary");
      expect(io.stdout).toContain("local_only:");
      expect(io.stdout).toContain("network:");
      expect(io.stdout).toContain("not_used");
      expect(io.stdout).toContain("tasks_total:");
      expect(io.stdout).toContain("TODO=1");
      expect(io.stdout).toContain("DONE=1");
      expect(io.stdout).toContain("202605010101-AAAAAA");
      expect(io.stdout).not.toContain("Sensitive task title");
      expect(io.stdout).not.toContain("Sensitive task description");
      expect(io.stdout).not.toContain("Sensitive comment");
    } finally {
      io.restore();
    }
  });

  it("emits machine-readable JSON with bounded local diagnostics", async () => {
    const root = await mkGitRepoRoot();
    await seedTaskQueryFixture(root, [
      {
        id: "202605010101-AAAAAA",
        title: "JSON sensitive task title should not appear",
        description: "JSON sensitive task description should not appear",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: ["bun test"],
      },
    ]);
    await writeFile(path.join(root, "scratch.txt"), "untracked\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "report",
        "--json",
        "--recent-limit",
        "1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        schema?: string;
        privacy?: { local_only?: boolean; network?: string; upload?: string };
        project?: { workflow_mode?: string; backend?: { id?: string } };
        git?: { status_counts?: { untracked?: number }; dirty?: boolean };
        tasks?: {
          total?: number;
          active_task_ids?: string[];
          recent_task_ids?: string[];
          by_status?: Record<string, number>;
        };
      };
      expect(payload.schema).toBe("agentplane.insights.report.v1");
      expect(payload.privacy).toMatchObject({
        local_only: true,
        network: "not_used",
        upload: "not_supported",
      });
      expect(payload.project?.workflow_mode).toBe("direct");
      expect(payload.project?.backend?.id).toBe("local");
      expect(payload.git?.dirty).toBe(true);
      expect(payload.git?.status_counts?.untracked).toBeGreaterThanOrEqual(1);
      expect(payload.tasks?.total).toBe(1);
      expect(payload.tasks?.by_status?.TODO).toBe(1);
      expect(payload.tasks?.active_task_ids).toEqual(["202605010101-AAAAAA"]);
      expect(payload.tasks?.recent_task_ids).toEqual(["202605010101-AAAAAA"]);
      expect(io.stdout).not.toContain("JSON sensitive task title");
      expect(io.stdout).not.toContain("JSON sensitive task description");
    } finally {
      io.restore();
    }
  });

  it("exposes insights in help and rejects unknown subgroup usage", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli(["help", "insights", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("agentplane insights <report|issue> [options]");
        expect(io.stdout).toContain("insights report");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["insights", "unknown", "--root", root]);
        expect(code).toBe(2);
        expect(splitOutputLines(io.stderr).join("\n")).toContain("Unknown subcommand: unknown.");
      } finally {
        io.restore();
      }
    }
  });

  it("previews a privacy-bounded GitHub issue payload without network access", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = true;
    await writeConfig(root, config);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "issue",
        "--dry-run",
        "--error-code",
        "E_INTERNAL",
        "--body",
        "Internal error happened while testing.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        dry_run?: boolean;
        repository?: string;
        title?: string;
        body?: string;
        labels?: string[];
      };
      expect(payload.dry_run).toBe(true);
      expect(payload.repository).toBe("basilisk-labs/agentplane");
      expect(payload.title).toContain("E_INTERNAL");
      expect(payload.labels).toEqual(["agentplane-feedback", "bug"]);
      expect(payload.body).toContain("privacy-bounded");
      expect(payload.body).toContain('"schema": "agentplane.insights.report.v1"');
      expect(payload.body).toContain("Internal error happened while testing.");
    } finally {
      io.restore();
    }
  });

  it("blocks creating feedback issues until the project opts in", async () => {
    const root = await mkGitRepoRoot();

    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "issue",
        "--error-code",
        "E_INTERNAL",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Feedback GitHub issues are disabled");
      expect(io.stderr).toContain("feedback.github_issues.enabled true");
      expect(io.stderr).toContain("reason_code: feedback_github_issues_disabled");
    } finally {
      io.restore();
    }
  });
});
