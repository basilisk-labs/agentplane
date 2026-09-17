import path from "node:path";
import { mkdir } from "node:fs/promises";

import { parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskFromContext, resolveCommandGitCommonDir } from "../shared/task-backend.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import {
  readDirectRepositoryStatus,
  readDirectTaskHead,
  type DirectImplementationEvidence,
  type DirectRepositoryStatus,
} from "./direct-task-finalization.js";
import { pathFromStatusLine } from "./external-agent-implementation-finalization.js";

export type KernelRepositoryBaseline = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_baseline";
  task_id: string;
  work_item_id: string;
  task_revision: number;
  work_order_id: string;
  checkout: string;
  branch: string;
  head: string;
  tree: string;
  status: DirectRepositoryStatus;
}>;

export type KernelRepositoryEvidence = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_evidence";
  task_id: string;
  work_item_id: string;
  task_revision: number;
  work_order_id: string;
  checkout: string;
  branch: string;
  base_commit: string;
  implementation_commit: string;
  implementation_tree: string;
  changed_paths: readonly string[];
  evaluator_target: string;
  implementation_evidence: DirectImplementationEvidence;
  digest: k.Sha256Digest;
}>;

type KernelRepositoryCommitIntent = Readonly<{
  schema_version: 1;
  kind: "canonical_repository_commit_intent";
  task_id: string;
  work_order_id: string;
  base_commit: string;
  changed_paths: readonly string[];
  digest: k.Sha256Digest;
}>;

async function gitValue(command: CommandContext, args: string[], label: string): Promise<string> {
  const result = await runProcess({
    command: "git",
    args,
    cwd: command.resolvedProject.gitRoot,
    reject: false,
  });
  const value = result.stdout.trim();
  if (result.exitCode !== 0 || !value) throw new Error(`Canonical ${label} is unavailable`);
  return value;
}

function taskArtifactPath(command: CommandContext, taskId: string, candidate: string): boolean {
  const prefix = `${command.config.paths.workflow_dir}/${taskId}/`;
  return candidate === prefix.slice(0, -1) || candidate.startsWith(prefix);
}

function nonTaskStatusLines(
  command: CommandContext,
  taskId: string,
  status: DirectRepositoryStatus,
): string[] {
  return status.lines.filter((line) => {
    const candidate = pathFromStatusLine(line);
    return !candidate || !taskArtifactPath(command, taskId, candidate);
  });
}

async function writeCommitIntent(directory: string, intent: KernelRepositoryCommitIntent) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, "repository-commit-intent.json");
  try {
    await writeNewStableRegularFileNoFollow(
      target,
      `${JSON.stringify(intent, null, 2)}\n`,
      "canonical repository commit intent",
    );
  } catch (error) {
    const stored = JSON.parse(
      await readStableRegularTextNoFollow(target, "canonical repository commit intent"),
    ) as KernelRepositoryCommitIntent;
    if (k.kernelDigest(stored) !== k.kernelDigest(intent)) throw error;
  }
}

async function readCommitIntent(directory: string): Promise<KernelRepositoryCommitIntent | null> {
  try {
    const intent = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "repository-commit-intent.json"),
        "canonical repository commit intent",
      ),
    ) as KernelRepositoryCommitIntent;
    const { digest, ...contents } = intent;
    if (k.kernelDigest(contents) !== digest)
      throw new Error("Canonical repository commit intent is invalid");
    return intent;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function assertCanonicalCheckout(
  command: CommandContext,
  taskId: string,
  branch: string,
): Promise<void> {
  const task = await loadTaskFromContext({ ctx: command, taskId });
  if (task.execution_route?.repository_mode !== "branch_pr") return;
  if (parseTaskIdFromBranch(command.config.branch.task_prefix, branch) !== taskId) {
    throw new Error(
      `Canonical branch_pr implementation requires the dedicated task worktree; observed ${branch}.`,
    );
  }
}

export async function captureKernelRepositoryBaseline(
  command: CommandContext,
  order: AgentWorkOrderV2,
): Promise<KernelRepositoryBaseline> {
  const [head, branch, tree, status] = await Promise.all([
    readDirectTaskHead(command.resolvedProject.gitRoot),
    gitValue(command, ["branch", "--show-current"], "branch"),
    gitValue(command, ["rev-parse", "HEAD^{tree}"], "tree"),
    readDirectRepositoryStatus(command.resolvedProject.gitRoot),
  ]);
  if (!head || !status) throw new Error("Canonical repository baseline is unavailable");
  await assertCanonicalCheckout(command, order.task.id, branch);
  return {
    schema_version: 1,
    kind: "canonical_repository_baseline",
    task_id: order.task.id,
    work_item_id: order.task.work_item_id!,
    task_revision: order.task.revision ?? 0,
    work_order_id: order.work_order_id,
    checkout: command.resolvedProject.gitRoot,
    branch,
    head,
    tree,
    status,
  };
}

export async function readKernelRepositoryBaseline(
  directory: string,
): Promise<KernelRepositoryBaseline> {
  return JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "repository-baseline.json"),
      "canonical repository baseline",
    ),
  ) as KernelRepositoryBaseline;
}

function evidenceContents(
  baseline: KernelRepositoryBaseline,
  workOrder: AgentWorkOrderV2,
  implementationCommit: string,
  implementationTree: string,
  changedPaths: readonly string[],
  evidence: DirectImplementationEvidence,
): Omit<KernelRepositoryEvidence, "digest"> {
  return {
    schema_version: 1,
    kind: "canonical_repository_evidence",
    task_id: baseline.task_id,
    work_item_id: workOrder.task.work_item_id!,
    task_revision: workOrder.task.revision ?? 0,
    work_order_id: baseline.work_order_id,
    checkout: baseline.checkout,
    branch: baseline.branch,
    base_commit: baseline.head,
    implementation_commit: implementationCommit,
    implementation_tree: implementationTree,
    changed_paths: changedPaths,
    evaluator_target: implementationCommit,
    implementation_evidence: evidence,
  };
}

export async function commitCanonicalImplementation(opts: {
  command: CommandContext;
  directory: string;
  work_order: AgentWorkOrderV2;
  changed_paths: readonly string[];
}): Promise<KernelRepositoryEvidence | null> {
  const baseline = await readKernelRepositoryBaseline(opts.directory);
  if (
    baseline.task_id !== opts.work_order.task.id ||
    baseline.work_order_id !== opts.work_order.work_order_id ||
    path.resolve(baseline.checkout) !== path.resolve(opts.command.resolvedProject.gitRoot)
  ) {
    throw new Error("Canonical repository baseline identity changed");
  }
  let existingEvidence: KernelRepositoryEvidence | null = null;
  try {
    existingEvidence = await readKernelRepositoryEvidence(opts.directory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const [head, branch, status] = await Promise.all([
    readDirectTaskHead(baseline.checkout),
    gitValue(opts.command, ["branch", "--show-current"], "branch"),
    readDirectRepositoryStatus(baseline.checkout),
  ]);
  if (!head || !status || branch !== baseline.branch)
    throw new Error("Canonical implementation changed Git history or checkout identity");
  if (existingEvidence) {
    if (
      existingEvidence.task_id !== baseline.task_id ||
      existingEvidence.work_order_id !== baseline.work_order_id ||
      existingEvidence.base_commit !== baseline.head ||
      existingEvidence.implementation_commit !== head
    )
      throw new Error("Canonical repository evidence identity changed");
    return existingEvidence;
  }
  const baselineLines = new Set(
    nonTaskStatusLines(opts.command, baseline.task_id, baseline.status),
  );
  const currentLines = new Set(nonTaskStatusLines(opts.command, baseline.task_id, status));
  const lostBaseline = [...baselineLines].filter((line) => !currentLines.has(line));
  if (lostBaseline.length > 0) {
    throw new Error("Canonical implementation changed its dirty baseline");
  }
  const introduced = [...currentLines]
    .filter((line) => !baselineLines.has(line))
    .map((line) => pathFromStatusLine(line))
    .filter(Boolean)
    .toSorted();
  const expected = [...new Set(opts.changed_paths)].toSorted();
  const intent = await readCommitIntent(opts.directory);
  const intendedPaths = intent?.changed_paths ?? expected;
  if (
    intent &&
    (intent.task_id !== baseline.task_id || intent.work_order_id !== baseline.work_order_id)
  )
    throw new Error("Canonical repository commit intent identity changed");
  if (head !== baseline.head && !intent)
    throw new Error("Canonical implementation changed Git history before commit dispatch");
  if (
    head === baseline.head &&
    (introduced.length !== intendedPaths.length ||
      introduced.some((candidate, index) => candidate !== intendedPaths[index]))
  ) {
    throw new Error(
      `Canonical repository delta differs from its observation: ${introduced.join(", ")}.`,
    );
  }
  if (head === baseline.head && introduced.length === 0) return null;
  const authority = opts.work_order.authority;
  const roots = authority.writable_roots.map((root) =>
    path.relative(baseline.checkout, root).replaceAll(path.sep, "/"),
  );
  const outsideScope = intendedPaths.filter(
    (candidate) =>
      !roots.some((root) => root === "" || candidate === root || candidate.startsWith(`${root}/`)),
  );
  if (outsideScope.length > 0) {
    throw new Error(
      `Canonical implementation escaped its commit scope: ${outsideScope.join(", ")}`,
    );
  }
  const intentContents = {
    schema_version: 1 as const,
    kind: "canonical_repository_commit_intent" as const,
    task_id: baseline.task_id,
    work_order_id: baseline.work_order_id,
    base_commit: baseline.head,
    changed_paths: intendedPaths,
  };
  const commitIntent = { ...intentContents, digest: k.kernelDigest(intentContents) };
  await writeCommitIntent(opts.directory, commitIntent);
  if (head === baseline.head) {
    const exitCode = await cmdCommit({
      ctx: opts.command,
      cwd: baseline.checkout,
      taskId: baseline.task_id,
      message: `🚧 ${baseline.task_id.split("-").at(-1)} task: apply canonical agent result`,
      close: false,
      allow: [...intendedPaths],
      autoAllow: false,
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
      closeUnstageOthers: false,
      closeCheckOnly: false,
    });
    if (exitCode !== 0) throw new Error(`Canonical implementation commit exited ${exitCode}`);
  } else {
    const [parent, committed] = await Promise.all([
      gitValue(opts.command, ["rev-parse", `${head}^`], "implementation parent"),
      gitValue(
        opts.command,
        ["diff", "--name-only", "--diff-filter=ACDMRTUXB", `${baseline.head}..${head}`],
        "implementation paths",
      ),
    ]);
    const paths = committed
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .filter((entry) => !taskArtifactPath(opts.command, baseline.task_id, entry))
      .toSorted();
    if (
      parent !== baseline.head ||
      paths.length !== intendedPaths.length ||
      paths.some((candidate, index) => candidate !== intendedPaths[index])
    )
      throw new Error("Canonical repository commit is in doubt and cannot be reconciled");
  }
  const implementationCommit = await readDirectTaskHead(baseline.checkout);
  if (!implementationCommit || implementationCommit === baseline.head) {
    throw new Error("Canonical implementation commit was not observed");
  }
  const prepared = await prepareDirectImplementationEvidence({
    command: opts.command,
    cwd: baseline.checkout,
    task_id: baseline.task_id,
    execution_base_commit: baseline.head,
    execution_baseline_status: baseline.status,
    allowed_paths: [...roots, `${opts.command.config.paths.workflow_dir}/${baseline.task_id}`],
    observed_changed_paths: intendedPaths,
  });
  if (prepared.status !== "ready") {
    throw new Error(`Canonical implementation evidence is unavailable: ${prepared.reason}`);
  }
  const implementationTree = await gitValue(
    opts.command,
    ["rev-parse", `${implementationCommit}^{tree}`],
    "implementation tree",
  );
  const contents = evidenceContents(
    baseline,
    opts.work_order,
    implementationCommit,
    implementationTree,
    intendedPaths,
    prepared.evidence,
  );
  const evidence = { ...contents, digest: k.kernelDigest(contents) };
  return evidence;
}

export async function readKernelRepositoryEvidence(
  directory: string,
): Promise<KernelRepositoryEvidence> {
  const evidence = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "repository-evidence.json"),
      "canonical repository evidence",
    ),
  ) as KernelRepositoryEvidence;
  const { digest, ...contents } = evidence;
  if (k.kernelDigest(contents) !== digest)
    throw new Error("Canonical repository evidence is invalid");
  return evidence;
}

export async function listKernelRepositoryEvidence(
  command: CommandContext,
  record: KernelRecord,
): Promise<KernelRepositoryEvidence[]> {
  const root = path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "exchanges",
    record.aggregate.id,
  );
  const evidence: KernelRepositoryEvidence[] = [];
  for (const mutationId of Object.keys(record.aggregate.mutation_receipts).toSorted()) {
    const match = /^result:sha256:([a-f0-9]{64})$/u.exec(mutationId);
    if (!match) continue;
    try {
      const candidate = await readKernelRepositoryEvidence(path.join(root, match[1]!));
      if (
        candidate.task_id !== record.aggregate.id ||
        record.aggregate.work_items[candidate.work_item_id]?.state !== "COMPLETED"
      )
        continue;
      evidence.push(candidate);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return evidence.toSorted(
    (left, right) =>
      left.task_revision - right.task_revision ||
      left.work_order_id.localeCompare(right.work_order_id),
  );
}
