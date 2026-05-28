import { describe, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readFile } from "node:fs/promises";

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
        failure?: {
          error_code?: string | null;
          command_id?: string | null;
          dedupe_signature?: string;
        };
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
      expect(payload.failure?.error_code).toBeNull();
      expect(payload.failure?.command_id).toBeNull();
      expect(payload.failure?.dedupe_signature).toMatch(/^sha256:/);
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
        "--agent-context",
        String.raw`Intent: test the public feedback issue payload.\nObserved failure: simulated E_INTERNAL during command dispatch.\nSensitive data omitted: task prose, env, remotes, and raw output.`,
        "--failure-command",
        "task start-ready",
        "--failure-phase",
        "resolve_context",
        "--failure-reason-code",
        "task_context_unexpected",
        "--failure-message-class",
        "internal_invariant",
        "--failure-argv-shape",
        "task",
        "--failure-argv-shape",
        "start-ready",
        "--failure-argv-shape",
        "<task-id>",
        "--body",
        "Internal error happened while testing.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        dry_run?: boolean;
        transport?: string;
        repository?: string;
        title?: string;
        body?: string;
        labels?: string[];
      };
      expect(payload.dry_run).toBe(true);
      expect(payload.transport).toBe("github");
      expect(payload.repository).toBe("basilisk-labs/agentplane");
      expect(payload.title).toContain("E_INTERNAL");
      expect(payload.labels).toEqual(["agentplane-feedback", "bug"]);
      expect(payload.body).toContain("privacy-bounded");
      expect(payload.body).toContain("## Agent context");
      expect(payload.body).toContain(
        "Intent: test the public feedback issue payload.\nObserved failure:",
      );
      expect(payload.body).not.toContain(String.raw`payload.\nObserved failure`);
      expect(payload.body).toContain("simulated E_INTERNAL during command dispatch");
      expect(payload.body).toContain('"schema": "agentplane.insights.report.v1"');
      expect(payload.body).toContain('"failure"');
      expect(payload.body).toContain('"command_id": "task start-ready"');
      expect(payload.body).toContain('"phase": "resolve_context"');
      expect(payload.body).toContain('"dedupe_signature": "sha256:');
      expect(payload.body).toContain("Internal error happened while testing.");
    } finally {
      io.restore();
    }
  });

  it("requires agent context for real E_INTERNAL issue creation", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = true;
    await writeConfig(root, config);

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
      expect(io.stderr).toContain("E_INTERNAL feedback issues require sanitized agent context");
      expect(io.stderr).toContain("feedback_agent_context_required");
    } finally {
      io.restore();
    }
  });

  it("blocks creating feedback issues when the project explicitly opts out", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = false;
    await writeConfig(root, config);

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
      expect(io.stderr).toContain("--allow-disabled-feedback");
      expect(io.stderr).toContain("reason_code: feedback_github_issues_disabled");
    } finally {
      io.restore();
    }
  });

  it("allows one-shot feedback issue creation without changing disabled project config", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = false;
    config.feedback.github_issues.transport = "cloud";
    config.feedback.github_issues.allow_anonymous_cloud = true;
    config.feedback.github_issues.cloud_endpoint = "https://cloud.example/api/feedback/issues";
    await writeConfig(root, config);

    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn(() => Response.json({ intake_id: "fb_override", status: "accepted" }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "issue",
        "--allow-disabled-feedback",
        "--error-code",
        "E_INTERNAL",
        "--agent-context",
        "Intent: test one-shot feedback issue creation. Sensitive data omitted: task prose, env, remotes, and raw output.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("feedback issue created");
      expect(io.stdout).toContain("intake:fb_override");
      expect(fetchMock).toHaveBeenCalledOnce();
      const request = fetchMock.mock.calls[0]?.[1] as { body?: string } | undefined;
      const body = JSON.parse(String(request?.body ?? "{}")) as {
        failure?: { error_code?: string | null };
      };
      expect(body.failure?.error_code).toBe("E_INTERNAL");
      const configText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
      expect(configText).toContain("feedback:");
      expect(configText).toContain("  github_issues:");
      expect(configText).toContain("    enabled: false");
    } finally {
      io.restore();
      globalThis.fetch = originalFetch;
    }
  });

  it("creates anonymous cloud feedback intake only after explicit opt-in", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = true;
    config.feedback.github_issues.transport = "cloud";
    config.feedback.github_issues.allow_anonymous_cloud = true;
    config.feedback.github_issues.cloud_endpoint = "https://cloud.example/api/feedback/issues";
    await writeConfig(root, config);

    const originalFetch = globalThis.fetch;
    const fetchMock = vi.fn(() => Response.json({ intake_id: "fb_123", status: "accepted" }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "issue",
        "--error-code",
        "E_INTERNAL",
        "--agent-context",
        "Intent: test anonymous cloud intake. Sensitive data omitted: task prose, env, remotes, and raw output.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("transport:");
      expect(io.stdout).toContain("cloud");
      expect(io.stdout).toContain("intake:fb_123");
      expect(fetchMock).toHaveBeenCalledWith(
        "https://cloud.example/api/feedback/issues",
        expect.objectContaining({
          method: "POST",
          headers: { "content-type": "application/json" },
        }),
      );
      const request = fetchMock.mock.calls[0]?.[1] as { body?: string } | undefined;
      const body = JSON.parse(String(request?.body ?? "{}")) as {
        schema?: string;
        anonymous?: boolean;
        failure?: { error_code?: string | null; dedupe_signature?: string };
        privacy?: { excludes?: string[] };
      };
      expect(body.schema).toBe("agentplane.feedback.issue.v1");
      expect(body.anonymous).toBe(true);
      expect(body.failure?.error_code).toBe("E_INTERNAL");
      expect(body.failure?.dedupe_signature).toMatch(/^sha256:/);
      expect(body.privacy?.excludes).toContain("environment variables");
    } finally {
      io.restore();
      globalThis.fetch = originalFetch;
    }
  });

  it("blocks anonymous cloud feedback intake when fallback is not enabled", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.feedback.github_issues.enabled = true;
    config.feedback.github_issues.transport = "cloud";
    config.feedback.github_issues.allow_anonymous_cloud = false;
    await writeConfig(root, config);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "insights",
        "issue",
        "--error-code",
        "E_INTERNAL",
        "--agent-context",
        "Intent: test disabled anonymous cloud intake. Sensitive data omitted.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Anonymous cloud feedback issue intake is disabled");
      expect(io.stderr).toContain("feedback_anonymous_cloud_disabled");
    } finally {
      io.restore();
    }
  });
});
