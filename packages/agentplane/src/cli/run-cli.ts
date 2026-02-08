import os from "node:os";
import path from "node:path";

import { loadConfig, resolveProject } from "@agentplaneorg/core";
import { mapCoreError } from "./error-map.js";
import { warnMessage } from "./output.js";
import {
  fetchLatestNpmVersion,
  readUpdateCheckCache,
  resolveUpdateCheckCachePath,
  shouldCheckNow,
  UPDATE_CHECK_SCHEMA_VERSION,
  UPDATE_CHECK_TIMEOUT_MS,
  UPDATE_CHECK_TTL_MS,
  writeUpdateCheckCache,
  type UpdateCheckCache,
} from "./update-check.js";
import { loadDotEnv } from "../shared/env.js";
import { CliError, formatJsonError } from "../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { getVersion } from "../meta/version.js";
import { parseCommandArgv } from "./spec/parse.js";
import { helpSpec } from "./spec/help.js";
import { usageError } from "./spec/errors.js";
import { suggestOne } from "./spec/suggest.js";
import { COMMANDS } from "./run-cli/command-catalog.js";

type ParsedArgs = {
  help: boolean;
  version: boolean;
  noUpdateCheck: boolean;
  root?: string;
  jsonErrors: boolean;
  allowNetwork: boolean;
};

function prescanJsonErrors(argv: readonly string[]): boolean {
  // If parseGlobalArgs throws (e.g. missing --root value), we still want to honor
  // `--json` in the "scoped global" zone (before the command id).
  let hasRest = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;

    // Global flags that do not accept values.
    if (arg === "--help" || arg === "-h") continue;
    if (arg === "--version" || arg === "-v") continue;
    if (arg === "--no-update-check") continue;
    if (arg === "--allow-network") continue;

    // Scoped global: only before the command id.
    if (arg === "--json") {
      if (!hasRest) return true;
      continue;
    }

    // Global flags with values.
    if (arg === "--root") {
      // Skip the value if present; do not throw on missing value here.
      i++;
      continue;
    }

    // First non-global token is treated as the start of the command id.
    hasRest = true;
    break;
  }
  return false;
}

function parseGlobalArgs(argv: string[]): { globals: ParsedArgs; rest: string[] } {
  let help = false;
  let version = false;
  let noUpdateCheck = false;
  let jsonErrors = false;
  let root: string | undefined;
  let allowNetwork = false;

  const rest: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg) continue;
    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }
    if (arg === "--version" || arg === "-v") {
      version = true;
      continue;
    }
    if (arg === "--no-update-check") {
      noUpdateCheck = true;
      continue;
    }
    if (arg === "--allow-network") {
      // Scoped global: only treat `--allow-network` as a global approval if it appears
      // before the command id. This avoids accidental capture of command-specific flags.
      if (rest.length === 0) {
        allowNetwork = true;
        continue;
      }
      rest.push(arg);
      continue;
    }
    if (arg === "--json") {
      // Scoped global: only treat `--json` as "JSON errors" if it appears
      // before the command id. This allows per-command `--json` (e.g. `help`).
      if (rest.length === 0) {
        jsonErrors = true;
        continue;
      }
      rest.push(arg);
      continue;
    }
    if (arg === "--root") {
      const next = argv[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Missing value after --root (expected repository path)",
        });
      root = next;
      i++;
      continue;
    }
    rest.push(arg);
  }
  return { globals: { help, version, noUpdateCheck, root, jsonErrors, allowNetwork }, rest };
}

type CatalogMatch = { entry: (typeof COMMANDS)[number]; consumed: number };

function matchCommandCatalog(tokens: readonly string[]): CatalogMatch | null {
  let best: CatalogMatch | null = null;
  for (const entry of COMMANDS) {
    const id = entry.spec.id;
    if (tokens.length < id.length) continue;
    let ok = true;
    for (const [i, seg] of id.entries()) {
      if (tokens[i] !== seg) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (!best || id.length > best.consumed) {
      best = { entry, consumed: id.length };
    }
  }
  return best;
}

function writeError(err: CliError, jsonErrors: boolean): void {
  const hint = renderErrorHint(err);
  if (jsonErrors) {
    process.stdout.write(`${formatJsonError(err)}\n`);
  } else {
    const header = `error [${err.code}]`;
    if (err.message.includes("\n")) {
      process.stderr.write(`${header}\n${err.message}\n`);
    } else {
      process.stderr.write(`${header}: ${err.message}\n`);
    }
    if (hint) {
      process.stderr.write(`hint: ${hint}\n`);
    }
  }
}

const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";

function resolveAgentplaneHome(): string {
  const overridden = process.env[AGENTPLANE_HOME_ENV]?.trim();
  if (overridden) return overridden;
  return path.join(os.homedir(), ".agentplane");
}

function renderErrorHint(err: CliError): string | undefined {
  const command = typeof err.context?.command === "string" ? err.context.command : undefined;
  const usage = command ? `agentplane help ${command} --compact` : "agentplane help";
  switch (err.code) {
    case "E_USAGE": {
      return `See \`${usage}\` for usage.`;
    }
    case "E_GIT": {
      if (command?.startsWith("branch")) {
        return "Check git repo/branch; run `git branch` or pass --root <path>.";
      }
      if (command === "guard commit" || command === "commit") {
        return "Check git status/index; stage changes and retry.";
      }
      return "Check git repo context; pass --root <path> if needed.";
    }
    case "E_NETWORK": {
      return "Check network access and credentials.";
    }
    case "E_BACKEND": {
      if (command?.includes("sync")) {
        return "Check backend config under .agentplane/backends and retry.";
      }
      return "Check backend config under .agentplane/backends.";
    }
    default: {
      return undefined;
    }
  }
}

const UPDATE_CHECK_PACKAGE = "agentplane";
const UPDATE_CHECK_URL = `https://registry.npmjs.org/${UPDATE_CHECK_PACKAGE}/latest`;

function parseVersionParts(version: string): { main: number[]; prerelease: string | null } {
  const cleaned = version.trim().replace(/^v/i, "").split("+")[0] ?? "";
  const [mainRaw, prereleaseRaw] = cleaned.split("-", 2);
  const main = (mainRaw ?? "")
    .split(".")
    .filter((part) => part.length > 0)
    .map((part) => {
      const parsed = Number.parseInt(part, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    });
  return { main, prerelease: prereleaseRaw ? prereleaseRaw.trim() : null };
}

function compareVersions(left: string, right: string): number {
  const a = parseVersionParts(left);
  const b = parseVersionParts(right);
  const length = Math.max(a.main.length, b.main.length);
  for (let i = 0; i < length; i++) {
    const partA = a.main[i] ?? 0;
    const partB = b.main[i] ?? 0;
    if (partA !== partB) return partA > partB ? 1 : -1;
  }
  if (a.prerelease === b.prerelease) return 0;
  if (a.prerelease === null) return 1;
  if (b.prerelease === null) return -1;
  return a.prerelease.localeCompare(b.prerelease);
}

function isTruthyEnv(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

async function maybeWarnOnUpdate(opts: {
  currentVersion: string;
  skip: boolean;
  jsonErrors: boolean;
}): Promise<void> {
  if (opts.skip || opts.jsonErrors) return;
  if (isTruthyEnv(process.env.AGENTPLANE_NO_UPDATE_CHECK)) return;
  const now = new Date();
  const cachePath = resolveUpdateCheckCachePath(resolveAgentplaneHome());
  const cache = await readUpdateCheckCache(cachePath);
  if (cache && !shouldCheckNow(cache.checked_at, now, UPDATE_CHECK_TTL_MS)) {
    if (
      cache.status === "ok" &&
      cache.latest_version &&
      compareVersions(cache.latest_version, opts.currentVersion) > 0
    ) {
      const message = `Update available: ${UPDATE_CHECK_PACKAGE} ${opts.currentVersion} → ${cache.latest_version}. Run: npm i -g ${UPDATE_CHECK_PACKAGE}@latest`;
      process.stderr.write(`${warnMessage(message)}\n`);
    }
    return;
  }

  const result = await fetchLatestNpmVersion({
    url: UPDATE_CHECK_URL,
    timeoutMs: UPDATE_CHECK_TIMEOUT_MS,
    etag: cache?.etag ?? null,
  });

  const nextCache: UpdateCheckCache = {
    schema_version: UPDATE_CHECK_SCHEMA_VERSION,
    checked_at: now.toISOString(),
    latest_version: cache?.latest_version ?? null,
    etag: cache?.etag ?? null,
    status: "error",
  };

  if (result.status === "ok") {
    nextCache.status = "ok";
    nextCache.latest_version = result.latestVersion;
    nextCache.etag = result.etag;
  } else if (result.status === "not_modified") {
    nextCache.status = "not_modified";
    nextCache.etag = result.etag ?? nextCache.etag;
  }

  try {
    await writeUpdateCheckCache(cachePath, nextCache);
  } catch {
    // Best-effort cache: ignore write failures.
  }

  const latest = result.status === "ok" ? result.latestVersion : nextCache.latest_version;
  if (!latest || result.status === "error") return;
  if (compareVersions(latest, opts.currentVersion) <= 0) return;
  const message = `Update available: ${UPDATE_CHECK_PACKAGE} ${opts.currentVersion} → ${latest}. Run: npm i -g ${UPDATE_CHECK_PACKAGE}@latest`;
  process.stderr.write(`${warnMessage(message)}\n`);
}

type CliResolvedProject = Awaited<ReturnType<typeof resolveProject>>;

async function maybeResolveProject(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<CliResolvedProject | null> {
  try {
    return await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Not a git repository")) {
      return null;
    }
    throw err;
  }
}

export async function runCli(argv: string[]): Promise<number> {
  let jsonErrors = prescanJsonErrors(argv);
  try {
    const { globals, rest } = parseGlobalArgs(argv);
    jsonErrors = globals.jsonErrors;

    if (globals.version) {
      process.stdout.write(`${getVersion()}\n`);
      return 0;
    }

    const runCli2HelpFast = async (helpArgv: string[]): Promise<number> => {
      const { buildRegistry } = await import("./run-cli/registry.run.js");
      const registry = buildRegistry((_cmd: string) =>
        Promise.reject(new Error("getCtx should not be called for help")),
      );

      const match = registry.match(helpArgv);
      if (!match) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Unknown command: help" });
      }
      const tail = helpArgv.slice(match.consumed);
      const parsed = parseCommandArgv(match.spec, tail).parsed;
      return await match.handler({ cwd: process.cwd(), rootOverride: globals.root }, parsed);
    };

    // `--help` is treated as an alias for `help` and supports per-command help:
    // - agentplane --help
    // - agentplane <cmd...> --help [--compact|--json]
    if (globals.help) {
      return await runCli2HelpFast(["help", ...rest]);
    }
    if (rest.length === 0) {
      return await runCli2HelpFast(["help"]);
    }

    // cli2: `agentplane help ...` should be fast and not require project resolution.
    if (rest[0] === "help") {
      return await runCli2HelpFast(rest);
    }

    const matched = matchCommandCatalog(rest);

    const cwd = process.cwd();
    const resolved =
      matched?.entry.needsProject === false
        ? null
        : await maybeResolveProject({ cwd, rootOverride: globals.root });
    if (resolved) {
      await loadDotEnv(resolved.gitRoot);
    }

    // `require_network=true` means "no network without explicit approval".
    // Update-check is an optional network call, so it must be gated after config load.
    let skipUpdateCheckForPolicy = true;
    if (resolved && matched?.entry.needsConfig !== false) {
      try {
        const loaded = await loadConfig(resolved.agentplaneDir);
        const requireNetwork = loaded.config.agents?.approvals.require_network === true;
        const explicitlyApproved = globals.allowNetwork;
        skipUpdateCheckForPolicy = requireNetwork && !explicitlyApproved;
      } catch {
        // Conservative: if we can't load config, we can't prove network is allowed.
        skipUpdateCheckForPolicy = true;
      }
    }
    await maybeWarnOnUpdate({
      currentVersion: getVersion(),
      skip:
        globals.noUpdateCheck || skipUpdateCheckForPolicy || matched?.entry.needsConfig === false,
      jsonErrors: globals.jsonErrors,
    });

    let ctxPromise: Promise<CommandContext> | null = null;
    const getCtx = async (commandForErrorContext: string): Promise<CommandContext> => {
      ctxPromise ??= loadCommandContext({ cwd, rootOverride: globals.root ?? null });
      try {
        return await ctxPromise;
      } catch (err) {
        throw mapCoreError(err, { command: commandForErrorContext, root: globals.root ?? null });
      }
    };
    const getCtxOrThrow = async (commandForErrorContext: string): Promise<CommandContext> => {
      if (matched?.entry.needsTaskContext === false) {
        throw new CliError({
          exitCode: 1,
          code: "E_INTERNAL",
          message: `Internal error: command does not require task context but attempted to load it: ${commandForErrorContext}`,
        });
      }
      return await getCtx(commandForErrorContext);
    };

    // cli2 command routing (single router).
    const { buildRegistry } = await import("./run-cli/registry.run.js");
    const registry = buildRegistry(getCtxOrThrow);

    const match = registry.match(rest);
    if (match) {
      const tail = rest.slice(match.consumed);
      const parsed = parseCommandArgv(match.spec, tail).parsed;
      return await match.handler({ cwd, rootOverride: globals.root }, parsed);
    }

    const input = rest.join(" ");
    const fullCandidates = registry.list().map((e) => e.spec.id.join(" "));
    const suggestion = suggestOne(input, fullCandidates);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: helpSpec,
      command: "help",
      message: `Unknown command: ${input}.${suffix}`,
    });
  } catch (err) {
    if (err instanceof CliError) {
      writeError(err, jsonErrors);
      return err.exitCode;
    }

    const message = err instanceof Error ? err.message : String(err);
    const wrapped = new CliError({ exitCode: 1, code: "E_INTERNAL", message });
    writeError(wrapped, jsonErrors);
    return wrapped.exitCode;
  }
}
