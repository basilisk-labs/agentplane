import { createHash } from "node:crypto";
import { constants, type BigIntStats } from "node:fs";
import { lstat, open, realpath } from "node:fs/promises";
import path from "node:path";

import { validateExecutionReceipt, type ExecutionReceipt } from "@agentplaneorg/core/schemas";

import { CliError } from "../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import {
  RUNNER_EXECUTION_RECEIPT_FILENAME,
  resolveTaskRunnerPaths,
} from "../runner/task-run-paths.js";
import { validateContextArtifacts } from "./verify-task-artifacts.js";
import {
  DEFAULT_FORBIDDEN,
  hasPathPrefix,
  isRawMutationAllowed,
  isTaskPathMatch,
  normalizeChangedPath,
  normalizePath,
  readAllowed,
  readChangedPaths,
  readContextExtensions,
  readExecutionReceiptRef,
  readForbidden,
  hasExecutionReceiptReference,
  type VerificationInput,
} from "./verify-task-policy.js";

const NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
const NON_BLOCKING = constants.O_NONBLOCK ?? 0;
const SAFE_RUNNER_RUN_ID_START = /^[A-Za-z0-9]/u;
const UNSAFE_RUNNER_RUN_ID_CHARACTER = /[^A-Za-z0-9._-]/u;

type StableFileIdentity = {
  dev: bigint;
  ino: bigint;
  size: bigint;
  mtime_ns: bigint;
  ctime_ns: bigint;
};

function stableFileIdentity(stat: BigIntStats): StableFileIdentity {
  return {
    dev: BigInt(stat.dev),
    ino: BigInt(stat.ino),
    size: BigInt(stat.size),
    mtime_ns: BigInt(stat.mtimeNs),
    ctime_ns: BigInt(stat.ctimeNs),
  };
}

function stableFileIdentitiesMatch(left: StableFileIdentity, right: StableFileIdentity): boolean {
  return (
    left.dev === right.dev &&
    left.ino === right.ino &&
    left.size === right.size &&
    left.mtime_ns === right.mtime_ns &&
    left.ctime_ns === right.ctime_ns
  );
}

function failReceiptValidation(taskId: string, reason: string): never {
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `context verify-task failed for ${taskId}: ${reason}`,
  });
}

function isSafeRunnerRunId(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 255 &&
    SAFE_RUNNER_RUN_ID_START.test(value) &&
    !UNSAFE_RUNNER_RUN_ID_CHARACTER.test(value)
  );
}

function isContainedPath(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return (
    relative.length > 0 &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function assertPhysicalReceiptContained(physicalRoot: string, physicalReceipt: string): void {
  if (!isContainedPath(physicalRoot, physicalReceipt)) {
    throw new Error("receipt path resolves outside repository");
  }
}

function assertStableRegularPath(opts: {
  receiptPath: string;
  expectedIdentity: StableFileIdentity;
  phase: string;
  stat: BigIntStats;
}): void {
  if (
    !opts.stat.isFile() ||
    opts.stat.isSymbolicLink() ||
    !stableFileIdentitiesMatch(opts.expectedIdentity, stableFileIdentity(opts.stat))
  ) {
    throw new Error(`receipt path changed ${opts.phase}: ${opts.receiptPath}`);
  }
}

export async function readStableExecutionReceiptFile(opts: {
  projectRoot: string;
  receiptPath: string;
  afterHandleValidated?: () => Promise<void> | void;
}): Promise<Buffer> {
  const physicalRoot = await realpath(opts.projectRoot);
  const pathStatBefore = await lstat(opts.receiptPath, { bigint: true });
  if (!pathStatBefore.isFile() || pathStatBefore.isSymbolicLink()) {
    throw new Error(`receipt path is not a regular file: ${opts.receiptPath}`);
  }
  const pathIdentityBefore = stableFileIdentity(pathStatBefore);
  assertPhysicalReceiptContained(physicalRoot, await realpath(opts.receiptPath));

  let handle;
  try {
    handle = await open(opts.receiptPath, constants.O_RDONLY | NO_FOLLOW | NON_BLOCKING);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ELOOP") {
      throw new Error(`receipt path is not a regular file: ${opts.receiptPath}`);
    }
    throw error;
  }

  try {
    const handleStatBefore = await handle.stat({ bigint: true });
    if (
      !handleStatBefore.isFile() ||
      !stableFileIdentitiesMatch(pathIdentityBefore, stableFileIdentity(handleStatBefore))
    ) {
      throw new Error(`receipt path changed before it could be read: ${opts.receiptPath}`);
    }
    const handleIdentityBefore = stableFileIdentity(handleStatBefore);
    assertStableRegularPath({
      receiptPath: opts.receiptPath,
      expectedIdentity: handleIdentityBefore,
      phase: "while it was being opened",
      stat: await lstat(opts.receiptPath, { bigint: true }),
    });
    assertPhysicalReceiptContained(physicalRoot, await realpath(opts.receiptPath));

    await opts.afterHandleValidated?.();
    const content = await handle.readFile();
    const handleStatAfter = await handle.stat({ bigint: true });
    if (
      !handleStatAfter.isFile() ||
      !stableFileIdentitiesMatch(handleIdentityBefore, stableFileIdentity(handleStatAfter))
    ) {
      throw new Error(`receipt changed while it was being read: ${opts.receiptPath}`);
    }
    assertStableRegularPath({
      receiptPath: opts.receiptPath,
      expectedIdentity: handleIdentityBefore,
      phase: "while it was being read",
      stat: await lstat(opts.receiptPath, { bigint: true }),
    });
    assertPhysicalReceiptContained(physicalRoot, await realpath(opts.receiptPath));
    return content;
  } finally {
    await handle.close();
  }
}

async function loadVerifiedExecutionReceipt(opts: {
  projectRoot: string;
  workflowDir: string;
  task: VerificationInput;
}): Promise<ExecutionReceipt> {
  const taskId = opts.task.id;
  const receiptRef = readExecutionReceiptRef(opts.task);
  if (!receiptRef) {
    if (hasExecutionReceiptReference(opts.task)) {
      failReceiptValidation(
        taskId,
        "receipt integrity failure: malformed execution receipt reference",
      );
    }
    failReceiptValidation(
      taskId,
      "compatibility_unverified: execution receipt is missing; legacy runner evidence cannot establish observed success",
    );
  }
  if (receiptRef.observed_by !== "agentplane") {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: unexpected observer ${JSON.stringify(receiptRef.observed_by)}`,
    );
  }
  if (receiptRef.verification_state !== "observed_success") {
    failReceiptValidation(
      taskId,
      `${receiptRef.verification_state}: execution receipt does not establish observed success`,
    );
  }
  if (!/^sha256:[0-9a-f]{64}$/u.test(receiptRef.sha256)) {
    failReceiptValidation(taskId, "receipt integrity failure: malformed sha256 digest");
  }
  const expectedInvocationId = opts.task.runner?.run_id;
  if (typeof expectedInvocationId !== "string") {
    failReceiptValidation(
      taskId,
      "compatibility_unverified: runner run_id is missing; execution receipt cannot be bound to a supervised invocation",
    );
  }
  if (!isSafeRunnerRunId(expectedInvocationId)) {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: runner run_id is not a safe path segment: ${JSON.stringify(expectedInvocationId)}`,
    );
  }
  const receiptPathSegments = receiptRef.path.split("/");
  if (
    receiptRef.path.includes("\\") ||
    path.posix.isAbsolute(receiptRef.path) ||
    receiptPathSegments.some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: receipt path is not a repository-relative POSIX path: ${receiptRef.path}`,
    );
  }

  const projectRoot = path.resolve(opts.projectRoot);
  const receiptPath = path.resolve(projectRoot, ...receiptRef.path.split("/"));
  const runnerPaths = resolveTaskRunnerPaths({
    git_root: projectRoot,
    workflow_dir: opts.workflowDir,
    task_id: taskId,
    run_id: expectedInvocationId,
  });
  const workflowRoot = path.resolve(projectRoot, opts.workflowDir);
  const expectedTaskDir = path.resolve(runnerPaths.task_dir);
  const expectedRunsDir = path.resolve(runnerPaths.runs_dir);
  const expectedRunDir = path.resolve(runnerPaths.run_dir);
  const expectedReceiptPath = path.resolve(runnerPaths.receipt_path);
  if (!isContainedPath(projectRoot, receiptPath)) {
    failReceiptValidation(taskId, "receipt integrity failure: receipt path escapes repository");
  }
  if (
    !isContainedPath(projectRoot, workflowRoot) ||
    path.dirname(expectedTaskDir) !== workflowRoot ||
    path.basename(expectedTaskDir) !== taskId ||
    path.dirname(expectedRunsDir) !== expectedTaskDir ||
    path.basename(expectedRunsDir) !== "runs" ||
    path.dirname(expectedRunDir) !== expectedRunsDir ||
    path.basename(expectedRunDir) !== expectedInvocationId ||
    path.dirname(expectedReceiptPath) !== expectedRunDir ||
    path.basename(expectedReceiptPath) !== RUNNER_EXECUTION_RECEIPT_FILENAME
  ) {
    failReceiptValidation(
      taskId,
      "receipt integrity failure: configured runner receipt path is not exactly inside the expected workflow task run directory",
    );
  }
  if (receiptPath !== expectedReceiptPath) {
    const expectedReference = path
      .relative(projectRoot, expectedReceiptPath)
      .split(path.sep)
      .join("/");
    failReceiptValidation(
      taskId,
      `receipt integrity failure: receipt reference ${JSON.stringify(receiptRef.path)} does not resolve to expected runner receipt path ${JSON.stringify(expectedReference)}`,
    );
  }

  let receiptBytes: Buffer;
  try {
    receiptBytes = await readStableExecutionReceiptFile({
      projectRoot,
      receiptPath,
    });
  } catch (error) {
    if (error instanceof CliError) throw error;
    const detail = error instanceof Error ? error.message : String(error);
    failReceiptValidation(taskId, `receipt integrity failure: cannot read receipt: ${detail}`);
  }

  const actualSha256 = `sha256:${createHash("sha256").update(receiptBytes).digest("hex")}`;
  if (actualSha256 !== receiptRef.sha256) {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: sha256 mismatch (expected ${receiptRef.sha256}, observed ${actualSha256})`,
    );
  }

  let receipt: ExecutionReceipt;
  try {
    receipt = validateExecutionReceipt(JSON.parse(receiptBytes.toString("utf8")) as unknown);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    failReceiptValidation(
      taskId,
      `receipt integrity failure: invalid execution receipt: ${detail}`,
    );
  }
  if (receipt.observed_by !== "agentplane") {
    failReceiptValidation(taskId, "receipt integrity failure: receipt observer is not agentplane");
  }
  if (receipt.success_policy.outcome !== "observed_success") {
    failReceiptValidation(
      taskId,
      `${receipt.success_policy.outcome}: execution receipt success policy is not observed_success`,
    );
  }
  if (receipt.run_id !== expectedInvocationId) {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: receipt run_id ${JSON.stringify(receipt.run_id)} does not match expected invocation ${JSON.stringify(expectedInvocationId)}`,
    );
  }
  if (receipt.work_order_id !== expectedInvocationId) {
    failReceiptValidation(
      taskId,
      `receipt integrity failure: receipt work_order_id ${JSON.stringify(receipt.work_order_id)} does not match expected invocation ${JSON.stringify(expectedInvocationId)}`,
    );
  }
  if (receipt.git.state !== "observed") {
    failReceiptValidation(
      taskId,
      "compatibility_unverified: execution receipt has no observed Git delta",
    );
  }
  return receipt;
}

export async function cmdContextVerifyTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: { taskId: string };
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.parsed.taskId });
  if (!task) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task not found: ${opts.parsed.taskId}`,
    });
  }
  if (task.task_kind !== "context") {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: skipped_not_applicable (task_kind=${task.task_kind ?? "unknown"}; expected context)\n`,
    );
    return 0;
  }
  if (task.mutation_scope !== "context") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has invalid mutation scope: ${task.mutation_scope ?? "unknown"}`,
    });
  }
  if (
    task.blueprint_request !== "context.assimilation" &&
    task.blueprint_request !== "context.maximum_assimilation"
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has unexpected blueprint request: ${task.blueprint_request ?? "unknown"}`,
    });
  }

  const normalizedTask = task as VerificationInput;
  const executionReceipt = await loadVerifiedExecutionReceipt({
    projectRoot: ctx.resolvedProject.gitRoot,
    workflowDir: ctx.config.paths.workflow_dir,
    task: normalizedTask,
  });
  const context = readContextExtensions(normalizedTask);
  const allowed = readAllowed(context, task.id);
  const forbidden = readForbidden(context);
  const changedPaths = readChangedPaths(executionReceipt)
    .map((value) => normalizeChangedPath(ctx.resolvedProject.gitRoot, value))
    .map((value) => normalizePath(value))
    .filter(Boolean);
  const normalizedTaskId = task.id;
  const normalizedTaskOwner = task.owner ?? "unknown";
  const requiredSourceRoots =
    Array.isArray(context.allowed_outputs) && context.allowed_outputs.length > 0
      ? context.allowed_outputs.map(String)
      : [];

  if (changedPaths.length > 0) {
    const denied: string[] = [];
    for (const changed of changedPaths) {
      if (
        changed === ".agentplane/cache.sqlite" ||
        changed.startsWith(".agentplane/context/service/")
      ) {
        denied.push(`${changed}: forbidden service mutation`);
        continue;
      }

      if (hasPathPrefix(changed, "context/raw/") && !isRawMutationAllowed(context)) {
        denied.push(`${changed}: raw mutation is forbidden`);
      }

      if (
        !isTaskPathMatch(changed, allowed, normalizedTaskId) &&
        !DEFAULT_FORBIDDEN.some((forbiddenPrefix) => hasPathPrefix(changed, forbiddenPrefix))
      ) {
        denied.push(`${changed}: path outside allowed outputs`);
      }

      for (const forbiddenPrefix of forbidden) {
        if (hasPathPrefix(changed, forbiddenPrefix)) {
          denied.push(`${changed}: matches forbidden output ${forbiddenPrefix}`);
          break;
        }
      }
      if (
        requiredSourceRoots.length > 0 &&
        !isTaskPathMatch(changed, requiredSourceRoots, normalizedTaskId)
      ) {
        denied.push(`${changed}: path outside required context outputs`);
      }
    }
    if (denied.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context verify-task failed for ${opts.parsed.taskId}: ${denied.length} mutation policy violation(s)\n- ${denied.join("\n- ")}`,
      });
    }
  } else {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: no changed_paths observed by execution receipt\n`,
    );
  }

  const artifactErrors = await validateContextArtifacts({
    root: ctx.resolvedProject.gitRoot,
    task: normalizedTask,
    context,
    changedPaths,
  });
  if (artifactErrors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context verify-task failed for ${opts.parsed.taskId}: ${artifactErrors.length} artifact validation issue(s)\n- ${artifactErrors.join("\n- ")}`,
    });
  }

  process.stdout.write(
    `context verify-task ${opts.parsed.taskId}: ok (${normalizedTaskOwner} / ${task.status ?? "unknown"})\n`,
  );
  return 0;
}
