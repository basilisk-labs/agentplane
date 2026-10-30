import {
  completedRepairScopeRequest,
  authenticateCompletedScopeSource as authenticateScopeSource,
} from "../shared/completed-repair-scope-source.js";
import path from "node:path";
import { gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { LocalBackend, type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  COMPLETED_SCOPE_ADMISSIONS,
  completedScopeAdmissionIds,
  completedScopeBytesDigest,
  completedScopeProofId,
  completedScopeProofDirectory,
  decodeCompletedScopeTask,
  readCompletedScopeAdmission,
  writeCompletedScopeFile,
  readCompletedScopePrivateFile,
  validatePreparedCompletedScope,
  completedScopeObservedResult,
  readCompletedScopeReconcileRequest,
  completedScopeApprovalComment,
  type CompletedScopeAdmission,
  type CompletedScopeIdentity,
  type CompletedScopeSource,
} from "../../adapters/task-backend/completed-scope-admission.js";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { completedScopeIntake } from "../../adapters/task-backend/kernel-scope-intake.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  withSupervisorExecutionAdmissionFence,
} from "../shared/supervisor-execution-episode.js";
import {
  parseTaskScopeExtensionRequestState,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request-state.js";
import {
  resolveCommandGitCommonDir,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  resolveTaskBranchFromContext,
  resolveAuthoritativeTaskWorktree,
  readCompletedScopeCommandSource,
} from "../shared/task-backend-branch-snapshot.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";

function fail(reason = "native blocker/source"): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Completed repair scope requires the exact consumed native blocker and unchanged checkout (${reason}).`,
  });
}

async function readerContext(command: CommandContext) {
  return {
    git_root: command.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(command),
    workflow_dir: command.config.paths.workflow_dir,
  };
}
async function authenticateCompletedScopeSource(
  command: CommandContext,
  task: TaskData,
  source: CompletedScopeSource,
) {
  return await authenticateScopeSource(await readerContext(command), task, source);
}
/** Controller entry before cold reads: exact own intent recovery and typed legacy recovery only. */
export async function tryCompletedScopeAdmission(opts: {
  ctx: CommandContext;
  taskId: string;
  scopeRoots: string[];
  repositoryEffects: string[];
  requestDigest: string;
  stateScopeDigest?: string;
  stateFingerprint?: string;
  reconcileRequest?: string;
  by: string;
  legacy_afterimage: (command: CommandContext, beforeRaw: string, partialRaw: string) => string;
  commit: (command: CommandContext) => Promise<void>;
}): Promise<boolean> {
  if (opts.ctx.backendId !== "local") {
    if (opts.reconcileRequest) fail("native local owner required");
    return false;
  }
  // The Node command and context catalogs can contain distinct constructor identities.
  // Reload through this module's native loader before testing identity or minting a permit.
  const nativeContext = await loadCommandContext({
    cwd: opts.ctx.resolvedProject.gitRoot,
    rootOverride: null,
  });
  if (!(nativeContext.taskBackend instanceof LocalBackend)) fail("native local owner required");
  const branch = await resolveTaskBranchFromContext({ ctx: nativeContext, taskId: opts.taskId });
  const owner = branch
    ? await resolveAuthoritativeTaskWorktree({
        ctx: nativeContext,
        taskId: opts.taskId,
        branch,
        requireRegistration: true,
      })
    : null;
  const command =
    owner && path.resolve(owner.path) !== path.resolve(nativeContext.resolvedProject.gitRoot)
      ? await loadCommandContext({ cwd: owner.path, rootOverride: null })
      : nativeContext;
  if (
    command.taskBackend instanceof LocalBackend &&
    command.taskBackend.root !==
      path.resolve(command.resolvedProject.gitRoot, command.config.paths.workflow_dir)
  )
    fail("native Task store/source path mismatch");
  let source: CompletedScopeSource;
  try {
    source = await readCompletedScopeCommandSource(command, opts.taskId);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT" && !opts.reconcileRequest) return false;
    throw error;
  }
  const initial = decodeCompletedScopeTask(source.raw, source.readme_path, opts.taskId);
  const record = initial.extensions?.task_kernel as
    { aggregate?: { state?: string }; digest?: string } | undefined;
  if (record?.aggregate?.state !== "COMPLETED") {
    if (opts.reconcileRequest) fail("completed Kernel required");
    return false;
  }
  if (opts.by !== "USER" || !/^sha256:[a-f0-9]{64}$/u.test(opts.requestDigest))
    fail("explicit USER authority");
  const reconcile = opts.reconcileRequest
    ? await readCompletedScopeReconcileRequest(opts.reconcileRequest, opts.stateScopeDigest)
    : null;
  if (!reconcile && (opts.stateScopeDigest ?? opts.stateFingerprint) !== opts.requestDigest)
    fail("state scope/request binding");
  if (
    reconcile &&
    (reconcile.task_id !== opts.taskId ||
      reconcile.repository_identity !== source.repository_identity ||
      reconcile.kernel_digest !== record.digest ||
      reconcile.request_digest !== opts.requestDigest)
  )
    fail("reconciliation identity");
  const roots = [...new Set(opts.scopeRoots)].toSorted(),
    effects = [...new Set(opts.repositoryEffects)].toSorted();
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: source.git_root,
    common_git_dir: source.common_git_dir,
    task_id: opts.taskId,
  });
  const fenced = await withSupervisorExecutionAdmissionFence({
    journal_path: journalPath,
    run: async () => {
      const main = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readCompletedScopePrivateFile(source.common_git_dir, journalPath)),
      );
      if (main.cursor.phase === "intent_recorded") fail("another native effect is pending");
      const currentSource = await readCompletedScopeCommandSource(command, opts.taskId);
      if (currentSource.raw !== source.raw) fail("source changed before fence");
      const current = decodeCompletedScopeTask(source.raw, source.readme_path, opts.taskId);
      const ids = completedScopeAdmissionIds(current);
      let admission: CompletedScopeAdmission | null = null;
      const last = ids.at(-1);
      if (last) {
        const retained = await readCompletedScopeAdmission(
          source.common_git_dir,
          opts.taskId,
          last,
        );
        if (retained.identity.request_digest === opts.requestDigest) admission = retained;
        else await authenticateCompletedScopeSource(command, current, source);
      }
      if (!admission) {
        const head = await gitRevParse(source.git_root, ["HEAD"]);
        let beforeRaw = source.raw,
          beforeCommit = head,
          partialRaw: string | null = null;
        if (reconcile) {
          if (
            head !== reconcile.head_sha ||
            completedScopeBytesDigest(source.raw) !== reconcile.partial_readme_digest
          )
            fail("legacy source/head drift");
          beforeCommit = reconcile.before_commit;
          beforeRaw = await gitShowFile(
            source.git_root,
            beforeCommit,
            path.relative(source.git_root, source.readme_path).split(path.sep).join("/"),
          );
          if (completedScopeBytesDigest(beforeRaw) !== reconcile.before_readme_digest)
            fail("legacy Git beforeimage");
          partialRaw = source.raw;
        }
        const before = decodeCompletedScopeTask(beforeRaw, source.readme_path, opts.taskId);
        if (completedScopeAdmissionIds(before).length > 0)
          await authenticateCompletedScopeSource(command, before, { ...source, raw: beforeRaw });
        const original = readKernelRecord(before, source.repository_identity as k.Sha256Digest);
        if (original.kind !== "canonical" || original.record.aggregate.state !== "COMPLETED")
          fail("original Kernel");
        const native = await completedRepairScopeRequest(await readerContext(command), before, {
          raw: beforeRaw,
          head,
          checkout: source.git_root,
          ...(reconcile ? { retained: true } : {}),
        });
        if (
          native?.pending.request_digest !== opts.requestDigest ||
          k.kernelDigest(native.pending.request.scope_roots) !== k.kernelDigest(roots) ||
          k.kernelDigest(native.pending.request.repository_effects) !== k.kernelDigest(effects)
        )
          fail("exact approved delta");
        const appliedAt = partialRaw
          ? opts.legacy_afterimage(command, beforeRaw, partialRaw)
          : new Date().toISOString();
        if (
          !partialRaw &&
          (await gitShowFile(
            source.git_root,
            head,
            path.relative(source.git_root, source.readme_path).split(path.sep).join("/"),
          )) !== beforeRaw
        )
          fail("uncommitted beforeimage");
        const pin: CompletedScopeIdentity = {
          schema_version: 1,
          kind: "completed_scope_admission",
          task_id: opts.taskId,
          repository_identity: source.repository_identity,
          kernel_digest: original.record.digest,
          checkout: source.git_root,
          readme_relative: path
            .relative(source.git_root, source.readme_path)
            .split(path.sep)
            .join("/"),
          head_sha: head,
          before_commit: beforeCommit,
          before_digest: completedScopeBytesDigest(beforeRaw),
          partial_digest: partialRaw ? completedScopeBytesDigest(partialRaw) : null,
          request_digest: opts.requestDigest,
          state_scope_digest: opts.stateScopeDigest ?? opts.stateFingerprint!,
          roots,
          effects,
          previous: completedScopeAdmissionIds(before),
          applied_at: appliedAt,
          blocker_operation_key: native.operation_key,
          blocker_work_order_ref: native.work_order_ref,
        };
        const proofId = completedScopeProofId(pin);
        try {
          admission = await readCompletedScopeAdmission(
            source.common_git_dir,
            opts.taskId,
            proofId,
          );
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        }
        admission ??= {
          identity: pin,
          before_readme: beforeRaw,
          partial_readme: partialRaw,
          after: current,
          after_digest: "",
        };
      }
      const a = admission,
        pin = a.identity,
        proofId = completedScopeProofId(pin);
      if (
        pin.request_digest !== opts.requestDigest ||
        pin.state_scope_digest !== (opts.stateScopeDigest ?? opts.stateFingerprint) ||
        k.kernelDigest(pin.roots) !== k.kernelDigest(roots) ||
        k.kernelDigest(pin.effects) !== k.kernelDigest(effects)
      )
        fail("retained approval binding");
      const dir = completedScopeProofDirectory(source.common_git_dir, opts.taskId, proofId);
      const store = createSupervisorEpisodeStore(path.join(dir, "journal.json"));
      const startIntent = async () => {
        await writeCompletedScopeFile(source.common_git_dir, path.join(dir, "intent.json"), a);
        const existing = await store.read();
        if (existing) {
          await readCompletedScopePrivateFile(source.common_git_dir, store.path);
          return validateSupervisorExecutionEpisodeJournal(existing);
        }
        const main = validateSupervisorExecutionEpisodeJournal(
          JSON.parse(await readCompletedScopePrivateFile(source.common_git_dir, journalPath)),
        );
        const empty = createSupervisorExecutionEpisodeJournal({
          task_id: opts.taskId,
          task_revision: current.revision ?? null,
          state_fingerprint_digest: pin.before_digest,
          budget: main.budget,
        });
        const started = startSupervisorExecutionEpisode({
          journal: empty,
          role: "EXECUTOR",
          kind: "side_effect",
          operation_identity: {
            kind: "completed_scope_admission",
            proof_id: proofId,
            payload_digest: k.kernelDigest(a),
          },
          recovery_context: {
            schema_version: 1,
            kind: "completed_scope_admission",
            proof_id: proofId,
          },
          precondition_fingerprint_digest: pin.before_digest,
          authority_ref: "USER:completed-scope",
          authority_digest: pin.state_scope_digest,
          effect_ref: `completed-scope:${proofId}`,
        });
        if (started.status !== "started" || !(await store.compareAndSwap(null, started.journal)))
          fail("native intent CAS");
        return started.journal;
      };
      const before = await authenticateCompletedScopeSource(
        command,
        decodeCompletedScopeTask(a.before_readme, source.readme_path, opts.taskId),
        { ...source, raw: a.before_readme },
      );
      const beforeWrite =
        completedScopeBytesDigest(source.raw) === (pin.partial_digest ?? pin.before_digest);
      let journal;
      if (beforeWrite) {
        if ((await gitRevParse(source.git_root, ["HEAD"])) !== pin.head_sha)
          fail("retained head drift");
        const pending = parseTaskScopeExtensionRequestState(before)!;
        await applyTaskMutation({
          ctx: command,
          taskId: opts.taskId,
          allowCanonicalProjection: true,
          writeOptions: { expectedRevision: current.revision },
          build: (observed) => {
            if (k.kernelDigest(observed) !== k.kernelDigest(current)) fail("current Task drift");
            return {
              nextTask: {
                ...before,
                revision: current.revision,
                doc: undefined,
                execution_contract: completedScopeIntake(before, roots, effects),
                extensions: {
                  ...before.extensions,
                  [TASK_SCOPE_EXTENSION_REQUEST_KEY]: {
                    ...pending,
                    status: "applied",
                    applied_at: pin.applied_at,
                    applied_by: "USER",
                  },
                  [COMPLETED_SCOPE_ADMISSIONS]: [...pin.previous, proofId],
                },
                comments: [
                  ...(before.comments ?? []),
                  completedScopeApprovalComment(roots, effects),
                ],
              },
            };
          },
          beforePersist: async ({ next }) => {
            const prepared = { ...a, after: next, after_digest: k.kernelDigest(next) };
            validatePreparedCompletedScope(prepared, before);
            if (a.after_digest && a.after_digest !== prepared.after_digest)
              fail("retained prepared afterimage");
            Object.assign(a, prepared);
            journal = await startIntent();
          },
        });
      } else {
        journal = await startIntent();
        if (journal.cursor.phase === "completed") {
          await authenticateCompletedScopeSource(command, current, source);
          return;
        }
        if (
          k.kernelDigest(current) !== a.after_digest ||
          (await gitRevParse(source.git_root, ["HEAD"])) !== pin.head_sha
        )
          fail("unknown interrupted afterimage");
      }
      if (!journal) fail("missing native intent");
      const observed = await readCompletedScopeCommandSource(command, opts.taskId);
      const actual = decodeCompletedScopeTask(observed.raw, observed.readme_path, opts.taskId);
      if (k.kernelDigest(actual) !== a.after_digest) fail("independent afterimage observation");
      validatePreparedCompletedScope({ ...a, after: actual }, before);
      const result = completedScopeObservedResult(a, completedScopeBytesDigest(observed.raw));
      await writeCompletedScopeFile(source.common_git_dir, path.join(dir, "result.json"), result);
      const operation = journal.operations.at(-1);
      if (
        journal.operations.length !== 1 ||
        operation?.status !== "intent" ||
        operation.effect_ref !== `completed-scope:${proofId}` ||
        k.kernelDigest(operation.recovery?.operation_identity) !==
          k.kernelDigest({
            kind: "completed_scope_admission",
            proof_id: proofId,
            payload_digest: k.kernelDigest(a),
          })
      )
        fail("retained native intent binding");
      const completed = completeSupervisorExecutionEpisode({
        journal,
        operation_key: operation.operation_key,
        result,
      });
      if (!(await store.compareAndSwap(journal.digest, completed))) fail("native completion CAS");
      await authenticateCompletedScopeSource(command, actual, observed);
    },
  });
  if (fenced.kind === "busy") fail("competing writer fence");
  // Complete proof publication precedes commit hooks and all cold public reads.
  const status = await readDirectRepositoryStatus(source.git_root);
  if (!status) fail("checkout status unavailable");
  if (status?.lines.length) {
    const relative = path.relative(source.git_root, source.readme_path).split(path.sep).join("/");
    if (status.lines.some((line) => line.slice(3) !== relative))
      fail("unrelated checkout changes before commit");
    await opts.commit(command);
  }
  return true;
}
