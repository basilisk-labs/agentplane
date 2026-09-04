import { execFile } from "node:child_process";
import { cp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { ensureRuntimeGitignore } from "../runtime/shared/runtime-gitignore.js";
import { recordedTaskImplementationCommitSha } from "../commands/shared/quality-review-target.js";
import * as refinement from "../commands/task/external-agent-plan-refinement.js";
import * as verification from "../commands/task/direct-task-verification.js";
import { resolveRecordedImplementationRecovery } from "../commands/task/external-agent-implementation-recovery.js";
import { recoveryPlanningProposal } from "./task-advance-effect-recovery.testkit.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();
const git = promisify(execFile);

type Packet = {
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string };
  exchange: { directory: string; result_path: string; resume_argv: string[] };
};

async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}
async function packet(root: string, taskId: string) {
  const result = await invoke(root, ["task", "advance", taskId, "--agent-json"]);
  expect(result.code, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as Packet;
}
async function order(p: Packet): Promise<AgentWorkOrderV2> {
  expect(p.exchange, JSON.stringify(p)).toBeDefined();
  return JSON.parse(
    await readFile(path.join(p.exchange.directory, "work-order.json"), "utf8"),
  ) as AgentWorkOrderV2;
}
async function report(p: Packet, summary: string, extra: Record<string, unknown> = {}) {
  const wo = await order(p);
  const result = {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: wo.task.id,
    transition_id: p.transition_id,
    state_fingerprint: p.state_fingerprint,
    role: wo.role,
    result: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: wo.work_order_id,
      status: "completed",
      summary,
      findings: [summary],
      uncertainty: [],
      ...extra,
    },
  };
  await writeFile(p.exchange.result_path, JSON.stringify(result));
  return result;
}
async function resume(root: string, p: Packet) {
  const result = await invoke(root, p.exchange.resume_argv.slice(1));
  expect(result.code, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as Packet;
}
async function commitFixture(root: string, message: string) {
  await git("git", ["add", ".agentplane", "package.json", ".gitignore"], { cwd: root });
  await git("git", ["commit", "-m", message], { cwd: root });
}

async function implementationFixture(initialized = true) {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  expect(await runCliSilent(["branch", "base", "set", "main", "--root", root])).toBe(0);
  await cp(
    path.join(process.cwd(), "packages/agentplane/assets/policy"),
    path.join(root, ".agentplane/policy"),
    { recursive: true },
  );
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/bin/\n.agentplane/cache.sqlite*\nagentplane-recipes\nnode_modules\npackages/\nwebsite/\n",
  );
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({
      scripts: { "test:critical": "node -e \"console.log('1 passed')\"" },
    }),
  );
  if (initialized) {
    await ensureRuntimeGitignore({ gitRoot: root });
    await commitFixture(root, "test: seed evidence rework repository");
  }
  const created = await invoke(root, [
    "task",
    "new",
    "--title",
    "Evidence-only task rework",
    "--description",
    "Keep the validated source and request fresh checks after Findings repair.",
    "--priority",
    "med",
    "--owner",
    "CODER",
    "--tag",
    "code",
    "--verify",
    "bun run test:critical",
  ]);
  expect(created.code, created.stderr).toBe(0);
  const taskId = created.stdout.trim();
  const creationCtx = await loadCommandContext({ cwd: root, rootOverride: root });
  const createdTask = await creationCtx.taskBackend.getTask(taskId);
  const creationBase = createdTask?.extensions?.task_execution_context as
    | Record<string, unknown>
    | undefined;
  expect(creationBase?.source).toBe(initialized ? "creation_checkout" : undefined);
  if (!initialized) await commitFixture(root, "test: seed evidence rework repository");
  const planning = await packet(root, taskId);
  const planOrder = await order(planning);
  await report(planning, "Recover only the exact approved implementation.", {
    task_intent: {
      task_kind: "code",
      mutation_scope: "code",
      risk_flags: [],
      tags: ["code"],
      execution: {
        schema_version: 2,
        preferred_mode: "branch_pr",
        scope_roots: ["."],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["The fixture authorizes local source changes."],
      },
    },
    task_plan_proposal: recoveryPlanningProposal(planOrder, "Recover the approved source."),
  });
  const approval = await resume(root, planning);
  expect(approval.action.kind).toBe("approval_required");
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
  if (!initialized) await commitFixture(root, "test: persist approved evidence rework plan");
  const implementation = await packet(root, taskId);
  const implementationOrder = await order(implementation);
  const checkout = implementationOrder.state_fingerprint.worktree;
  return { root, taskId, creationBase, implementation, implementationOrder, checkout };
}

async function completedFixture(initialized = true) {
  const fixture = await implementationFixture(initialized);
  const { root, taskId, creationBase, checkout } = fixture;
  let { implementation, implementationOrder } = fixture;
  const metaPath = path.join(checkout, ".agentplane/tasks", taskId, "pr/meta.json");
  const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
  await writeFile(metaPath, JSON.stringify({ ...meta, status: "OPEN", pr_number: 123 }));
  const stale = await invoke(checkout, ["task", "advance", taskId, "--agent-json"]);
  expect(stale.code).not.toBe(0);
  expect(stale.stderr).toContain("stale");
  const replacement = await invoke(checkout, [
    "task",
    "advance",
    taskId,
    "--replacement",
    "--agent-json",
  ]);
  expect(replacement.code, replacement.stderr).toBe(0);
  implementation = JSON.parse(replacement.stdout) as Packet;
  implementationOrder = await order(implementation);
  await writeFile(path.join(checkout, "feature.ts"), "export const feature = true;\n");
  await report(implementation, "Original implementation claim.");
  await resume(checkout, implementation);
  const review = await packet(checkout, taskId);
  const ctx = await loadCommandContext({ cwd: checkout, rootOverride: checkout });
  const completed = await ctx.taskBackend.getTask(taskId);
  if (!completed) throw new Error("missing completed fixture task");
  expect(completed.verification?.state, JSON.stringify(completed.verification)).toBe("ok");
  if (initialized) {
    const { source: _source, ...identity } = creationBase!;
    expect(completed.extensions?.task_execution_context).toEqual(identity);
  }
  const reviewOrder = await order(review);
  expect(reviewOrder.role).toBe("EVALUATOR");
  expect(
    taskCentricAggregateFromExtensions(completed.extensions)?.work_items["exercise-recovery"]
      ?.state,
  ).toBe("COMPLETED");
  await report(review, "Findings must document the implementation proof.", {
    review: {
      verdict: "rework",
      missing_tests: [],
      hidden_assumptions: [],
      residual_risks: ["Findings is empty."],
      recovery_context: "Populate Findings without changing the verified source.",
    },
  });
  await resume(checkout, review);
  // The operator supplies task documentation before a fresh semantic episode.
  expect(
    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Findings",
      "--updated-by",
      "ORCHESTRATOR",
      "--text",
      "The implementation is recorded. Fresh checks and evaluation are required.",
      "--root",
      checkout,
    ]),
  ).toBe(0);
  // Retire the now-stale issued rework, then request its exact replacement.
  const retired = await invoke(checkout, ["task", "advance", taskId, "--agent-json"]);
  expect(retired.code).not.toBe(0);
  const replaced = await invoke(checkout, [
    "task",
    "advance",
    taskId,
    "--replacement",
    "--agent-json",
  ]);
  expect(replaced.code, replaced.stderr).toBe(0);
  const rework = JSON.parse(replaced.stdout) as Packet;
  const reworkOrder = await order(rework);
  expect(reworkOrder.task.work_item_id ?? null).toBeNull();
  const current = await ctx.taskBackend.getTask(taskId);
  if (!current) throw new Error("missing task-level rework fixture");
  const currentAggregate = taskCentricAggregateFromExtensions(current.extensions);
  expect(current).toMatchObject({ status: "DOING", verification: { state: "ok" } });
  expect(currentAggregate).toMatchObject({
    revision: current.revision,
    lifecycle: "ACTIVE",
  });
  return {
    root,
    checkout,
    taskId,
    ctx,
    implementation,
    implementationOrder,
    completed,
    rework,
    reworkOrder,
    current,
  };
}

describe("task-level evidence-only rework", { timeout: 180_000 }, () => {
  it.each(
    [true, false].flatMap((initialized) =>
      ["normal return", "interrupted proof refresh", "interrupted verification"].map(
        (boundary) => ({
          initialized,
          boundary,
        }),
      ),
    ),
  )(
    "rechecks unchanged source after $boundary (initialized=$initialized) and preserves current claims",
    async ({ boundary, initialized }) => {
      const f = await completedFixture(initialized);
      const originalBytes = await readFile(
        path.join(f.implementation.exchange.directory, "exchange.json"),
        "utf8",
      );
      const itemsBefore = taskCentricAggregateFromExtensions(f.current.extensions)?.work_items;
      const source = recordedTaskImplementationCommitSha(f.current);
      const proofPath = path.join(
        f.checkout,
        ".agentplane/tasks",
        f.taskId,
        "supervision/implementation-evidence.json",
      );
      const proofBytes = await readFile(proofPath, "utf8");
      expect(source).not.toBe(f.reworkOrder.state_fingerprint.git_head);
      const currentReport = await report(f.rework, "Current Findings repair claim.");
      if (boundary !== "normal return") {
        const verify = verification.recordDirectTaskVerification;
        const interrupted = vi
          .spyOn(verification, "recordDirectTaskVerification")
          .mockImplementationOnce(async (options) => {
            if (boundary === "interrupted verification") await verify(options);
            throw new Error("injected interruption after proof refresh");
          });
        try {
          const result = await invoke(f.checkout, f.rework.exchange.resume_argv.slice(1));
          expect(result.code).not.toBe(0);
          expect(result.stderr).toContain("injected interruption after proof refresh");
        } finally {
          interrupted.mockRestore();
        }
        const interruptedTask = await f.ctx.taskBackend.getTask(f.taskId);
        expect(interruptedTask?.status).not.toBe("DONE");
        expect(
          await readFile(path.join(f.implementation.exchange.directory, "exchange.json"), "utf8"),
        ).toBe(originalBytes);
        if (boundary === "interrupted verification") {
          const stale = await invoke(f.checkout, f.rework.exchange.resume_argv.slice(1));
          expect(stale.code).not.toBe(0);
          expect(stale.stderr).toContain("stale against current task authority");
          const retired = await invoke(f.checkout, ["task", "advance", f.taskId, "--agent-json"]);
          expect(retired.stderr).toContain("retired the stale result");
          const replacement = await invoke(f.checkout, [
            "task",
            "advance",
            f.taskId,
            "--replacement",
            "--agent-json",
          ]);
          expect(replacement.code, replacement.stderr).toBe(0);
          const evaluator = JSON.parse(replacement.stdout) as Packet;
          const evaluatorOrder = await order(evaluator);
          expect(evaluatorOrder.role).toBe("EVALUATOR");
          expect(evaluator.exchange.directory).not.toBe(f.rework.exchange.directory);
          expect(await readFile(proofPath, "utf8")).toBe(proofBytes);
          const recoveredTask = await f.ctx.taskBackend.getTask(f.taskId);
          expect(recoveredTask?.verification?.state).toBe("ok");
          expect(recoveredTask?.status).toBe("DOING");
          expect(taskCentricAggregateFromExtensions(recoveredTask?.extensions)).toMatchObject({
            revision: recoveredTask?.revision,
            lifecycle: "ACTIVE",
          });
          expect(taskCentricAggregateFromExtensions(recoveredTask?.extensions)?.work_items).toEqual(
            itemsBefore,
          );
          const oldResult = await invoke(f.checkout, f.rework.exchange.resume_argv.slice(1));
          expect(oldResult.stderr).toContain("exchange was retired after state drift");
          return;
        }
      }
      const checks = vi.spyOn(verification, "recordDirectTaskVerification");
      let next: Packet;
      try {
        await resume(f.checkout, f.rework);
        next = await packet(f.checkout, f.taskId);
        expect(checks).toHaveBeenCalledOnce();
      } finally {
        checks.mockRestore();
      }
      const nextOrder = await order(next);
      expect(nextOrder.role).toBe("EVALUATOR");
      const after = await f.ctx.taskBackend.getTask(f.taskId);
      expect(after?.verification?.state).toBe("ok");
      expect(after?.status).toBe("DOING");
      expect(taskCentricAggregateFromExtensions(after?.extensions)).toMatchObject({
        revision: after?.revision,
        lifecycle: "ACTIVE",
      });
      expect(recordedTaskImplementationCommitSha(after!)).toBe(source);
      expect(await readFile(proofPath, "utf8")).toBe(proofBytes);
      expect(taskCentricAggregateFromExtensions(after?.extensions)?.work_items).toEqual(
        itemsBefore,
      );
      expect(
        await readFile(path.join(f.implementation.exchange.directory, "exchange.json"), "utf8"),
      ).toBe(originalBytes);
      const accepted = JSON.parse(
        await readFile(path.join(f.rework.exchange.directory, "exchange.json"), "utf8"),
      ) as { result: { result: unknown } };
      expect(accepted.result.result).toEqual(currentReport.result);
      const head = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      await resume(f.checkout, f.rework);
      const replayHead = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      expect(replayHead.stdout).toBe(head.stdout);
      expect(await readFile(path.join(f.checkout, "feature.ts"), "utf8")).toBe(
        "export const feature = true;\n",
      );
    },
  );

  it("rejects changed authority, plan, source, proof and incomplete WorkItems", async () => {
    const f = await completedFixture();
    const options = {
      command: f.ctx,
      task: f.current,
      work_order: f.reworkOrder,
      head: f.reworkOrder.state_fingerprint.git_head,
      recorded_commit: recordedTaskImplementationCommitSha(f.current),
      purpose: "implementation_rework" as const,
    };
    expect(await resolveRecordedImplementationRecovery(options)).toMatchObject({
      commit: options.recorded_commit,
      semantic: null,
    });
    expect(
      await resolveRecordedImplementationRecovery({ ...options, purpose: "implementation" }),
    ).toBeNull();
    const narrowed = structuredClone(f.reworkOrder);
    narrowed.authority.writable_roots = [path.join(f.checkout, "other")];
    expect(
      await resolveRecordedImplementationRecovery({ ...options, work_order: narrowed }),
    ).toBeNull();
    for (const mutation of ["plan", "approval", "incomplete"] as const) {
      const task = structuredClone(f.current);
      const aggregate = taskCentricAggregateFromExtensions(task.extensions)!;
      if (mutation === "plan") Reflect.set(aggregate.current_plan!, "revision", 99);
      if (mutation === "approval")
        Reflect.set(aggregate.current_plan!.approval, "state", "pending");
      if (mutation === "incomplete")
        Reflect.set(aggregate.work_items["exercise-recovery"]!, "state", "READY");
      expect(
        await resolveRecordedImplementationRecovery({ ...options, task }),
        mutation,
      ).toBeNull();
    }
    const readmePath = path.join(f.checkout, ".agentplane/tasks", f.taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    const evidencePath = path.join(
      f.checkout,
      ".agentplane/tasks",
      f.taskId,
      "supervision/implementation-evidence.json",
    );
    const exchangePath = path.join(f.implementation.exchange.directory, "exchange.json");
    for (const file of [evidencePath, exchangePath]) {
      const original = await readFile(file, "utf8");
      const corrupt =
        file === evidencePath
          ? "{}"
          : JSON.stringify({
              ...JSON.parse(original),
              result_digest: "sha256:" + "0".repeat(64),
            });
      await writeFile(file, corrupt);
      try {
        expect(await resolveRecordedImplementationRecovery(options)).toBeNull();
      } finally {
        await writeFile(file, original);
      }
    }
    // Changes made before the episode are still checked against the recorded contract.
    await runCliSilent([
      "task",
      "doc",
      "set",
      f.taskId,
      "--section",
      "Verify Steps",
      "--text",
      "Run weaker checks.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      f.checkout,
    ]);
    try {
      expect(await resolveRecordedImplementationRecovery(options)).toBeNull();
    } finally {
      await writeFile(readmePath, readme);
    }
    await writeFile(path.join(f.checkout, "feature.ts"), "export const feature = false;\n");
    await git("git", ["add", "feature.ts"], { cwd: f.checkout });
    await git("git", ["commit", "-m", "test: source drift after the recorded effect"], {
      cwd: f.checkout,
    });
    const head = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
    expect(
      await resolveRecordedImplementationRecovery({ ...options, head: head.stdout.trim() }),
    ).toBeNull();
  });
});

const planRefinement = (material: boolean) => ({
  description: "Split the remaining bounded implementation without replaying previous work.",
  scope_roots_added: [],
  outputs_added: material ? ["new-evidence"] : [],
  acceptance_changed: false,
  risk_changed: false,
  external_effects_added: [],
  dependencies_changed: false,
  architecture_constraints_changed: false,
  operations: ["split"],
});

const verificationClarification = {
  description: "Project the approved task-specific checks into Verify Steps.",
  scope_roots_added: [],
  outputs_added: [],
  acceptance_changed: false,
  risk_changed: false,
  external_effects_added: [],
  dependencies_changed: false,
  architecture_constraints_changed: false,
  operations: ["clarify"],
};

describe("pure external plan refinement", { timeout: 180_000 }, () => {
  it("projects verification clarification and issues a fresh evaluator packet", async () => {
    const f = await completedFixture();
    await report(f.rework, "Project the approved verification contract.", {
      plan_refinement: verificationClarification,
    });
    const next = await resume(f.checkout, f.rework);
    const current = await f.ctx.taskBackend.getTask(f.taskId);
    expect(current?.sections?.["Verify Steps"]).toContain("bun run test:critical");
    expect(current?.sections?.["Verify Steps"]).not.toContain("PLANNER fallback scaffold");
    expect(current?.quality_review?.state).toBe("rework");
    expect(Date.parse(current?.doc_updated_at ?? "")).toBeGreaterThan(
      Date.parse(current?.quality_review?.updated_at ?? ""),
    );
    const nextOrder = await order(next);
    expect(nextOrder.role, JSON.stringify(next)).toBe("EVALUATOR");
  });

  it.each([false, true])(
    "records refinement without implementation (material=%s)",
    async (material) => {
      const f = await implementationFixture();
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const before = await ctx.taskBackend.getTask(f.taskId);
      const head = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      await report(f.implementation, "Refine only; implementation remains pending.", {
        plan_refinement: planRefinement(material),
      });
      const next = await resume(f.checkout, f.implementation);
      const after = await ctx.taskBackend.getTask(f.taskId);
      const nextHead = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      expect(nextHead.stdout.trim()).toBe(head.stdout.trim());
      expect(recordedTaskImplementationCommitSha(after!)).toBe(
        recordedTaskImplementationCommitSha(before!),
      );
      const aggregate = taskCentricAggregateFromExtensions(after!.extensions)!;
      expect(aggregate.work_items).toEqual(
        taskCentricAggregateFromExtensions(before!.extensions)!.work_items,
      );
      const nextOrder = await order(next);
      expect(nextOrder.role).toBe(material ? "PLANNER" : "EXECUTOR");
      await resume(f.checkout, f.implementation);
      expect(await ctx.taskBackend.getTask(f.taskId)).toEqual(after);
    },
  );
  it.each([false, true])(
    "recovers a lost refinement response (source drift=%s)",
    async (sourceDrift) => {
      const f = await implementationFixture();
      await report(f.implementation, "Refinement before lost response.", {
        plan_refinement: planRefinement(true),
      });
      const original = refinement.applyExternalPlanRefinement;
      const spy = vi
        .spyOn(refinement, "applyExternalPlanRefinement")
        .mockImplementationOnce(async (opts) => {
          await original(opts);
          throw new Error("lost refinement response");
        });
      const failed = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
      expect(failed.code).not.toBe(0);
      expect(failed.stderr).toContain("lost refinement response");
      spy.mockRestore();
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const applied = await ctx.taskBackend.getTask(f.taskId);
      if (sourceDrift) {
        const driftPath = path.join(f.checkout, "unexpected-source.ts");
        await writeFile(driftPath, "export const unexpected = true;\n");
        const rejected = await invoke(f.checkout, ["task", "advance", f.taskId, "--agent-json"]);
        expect(rejected.code).not.toBe(0);
        expect(rejected.stderr).toContain("clean source baseline");
        expect(await ctx.taskBackend.getTask(f.taskId)).toEqual(applied);
        await rm(driftPath);
      }
      const next = await packet(f.checkout, f.taskId);
      const nextOrder = await order(next);
      expect(nextOrder.role).toBe("PLANNER");
      expect(await ctx.taskBackend.getTask(f.taskId)).toEqual(applied);
    },
  );
  it("retains ordinary completed-no-diff rejection", async () => {
    const f = await implementationFixture();
    await report(f.implementation, "No implementation and no refinement.");
    const result = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain("no supervisor-observed workspace change");
  });
  it("rejects changed native metadata before refinement admission", async () => {
    const f = await implementationFixture();
    await report(f.implementation, "Refinement against stale metadata.", {
      plan_refinement: planRefinement(true),
    });
    expect(
      await runCliSilent([
        "task",
        "update",
        f.taskId,
        "--description",
        "Changed task authority",
        "--root",
        f.checkout,
      ]),
    ).toBe(0);
    const result = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/stale|Protected task artifacts changed/u);
  });
  it("preserves already completed WorkItems when task-level refinement reopens planning", async () => {
    const f = await completedFixture();
    const before = taskCentricAggregateFromExtensions(f.current.extensions)!;
    await report(
      f.rework,
      "Refine remaining task-level acceptance without repeating completed work.",
      { plan_refinement: planRefinement(true) },
    );
    const next = await resume(f.checkout, f.rework);
    const after = taskCentricAggregateFromExtensions(
      (await f.ctx.taskBackend.getTask(f.taskId))!.extensions,
    )!;
    const nextOrder = await order(next);
    expect(nextOrder.role).toBe("PLANNER");
    expect(after.work_items).toEqual(before.work_items);
    expect(after.work_items["exercise-recovery"]?.state).toBe("COMPLETED");
  });
  it("reissues only the command-changed WorkItem after replacement-plan approval", async () => {
    const f = await completedFixture();
    const before = taskCentricAggregateFromExtensions(f.current.extensions)!;
    const headResult = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
    const headBefore = headResult.stdout.trim();
    await report(f.rework, "Replace only the unsupported qualification command.", {
      plan_refinement: planRefinement(true),
    });
    const planner = await resume(f.checkout, f.rework);
    const plannerOrder = await order(planner);
    expect(plannerOrder.role).toBe("PLANNER");
    const baseline = plannerOrder.planning_context?.repository_snapshot;
    if (!baseline) throw new Error("missing replacement planning baseline");
    const previousProposal = before.current_plan!.proposal;
    const replacement = {
      ...previousProposal,
      planning_baseline: baseline,
      work_items: {
        ...previousProposal.work_items,
        work_items: previousProposal.work_items.work_items.map((workItem) => ({
          ...workItem,
          validation: {
            ...workItem.validation,
            checks: workItem.validation.checks.map((check) => ({
              ...check,
              command: "agentplane task lint",
            })),
            evidence_fingerprint: baseline.digest,
          },
        })),
      },
      top_level_validation: {
        ...previousProposal.top_level_validation,
        checks: previousProposal.top_level_validation.checks.map((check) => ({
          ...check,
          command: "agentplane task lint",
        })),
        evidence_fingerprint: baseline.digest,
      },
    };
    await report(planner, "Use the repository-wide task lint command.", {
      task_plan_proposal: replacement,
    });
    const approval = await resume(f.checkout, planner);
    expect(approval.action.kind).toBe("approval_required");
    expect(
      await runCliSilent([
        "task",
        "plan",
        "approve",
        f.taskId,
        "--by",
        "USER",
        "--root",
        f.checkout,
      ]),
    ).toBe(0);
    const next = await packet(f.checkout, f.taskId);
    const nextOrder = await order(next);
    expect(nextOrder.role).toBe("EXECUTOR");
    expect(nextOrder.task.work_item_id).toBe("exercise-recovery");
    expect(nextOrder.state_fingerprint.git_head).toBe(headBefore);
    const status = await git("git", ["status", "--porcelain"], { cwd: f.checkout });
    const nonTaskChanges = status.stdout
      .split("\n")
      .filter((line) => line && !line.slice(3).startsWith(".agentplane/"));
    expect(nonTaskChanges).toEqual([]);
  });
  it("rejects agent-created Git history for a pure refinement", async () => {
    const f = await implementationFixture();
    await report(f.implementation, "Refinement after forbidden history change.", {
      plan_refinement: planRefinement(true),
    });
    await git("git", ["commit", "--allow-empty", "-m", "fixture unexpected history"], {
      cwd: f.checkout,
    });
    const result = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
    expect(result.code).not.toBe(0);
    expect(result.stderr).toContain("unchanged observed execution baseline");
  });
  it.each(["edit", "add", "delete"])(
    "rejects protected task artifact %s without admitting refinement",
    async (mutation) => {
      const f = await implementationFixture();
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const before = await ctx.taskBackend.getTask(f.taskId);
      await report(f.implementation, "Refinement with unauthorized metadata drift.", {
        plan_refinement: planRefinement(true),
      });
      const meta = path.join(f.checkout, ".agentplane/tasks", f.taskId, "pr/meta.json");
      if (mutation === "edit") await writeFile(meta, (await readFile(meta, "utf8")) + "\n");
      else if (mutation === "add")
        await writeFile(path.join(path.dirname(meta), "unexpected.json"), "{}\n");
      else await rm(meta);
      const result = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain("Protected task artifacts changed");
      expect(await ctx.taskBackend.getTask(f.taskId)).toEqual(before);
    },
  );
  it.each([1, 2])("rejects concurrent authority drift at task read %s", async (readNumber) => {
    const f = await implementationFixture();
    await report(f.implementation, "Refinement racing a task update.", {
      plan_refinement: planRefinement(true),
    });
    const original = refinement.applyExternalPlanRefinement;
    const spy = vi
      .spyOn(refinement, "applyExternalPlanRefinement")
      .mockImplementationOnce(async (opts) => {
        const backend = opts.command.taskBackend;
        const get = backend.getTask.bind(backend);
        let reads = 0;
        const readSpy = vi.spyOn(backend, "getTask").mockImplementation(async (id) => {
          let raw = await get(id);
          reads += 1;
          if (reads === readNumber && raw) {
            await backend.writeTask(
              { ...raw, description: "Concurrent operator authority update" },
              { expectedRevision: raw.revision },
            );
            raw = await get(id);
          }
          return raw;
        });
        try {
          return await original(opts);
        } finally {
          readSpy.mockRestore();
        }
      });
    try {
      const result = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
      expect(result.code).not.toBe(0);
      // The adapter read must enforce the issued revision even after the earlier snapshot passed.
      if (readNumber === 2) expect(result.stderr).toContain("revision");
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const raw = await ctx.taskBackend.getTask(f.taskId);
      const aggregate = taskCentricAggregateFromExtensions(raw!.extensions)!;
      expect(aggregate.lifecycle).toBe("ACTIVE");
      expect(aggregate.plan_amendments).toHaveLength(0);
    } finally {
      spy.mockRestore();
    }
  });
});
