import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect } from "vitest";
import {
  commitAll,
  configureGitUser,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
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
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { prepareAgentWorkOrder } from "../../runner/usecases/agent-work-order.js";

export function git(root: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
export async function fixture() {
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

export async function issue(f: Awaited<ReturnType<typeof fixture>>, replacement = false) {
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
export async function unchanged(f: Awaited<ReturnType<typeof fixture>>) {
  const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
  const task = (await command.taskBackend.getTask(f.id))!;
  expect(task.status).toBe("DONE");
  expect(JSON.stringify(task.extensions?.task_kernel)).toBe(f.kernel);
  expect(git(f.root, "rev-parse", "HEAD")).toBe(f.head);
  expect(git(f.root, "status", "--porcelain")).toBe("?? unowned.txt");
}
