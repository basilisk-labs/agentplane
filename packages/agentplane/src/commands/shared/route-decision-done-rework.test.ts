import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
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
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext } from "./task-backend.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import { resolveExplicitExecutionContract } from "../task/execution-contract-intake.js";
import { refreshExternalAgentRoute } from "../task/external-agent-result-routing.js";
import { prepareAgentWorkOrder } from "../../runner/usecases/agent-work-order.js";
import { cmdVerifyParsed } from "../task/verify-record.js";
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
  await ensureRuntimeGitignore({ gitRoot: root });
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

  expect(() =>
    execFileSync(process.execPath, ["-e", "process.exitCode=1"], { cwd: root, stdio: "ignore" }),
  ).toThrow();
  expect(
    await cmdVerifyParsed({
      ctx: command,
      cwd: root,
      rootOverride: undefined,
      taskId: id,
      state: "needs_rework",
      by: "SUPERVISOR",
      note: "Rework: observed fixture check exit 1.",
      details:
        "Command: node -e process.exitCode=1\nResult: fail\nEvidence: actual isolated process exited 1\nScope: current fixture implementation",
      quiet: true,
      allowCanonicalProjection: true,
    }),
  ).toBe(0);
  await commitAll(root, "record failed verification");
  const persisted = await command.taskBackend.getTask(id);
  return {
    root,
    id,
    command,
    kernel: JSON.stringify(persisted?.extensions?.task_kernel),
    head: git(root, "rev-parse", "HEAD"),
  };
}

async function route(f: Awaited<ReturnType<typeof fixture>>) {
  const result = await refreshExternalAgentRoute({
    cwd: f.root,
    task_id: f.id,
    include_remote: false,
  });
  const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
  const task = await command.taskBackend.getTask(f.id);
  expect(task?.status).toBe("DONE");
  expect(JSON.stringify(task?.extensions?.task_kernel)).toBe(f.kernel);
  return result;
}
describe("completed canonical verification rework routing", () => {
  it("returns unchanged failed source to bounded executor rework without reopening the kernel", async () => {
    const f = await fixture();
    const decision = await route(f);
    const files = await readdir(path.join(f.root, ".agentplane/tasks", f.id, "verification"));
    const record = JSON.parse(
      await readFile(
        path.join(f.root, ".agentplane/tasks", f.id, "verification", files[0]!),
        "utf8",
      ),
    ) as { implementation_sha: string };
    expect(
      decision.workflowStep,
      JSON.stringify({
        verification: decision.task.verification,
        delta: git(f.root, "diff", "--stat", record.implementation_sha, "HEAD"),
        changed: git(f.root, "status", "--short"),
      }),
    ).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    });
    expect(decision.blockers.map((blocker) => blocker.code)).toEqual(
      expect.arrayContaining(["implementation_rework_required", "verification_required"]),
    );
    expect(decision.nextAction.code).toBe("implementation_rework_required");
    const prepared = await prepareAgentWorkOrder({
      command_ctx: f.command,
      cwd: f.root,
      task_id: f.id,
      include_remote: false,
    });
    expect(
      prepared.status,
      prepared.status === "rejected" ? JSON.stringify(prepared.rejection) : "prepared",
    ).toBe("prepared");
    if (prepared.status !== "prepared") throw new Error("WorkOrder not prepared");
    expect(prepared.value.work_order.authority).toMatchObject({
      sandbox: "workspace-write",
      writable_roots: [path.join(f.root, "source.txt")],
    });
    expect(prepared.value.work_order.task.work_item_id).toBeNull();
    expect(git(f.root, "rev-parse", "HEAD")).toBe(f.head);
  });
  it("verifies genuinely changed descendant source without requiring a DOING event", async () => {
    const f = await fixture();
    await writeFile(path.join(f.root, "source.txt"), "fixed\n");
    await commitAll(f.root, "repair source");
    const decision = await route(f);
    expect(decision.workflowStep).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "verification" },
    });
  });
  it.each([
    "metadata",
    "closure_event",
    "stale_review",
    "reverted_source",
    "missing_record",
    "tampered_record",
  ] as const)("does not confuse %s with implementation repair", async (kind) => {
    const f = await fixture();
    const task = (await f.command.taskBackend.getTask(f.id))!;
    const directory = path.join(f.root, ".agentplane/tasks", f.id, "verification");
    switch (kind) {
      case "metadata": {
        await writeFile(
          path.join(f.root, ".agentplane/tasks", f.id, "pr/review.md"),
          "Metadata-only update\n",
        );
        break;
      }
      case "closure_event": {
        await f.command.taskBackend.writeTask({
          ...task,
          commit: { hash: f.head, message: "Closure" },
          events: [
            ...(task.events ?? []),
            {
              type: "status",
              from: "DONE",
              to: "DONE",
              author: "SUPERVISOR",
              at: "2099-01-01T00:00:00.000Z",
              commit: f.head,
              note: "Closure metadata",
            },
          ],
        });
        break;
      }
      case "stale_review": {
        await f.command.taskBackend.writeTask({
          ...task,
          quality_review: {
            state: "rework",
            provenance: "evaluator_supplied",
            updated_at: "2026-01-01T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "Old review",
            evaluated_sha: git(f.root, "rev-parse", "main"),
            evidence_refs: [`.agentplane/tasks/${f.id}/quality/old/quality-report.json`],
            findings: ["Old source needs repair"],
          },
        });
        break;
      }
      case "reverted_source": {
        await writeFile(path.join(f.root, "source.txt"), "intermediate repair\n");
        await commitAll(f.root, "intermediate source");
        await writeFile(path.join(f.root, "source.txt"), "before\n");
        break;
      }
      case "missing_record": {
        await rm(directory, { recursive: true });
        break;
      }
      case "tampered_record": {
        const files = await readdir(directory);
        const file = path.join(directory, files[0]!);
        const value = JSON.parse(await readFile(file, "utf8")) as { implementation_sha: string };
        value.implementation_sha = "a".repeat(40);
        await writeFile(file, JSON.stringify(value));
        break;
      }
    }
    await commitAll(f.root, "fixture evidence variant");
    const decision = await route(f);
    expect(decision.workflowStep).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    });
  });

  it("rejects a valid native failure record evaluated on an unrelated source commit", async () => {
    const f = await fixture();
    const branch = git(f.root, "branch", "--show-current");
    git(f.root, "checkout", "-b", "foreign-source", "main");
    await writeFile(path.join(f.root, "source.txt"), "unrelated source\n");
    await commitAll(f.root, "foreign source");
    const foreign = git(f.root, "rev-parse", "HEAD");
    git(f.root, "checkout", branch);
    const task = (await f.command.taskBackend.getTask(f.id))!;
    expect(
      await cmdVerifyParsed({
        ctx: f.command,
        cwd: f.root,
        rootOverride: undefined,
        taskId: f.id,
        state: "needs_rework",
        by: "SUPERVISOR",
        note: "Rework: wrong frozen target fixture.",
        details:
          "Command: git diff --check\nResult: fail\nEvidence: fixture invalid target\nScope: wrong target negative",
        quiet: true,
        allowCanonicalProjection: true,
        verificationSnapshot: {
          execution_contract: task.execution_contract!,
          evaluated_sha: foreign,
          changed_paths: ["source.txt"],
          repository_effects: ["source_code"],
        },
      }),
    ).toBe(0);
    await commitAll(f.root, "record wrong-source negative");
    const decision = await route(f);
    expect(decision.workflowStep).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    });
  });

  it("keeps a fresh evaluator rework authoritative after new implementation", async () => {
    const f = await fixture();
    await writeFile(path.join(f.root, "source.txt"), "fixed\n");
    await commitAll(f.root, "new source");
    const target = git(f.root, "rev-parse", "HEAD");
    const task = (await f.command.taskBackend.getTask(f.id))!;
    await f.command.taskBackend.writeTask({
      ...task,
      quality_review: {
        state: "rework",
        provenance: "evaluator_supplied",
        updated_at: "2099-01-01T00:00:00.000Z",
        updated_by: "EVALUATOR",
        note: "New source still needs repair",
        evaluated_sha: target,
        evidence_refs: [`.agentplane/tasks/${f.id}/quality/new/quality-report.json`],
        findings: ["Current implementation defect"],
      },
    });
    await commitAll(f.root, "record current review");
    const decision = await route(f);
    expect(decision.workflowStep).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    });
  });
});
