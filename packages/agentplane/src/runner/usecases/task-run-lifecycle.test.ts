import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerContextBundle, RunnerDangerFullAccessAuthority } from "../types.js";

import {
  cancelTaskRunnerExecution,
  resumeTaskRunnerExecution,
  retryTaskRunnerExecution,
} from "./task-run-lifecycle.js";
import { runnerReplayDangerAuthoritySource } from "./task-run-lifecycle-shared.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";
import {
  INITIAL_DANGER_AUTHORITY,
  recordFailedExternalRunnerAnchor,
  replayDangerAuthority,
  sha256,
} from "./task-run-lifecycle.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
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
  const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await commandCtx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await commandCtx.taskBackend.writeTask({
    ...task,
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

async function configureCustomRunner(root: string, scriptLines: string[]): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
  };
  await writeConfig(root, config);

  const fakeBinDir = path.join(root, "bin");
  await writeRunnerExecutable(root, "custom-runner", scriptLines);
  process.env.PATH = `${fakeBinDir}${path.delimiter}${process.env.PATH ?? ""}`;
}

describe("task-run lifecycle usecases", () => {
  it("keeps legacy guidance semantic, marker-safe, and visible across runner history", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      String.raw`printf '{"schema_version":1,"status":"blocked","exit_code":1,"summary":"Runner blocked <!-- END RUNNER OUTCOME --> on sibling-owned paths.","artifacts":[{"path":"reports/out.txt","label":"Bad Label"}],"evidence":{"conflict_paths":["src/runner/conflict.ts"],"blocked_reason":"sibling runner owns the same file","recommended_parent_action":"split task scope before retrying"}}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
      "cat >/dev/null",
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Blocked manifest guidance");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-blocked-guidance";

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    expect(executed.result.status).toBe("success");
    expect(executed.result.exit_code).toBe(0);
    expect(executed.result.summary).toBe(
      "Runner blocked <!-- END RUNNER OUTCOME --> on sibling-owned paths.",
    );
    expect(executed.result.evidence).toMatchObject({
      provenance: "supervisor_observed",
      changed_paths: [],
      files_changed_count: 0,
    });
    expect(executed.result.evidence).not.toHaveProperty("conflict_paths");
    expect(executed.result.execution_receipt).toMatchObject({
      verification_state: "unverified",
      observed_by: "agentplane",
    });
    expect(executed.result.semantic_result).toMatchObject({
      provenance: "agent_reported",
      value: {
        kind: "legacy_agent_semantic_result",
        status: "blocked",
        blocker: {
          summary: "sibling runner owns the same file",
          recommended_action: "split task scope before retrying",
        },
      },
    });
    expect(executed.result.claim_conflicts).toEqual(
      expect.arrayContaining([
        {
          field: "status",
          agent_reported: "blocked",
          observed: "success",
          resolution: "observed_wins",
        },
        {
          field: "exit_code",
          agent_reported: 1,
          observed: 0,
          resolution: "observed_wins",
        },
      ]),
    );

    await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: `${runId}-second`,
    });

    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.doc).toContain(
      "Summary: Custom runner completed successfully. | AgentSemanticStatus[agent_reported]: blocked",
    );
    expect(task?.doc).toContain(
      "AgentSummary[agent_reported]: Runner blocked &lt;!-- END RUNNER OUTCOME --&gt; on sibling-owned paths.",
    );
    expect(task?.doc).toContain(
      "AgentBlocker[agent_reported]: sibling runner owns the same file; recommended_action=split task scope before retrying",
    );
    expect(task?.doc).toContain(
      "ClaimConflicts: status, exit_code, artifacts, evidence.conflict_paths",
    );
    expect(task?.doc).not.toContain("ConflictPaths: src/runner/conflict.ts");
    expect(task?.doc).not.toContain("BlockedReason: sibling runner owns the same file");
    expect(task?.doc).not.toContain("ParentAction: split task scope before retrying");
    expect(task?.doc).toContain(
      "VerificationHint: runner completed successfully; human verification and closure remain explicit lifecycle steps.",
    );
    expect(task?.doc).not.toContain(
      "AgentSummary[agent_reported]: Runner blocked <!-- END RUNNER OUTCOME -->",
    );
    expect(task?.doc?.match(/AgentSummary\[agent_reported\]/gu)).toHaveLength(2);
    expect(task?.doc?.match(/<!-- BEGIN RUNNER OUTCOME -->/gu)).toHaveLength(1);
    expect(task?.doc?.match(/<!-- END RUNNER OUTCOME -->/gu)).toHaveLength(1);
  });

  it("cancel marks a prepared execute-mode run as cancelled and appends an event", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Cancel run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-cancel",
    });

    const cancelled = await cancelTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });

    expect(cancelled.previous_status).toBe("prepared");
    expect(cancelled.state.status).toBe("cancelled");
    const events = await readFile(cancelled.invocation.events_path, "utf8");
    expect(events).toContain("runner_prepared");
    expect(events).toContain("runner_cancelled");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner).toMatchObject({
      run_id: "run-cancel",
      status: "cancelled",
      adapter_id: "custom",
      mode: "execute",
      target: { kind: "task", task_id: taskId },
    });
    expect(task?.verification?.state).toBe("pending");
    expect(task?.doc).toContain("RUNNER — cancelled");
    expect(task?.doc).toContain("VerificationHint: runner was cancelled");
  });

  it("refuses runner preparation when project-local blueprint trust is invalid", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const configPath = path.join(root, ".agentplane", "blueprints", "config.json");
    await mkdir(path.dirname(configPath), { recursive: true });
    await writeFile(
      configPath,
      JSON.stringify({
        schema_version: 1,
        trust_model: "explicit_allowlist",
        enabled: true,
        allowed_ids: ["missing.local"],
        selection: "explicit_only",
      }),
      "utf8",
    );
    const taskId = await createDoingTask(root, "Invalid local blueprint trust");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    await expect(
      prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: "run-invalid-blueprint-trust",
      }),
    ).rejects.toThrow("Invalid project-local blueprint trust registry");
  });

  it("persists a typed refusal when a danger recipe lacks explicit operator authority", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createDoingTask(root, "Danger recipe refusal");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-danger-refused";
    const runnerPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runId,
    });
    const runDir = runnerPaths.run_dir;
    let error: unknown = null;

    try {
      await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: runId,
        recipe: {
          recipe_id: "danger-recipe",
          scenario_id: "DANGER_SCENARIO",
          run_profile: {
            sandbox: "danger-full-access",
          },
        },
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_VALIDATION",
      context: {
        adapter_id: "codex",
        policy_field: "sandbox",
        declared_value: "danger-full-access",
        required_authority: "danger_full_access_authorized",
      },
      state: {
        status: "failed",
      },
      bundle: {
        execution: {
          sandbox_policy: {
            requested: "danger-full-access",
            source: "recipe_run_profile",
            authority: {
              danger_full_access_authorized: false,
              provenance: null,
              source: null,
            },
          },
          policy_decision: {
            refusal_reason: {
              code: "E_VALIDATION",
              policy_field: "sandbox",
              declared_value: "danger-full-access",
            },
          },
        },
      },
    });

    const persistedBundle = JSON.parse(
      await readFile(path.join(runDir, "bundle.json"), "utf8"),
    ) as {
      execution?: {
        sandbox_policy?: {
          requested?: string;
          authority?: { danger_full_access_authorized?: boolean };
        };
        policy_decision?: {
          refusal_reason?: {
            code?: string;
            policy_field?: string;
            declared_value?: string;
          };
        };
      };
    };
    expect(persistedBundle.execution?.sandbox_policy).toMatchObject({
      requested: "danger-full-access",
      authority: {
        danger_full_access_authorized: false,
      },
    });
    expect(persistedBundle.execution?.policy_decision?.refusal_reason).toMatchObject({
      code: "E_VALIDATION",
      policy_field: "sandbox",
      declared_value: "danger-full-access",
    });
    expect(await readRunnerRunState(path.join(runDir, "run-state.json"))).toMatchObject({
      status: "failed",
      result: {
        status: "failed",
        exit_code: 3,
      },
    });
    expect(await readFile(path.join(runDir, "events.jsonl"), "utf8")).toContain(
      '"type":"runner_refused"',
    );
  });

  it("rejects runtime danger authority with true but null or blank source", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createDoingTask(root, "Malformed danger authority");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    for (const [suffix, source] of [
      ["null", null],
      ["blank", " "],
    ] as const) {
      let error: unknown = null;
      try {
        await prepareTaskRunnerExecution({
          ctx,
          cwd: root,
          rootOverride: root,
          task_id: taskId,
          mode: "dry_run",
          run_id: `run-danger-${suffix}-source`,
          recipe: {
            recipe_id: "danger-recipe",
            scenario_id: "DANGER_SCENARIO",
            run_profile: {
              sandbox: "danger-full-access",
            },
          },
          danger_authority: {
            danger_full_access_authorized: true,
            provenance: "explicit_operator",
            source,
          } as unknown as RunnerDangerFullAccessAuthority,
        });
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(CliError);
      expect(error).toMatchObject({
        code: "E_VALIDATION",
        context: {
          adapter_id: "codex",
          policy_field: "sandbox",
          declared_value: "danger-full-access",
          required_authority: "danger_full_access_authorized",
        },
        bundle: {
          execution: {
            sandbox_policy: {
              authority: {
                danger_full_access_authorized: false,
                provenance: null,
                source: null,
              },
            },
          },
        },
      });
    }
  });

  it("persists a legacy custom-wrapper refusal raised by adapter.prepare", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
      enforcement: {
        mode: "codex_sandbox_full_auto",
        platform: "auto",
      },
    };
    await writeConfig(root, config);
    await writeRunnerExecutable(root, "custom-runner", ["#!/bin/sh", "exit 0"]);
    vi.spyOn(CustomRunnerAdapter.prototype, "describeCapabilities").mockReturnValue({
      adapter_id: "custom",
      fields: {
        sandbox: {
          level: "advisory",
          channel: "env",
        },
      },
    });
    const taskId = await createDoingTask(root, "Legacy wrapper refusal");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-legacy-wrapper-refused";
    const runnerPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: runId,
    });
    const runDir = runnerPaths.run_dir;
    let error: unknown = null;

    try {
      await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: runId,
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_RUNTIME",
      context: {
        adapter_id: "custom",
        wrapper_mode: "codex_sandbox_full_auto",
        policy_field: "sandbox",
        declared_value: "workspace-write",
        supported_values: [],
      },
      state: {
        status: "failed",
      },
      bundle: {
        execution: {
          policy_decision: {
            refusal_reason: {
              code: "E_RUNTIME",
              policy_field: "sandbox",
              declared_value: "workspace-write",
            },
          },
        },
      },
    });
    expect((error as CliError).message).toContain("legacy Codex CLI argv contract is unavailable");

    const persistedBundle = JSON.parse(
      await readFile(path.join(runDir, "bundle.json"), "utf8"),
    ) as {
      execution?: {
        policy_decision?: {
          fields?: { sandbox?: { status?: string } };
          refusal_reason?: {
            code?: string;
            policy_field?: string;
            declared_value?: string;
          };
        };
      };
    };
    expect(persistedBundle.execution?.policy_decision).toMatchObject({
      fields: {
        sandbox: {
          status: "advisory",
        },
      },
      refusal_reason: {
        code: "E_RUNTIME",
        policy_field: "sandbox",
        declared_value: "workspace-write",
      },
    });
    expect(await readRunnerRunState(path.join(runDir, "run-state.json"))).toMatchObject({
      status: "failed",
      result: {
        status: "failed",
        exit_code: 8,
      },
    });
    expect(await readFile(path.join(runDir, "events.jsonl"), "utf8")).toContain(
      '"type":"runner_refused"',
    );
  });

  it("blocks a write-capable run outside the route-authoritative task worktree", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createDoingTask(root, "Route-authoritative runner checkout");
    await execFileAsync("git", ["add", "--", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed route-authority task"], { cwd: root });
    const branch = `task/${taskId}/route-authority`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-route-authority`);
    await mkdir(path.dirname(worktreePath), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath], { cwd: root });
    const authoritativeWorktreePath = await realpath(worktreePath);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-checkout-mismatch";
    let error: unknown = null;

    try {
      await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: runId,
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(CliError);
    expect(error).toMatchObject({
      code: "E_VALIDATION",
      context: {
        policy_field: "write_scope",
        authoritative_checkout_path: authoritativeWorktreePath,
      },
    });
    expect(error).not.toHaveProperty("state");
    expect(error).not.toHaveProperty("bundle");
    expect(
      await readRunnerRunState(
        path.join(root, ".agentplane", "tasks", taskId, "runs", runId, "run-state.json"),
      ),
    ).toBeNull();
    expect((error as CliError).message).toContain("route-authoritative");
  });

  it.each(["resume", "retry"] as const)(
    "%s refuses to reuse stored danger authority before adapter preparation or lifecycle writes",
    async (action) => {
      const root = await mkGitRepoRoot();
      await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
      const taskId = await createDoingTask(root, `Danger ${action} refusal`);
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const sourceRunId = `run-danger-${action}-source`;
      const prepared = await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: sourceRunId,
        sandbox_override: "danger-full-access",
        danger_authority: INITIAL_DANGER_AUTHORITY,
      });
      const failedAt = new Date().toISOString();
      await writeRunnerRunState({
        state_path: prepared.invocation.state_path,
        state: evolveRunnerRunState({
          state: prepared.state,
          status: "failed",
          updated_at: failedAt,
          result: {
            status: "failed",
            exit_code: 1,
            started_at: failedAt,
            ended_at: failedAt,
            stderr_summary: "simulated failure",
          },
        }),
      });
      await recordFailedExternalRunnerAnchor({
        ctx,
        taskId,
        prepared,
        updatedAt: failedAt,
      });
      const beforeBundle = await readFile(prepared.invocation.bundle_path, "utf8");
      const beforeState = await readFile(prepared.invocation.state_path, "utf8");
      const beforeEvents = await readFile(prepared.invocation.events_path, "utf8");
      const prepareSpy = vi.spyOn(CustomRunnerAdapter.prototype, "prepare");
      const destinationRunId = `run-danger-${action}-destination`;

      const replay =
        action === "resume"
          ? resumeTaskRunnerExecution({
              ctx,
              cwd: root,
              rootOverride: root,
              task_id: taskId,
              run_id: sourceRunId,
              new_run_id: destinationRunId,
              danger_authority: INITIAL_DANGER_AUTHORITY,
            })
          : retryTaskRunnerExecution({
              ctx,
              cwd: root,
              rootOverride: root,
              task_id: taskId,
              run_id: sourceRunId,
              new_run_id: destinationRunId,
              danger_authority: INITIAL_DANGER_AUTHORITY,
            });

      await expect(replay).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: {
          task_id: taskId,
          run_id: sourceRunId,
          replay_action: action,
          declared_value: "danger-full-access",
          required_authority: "fresh_explicit_operator_danger_full_access_authority",
          expected_source: runnerReplayDangerAuthoritySource(action),
        },
      });
      expect(prepareSpy).not.toHaveBeenCalled();
      expect(await readFile(prepared.invocation.bundle_path, "utf8")).toBe(beforeBundle);
      expect(await readFile(prepared.invocation.state_path, "utf8")).toBe(beforeState);
      expect(await readFile(prepared.invocation.events_path, "utf8")).toBe(beforeEvents);
      await expect(
        readFile(
          path.join(root, ".agentplane", "tasks", taskId, "runs", destinationRunId, "bundle.json"),
          "utf8",
        ),
      ).rejects.toMatchObject({ code: "ENOENT" });
    },
  );

  it("resume persists a fresh action-scoped danger authority before adapter preparation", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Danger resume authority refresh");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const sourceRunId = "run-danger-resume-authorized-source";
    const destinationRunId = "run-danger-resume-authorized-destination";
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: sourceRunId,
      sandbox_override: "danger-full-access",
      danger_authority: INITIAL_DANGER_AUTHORITY,
    });
    const failedAt = new Date().toISOString();
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "failed",
        updated_at: failedAt,
        result: {
          status: "failed",
          exit_code: 1,
          started_at: failedAt,
          ended_at: failedAt,
          stderr_summary: "simulated failure",
        },
      }),
    });
    await recordFailedExternalRunnerAnchor({
      ctx,
      taskId,
      prepared,
      updatedAt: failedAt,
    });
    const sourceBundleBefore = await readFile(prepared.invocation.bundle_path, "utf8");
    const prepareSpy = vi.spyOn(CustomRunnerAdapter.prototype, "prepare");

    const resumed = await resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: sourceRunId,
      new_run_id: destinationRunId,
      danger_authority: replayDangerAuthority("resume"),
    });

    expect(prepareSpy).toHaveBeenCalledTimes(1);
    expect(resumed.bundle.execution.sandbox_policy?.authority).toEqual(
      replayDangerAuthority("resume"),
    );
    expect(resumed.source_run_id).toBe(sourceRunId);
    expect(resumed.source_status).toBe("failed");
    expect(resumed.previous_status).toBe("failed");
    const destinationBundleText = await readFile(resumed.invocation.bundle_path, "utf8");
    const destinationBundle = JSON.parse(destinationBundleText) as RunnerContextBundle;
    const destinationState = await readRunnerRunState(resumed.invocation.state_path);
    expect(destinationBundle.execution.sandbox_policy?.authority).toEqual(
      replayDangerAuthority("resume"),
    );
    expect(destinationState?.prepared_metadata?.bundle_sha256).toBe(sha256(destinationBundleText));
    expect(destinationState?.prepared_metadata?.bundle_bytes).toBe(
      Buffer.byteLength(destinationBundleText, "utf8"),
    );
    expect(await readFile(prepared.invocation.bundle_path, "utf8")).toBe(sourceBundleBefore);
  });

  it("retry stores only the fresh action-scoped danger authority in the destination run", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingTask(root, "Danger retry authority refresh");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const sourceRunId = "run-danger-retry-authorized-source";
    const destinationRunId = "run-danger-retry-authorized-destination";
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: sourceRunId,
      sandbox_override: "danger-full-access",
      danger_authority: INITIAL_DANGER_AUTHORITY,
    });
    const failedAt = new Date().toISOString();
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "failed",
        updated_at: failedAt,
        result: {
          status: "failed",
          exit_code: 1,
          started_at: failedAt,
          ended_at: failedAt,
          stderr_summary: "simulated failure",
        },
      }),
    });
    await recordFailedExternalRunnerAnchor({
      ctx,
      taskId,
      prepared,
      updatedAt: failedAt,
    });
    const sourceBundleBefore = await readFile(prepared.invocation.bundle_path, "utf8");
    const prepareSpy = vi.spyOn(CustomRunnerAdapter.prototype, "prepare");

    const retried = await retryTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: sourceRunId,
      new_run_id: destinationRunId,
      danger_authority: replayDangerAuthority("retry"),
    });

    expect(prepareSpy).toHaveBeenCalledTimes(1);
    expect(retried.bundle.execution.sandbox_policy?.authority).toEqual(
      replayDangerAuthority("retry"),
    );
    const destinationBundleText = await readFile(retried.invocation.bundle_path, "utf8");
    const destinationBundle = JSON.parse(destinationBundleText) as RunnerContextBundle;
    const destinationState = await readRunnerRunState(retried.invocation.state_path);
    expect(destinationBundle.execution.sandbox_policy?.authority).toEqual(
      replayDangerAuthority("retry"),
    );
    expect(destinationState?.prepared_metadata?.bundle_sha256).toBe(sha256(destinationBundleText));
    expect(destinationState?.prepared_metadata?.bundle_bytes).toBe(
      Buffer.byteLength(destinationBundleText, "utf8"),
    );
    expect(await readFile(prepared.invocation.bundle_path, "utf8")).toBe(sourceBundleBefore);
  });
});
