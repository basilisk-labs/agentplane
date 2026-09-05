import { type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { execFileAsync } from "@agentplaneorg/core/process";
import { captureStdIO } from "@agentplane/testkit";
import { expect, vi } from "vitest";
import * as resultApplication from "../commands/task/external-agent-result-application.js";
import * as implementationAuthority from "../commands/task/external-agent-implementation-authority.js";
import { runCli } from "./run-cli.js";
import { resolveConflictReworkSemanticInput } from "../commands/pr/conflict-rework-semantic-input.js";

import { loadCommandContext } from "../commands/shared/task-backend.js";

import * as conflictApplication from "../commands/pr/conflict-rework-merge.js";

import * as taskVerification from "../commands/task/direct-task-verification.js";
import * as prSync from "../commands/pr/internal/sync.js";
import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "../commands/task/external-agent-exchange.js";

export type ConflictVerificationDrift = "workspace" | "task" | "checkpoint" | "result" | "policy";

export async function withFakeConflictGh<T>(
  root: string,
  source: string,
  run: () => Promise<T>,
): Promise<T> {
  const fakeGh = path.join(root, "fake-gh-provider-conflict.mjs");
  await writeFile(fakeGh, source, "utf8");
  const previousGhBin = process.env.AGENTPLANE_GH_BIN;
  const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
  process.env.AGENTPLANE_GH_BIN = process.execPath;
  process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
  try {
    return await run();
  } finally {
    if (previousGhBin === undefined) delete process.env.AGENTPLANE_GH_BIN;
    else process.env.AGENTPLANE_GH_BIN = previousGhBin;
    if (previousGhArgs === undefined) delete process.env.AGENTPLANE_GH_ARGS;
    else process.env.AGENTPLANE_GH_ARGS = previousGhArgs;
  }
}

export async function exerciseConflictExchange(opts: {
  root: string;
  worktree: string;
  taskId: string;
  headSha: string;
  baseSha: string;
  interrupt?: boolean;
  driftAfterInterruption?: boolean;
  interruptBeforeCheckpoint?: boolean;
  interruptAfterVerification?: boolean;
  interruptBeforeVerificationArtifacts?: boolean;
  verificationDrift?: ConflictVerificationDrift;
}): Promise<void> {
  const { root, worktree, taskId, headSha, baseSha } = opts;
  const issuedIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "advance",
      taskId,
      "--remote",
      "--agent-json",
      "--root",
      root,
    ]);
    expect(code, issuedIo.stderr).toBe(0);
    const issued = JSON.parse(issuedIo.stdout) as {
      task_id: string;
      transition_id: string;
      state_fingerprint: string;
      action: { kind: string };
      exchange?: {
        directory: string;
        work_order_ref: string;
        result_path: string;
        resume_argv: string[];
      };
    };
    expect(issued.action.kind, issuedIo.stdout).toBe("agent_episode");
    if (!issued.exchange) throw new Error("Missing issued conflict exchange.");
    const order = JSON.parse(
      await readFile(
        path.resolve(issued.exchange.directory, issued.exchange.work_order_ref),
        "utf8",
      ),
    ) as AgentWorkOrderV2;
    expect(
      resolveConflictReworkSemanticInput({
        task_id: order.task.id,
        checkout: order.state_fingerprint.worktree,
        head: order.state_fingerprint.git_head,
        writable_roots: order.authority.writable_roots,
        required_inputs: order.required_inputs,
      }),
    ).toMatchObject({
      task_id: taskId,
      provider: { head_sha: headSha, base_sha: baseSha },
    });
    await writeFile(path.join(worktree, "docs/conflict.md"), "resolved task and main\n");
    await writeFile(
      issued.exchange.result_path,
      JSON.stringify({
        schema_version: 1,
        kind: "agent_action_result",
        task_id: issued.task_id,
        transition_id: issued.transition_id,
        state_fingerprint: issued.state_fingerprint,
        role: order.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: order.work_order_id,
          status: "completed",
          summary: "Resolve the scoped task and base conflict.",
          findings: [],
          uncertainty: [],
        },
      }),
    );
    const resumeIo = captureStdIO();
    const previousCwd = process.cwd();
    const applyImplementation = implementationAuthority.applyExternalImplementationResult;
    const applyResult = resultApplication.applyAcceptedExternalAgentResult;
    const verify = taskVerification.recordDirectTaskVerification;
    const sync = prSync.ensurePrArtifactsSynced;
    const interruption = opts.interruptBeforeVerificationArtifacts
      ? vi.spyOn(prSync, "ensurePrArtifactsSynced").mockImplementation(async (args) => {
          const value = JSON.parse(
            await readFile(path.join(issued.exchange!.directory, "exchange.json"), "utf8"),
          ) as ExternalAgentExchange;
          if (value.verification_checkpoint?.stage === "prepared")
            throw new Error("interrupted after implementation evidence");
          return await sync(args);
        })
      : opts.interruptAfterVerification
        ? vi
            .spyOn(taskVerification, "recordDirectTaskVerification")
            .mockImplementationOnce(async (args) => {
              await verify(args);
              throw new Error("interrupted after implementation evidence");
            })
        : opts.interruptBeforeCheckpoint
          ? vi
              .spyOn(implementationAuthority, "applyExternalImplementationResult")
              .mockImplementationOnce(async (args) => {
                await applyImplementation(args);
                throw new Error("interrupted after implementation evidence");
              })
          : opts.interrupt
            ? vi
                .spyOn(resultApplication, "applyAcceptedExternalAgentResult")
                .mockImplementationOnce(async (args) => {
                  await applyResult(args);
                  throw new Error("interrupted after implementation evidence");
                })
            : null;
    try {
      process.chdir(worktree);
      const resumed = await runCli(issued.exchange.resume_argv.slice(1));
      if (interruption) {
        interruption.mockRestore();
        expect(resumed).not.toBe(0);
        expect(resumeIo.stderr).toContain("interrupted after implementation evidence");
        const appliedHead = await execFileAsync("git", ["rev-parse", "HEAD"], {
          cwd: worktree,
        });
        if (opts.verificationDrift) {
          const mode = opts.verificationDrift;
          switch (mode) {
            case "workspace": {
              await writeFile(
                path.join(worktree, "docs/conflict.md"),
                "foreign subsequent change\n",
              );
              break;
            }
            case "policy": {
              const file = path.join(worktree, "AGENTS.md");
              await writeFile(file, (await readFile(file, "utf8")) + "\nForeign policy change.\n");
              break;
            }
            case "task": {
              const command = await loadCommandContext({ cwd: worktree, rootOverride: null });
              const task = await command.taskBackend.getTask(taskId);
              if (!task) throw new Error("Missing Task for drift fixture.");
              await command.taskBackend.writeTask({ ...task, title: "Foreign Task change" });
              break;
            }
            case "checkpoint": {
              const file = path.join(issued.exchange.directory, "exchange.json");
              const value = JSON.parse(await readFile(file, "utf8")) as ExternalAgentExchange;
              if (!value.verification_checkpoint) throw new Error("Missing checkpoint.");
              value.verification_checkpoint.task.title = "Forged prepared Task";
              await writeFile(file, JSON.stringify(value));
              break;
            }
            case "result": {
              const value = JSON.parse(
                await readFile(issued.exchange.result_path, "utf8"),
              ) as ExternalAgentResultEnvelope;
              value.result.summary = "Foreign semantic result";
              await writeFile(issued.exchange.result_path, JSON.stringify(value));
              break;
            }
          }
          for (let attempt = 0; attempt < 2; attempt++) {
            expect(await runCli(issued.exchange.resume_argv.slice(1))).not.toBe(0);
            const rejected = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
            expect(rejected.stdout).toBe(appliedHead.stdout);
          }
          expect(resumeIo.stderr).toContain(
            mode === "result"
              ? "A different result is already recorded"
              : mode === "checkpoint"
                ? "checkpoint identity changed"
                : mode === "workspace" || mode === "policy"
                  ? "foreign workspace changes"
                  : "checkpoint postcondition changed",
          );
          return;
        }
        if (opts.driftAfterInterruption) {
          await writeFile(path.join(worktree, "docs/conflict.md"), "foreign subsequent change\n");
          expect(await runCli(issued.exchange.resume_argv.slice(1))).not.toBe(0);
          expect(resumeIo.stderr).toContain(
            opts.interruptBeforeCheckpoint
              ? "Conflict evidence postcondition changed"
              : "Accepted conflict result postcondition changed",
          );
          expect(await readFile(path.join(worktree, "docs/conflict.md"), "utf8")).toBe(
            "foreign subsequent change\n",
          );
          const rejectedHead = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
          expect(rejectedHead.stdout).toBe(appliedHead.stdout);
          return;
        }
        const verificationReplay = vi.spyOn(taskVerification, "recordDirectTaskVerification");
        const mergeReplay = vi.spyOn(conflictApplication, "applyConflictResolution");
        try {
          expect(await runCli(issued.exchange.resume_argv.slice(1)), resumeIo.stderr).toBe(0);
          expect(verificationReplay).not.toHaveBeenCalled();
          expect(mergeReplay).not.toHaveBeenCalled();
        } finally {
          verificationReplay.mockRestore();
          mergeReplay.mockRestore();
        }
        const recoveredHead = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
        if (opts.interruptAfterVerification || opts.interruptBeforeVerificationArtifacts) {
          const parent = await execFileAsync("git", ["show", "-s", "--format=%P", "HEAD"], {
            cwd: worktree,
          });
          expect(parent.stdout).toBe(appliedHead.stdout);
        } else {
          expect(recoveredHead.stdout).toBe(appliedHead.stdout);
        }
      } else {
        expect(resumed, resumeIo.stderr).toBe(0);
      }
      const beforeReplay = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: worktree,
      });
      expect(await runCli(issued.exchange.resume_argv.slice(1)), resumeIo.stderr).toBe(0);
      const afterReplay = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: worktree,
      });
      expect(afterReplay.stdout).toBe(beforeReplay.stdout);
    } finally {
      interruption?.mockRestore();
      process.chdir(previousCwd);
      resumeIo.restore();
    }
    expect(await readFile(path.join(worktree, "docs/conflict.md"), "utf8")).toBe(
      "resolved task and main\n",
    );
    const merged = await execFileAsync("git", ["merge-base", "--is-ancestor", baseSha, "HEAD"], {
      cwd: worktree,
    });
    expect(merged.stderr).toBe("");
  } finally {
    issuedIo.restore();
  }
}
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

export type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
};

export async function writePlanningResult(packet: AgentPacket, summary: string): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const resultPath = path.join(packet.exchange.directory, packet.exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: packet.task_id,
        transition_id: packet.transition_id,
        state_fingerprint: packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary,
          findings: [],
          uncertainty: [],
          ...(workOrder.role === "PLANNER"
            ? { task_plan_proposal: recoveryPlanningProposal(workOrder, summary) }
            : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}
import type { TaskPlanProposal } from "@agentplaneorg/core/tasks";

export function recoveryPlanningProposal(
  workOrder: AgentWorkOrderV2,
  summary: string,
): TaskPlanProposal {
  const baseline = workOrder.planning_context?.repository_snapshot;
  if (!baseline) throw new Error("Recovery fixture requires the issued planning snapshot.");
  const criterion = {
    id: "exact-recovery",
    description: summary,
    required: true,
    check_ids: ["task-check"],
  };
  const validation = {
    schema_version: 1 as const,
    criteria: [criterion],
    checks: [
      {
        id: "task-check",
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        command: "bun run test:critical",
      },
    ],
    evidence_fingerprint: baseline.digest,
  };
  return {
    schema_version: 1,
    task_id: workOrder.task.id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "exercise-recovery",
          objective: summary,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["recovery-result"],
          scope_roots: ["."],
          acceptance_criteria: [criterion],
          validation,
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 65_536,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
}
