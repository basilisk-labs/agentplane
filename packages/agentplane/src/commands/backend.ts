import { backendNotSupportedMessage } from "../cli/output.js";
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
