import { mkdir, readFile, readdir, rename, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

import type { TaskRunnerOutcomeStatus, TaskRunnerTarget } from "../../backends/task-backend.js";
import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";

import { resumeTaskRunnerExecution, retryTaskRunnerExecution } from "./task-run-lifecycle.js";
import { prepareTaskRunnerExecution } from "./task-run.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;
const REPLAY_ACTIONS = ["resume", "retry"] as const;

type ReplayAction = (typeof REPLAY_ACTIONS)[number];
type CommandContext = Awaited<ReturnType<typeof loadCommandContext>>;

afterEach(() => {
  process.env.PATH = originalPath;
});

async function createDoingTask(root: string, title: string): Promise<string> {
  let taskId = "";
  {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        title,
        "--description",
        title,
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
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
    `Execute lifecycle test task: ${title}.`,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await ctx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await ctx.taskBackend.writeTask({
    ...task!,
    id: taskId,
    title,
    description: title,
    priority: task?.priority ?? "med",
    owner: task?.owner ?? "CODER",
    depends_on: task?.depends_on ?? [],
    tags: task?.tags ?? ["docs"],
    verify: task?.verify ?? [],
    status: "DOING",
  });
  return taskId;
}

async function configureCustomRunner(root: string): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
  };
  await writeConfig(root, config);
  await writeRunnerExecutable(root, "custom-runner", ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
}

async function recordExternalSource(opts: {
  ctx: CommandContext;
  taskId: string;
  runId: string;
  status?: TaskRunnerOutcomeStatus;
  target?: TaskRunnerTarget;
  adapterId?: string;
  mode?: "execute" | "dry_run";
}): Promise<void> {
  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  expect(task).toBeTruthy();
  const status = opts.status ?? "failed";
  await opts.ctx.taskBackend.writeTask({
    ...task!,
    runner: {
      run_id: opts.runId,
      status,
      adapter_id: opts.adapterId ?? "custom",
      mode: opts.mode ?? "execute",
      updated_at: "2026-07-24T10:00:00.000Z",
      exit_code: status === "success" ? 0 : status === "failed" ? 1 : null,
      target: opts.target ?? {
        kind: "task",
        task_id: opts.taskId,
      },
    },
  });
}

async function prepareAnchoredSource(opts: {
  ctx: CommandContext;
  root: string;
  taskId: string;
  runId: string;
  status?: TaskRunnerOutcomeStatus;
}) {
  const prepared = await prepareTaskRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.root,
    rootOverride: opts.root,
    task_id: opts.taskId,
    mode: "execute",
    run_id: opts.runId,
  });
  await recordExternalSource({
    ctx: opts.ctx,
    taskId: opts.taskId,
    runId: prepared.invocation.run_id,
    status: opts.status,
    target: structuredClone(prepared.bundle.target),
    adapterId: prepared.invocation.adapter_id,
  });
  return prepared;
}

function runFreshReplay(
  action: ReplayAction,
  opts: {
    ctx: CommandContext;
    root: string;
    taskId: string;
    sourceRunId: string;
    destinationRunId: string;
  },
) {
  const request = {
    ctx: opts.ctx,
    cwd: opts.root,
    rootOverride: opts.root,
    task_id: opts.taskId,
    run_id: opts.sourceRunId,
    new_run_id: opts.destinationRunId,
  };
  return action === "resume"
    ? resumeTaskRunnerExecution(request)
    : retryTaskRunnerExecution(request);
}

describe("task-run fresh replay security", () => {
  it.each(REPLAY_ACTIONS)("%s ignores missing and tampered source artifacts", async (action) => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, `${action} ignores source artifacts`);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const source = await prepareAnchoredSource({
      ctx,
      root,
      taskId,
      runId: `run-${action}-untrusted-source`,
    });
    await rename(source.invocation.run_dir, `${source.invocation.run_dir}.detached`);

    const fromMissing = await runFreshReplay(action, {
      ctx,
      root,
      taskId,
      sourceRunId: source.invocation.run_id,
      destinationRunId: `run-${action}-from-missing-source`,
    });

    expect(fromMissing.source_run_id).toBe(source.invocation.run_id);
    expect(fromMissing.source_status).toBe("failed");
    expect(fromMissing.invocation.run_id).toBe(`run-${action}-from-missing-source`);
    expect(JSON.stringify(fromMissing.bundle.route_decision)).not.toContain(
      source.invocation.run_id,
    );

    await recordExternalSource({
      ctx,
      taskId,
      runId: source.invocation.run_id,
      target: structuredClone(source.bundle.target),
      adapterId: source.invocation.adapter_id,
    });
    await mkdir(source.invocation.run_dir, { recursive: true });
    const victimPath = path.join(root, `source-${action}-victim.txt`);
    const tamperedBundle = `${JSON.stringify({
      execution: {
        artifact_paths: {
          result_path: victimPath,
        },
      },
    })}\n`;
    await writeFile(victimPath, "sentinel\n", "utf8");
    await writeFile(source.invocation.bundle_path, tamperedBundle, "utf8");
    await writeFile(source.invocation.state_path, "not-json\n", "utf8");
    await writeFile(source.invocation.events_path, "source-tampered\n", "utf8");

    const fromTampered = await runFreshReplay(action, {
      ctx,
      root,
      taskId,
      sourceRunId: source.invocation.run_id,
      destinationRunId: `run-${action}-from-tampered-source`,
    });

    expect(fromTampered.invocation.run_id).toBe(`run-${action}-from-tampered-source`);
    expect(JSON.stringify(fromTampered.bundle.route_decision)).not.toContain(
      source.invocation.run_id,
    );
    expect(await readFile(source.invocation.bundle_path, "utf8")).toBe(tamperedBundle);
    expect(await readFile(source.invocation.events_path, "utf8")).toBe("source-tampered\n");
    expect(await readFile(victimPath, "utf8")).toBe("sentinel\n");
  });

  it("re-derives current role, sandbox, and write scope for both replay actions", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay current authority");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const source = await prepareAnchoredSource({
      ctx,
      root,
      taskId,
      runId: "run-current-authority-source",
    });
    expect(source.bundle.execution.sandbox_policy).toMatchObject({
      requested: "workspace-write",
      role: "CODER",
    });
    const task = await ctx.taskBackend.getTask(taskId);
    await ctx.taskBackend.writeTask({
      ...task!,
      owner: "REVIEWER",
      task_kind: "analysis",
      mutation_scope: "none",
    });

    for (const action of REPLAY_ACTIONS) {
      await recordExternalSource({
        ctx,
        taskId,
        runId: source.invocation.run_id,
        target: structuredClone(source.bundle.target),
        adapterId: source.invocation.adapter_id,
      });
      const replayed = await runFreshReplay(action, {
        ctx,
        root,
        taskId,
        sourceRunId: source.invocation.run_id,
        destinationRunId: `run-${action}-current-authority`,
      });

      expect(replayed.bundle.task?.data.owner).toBe("REVIEWER");
      expect(replayed.bundle.execution.sandbox_policy).toMatchObject({
        requested: "read-only",
        source: "role_default",
        role: "REVIEWER",
      });
      expect(replayed.bundle.execution.write_scope?.writable_roots).toEqual([]);
      expect(replayed.invocation.env.AGENTPLANE_RUNNER_SANDBOX_REQUESTED).toBe("read-only");
    }
  });

  it("rejects the source run id as destination for both replay actions", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay distinct destination");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const source = await prepareAnchoredSource({
      ctx,
      root,
      taskId,
      runId: "run-same-id-source",
    });
    await rename(source.invocation.run_dir, `${source.invocation.run_dir}.detached`);

    for (const action of REPLAY_ACTIONS) {
      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId: source.invocation.run_id,
          destinationRunId: source.invocation.run_id,
        }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: {
          task_id: taskId,
          replay_action: action,
          source_run_id: source.invocation.run_id,
          destination_run_id: source.invocation.run_id,
        },
      });
    }
  });

  it.each(REPLAY_ACTIONS)(
    "%s refuses a historical source while another external run is active",
    async (action) => {
      const root = await mkGitRepoRoot();
      await configureCustomRunner(root);
      const taskId = await createDoingTask(root, `${action} competing active run`);
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const source = await prepareAnchoredSource({
        ctx,
        root,
        taskId,
        runId: `run-${action}-historical-source`,
      });
      const task = await ctx.taskBackend.getTask(taskId);
      expect(task?.runner).toBeTruthy();
      const { history: _history, ...sourceAnchor } = task!.runner!;
      await ctx.taskBackend.writeTask({
        ...task!,
        runner: {
          ...sourceAnchor,
          run_id: `run-${action}-active`,
          status: "running",
          updated_at: "2026-07-24T11:00:00.000Z",
          exit_code: null,
          history: [sourceAnchor],
        },
      });

      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId: source.invocation.run_id,
          destinationRunId: `run-${action}-blocked-destination`,
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
        context: {
          task_id: taskId,
          replay_action: action,
          competing_run_id: `run-${action}-active`,
          competing_run_status: "running",
        },
      });
    },
  );

  it("rejects prepared, running, and successful external sources", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay terminal sources only");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const refusedStatuses = ["prepared", "running", "success"] as const;

    for (const action of REPLAY_ACTIONS) {
      for (const status of refusedStatuses) {
        const sourceRunId = `run-${action}-${status}-source`;
        await recordExternalSource({
          ctx,
          taskId,
          runId: sourceRunId,
          status,
        });
        await expect(
          runFreshReplay(action, {
            ctx,
            root,
            taskId,
            sourceRunId,
            destinationRunId: `run-${action}-${status}-destination`,
          }),
        ).rejects.toMatchObject({
          code: "E_USAGE",
          context: {
            task_id: taskId,
            replay_action: action,
            source_status: status,
          },
        });
      }
    }
  });

  it("fails closed on recipe sources with exact scenario guidance", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay recipe guidance");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const guidance = "agentplane recipes scenario execute docs-review:strict";

    for (const action of REPLAY_ACTIONS) {
      const sourceRunId = `run-${action}-recipe-source`;
      await recordExternalSource({
        ctx,
        taskId,
        runId: sourceRunId,
        target: {
          kind: "recipe_scenario",
          recipe_id: "docs-review",
          scenario_id: "strict",
          task_id: taskId,
        },
      });
      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId,
          destinationRunId: `run-${action}-recipe-destination`,
        }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        message: expect.stringContaining(guidance) as string,
        context: {
          task_id: taskId,
          replay_action: action,
          fresh_execution_command: guidance,
        },
      });
    }
  });

  it("protects symlink, existing, and traversal destinations for both replay actions", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay destination boundaries");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const sourceRunId = "run-boundary-source";
    await recordExternalSource({
      ctx,
      taskId,
      runId: sourceRunId,
    });
    const runnerPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "destination-probe",
    });
    const runsDir = runnerPaths.runs_dir;
    await mkdir(runsDir, { recursive: true });

    for (const action of REPLAY_ACTIONS) {
      const symlinkDestination = `run-${action}-symlink-destination`;
      const symlinkDestinationDir = path.join(runsDir, symlinkDestination);
      const victimDir = path.join(root, `${action}-symlink-victim`);
      const victimSentinel = path.join(victimDir, "sentinel.txt");
      await mkdir(victimDir, { recursive: true });
      await writeFile(victimSentinel, "sentinel\n", "utf8");
      await symlink(victimDir, symlinkDestinationDir, "dir");

      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId,
          destinationRunId: symlinkDestination,
        }),
      ).rejects.toMatchObject({
        code: "RUNNER_RUN_DIRECTORY_BOUNDARY",
      });
      expect(await readFile(victimSentinel, "utf8")).toBe("sentinel\n");
      expect(await readdir(victimDir)).toEqual(["sentinel.txt"]);

      const existingDestination = `run-${action}-existing-destination`;
      const existingDestinationDir = path.join(runsDir, existingDestination);
      const existingSentinel = path.join(existingDestinationDir, "sentinel.txt");
      await mkdir(existingDestinationDir, { recursive: true });
      await writeFile(existingSentinel, "sentinel\n", "utf8");

      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId,
          destinationRunId: existingDestination,
        }),
      ).rejects.toMatchObject({
        code: "RUNNER_RUN_DIRECTORY_BOUNDARY",
      });
      expect(await readFile(existingSentinel, "utf8")).toBe("sentinel\n");
      expect(await readdir(existingDestinationDir)).toEqual(["sentinel.txt"]);

      await expect(
        runFreshReplay(action, {
          ctx,
          root,
          taskId,
          sourceRunId,
          destinationRunId: `../escape-${action}`,
        }),
      ).rejects.toThrow("runner run_id must be a non-empty path segment");
      await expect(
        readFile(
          path.join(root, ".agentplane", "tasks", taskId, `escape-${action}`, "bundle.json"),
          "utf8",
        ),
      ).rejects.toMatchObject({ code: "ENOENT" });
    }
  });

  it("writes external-anchor provenance only to each fresh destination", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root);
    const taskId = await createDoingTask(root, "Fresh replay provenance");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const source = await prepareAnchoredSource({
      ctx,
      root,
      taskId,
      runId: "run-provenance-source",
    });
    const sourceEventsBefore = await readFile(source.invocation.events_path, "utf8");

    for (const action of REPLAY_ACTIONS) {
      await recordExternalSource({
        ctx,
        taskId,
        runId: source.invocation.run_id,
        target: structuredClone(source.bundle.target),
        adapterId: source.invocation.adapter_id,
      });
      const destinationRunId = `run-${action}-provenance-destination`;
      const replayed = await runFreshReplay(action, {
        ctx,
        root,
        taskId,
        sourceRunId: source.invocation.run_id,
        destinationRunId,
      });

      expect(replayed).toMatchObject({
        source_run_id: source.invocation.run_id,
        source_status: "failed",
      });
      if (action === "resume") {
        expect(replayed).toMatchObject({
          previous_status: "failed",
        });
      }
      expect(replayed.invocation.run_id).toBe(destinationRunId);
      expect(await readFile(source.invocation.events_path, "utf8")).toBe(sourceEventsBefore);
      const destinationEvents = await readFile(replayed.invocation.events_path, "utf8");
      expect(destinationEvents).toContain(`runner_${action}_created`);
      expect(destinationEvents).toContain(`"source_run_id":"${source.invocation.run_id}"`);
      expect(destinationEvents).toContain('"source_status":"failed"');
      expect(destinationEvents).toContain('"source_trust":"external_task_anchor_only"');
      expect(destinationEvents).toContain('"source_artifacts_reused":false');
    }
  });
});
