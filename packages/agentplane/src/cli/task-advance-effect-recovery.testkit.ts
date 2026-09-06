import { type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { execFileAsync } from "@agentplaneorg/core/process";
import { captureStdIO, mkGitRepoRootWithBranch, writeConfig } from "@agentplane/testkit";
import { defaultConfig } from "./core-imports.js";
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

export type ConflictVerificationDrift =
  | "workspace"
  | "task"
  | "checkpoint"
  | "result"
  | "policy"
  | "base"
  | "provider"
  | "diffstat";

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

export function fakeGithubProviderSource(detail: Record<string, unknown>): string {
  return [
    "const args = process.argv.slice(2);",
    `const detail = ${JSON.stringify(detail)};`,
    'if (args[0] === "api" && args[1] === "repos/example/repo/branches/main/protection") {',
    "  console.log(JSON.stringify({ required_pull_request_reviews: {} }));",
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls?")) {',
    "  console.log(JSON.stringify([{ number: detail.number, state: detail.state, head: detail.head, base: { ref: detail.base.ref } }]));",
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && args[1] === "repos/example/repo/pulls/4626") {',
    "  console.log(JSON.stringify(detail));",
    "  process.exit(0);",
    "}",
    'if (args[0] === "pr" && args[1] === "checks") {',
    '  console.log("[]");',
    "  process.exit(0);",
    "}",
    'if (args[0] === "api" && args[1] === "graphql") {',
    "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } } } }));",
    "  process.exit(0);",
    "}",
    "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
    "process.exit(91);",
    "",
  ].join("\n");
}

export async function exerciseConflictExchange(opts: {
  root: string;
  worktree: string;
  taskId: string;
  headSha: string;
  baseSha: string;
  providerBaseSha?: string;
  materializeBaseContribution?: boolean;
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
      provider: { head_sha: headSha, base_sha: opts.providerBaseSha ?? baseSha },
      local: { base_head_sha: baseSha },
    });
    await writeFile(path.join(worktree, "docs/conflict.md"), "resolved task and main\n");
    if (opts.materializeBaseContribution) {
      await writeFile(
        path.join(worktree, "docs/base-only.md"),
        "preserve current base contribution\n",
      );
    }
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
            case "diffstat": {
              await writeFile(
                path.join(worktree, ".agentplane/tasks", taskId, "pr/diffstat.txt"),
                "foreign diffstat\n",
              );
              break;
            }
            case "base": {
              await writeFile(path.join(root, "docs/base-only.md"), "subsequent base change\n");
              await execFileAsync("git", ["add", "docs/base-only.md"], { cwd: root });
              await execFileAsync(
                "git",
                ["commit", "-m", "test: invalidate bound application base"],
                { cwd: root },
              );
              break;
            }
            case "provider": {
              const file = path.join(root, "fake-gh-provider-conflict.mjs");
              const source = await readFile(file, "utf8");
              await writeFile(file, source.replaceAll(opts.providerBaseSha ?? baseSha, headSha));
              break;
            }
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
                : mode === "base"
                  ? "checkpoint branch or base changed"
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
import { writeFile, readFile, cp, mkdir, realpath } from "node:fs/promises";
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
import { createFixtureTaskPlan } from "./task-continuity.testkit.js";

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
  return createFixtureTaskPlan(workOrder, {
    id: "exercise-recovery",
    objective: summary,
    expectedOutput: "recovery-result",
    validation,
  });
}

export async function captureRecoveryCli(args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli(args);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

export async function prepareNativeIntegrationRecovery() {
  const root = await realpath(await mkGitRepoRootWithBranch("main"));
  await cp(path.join(process.cwd(), ".agentplane/policy"), path.join(root, ".agentplane/policy"), {
    recursive: true,
  });
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  config.authority.mode = "all";
  await writeConfig(root, config);
  const run = async (...args: string[]) => {
    const result = await captureRecoveryCli([...args, "--root", root]);
    expect(result.code, result.stderr).toBe(0);
    return result;
  };
  await run("branch", "base", "set", "main");
  const created = await run(
    "task",
    "new",
    "--title",
    "Native integration recovery",
    "--description",
    "Qualify the operator recovery command.",
    "--priority",
    "med",
    "--owner",
    "CODER",
    "--tag",
    "code",
    "--verify",
    "bun run test:critical",
  );
  const taskId = created.stdout.trim();
  await run(
    "task",
    "doc",
    "set",
    taskId,
    "--section",
    "Verify Steps",
    "--text",
    "1. Run bun run test:critical. Expected: recovery preserves one exact outcome and one rework successor.",
    "--updated-by",
    "PLANNER",
  );
  const git = async (...args: string[]) => await execFileAsync("git", args, { cwd: root });
  await git("add", ".");
  await git("commit", "-m", "test: create native recovery task");
  const planning = await run("task", "advance", taskId, "--agent-json");
  const resultPath = await writePlanningResult(
    JSON.parse(planning.stdout) as AgentPacket,
    "Recover the exact interrupted integration before semantic rework.",
  );
  const envelope = JSON.parse(await readFile(resultPath, "utf8")) as ExternalAgentResultEnvelope;
  envelope.result.task_intent = {
    task_kind: "code",
    mutation_scope: "code",
    risk_flags: [],
    tags: ["code"],
    execution: {
      schema_version: 2,
      preferred_mode: "branch_pr",
      scope_roots: ["."],
      repository_effects: ["repository_write", "source_code", "tests"],
      external_effects: [],
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["Qualify native recovery in a real task worktree."],
    },
  };
  await writeFile(resultPath, JSON.stringify(envelope));
  await run("task", "advance", taskId, "--result", resultPath, "--agent-json");
  await run("task", "plan", "approve", taskId, "--by", "USER");
  await git("add", ".agentplane");
  await git("commit", "-m", "test: seed native recovery plan");
  const branch = `task/${taskId}/native-recovery`;
  const worktree = path.join(root, ".agentplane/worktrees", `${taskId}-native-recovery`);
  await mkdir(path.dirname(worktree), { recursive: true });
  await git("worktree", "add", "-b", branch, worktree);
  const started = await captureRecoveryCli([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: qualify native recovery from the dedicated task worktree.",
    "--root",
    worktree,
  ]);
  expect(started.code, started.stderr).toBe(0);
  const command = await loadCommandContext({ cwd: worktree, rootOverride: worktree });
  const task = await command.taskBackend.getTask(taskId);
  if (!task) throw new Error("Missing native recovery task");
  await command.taskBackend.writeTask({
    ...task,
    verification: {
      state: "needs_rework",
      updated_at: new Date().toISOString(),
      updated_by: "TESTER",
      note: "Integration review requires semantic implementation rework.",
    },
  });
  await execFileAsync("git", ["add", ".agentplane"], { cwd: worktree });
  await execFileAsync("git", ["commit", "-m", "test: seed native recovery rework"], {
    cwd: worktree,
  });
  await git("remote", "add", "origin", "https://github.com/example/repo.git");
  return { root, taskId, worktree, branch };
}
