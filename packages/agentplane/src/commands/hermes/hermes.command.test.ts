import { describe, expect, it, vi } from "vitest";

import { buildStateFingerprint } from "@agentplaneorg/core/schemas";

import { runCli } from "../../cli/run-cli.js";
import {
  readCodexProviderUsageForResult,
  recordCodexProviderUsageForResult,
} from "../../runner/adapters/codex-result-transport.js";
import * as taskRunUsecases from "../../runner/usecases/task-run.js";
import { executeHermesWorkflowOperation, routeNeedsRunnerProjection } from "./hermes-runtime.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { captureStdIO, mkGitRepoRoot, runCliSilent } from "@agentplane/testkit";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Hermes adapter fixture",
      "--description",
      "Fixture task for Hermes adapter command coverage.",
      "--owner",
      "CODER",
      "--tag",
      "docs",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function createApprovedTask(root: string): Promise<string> {
  await runCliSilent(["init", "--workflow", "branch_pr", "--yes", "--root", root]);
  const taskId = await createTask(root);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "Fixture plan for Hermes adapter tests.",
    "--updated-by",
    "CODER",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  return taskId;
}

async function createRunnableDirectTask(root: string): Promise<string> {
  await runCliSilent(["init", "--workflow", "direct", "--yes", "--root", root]);
  const taskId = await createTask(root);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "Fixture plan for Hermes task-run execution coverage.",
    "--updated-by",
    "CODER",
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
    "Start: prepare the direct task runner fixture.",
    "--root",
    root,
  ]);
  expect(await runCliSilent(["task", "run", taskId, "--dry-run", "--root", root])).toBe(0);
  return taskId;
}

describe("hermes adapter commands", () => {
  it("returns the typed nonzero exit code when runner cleanup remains incomplete", async () => {
    const executed = {
      invocation: {
        adapter_id: "codex",
        run_id: "run-degraded-cleanup",
        work_order_id: "work-order-degraded-cleanup",
        run_dir: "/repo/runs/run-degraded-cleanup",
        bundle_path: "/repo/runs/run-degraded-cleanup/bundle.json",
        bootstrap_path: "/repo/runs/run-degraded-cleanup/bootstrap.md",
        result_path: "/repo/runs/run-degraded-cleanup/result.json",
      },
      bundle: {},
      state: { mode: "execute", status: "success" },
      result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-28T00:00:00.000Z",
        ended_at: "2026-07-28T00:00:01.000Z",
        summary: "provider completed",
      },
      active_claim_cleanup: {
        status: "cleanup_failed",
        code: "E_RUNTIME",
        message: "active claim could not be retired",
        event_recorded: true,
      },
    };
    recordCodexProviderUsageForResult(executed.result, {
      input_tokens: 100,
      output_tokens: 50,
      total_tokens: 150,
    });
    const executeSpy = vi
      .spyOn(taskRunUsecases, "executeTaskRunnerExecution")
      .mockResolvedValue(
        executed as Awaited<ReturnType<typeof taskRunUsecases.executeTaskRunnerExecution>>,
      );
    try {
      const result = await executeHermesWorkflowOperation({
        ctx: {} as never,
        cwd: "/repo",
        rootOverride: "/repo",
        includeRemote: false,
        dryRun: false,
        operation: {
          id: "runner.follow",
          params: { mode: "run", taskId: "TASK-CLEANUP" },
        } as never,
      });
      expect(result).toMatchObject({
        status: "failed",
        exit_code: 1,
        operation_result: {
          kind: "runner_lifecycle",
          value: {
            active_claim_cleanup: { status: "cleanup_failed" },
          },
        },
      });
      const lifecycle =
        result.operation_result?.kind === "runner_lifecycle" ? result.operation_result.value : null;
      expect(lifecycle?.result).not.toBeNull();
      if (!lifecycle?.result) throw new Error("Hermes did not project the runner result.");
      expect(readCodexProviderUsageForResult(lifecycle.result)).toEqual({
        input_tokens: 100,
        output_tokens: 50,
        total_tokens: 150,
      });
    } finally {
      executeSpy.mockRestore();
    }
  });

  it("renders a provider-safe enqueue projection", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "enqueue",
        taskId,
        "--board",
        "repo-board",
        "--assignee",
        "agentplane-coder",
        "--role",
        "CODER",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        idempotency_key: string;
        board: string;
        assignee: string;
        metadata: {
          agentplane: {
            task_id: string;
            authority: { status_sync: string };
            comment_projection: {
              schema: string;
              execution_packet: {
                staleStateCheck: string;
                returnControlWhen: string;
                mustNot: string[];
              };
              evidence_refs: Record<string, string>;
              runner: null;
            };
          };
        };
        evidence_refs: Record<string, string>;
        sync_field_policies: { status: { authority: string } };
      };
      expect(payload.idempotency_key).toContain(`agentplane:${root}:${taskId}:CODER`);
      expect(payload.board).toBe("repo-board");
      expect(payload.assignee).toBe("agentplane-coder");
      expect(payload.metadata.agentplane.task_id).toBe(taskId);
      expect(payload.metadata.agentplane.authority.status_sync).toBe("projection_only");
      expect(payload.metadata.agentplane.comment_projection.schema).toBe(
        "agentplane.hermes.lifecycle-comment.v1",
      );
      expect(payload.metadata.agentplane.comment_projection.execution_packet.staleStateCheck).toBe(
        `agentplane task next-action ${taskId} --explain`,
      );
      expect(
        payload.metadata.agentplane.comment_projection.execution_packet.returnControlWhen,
      ).toContain("recompute task next-action");
      expect(payload.metadata.agentplane.comment_projection.execution_packet.mustNot).toContain(
        "do not reconstruct branch/worktree/PR state from prose",
      );
      expect(payload.metadata.agentplane.comment_projection.runner).toBeNull();
      expect(payload.metadata.agentplane.comment_projection.evidence_refs).not.toHaveProperty(
        "runner_status",
      );
      expect(payload.metadata.agentplane.comment_projection.evidence_refs).not.toHaveProperty(
        "runner_inspect",
      );
      expect(payload.evidence_refs).not.toHaveProperty("runner_event_logs");
      expect(payload.sync_field_policies.status.authority).toBe("agentplane");
    } finally {
      io.restore();
    }
  });

  it("supervise returns a route-gated packet without allowing raw route shell execution", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "supervise", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task: { id: string };
        projection_boundary: { agentplane_authority: string; hermes_authority: string };
        supervisor_policy: {
          execute_raw_shell_from_route: boolean;
          max_route_steps_per_claim: number;
        };
        runner: null;
        hermes_comment_projection: {
          schema: string;
          execution_packet: {
            staleStateCheck: string;
            returnControlWhen: string;
          };
          evidence_refs: Record<string, string>;
        };
        terminal: { hermes_root_complete_allowed: boolean };
        lifecycle_recommendation: { action: string; command: string; reason: string };
      };
      expect(payload.task.id).toBe(taskId);
      expect(payload.projection_boundary.agentplane_authority).toBe("engineering_task_lifecycle");
      expect(payload.projection_boundary.hermes_authority).toBe("dispatch_run_lifecycle");
      expect(payload.supervisor_policy.execute_raw_shell_from_route).toBe(false);
      expect(payload.supervisor_policy.max_route_steps_per_claim).toBe(1);
      expect(payload.runner).toBeNull();
      expect(payload.hermes_comment_projection.schema).toBe(
        "agentplane.hermes.lifecycle-comment.v1",
      );
      expect(payload.hermes_comment_projection.execution_packet.staleStateCheck).toBe(
        `agentplane task next-action ${taskId} --explain`,
      );
      expect(payload.hermes_comment_projection.execution_packet.returnControlWhen).toContain(
        "after the provider or human action completes",
      );
      expect(payload.hermes_comment_projection.evidence_refs).not.toHaveProperty("runner_status");
      expect(payload.terminal.hermes_root_complete_allowed).toBe(false);
      expect(payload.lifecycle_recommendation.action).toBe("block");
      expect(payload.lifecycle_recommendation.command).toContain("hermes lifecycle block");
    } finally {
      io.restore();
    }
  });

  it("supervise dry-runs one allowlisted typed route step", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createRunnableDirectTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "supervise",
        taskId,
        "--execute-step",
        "--dry-run",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        supervisor_policy: { execute_raw_shell_from_route: boolean };
        execution: {
          requested: boolean;
          dry_run: boolean;
          allowed: boolean;
          result: {
            detail: string;
            exit_code: number | null;
            operation_result: {
              kind: string;
              value: {
                schema: string;
                phase: string;
                task_id: string;
                invocation: { work_order_id: string };
                lifecycle: {
                  effect: {
                    state: string;
                    authority: { ref: string; digest: string } | null;
                    observed_evidence: { code: string; digest: string | null } | null;
                    claim_generation: string | null;
                  };
                };
              };
            };
          };
        };
        workflow_supervision: {
          audit: { event: string }[];
          episode: {
            status: string;
            cursor: { phase: string; operation_key: string | null };
            usage: { episodes: number; agent_runs: number };
            stop: null;
            digest: string;
          } | null;
        };
        refreshed_route: { task: { id: string } };
      };
      expect(payload.supervisor_policy.execute_raw_shell_from_route).toBe(false);
      expect(payload.execution.requested).toBe(true);
      expect(payload.execution.dry_run).toBe(true);
      expect(payload.execution.allowed).toBe(true);
      expect(payload.execution.result.detail).toContain(taskId);
      expect(payload.execution.result.exit_code).toBeNull();
      const operationResult = payload.execution.result.operation_result;
      const lifecycle = operationResult.value;
      const effect = lifecycle.lifecycle.effect;
      expect(operationResult.kind).toBe("runner_lifecycle");
      expect(lifecycle.schema).toBe("agentplane.task_runner_lifecycle_result.v1");
      expect(lifecycle.phase).toBe("prepared");
      expect(lifecycle.task_id).toBe(taskId);
      expect(effect.state).toBe("not_recorded");
      expect(effect.authority).not.toBeNull();
      expect(effect.authority?.ref).toContain("work-order:");
      expect(effect.authority?.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
      expect(effect.observed_evidence).not.toBeNull();
      expect(effect.observed_evidence?.code).toBe("runner_effect_operation_prepared");
      expect(effect.observed_evidence?.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
      expect(effect.claim_generation).toMatch(/^sha256:[0-9a-f]{64}$/u);
      expect(lifecycle.invocation.work_order_id).toContain(taskId);
      expect(payload.workflow_supervision.audit.map((entry) => entry.event)).toEqual([
        "decision_observed",
        "operation_executed",
        "route_refreshed",
      ]);
      expect(payload.workflow_supervision.episode).toMatchObject({
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 1, agent_runs: 1 },
        stop: null,
      });
      expect(payload.workflow_supervision.episode?.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
      expect(payload.refreshed_route.task.id).toBe(taskId);
    } finally {
      io.restore();
    }
  });

  it("emits the shared supervisor classification from task next-action", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createRunnableDirectTask(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        workflow_step: { preconditionFingerprint: { digest: string } };
        workflow_supervision: {
          executable: boolean;
          operation_id: string | null;
          audit: { event: string; state_fingerprint: string }[];
        };
      };
      expect(payload.workflow_supervision.executable).toBe(true);
      expect(payload.workflow_supervision.operation_id).toBe("runner.follow");
      expect(payload.workflow_supervision.audit).toHaveLength(1);
      expect(payload.workflow_supervision.audit[0]).toMatchObject({
        event: "decision_observed",
        state_fingerprint: payload.workflow_step.preconditionFingerprint.digest,
      });
    } finally {
      io.restore();
    }
  });

  it("keeps Hermes runner projection for explicit task run routes", () => {
    const taskId = "202606010530-BEYQXA";
    const fingerprintComponent = {
      state: "present",
      source: "hermes_runner_projection_fixture",
      value: { taskId },
    } as const;
    const preconditionFingerprint = buildStateFingerprint({
      task_id: taskId,
      task_revision: 1,
      git_head: null,
      worktree: "/repo",
      components: {
        task: fingerprintComponent,
        git: fingerprintComponent,
        backend_projection: fingerprintComponent,
        policy: fingerprintComponent,
        blueprint: fingerprintComponent,
        knowledge: fingerprintComponent,
        provider: fingerprintComponent,
        authority: fingerprintComponent,
      },
    });
    const workflowStep = {
      schemaVersion: 1,
      id: "runner.follow",
      kind: "cli_operation",
      phase: "direct_execution",
      authoritativeCheckout: "current_checkout",
      summary: "continue the direct-mode task from the current checkout",
      blockers: [],
      selectedBlocker: null,
      compatibility: {
        code: "run",
        command: `agentplane task run ${taskId}`,
        summary: "continue the direct-mode task from the current checkout",
        requiresApproval: false,
      },
      preconditionFingerprint,
      operation: {
        id: "runner.follow",
        type: "runner_follow",
        params: { mode: "run", taskId },
        preconditionFingerprint,
        authorityRef: `route:${taskId}:${preconditionFingerprint.digest}`,
        idempotencyKey: `runner.follow:${taskId}:${preconditionFingerprint.digest}:fixture`,
        expectedPostconditions: [
          {
            id: "runner_state_observed",
            subject: "runner",
            expected: "runner state is observed after the operation",
          },
          {
            id: "route_state_recomputed",
            subject: "route",
            expected: "route state is recomputed before another mutation",
          },
        ],
        triggersGitHooks: false,
      },
      execution: {
        actionKind: "local_command",
        recommendedRole: "CODER",
        semanticMutationAllowed: false,
        mustNot: [
          "do not infer local lifecycle authority from runner output alone; inspect the durable runner state",
        ],
        returnControlWhen:
          "after the exact command exits; recompute task next-action before any further step",
        verificationCandidate: null,
        evidenceMissing: [],
        needsVerificationRecord: false,
      },
    } satisfies Extract<TaskRouteDecision["workflowStep"], { kind: "cli_operation" }>;
    const decision = {
      task: {
        id: taskId,
        title: "Hermes task launch",
        status: "DOING",
        owner: "CODER",
        planApproval: "approved",
        verification: "pending",
        commit: null,
      },
      workflowStep,
      nextAction: {
        code: "run",
        command: `agentplane task run ${taskId}`,
        summary: "continue the direct-mode task from the current checkout",
        requiresApproval: false,
      },
      oracle: {
        phase: "direct_execute",
        authoritativeCheckout: "current_checkout",
        authoritativeCheckoutPath: "/repo",
        mutationPathHint: "/repo",
        blocker: null,
        nextCommand: `agentplane task run ${taskId}`,
        summary: "continue the direct-mode task from the current checkout",
      },
      blockers: [],
      executionPacket: {
        actionKind: "local_command",
        safeToMutate: true,
        exactArgv: ["agentplane", "task", "run", taskId],
        stopReason: null,
        returnControlWhen: "after the exact command exits; recompute task next-action",
        staleStateCheck: `agentplane task next-action ${taskId} --explain`,
        verificationCandidate: null,
      },
    } as TaskRouteDecision;

    expect(routeNeedsRunnerProjection(decision)).toBe(true);
  });

  it("doctor reports the local Agentplane side of the adapter contract", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "doctor", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        ok: boolean;
        repo: string;
        adapter_status: string;
        missing_hermes_env: string[];
      };
      expect(payload.ok).toBe(true);
      expect(payload.repo).toBe(root);
      expect(payload.adapter_status).toContain("hermes_plugin_required");
      expect(payload.missing_hermes_env).toContain("task_id");
    } finally {
      io.restore();
    }
  });

  it("doctor reports the Agentplane Hermes lane registry state when configured", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);
    const registryPath = path.join(root, "registry", "lane-registry.json");
    await mkdir(path.dirname(registryPath), { recursive: true });
    await writeFile(
      registryPath,
      JSON.stringify(
        {
          lanes: [
            {
              name: "agentplane-coder",
              match: "agentplane-*",
              kind: "agentplane",
            },
          ],
        },
        null,
        2,
      ),
    );

    const previous = process.env.AGENTPLANE_HERMES_LANE_REGISTRY;
    process.env.AGENTPLANE_HERMES_LANE_REGISTRY = registryPath;
    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "doctor", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        lane_registry: {
          path: string;
          loaded: boolean;
          agentplane_lanes: { name: string; kind: string }[];
        };
      };
      expect(payload.lane_registry.path).toBe(registryPath);
      expect(payload.lane_registry.loaded).toBe(true);
      expect(payload.lane_registry.agentplane_lanes).toHaveLength(1);
      expect(payload.lane_registry.agentplane_lanes[0]?.name).toBe("agentplane-coder");
    } finally {
      io.restore();
      if (previous === undefined) {
        delete process.env.AGENTPLANE_HERMES_LANE_REGISTRY;
      } else {
        process.env.AGENTPLANE_HERMES_LANE_REGISTRY = previous;
      }
    }
  });

  it("reconcile includes the local Agentplane projection when task id is provided", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--task-id",
        taskId,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode: string;
        local_projection: {
          task: { id: string };
          hermes_comment_projection: {
            agentplane_task_id: string;
            evidence_refs: Record<string, string>;
          };
        };
        plugin_contract: { remote_board_reads_required: boolean };
      };
      expect(payload.mode).toBe("read_only");
      expect(payload.local_projection.task.id).toBe(taskId);
      expect(payload.local_projection.hermes_comment_projection.agentplane_task_id).toBe(taskId);
      expect(payload.local_projection.hermes_comment_projection.evidence_refs).not.toHaveProperty(
        "runner_status",
      );
      expect(payload.plugin_contract.remote_board_reads_required).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("reconcile compares a Hermes card state snapshot with Agentplane task truth", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);
    const statePath = path.join(root, "hermes-state.json");
    await writeFile(
      statePath,
      JSON.stringify({
        cards: [
          {
            id: "hk_123",
            status: "complete",
            assignee: "agentplane-coder",
            metadata: { agentplane: { task_id: taskId } },
          },
        ],
      }),
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--task-id",
        taskId,
        "--hermes-state",
        statePath,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        hermes_state: {
          path: string;
          diagnostics: {
            state_card_count: number;
            matched_card_count: number;
            matched_cards: { id: string; agentplane_task_id: string }[];
            findings: { code: string }[];
          };
        };
      };
      expect(payload.hermes_state.path).toBe(statePath);
      expect(payload.hermes_state.diagnostics.state_card_count).toBe(1);
      expect(payload.hermes_state.diagnostics.matched_card_count).toBe(1);
      expect(payload.hermes_state.diagnostics.matched_cards[0]?.id).toBe("hk_123");
      expect(payload.hermes_state.diagnostics.matched_cards[0]?.agentplane_task_id).toBe(taskId);
      expect(payload.hermes_state.diagnostics.findings.map((finding) => finding.code)).toContain(
        "hermes_complete_agentplane_open",
      );
    } finally {
      io.restore();
    }
  });

  it("reconcile does not flag all-board snapshots with distinct Agentplane task ids as duplicates", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);
    const statePath = path.join(root, "hermes-state.json");
    await writeFile(
      statePath,
      JSON.stringify({
        cards: [
          {
            id: "hk_123",
            status: "running",
            metadata: { agentplane: { task_id: "202606010001-AAAAAA" } },
          },
          {
            id: "hk_124",
            status: "running",
            metadata: { agentplane: { task_id: "202606010002-BBBBBB" } },
          },
        ],
      }),
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--hermes-state",
        statePath,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        hermes_state: {
          diagnostics: {
            matched_card_count: number;
            findings: { code: string }[];
          };
        };
      };
      expect(payload.hermes_state.diagnostics.matched_card_count).toBe(2);
      expect(
        payload.hermes_state.diagnostics.findings.map((finding) => finding.code),
      ).not.toContain("duplicate_hermes_cards");
    } finally {
      io.restore();
    }
  });

  it("reconcile flags duplicate Hermes cards for the same Agentplane task id", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);
    const statePath = path.join(root, "hermes-state.json");
    await writeFile(
      statePath,
      JSON.stringify({
        cards: [
          {
            id: "hk_123",
            metadata: { agentplane: { task_id: "202606010001-AAAAAA" } },
          },
          {
            id: "hk_124",
            metadata: { agentplane: { task_id: "202606010001-AAAAAA" } },
          },
        ],
      }),
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--hermes-state",
        statePath,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        hermes_state: {
          diagnostics: {
            findings: { code: string; message: string }[];
          };
        };
      };
      const duplicate = payload.hermes_state.diagnostics.findings.find(
        (finding) => finding.code === "duplicate_hermes_cards",
      );
      expect(duplicate?.message).toContain("202606010001-AAAAAA");
    } finally {
      io.restore();
    }
  });

  it("renders Hermes lifecycle callbacks without touching Hermes in dry-run mode", async () => {
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
      if (previousTask === undefined) {
        delete process.env.HERMES_KANBAN_TASK;
      } else {
        process.env.HERMES_KANBAN_TASK = previousTask;
      }
      if (previousBoard === undefined) {
        delete process.env.HERMES_KANBAN_BOARD;
      } else {
        process.env.HERMES_KANBAN_BOARD = previousBoard;
      }
      if (previousHermesBin === undefined) {
        delete process.env.HERMES_BIN;
      } else {
        process.env.HERMES_BIN = previousHermesBin;
      }
    }
  });
});
