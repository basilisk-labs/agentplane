import { backendNotSupportedMessage, usageMessage } from "../cli/output.js";
import { mapBackendError } from "../cli/error-map.js";
import { CliError } from "../shared/errors.js";
import { loadTaskBackend } from "../backends/task-backend.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";

export const BACKEND_SYNC_USAGE =
  "Usage: agentplane backend sync <id> --direction <push|pull> [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
export const BACKEND_SYNC_USAGE_EXAMPLE = "agentplane backend sync local --direction pull";
export const SYNC_USAGE =
  "Usage: agentplane sync [<id>] [--direction <push|pull>] [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
export const SYNC_USAGE_EXAMPLE = "agentplane sync --direction push --yes";

type BackendSyncFlags = {
  backendId: string;
  direction: "push" | "pull";
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  confirm: boolean;
  quiet: boolean;
};

function parseBackendSyncArgs(args: string[]): BackendSyncFlags {
  let backendId = "";
  let direction: "push" | "pull" | null = null;
  let conflict: BackendSyncFlags["conflict"] = "diff";
  let confirm = false;
  let quiet = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      if (backendId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
        });
      }
      backendId = arg;
      continue;
    }

    if (arg === "--direction") {
      const next = args[i + 1];
      if (!next || (next !== "push" && next !== "pull")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
        });
      }
      direction = next;
      i++;
      continue;
    }
    if (arg === "--conflict") {
      const next = args[i + 1];
      if (!next || !["diff", "prefer-local", "prefer-remote", "fail"].includes(next)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
        });
      }
      conflict = next as BackendSyncFlags["conflict"];
      i++;
      continue;
    }
    if (arg === "--yes") {
      confirm = true;
      continue;
    }
    if (arg === "--quiet") {
      quiet = true;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
    });
  }

  if (!backendId || !direction) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
    });
  }

  return { backendId, direction, conflict, confirm, quiet };
}

type SyncFlags = {
  backendId: string | null;
  direction: "push" | "pull";
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  confirm: boolean;
  quiet: boolean;
};

function parseSyncArgs(args: string[]): SyncFlags {
  let backendId: string | null = null;
  let direction: "push" | "pull" = "push";
  let conflict: SyncFlags["conflict"] = "diff";
  let confirm = false;
  let quiet = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      if (backendId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(SYNC_USAGE, SYNC_USAGE_EXAMPLE),
        });
      }
      backendId = arg;
      continue;
    }

    if (arg === "--direction") {
      const next = args[i + 1];
      if (!next || (next !== "push" && next !== "pull")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(SYNC_USAGE, SYNC_USAGE_EXAMPLE),
        });
      }
      direction = next;
      i++;
      continue;
    }
    if (arg === "--conflict") {
      const next = args[i + 1];
      if (!next || !["diff", "prefer-local", "prefer-remote", "fail"].includes(next)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(SYNC_USAGE, SYNC_USAGE_EXAMPLE),
        });
      }
      conflict = next as SyncFlags["conflict"];
      i++;
      continue;
    }
    if (arg === "--yes") {
      confirm = true;
      continue;
    }
    if (arg === "--quiet") {
      quiet = true;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(SYNC_USAGE, SYNC_USAGE_EXAMPLE),
    });
  }

  return { backendId, direction, conflict, confirm, quiet };
}

export async function cmdBackendSync(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseBackendSyncArgs(opts.args);
  try {
    const { backend, backendId, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (flags.backendId && backendId && flags.backendId !== backendId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${backendId}", not "${flags.backendId}"`,
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
        yes: flags.confirm,
        reason: `backend sync may access the network (backend: ${backendId})`,
      });
    }
    await backend.sync({
      direction: flags.direction,
      conflict: flags.conflict,
      quiet: flags.quiet,
      confirm: flags.confirm,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "backend sync", root: opts.rootOverride ?? null });
  }
}

export async function cmdSync(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseSyncArgs(opts.args);
  try {
    const { backend, backendId, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (flags.backendId && backendId && flags.backendId !== backendId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${backendId}", not "${flags.backendId}"`,
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
        yes: flags.confirm,
        reason: `sync may access the network (backend: ${backendId})`,
      });
    }
    await backend.sync({
      direction: flags.direction,
      conflict: flags.conflict,
      quiet: flags.quiet,
      confirm: flags.confirm,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "sync", root: opts.rootOverride ?? null });
  }
}
