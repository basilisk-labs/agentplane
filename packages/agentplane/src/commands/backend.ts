import { backendNotSupportedMessage, createCliEmitter } from "../cli/output.js";
import { mapBackendError } from "../cli/error-map.js";
import { CliError } from "../shared/errors.js";
import type { TaskBackend } from "../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "./shared/task-backend.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";
const output = createCliEmitter();

export type BackendSyncParsed = {
  backendId: string;
  direction: "push" | "pull";
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  yes: boolean;
  quiet: boolean;
};

export type SyncParsed = {
  backendId: string | null;
  direction: "push" | "pull";
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  yes: boolean;
  quiet: boolean;
};

export type BackendMigrateCanonicalStateParsed = {
  backendId: string;
  yes: boolean;
  quiet: boolean;
};

export type BackendInspectParsed = {
  backendId: string;
  yes: boolean;
  quiet: boolean;
};

type BackendCommandDescriptor<Flags extends { backendId?: string | null; yes: boolean }> = {
  command: string;
  operation: keyof Pick<TaskBackend, "sync" | "migrateCanonicalState" | "inspectConfiguration">;
  unsupportedLabel: string;
  mismatchReasonCode: string;
  networkAction: string;
  networkReason: (backendId: string) => string;
  flags: Flags;
};

async function resolveBackendCommandContext<
  Flags extends { backendId?: string | null; yes: boolean },
>(
  opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
  },
  descriptor: BackendCommandDescriptor<Flags>,
): Promise<{ ctx: CommandContext; backend: TaskBackend; backendId: string }> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const backend = ctx.taskBackend;
  const backendId = ctx.backendId;
  if (descriptor.flags.backendId && backendId && descriptor.flags.backendId !== backendId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Configured backend is "${backendId}", not "${descriptor.flags.backendId}"`,
      context: { command: descriptor.command, reason_code: descriptor.mismatchReasonCode },
    });
  }
  if (!backend[descriptor.operation]) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage(descriptor.unsupportedLabel),
    });
  }
  if (backendId !== "local") {
    await ensureNetworkApproved({
      action: descriptor.networkAction,
      config: ctx.config,
      yes: descriptor.flags.yes,
      reason: descriptor.networkReason(backendId),
    });
  }
  return { ctx, backend, backendId };
}

export async function cmdBackendSyncParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendSyncParsed;
}): Promise<number> {
  try {
    const { backend } = await resolveBackendCommandContext(opts, {
      command: "backend sync",
      operation: "sync",
      unsupportedLabel: "sync()",
      mismatchReasonCode: "sync_backend_mismatch",
      networkAction: "backend_sync",
      networkReason: (backendId) => `backend sync may access the network (backend: ${backendId})`,
      flags: opts.flags,
    });
    await backend.sync!({
      direction: opts.flags.direction,
      conflict: opts.flags.conflict,
      quiet: opts.flags.quiet,
      confirm: opts.flags.yes,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "backend sync", root: opts.rootOverride ?? null });
  }
}

export async function cmdSyncParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: SyncParsed;
}): Promise<number> {
  try {
    const { backend } = await resolveBackendCommandContext(opts, {
      command: "sync",
      operation: "sync",
      unsupportedLabel: "sync()",
      mismatchReasonCode: "sync_backend_mismatch",
      networkAction: "backend_sync",
      networkReason: (backendId) => `sync may access the network (backend: ${backendId})`,
      flags: opts.flags,
    });
    await backend.sync!({
      direction: opts.flags.direction,
      conflict: opts.flags.conflict,
      quiet: opts.flags.quiet,
      confirm: opts.flags.yes,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "sync", root: opts.rootOverride ?? null });
  }
}

export async function cmdBackendMigrateCanonicalStateParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendMigrateCanonicalStateParsed;
}): Promise<number> {
  try {
    const { backend } = await resolveBackendCommandContext(opts, {
      command: "backend migrate-canonical-state",
      operation: "migrateCanonicalState",
      unsupportedLabel: "migrateCanonicalState()",
      mismatchReasonCode: "sync_backend_mismatch",
      networkAction: "backend_migrate_canonical_state",
      networkReason: (backendId) =>
        `backend migrate-canonical-state may access the network (backend: ${backendId})`,
      flags: opts.flags,
    });
    const result = await backend.migrateCanonicalState!();
    if (!opts.flags.quiet) {
      output.success(
        "backend migrate-canonical-state",
        undefined,
        `scanned=${result.scanned} migrated=${result.migrated.length} skipped-structured=${result.skippedStructured.length} skipped-no-doc=${result.skippedNoDoc.length} failed=${result.failed.length}`,
      );
    }
    if (result.failed.length > 0) {
      for (const failure of result.failed.slice(0, 20)) {
        output.warn(
          `backend migrate-canonical-state failed for ${failure.taskId}: ${failure.reason}`,
        );
      }
      return 1;
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "backend migrate-canonical-state",
      root: opts.rootOverride ?? null,
    });
  }
}

export async function cmdBackendInspectParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendInspectParsed;
}): Promise<number> {
  try {
    const { backend } = await resolveBackendCommandContext(opts, {
      command: "backend inspect",
      operation: "inspectConfiguration",
      unsupportedLabel: "inspectConfiguration()",
      mismatchReasonCode: "inspect_backend_mismatch",
      networkAction: "backend_inspect",
      networkReason: (backendId) =>
        `backend inspect may access the network (backend: ${backendId})`,
      flags: opts.flags,
    });
    const result = await backend.inspectConfiguration!();
    if (opts.flags.quiet) return 0;
    const canonicalStateSummary =
      result.canonicalState.configuredFieldId === null
        ? result.canonicalState.visibleFieldId === null
          ? "missing"
          : `visible-unconfigured:${result.canonicalState.visibleFieldId}`
        : `configured:${result.canonicalState.configuredFieldId}`;
    output.success(
      "backend inspect",
      undefined,
      `visible-fields=${result.visibleCustomFields.length} canonical-state=${canonicalStateSummary} drift=${result.configuredFieldNameDrift.length}`,
    );
    output.line(
      `canonical_state configured=${result.canonicalState.configuredFieldId ?? "unset"} visible=${result.canonicalState.visibleFieldId ?? "absent"}`,
    );
    for (const drift of result.configuredFieldNameDrift) {
      output.line(
        `drift key=${drift.key} configured-id=${drift.configuredId} visible-name=${JSON.stringify(drift.visibleName)}`,
      );
    }
    for (const field of result.visibleCustomFields) {
      output.line(
        `field id=${field.id} name=${JSON.stringify(field.name)} non-empty=${field.nonEmptyCount}`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "backend inspect", root: opts.rootOverride ?? null });
  }
}
