import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

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

export type BackendConnectParsed = {
  backendId: string;
  endpoint: string | null;
  projectId: string | null;
  provider: string | null;
  token: string | null;
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
    if (result.connection) {
      output.line(
        `connection endpoint=${result.connection.endpoint ?? "unset"} project=${result.connection.projectId ?? "unset"} connected=${result.connection.connected}`,
      );
      if (result.connection.provider) output.line(`provider ${result.connection.provider}`);
      if (result.connection.missing.length > 0) {
        output.line(`missing ${result.connection.missing.join(",")}`);
      }
      for (const override of result.connection.envOverrides ?? []) {
        output.warn(
          `backend config overridden by .env: ${override.key} configured=${override.configured ?? "unset"} effective=${override.effective}`,
        );
        if (override.key === "AGENTPLANE_CLOUD_PROJECT_ID") {
          output.warn(
            "cloud project override is active; task projection freshness and conflicts are evaluated against the effective project id, not backend.json",
          );
        }
      }
      if (result.connection.syncState) {
        const syncState = result.connection.syncState;
        output.line(
          `sync_state unavailable=${syncState.unavailable} degraded=${syncState.degraded ?? "unknown"} reason=${syncState.reason ?? "none"} failed_jobs=${syncState.failedJobs ?? "unknown"} queued_jobs=${syncState.queuedJobs ?? "unknown"} running_jobs=${syncState.runningJobs ?? "unknown"} delayed_jobs=${syncState.delayedJobs ?? "unknown"} pull_cursor=${syncState.pullCursor ?? "unset"} open_conflicts=${syncState.openConflicts}`,
        );
        if (syncState.degraded === true) {
          output.warn(
            `cloud sync state degraded: reason=${syncState.reason ?? "unknown"} failed_jobs=${syncState.failedJobs ?? "unknown"}; local task mutations may be blocked when projection freshness expires`,
          );
          output.line(
            "safe_command agentplane backend sync cloud --direction pull --conflict=diff",
          );
        }
        if (syncState.latestJob) {
          output.line(
            `sync_state_latest_job id=${syncState.latestJob.id ?? "unknown"} type=${syncState.latestJob.type ?? "unknown"} status=${syncState.latestJob.status ?? "unknown"} error=${JSON.stringify(syncState.latestJob.error ?? "")}`,
          );
        }
      }
    }
    if (result.freshness) {
      output.line(
        `freshness last_checked_at=${result.freshness.lastCheckedAt ?? "never"} stale=${result.freshness.stale} stale_after_seconds=${result.freshness.staleAfterSeconds ?? "unset"}`,
      );
      if (result.freshness.statePath) output.line(`state ${result.freshness.statePath}`);
    }
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

export async function cmdBackendConnectParsed(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  flags: BackendConnectParsed;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.flags.backendId !== "cloud") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "backend connect currently supports cloud only",
        context: { command: "backend connect", reason_code: "connect_backend_unsupported" },
      });
    }
    if (ctx.backendId !== "cloud") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Configured backend is "${ctx.backendId}", not "cloud"`,
        context: { command: "backend connect", reason_code: "connect_backend_mismatch" },
      });
    }
    const current = await readBackendConfig(ctx.backendConfigPath);
    const settings = isRecord(current.settings) ? current.settings : {};
    const next = {
      ...current,
      id: "cloud",
      version: typeof current.version === "number" ? current.version : 1,
      settings: {
        ...settings,
        ...(opts.flags.endpoint ? { endpoint: opts.flags.endpoint.replaceAll(/\/+$/gu, "") } : {}),
        ...(opts.flags.projectId ? { project_id: opts.flags.projectId } : {}),
        ...(opts.flags.provider ? { provider: opts.flags.provider } : {}),
      },
    };
    await writeFile(ctx.backendConfigPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
    if (opts.flags.token) {
      await upsertDotEnvValues(path.join(ctx.resolvedProject.gitRoot, ".env"), {
        AGENTPLANE_CLOUD_TOKEN: opts.flags.token,
      });
    }
    if (!opts.flags.quiet) {
      output.success(
        "backend connect",
        undefined,
        `backend=cloud endpoint=${opts.flags.endpoint ?? "unchanged"} project=${opts.flags.projectId ?? "unchanged"}`,
      );
      if (opts.flags.token) {
        output.line("stored AGENTPLANE_CLOUD_TOKEN in ignored project .env");
      } else {
        output.line("set AGENTPLANE_CLOUD_TOKEN in the environment or local secret store");
      }
      output.line("next: agentplane backend inspect cloud --yes");
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "backend connect", root: opts.rootOverride ?? null });
  }
}

async function readBackendConfig(configPath: string): Promise<Record<string, unknown>> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as unknown;
    return isRecord(raw) ? raw : {};
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return {};
    throw err;
  }
}

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}

async function upsertDotEnvValues(filePath: string, values: Record<string, string>): Promise<void> {
  let existing = "";
  try {
    existing = await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }

  const pending = new Map(Object.entries(values));
  const lines = existing.split(/\r?\n/u);
  const nextLines = lines.map((line) => {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/u.exec(line);
    const key = match?.[1];
    if (!key || !pending.has(key)) return line;
    const value = pending.get(key) ?? "";
    pending.delete(key);
    return `${key}=${quoteDotEnvValue(value)}`;
  });

  if (nextLines.length > 0 && nextLines.at(-1) === "") {
    nextLines.pop();
  }
  for (const [key, value] of pending) {
    nextLines.push(`${key}=${quoteDotEnvValue(value)}`);
  }
  await writeFile(filePath, `${nextLines.join("\n")}\n`, "utf8");
}

function quoteDotEnvValue(value: string): string {
  if (/^[A-Za-z0-9_./:@+-]+$/u.test(value)) return value;
  return JSON.stringify(value);
}
