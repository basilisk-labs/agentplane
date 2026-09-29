import path from "node:path";
import { readdir } from "node:fs/promises";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { GitContext, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import {
  TASK_KERNEL_EXTENSION,
  type KernelRecord,
} from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  loadCommandContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import {
  KERNEL_OPERATIONAL_PROJECTION,
  readKernelOperationalProjection,
} from "./kernel-operational-projection.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

type Suspension = Readonly<{
  schema_version: 1;
  task_id: string;
  request_digest: k.Sha256Digest;
  operation_idempotency_key: string;
  source_checkout: string;
  source_head: string;
  readme_path: string;
  suspended_bytes: string;
  suspended_digest: k.Sha256Digest;
  head_digest: k.Sha256Digest;
  digest: k.Sha256Digest;
}>;

function taskReadmePath(command: CommandContext, taskId: string): string {
  return path.posix.join(
    command.config.paths.tasks_path.replaceAll("\\", "/"),
    taskId,
    "README.md",
  );
}

async function suspensionDirectory(
  command: CommandContext,
  taskId: string,
  requestDigest: k.Sha256Digest,
): Promise<string> {
  return path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "provider-effects",
    taskId,
    requestDigest.slice("sha256:".length),
  );
}

function parseSuspension(raw: unknown): Suspension {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Canonical controller suspension is malformed");
  }
  const value = raw as Suspension;
  const { digest, ...contents } = value;
  if (
    value.schema_version !== 1 ||
    !value.task_id ||
    !/^sha256:[a-f0-9]{64}$/u.test(value.request_digest) ||
    !value.operation_idempotency_key ||
    !value.source_checkout ||
    !path.isAbsolute(value.source_checkout) ||
    !value.readme_path ||
    path.isAbsolute(value.readme_path) ||
    value.readme_path.split(/[\\/]/u).includes("..") ||
    !value.suspended_bytes ||
    k.kernelDigest(contents) !== digest ||
    k.kernelDigest(Buffer.from(value.suspended_bytes, "base64").toString("utf8")) !==
      value.suspended_digest
  ) {
    throw new Error("Canonical controller suspension identity mismatch");
  }
  return value;
}

async function readSuspension(file: string): Promise<Suspension | null> {
  try {
    return parseSuspension(
      JSON.parse(await readStableRegularTextNoFollow(file, "canonical controller suspension")),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

async function validateSuspensionTarget(opts: {
  command: CommandContext;
  suspension: Suspension;
  task_id: string;
  request_digest: k.Sha256Digest;
}): Promise<void> {
  if (
    opts.suspension.task_id !== opts.task_id ||
    opts.suspension.request_digest !== opts.request_digest
  ) {
    throw new Error("Canonical controller suspension request identity mismatch");
  }
  const sourceCommand = await loadCommandContext({
    cwd: opts.suspension.source_checkout,
    rootOverride: null,
  });
  if (
    path.resolve(await resolveCommandGitCommonDir(sourceCommand)) !==
    path.resolve(await resolveCommandGitCommonDir(opts.command))
  ) {
    throw new Error("Canonical controller suspension points outside the repository");
  }
  if (opts.suspension.readme_path !== taskReadmePath(sourceCommand, opts.task_id)) {
    throw new Error("Canonical controller suspension path does not match its task");
  }
}

async function restoreSuspension(opts: {
  command: CommandContext;
  suspension: Suspension;
  task_id: string;
  request_digest: k.Sha256Digest;
}): Promise<void> {
  await validateSuspensionTarget(opts);
  const { suspension } = opts;
  const target = path.join(suspension.source_checkout, suspension.readme_path);
  const current = await readStableRegularTextNoFollow(target, "canonical suspended task record");
  const currentDigest = k.kernelDigest(current);
  if (currentDigest === suspension.suspended_digest) return;
  if (currentDigest !== suspension.head_digest) {
    throw new Error("Canonical suspended task record changed outside the controller handoff");
  }
  await atomicWriteFile(target, Buffer.from(suspension.suspended_bytes, "base64"));
}

/** Recover the only tracked control-plane file that may be temporarily hidden for integration. */
export async function recoverCanonicalControllerSuspension(opts: {
  command: CommandContext;
  task_id: string;
  request_digest: k.Sha256Digest;
}): Promise<void> {
  const file = path.join(
    await suspensionDirectory(opts.command, opts.task_id, opts.request_digest),
    "controller-suspension.json",
  );
  const suspension = await readSuspension(file);
  if (suspension) await restoreSuspension({ ...opts, suspension });
}

/** Recover a crash that hid the tracked record before the next command reads the Task. */
export async function recoverCanonicalControllerSuspensions(opts: {
  command: CommandContext;
  task_id: string;
}): Promise<void> {
  if (
    !opts.task_id ||
    opts.task_id === "." ||
    opts.task_id === ".." ||
    path.basename(opts.task_id) !== opts.task_id
  ) {
    throw new Error("Canonical controller recovery requires a task path segment");
  }
  const root = path.join(
    await resolveCommandGitCommonDir(opts.command),
    "agentplane",
    "kernel",
    "provider-effects",
    opts.task_id,
  );
  let entries: string[];
  try {
    entries = await readdir(root);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries.toSorted()) {
    if (!/^[a-f0-9]{64}$/u.test(entry)) continue;
    const suspension = await readSuspension(path.join(root, entry, "controller-suspension.json"));
    if (suspension)
      await restoreSuspension({
        ...opts,
        request_digest: `sha256:${entry}` as k.Sha256Digest,
        suspension,
      });
  }
}

/**
 * Integration and final cleanup require a clean authoritative checkout. Canonical effect state is
 * controller state, not part of the provider operation's frozen head, so hide exactly that README
 * while the mature operation runs. The common-Git-dir snapshot makes process death recoverable.
 */
export async function withCanonicalControllerSuspendedForOperation<T>(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  task_id: string;
  request_digest: k.Sha256Digest;
  operation_idempotency_key: string;
  controller_checkout?: string | null;
  run: () => Promise<T>;
}): Promise<T> {
  const sourceCheckout = opts.controller_checkout ?? opts.decision.workspace.taskWorktreePath;
  if (!sourceCheckout) return await opts.run();
  const sourceCommand = await loadCommandContext({ cwd: sourceCheckout, rootOverride: null });
  const relative = taskReadmePath(sourceCommand, opts.task_id);
  const changed = await new GitContext({ gitRoot: sourceCheckout }).statusChangedPaths();
  if (changed.length === 0) return await opts.run();
  if (changed.length !== 1 || changed[0] !== relative) {
    throw new Error(
      `Canonical integration handoff permits only ${relative}; observed ${changed.join(", ")}`,
    );
  }
  const task = await sourceCommand.taskBackend.getTask(opts.task_id);
  if (!task?.extensions || !Object.hasOwn(task.extensions, TASK_KERNEL_EXTENSION)) {
    throw new Error("Canonical integration handoff requires a Task Kernel record");
  }
  const suspended = await readStableRegularTextNoFollow(
    path.join(sourceCheckout, relative),
    "canonical task record before integration",
  );
  const sourceHead = await gitRevParse(sourceCheckout, ["HEAD"]);
  const head = await gitShowFile(sourceCheckout, sourceHead, relative);
  const contents = {
    schema_version: 1 as const,
    task_id: opts.task_id,
    request_digest: opts.request_digest,
    operation_idempotency_key: opts.operation_idempotency_key,
    source_checkout: sourceCheckout,
    source_head: sourceHead,
    readme_path: relative,
    suspended_bytes: Buffer.from(suspended).toString("base64"),
    suspended_digest: k.kernelDigest(suspended),
    head_digest: k.kernelDigest(head),
  };
  const snapshot: Suspension = { ...contents, digest: k.kernelDigest(contents) };
  const directory = await suspensionDirectory(opts.command, opts.task_id, opts.request_digest);
  await writeKernelArtifact(directory, "controller-suspension.json", snapshot);
  await atomicWriteFile(path.join(sourceCheckout, relative), head);
  try {
    return await opts.run();
  } finally {
    await restoreSuspension({
      command: opts.command,
      suspension: snapshot,
      task_id: opts.task_id,
      request_digest: opts.request_digest,
    });
  }
}

function controllerPath(value: string): string | null {
  return value.startsWith("checkout:") ? value.slice("checkout:".length) : null;
}

function kernelRecordFromTask(task: TaskData | null): KernelRecord | null {
  const value = task?.extensions?.[TASK_KERNEL_EXTENSION];
  if (!isRecord(value) || value.kind !== "canonical_task") return null;
  const { digest, ...contents } = value;
  return typeof digest === "string" && k.kernelDigest(contents) === digest
    ? (value as KernelRecord)
    : null;
}

async function copyCanonicalControllerTask(opts: {
  source_task: TaskData;
  source_record: KernelRecord;
  target_command: CommandContext;
  task_id: string;
}): Promise<void> {
  const targetTask = await opts.target_command.taskBackend.getTask(opts.task_id);
  const targetRecord = kernelRecordFromTask(targetTask);
  if (!targetTask || !targetRecord) {
    throw new Error("Merged base has no valid canonical task record");
  }
  const projection = readKernelOperationalProjection(opts.source_task.extensions);
  if (!projection) throw new Error("Canonical controller transfer has no operational projection");
  if (targetRecord.digest === opts.source_record.digest) return;
  const targetRevision = targetTask?.revision ?? 0;
  await opts.target_command.taskBackend.writeTask(
    {
      ...targetTask,
      revision: targetRevision + 1,
      status: "DONE",
      plan_approval: opts.source_task.plan_approval,
      commit: opts.source_task.commit,
      verification: opts.source_task.verification,
      quality_review: opts.source_task.quality_review,
      extensions: {
        ...targetTask.extensions,
        [TASK_KERNEL_EXTENSION]: opts.source_record,
        [KERNEL_OPERATIONAL_PROJECTION]: projection,
      },
    },
    { expectedRevision: targetRevision },
  );
  if (
    kernelRecordFromTask(await opts.target_command.taskBackend.getTask(opts.task_id))?.digest !==
    opts.source_record.digest
  ) {
    throw new Error("Canonical controller transfer destination readback mismatch");
  }
}

/** Route later invocations to the checkout named by a proven Kernel controller transfer. */
export async function resolveCanonicalControllerCommand(opts: {
  command: CommandContext;
  task_id: string;
}): Promise<CommandContext> {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  const record = kernelRecordFromTask(task);
  const target = controllerPath(record?.aggregate.controller_transfer?.to_controller ?? "");
  if (!target || path.resolve(target) === path.resolve(opts.command.resolvedProject.gitRoot)) {
    return opts.command;
  }
  const targetCommand = await loadCommandContext({ cwd: target, rootOverride: null });
  if (
    path.resolve(await resolveCommandGitCommonDir(targetCommand)) !==
    path.resolve(await resolveCommandGitCommonDir(opts.command))
  ) {
    throw new Error("Canonical controller transfer points outside the repository");
  }
  if (!task || !record) throw new Error("Canonical controller transfer source is malformed");
  await copyCanonicalControllerTask({
    source_task: task,
    source_record: record,
    target_command: targetCommand,
    task_id: opts.task_id,
  });
  return targetCommand;
}

/**
 * Move the latest canonical record to the base checkout after provider merge readback. The source
 * record first names the new controller, then the destination CAS write is verified by reread.
 */
export async function transferCanonicalControllerToBase(opts: {
  command: CommandContext;
  runtime: Runtime;
  task_id: string;
  base_checkout: string;
}): Promise<CommandContext> {
  const target = path.resolve(opts.base_checkout);
  if (target === path.resolve(opts.command.resolvedProject.gitRoot)) return opts.command;
  const sourceRead = await opts.runtime.adapter.read(opts.task_id);
  if (sourceRead.kind !== "canonical")
    throw new Error("Canonical controller source is unavailable");
  const authority = sourceRead.record.aggregate.authority_lineage?.at(-1)?.authority;
  if (!authority) throw new Error("Canonical controller transfer has no active authority");
  const from = `checkout:${path.resolve(opts.command.resolvedProject.gitRoot)}`;
  const to = `checkout:${target}`;
  if (sourceRead.record.aggregate.controller_transfer?.to_controller !== to) {
    requireKernelCommit(
      await opts.runtime.lifecycle.apply(
        await opts.runtime.input(
          {
            kind: "record_controller_transfer",
            receipt: {
              from_controller: from,
              to_controller: to,
              state_digest: sourceRead.record.digest,
              authority_digest: authority.digest,
            },
          },
          `controller-transfer:${k.kernelDigest({ from, to, state: sourceRead.record.digest })}`,
        ),
      ),
    );
  }
  const transferred = await opts.runtime.adapter.read(opts.task_id);
  if (transferred.kind !== "canonical") throw new Error("Canonical controller transfer was lost");
  const targetCommand = await loadCommandContext({ cwd: target, rootOverride: null });
  if (
    path.resolve(await resolveCommandGitCommonDir(targetCommand)) !==
    path.resolve(await resolveCommandGitCommonDir(opts.command))
  ) {
    throw new Error("Canonical controller transfer target is outside the repository");
  }
  await copyCanonicalControllerTask({
    source_task: transferred.task,
    source_record: transferred.record,
    target_command: targetCommand,
    task_id: opts.task_id,
  });
  return targetCommand;
}
