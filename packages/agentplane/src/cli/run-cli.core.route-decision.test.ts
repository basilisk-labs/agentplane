import { execFile } from "node:child_process";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
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
      "--allow-duplicate",
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
    const rootRealpath = await realpath(root);

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--root", root]);
      expect(code).toBe(0);
      expect(statusIo.stdout).toContain(`task:                        ${taskId} TODO`);
      expect(statusIo.stdout).toContain("phase:                       worktree_needed");
      expect(statusIo.stdout).toContain("authoritative_checkout:      base_checkout");
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
        route_oracle: {
          phase: string;
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
          mutationPathHint: string | null;
          blocker: { code: string } | null;
          nextCommand: string;
        };
        execution_packet: {
          actionKind: string;
          safeToMutate: boolean;
          authoritativeCheckoutPath: string | null;
          mutationPathHint: string | null;
          mustRunFrom: string | null;
          exactArgv: string[] | null;
          returnControlWhen: string;
          staleStateCheck: string;
          evidenceMissing: string[];
        };
        next_action: { code: string; command: string };
      };
      expect(parsed.route_oracle).toMatchObject({
        phase: "worktree_needed",
        authoritativeCheckout: "base_checkout",
        blocker: { code: "missing_pr_branch" },
      });
      expect(await realpath(parsed.route_oracle.authoritativeCheckoutPath ?? "")).toBe(
        rootRealpath,
      );
      expect(await realpath(parsed.route_oracle.mutationPathHint ?? "")).toBe(rootRealpath);
      expect(parsed.execution_packet).toMatchObject({
        actionKind: "local_command",
        safeToMutate: true,
      });
      expect(await realpath(parsed.execution_packet.authoritativeCheckoutPath ?? "")).toBe(
        rootRealpath,
      );
      expect(await realpath(parsed.execution_packet.mutationPathHint ?? "")).toBe(rootRealpath);
      expect(await realpath(parsed.execution_packet.mustRunFrom ?? "")).toBe(rootRealpath);
      expect(parsed.execution_packet.exactArgv).toEqual([
        "agentplane",
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "route-decision-task",
        "--worktree",
      ]);
      expect(parsed.execution_packet.returnControlWhen).toContain("recompute task next-action");
      expect(parsed.execution_packet.staleStateCheck).toBe(
        `agentplane task next-action ${taskId} --explain`,
      );
      expect(parsed.execution_packet.evidenceMissing).toContain("task_branch");
      expect(parsed.next_action.code).toBe("start_or_recover_worktree");
      expect(parsed.next_action.command).toBe(
        `agentplane work start ${taskId} --agent CODER --slug route-decision-task --worktree`,
      );
      expect(parsed.route_oracle.nextCommand).toBe(parsed.next_action.command);
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
      expect(repairIo.stdout).toContain(
        `agentplane work start ${taskId} --agent CODER --slug route-decision-task --worktree`,
      );
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

    const marker = path.join(root, "gh-called");
    const fakeGh = path.join(root, "gh-fail-if-called.js");
    await writeFile(
      fakeGh,
      `import { writeFileSync } from "node:fs";\nwriteFileSync(${JSON.stringify(marker)}, "called");\nprocess.exit(2);\n`,
      "utf8",
    );
    const previousGhBin = process.env.AGENTPLANE_GH_BIN;
    const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
    process.env.AGENTPLANE_GH_BIN = process.execPath;
    process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
    try {
      const textIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(textIo.stdout).toContain(`task brief: ${taskId}`);
        expect(textIo.stdout).toContain("phase:");
        expect(textIo.stdout).toContain("authoritative_checkout:");
        expect(textIo.stdout).toContain("next_code:");
        expect(textIo.stdout).toContain("recommended_role:");
        expect(textIo.stdout).toContain("must_run_from:");
        expect(textIo.stdout).toContain("exact_argv:");
        expect(textIo.stdout).toContain("return_control_when:");
        expect(textIo.stdout).toContain("stale_state_check:");
        expect(textIo.stdout).toContain("must_not:");
        expect(textIo.stdout).toContain("confidence:");
        expect(textIo.stdout).toContain("verify_steps:");
        expect(textIo.stdout).toContain("verify_steps_quality: fallback");
        expect(textIo.stdout).toContain("blueprint_id:");
        expect(textIo.stdout).toContain("policy_modules:");
        expect(textIo.stdout).toContain("snapshot_safe_command:");
        expect(textIo.stdout).toContain("remote lookup skipped");
      } finally {
        textIo.restore();
      }

      await expect(readFile(marker, "utf8")).rejects.toMatchObject({ code: "ENOENT" });

      const statusJsonIo = captureStdIO();
      try {
        const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(statusJsonIo.stdout) as {
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.source_confidence.route).toMatchObject({
          freshness: "computed_local",
          confidence: "high",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_skipped",
          confidence: "skipped",
        });
      } finally {
        statusJsonIo.restore();
      }

      const nextJsonIo = captureStdIO();
      try {
        const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(nextJsonIo.stdout) as {
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.source_confidence.next_action).toMatchObject({
          freshness: "computed_local",
          confidence: "high",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_skipped",
          confidence: "skipped",
        });
      } finally {
        nextJsonIo.restore();
      }

      await expect(readFile(marker, "utf8")).rejects.toMatchObject({ code: "ENOENT" });

      const jsonIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(jsonIo.stdout) as {
          contract: { kind: string; version: number };
          task: { id: string };
          route: {
            workflow_mode: string;
            phase: string;
            authoritative_checkout: string;
            authoritative_checkout_path: string | null;
            mutation_path_hint: string | null;
            next_action_code: string;
          };
          execution_packet: {
            safe_to_mutate: boolean;
            mutation_path_hint: string | null;
            exact_argv: string[] | null;
            must_run_from: string | null;
            return_control_when: string;
            stale_state_check: string;
          };
          next_action: { code: string; command: string };
          verify_steps: { text: string; filled: boolean; quality: string };
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
        expect(parsed.route.phase).toBe("verify_or_pr_update");
        expect(parsed.route.authoritative_checkout).toBe("task_worktree");
        expect(parsed.route.authoritative_checkout_path).toBe(null);
        expect(parsed.route.mutation_path_hint).toBe(null);
        expect(parsed.route.next_action_code).toBe("verify_or_update_pr");
        expect(parsed.execution_packet.safe_to_mutate).toBe(false);
        expect(parsed.execution_packet.mutation_path_hint).toBe(null);
        expect(parsed.execution_packet.exact_argv).toEqual([
          "agentplane",
          "pr",
          "update",
          taskId,
        ]);
        expect(parsed.execution_packet.must_run_from).toBeNull();
        expect(parsed.execution_packet.return_control_when).toContain("recompute task next-action");
        expect(parsed.execution_packet.stale_state_check).toBe(
          `agentplane task next-action ${taskId} --explain`,
        );
        expect(parsed.next_action.code).toBe("verify_or_update_pr");
        expect(parsed.next_action.command).toBe(`agentplane pr update ${taskId}`);
        expect(parsed.verify_steps.text).toContain("PLANNER fallback scaffold");
        expect(parsed.verify_steps.filled).toBe(true);
        expect(parsed.verify_steps.quality).toBe("fallback");
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
        expect(parsed.source_confidence.verify_steps).toMatchObject({
          source: "task_doc",
          freshness: "live_local",
          confidence: "medium",
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

      const remoteStatusIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "status",
          taskId,
          "--route",
          "--json",
          "--remote",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const parsed = JSON.parse(remoteStatusIo.stdout) as {
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.source_confidence.route).toMatchObject({
          freshness: "computed_local",
          confidence: "medium",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_skipped",
          confidence: "low",
        });
      } finally {
        remoteStatusIo.restore();
      }
    } finally {
      if (previousGhBin === undefined) {
        delete process.env.AGENTPLANE_GH_BIN;
      } else {
        process.env.AGENTPLANE_GH_BIN = previousGhBin;
      }
      if (previousGhArgs === undefined) {
        delete process.env.AGENTPLANE_GH_ARGS;
      } else {
        process.env.AGENTPLANE_GH_ARGS = previousGhArgs;
      }
    }
  });

  it("does not block direct route mutation when a running runner pid is dead", async () => {
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
      "Exercise stale runner route handling.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a DOING task so route decision can inspect runner state.",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "run", taskId, "--dry-run", "--root", root]);

    const statusIo = captureStdIO();
    let statePath = "";
    try {
      const code = await runCli(["task", "run", "status", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(statusIo.stdout) as { paths: { state: string } };
      statePath = payload.paths.state;
    } finally {
      statusIo.restore();
    }
    const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
    await writeFile(
      statePath,
      `${JSON.stringify(
        {
          ...state,
          status: "running",
          supervision: {
            pid: 999_999,
            started_at: "2026-05-29T19:14:00.000Z",
            heartbeat_at: "2026-05-29T19:14:01.000Z",
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        blockers: { code: string }[];
        execution_packet: { safeToMutate: boolean };
        next_action: { code: string; command: string };
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).not.toContain("runner_alive");
      expect(parsed.execution_packet.safeToMutate).toBe(true);
      expect(parsed.next_action).toMatchObject({
        code: "cancel_then_resume",
        command: `agentplane task reclaim ${taskId} --author CODER --reason "stale runner pid is no longer alive"`,
      });
    } finally {
      nextIo.restore();
    }
  });

  it("marks close-tail provider lookup as remote evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
    });

    const taskId = await createBranchPrTask(root);
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch: `task/${taskId}/route-confidence`,
          base: "main",
          created_at: "2026-05-23T00:00:00.000Z",
          updated_at: "2026-05-23T00:00:00.000Z",
          status: "MERGED",
          pr_url: "https://github.com/example/repo/pull/123",
          merge_commit: "abc123def456",
          head_sha: "def456abc123",
        },
        null,
        2,
      ),
      "utf8",
    );

    const fakeGh = path.join(root, "gh-empty-response.js");
    await writeFile(fakeGh, "console.log('[]');\n", "utf8");

    const previousGhBin = process.env.AGENTPLANE_GH_BIN;
    const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
    process.env.AGENTPLANE_GH_BIN = process.execPath;
    process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
    try {
      const statusIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "status",
          taskId,
          "--route",
          "--json",
          "--remote",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const parsed = JSON.parse(statusIo.stdout) as {
          prFlow: { closeTail: { state: string; provider?: string } };
          source_confidence: Record<
            string,
            { source: string; freshness: string; confidence: string; note?: string }
          >;
        };
        expect(parsed.prFlow.closeTail).toMatchObject({
          state: "not_found",
          provider: "github",
        });
        expect(parsed.source_confidence.route).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
      } finally {
        statusIo.restore();
      }

      const briefIo = captureStdIO();
      try {
        const code = await runCli(["task", "brief", taskId, "--json", "--remote", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(briefIo.stdout) as {
          source_confidence: Record<string, { freshness: string; confidence: string }>;
        };
        expect(parsed.source_confidence.remote).toMatchObject({
          freshness: "remote_live",
          confidence: "medium",
        });
      } finally {
        briefIo.restore();
      }
    } finally {
      if (previousGhBin === undefined) {
        delete process.env.AGENTPLANE_GH_BIN;
      } else {
        process.env.AGENTPLANE_GH_BIN = previousGhBin;
      }
      if (previousGhArgs === undefined) {
        delete process.env.AGENTPLANE_GH_ARGS;
      } else {
        process.env.AGENTPLANE_GH_ARGS = previousGhArgs;
      }
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
      if (code !== 0) process.stderr.write(statusIo.stderr);
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

  it("routes stale local branch_pr state to base sync after hosted close is recorded upstream", async () => {
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
      "Exercise hosted close sync route.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent(["task", "set-status", taskId, "DOING", "--force", "--yes", "--root", root]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          base: "main",
          branch: `task/${taskId}/merged-route`,
          status: "MERGED",
          merge_commit: "abcdef1234567890abcdef1234567890abcdef12",
          pr_number: 99,
          pr_url: "https://github.com/example/repo/pull/99",
          created_at: "2026-06-03T00:00:00.000Z",
          updated_at: "2026-06-03T00:01:00.000Z",
        },
        null,
        2,
      ),
      "utf8",
    );
    await execFileAsync("git", ["add", path.join(root, ".agentplane", "tasks", taskId)], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", `code: ${taskId} record merged PR metadata`], {
      cwd: root,
    });
    const localBaseRev = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const localBaseCommit = localBaseRev.stdout.trim();

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    const findingsIndex = readme.lastIndexOf("## Findings");
    expect(findingsIndex).toBeGreaterThan(0);
    await writeFile(
      readmePath,
      `${readme.slice(0, findingsIndex)}## Findings\n\nClose tail landed upstream.\n`,
      "utf8",
    );
    const suffix = taskId.split("-").at(-1);
    await execFileAsync("git", ["add", readmePath], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "-m", `code: ${suffix} close: (${taskId}) hosted close`],
      {
        cwd: root,
      },
    );
    const remoteBaseRev = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const remoteBaseCommit = remoteBaseRev.stdout.trim();
    await execFileAsync("git", ["update-ref", "refs/remotes/origin/main", remoteBaseCommit], {
      cwd: root,
    });
    await execFileAsync("git", ["reset", "--hard", localBaseCommit], { cwd: root });

    const statusIo = captureStdIO();
    try {
      const code = await runCli(["task", "status", taskId, "--route", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(statusIo.stdout) as {
        nextAction: { code: string; command: string };
        oracle: { phase: string; authoritativeCheckout: string };
        executionPacket: { recommendedRole: string; safeToMutate: boolean };
      };
      expect(parsed.nextAction).toMatchObject({
        code: "sync_hosted_close",
        command:
          "git fetch origin main && git merge --ff-only origin/main && agentplane cleanup merged",
      });
      expect(parsed.oracle).toMatchObject({
        phase: "hosted_close_recorded_upstream",
        authoritativeCheckout: "base_checkout",
      });
      expect(parsed.executionPacket).toMatchObject({
        recommendedRole: "INTEGRATOR",
        safeToMutate: true,
      });
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

  it(
    "refreshes stale PR metadata before recommending integration",
    { timeout: 180_000 },
    async () => {
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
      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);

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
        const code = await runCli([
          "task",
          "next-action",
          taskId,
          "--json",
          "--remote",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const parsed = JSON.parse(nextIo.stdout) as {
          route_oracle: { phase: string; authoritativeCheckout: string; blocker: { code: string } };
          next_action: { code: string; command: string };
          blockers: { code: string }[];
        };
        expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pr_meta_stale");
        expect(parsed.route_oracle).toMatchObject({
          phase: "pr_artifacts_stale",
          authoritativeCheckout: "task_worktree",
          blocker: { code: "pr_meta_stale" },
        });
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
    },
  );

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
