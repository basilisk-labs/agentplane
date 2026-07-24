import { describe, expect, it, vi } from "vitest";

import { readFile, rm, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import {
  evolveRunnerRunState,
  writePreparedRunnerArtifacts,
  writeRunnerRunState,
} from "../runner/artifacts.js";
import { resolveTaskRunnerPaths } from "../runner/task-run-paths.js";
import * as taskRunUsecases from "../runner/usecases/task-run.js";
import { makeRunTaskRunHandler } from "../commands/task/run.command.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { persistRunnerOutcomeToTask } from "../runner/task-state.js";
import { staleClaim, writeActiveClaim } from "../runner/usecases/task-run-active-claim.testkit.js";

installRunCliIntegrationHarness();

async function rewritePreparedArtifactsAsV0624(paths: {
  bundle_path: string;
  state_path: string;
}): Promise<void> {
  const persistedBundle = JSON.parse(await readFile(paths.bundle_path, "utf8")) as {
    execution: {
      artifact_paths: Record<string, unknown>;
      sandbox_policy?: unknown;
      write_scope?: unknown;
    };
  };
  delete persistedBundle.execution.artifact_paths.receipt_path;
  delete persistedBundle.execution.sandbox_policy;
  delete persistedBundle.execution.write_scope;
  await writeFile(paths.bundle_path, `${JSON.stringify(persistedBundle, null, 2)}\n`);

  const persistedState = JSON.parse(await readFile(paths.state_path, "utf8")) as {
    receipt_path?: unknown;
    prepared_metadata?: { invocation?: Record<string, unknown> };
  };
  delete persistedState.receipt_path;
  const invocation = persistedState.prepared_metadata?.invocation;
  if (invocation) {
    delete invocation.work_order_id;
    delete invocation.repository_root;
    delete invocation.receipt_path;
    delete invocation.filesystem_effect_containment;
  }
  await writeFile(paths.state_path, `${JSON.stringify(persistedState, null, 2)}\n`);
}

async function createStartedRunnerTask(root: string, title: string): Promise<string> {
  let taskId = "";
  {
    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          title,
          "--description",
          "Exercise the public task runner path.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--verify",
          "bun run test:critical",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }
  }
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "Run the task through the configured runner path.",
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
    "Start: move task into DOING so the runner can prepare execution artifacts.",
    "--root",
    root,
  ]);
  return taskId;
}

describe("runCli task run", () => {
  it("reports degraded claim cleanup in JSON and human output with a nonzero exit", async () => {
    const cleanup = {
      status: "cleanup_failed" as const,
      code: "E_RUNTIME",
      message: "active claim could not be retired",
      event_recorded: true,
    };
    const executed = {
      invocation: {
        adapter_id: "custom",
        run_id: "run-degraded-cleanup",
        run_dir: "/repo/run",
        bundle_path: "/repo/run/bundle.json",
        bootstrap_path: "/repo/run/bootstrap.md",
        result_path: "/repo/run/result.json",
      },
      result: {
        status: "success",
        exit_code: 0,
        summary: "provider completed",
      },
      active_claim_cleanup: cleanup,
    } as unknown as Awaited<ReturnType<typeof taskRunUsecases.executeTaskRunnerExecution>>;
    const executeSpy = vi
      .spyOn(taskRunUsecases, "executeTaskRunnerExecution")
      .mockResolvedValue(executed);
    const handler = makeRunTaskRunHandler(async () => {
      await Promise.resolve();
      return {} as never;
    });
    const commandContext = { cwd: "/repo", rootOverride: null } as never;
    const parsed = {
      taskId: "202607241200-DEGRADED",
      dryRun: false,
      allowDangerFullAccess: false,
      json: true,
    };
    try {
      {
        const io = captureStdIO();
        try {
          await expect(handler(commandContext, parsed)).resolves.toBe(1);
          const payload = JSON.parse(io.stdout) as {
            lifecycle_status: string;
            active_claim_cleanup: typeof cleanup;
          };
          expect(payload.lifecycle_status).toBe("degraded");
          expect(payload.active_claim_cleanup).toEqual(cleanup);
        } finally {
          io.restore();
        }
      }
      {
        const io = captureStdIO();
        try {
          await expect(handler(commandContext, { ...parsed, json: false })).resolves.toBe(1);
          expect(io.stdout).toContain("degraded");
          expect(io.stdout).toContain(cleanup.message);
        } finally {
          io.restore();
        }
      }
    } finally {
      executeSpy.mockRestore();
    }
  });

  it("prepares a codex /goal bootstrap in dry-run mode", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createStartedRunnerTask(root, "Run task through Codex goal");

    const io = captureStdIO();
    const prepareSpy = vi.spyOn(taskRunUsecases, "prepareTaskRunnerExecution");
    try {
      expect(
        await runCli([
          "task",
          "run",
          taskId,
          "--dry-run",
          "--sandbox",
          "danger-full-access",
          "--allow-danger-full-access",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      expect(prepareSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          task_id: taskId,
          mode: "dry_run",
          sandbox_override: "danger-full-access",
          danger_authority: {
            danger_full_access_authorized: true,
            provenance: "explicit_operator",
            source: "task run --allow-danger-full-access",
          },
        }),
      );
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        mode: string;
        adapter_id: string;
        run_id: string;
        bootstrap_path: string;
        result_path: string;
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.mode).toBe("dry_run");
      expect(payload.adapter_id).toBe("codex");
      expect(payload.result_path).toContain(`/runs/`);

      const bootstrap = await readFile(payload.bootstrap_path, "utf8");
      expect(bootstrap.split("\n")[0]).toBe(
        `/goal Execute AgentPlane task ${taskId}: Run task through Codex goal`,
      );
      expect(bootstrap).toContain("Use bundle.json as the complete runner input.");
      expect(bootstrap).toContain(
        "Execute-mode runs must write a valid AgentSemanticResult v2 JSON manifest",
      );
    } finally {
      prepareSpy.mockRestore();
      io.restore();
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          status: string;
          pid_alive: boolean | null;
          paths: { events: string; trace: string; state: string; stderr: string };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.status).toBe("prepared");
        expect(payload.pid_alive).toBe(null);
        expect(payload.paths.events).toContain(`/runs/`);
        expect(payload.paths.state).toContain("state.json");
        await writeFile(`${payload.paths.stderr}.gz`, gzipSync(Buffer.from("compressed stderr\n")));
        await rm(payload.paths.stderr, { force: true });
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "inspect",
            taskId,
            "--events",
            "1",
            "--json",
            "--root",
            root,
          ]),
        ).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          recent_events: { type: string }[];
          prepared_metadata: { prompt_count: number };
        };
        expect(payload.recent_events).toHaveLength(1);
        expect(payload.recent_events[0]?.type).toBe("runner_prepared");
        expect(payload.prepared_metadata.prompt_count).toBeGreaterThan(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "logs",
            taskId,
            "--stream",
            "events",
            "--tail",
            "1",
            "--root",
            root,
          ]),
        ).toBe(0);
        expect(io.stdout).toContain("runner_prepared");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "logs",
            taskId,
            "--stream",
            "stderr",
            "--tail",
            "1",
            "--root",
            root,
          ]),
        ).toBe(0);
        expect(io.stdout).toContain("compressed stderr");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "logs",
            taskId,
            "--stream",
            "events",
            "--follow",
            "--root",
            root,
          ]),
        ).toBe(0);
        expect(io.stderr).toContain("nothing to follow until it is running");
      } finally {
        io.restore();
      }
    }
  });

  it("keeps historical task-local runs visible through public status, inspect, and logs", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createStartedRunnerTask(root, "Inspect a historical task-local run");
    const runId = "run-legacy-public";
    const workflowDir = ".agentplane/tasks";
    const paths = resolveTaskRunnerPaths({
      git_root: root,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    const bundle = makeRunnerContextBundle({
      taskId,
      runId,
      gitRoot: root,
      workflowDir,
      status: "DOING",
      mode: "dry_run",
    });
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "# legacy runner bootstrap\n",
      created_at: "2026-07-24T09:00:00.000Z",
    });
    await rewritePreparedArtifactsAsV0624(paths);

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "status",
            taskId,
            "--run-id",
            runId,
            "--json",
            "--root",
            root,
          ]),
        ).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          run_id: string;
          status: string;
          storage: string;
          paths: { state: string; receipt: string | null };
        };
        expect(payload.run_id).toBe(runId);
        expect(payload.status).toBe("prepared");
        expect(payload.storage).toBe("legacy_task");
        expect(payload.paths.state).toBe(paths.state_path);
        expect(payload.paths.receipt).toBeNull();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "inspect", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          run_id: string;
          storage: string;
          paths: { run_dir: string };
        };
        expect(payload.run_id).toBe(runId);
        expect(payload.storage).toBe("legacy_task");
        expect(payload.paths.run_dir).toBe(paths.run_dir);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "logs",
            taskId,
            "--run-id",
            runId,
            "--stream",
            "events",
            "--root",
            root,
          ]),
        ).toBe(0);
        expect(io.stdout).toContain("runner_prepared");
      } finally {
        io.restore();
      }
    }
  });

  it("pins status, inspect, and logs to run authority before timestamp ordering", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createStartedRunnerTask(root, "Select runner truth before wall clock");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const prepareAt = async (runId: string, updatedAt: string, trace: string) => {
      const prepared = await taskRunUsecases.prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: runId,
      });
      const state = evolveRunnerRunState({
        state: prepared.state,
        status: "prepared",
        updated_at: updatedAt,
      });
      await writeRunnerRunState({
        state_path: prepared.invocation.state_path,
        state,
      });
      await writeFile(prepared.invocation.trace_path, `${trace}\n`);
      return { ...prepared, state };
    };

    const claimed = await prepareAt(
      "run-before-clock-rollback",
      "2026-07-24T09:00:00.000Z",
      "claimed trace",
    );
    const projected = await prepareAt(
      "run-task-projection",
      "2026-07-24T10:00:00.000Z",
      "projected trace",
    );
    const timestampLatest = await prepareAt(
      "run-wall-clock-latest",
      "2026-07-24T11:00:00.000Z",
      "timestamp trace",
    );
    await persistRunnerOutcomeToTask({
      ctx,
      task_id: taskId,
      bundle: projected.bundle,
      state: projected.state,
    });
    const active = await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: claimed.invocation.run_id }),
    );

    const readJsonRun = async (args: string[]): Promise<string | null> => {
      const io = captureStdIO();
      try {
        expect(await runCli([...args, "--json", "--root", root])).toBe(0);
        return (JSON.parse(io.stdout) as { run_id: string | null }).run_id;
      } finally {
        io.restore();
      }
    };

    expect(await readJsonRun(["task", "run", "status", taskId])).toBe(claimed.invocation.run_id);
    expect(await readJsonRun(["task", "run", "inspect", taskId])).toBe(claimed.invocation.run_id);
    expect(
      await readJsonRun([
        "task",
        "run",
        "status",
        taskId,
        "--run-id",
        timestampLatest.invocation.run_id,
      ]),
    ).toBe(timestampLatest.invocation.run_id);

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli(["task", "run", "logs", taskId, "--stream", "trace", "--root", root]),
        ).toBe(0);
        expect(io.stdout).toContain("claimed trace");
        expect(io.stdout).not.toContain("timestamp trace");
      } finally {
        io.restore();
      }
    }

    await rm(active.claim_path);
    expect(await readJsonRun(["task", "run", "status", taskId])).toBe(projected.invocation.run_id);
  });
});
