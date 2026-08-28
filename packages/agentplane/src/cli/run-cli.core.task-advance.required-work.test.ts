import { execFile } from "node:child_process";
import { cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { taskCentricAggregateFromExtensions, taskCentricDigest } from "@agentplaneorg/core/tasks";
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
import * as projection from "../commands/task/task-centric-external-result.js";
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
async function packet(root: string, taskId: string, replacement = false) {
  const r = await invoke(root, [
    "task",
    "advance",
    taskId,
    ...(replacement ? ["--replacement"] : []),
    "--agent-json",
  ]);
  expect(r.code, r.stderr).toBe(0);
  return JSON.parse(r.stdout) as Packet;
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
  const r = await invoke(root, p.exchange.resume_argv.slice(1));
  expect(r.code, r.stderr).toBe(0);
  return JSON.parse(r.stdout) as Packet;
}
async function fixture() {
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
  await ensureRuntimeGitignore({ gitRoot: root });
  await git("git", ["add", ".agentplane", "package.json", ".gitignore"], { cwd: root });
  await git("git", ["commit", "-m", "test: initialize interrupted required work"], { cwd: root });
  const created = await invoke(root, [
    "task",
    "new",
    "--title",
    "Resume required work",
    "--description",
    "Recover the original WorkItem output before closure.",
    "--owner",
    "CODER",
    "--tag",
    "code",
    "--verify",
    "bun run test:critical",
  ]);
  expect(created.code, created.stderr).toBe(0);
  const taskId = created.stdout.trim();
  const planning = await packet(root, taskId);
  await report(planning, "Recover the exact required implementation.", {
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
        rationale: ["The fixture authorizes local implementation."],
      },
    },
    task_plan_proposal: recoveryPlanningProposal(
      await order(planning),
      "Recover the approved source and original output.",
    ),
  });
  const approval = await resume(root, planning);
  expect(approval.action.kind).toBe("approval_required");
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
  const implementation = await packet(root, taskId);
  const wo = await order(implementation);
  const checkout = wo.state_fingerprint.worktree;
  const metaPath = path.join(checkout, ".agentplane/tasks", taskId, "pr/meta.json");
  const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
  await writeFile(metaPath, JSON.stringify({ ...meta, status: "OPEN", pr_number: 123 }));
  await writeFile(path.join(checkout, "feature.ts"), "export const feature = true;\n");
  const original = await report(implementation, "Original immutable implementation claim.", {
    findings: ["Original recovery evidence."],
    uncertainty: ["Original limitation."],
  });
  return { root, taskId, implementation, checkout, original };
}

describe(
  "required WorkItem continuation after persisted implementation",
  { timeout: 180_000 },
  () => {
    it("recovers verified source and original output without fake rework, then reaches fresh review and closure", async () => {
      const f = await fixture();
      const interrupted = vi
        .spyOn(projection, "recordTaskCentricExternalResult")
        .mockRejectedValueOnce(new Error("injected interruption before WorkItem completion"));
      try {
        const r = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
        expect(r.code).not.toBe(0);
        expect(r.stderr).toContain("injected interruption before WorkItem completion");
        expect(interrupted).toHaveBeenCalledOnce();
      } finally {
        interrupted.mockRestore();
      }
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const before = await ctx.taskBackend.getTask(f.taskId);
      expect(before?.verification?.state).toBe("ok");
      expect(
        taskCentricAggregateFromExtensions(before?.extensions)?.work_items["exercise-recovery"]
          ?.state,
      ).toBe("READY");
      const source = recordedTaskImplementationCommitSha(before!);
      const sourceBytes = await readFile(path.join(f.checkout, "feature.ts"), "utf8");
      const originalBytes = await readFile(f.implementation.exchange.result_path, "utf8");
      // The original intent became stale after its persisted verification effect.
      const retired = await invoke(f.checkout, ["task", "advance", f.taskId, "--agent-json"]);
      expect(retired.code).not.toBe(0);
      const fresh = await packet(f.checkout, f.taskId, true);
      const freshOrder = await order(fresh);
      expect(freshOrder.role).toBe("EXECUTOR");
      expect(freshOrder.task.work_item_id).toBe("exercise-recovery");
      expect(freshOrder.authority.sandbox).toBe("workspace-write");
      await report(fresh, "Do not replace the original implementation claim.");
      await resume(f.checkout, fresh);
      const completed = await ctx.taskBackend.getTask(f.taskId);
      const item = taskCentricAggregateFromExtensions(completed?.extensions)?.work_items[
        "exercise-recovery"
      ];
      expect(item?.state).toBe("COMPLETED");
      expect(recordedTaskImplementationCommitSha(completed!)).toBe(source);
      expect(await readFile(path.join(f.checkout, "feature.ts"), "utf8")).toBe(sourceBytes);
      expect(await readFile(f.implementation.exchange.result_path, "utf8")).toBe(originalBytes);
      expect(item?.output_manifests.length).toBeGreaterThan(0);
      const aggregate = taskCentricAggregateFromExtensions(completed?.extensions)!;
      expect(item!.output_manifests[0]!.digest).toBe(
        taskCentricDigest({
          id: "recovery-result",
          result: {
            schema_version: 1,
            kind: "execute",
            task_id: f.taskId,
            plan_revision: aggregate.current_plan!.revision,
            plan_digest: aggregate.current_plan!.digest,
            work_item_id: "exercise-recovery",
            context_digest:
              freshOrder.planning_context?.digest ?? freshOrder.state_fingerprint.digest,
            status: f.original.result.status,
            summary: f.original.result.summary,
            claims: f.original.result.findings,
            questions: f.original.result.uncertainty,
            artifacts: ["recovery-result"],
          },
        }),
      );
      const review = await packet(f.checkout, f.taskId);
      const reviewOrder = await order(review);
      expect(reviewOrder.role).toBe("EVALUATOR");
      const repeated = await packet(f.checkout, f.taskId);
      expect(repeated.exchange.directory).toBe(review.exchange.directory);
      const stable = await ctx.taskBackend.getTask(f.taskId);
      expect(
        taskCentricAggregateFromExtensions(stable?.extensions)?.work_items["exercise-recovery"],
      ).toEqual(item);
      await report(review, "The exact source and output recovery meets the fixture contract.", {
        review: {
          verdict: "pass",
          missing_tests: [],
          hidden_assumptions: [],
          residual_risks: [],
          recovery_context: "The original WorkItem output is recovered; closure remains gated.",
        },
      });
      const next = await resume(f.checkout, review);
      expect(next.action.kind).toBe("framework_transition");
      const route = await invoke(f.checkout, ["task", "next-action", f.taskId, "--json"]);
      expect(route.code, route.stderr).toBe(0);
      const parsedRoute = JSON.parse(route.stdout) as { next_action: { code: string } };
      expect(parsedRoute.next_action.code).toBe("refresh_remote_route");
      const closed = await ctx.taskBackend.getTask(f.taskId);
      expect(closed?.status).toBe("DONE");
      expect(
        taskCentricAggregateFromExtensions(closed?.extensions)?.work_items["exercise-recovery"],
      ).toEqual(item);
      const meta = JSON.parse(
        await readFile(
          path.join(f.checkout, ".agentplane/tasks", f.taskId, "pr/meta.json"),
          "utf8",
        ),
      ) as { pre_merge_closure?: unknown };
      expect(meta.pre_merge_closure).toMatchObject({
        state: "closed_before_merge",
        pr_number: 123,
      });
    });
  },
);
