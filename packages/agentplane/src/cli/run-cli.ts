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
import { CommandRegistry } from "../cli2/registry.js";
import { parseCommandArgv } from "../cli2/parse.js";
import { helpSpec, makeHelpHandler } from "../cli2/help.js";
import { usageError } from "../cli2/errors.js";
import { suggestOne } from "../cli2/suggest.js";
import { initSpec, runInit } from "./run-cli/commands/init.js";
import {
  agentsSpec,
  quickstartSpec,
  roleSpec,
  runAgents,
  runQuickstart,
  runRole,
} from "./run-cli/commands/core.js";
import {
  configSetSpec,
  configShowSpec,
  modeGetSpec,
  modeSetSpec,
  runConfigSet,
  runConfigShow,
  runModeGet,
  runModeSet,
} from "./run-cli/commands/config.js";
import { ideSyncSpec, runIdeSync } from "./run-cli/commands/ide.js";
import { taskNewSpec, makeRunTaskNewHandler } from "../commands/task/new.command.js";
import { taskListSpec, makeRunTaskListHandler } from "../commands/task/list.command.js";
import { taskNextSpec, makeRunTaskNextHandler } from "../commands/task/next.command.js";
import { taskSearchSpec, makeRunTaskSearchHandler } from "../commands/task/search.command.js";
import { taskShowSpec, makeRunTaskShowHandler } from "../commands/task/show.command.js";
import { taskAddSpec, makeRunTaskAddHandler } from "../commands/task/add.command.js";
import { taskUpdateSpec, makeRunTaskUpdateHandler } from "../commands/task/update.command.js";
import { taskCommentSpec, makeRunTaskCommentHandler } from "../commands/task/comment.command.js";
import {
  taskSetStatusSpec,
  makeRunTaskSetStatusHandler,
} from "../commands/task/set-status.command.js";
import { taskDocSpec, runTaskDoc } from "../commands/task/doc.command.js";
import { taskDocShowSpec, makeRunTaskDocShowHandler } from "../commands/task/doc-show.command.js";
import { taskDocSetSpec, makeRunTaskDocSetHandler } from "../commands/task/doc-set.command.js";
import { taskScrubSpec, makeRunTaskScrubHandler } from "../commands/task/scrub.command.js";
import { taskScaffoldSpec, makeRunTaskScaffoldHandler } from "../commands/task/scaffold.command.js";
import {
  taskNormalizeSpec,
  makeRunTaskNormalizeHandler,
} from "../commands/task/normalize.command.js";
import { taskExportSpec, makeRunTaskExportHandler } from "../commands/task/export.command.js";
import { taskLintSpec, runTaskLint } from "../commands/task/lint.command.js";
import { taskMigrateSpec, makeRunTaskMigrateHandler } from "../commands/task/migrate.command.js";
import { taskMigrateDocSpec, runTaskMigrateDoc } from "../commands/task/migrate-doc.command.js";
import { taskDeriveSpec, makeRunTaskDeriveHandler } from "../commands/task/derive.command.js";
import { taskPlanSetSpec, makeRunTaskPlanSetHandler } from "../commands/task/plan-set.command.js";
import {
  taskPlanApproveSpec,
  makeRunTaskPlanApproveHandler,
} from "../commands/task/plan-approve.command.js";
import {
  taskPlanRejectSpec,
  makeRunTaskPlanRejectHandler,
} from "../commands/task/plan-reject.command.js";
import { taskVerifySpec, runTaskVerify } from "../commands/task/verify.command.js";
import {
  taskVerifyOkSpec,
  makeRunTaskVerifyOkHandler,
} from "../commands/task/verify-ok.command.js";
import {
  taskVerifyReworkSpec,
  makeRunTaskVerifyReworkHandler,
} from "../commands/task/verify-rework.command.js";
import {
  taskVerifyShowSpec,
  makeRunTaskVerifyShowHandler,
} from "../commands/task/verify-show.command.js";
import { workStartSpec, makeRunWorkStartHandler } from "../commands/branch/work-start.command.js";
import {
  branchBaseClearSpec,
  branchBaseExplainSpec,
  branchBaseGetSpec,
  branchBaseSetSpec,
  branchBaseSpec,
  runBranchBase,
  runBranchBaseClear,
  runBranchBaseExplain,
  runBranchBaseGet,
  runBranchBaseSet,
} from "../commands/branch/base.command.js";
import { branchStatusSpec, runBranchStatus } from "../commands/branch/status.command.js";
import { branchRemoveSpec, runBranchRemove } from "../commands/branch/remove.command.js";
import { recipesInstallSpec, runRecipesInstall } from "../commands/recipes/install.command.js";
import { recipesListSpec, runRecipesList } from "../commands/recipes/list.command.js";
import {
  recipesListRemoteSpec,
  runRecipesListRemote,
} from "../commands/recipes/list-remote.command.js";
import { recipesInfoSpec, runRecipesInfo } from "../commands/recipes/info.command.js";
import { recipesExplainSpec, runRecipesExplain } from "../commands/recipes/explain.command.js";
import { recipesRemoveSpec, runRecipesRemove } from "../commands/recipes/remove.command.js";
import {
  recipesCachePruneSpec,
  runRecipesCachePrune,
} from "../commands/recipes/cache-prune.command.js";
import { recipesSpec, runRecipes } from "../commands/recipes/recipes.command.js";
import { recipesCacheSpec, runRecipesCache } from "../commands/recipes/cache.command.js";
import { upgradeSpec, runUpgrade } from "../commands/upgrade.command.js";
import {
  backendSpec,
  backendSyncSpec,
  makeRunBackendHandler,
  makeRunBackendSyncHandler,
} from "../commands/backend/sync.command.js";
import { syncSpec, makeRunSyncHandler } from "../commands/sync.command.js";
import { scenarioListSpec, runScenarioList } from "../commands/scenario/list.command.js";
import { scenarioInfoSpec, runScenarioInfo } from "../commands/scenario/info.command.js";
import { scenarioRunSpec, runScenarioRun } from "../commands/scenario/run.command.js";
import { scenarioSpec, runScenario } from "../commands/scenario/scenario.command.js";
import {
  makeRunPrCheckHandler,
  makeRunPrHandler,
  makeRunPrNoteHandler,
  makeRunPrOpenHandler,
  makeRunPrUpdateHandler,
  prCheckSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "../commands/pr/pr.command.js";
import { integrateSpec, makeRunIntegrateHandler } from "../commands/integrate.command.js";
import { commitSpec, makeRunCommitHandler } from "../commands/commit.command.js";
import { startSpec, makeRunStartHandler } from "../commands/start.command.js";
import { blockSpec, makeRunBlockHandler } from "../commands/block.command.js";
import { verifySpec, makeRunVerifyHandler } from "../commands/verify.command.js";
import { finishSpec, makeRunFinishHandler } from "../commands/finish.command.js";
import { readySpec, makeRunReadyHandler } from "../commands/ready.command.js";
import {
  docsCliSpec,
  makeHelpJsonFromSpecs,
  makeRunDocsCliHandler,
} from "../commands/docs/cli.command.js";
import { hooksSpec, runHooks } from "../commands/hooks/hooks.command.js";
import { hooksInstallSpec, runHooksInstall } from "../commands/hooks/install.command.js";
import { hooksUninstallSpec, runHooksUninstall } from "../commands/hooks/uninstall.command.js";
import { hooksRunSpec, runHooksRun } from "../commands/hooks/run.command.js";
import {
  cleanupMergedSpec,
  cleanupSpec,
  makeRunCleanupMergedHandler,
  runCleanup,
} from "../commands/cleanup/merged.command.js";
import { guardSpec, runGuard } from "../commands/guard/guard.command.js";
import { guardCleanSpec, runGuardClean } from "../commands/guard/clean.command.js";
import {
  guardSuggestAllowSpec,
  runGuardSuggestAllow,
} from "../commands/guard/suggest-allow.command.js";
import { guardCommitSpec, makeRunGuardCommitHandler } from "../commands/guard/commit.command.js";

type ParsedArgs = {
  help: boolean;
  version: boolean;
  noUpdateCheck: boolean;
  root?: string;
  jsonErrors: boolean;
  allowNetwork: boolean;
};

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
  let jsonErrors = false;
  try {
    const { globals, rest } = parseGlobalArgs(argv);
    jsonErrors = globals.jsonErrors;

    if (globals.version) {
      process.stdout.write(`${getVersion()}\n`);
      return 0;
    }

    const runCli2HelpFast = async (helpArgv: string[]): Promise<number> => {
      const registry = new CommandRegistry();
      const noop = () => Promise.resolve(0);
      registry.register(initSpec, noop);
      registry.register(upgradeSpec, noop);
      registry.register(quickstartSpec, noop);
      registry.register(roleSpec, noop);
      registry.register(agentsSpec, noop);
      registry.register(configShowSpec, noop);
      registry.register(configSetSpec, noop);
      registry.register(modeGetSpec, noop);
      registry.register(modeSetSpec, noop);
      registry.register(ideSyncSpec, noop);
      registry.register(recipesSpec, noop);
      registry.register(recipesCacheSpec, noop);
      registry.register(recipesListSpec, noop);
      registry.register(recipesListRemoteSpec, noop);
      registry.register(recipesInfoSpec, noop);
      registry.register(recipesExplainSpec, noop);
      registry.register(recipesRemoveSpec, noop);
      registry.register(recipesCachePruneSpec, noop);
      registry.register(scenarioListSpec, noop);
      registry.register(scenarioInfoSpec, noop);
      registry.register(scenarioRunSpec, noop);
      registry.register(scenarioSpec, noop);
      registry.register(branchBaseSpec, noop);
      registry.register(branchBaseGetSpec, noop);
      registry.register(branchBaseSetSpec, noop);
      registry.register(branchBaseClearSpec, noop);
      registry.register(branchBaseExplainSpec, noop);
      registry.register(branchStatusSpec, noop);
      registry.register(branchRemoveSpec, noop);
      registry.register(backendSpec, noop);
      registry.register(backendSyncSpec, noop);
      registry.register(syncSpec, noop);
      registry.register(prSpec, noop);
      registry.register(prOpenSpec, noop);
      registry.register(prUpdateSpec, noop);
      registry.register(prCheckSpec, noop);
      registry.register(prNoteSpec, noop);
      registry.register(integrateSpec, noop);
      registry.register(commitSpec, noop);
      registry.register(startSpec, noop);
      registry.register(blockSpec, noop);
      registry.register(verifySpec, noop);
      registry.register(finishSpec, noop);
      registry.register(readySpec, noop);
      registry.register(docsCliSpec, noop);
      registry.register(hooksSpec, noop);
      registry.register(hooksInstallSpec, noop);
      registry.register(hooksUninstallSpec, noop);
      registry.register(hooksRunSpec, noop);
      registry.register(cleanupSpec, noop);
      registry.register(cleanupMergedSpec, noop);
      registry.register(guardSpec, noop);
      registry.register(guardCleanSpec, noop);
      registry.register(guardSuggestAllowSpec, noop);
      registry.register(guardCommitSpec, noop);
      registry.register(taskListSpec, noop);
      registry.register(taskNextSpec, noop);
      registry.register(taskSearchSpec, noop);
      registry.register(taskShowSpec, noop);
      registry.register(taskNewSpec, noop);
      registry.register(taskDeriveSpec, noop);
      registry.register(taskAddSpec, noop);
      registry.register(taskUpdateSpec, noop);
      registry.register(taskCommentSpec, noop);
      registry.register(taskSetStatusSpec, noop);
      registry.register(taskDocSpec, noop);
      registry.register(taskDocShowSpec, noop);
      registry.register(taskDocSetSpec, noop);
      registry.register(taskScrubSpec, noop);
      registry.register(taskScaffoldSpec, noop);
      registry.register(taskNormalizeSpec, noop);
      registry.register(taskExportSpec, noop);
      registry.register(taskLintSpec, noop);
      registry.register(taskMigrateSpec, noop);
      registry.register(taskMigrateDocSpec, noop);
      registry.register(taskPlanSetSpec, noop);
      registry.register(taskPlanApproveSpec, noop);
      registry.register(taskPlanRejectSpec, noop);
      registry.register(taskVerifySpec, noop);
      registry.register(taskVerifyOkSpec, noop);
      registry.register(taskVerifyReworkSpec, noop);
      registry.register(taskVerifyShowSpec, noop);
      registry.register(workStartSpec, noop);
      registry.register(recipesInstallSpec, noop);
      registry.register(helpSpec, makeHelpHandler(registry));

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

    const cwd = process.cwd();
    const resolved = await maybeResolveProject({ cwd, rootOverride: globals.root });
    if (resolved) {
      await loadDotEnv(resolved.gitRoot);
    }

    // `require_network=true` means "no network without explicit approval".
    // Update-check is an optional network call, so it must be gated after config load.
    let skipUpdateCheckForPolicy = true;
    if (resolved) {
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
      skip: globals.noUpdateCheck || skipUpdateCheckForPolicy,
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

    // cli2 command routing (single router).
    const registry = new CommandRegistry();
    const getHelpJsonForDocs = () => makeHelpJsonFromSpecs(registry.list().map((e) => e.spec));
    registry.register(initSpec, runInit);
    registry.register(upgradeSpec, runUpgrade);
    registry.register(quickstartSpec, runQuickstart);
    registry.register(roleSpec, runRole);
    registry.register(agentsSpec, runAgents);
    registry.register(configShowSpec, runConfigShow);
    registry.register(configSetSpec, runConfigSet);
    registry.register(modeGetSpec, runModeGet);
    registry.register(modeSetSpec, runModeSet);
    registry.register(ideSyncSpec, runIdeSync);
    registry.register(taskListSpec, makeRunTaskListHandler(getCtx));
    registry.register(taskNextSpec, makeRunTaskNextHandler(getCtx));
    registry.register(taskSearchSpec, makeRunTaskSearchHandler(getCtx));
    registry.register(taskShowSpec, makeRunTaskShowHandler(getCtx));
    registry.register(taskNewSpec, makeRunTaskNewHandler(getCtx));
    registry.register(taskDeriveSpec, makeRunTaskDeriveHandler(getCtx));
    registry.register(taskAddSpec, makeRunTaskAddHandler(getCtx));
    registry.register(taskUpdateSpec, makeRunTaskUpdateHandler(getCtx));
    registry.register(taskCommentSpec, makeRunTaskCommentHandler(getCtx));
    registry.register(taskSetStatusSpec, makeRunTaskSetStatusHandler(getCtx));
    registry.register(taskDocSpec, runTaskDoc);
    registry.register(taskDocShowSpec, makeRunTaskDocShowHandler(getCtx));
    registry.register(taskDocSetSpec, makeRunTaskDocSetHandler(getCtx));
    registry.register(taskScrubSpec, makeRunTaskScrubHandler(getCtx));
    registry.register(taskScaffoldSpec, makeRunTaskScaffoldHandler(getCtx));
    registry.register(taskNormalizeSpec, makeRunTaskNormalizeHandler(getCtx));
    registry.register(taskExportSpec, makeRunTaskExportHandler(getCtx));
    registry.register(taskLintSpec, runTaskLint);
    registry.register(taskMigrateSpec, makeRunTaskMigrateHandler(getCtx));
    registry.register(taskMigrateDocSpec, runTaskMigrateDoc);
    registry.register(taskPlanSetSpec, makeRunTaskPlanSetHandler(getCtx));
    registry.register(taskPlanApproveSpec, makeRunTaskPlanApproveHandler(getCtx));
    registry.register(taskPlanRejectSpec, makeRunTaskPlanRejectHandler(getCtx));
    registry.register(taskVerifySpec, runTaskVerify);
    registry.register(taskVerifyOkSpec, makeRunTaskVerifyOkHandler(getCtx));
    registry.register(taskVerifyReworkSpec, makeRunTaskVerifyReworkHandler(getCtx));
    registry.register(taskVerifyShowSpec, makeRunTaskVerifyShowHandler(getCtx));
    registry.register(workStartSpec, makeRunWorkStartHandler(getCtx));
    registry.register(recipesSpec, runRecipes);
    registry.register(recipesCacheSpec, runRecipesCache);
    registry.register(recipesListSpec, runRecipesList);
    registry.register(recipesListRemoteSpec, runRecipesListRemote);
    registry.register(recipesInfoSpec, runRecipesInfo);
    registry.register(recipesExplainSpec, runRecipesExplain);
    registry.register(recipesRemoveSpec, runRecipesRemove);
    registry.register(recipesCachePruneSpec, runRecipesCachePrune);
    registry.register(recipesInstallSpec, runRecipesInstall);
    registry.register(scenarioSpec, runScenario);
    registry.register(scenarioListSpec, runScenarioList);
    registry.register(scenarioInfoSpec, runScenarioInfo);
    registry.register(scenarioRunSpec, runScenarioRun);
    registry.register(branchBaseSpec, runBranchBase);
    registry.register(branchBaseGetSpec, runBranchBaseGet);
    registry.register(branchBaseSetSpec, runBranchBaseSet);
    registry.register(branchBaseClearSpec, runBranchBaseClear);
    registry.register(branchBaseExplainSpec, runBranchBaseExplain);
    registry.register(branchStatusSpec, runBranchStatus);
    registry.register(branchRemoveSpec, runBranchRemove);
    registry.register(backendSpec, makeRunBackendHandler(getCtx));
    registry.register(backendSyncSpec, makeRunBackendSyncHandler(getCtx));
    registry.register(syncSpec, makeRunSyncHandler(getCtx));
    registry.register(prSpec, makeRunPrHandler(getCtx));
    registry.register(prOpenSpec, makeRunPrOpenHandler(getCtx));
    registry.register(prUpdateSpec, makeRunPrUpdateHandler(getCtx));
    registry.register(prCheckSpec, makeRunPrCheckHandler(getCtx));
    registry.register(prNoteSpec, makeRunPrNoteHandler(getCtx));
    registry.register(integrateSpec, makeRunIntegrateHandler(getCtx));
    registry.register(commitSpec, makeRunCommitHandler(getCtx));
    registry.register(startSpec, makeRunStartHandler(getCtx));
    registry.register(blockSpec, makeRunBlockHandler(getCtx));
    registry.register(verifySpec, makeRunVerifyHandler(getCtx));
    registry.register(finishSpec, makeRunFinishHandler(getCtx));
    registry.register(readySpec, makeRunReadyHandler(getCtx));
    registry.register(docsCliSpec, makeRunDocsCliHandler(getHelpJsonForDocs));
    registry.register(hooksSpec, runHooks);
    registry.register(hooksInstallSpec, runHooksInstall);
    registry.register(hooksUninstallSpec, runHooksUninstall);
    registry.register(hooksRunSpec, runHooksRun);
    registry.register(cleanupSpec, runCleanup);
    registry.register(cleanupMergedSpec, makeRunCleanupMergedHandler(getCtx));
    registry.register(guardSpec, runGuard);
    registry.register(guardCleanSpec, runGuardClean);
    registry.register(guardSuggestAllowSpec, runGuardSuggestAllow);
    registry.register(guardCommitSpec, makeRunGuardCommitHandler(getCtx));
    registry.register(helpSpec, makeHelpHandler(registry));

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
