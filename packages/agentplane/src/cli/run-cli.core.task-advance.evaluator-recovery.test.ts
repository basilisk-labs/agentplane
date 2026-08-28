import { execFile } from "node:child_process";
import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  writeConfig,
} from "@agentplane/testkit";

import { loadCommandContext } from "../commands/shared/task-backend.js";
import { readWorkOrder } from "../commands/evaluator/evaluator-work-order.js";
import { buildObservedGithubPrMeta, buildOpenedPrMeta } from "../commands/shared/pr-meta.js";
import { readRoute } from "./run-cli.core.task-advance.testkit.js";
import {
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../commands/shared/supervisor-execution-episode.js";
import * as evaluatorApplication from "../commands/task/external-agent-evaluator.js";
import * as guardedCommit from "../commands/guard/impl/commit.js";
import * as exchangeArtifacts from "../commands/task/external-agent-exchange.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { recoveryPlanningProposal } from "./task-advance-effect-recovery.testkit.js";

installRunCliIntegrationHarness();
const execFileAsync = promisify(execFile);
type Packet = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  authority: { role: string };
  action: { kind: string };
  exchange: { directory: string; work_order_ref: string; result_path: string };
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
async function packet(root: string, id: string): Promise<Packet> {
  const result = await invoke(root, ["task", "advance", id, "--agent-json"]);
  expect(result.code, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as Packet;
}
async function resultFor(p: Packet, summary: string): Promise<string> {
  const order = JSON.parse(
    await readFile(path.join(p.exchange.directory, p.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const result = {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: order.work_order_id,
    status: "completed",
    summary,
    findings: ["The exact frozen input was inspected."],
    uncertainty: [],
    ...(order.role === "PLANNER"
      ? { task_plan_proposal: recoveryPlanningProposal(order, summary) }
      : {}),
    ...(order.role === "EVALUATOR"
      ? {
          review: {
            verdict: "pass",
            missing_tests: [],
            hidden_assumptions: [],
            residual_risks: [],
          },
        }
      : {}),
  };
  await writeFile(
    p.exchange.result_path,
    JSON.stringify({
      schema_version: 1,
      kind: "agent_action_result",
      task_id: p.task_id,
      transition_id: p.transition_id,
      state_fingerprint: p.state_fingerprint,
      role: order.role,
      result,
    }),
    "utf8",
  );
  return p.exchange.result_path;
}
async function returnResult(root: string, p: Packet, file: string) {
  return await invoke(root, ["task", "advance", p.task_id, "--result", file, "--agent-json"]);
}
async function prepareEvaluator(branchPr = false) {
  let root = await mkGitRepoRootWithCommit();
  const baseRoot = root;
  await cp(path.join(process.cwd(), ".agentplane/policy"), path.join(root, ".agentplane/policy"), {
    recursive: true,
  });
  const config = defaultConfig();
  config.workflow_mode = branchPr ? "branch_pr" : "direct";
  await writeConfig(root, config);
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({
      scripts: {
        "test:critical": 'node -e "process.exit(0)"',
        "ci:local:full": "bun run test:critical",
      },
    }),
    "utf8",
  );
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed evaluator recovery"], { cwd: root });
  const created = await invoke(root, [
    "task",
    "new",
    "--title",
    "Recover stale evaluator",
    "--description",
    "Preserve stale review evidence and recover the next bounded episode.",
    "--owner",
    "CODER",
    "--tag",
    "code",
    "--verify",
    "bun run test:critical",
  ]);
  expect(created.code, created.stderr).toBe(0);
  const id = created.stdout.trim();
  const planning = await packet(root, id);
  expect(planning.authority.role).toBe("PLANNER");
  const planned = await returnResult(
    root,
    planning,
    await resultFor(planning, "Implement one scoped file and preserve evaluator recovery."),
  );
  expect(planned.code, planned.stderr).toBe(0);
  const approved = await invoke(root, ["task", "plan", "approve", id, "--by", "ORCHESTRATOR"]);
  expect(approved.code, approved.stderr).toBe(0);
  if (branchPr) {
    await execFileAsync("git", ["branch", "-M", "main"], { cwd: root });
    await invoke(root, ["branch", "base", "set", "main"]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed branch review"], { cwd: root });
    const branch = `task/${id}/review`;
    root = path.join(baseRoot, ".agentplane", "worktrees", `${id}-review`);
    await mkdir(path.dirname(root), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, root], { cwd: baseRoot });
    const at = new Date().toISOString();
    const head = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const meta = buildObservedGithubPrMeta({
      meta: buildOpenedPrMeta({ taskId: id, branch, at, previousMeta: null, base: "main" }),
      observed: {
        prNumber: 1,
        prUrl: "https://github.com/example/agentplane/pull/1",
        status: "OPEN",
        base: "main",
        headSha: head.stdout.trim(),
      },
      at,
    });
    const metaPath = path.join(root, ".agentplane", "tasks", id, "pr", "meta.json");
    await mkdir(path.dirname(metaPath), { recursive: true });
    await writeFile(metaPath, JSON.stringify(meta), "utf8");
    const route = await readRoute(root, id);
    const request = route.workflow_step.request;
    if (request?.type === "side_effect") {
      const grant = await invoke(root, [
        "task",
        "authority",
        "grant",
        id,
        "--operation",
        request.operationId,
        "--operation-digest",
        request.operationDigest,
        "--state-fingerprint",
        request.stateFingerprintDigest,
        "--state-scope-digest",
        request.stateScopeDigest,
        "--by",
        "USER",
      ]);
      expect(grant.code, grant.stderr).toBe(0);
    }
  }
  const implementation = await packet(root, id);
  expect(implementation.authority.role).toBe("EXECUTOR");
  await writeFile(path.join(root, "implemented.txt"), "implementation\n", "utf8");
  const implemented = await returnResult(
    root,
    implementation,
    await resultFor(implementation, "Implemented the scoped file."),
  );
  expect(implemented.code, implemented.stderr).toBe(0);
  const evaluator = JSON.parse(implemented.stdout) as Packet;
  expect(evaluator.authority.role).toBe("EVALUATOR");
  return { root, baseRoot, id, evaluator };
}

describe("stale evaluator recovery", () => {
  it.each([
    ["advance", "task", false],
    ["return", "task", false],
    ["advance", "head", false],
    ["return", "head", false],
    ["advance", "evidence", false],
    ["return", "evidence", false],
    ["advance", "workspace", false],
    ["return", "workspace", false],
    ["advance", "plan", false],
    ["return", "plan", false],
    ["advance", "policy", false],
    ["return", "policy", false],
    ["advance", "task", true],
  ] as const)(
    "rejects additional drift after an applied review through %s with %s mutation (branch_pr=%s)",
    async (mode, drift, branchPr) => {
      const { root, id, evaluator } = await prepareEvaluator(branchPr);
      const resultPath = await resultFor(evaluator, "Review before later task mutation.");
      const beforeResult = await readFile(resultPath, "utf8");
      const original = evaluatorApplication.applyExternalEvaluatorResult;
      const application = vi
        .spyOn(evaluatorApplication, "applyExternalEvaluatorResult")
        .mockImplementationOnce(async (opts) => {
          await original(opts);
          throw new Error("Interrupted after review application.");
        });
      try {
        const interrupted = await returnResult(root, evaluator, resultPath);
        expect(interrupted.stderr).toContain("Interrupted after review application.");
      } finally {
        application.mockRestore();
      }
      switch (drift) {
        case "task": {
          const changed = await invoke(root, [
            "task",
            "comment",
            id,
            "--author",
            "CODER",
            "--body",
            "A new observation after the applied review changes the task input.",
          ]);
          expect(changed.code, changed.stderr).toBe(0);

          break;
        }
        case "plan": {
          const changed = await invoke(root, [
            "task",
            "plan",
            "set",
            id,
            "--updated-by",
            "PLANNER",
            "--text",
            "A changed implementation plan requires a new evaluation.",
          ]);
          expect(changed.code, changed.stderr).toBe(0);

          break;
        }
        case "policy": {
          await writeFile(
            path.join(root, ".agentplane/policy/dod.code.md"),
            "# Revised code verification\n\nRequire independent replay evidence.\n",
            "utf8",
          );

          break;
        }
        case "evidence": {
          const exchange = JSON.parse(
            await readFile(path.join(evaluator.exchange.directory, "exchange.json"), "utf8"),
          ) as exchangeArtifacts.ExternalAgentExchange;
          const order = readWorkOrder(
            JSON.parse(await readFile(exchange.evaluator_work_order_ref!, "utf8")),
          );
          const diff = order.evidence.find((e) => e.kind === "actual_diff")!;
          await writeFile(path.join(root, diff.path), "changed evidence\n", "utf8");

          break;
        }
        default: {
          await writeFile(
            path.join(root, "implemented.txt"),
            "Changed after the review.\n",
            "utf8",
          );
          if (drift === "head") {
            await execFileAsync("git", ["add", "implemented.txt"], { cwd: root });
            await execFileAsync("git", ["commit", "-m", "test: later implementation"], {
              cwd: root,
            });
          }
        }
      }
      const recovery =
        mode === "return"
          ? await returnResult(root, evaluator, resultPath)
          : await invoke(root, ["task", "advance", id, "--agent-json"]);
      expect(recovery.code, recovery.stdout).not.toBe(0);
      expect(recovery.stderr).toMatch(/stale|changed|drift/);
      const context = await loadCommandContext({ cwd: root, rootOverride: root });
      const recoveredTask = await context.taskBackend.getTask(id);
      expect(recoveredTask?.status).not.toBe("DONE");
      expect(await readFile(resultPath, "utf8")).toBe(beforeResult);
      if (mode === "advance" && drift === "task") {
        const replacement = await invoke(root, [
          "task",
          "advance",
          id,
          "--replacement",
          "--agent-json",
        ]);
        expect(replacement.code, replacement.stderr).toBe(0);
        const fresh = JSON.parse(replacement.stdout) as Packet;
        expect(fresh.action.kind).toBe("agent_episode");
        expect(fresh.authority.role).toBe("EVALUATOR");
        const pendingTask = await context.taskBackend.getTask(id);
        expect(pendingTask?.status).not.toBe("DONE");
        expect(pendingTask?.quality_review).toEqual(recoveredTask?.quality_review);
        const repeated = await packet(root, id);
        expect(repeated.exchange.directory).toBe(fresh.exchange.directory);
        const accepted = await returnResult(
          root,
          fresh,
          await resultFor(fresh, "Fresh review after retirement."),
        );
        expect(accepted.code, accepted.stderr).toBe(0);
        const freshTask = await context.taskBackend.getTask(id);
        expect(freshTask?.quality_review?.state).toBe("pass");
        expect(freshTask?.quality_review?.evidence_refs).not.toEqual(
          recoveredTask?.quality_review?.evidence_refs,
        );
        const oldReplay = await returnResult(root, evaluator, resultPath);
        expect(oldReplay.code).not.toBe(0);
        expect(oldReplay.stderr).toContain("retired");
        expect(await readFile(resultPath, "utf8")).toBe(beforeResult);
      }
    },
  );

  it("recovers a worktree-applied review when continuation starts in the base checkout", async () => {
    const { root, baseRoot, id, evaluator } = await prepareEvaluator(true);
    const resultPath = await resultFor(evaluator, "Recover the authoritative worktree review.");
    const original = evaluatorApplication.applyExternalEvaluatorResult;
    const application = vi
      .spyOn(evaluatorApplication, "applyExternalEvaluatorResult")
      .mockImplementationOnce(async (opts) => {
        await original(opts);
        throw new Error("Interrupted after worktree review application.");
      });
    try {
      const interrupted = await returnResult(root, evaluator, resultPath);
      expect(interrupted.stderr).toContain("Interrupted after worktree review application.");
    } finally {
      application.mockRestore();
    }
    const context = await loadCommandContext({ cwd: root, rootOverride: root });
    const reviewedTask = await context.taskBackend.getTask(id);
    const review = reviewedTask?.quality_review;
    expect(review?.state).toBe("pass");
    const recovered = await invoke(baseRoot, ["task", "advance", id, "--agent-json"]);
    expect(recovered.code, recovered.stderr).toBe(0);
    const exchange = await exchangeArtifacts.readExternalAgentExchange(
      path.join(evaluator.exchange.directory, "exchange.json"),
    );
    expect(exchange?.status).toBe("consumed");
    const recoveredTask = await context.taskBackend.getTask(id);
    expect(recoveredTask?.quality_review).toEqual(review);
  });

  it("rejects changed work-order evidence without retiring the bound intent", async () => {
    const { root, id, evaluator } = await prepareEvaluator();
    await resultFor(evaluator, "The old review must remain unaccepted.");
    const changed = await invoke(root, [
      "task",
      "comment",
      id,
      "--author",
      "CODER",
      "--body",
      "Change before tampered evidence.",
    ]);
    expect(changed.code, changed.stderr).toBe(0);
    const orderPath = path.join(evaluator.exchange.directory, evaluator.exchange.work_order_ref);
    const order = JSON.parse(await readFile(orderPath, "utf8")) as AgentWorkOrderV2;
    order.task.objective = "This changed objective was not issued by the supervisor.";
    await writeFile(orderPath, JSON.stringify(order), "utf8");
    const exchangePath = path.join(evaluator.exchange.directory, "exchange.json");
    const before = await readFile(exchangePath, "utf8");
    const rejected = await invoke(root, ["task", "advance", id, "--agent-json"]);
    expect(rejected.code).not.toBe(0);
    expect(rejected.stderr).toContain("does not match the supervisor intent");
    expect(await readFile(exchangePath, "utf8")).toBe(before);
  });

  it("does not retire an evaluator exchange while another supervisor owns the lease", async () => {
    const { root, id, evaluator } = await prepareEvaluator();
    const resultPath = await resultFor(
      evaluator,
      "Preserve the pending review while another owner runs.",
    );
    const changed = await invoke(root, [
      "task",
      "comment",
      id,
      "--author",
      "CODER",
      "--body",
      "Change before competing recovery.",
    ]);
    expect(changed.code, changed.stderr).toBe(0);
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: id,
    });
    const exchangePath = path.join(evaluator.exchange.directory, "exchange.json");
    const before = await readFile(exchangePath, "utf8");
    const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
    expect(lease).not.toBeNull();
    try {
      const blocked = await invoke(root, ["task", "advance", id, "--agent-json"]);
      expect(blocked.code).not.toBe(0);
      expect(blocked.stderr).toContain("Another supervisor owns evaluator recovery");
      expect(await readFile(exchangePath, "utf8")).toBe(before);
      expect(await readFile(resultPath, "utf8")).toContain("Preserve the pending review");
    } finally {
      await lease?.release();
    }
    const recovery = await invoke(root, ["task", "advance", id, "--agent-json"]);
    expect(recovery.stderr).toContain("retired the stale result");
  });

  it("reconciles interruption after exchange retirement before journal retirement", async () => {
    const { root, id, evaluator } = await prepareEvaluator();
    const resultPath = await resultFor(evaluator, "Preserve this obsolete review.");
    const before = await readFile(resultPath, "utf8");
    const changed = await invoke(root, [
      "task",
      "comment",
      id,
      "--author",
      "CODER",
      "--body",
      "Change before interrupted retirement.",
    ]);
    expect(changed.code, changed.stderr).toBe(0);
    const original = exchangeArtifacts.writeExternalAgentExchange;
    const write = vi
      .spyOn(exchangeArtifacts, "writeExternalAgentExchange")
      .mockImplementationOnce(async (file, exchange) => {
        await original(file, exchange);
        throw new Error("Interrupted after the retired exchange was persisted.");
      });
    try {
      const interrupted = await invoke(root, ["task", "advance", id, "--agent-json"]);
      expect(interrupted.code).not.toBe(0);
      expect(interrupted.stderr).toContain("Interrupted after the retired exchange");
    } finally {
      write.mockRestore();
    }
    const reconciled = await invoke(root, ["task", "advance", id, "--agent-json"]);
    expect(reconciled.code).not.toBe(0);
    expect(reconciled.stderr).toContain("reconciled a retired external-agent exchange");
    const next = await invoke(root, ["task", "advance", id, "--replacement", "--agent-json"]);
    expect(next.code, next.stderr).toBe(0);
    expect((JSON.parse(next.stdout) as Packet).transition_id).not.toBe(evaluator.transition_id);
    expect(await readFile(resultPath, "utf8")).toBe(before);
  });

  it("replaces a stale issued review before any result exists", async () => {
    const { root, id, evaluator } = await prepareEvaluator();
    const orderPath = path.join(evaluator.exchange.directory, evaluator.exchange.work_order_ref);
    const before = await readFile(orderPath, "utf8");
    const changed = await invoke(root, [
      "task",
      "comment",
      id,
      "--author",
      "CODER",
      "--body",
      "The evaluator input changed before a result was returned.",
    ]);
    expect(changed.code, changed.stderr).toBe(0);
    const recovery = await invoke(root, ["task", "advance", id, "--agent-json"]);
    expect(recovery.code).not.toBe(0);
    expect(recovery.stderr).toContain("retired");
    await expect(access(evaluator.exchange.result_path)).rejects.toMatchObject({ code: "ENOENT" });
    expect(await readFile(orderPath, "utf8")).toBe(before);
    const next = await invoke(root, ["task", "advance", id, "--replacement", "--agent-json"]);
    expect(next.code, next.stderr).toBe(0);
    expect((JSON.parse(next.stdout) as Packet).transition_id).not.toBe(evaluator.transition_id);
  });

  it.each([false, true])(
    "recovers an applied review exactly once with beforeCommit=%s",
    async (beforeCommit) => {
      const { root, id, evaluator } = await prepareEvaluator();
      const resultPath = await resultFor(evaluator, "The fresh review is accepted exactly once.");
      const original = evaluatorApplication.applyExternalEvaluatorResult;
      const commit = beforeCommit
        ? vi
            .spyOn(guardedCommit, "cmdCommit")
            .mockRejectedValueOnce(
              new Error("Interrupted after the evaluator effect was persisted."),
            )
        : null;
      const application = vi
        .spyOn(evaluatorApplication, "applyExternalEvaluatorResult")
        .mockImplementationOnce(async (opts) => {
          await original(opts);
          throw new Error("Interrupted after the evaluator effect was persisted.");
        });
      try {
        const interrupted = await returnResult(root, evaluator, resultPath);
        expect(interrupted.code).not.toBe(0);
        expect(interrupted.stderr).toContain("Interrupted after the evaluator effect");
        const context = await loadCommandContext({ cwd: root, rootOverride: root });
        const reviewedTask = await context.taskBackend.getTask(id);
        const review = reviewedTask?.quality_review;
        expect(review?.state).toBe("pass");
        const recovered = await invoke(root, ["task", "advance", id, "--agent-json"]);
        expect(recovered.code, recovered.stderr).toBe(0);
        expect((JSON.parse(recovered.stdout) as Packet).action.kind).toBe("terminal");
        const recoveredTask = await context.taskBackend.getTask(id);
        expect(recoveredTask?.quality_review).toEqual(review);
        const exchange = JSON.parse(
          await readFile(path.join(evaluator.exchange.directory, "exchange.json"), "utf8"),
        ) as { status: string };
        expect(exchange.status).toBe("consumed");
        const repeated = await packet(root, id);
        expect(repeated.action.kind).toBe("terminal");
      } finally {
        application.mockRestore();
        commit?.mockRestore();
      }
    },
  );

  it.each(["issued", "result_received"] as const)(
    "retires an unapplied %s review and reaches a fresh episode without rewriting its result",
    async (stage) => {
      const { root, id, evaluator } = await prepareEvaluator();
      const resultPath = await resultFor(evaluator, "This obsolete verdict must never be applied.");
      const originalResult = await readFile(resultPath, "utf8");
      const orderPath = path.join(evaluator.exchange.directory, evaluator.exchange.work_order_ref);
      const originalOrder = await readFile(orderPath, "utf8");
      const exchangePath = path.join(evaluator.exchange.directory, "exchange.json");
      const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as {
        evaluator_work_order_ref: string;
      };
      const originalEvidence = await readFile(exchange.evaluator_work_order_ref, "utf8");
      const changed = await invoke(root, [
        "task",
        "comment",
        id,
        "--author",
        "CODER",
        "--body",
        "A concurrent operator observation changes the task input.",
      ]);
      expect(changed.code, changed.stderr).toBe(0);
      if (stage === "result_received") {
        const rejected = await returnResult(root, evaluator, resultPath);
        expect(rejected.code).not.toBe(0);
        expect(rejected.stderr).toContain("stale");
      }
      const recover = await invoke(root, ["task", "advance", id, "--agent-json"]);
      expect(recover.code).not.toBe(0);
      expect(recover.stderr).toContain("retired the stale result");
      const retired = JSON.parse(await readFile(exchangePath, "utf8")) as { status: string };
      expect(retired.status).toBe("retired");
      expect(await readFile(resultPath, "utf8")).toBe(originalResult);
      expect(await readFile(orderPath, "utf8")).toBe(originalOrder);
      expect(await readFile(exchange.evaluator_work_order_ref, "utf8")).toBe(originalEvidence);
      const context = await loadCommandContext({ cwd: root, rootOverride: root });
      const currentTask = await context.taskBackend.getTask(id);
      expect(currentTask?.quality_review?.state).not.toBe("pass");
      const next = await invoke(root, ["task", "advance", id, "--replacement", "--agent-json"]);
      expect(next.code, next.stderr).toBe(0);
      const nextPacket = JSON.parse(next.stdout) as Packet;
      expect(nextPacket.transition_id).not.toBe(evaluator.transition_id);
      const repeated = await packet(root, id);
      expect(repeated.transition_id).toBe(nextPacket.transition_id);
      const late = await returnResult(root, evaluator, resultPath);
      expect(late.code).not.toBe(0);
      expect(late.stderr).toContain("retired");
      expect(await readFile(resultPath, "utf8")).toBe(originalResult);
    },
  );
});
