import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { lstat, mkdir, open } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { syncDirectory } from "@agentplaneorg/core/fs";
import { parseTaskReadme, taskKernel as k, type TaskRecord } from "@agentplaneorg/core/tasks";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";
import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { completedScopeIntake, scopeIntakeDigest } from "./kernel-scope-intake.js";
import { readKernelRecord } from "./kernel-record.js";

export const COMPLETED_SCOPE_ADMISSIONS = "agentplane.completed_scope_admissions";
const ADMISSION_DIRECTORY = "agentplane/completed-scope";
const SCOPE_REQUEST = "agentplane.scope_extension_request";
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const commit = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
const identitySchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("completed_scope_admission"),
  task_id: z.string().min(1),
  repository_identity: digest,
  kernel_digest: digest,
  checkout: z.string().min(1),
  readme_relative: z.string().min(1),
  head_sha: commit,
  before_commit: commit,
  before_digest: digest,
  partial_digest: digest.nullable(),
  request_digest: digest,
  state_scope_digest: digest,
  roots: z.array(z.string().min(1)),
  effects: z.array(z.string().min(1)),
  previous: z.array(digest).max(64),
  applied_at: z.iso.datetime(),
  blocker_operation_key: digest,
  blocker_work_order_ref: z.string().min(1),
});
const payloadSchema = z.strictObject({
  identity: identitySchema,
  before_readme: z.string().min(1),
  partial_readme: z.string().nullable(),
  after: z.custom<TaskData>(),
  after_digest: digest,
});
export type CompletedScopeIdentity = z.infer<typeof identitySchema>;
export type CompletedScopeAdmission = z.infer<typeof payloadSchema>;
export type CompletedScopeSource = {
  git_root: string;
  common_git_dir: string;
  repository_identity: string;
  readme_path: string;
  raw: string;
};
export type AuthenticateCompletedBlocker = (
  before: TaskData,
  admission: CompletedScopeAdmission,
) => Promise<void>;
const permits = new WeakMap<object, string>();
export const completedScopeBytesDigest = (value: string) =>
  `sha256:${createHash("sha256").update(value).digest("hex")}`;

function fail(reason: string): never {
  throw new Error(`Completed scope admission rejected (${reason})`);
}
export function completedScopeAdmissionIds(task: Pick<TaskData, "extensions">): string[] {
  const raw = task.extensions?.[COMPLETED_SCOPE_ADMISSIONS];
  if (raw === undefined) return [];
  const ids = z.array(digest).min(1).max(64).parse(raw);
  if (new Set(ids).size !== ids.length) fail("duplicate proof");
  return ids;
}
function binding(task: TaskData, repositoryIdentity: string) {
  return k.kernelDigest({
    repositoryIdentity,
    id: task.id,
    status: task.status,
    kernel: task.extensions?.task_kernel,
    base: task.extensions?.task_execution_context,
    route: task.execution_route,
    intake: scopeIntakeDigest(task.execution_contract),
    proofs: completedScopeAdmissionIds(task),
  });
}
export function hasCompletedScopePermit(task: TaskData, repositoryIdentity: string): boolean {
  return permits.get(task) === binding(task, repositoryIdentity);
}
/** Only an explicitly checked metadata projection may inherit an object-bound permit. */
export function transferCompletedScopePermit<T extends TaskData>(source: TaskData, next: T): T {
  const pin = permits.get(source);
  const identity = (source.extensions?.task_kernel as { repository_identity?: string } | undefined)
    ?.repository_identity;
  if (pin && identity && pin === binding(source, identity) && pin === binding(next, identity))
    permits.set(next, pin);
  return next;
}
export function decodeCompletedScopeTask(
  raw: string,
  readmePath: string,
  taskId: string,
): TaskData {
  const parsed = parseTaskReadme(raw);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults(parsed.frontmatter),
  );
  if (frontmatter.id !== taskId) fail("source Task identity");
  return taskRecordToData({
    id: taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: parsed.body,
    readmePath,
  });
}
export function completedScopeProofId(identity: CompletedScopeIdentity): string {
  const { applied_at: _at, ...stable } = identity;
  return k.kernelDigest(stable);
}
export function completedScopeProofDirectory(
  commonGitDir: string,
  taskId: string,
  proofId: string,
) {
  if (!/^[a-zA-Z0-9_-]+$/u.test(taskId)) fail("Task path");
  digest.parse(proofId);
  return path.join(commonGitDir, ADMISSION_DIRECTORY, taskId, proofId.slice(7));
}
export async function readCompletedScopePrivateFile(
  commonGitDir: string,
  file: string,
): Promise<string> {
  const raw = await readContainedStableTextNoFollow({
    repository_root: commonGitDir,
    file_path: file,
    label: "completed scope proof",
    max_bytes: 64 * 1024 * 1024,
  });
  const stat = await lstat(file);
  if ((stat.mode & 0o077) !== 0 || stat.uid !== process.getuid?.())
    fail("private proof owner/mode");
  const privateRoot = path.join(commonGitDir, ADMISSION_DIRECTORY);
  let parent = path.dirname(file);
  while (parent === privateRoot || parent.startsWith(`${privateRoot}${path.sep}`)) {
    const directory = await lstat(parent);
    if (
      !directory.isDirectory() ||
      directory.isSymbolicLink() ||
      (directory.mode & 0o077) !== 0 ||
      directory.uid !== process.getuid?.()
    )
      fail("private proof directory owner/mode");
    parent = path.dirname(parent);
  }
  return raw;
}
const privateFile = readCompletedScopePrivateFile;
/** Append-only private evidence; an existing different payload is never overwritten. */
export async function writeCompletedScopeFile(commonGitDir: string, file: string, value: unknown) {
  const relative = path.relative(commonGitDir, file);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative))
    fail("proof containment");
  let parent = commonGitDir;
  const privateRoot = path.join(commonGitDir, ADMISSION_DIRECTORY);
  for (const part of relative.split(path.sep).slice(0, -1)) {
    parent = path.join(parent, part);
    try {
      await mkdir(parent, { mode: 0o700 });
      await syncDirectory(path.dirname(parent));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
    const stat = await lstat(parent);
    if (stat.isSymbolicLink() || !stat.isDirectory()) fail("proof ancestor");
    if (
      (parent === privateRoot || parent.startsWith(`${privateRoot}${path.sep}`)) &&
      ((stat.mode & 0o077) !== 0 || stat.uid !== process.getuid?.())
    )
      fail("private proof directory");
  }
  const raw = `${JSON.stringify(value, null, 2)}\n`;
  let handle;
  try {
    handle = await open(
      file,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
      0o600,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    if ((await privateFile(commonGitDir, file)) !== raw) fail("conflicting retained evidence");
    return;
  }
  try {
    await handle.writeFile(raw);
    await handle.sync();
    await syncDirectory(path.dirname(file));
  } finally {
    await handle.close();
  }
}
export async function readCompletedScopeAdmission(
  commonGitDir: string,
  taskId: string,
  proofId: string,
) {
  const dir = completedScopeProofDirectory(commonGitDir, taskId, proofId);
  const admission = payloadSchema.parse(
    JSON.parse(await privateFile(commonGitDir, path.join(dir, "intent.json"))),
  );
  if (
    completedScopeProofId(admission.identity) !== proofId ||
    admission.identity.task_id !== taskId ||
    admission.after_digest !== k.kernelDigest(admission.after) ||
    completedScopeBytesDigest(admission.before_readme) !== admission.identity.before_digest ||
    (admission.partial_readme === null
      ? null
      : completedScopeBytesDigest(admission.partial_readme)) !== admission.identity.partial_digest
  )
    fail("payload pins");
  return admission;
}
function authorityMatches(before: TaskData, after: TaskData) {
  return (
    k.kernelDigest(before.extensions?.task_execution_context) ===
      k.kernelDigest(after.extensions?.task_execution_context) &&
    k.kernelDigest(before.execution_route) === k.kernelDigest(after.execution_route) &&
    k.kernelDigest(before.extensions?.task_kernel) ===
      k.kernelDigest(after.extensions?.task_kernel) &&
    before.id === after.id &&
    before.status === after.status &&
    scopeIntakeDigest(before.execution_contract) === scopeIntakeDigest(after.execution_contract)
  );
}
function assertVerificationRetained(floor: TaskData, task: TaskData) {
  const before = floor.execution_contract!,
    after = task.execution_contract!;
  for (const key of [
    "changed_paths",
    "changed_components",
    "repository_effects",
    "external_effects",
  ] as const)
    if (before.observed[key].some((entry) => !after.observed[key].includes(entry as never)))
      fail(`historical ${key}`);
  if (
    before.observed.verification_results.some(
      (result) =>
        !after.observed.verification_results.some(
          (next) => k.kernelDigest(next) === k.kernelDigest(result),
        ),
    )
  )
    fail("historical verification result");
  if (
    before.verification.required_evidence.some(
      (entry) => !after.verification.required_evidence.includes(entry),
    ) ||
    before.verification.contract?.selected_checks.some(
      (entry) => !after.verification.contract?.selected_checks.includes(entry),
    )
  )
    fail("verification floor");
}
/** Validate the whole bounded afterimage without granting a completed-read permit. */
export function validatePreparedCompletedScope(
  admission: CompletedScopeAdmission,
  authenticatedBefore?: TaskData,
): TaskData {
  const { identity: pin, after } = admission;
  const decodedBefore = decodeCompletedScopeTask(
    admission.before_readme,
    path.join(pin.checkout, pin.readme_relative),
    pin.task_id,
  );
  const before = authenticatedBefore ?? decodedBefore;
  if (k.kernelDigest(before) !== k.kernelDigest(decodedBefore)) fail("prepared source identity");
  const request = before.extensions?.[SCOPE_REQUEST] as
    | {
        status?: string;
        request_digest?: string;
        request?: { scope_roots: string[]; repository_effects: string[] };
      }
    | undefined;
  if (
    before.status !== "DONE" ||
    request?.status !== "pending" ||
    request.request_digest !== pin.request_digest ||
    k.kernelDigest(request.request?.scope_roots) !== k.kernelDigest(pin.roots) ||
    k.kernelDigest(request.request?.repository_effects) !== k.kernelDigest(pin.effects)
  )
    fail("approved request");
  const contract = completedScopeIntake(before, pin.roots, pin.effects);
  if (
    k.kernelDigest(contract) !== k.kernelDigest(after.execution_contract) ||
    k.kernelDigest(after.extensions?.task_kernel) !==
      k.kernelDigest(before.extensions?.task_kernel) ||
    (before.extensions?.task_kernel as { digest?: string })?.digest !== pin.kernel_digest
  )
    fail("prepared authority");
  const proofId = completedScopeProofId(pin);
  if (
    k.kernelDigest(completedScopeAdmissionIds(before)) !== k.kernelDigest(pin.previous) ||
    k.kernelDigest(completedScopeAdmissionIds(after)) !== k.kernelDigest([...pin.previous, proofId])
  )
    fail("append-only predecessor");
  const approval = completedScopeApprovalComment(pin.roots, pin.effects);
  const expected = {
    ...before,
    execution_contract: contract,
    comments: [...(before.comments ?? []), approval],
    extensions: {
      ...before.extensions,
      [SCOPE_REQUEST]: {
        ...request,
        status: "applied",
        applied_at: pin.applied_at,
        applied_by: "USER",
      },
      [COMPLETED_SCOPE_ADMISSIONS]: [...pin.previous, proofId],
    },
  };
  const stable = (task: TaskData) => {
    const {
      revision: _revision,
      doc: _doc,
      doc_updated_at: _at,
      doc_updated_by: _by,
      ...rest
    } = task;
    return rest;
  };
  if (
    k.kernelDigest(stable(expected)) !== k.kernelDigest(stable(after)) ||
    after.revision !== (before.revision ?? 0) + (pin.partial_digest ? 2 : 1)
  )
    fail("prepared complete Task projection");
  assertVerificationRetained(before, after);
  // Every other Kernel guard reads the unchanged id, status and Kernel above.
  // The evolving intake is checked separately against the exact monotonic delta.
  const read = readKernelRecord(before, pin.repository_identity as k.Sha256Digest);
  if (read.kind !== "canonical" || read.record.aggregate.state !== "COMPLETED") {
    fail("prepared Kernel invariants");
  }
  return before;
}
export function completedScopeObservedResult(
  admission: CompletedScopeAdmission,
  rawDigest: string,
) {
  return {
    schema_version: 1,
    kind: "completed_scope_afterimage",
    proof_id: completedScopeProofId(admission.identity),
    task_digest: admission.after_digest,
    raw_digest: rawDigest,
    kernel_digest: admission.identity.kernel_digest,
  };
}
/** Cold authority requires a complete protected native effect and its independently read result. */
export async function authenticateCompletedScopeTask(opts: {
  task: TaskData;
  source: CompletedScopeSource;
  authenticate_blocker: AuthenticateCompletedBlocker;
}): Promise<TaskData> {
  const ids = completedScopeAdmissionIds(opts.task);
  if (ids.length === 0) return opts.task;
  const decoded = decodeCompletedScopeTask(opts.source.raw, opts.source.readme_path, opts.task.id);
  if (k.kernelDigest(decoded) !== k.kernelDigest(opts.task)) fail("explicit source projection");
  let previous: TaskData | null = null;
  for (const [index, proofId] of ids.entries()) {
    const a = await readCompletedScopeAdmission(opts.source.common_git_dir, opts.task.id, proofId);
    const pin = a.identity;
    if (
      pin.repository_identity !== opts.source.repository_identity ||
      pin.readme_relative !==
        path.relative(opts.source.git_root, opts.source.readme_path).split(path.sep).join("/") ||
      k.kernelDigest(pin.previous) !== k.kernelDigest(ids.slice(0, index))
    )
      fail("repository/source/predecessor identity");
    const before = decodeCompletedScopeTask(
      a.before_readme,
      path.join(pin.checkout, pin.readme_relative),
      pin.task_id,
    );
    if (previous) {
      if (!authorityMatches(previous, before)) fail("predecessor authority");
      assertVerificationRetained(previous, before);
      permits.set(before, binding(before, pin.repository_identity));
    }
    const original = readKernelRecord(before, pin.repository_identity as k.Sha256Digest);
    if (original.kind !== "canonical" || original.record.aggregate.state !== "COMPLETED")
      fail("predecessor Kernel");
    await opts.authenticate_blocker(before, a);
    validatePreparedCompletedScope(a, before);
    const dir = completedScopeProofDirectory(opts.source.common_git_dir, pin.task_id, proofId);
    const journal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await privateFile(opts.source.common_git_dir, path.join(dir, "journal.json"))),
    );
    const result = JSON.parse(
      await privateFile(opts.source.common_git_dir, path.join(dir, "result.json")),
    ) as { raw_digest?: string };
    const op = journal.operations.at(-1);
    const identity = {
      kind: "completed_scope_admission",
      proof_id: proofId,
      payload_digest: k.kernelDigest(a),
    };
    if (
      journal.task_id !== pin.task_id ||
      journal.operations.length !== 1 ||
      journal.status !== "running" ||
      journal.cursor.phase !== "completed" ||
      op?.status !== "completed" ||
      op.kind !== "side_effect" ||
      op.role !== "EXECUTOR" ||
      op.effect_ref !== `completed-scope:${proofId}` ||
      op.authority_ref !== "USER:completed-scope" ||
      op.authority_digest !== pin.state_scope_digest ||
      op.precondition_fingerprint_digest !== pin.before_digest ||
      k.kernelDigest(op.recovery?.operation_identity) !== k.kernelDigest(identity) ||
      op.result_digest !== digestSupervisorEpisodeValue(result) ||
      !digest.safeParse(result.raw_digest).success ||
      k.kernelDigest(result) !== k.kernelDigest(completedScopeObservedResult(a, result.raw_digest!))
    )
      fail("native completion receipt");
    permits.set(a.after, binding(a.after, pin.repository_identity));
    previous = a.after;
  }
  if (!previous || !authorityMatches(previous, opts.task)) fail("current authority");
  assertVerificationRetained(previous, opts.task);
  permits.set(opts.task, binding(opts.task, opts.source.repository_identity));
  return opts.task;
}

const reconcileSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("completed_scope_admission_reconcile"),
  task_id: z.string().min(1),
  repository_identity: digest,
  kernel_digest: digest,
  head_sha: commit,
  before_commit: commit,
  before_readme_digest: digest,
  partial_readme_digest: digest,
  request_digest: digest,
});
export async function readCompletedScopeReconcileRequest(
  file: string,
  stateDigest: string | undefined,
) {
  const absolute = path.resolve(file);
  const raw = await readContainedStableTextNoFollow({
    repository_root: path.parse(absolute).root,
    file_path: absolute,
    label: "private scope reconciliation request",
    max_bytes: 64 * 1024,
  });
  const stat = await lstat(absolute);
  if (
    (stat.mode & 0o077) !== 0 ||
    stat.uid !== process.getuid?.() ||
    completedScopeBytesDigest(raw) !== stateDigest
  )
    fail("reconciliation request digest/owner/mode");
  return reconcileSchema.parse(JSON.parse(raw));
}

export function completedScopeApprovalComment(
  roots: readonly string[],
  effects: readonly string[],
) {
  return {
    author: "USER",
    body: `Approved state-bound execution scope extension: ${roots.join(", ")}; repository effects: ${effects.join(", ") || "unchanged"}.`,
  };
}
