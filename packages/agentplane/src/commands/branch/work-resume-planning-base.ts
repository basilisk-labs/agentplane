import path from "node:path";
import { lstat, readdir } from "node:fs/promises";
import { gitEnv, listWorktrees, parseTaskIdFromBranch } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  createTaskPlanRevision,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  taskExecutionBaseFromExtensions,
} from "@agentplaneorg/core/tasks";
import { loadTaskRunnerDiagnosticInspection } from "../../runner/usecases/task-run-inspect.js";
import { runtimeFrom } from "../../adapters/task-backend/task-centric-backend-runtime.js";
import { LocalBackend } from "../../backends/task-backend.js";
import {
  readPlanningBaseCandidate,
  archivePlanningBaseCandidate,
} from "./work-resume-candidate.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";
import { buildTaskResumeContext } from "../task/handoff.shared.js";
import { type CommandContext } from "../shared/task-backend.js";

function refuse(reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Planning base recovery refused: ${reason}.`,
  });
}

async function git(root: string, args: string[]): Promise<string> {
  return (await execFileAsync("git", args, { cwd: root, env: gitEnv() })).stdout.trim();
}

/** Explicit recovery only. Normal workspace preparation retains its frozen base. */
export async function recoverWorkPlanningBase(opts: {
  ctx: CommandContext;
  taskId: string;
  apply: boolean;
  expectedToken?: string;
}) {
  const command = await loadTaskCommandContext({ ctx: opts.ctx, taskIds: [opts.taskId] });
  const ctx = command.command;
  const task = command.primary_task;
  if (!(ctx.taskBackend instanceof LocalBackend)) refuse("local atomic Task storage is required");
  const backend = ctx.taskBackend;
  const root = ctx.resolvedProject.gitRoot;
  const registered = await listWorktrees(root);
  const owners = registered.filter(
    (entry) =>
      entry.branch &&
      parseTaskIdFromBranch(ctx.config.branch.task_prefix, entry.branch) === task.id,
  );
  if (owners.length !== 1 || path.resolve(owners[0]!.path) !== path.resolve(root))
    refuse("exactly one authoritative Task worktree is required");
  const primary = registered[0];
  if (!primary || path.resolve(primary.path) === path.resolve(root))
    refuse("recovery requires a dedicated Task worktree");
  const branch = await git(root, ["branch", "--show-current"]);
  if (parseTaskIdFromBranch(ctx.config.branch.task_prefix, branch) !== task.id)
    refuse("branch ownership mismatch");
  const base = taskExecutionBaseFromExtensions(task.extensions);
  if (!base || base.source !== "creation_checkout")
    refuse("explicit or unknown base provenance cannot be changed");
  if (
    task.status !== "TODO" ||
    task.commit ||
    task.verification?.state === "ok" ||
    (task.verification?.attempts ?? 0) > 0
  )
    refuse("Task has already started");
  if (!Number.isInteger(task.revision) || (task.revision ?? 0) < 1)
    refuse("Task revision is unavailable");
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const plan = aggregate?.current_plan;
  if (
    !plan ||
    plan.approval.state !== "approved" ||
    plan.approval.approved_digest !== plan.digest ||
    createTaskPlanRevision({
      proposal: plan.proposal,
      revision: plan.revision,
      created_at: plan.created_at,
    }).digest !== plan.digest ||
    task.plan_approval?.state !== "approved"
  )
    refuse("an approved structured plan is required");
  if (
    Object.values(aggregate.work_items).some(
      (item) =>
        !["READY", "PLANNED"].includes(item.state) ||
        item.revision !== 1 ||
        item.attempt !== 0 ||
        item.claim_id !== null ||
        item.output_manifests.length > 0 ||
        item.validation_result !== null ||
        item.last_failure !== null,
    ) ||
    aggregate.final_validation
  )
    refuse("WorkItem execution or validation already exists");
  const runtime = runtimeFrom(task);
  if (runtime.leases.length || runtime.pending_effects.length)
    refuse("execution leases or effects already exist");
  const baseline = plan.proposal.planning_baseline.git;
  if (baseline.kind !== "commit") refuse("the approved planning snapshot has no commit identity");
  const target = baseline.sha;
  const head = await git(root, ["rev-parse", "HEAD"]);
  if (head !== base.base_sha && head !== target) refuse("worktree contains commits after creation");
  await git(root, ["merge-base", "--is-ancestor", base.base_sha, target]).catch(() =>
    refuse("planning base is not a descendant of the creation base"),
  );
  await git(root, ["merge-base", "--is-ancestor", target, base.base_ref]).catch(() =>
    refuse("planning snapshot is not on the development base"),
  );
  const repositoryIdentity = await resolveLogicalRepositoryIdentity({ git_root: root, task });
  if (!base.repository_identity || base.repository_identity !== repositoryIdentity)
    refuse("repository identity mismatch");
  const readme = `${ctx.config.paths.workflow_dir}/${task.id}/README.md`;
  const taskDir = path.dirname(path.join(root, readme));
  const stat = await lstat(path.join(root, readme));
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1)
    refuse("Task README must be an ordinary unaliased file");
  const assertNoRunner = async () => {
    const inspection = await loadTaskRunnerDiagnosticInspection({
      ctx,
      cwd: root,
      task_id: task.id,
    });
    if (
      inspection.run ||
      inspection.control.active_claim ||
      inspection.control.recovery_lease ||
      inspection.control.task_runner_outcome
    )
      refuse("runner authority or history already exists");
  };
  await assertNoRunner();
  const resume = await buildTaskResumeContext({
    ctx,
    cwd: root,
    task_id: task.id,
    task,
    fresh_head: true,
  });
  if (resume.pr_branch || resume.runner.run_id || resume.runner.status || resume.latest_handoff)
    refuse("runner, handoff or provider state already exists");
  const identity = {
    schema_version: 1,
    task_id: task.id,
    revision: task.revision,
    branch,
    worktree: root,
    repository_identity: repositoryIdentity,
    from_sha: base.base_sha,
    observed_head: head,
    target_sha: target,
    plan_digest: plan.digest,
  };
  // A never-started worktree has only its transported README. Reject unknown artifacts.
  const assertPristine = async () => {
    const entries = await readdir(taskDir);
    const temps = entries.filter((name) => /^README\.md\.tmp-[a-f0-9]{32}$/.test(name));
    if (temps.length > 8 || entries.some((name) => name !== "README.md" && !temps.includes(name)))
      refuse("Task execution artifacts already exist");
    const candidates = await Promise.all(
      temps.map((name) => readPlanningBaseCandidate(root, path.join(taskDir, name), identity)),
    );
    const status = await git(root, ["status", "--porcelain=v1", "--untracked-files=all"]);
    const allowed = new Set([
      `?? ${readme}`,
      ...temps.map((name) => `?? ${path.posix.dirname(readme)}/${name}`),
      `?? ${ctx.config.paths.workflow_dir}/.${task.id}.README.md.lock`,
    ]);
    const unexpected = status
      .split("\n")
      .filter(Boolean)
      .filter((line) => !allowed.has(line));
    if (unexpected.length)
      refuse(`tracked or unrelated untracked changes exist: ${unexpected.slice(0, 8).join(", ")}`);
    // Git must not replace the transported Task document during the fast-forward.
    if ((await git(root, ["ls-tree", "--name-only", target, "--", path.dirname(readme)])) !== "")
      refuse("target snapshot contains Task-owned paths");
    return candidates;
  };
  const orphans = await assertPristine();
  const token = taskCentricDigest(identity);
  if (base.base_sha === target) {
    const previous = task.extensions?.task_planning_base_recovery;
    if (
      !previous ||
      typeof previous !== "object" ||
      Array.isArray(previous) ||
      (previous as Record<string, unknown>).plan_digest !== plan.digest ||
      (previous as Record<string, unknown>).target_sha !== target
    )
      refuse("no planning base advancement is required");
    return { ...identity, token, status: "already_applied" };
  }
  if (!opts.apply)
    return { ...identity, token, status: head === target ? "ready_to_reconcile" : "ready" };
  if (opts.expectedToken !== token) refuse("stale or missing recovery token; inspect again");
  const next = {
    ...task,
    extensions: {
      ...task.extensions,
      task_execution_context: { ...base, base_sha: target },
      task_planning_base_recovery: { ...identity, token, state: "applied" },
    },
  };
  // Existing native persistence holds the Task lock and verifies its revision before Git.
  // If Git lands but publication is interrupted, the original Task and approved plan still
  // bind both SHAs. A fresh inspection can reconcile HEAD=target without another Git effect.
  await backend.writeTaskWithReceipt(next, { expectedRevision: task.revision }, async () => {
    const candidates = await assertPristine();
    if (candidates.length !== orphans.length + 1) refuse("unexpected Task publication candidates");
    const commonDir = await git(root, ["rev-parse", "--path-format=absolute", "--git-common-dir"]);
    for (const candidate of orphans)
      await archivePlanningBaseCandidate({ root, commonDir, taskId: task.id, identity, candidate });
    await assertNoRunner();
    if (
      (await git(root, ["rev-parse", "HEAD"])) !== head ||
      (await git(root, ["branch", "--show-current"])) !== branch
    )
      refuse("workspace changed before application");
    const currentResume = await buildTaskResumeContext({
      ctx,
      cwd: root,
      task_id: task.id,
      task,
      fresh_head: true,
    });
    if (
      currentResume.pr_branch ||
      currentResume.runner.run_id ||
      currentResume.runner.status ||
      currentResume.latest_handoff
    )
      refuse("execution appeared before application");
    if (head !== target)
      await git(root, ["merge", "--ff-only", "--no-edit", "--no-overwrite-ignore", target]);
    if ((await git(root, ["rev-parse", "HEAD"])) !== target)
      refuse("Git advancement is not confirmed");
    await assertPristine();
    await assertNoRunner();
  });
  return { ...identity, token, status: "applied" };
}
