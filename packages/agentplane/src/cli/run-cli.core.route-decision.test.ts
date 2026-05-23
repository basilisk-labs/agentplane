import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

const execFileAsync = promisify(execFile);

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision task",
      "--description",
      "Exercise route decision commands for branch_pr recovery.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

describe("runCli route decision commands", () => {
  it("reports status, next action, work resume, and dry-run repair", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise route decision commands.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--root", root]);
      expect(code).toBe(0);
      expect(statusIo.stdout).toContain(`task:                        ${taskId} TODO`);
      expect(statusIo.stdout).toContain("next_code:                   start_or_recover_worktree");
      expect(statusIo.stdout).toContain("blocker:                     missing_pr_branch");
    } finally {
      statusIo.restore();
    }

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
      };
      expect(parsed.next_action.code).toBe("start_or_recover_worktree");
      expect(parsed.next_action.command).toContain(`agentplane work start ${taskId}`);
    } finally {
      nextIo.restore();
    }

    const resumeIo = captureStdIO();
    try {
      const code = await runCli(["work", "resume", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(resumeIo.stdout).toContain("work resume");
      expect(resumeIo.stdout).toContain("repair_step:");
    } finally {
      resumeIo.restore();
    }

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["flow", "repair", taskId, "--dry-run", "--root", root]);
      expect(code).toBe(0);
      expect(repairIo.stdout).toContain("flow repair");
      expect(repairIo.stdout).toContain("would_run:");
      expect(repairIo.stdout).toContain(`agentplane work start ${taskId}`);
    } finally {
      repairIo.restore();
    }
  });

  it("prints a local-first task brief with JSON output and no default gh lookup", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise task brief command.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          task_id: taskId,
          branch: `task/${taskId}/agent-task-brief`,
          base: "main",
          status: "OPEN",
          pr_number: 123,
          pr_url: "https://github.com/example/repo/pull/123",
          head_sha: "abc123",
        },
        null,
        2,
      ),
      "utf8",
    );

    const fakeBin = path.join(root, "fake-bin");
    const marker = path.join(root, "gh-called");
    await mkdir(fakeBin, { recursive: true });
    const fakeGh = path.join(fakeBin, "gh");
    await writeFile(fakeGh, `#!/bin/sh\ntouch "${marker}"\nexit 2\n`, "utf8");
    await chmod(fakeGh, 0o755);
    const previousPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${previousPath ?? ""}`;
    try {
      const textIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(textIo.stdout).toContain(`task brief: ${taskId}`);
        expect(textIo.stdout).toContain("next_code:");
        expect(textIo.stdout).toContain("verify_steps:");
        expect(textIo.stdout).toContain("blueprint_id:");
        expect(textIo.stdout).toContain("policy_modules:");
        expect(textIo.stdout).toContain("snapshot_safe_command:");
        expect(textIo.stdout).toContain("remote lookup skipped");
      } finally {
        textIo.restore();
      }

      await expect(readFile(marker, "utf8")).rejects.toMatchObject({ code: "ENOENT" });

      const jsonIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(jsonIo.stdout) as {
          contract: { kind: string; version: number };
          task: { id: string };
          route: { workflow_mode: string; next_action_code: string };
          next_action: { code: string; command: string };
          verify_steps: { text: string; filled: boolean };
          blueprint: { blueprint_id?: string; required_evidence?: string[] };
          policy_modules: string[];
          evidence_required: string[];
          remote: { enabled: boolean };
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.contract).toEqual({
          kind: "agentplane.agent_work_context",
          version: 1,
        });
        expect(parsed.task.id).toBe(taskId);
        expect(parsed.route.workflow_mode).toBe("branch_pr");
        expect(parsed.route.next_action_code).toBe("verify_or_update_pr");
        expect(parsed.next_action.code).toBe("verify_or_update_pr");
        expect(parsed.next_action.command).toBe(`agentplane pr update ${taskId}`);
        expect(parsed.verify_steps.text).toContain("PLANNER fallback scaffold");
        expect(parsed.verify_steps.filled).toBe(true);
        expect(parsed.blueprint.blueprint_id).toBe("code.branch_pr");
        expect(parsed.blueprint.required_evidence).toContain("code_pr.paths");
        expect(parsed.policy_modules).toEqual(
          expect.arrayContaining([
            ".agentplane/policy/dod.code.md",
            ".agentplane/policy/dod.core.md",
            ".agentplane/policy/security.must.md",
            ".agentplane/policy/workflow.branch_pr.md",
          ]),
        );
        expect(parsed.evidence_required).toContain("code_pr.paths");
        expect(parsed.remote.enabled).toBe(false);
        expect(parsed.source_confidence.route).toMatchObject({
          source: "local_git",
          freshness: "computed_local",
          confidence: "high",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          source: "remote_provider",
          freshness: "remote_skipped",
          confidence: "skipped",
        });
      } finally {
        jsonIo.restore();
      }

      const remoteIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--json", "--remote", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(remoteIo.stdout) as {
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.source_confidence.route).toMatchObject({
          freshness: "computed_local",
          confidence: "medium",
        });
        expect(parsed.source_confidence.route.note).toContain("remote lookup was requested");
        expect(parsed.source_confidence.remote).toMatchObject({
          source: "remote_provider",
          freshness: "remote_skipped",
          confidence: "low",
        });
        expect(parsed.source_confidence.remote.note).toContain("fell back to local data");
      } finally {
        remoteIo.restore();
      }
    } finally {
      process.env.PATH = previousPath;
    }
  });

  it("safe-apply skips approval and provider-only repair steps", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);

    const repairIo = captureStdIO();
    try {
      const code = await runCli([
        "flow",
        "repair",
        taskId,
        "--safe-apply",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const parsed = JSON.parse(repairIo.stdout) as {
        applied: { code: string; status: string; reason?: string }[];
      };
      expect(parsed.applied).toContainEqual(
        expect.objectContaining({
          code: "approve_plan",
          status: "skipped",
          reason: "requires_approval_or_provider_action",
        }),
      );
      expect(parsed.applied).not.toContainEqual(
        expect.objectContaining({ code: "approve_plan", status: "applied" }),
      );
    } finally {
      repairIo.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('plan_approval:\n  state: "pending"');
  });

  it("treats done branch_pr tasks as terminal even when PR metadata is absent", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise done route decisions.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      readme
        .replace('status: "TODO"', 'status: "DONE"')
        .replace("commit: null", 'commit:\n  hash: "abc123"\n  message: "Merge PR #1"'),
      "utf8",
    );

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        blockers: { code: string }[];
        nextAction: { code: string; command: string };
      };
      expect(parsed.blockers).toEqual([]);
      expect(parsed.nextAction.code).toBe("cleanup");
      expect(parsed.nextAction.command).toBe("agentplane cleanup merged");
    } finally {
      statusIo.restore();
    }
  });

  it("keeps done direct-mode tasks on a direct-safe terminal route", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise direct done route decisions.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      readme
        .replace('status: "TODO"', 'status: "DONE"')
        .replace("commit: null", 'commit:\n  hash: "abc123"\n  message: "Direct close"'),
      "utf8",
    );

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        blockers: { code: string }[];
        nextAction: { code: string; command: string | null };
      };
      expect(parsed.blockers).toEqual([]);
      expect(parsed.nextAction.code).toBe("done");
      expect(parsed.nextAction.command).toBeNull();
    } finally {
      statusIo.restore();
    }
  });

  it("does not treat task-local artifact commits as stale PR metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise route decision commands.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const branch = `task/${taskId}/route-decision`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "impl.txt"), "implementation\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
    const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          head_sha: implementationHead.trim(),
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    await writeFile(readmePath, `${readme}\n<!-- task-local artifact refresh -->\n`);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: refresh artifacts"], { cwd: root });

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).not.toContain("pr_meta_stale");
    } finally {
      statusIo.restore();
    }
  });

  it("refreshes stale PR metadata before recommending integration", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise stale PR metadata routing.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const branch = `task/${taskId}/route-decision`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "impl.txt"), "implementation\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
    const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          head_sha: implementationHead.trim(),
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(path.join(prDir, "review.md"), "# Review\n\nStale packet.\n");
    await writeFile(path.join(root, "non-task.txt"), "new implementation advance\n");
    await execFileAsync("git", ["add", "non-task.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: advance implementation"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pr_meta_stale");
      expect(parsed.next_action.code).toBe("update_pr_artifacts");
      expect(parsed.next_action.command).toBe(`agentplane pr update ${taskId}`);
    } finally {
      nextIo.restore();
    }

    const repairIo = captureStdIO();
    try {
      const code = await runCli([
        "flow",
        "repair",
        taskId,
        "--safe-apply",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const parsed = JSON.parse(repairIo.stdout) as {
        applied: { code: string; status: string }[];
      };
      expect(parsed.applied).toContainEqual(
        expect.objectContaining({ code: "update_pr_artifacts", status: "applied" }),
      );
    } finally {
      repairIo.restore();
    }

    const updatedMeta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
      head_sha?: string;
      diffstat_sha256?: string;
    };
    expect(updatedMeta.head_sha).toBeUndefined();
    expect(updatedMeta.diffstat_sha256).toMatch(/^sha256:/);
  });

  it("does not claim no repair when blockers are unmapped", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise blocked repair plans.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const branch = `task/${taskId}/missing-branch`;
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          head_sha: "deadbeef",
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["flow", "repair", taskId, "--dry-run", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(repairIo.stdout) as {
        blockers: { code: string }[];
        repair_plan: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("branch_head_missing");
      expect(parsed.repair_plan.map((step) => step.code)).toContain("fetch_branch");
      expect(parsed.repair_plan.map((step) => step.code)).not.toContain("no_repair_needed");
    } finally {
      repairIo.restore();
    }
  });
});
