import { backendNotSupportedMessage, successMessage, warnMessage } from "../cli/output.js";
import { mapBackendError } from "../cli/error-map.js";
import { CliError } from "../shared/errors.js";
import { loadCommandContext, type CommandContext } from "./shared/task-backend.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";

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

export async function cmdBackendSyncParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendSyncParsed;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const backendId = ctx.backendId;
    const config = ctx.config;
    if (opts.flags.backendId && backendId && opts.flags.backendId !== backendId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${backendId}", not "${opts.flags.backendId}"`,
        context: { command: "backend sync", reason_code: "sync_backend_mismatch" },
      });
    }
    if (!backend.sync) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("sync()"),
      });
    }
    if (backendId !== "local") {
      await ensureNetworkApproved({
        config,
        yes: opts.flags.yes,
        reason: `backend sync may access the network (backend: ${backendId})`,
      });
    }
    await backend.sync({
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
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const backendId = ctx.backendId;
    const config = ctx.config;
    if (opts.flags.backendId && backendId && opts.flags.backendId !== backendId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${backendId}", not "${opts.flags.backendId}"`,
        context: { command: "sync", reason_code: "sync_backend_mismatch" },
      });
    }
    if (!backend.sync) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("sync()"),
      });
    }
    if (backendId !== "local") {
      await ensureNetworkApproved({
        config,
        yes: opts.flags.yes,
        reason: `sync may access the network (backend: ${backendId})`,
      });
    }
    await backend.sync({
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
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const backendId = ctx.backendId;
    const config = ctx.config;
    if (opts.flags.backendId && backendId && opts.flags.backendId !== backendId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${backendId}", not "${opts.flags.backendId}"`,
        context: {
          command: "backend migrate-canonical-state",
          reason_code: "sync_backend_mismatch",
        },
      });
    }
    if (!backend.migrateCanonicalState) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("migrateCanonicalState()"),
      });
    }
    if (backendId !== "local") {
      await ensureNetworkApproved({
        config,
        yes: opts.flags.yes,
        reason: `backend migrate-canonical-state may access the network (backend: ${backendId})`,
      });
    }
    const result = await backend.migrateCanonicalState();
    if (!opts.flags.quiet) {
      process.stdout.write(
        `${successMessage(
          "backend migrate-canonical-state",
          undefined,
          `scanned=${result.scanned} migrated=${result.migrated.length} skipped-structured=${result.skippedStructured.length} skipped-no-doc=${result.skippedNoDoc.length} failed=${result.failed.length}`,
        )}\n`,
      );
    }
    if (result.failed.length > 0) {
      for (const failure of result.failed.slice(0, 20)) {
        process.stderr.write(
          `${warnMessage(`backend migrate-canonical-state failed for ${failure.taskId}: ${failure.reason}`)}\n`,
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
