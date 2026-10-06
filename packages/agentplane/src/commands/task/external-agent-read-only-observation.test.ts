import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  digestSupervisorEpisodeValue,
  validateAgentWorkOrderV2,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import {
  acceptExternalAgentResult,
  issueExternalAgentExchange,
} from "./external-agent-supervisor.js";
import { recoverPendingExternalAgentResult } from "./external-agent-supervisor-recovery.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { readExternalAgentExchange } from "./external-agent-exchange.js";
import * as observation from "./external-agent-read-only-observation.js";
import * as exchangeOwner from "./external-agent-exchange.js";
import { prepareAgentWorkOrder } from "../../runner/usecases/agent-work-order.js";

installRunCliIntegrationHarness();
function git(root: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
async function fixture() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"]) {
    await writeFile(
      path.join(root, ".agentplane/policy", name),
      "# Fixture policy\nPreserve authority.\n",
    );
  }
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/context/\n.agentplane/cache/\n.agentplane/cache.sqlite*\n",
  );
  await writeFile(path.join(root, "source.txt"), "before\n");
  await commitAll(root, "seed");
  const base = git(root, "rev-parse", "HEAD");
  const journey = kernelReplayJourney("direct");
  const id = journey.task.id;
  git(root, "config", "agentplane.baseBranch", "main");
  git(root, "checkout", "-b", `task/${id}/observe`);
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as k.Sha256Digest;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(saved),
    writeTask: (next) => {
      saved = next;
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, identity);
  for (const [index, step] of journey.steps.entries()) {
    const input = structuredClone(step.input);
    input.authority = { ...input.authority!, repository_identity: identity };
    const result =
      index === 0 ? await adapter.create(journey.task, input) : await adapter.execute(input);
    expect(result.kind).toBe("committed");
  }
  const task = saved! as TaskData;
  task.execution_contract = resolveExplicitExecutionContract({
    config,
    parsed: {
      route: "branch_pr",
      verify: ["git diff --check"],
      scopeRoots: ["source.txt"],
      repositoryEffects: ["source_code"],
    },
    intent: { taskKind: "code", mutationScope: "code" },
  });
  task.execution_route = {
    requested_mode: "branch_pr",
    selected_mode: "branch_pr",
    repository_mode: "branch_pr",
    schema_version: 1,
    reason_codes: ["explicit_branch_pr"],
    frozen: true,
  };
  task.verify = ["git diff --check"];
  task.task_kind = "code";
  task.mutation_scope = "code";
  task.extensions = {
    ...task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: "main",
      base_sha: base,
      repository_identity: identity,
    },
    implementation_commit: { hash: base },
  };
  task.doc =
    "## Summary\nObserve residual files.\n\n## Plan\nPreserve all files.\n\n## Verify Steps\n- git diff --check\n";
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  await command.taskBackend.writeTask(task);
  await commitAll(root, "completed canonical task");
  await writeFile(path.join(root, "unowned.txt"), "unrelated retained residue\n");
  const decision = await refreshExternalAgentRoute({
    cwd: root,
    task_id: id,
    include_remote: false,
  });
  expect(decision.workflowStep).toMatchObject({
    kind: "agent_episode",
    episode: { purpose: "task_worktree_resolution" },
  });
  const persisted = await command.taskBackend.getTask(id);
  return {
    root,
    id,
    command,
    decision,
    kernel: JSON.stringify(persisted?.extensions?.task_kernel),
    head: git(root, "rev-parse", "HEAD"),
  };
}

async function issue(f: Awaited<ReturnType<typeof fixture>>, replacement = false) {
  const prepared = await prepareAgentWorkOrder({
    command_ctx: f.command,
    cwd: f.root,
    task_id: f.id,
    include_remote: false,
  });
  expect(prepared.status, JSON.stringify(prepared)).toBe("prepared");
  if (prepared.status !== "prepared") throw new Error("WorkOrder preparation failed");
  const order = validateAgentWorkOrderV2(prepared.value.work_order);
  expect(order.authority.sandbox).toBe("read-only");
  expect(order.authority.writable_roots).toEqual([]);
  const issued = await issueExternalAgentExchange({
    ctx: { cwd: f.root },
    command: f.command,
    decision: prepared.value.route_decision,
    work_order: order,
    replace_failed_operation: replacement,
  });
  if (!issued) throw new Error("Expected external observation exchange");
  const bytes =
    JSON.stringify(
      {
        work_order_id: order.work_order_id,
        status: "blocked",
        blocker: { summary: "Unowned residue requires operator classification." },
        summary: "Unowned residue requires operator classification. No files changed.",
        findings: [],
        uncertainty: [],
      },
      null,
      2,
    ) + "\n";
  await writeFile(issued.paths.result, bytes);
  const accept = () =>
    acceptExternalAgentResult({
      ctx: { cwd: f.root },
      command: f.command,
      task_id: f.id,
      result_path: issued.paths.result,
      include_remote: false,
    });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: f.root,
    common_git_dir: path.join(f.root, ".git"),
    task_id: f.id,
  });
  const journal = async () =>
    validateSupervisorExecutionEpisodeJournal(
      await createSupervisorEpisodeStore(journalPath).read(),
    );
  return { ...issued, bytes, accept, journal };
}
async function unchanged(f: Awaited<ReturnType<typeof fixture>>) {
  const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
  const task = (await command.taskBackend.getTask(f.id))!;
  expect(task.status).toBe("DONE");
  expect(JSON.stringify(task.extensions?.task_kernel)).toBe(f.kernel);
  expect(git(f.root, "rev-parse", "HEAD")).toBe(f.head);
  expect(git(f.root, "status", "--porcelain")).toBe("?? unowned.txt");
}

describe("canonical read-only observation admission", () => {
  it("preserves legacy comment and native metadata commit behavior", async () => {
    const f = await fixture();
    const issued = await issue(f);
    // Exercise the legacy application owner directly. Legacy tasks no longer
    // participate in canonical route evaluation without an explicit migration.
    const legacy = (await f.command.taskBackend.getTask(f.id))!;
    delete legacy.extensions!.task_kernel;
    await f.command.taskBackend.writeTask(legacy);
    await commitAll(f.root, "legacy fixture");
    const head = git(f.root, "rev-parse", "HEAD");
    const envelope = exchangeOwner.validateExternalAgentResultEnvelope({
      raw: JSON.parse(issued.bytes),
      exchange: issued.exchange,
      work_order: issued.work_order,
    });
    await observation.applyExternalReadOnlyWorktreeObservation({
      command: f.command,
      exchange: issued.exchange,
      envelope,
      work_order: issued.work_order,
    });
    const task = (await f.command.taskBackend.getTask(f.id))!;
    expect(
      task.comments?.some((comment) =>
        comment.body.includes("Read-only worktree observation (blocked)"),
      ),
    ).toBe(true);
    expect(git(f.root, "rev-parse", "HEAD")).not.toBe(head);
  });

  it("rejects foreign task and episode identities before application", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await expect(
      acceptExternalAgentResult({
        ctx: { cwd: f.root },
        command: f.command,
        task_id: "202610060000-OTHER1",
        result_path: issued.paths.result,
        include_remote: false,
      }),
    ).rejects.toThrow();
    const payload = JSON.parse(issued.bytes) as { work_order_id: string };
    payload.work_order_id = "foreign-work-order";
    await writeFile(issued.paths.result, JSON.stringify(payload));
    await expect(issued.accept()).rejects.toThrow();
    const receipt = await issued.journal();
    expect(receipt.operations[0]?.status).toBe("intent");
    await unchanged(f);
  });

  it("records one durable receipt without mutating repository or terminal kernel state", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await issued.accept();
    await unchanged(f);
    const receipt = await issued.journal();
    expect(receipt.operations).toHaveLength(1);
    expect(receipt.operations[0]).toMatchObject({
      status: "completed",
      result_digest: digestSupervisorEpisodeValue({
        semantic_status: "blocked",
        work_order_id: issued.work_order.work_order_id,
        result_digest: exchangeOwner.externalAgentResultDigest(
          exchangeOwner.validateExternalAgentResultEnvelope({
            raw: JSON.parse(issued.bytes),
            exchange: issued.exchange,
            work_order: issued.work_order,
          }),
        ),
      }),
    });
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "consumed",
    });
    await issued.accept();
    expect(await issued.journal()).toEqual(receipt);
    expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    await unchanged(f);
  });

  it("replaces a stale read-only intent after failed receipt persistence but before retirement acknowledgement", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await writeFile(path.join(f.root, "source.txt"), "unrelated new source state\n");
    const spy = vi
      .spyOn(exchangeOwner, "writeExternalAgentExchange")
      .mockImplementation(async (target, value) => {
        if (value.status === "retired")
          throw new Error("Injected retirement acknowledgement failure");
        await originalWrite(target, value);
      });
    try {
      await expect(issued.accept()).rejects.toThrow("Injected retirement");
    } finally {
      spy.mockRestore();
    }
    const failed = await issued.journal();
    expect(failed.operations[0]?.status).toBe("failed");
    expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
      status: "result_received",
    });
    const beforeRetry = JSON.stringify(failed);
    await expect(issued.accept()).rejects.toThrow();
    expect(JSON.stringify(await issued.journal())).toBe(beforeRetry);
    const replacement = await issue(f, true);
    expect(replacement.exchange.transition_id).not.toBe(issued.exchange.transition_id);
    expect(replacement.exchange.state_fingerprint).not.toBe(issued.exchange.state_fingerprint);
    expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    const persisted = await f.command.taskBackend.getTask(f.id);
    expect(JSON.stringify(persisted?.extensions?.task_kernel)).toBe(f.kernel);
  });

  it.each(["before", "after", "acknowledgement"] as const)(
    "recovers retained original result after interruption %s admission",
    async (phase) => {
      const f = await fixture();
      const issued = await issue(f);
      const original = observation.applyExternalReadOnlyWorktreeObservation;
      const spy =
        phase === "acknowledgement"
          ? vi
              .spyOn(exchangeOwner, "writeExternalAgentExchange")
              .mockImplementation(async (target, value) => {
                if (value.status === "consumed")
                  throw new Error("Injected acknowledgement failure");
                await originalWrite(target, value);
              })
          : vi
              .spyOn(observation, "applyExternalReadOnlyWorktreeObservation")
              .mockImplementationOnce(async (opts) => {
                if (phase === "after") await original(opts);
                throw new Error("Injected observation failure");
              });
      try {
        await expect(issued.accept()).rejects.toThrow(/Injected/);
      } finally {
        spy.mockRestore();
      }
      expect(await readExternalAgentExchange(issued.paths.exchange)).toMatchObject({
        status: "result_received",
      });
      await unchanged(f);
      const decision = await refreshExternalAgentRoute({
        cwd: f.root,
        task_id: f.id,
        include_remote: false,
      });
      await recoverPendingExternalAgentResult({
        command: f.command,
        task_id: f.id,
        current_decision: decision,
        accept_result: issued.accept,
      });
      await unchanged(f);
      const receipt = await issued.journal();
      expect(receipt.operations).toHaveLength(1);
      expect(receipt.operations[0]?.status).toBe("completed");
      await issued.accept();
      expect(await issued.journal()).toEqual(receipt);
      expect(await readFile(issued.paths.result, "utf8")).toBe(issued.bytes);
    },
  );
  it.each(["result", "retained_result", "work_order", "checkout", "source", "task"] as const)(
    "rejects changed %s evidence instead of admitting a stale observation",
    async (kind) => {
      const f = await fixture();
      const issued = await issue(f);
      const crash = vi
        .spyOn(observation, "applyExternalReadOnlyWorktreeObservation")
        .mockRejectedValueOnce(new Error("Injected old handler failure"));
      try {
        await expect(issued.accept()).rejects.toThrow("Injected");
      } finally {
        crash.mockRestore();
      }
      switch (kind) {
        case "result": {
          await writeFile(
            issued.paths.result,
            issued.bytes.replace("Unowned residue", "Different observation"),
          );

          break;
        }
        case "retained_result":
        case "checkout": {
          const exchange = (await readExternalAgentExchange(issued.paths.exchange))!;
          if (kind === "retained_result")
            exchange.result!.result.summary = "Tampered retained evidence";
          else exchange.checkout = path.dirname(f.root);
          await writeFile(issued.paths.exchange, JSON.stringify(exchange));

          break;
        }
        case "work_order": {
          const order = JSON.parse(await readFile(issued.paths.work_order, "utf8")) as {
            task: { id: string };
          };
          order.task.id = "202610060000-OTHER1";
          await writeFile(issued.paths.work_order, JSON.stringify(order));

          break;
        }
        case "source": {
          await writeFile(path.join(f.root, "source.txt"), "unauthorized mutation\n");

          break;
        }
        default: {
          const task = (await f.command.taskBackend.getTask(f.id))!;
          await f.command.taskBackend.writeTask({ ...task, title: task.title + " changed" });
        }
      }
      await expect(issued.accept()).rejects.toThrow();
      const receipt = await issued.journal();
      expect(receipt.operations[0]?.status).toBe(
        kind === "source" || kind === "task" ? "failed" : "intent",
      );
      const task = (await f.command.taskBackend.getTask(f.id))!;
      expect(JSON.stringify(task.extensions?.task_kernel)).toBe(f.kernel);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(f.head);
    },
  );
});
const originalWrite = exchangeOwner.writeExternalAgentExchange;
