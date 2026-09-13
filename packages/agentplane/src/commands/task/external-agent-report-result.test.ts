import {
  cp,
  readdir,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  externalAgentResultDigest,
  type ExternalAgentExchange,
  type ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import {
  externalReportResultPath,
  materializeExternalReportResult,
} from "./external-agent-report-result.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

function fixture(checkout = "/repo") {
  const taskId = "202609070000-REPORT";
  const result: ExternalAgentResultEnvelope = {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: taskId,
    transition_id: `tr_${"a".repeat(32)}`,
    state_fingerprint: `sha256:${"b".repeat(64)}`,
    role: "EXECUTOR",
    result: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: "report-order",
      status: "completed",
      summary: "Investigated the findings.",
      findings: ["One finding remains unresolved."],
      uncertainty: ["No security-clean claim."],
    },
  };
  const exchange = {
    purpose: "implementation",
    task_id: taskId,
    work_order_id: "report-order",
    checkout,
    result,
    result_digest: externalAgentResultDigest(result),
  } as ExternalAgentExchange;
  const work_order = {
    work_order_id: "report-order",
    task: { id: taskId, work_item_id: "report" },
    authority: { writable_roots: [path.join(checkout, ".agentplane/tasks", taskId)] },
    required_outputs: [
      { id: "semantic-result", kind: "semantic_result", required: true },
      { id: "report", kind: "report", required: true },
    ],
  } as AgentWorkOrderV2;
  return { exchange, work_order, changed_paths: [] as string[] };
}

async function temporaryFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-report-"));
  roots.push(root);
  const f = fixture(root);
  await mkdir(f.work_order.authority.writable_roots[0]!, { recursive: true });
  return f;
}

describe("report-only semantic results", () => {
  it("requires a current task-owned report scope and the accepted result digest", () => {
    const f = fixture();
    expect(externalReportResultPath(f)).toMatch(/semantic-report-[a-f0-9]{64}\.json$/u);
    for (const scopes of [
      [],
      ["."],
      ["src"],
      [".agentplane/tasks/another"],
      ["../outside"],
      [...f.work_order.authority.writable_roots, "src"],
    ]) {
      expect(
        externalReportResultPath({
          ...f,
          work_order: {
            ...f.work_order,
            authority: { ...f.work_order.authority, writable_roots: scopes },
          },
        }),
      ).toBeNull();
    }
    f.exchange.result!.result.summary = "Changed after acceptance.";
    expect(externalReportResultPath(f)).toBeNull();
  });

  it("rejects task-level, non-report, missing-output, and mismatched work-order results", () => {
    for (const change of ["task", "output", "missing", "order"] as const) {
      const f = fixture();
      if (change === "task") delete f.work_order.task.work_item_id;
      if (change === "output") f.work_order.required_outputs[1]!.kind = "artifact";
      if (change === "missing") f.work_order.required_outputs = [];
      if (change === "order") f.work_order.work_order_id = "other-order";
      expect(externalReportResultPath(f)).toBeNull();
    }
  });

  it("persists the exact envelope and preserves its file on identical replay", async () => {
    const f = await temporaryFixture();
    const [relative] = await materializeExternalReportResult(f);
    const target = path.join(f.exchange.checkout, relative!);
    expect(JSON.parse(await readFile(target, "utf8"))).toEqual(f.exchange.result);
    const before = await stat(target);
    expect(await materializeExternalReportResult({ ...f, changed_paths: [relative!] })).toEqual([
      relative,
    ]);
    const after = await stat(target);
    expect(after.mtimeMs).toBe(before.mtimeMs);
    await writeFile(target, "unrelated contents\n");
    await expect(materializeExternalReportResult(f)).rejects.toThrow(
      "differs from the accepted result",
    );
    expect(await readFile(target, "utf8")).toBe("unrelated contents\n");
  });

  it("preserves rejection of unrelated writes and ordinary no-diff implementations", async () => {
    const f = await temporaryFixture();
    await expect(
      materializeExternalReportResult({ ...f, changed_paths: ["src/other.ts"] }),
    ).rejects.toThrow("unrelated paths");
    f.work_order.authority.writable_roots = ["src"];
    expect(await materializeExternalReportResult(f)).toEqual([]);
  });

  it("refuses a symlinked report target", async () => {
    const f = await temporaryFixture();
    const target = path.join(f.exchange.checkout, externalReportResultPath(f)!);
    const victim = path.join(f.exchange.checkout, "victim.txt");
    await writeFile(victim, "preserve\n");
    await symlink(victim, target);
    await expect(materializeExternalReportResult(f)).rejects.toThrow("symlink");
    expect(await readFile(victim, "utf8")).toBe("preserve\n");
  });
});

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import {
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import {
  readRecoveryWorkOrder as order,
  writeRecoveryReport as report,
  type RecoveryPacket as Packet,
} from "../../cli/run-cli.core.task-advance.testkit.js";
import {
  captureRecoveryCli,
  recoveryPlanningProposal,
} from "../../cli/task-advance-effect-recovery.testkit.js";
import { defaultConfig } from "../../cli/core-imports.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { acceptExternalAgentResult } from "./external-agent-supervisor.js";
import * as reportResults from "./external-agent-report-result.js";

installRunCliIntegrationHarness();
const git = promisify(execFile);
function invoke(root: string, args: string[]) {
  return captureRecoveryCli([...args, "--root", root]);
}

async function packet(root: string, taskId: string) {
  const result = await invoke(root, ["task", "advance", taskId, "--agent-json"]);
  expect(result.code, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as Packet;
}
async function resume(root: string, p: Packet) {
  const result = await invoke(root, p.exchange.resume_argv.slice(1));
  expect(result.code, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as Packet;
}
async function observeHostUsage(p: Packet) {
  const workOrder = await order(p);
  const exchangePath = path.join(p.exchange.directory, "exchange.json");
  const exchange = JSON.parse(await readFile(exchangePath, "utf8")) as Record<string, unknown>;
  exchange.host_usage = {
    schema_version: 1,
    observed_by: "host_transport",
    state: "observed",
    reason: null,
    provider_usage: {
      provider: "report-result-test",
      run_id: `run:${p.transition_id}`,
      work_order_id: workOrder.work_order_id,
      thread_id: `thread:${p.transition_id}`,
      turn_id: `turn:${p.transition_id}`,
    },
    usage: {
      input_tokens: 1,
      output_tokens: 1,
      total_tokens: 2,
      visible_output_tokens: 1,
      reasoning_tokens: 0,
      cached_input_tokens: 0,
    },
  };
  await writeFile(exchangePath, `${JSON.stringify(exchange, null, 2)}\n`, "utf8");
}
async function commitFixture(root: string, message: string) {
  await git("git", ["add", ".agentplane", "package.json", ".gitignore"], { cwd: root });
  await git("git", ["commit", "-m", message], { cwd: root });
}

async function implementationFixture() {
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
  {
    await ensureRuntimeGitignore({ gitRoot: root });
    await commitFixture(root, "test: seed evidence rework repository");
  }
  const created = await invoke(root, [
    "task",
    "new",
    "--title",
    "Report-only WorkItem result",
    "--description",
    "Persist an analysis report after a source WorkItem.",
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
  const planning = await packet(root, taskId);
  const planOrder = await order(planning);
  const scope = ["source.ts", `.agentplane/tasks/${taskId}`];
  let proposal = recoveryPlanningProposal(planOrder, "Recover the approved source.");
  {
    const source = {
      ...proposal.work_items.work_items[0]!,
      scope_roots: ["source.ts"],
      resource_claims: [{ kind: "path" as const, resource: "source.ts", mode: "write" as const }],
    };
    const reportItem = {
      ...source,
      id: "report-only",
      objective: "Review the source and report remaining uncertainty.",
      depends_on: [source.id],
      required_inputs: [...source.expected_outputs],
      expected_outputs: ["analysis-report"],
      scope_roots: [scope[1]!],
      resource_claims: [{ kind: "path" as const, resource: scope[1]!, mode: "write" as const }],
    };
    proposal = {
      ...proposal,
      work_items: { ...proposal.work_items, work_items: [source, reportItem] },
    };
  }
  await observeHostUsage(planning);
  await report(planning, "Recover only the exact approved implementation.", {
    task_intent: {
      task_kind: "code",
      mutation_scope: "code",
      risk_flags: [],
      tags: ["code"],
      execution: {
        schema_version: 2,
        preferred_mode: "branch_pr",
        scope_roots: scope,
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["The fixture authorizes local source changes."],
      },
    },
    task_plan_proposal: proposal,
  });
  const approval = await resume(root, planning);
  expect(approval.action.kind).toBe("approval_required");
  expect(
    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "1. Run bun run test:critical. Expected: the focused recovery contract passes.",
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]),
  ).toBe(0);
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
  let implementation = await packet(root, taskId);
  let implementationOrder = await order(implementation);
  const checkout = implementationOrder.state_fingerprint.worktree;
  {
    await writeFile(path.join(checkout, "source.ts"), "export const observed = true;\n");
    await observeHostUsage(implementation);
    await report(implementation, "Implemented source before report-only review.");
    const command = await loadCommandContext({ cwd: checkout, rootOverride: checkout });
    await acceptExternalAgentResult({
      ctx: { cwd: checkout, rootOverride: checkout },
      command,
      task_id: taskId,
      result_path: implementation.exchange.result_path,
      include_remote: false,
    });
    const metaPath = path.join(checkout, ".agentplane/tasks", taskId, "pr/meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    await writeFile(metaPath, JSON.stringify({ ...meta, status: "OPEN", pr_number: 123 }));
    implementation = await packet(checkout, taskId);
    implementationOrder = await order(implementation);
    expect(implementationOrder.task.work_item_id).toBe("report-only");
  }
  return { taskId, implementation, checkout };
}

describe("report-only WorkItem application", { timeout: 180_000 }, () => {
  it.each([false, true])(
    "persists report-only WorkItem output and replays once (interrupt=%s)",
    async (interrupt) => {
      const f = await implementationFixture();
      await observeHostUsage(f.implementation);
      await report(f.implementation, "Reviewed all alerts; unresolved risks remain.", {
        findings: ["The report is the approved output."],
        uncertainty: ["No alerts were dismissed."],
      });
      const envelope: unknown = JSON.parse(
        await readFile(f.implementation.exchange.result_path, "utf8"),
      );
      if (interrupt) {
        const materialize = reportResults.materializeExternalReportResult;
        const spy = vi
          .spyOn(reportResults, "materializeExternalReportResult")
          .mockImplementationOnce(async (opts) => {
            await materialize(opts);
            throw new Error("lost report response");
          });
        const failed = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
        expect(failed.code).not.toBe(0);
        expect(failed.stderr).toContain("lost report response");
        spy.mockRestore();
      }
      await resume(f.checkout, f.implementation);
      const ctx = await loadCommandContext({ cwd: f.checkout, rootOverride: f.checkout });
      const completed = await ctx.taskBackend.getTask(f.taskId);
      expect(completed?.verification?.state).toBe("ok");
      expect(
        taskCentricAggregateFromExtensions(completed?.extensions)?.work_items["report-only"]?.state,
      ).toBe("COMPLETED");
      const taskDir = path.join(f.checkout, ".agentplane/tasks", f.taskId);
      const entries = await readdir(taskDir);
      const reports = entries.filter((name) => name.startsWith("semantic-report-"));
      expect(reports).toHaveLength(1);
      expect(JSON.parse(await readFile(path.join(taskDir, reports[0]!), "utf8"))).toEqual(envelope);
      const head = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      await resume(f.checkout, f.implementation);
      const replayHead = await git("git", ["rev-parse", "HEAD"], { cwd: f.checkout });
      expect(replayHead.stdout).toBe(head.stdout);
      await report(f.implementation, "A different report cannot replace the accepted result.");
      const rejected = await invoke(f.checkout, f.implementation.exchange.resume_argv.slice(1));
      expect(rejected.code).not.toBe(0);
      expect(rejected.stderr).toContain("different result is already recorded");
    },
  );
});
