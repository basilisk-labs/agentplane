import path from "node:path";
import { readFile } from "node:fs/promises";
import {
  digestSupervisorEpisodeValue,
  advanceSupervisorExecutionEpisodeState,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  taskCentricDigest,
  parseTaskReadme,
  renderTaskReadme,
  mergeTaskDoc,
} from "@agentplaneorg/core/tasks";
import { runProcess } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { isRecord } from "../../shared/guards.js";
import { loadExistingRunnerExecution } from "../../runner/usecases/task-run-lifecycle-shared.js";
import type { ExecutedTaskRunnerExecution } from "../../runner/usecases/task-run-execution.js";
import { resolveSupervisorTaskRunnerPaths } from "../../runner/task-run-paths.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { DirectRepositoryStatus } from "./direct-task-finalization.js";
import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import { taskDataToFrontmatter } from "../shared/task-backend.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import {
  projectObservedTaskExecutionContract,
  observedExternalEffectsFromRunnerResult,
} from "./task-execution-contract-observation.js";
import { buildTaskStatusTransition } from "./shared/workflow-transition-service.js";
import type { TaskExternalEffect } from "@agentplaneorg/core/tasks";
import { workflowTaskFingerprintComponent } from "../shared/workflow-step-fingerprint.js";
import { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import {
  resolveConflictResolutionSnapshot,
  prepareConflictResolutionTree,
  assertConflictResolutionCommit,
} from "../pr/conflict-rework-merge.js";
import { buildDirectImplementationEvidenceArtifact } from "./direct-task-finalization.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { readCommitInfo } from "./shared.js";
import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";
import { journalProjection } from "./direct-task-supervisor-result.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";
import { projectExecutedTaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import type { SupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";
import type { BranchEpisodeOutcome } from "./branch-task-supervisor.js";
import { cmdTaskSetStatus } from "./set-status.js";
import { requiresImplementationReworkReopen } from "../shared/task-scope-extension-request.js";

export type ManagedConflictApplicationContext = {
  run_id: string;
  work_order_id: string;
  result_digest: string;
  execution_base_commit: string | null;
  execution_baseline_status: DirectRepositoryStatus | null;
  execution_lifecycle_event_count: number;
  accepted_task: TaskData;
  accepted_authority: ReturnType<typeof conflictApplicationAuthority>;
  status_at: string;
};

export function conflictApplicationAuthority(decision: TaskRouteDecision) {
  const fingerprint = decision.workflowStep.preconditionFingerprint;
  return {
    task_id: fingerprint.task_id,
    task_revision: fingerprint.task_revision,
    task: fingerprint.components.task,
    backend_projection: fingerprint.components.backend_projection,
    policy: fingerprint.components.policy,
    blueprint: fingerprint.components.blueprint,
    knowledge: fingerprint.components.knowledge,
    provider: decision.prFlow?.providerObservation ?? null,
  };
}

export function managedImplementationStatusNote(commit: string): string {
  return (
    `Implementation committed: ${commit.slice(0, 12)}. ` +
    "CLI recorded the observed branch EXECUTOR receipt and committed work-unit identity."
  );
}

export function managedConflictEvidenceCommitMessage(opts: {
  context: ManagedConflictApplicationContext;
  result: ExecutedTaskRunnerExecution["result"];
  decision: TaskRouteDecision;
}): string {
  const resultDigest = taskCentricDigest({
    run_id: opts.context.run_id,
    work_order: opts.context.work_order_id,
    result: opts.result,
  });
  const postcondition = digestSupervisorEpisodeValue({
    authority: conflictApplicationAuthority(opts.decision),
    implementation: opts.context,
  });
  return (
    `🚧 ${opts.context.accepted_task.id.split("-").at(-1)} task: record managed implementation evidence\n\n` +
    `AgentPlane-Result: ${resultDigest}\nAgentPlane-Postcondition: ${postcondition}`
  );
}

type ManagedConflictTaskApplication = {
  implementation_commit: string;
  stage: "reconciled" | "applied";
  artifacts_committed: boolean;
};

export function managedConflictTaskPostconditions(opts: {
  context: ManagedConflictApplicationContext;
  checkout: string;
  workflow_dir: string;
  commit: NonNullable<TaskData["commit"]>;
  changed_paths: readonly string[];
  observed_external_effects: readonly TaskExternalEffect[];
}): { reconciled: TaskData; applied: TaskData } {
  const persisted = (current: TaskData, next: TaskData): TaskData => {
    const projected = projectTaskCentricCompatibilityMutation({ current, next });
    return taskRecordToData({
      id: current.id,
      frontmatter: {
        ...taskDataToFrontmatter(projected),
        revision: (current.revision ?? 1) + 1,
      } as never,
      body: projected.doc ?? "",
      readmePath: path.join(opts.checkout, opts.workflow_dir, current.id, "README.md"),
    });
  };
  const projection = projectObservedTaskExecutionContract({
    task: opts.context.accepted_task,
    workflow_dir: opts.workflow_dir,
    changed_paths: opts.changed_paths,
    observed_external_effects: opts.observed_external_effects,
    preserved_commit: opts.commit.hash,
  });
  if (projection.escalated || projection.episodeAuthorityViolations.length > 0) {
    throw new Error("Managed conflict Task postcondition exceeds accepted authority.");
  }
  const reconciled = projection.nextTask
    ? persisted(opts.context.accepted_task, projection.nextTask)
    : opts.context.accepted_task;
  const note = managedImplementationStatusNote(opts.commit.hash);
  const transition = buildTaskStatusTransition({
    task: reconciled,
    at: opts.context.status_at,
    toStatus: "DOING",
    eventAuthor: "SUPERVISOR",
    updatedBy: "SUPERVISOR",
    note,
    comment: { author: "SUPERVISOR", body: note },
    commit: opts.commit,
  });
  return { reconciled, applied: persisted(reconciled, transition.nextTask) };
}

export function hasPendingManagedConflict(journal: SupervisorExecutionEpisodeJournal): boolean {
  return (
    journal.cursor.phase !== "ready" &&
    journal.operations.at(-1)?.authority_ref ===
      `branch-pr:${journal.task_id}:agent.provider_conflict_rework`
  );
}

export async function proveManagedConflictTaskApplication(opts: {
  command: CommandContext;
  checkout: string;
  decision: TaskRouteDecision;
  context: ManagedConflictApplicationContext;
  executed: ExecutedTaskRunnerExecution;
}): Promise<ManagedConflictTaskApplication> {
  const { context, executed, checkout, command } = opts;
  const currentAuthority = conflictApplicationAuthority(opts.decision);
  if (
    taskCentricDigest({ ...currentAuthority, task: null, task_revision: null }) !==
    taskCentricDigest({ ...context.accepted_authority, task: null, task_revision: null })
  ) {
    throw new Error("Managed conflict recovery non-Task authority changed.");
  }
  const order = executed.bundle.work_order;
  if (!order || !context.execution_base_commit || !context.execution_baseline_status) {
    throw new Error("Managed conflict application proof has no original semantic context.");
  }
  const conflict = resolveConflictReworkSemanticInput({
    task_id: order.task.id,
    checkout,
    head: order.state_fingerprint.git_head,
    writable_roots: order.authority.writable_roots,
    required_inputs: order.required_inputs,
  });
  if (!conflict)
    throw new Error("Managed conflict application proof has no bound provider context.");
  const git = async (args: string[]) =>
    await runProcess({ command: "git", args, cwd: checkout, env: gitProofEnv() });
  const [headResult, branchResult, baseResult] = await Promise.all([
    git(["rev-parse", "HEAD"]),
    git(["symbolic-ref", "--short", "HEAD"]),
    git(["rev-parse", "--verify", conflict.provider.base]),
  ]);
  const head = headResult.stdout.trim();
  const branch = branchResult.stdout.trim();
  const base = baseResult.stdout.trim();
  if (branch !== conflict.task_worktree.branch || base !== conflict.provider.base_sha) {
    throw new Error("Managed conflict application proof branch or base changed.");
  }
  const resultDigest = taskCentricDigest({
    run_id: context.run_id,
    work_order: order.work_order_id,
    result: executed.result,
  });
  const messageResult = await git(["show", "-s", "--format=%B", head]);
  const message = messageResult.stdout;
  const expectedMessage = managedConflictEvidenceCommitMessage({
    context,
    result: executed.result,
    decision: opts.decision,
  });
  const artifactsCommitted = message.split("\n")[0] === expectedMessage.split("\n")[0];
  let mergeHead = head;
  if (artifactsCommitted) {
    const parentResult = await git(["show", "-s", "--format=%P", head]);
    const parents = parentResult.stdout.trim().split(" ");
    const proofTrailers = (text: string) =>
      text.split("\n").filter((line) => /^AgentPlane-(?:Result|Postcondition):/u.test(line));
    if (
      parents.length !== 1 ||
      taskCentricDigest(proofTrailers(message)) !==
        taskCentricDigest(proofTrailers(expectedMessage))
    ) {
      throw new Error("Managed conflict artifact commit does not match the completed result.");
    }
    mergeHead = parents[0]!;
  }
  const snapshot = await resolveConflictResolutionSnapshot({
    cwd: checkout,
    task_id: order.task.id,
    baseline: context.execution_base_commit,
    head: mergeHead,
    base,
    result_digest: resultDigest,
  });
  const prefix = `${command.config.paths.workflow_dir.replaceAll("\\", "/")}/${order.task.id}/`;
  const roots = order.authority.writable_roots.map(
    (root) => path.relative(checkout, root).replaceAll(path.sep, "/") || ".",
  );
  const prepared = await prepareConflictResolutionTree({
    cwd: checkout,
    task_head: context.execution_base_commit,
    resolution_snapshot: snapshot,
    base,
    merge_base: conflict.local.merge_base_sha,
    allowed_path: (file) =>
      file.startsWith(prefix) ||
      roots.some((root) => root === "." || file === root || file.startsWith(`${root}/`)),
  });
  await assertConflictResolutionCommit({
    cwd: checkout,
    task_id: order.task.id,
    head: mergeHead,
    resolution_snapshot: snapshot,
    base,
    tree: prepared.tree,
    semantic_result_digest: resultDigest,
  });
  const changed = await git(["diff", "--name-only", "-z", base, mergeHead]);
  const info = await readCommitInfo(checkout, mergeHead);
  const expected = managedConflictTaskPostconditions({
    context,
    checkout,
    workflow_dir: command.config.paths.workflow_dir,
    commit: { hash: info.hash, message: info.message },
    changed_paths: changed.stdout.split("\0").filter(Boolean),
    observed_external_effects: observedExternalEffectsFromRunnerResult(executed.result),
  });
  const actual = await command.taskBackend.getTask(order.task.id);
  const stage =
    taskCentricDigest(actual) === taskCentricDigest(expected.applied)
      ? "applied"
      : taskCentricDigest(actual) === taskCentricDigest(expected.reconciled)
        ? "reconciled"
        : null;
  if (!stage || (artifactsCommitted && stage !== "applied")) {
    throw new Error("Managed conflict recovery Task differs from its exact applied postcondition.");
  }
  const readmePath = `${prefix}README.md`;
  const evidencePath = `${prefix}supervision/implementation-evidence.json`;
  if (artifactsCommitted) {
    const artifactPaths = await git(["diff", "--name-only", "-z", mergeHead, head]);
    const paths = artifactPaths.stdout.split("\0").filter(Boolean);
    if (paths.some((file) => file !== readmePath && file !== evidencePath)) {
      throw new Error("Managed conflict artifact commit contains foreign changes.");
    }
  }
  const read = (file: string) =>
    readContainedStableTextNoFollow({
      repository_root: checkout,
      file_path: path.join(checkout, file),
      max_bytes: 16 * 1024 * 1024,
      label: "managed conflict application proof",
    });
  const originalReadme = await git(["show", `${snapshot}:${readmePath}`]);
  const original = parseTaskReadme(originalReadme.stdout);
  const expectedReadme = renderTaskReadme(
    { ...original.frontmatter, ...taskDataToFrontmatter(expected[stage]) },
    mergeTaskDoc(original.body, expected[stage].doc ?? ""),
  );
  if (
    (await read(readmePath)) !==
    (expectedReadme.endsWith("\n") ? expectedReadme : `${expectedReadme}\n`)
  ) {
    throw new Error("Managed conflict recovery README differs from its exact applied projection.");
  }
  const [committed, staged, paths] = await Promise.all([
    git(["diff", "--check", `${base}..${mergeHead}`]),
    git(["diff", "--cached", "--check"]),
    git(["diff", "--name-status", "--diff-filter=ACDMRTUXB", `${base}..${mergeHead}`]),
  ]);
  const evidence = buildDirectImplementationEvidenceArtifact({
    task_id: order.task.id,
    execution_base_commit: base,
    implementation_commit: mergeHead,
    execution_baseline_status: context.execution_baseline_status,
    committed_diff_stdout: committed.stdout,
    staged_diff_stdout: staged.stdout,
    commit_paths_stdout: paths.stdout,
    // The merge owner observed a clean tree before the evidence writer ran.
    final_status: { command: "git status --short --untracked-files=all", lines: [] },
  });
  if (taskCentricDigest(JSON.parse(await read(evidencePath))) !== taskCentricDigest(evidence)) {
    throw new Error("Managed conflict recovery evidence differs from its original observation.");
  }
  const status = await git(["status", "--porcelain", "-z", "--untracked-files=all"]);
  if (artifactsCommitted && status.stdout !== "")
    throw new Error("Managed conflict recovery found changes after completed artifacts.");
  for (const entry of status.stdout.split("\0").filter(Boolean)) {
    const file = entry.slice(3);
    if ((file !== readmePath && file !== evidencePath) || /[RC]/u.test(entry.slice(0, 2))) {
      throw new Error("Managed conflict recovery found foreign workspace changes.");
    }
    if (!entry.startsWith(" ") && !entry.startsWith("?")) {
      const stagedArtifact = await git(["show", `:${file}`]);
      if (stagedArtifact.stdout !== (await read(file))) {
        throw new Error("Managed conflict recovery found a foreign staged artifact.");
      }
    }
  }
  return { implementation_commit: mergeHead, stage, artifacts_committed: artifactsCommitted };
}

/** Load only the run named by the durable provider intent. This never executes a provider. */
export async function loadManagedConflictRecovery(opts: {
  command: CommandContext;
  checkout: string;
  task_id: string;
  journal: SupervisorExecutionEpisodeJournal;
  decision: TaskRouteDecision;
}): Promise<{
  executed: ExecutedTaskRunnerExecution;
  applicationContext: ManagedConflictApplicationContext;
  issuedDecision: TaskRouteDecision;
  taskApplication: ManagedConflictTaskApplication | null;
}> {
  const operation = opts.journal.operations.at(-1);
  if (
    !hasPendingManagedConflict(opts.journal) ||
    opts.journal.task_id !== opts.task_id ||
    opts.journal.status !== "running" ||
    opts.journal.cursor.phase !== "completed" ||
    operation?.status !== "completed" ||
    !operation.work_order_ref ||
    !operation.effect_ref ||
    operation.operation_key !== opts.journal.cursor.operation_key
  ) {
    throw new Error("Managed conflict recovery requires its completed provider intent.");
  }
  const runId = path.basename(path.dirname(operation.work_order_ref));
  const paths = await resolveSupervisorTaskRunnerPaths({
    git_root: opts.command.resolvedProject.gitRoot,
    workflow_dir: opts.command.config.paths.workflow_dir,
    common_git_dir: await resolveCommandGitCommonDir(opts.command),
    task_id: opts.task_id,
    run_id: runId,
  });
  if (
    operation.work_order_ref !== paths.bundle_path ||
    operation.effect_ref !== paths.result_path
  ) {
    throw new Error("Managed conflict recovery references a foreign runner artifact.");
  }
  const loaded = await loadExistingRunnerExecution({
    ctx: opts.command,
    cwd: opts.checkout,
    task_id: opts.task_id,
    run_id: runId,
    require_task_doing: false,
  });
  const order = loaded.bundle.work_order;
  const issuedDecision = loaded.bundle.route_decision;
  const state = loaded.state.state_fingerprint;
  const result = loaded.state.result;
  if (
    !order ||
    !issuedDecision ||
    order.task.id !== opts.task_id ||
    issuedDecision.workflowStep.id !== "agent.provider_conflict_rework" ||
    order.state_fingerprint.digest !== operation.precondition_fingerprint_digest ||
    operation.authority_digest !== operation.precondition_fingerprint_digest ||
    loaded.invocation.bundle_path !== paths.bundle_path ||
    loaded.invocation.result_path !== paths.result_path ||
    loaded.state.status !== "success" ||
    result?.status !== "success" ||
    state?.outcome !== "accepted" ||
    !state.state_before ||
    !state.state_after ||
    !state.precondition
  ) {
    throw new Error("Managed conflict recovery has no matching accepted runner result.");
  }
  const completion = {
    run_id: loaded.invocation.run_id,
    work_order_id: loaded.invocation.work_order_id,
    receipt: result.execution_receipt ?? null,
    semantic_status: result.semantic_result?.value.status ?? null,
  };
  if (digestSupervisorEpisodeValue(completion) !== operation.result_digest) {
    throw new Error("Managed conflict recovery result differs from its completed intent.");
  }
  const input: unknown = JSON.parse(
    await readFile(path.join(loaded.invocation.run_dir, "implementation-context.json"), "utf8"),
  );
  const currentProgress = digestSupervisorEpisodeValue({
    authority: conflictApplicationAuthority(opts.decision),
    implementation: input,
  });
  const historicalProgress = isRecord(input)
    ? digestSupervisorEpisodeValue({
        authority: input.accepted_authority,
        implementation: input,
      })
    : null;
  if (
    currentProgress !== operation.progress_digest &&
    historicalProgress !== operation.progress_digest
  ) {
    throw new Error("Managed conflict recovery authority or implementation context changed.");
  }
  if (
    !isRecord(input) ||
    input.run_id !== runId ||
    input.work_order_id !== order.work_order_id ||
    input.result_digest !== taskCentricDigest(result) ||
    input.execution_base_commit !== order.state_fingerprint.git_head ||
    !isRecord(input.execution_baseline_status) ||
    input.execution_baseline_status.command !== "git status --short --untracked-files=all" ||
    !Array.isArray(input.execution_baseline_status.lines) ||
    !input.execution_baseline_status.lines.every((line: unknown) => typeof line === "string") ||
    !Number.isSafeInteger(input.execution_lifecycle_event_count) ||
    Number(input.execution_lifecycle_event_count) < 0 ||
    !isRecord(input.accepted_task) ||
    input.accepted_task.id !== opts.task_id ||
    !isRecord(input.accepted_authority) ||
    !isRecord(input.accepted_authority.task) ||
    input.accepted_task.revision !== input.accepted_authority.task_revision ||
    taskCentricDigest(workflowTaskFingerprintComponent(input.accepted_task as TaskData)) !==
      input.accepted_authority.task.digest ||
    typeof input.status_at !== "string" ||
    !Number.isFinite(Date.parse(input.status_at)) ||
    new Date(input.status_at).toISOString() !== input.status_at
  ) {
    throw new Error(
      "Managed conflict recovery has no bound initial Git and lifecycle observation.",
    );
  }
  const applicationContext = input as ManagedConflictApplicationContext;
  const executed: ExecutedTaskRunnerExecution = {
    ...loaded,
    result,
    precondition_fingerprint: state.precondition_fingerprint,
    precondition_policy: state.precondition_policy,
    state_before: state.state_before,
    state_after: state.state_after,
    precondition: state.precondition,
  };
  const taskApplication =
    currentProgress === operation.progress_digest
      ? null
      : await proveManagedConflictTaskApplication({
          ...opts,
          context: applicationContext,
          executed,
        });
  return {
    issuedDecision,
    applicationContext,
    executed,
    taskApplication,
  };
}

/** The caller holds the supervisor lease and has proved the already-applied Task and artifacts. */
export async function finishManagedConflictTaskRecovery(opts: {
  command: CommandContext;
  checkout: string;
  task_id: string;
  journal: SupervisorExecutionEpisodeJournal;
  store: SupervisorEpisodeStore;
  executed: ExecutedTaskRunnerExecution;
  implementation_commit: string;
  context: ManagedConflictApplicationContext;
  allow_unverified_receipt: boolean;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome> {
  const observed = observeDirectExecutor(
    projectExecutedTaskRunnerLifecycleResult({
      task_id: opts.task_id,
      execution: opts.executed,
    }),
    { allow_unverified_receipt: opts.allow_unverified_receipt },
  );
  if ("stop" in observed) throw new Error(observed.reason);
  const prove = async () =>
    await proveManagedConflictTaskApplication({
      ...opts,
      decision: await opts.decide(),
    });
  let application = await prove();
  if (application.implementation_commit !== opts.implementation_commit)
    throw new Error("Managed conflict implementation changed before recovery.");
  const alreadyCommitted = application.artifacts_committed;
  if (application.stage === "reconciled") {
    const step = opts.executed.bundle.route_decision?.workflowStep;
    if (step?.kind !== "agent_episode")
      throw new Error("Managed conflict recovery lost its issued semantic episode.");
    const reopen = requiresImplementationReworkReopen({
      purpose: step.episode.purpose,
      task_status: opts.context.accepted_task.status,
      work_item_id: opts.executed.bundle.work_order?.task.work_item_id ?? null,
      work_item_is_required: false,
    });
    await cmdTaskSetStatus({
      ctx: opts.command,
      cwd: opts.checkout,
      taskId: opts.task_id,
      status: "DOING",
      author: "SUPERVISOR",
      body: managedImplementationStatusNote(opts.implementation_commit),
      at: opts.context.status_at,
      commit: opts.implementation_commit,
      force: reopen,
      yes: reopen,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    application = await prove();
  }
  if (!application.artifacts_committed) {
    await commitBranchSupervisorTaskArtifacts({
      command: opts.command,
      cwd: opts.checkout,
      task_id: opts.task_id,
      message: managedConflictEvidenceCommitMessage({
        context: opts.context,
        result: opts.executed.result,
        decision: await opts.decide(),
      }),
    });
    application = await prove();
  }
  if (!application.artifacts_committed || application.stage !== "applied")
    throw new Error("Managed conflict artifact finalization has no exact completion proof.");
  const decision = await opts.decide();
  const journal = advanceSupervisorExecutionEpisodeState({
    journal: opts.journal,
    state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
    route_observation: { step_id: decision.workflowStep.id },
  });
  await opts.store.write(journal);
  return {
    status: "completed",
    decision,
    journal: journalProjection(journal, opts.store.path),
    executor: { ...observed.executor, implementation_commit: opts.implementation_commit },
    provider_episodes: 0,
    lifecycle_calls: alreadyCommitted ? 0 : 1,
    executor_lifecycle_event_delta: 0,
  };
}
