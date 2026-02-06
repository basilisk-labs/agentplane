import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  atomicWriteFile,
  defaultConfig,
  findGitRoot,
  getStagedFiles,
  loadConfig,
  resolveProject,
  saveConfig,
  setByDottedKey,
} from "@agentplaneorg/core";

import { renderHelp } from "./help.js";
import { listRoles, renderQuickstart, renderRole } from "./command-guide.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  type WorkflowMode,
} from "../agents/agents-template.js";
import { backupPath, fileExists, getPathKind } from "./fs-utils.js";
import { promptChoice, promptInput, promptYesNo } from "./prompts.js";
import {
  listBundledRecipes,
  renderBundledRecipesHint,
  validateBundledRecipesSelection,
} from "./recipes-bundled.js";
import { mapCoreError } from "./error-map.js";
import {
  infoMessage,
  invalidValueForFlag,
  missingValueMessage,
  usageMessage,
  warnMessage,
} from "./output.js";
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
import { getVersion } from "../meta/version.js";
import { cmdUpgrade } from "../commands/upgrade.js";
import {
  BACKEND_SYNC_USAGE,
  BACKEND_SYNC_USAGE_EXAMPLE,
  cmdBackendSync,
  cmdSync,
} from "../commands/backend.js";
import { cmdRecipes, cmdScenario } from "../commands/recipes.js";
import {
  BLOCK_USAGE,
  BLOCK_USAGE_EXAMPLE,
  BRANCH_BASE_USAGE,
  BRANCH_BASE_USAGE_EXAMPLE,
  BRANCH_REMOVE_USAGE,
  BRANCH_REMOVE_USAGE_EXAMPLE,
  BRANCH_STATUS_USAGE,
  BRANCH_STATUS_USAGE_EXAMPLE,
  CLEANUP_MERGED_USAGE,
  CLEANUP_MERGED_USAGE_EXAMPLE,
  COMMIT_USAGE,
  COMMIT_USAGE_EXAMPLE,
  FINISH_USAGE,
  FINISH_USAGE_EXAMPLE,
  GUARD_COMMIT_USAGE,
  GUARD_COMMIT_USAGE_EXAMPLE,
  HOOK_NAMES,
  INTEGRATE_USAGE,
  INTEGRATE_USAGE_EXAMPLE,
  PR_CHECK_USAGE,
  PR_CHECK_USAGE_EXAMPLE,
  PR_NOTE_USAGE,
  PR_NOTE_USAGE_EXAMPLE,
  PR_OPEN_USAGE,
  PR_OPEN_USAGE_EXAMPLE,
  PR_UPDATE_USAGE,
  PR_UPDATE_USAGE_EXAMPLE,
  START_USAGE,
  START_USAGE_EXAMPLE,
  TASK_DOC_SET_USAGE,
  TASK_DOC_SET_USAGE_EXAMPLE,
  TASK_DOC_SHOW_USAGE,
  TASK_DOC_SHOW_USAGE_EXAMPLE,
  VERIFY_USAGE,
  VERIFY_USAGE_EXAMPLE,
  WORK_START_USAGE,
  WORK_START_USAGE_EXAMPLE,
  cmdBlock,
  cmdBranchBaseGet,
  cmdBranchBaseClear,
  cmdBranchBaseExplain,
  cmdBranchBaseSet,
  cmdBranchRemove,
  cmdBranchStatus,
  cmdCleanupMerged,
  cmdCommit,
  cmdFinish,
  cmdGuardClean,
  cmdGuardCommit,
  cmdGuardSuggestAllow,
  cmdHooksInstall,
  cmdHooksRun,
  cmdHooksUninstall,
  cmdIntegrate,
  cmdPrCheck,
  cmdPrNote,
  cmdPrOpen,
  cmdPrUpdate,
  cmdReady,
  cmdStart,
  cmdTaskAdd,
  cmdTaskComment,
  cmdTaskDocSet,
  cmdTaskDocShow,
  cmdTaskExport,
  cmdTaskLint,
  cmdTaskMigrate,
  cmdTaskNew,
  cmdTaskNext,
  cmdTaskNormalize,
  cmdTaskPlan,
  cmdTaskScaffold,
  cmdTaskScrub,
  cmdTaskSearch,
  cmdTaskSetStatus,
  cmdTaskShow,
  cmdTaskUpdate,
  cmdTaskList,
  cmdVerify,
  cmdTaskVerify,
  cmdWorkStart,
  dedupeStrings,
  ensureInitCommit,
  gitInitRepo,
  promptInitBaseBranch,
  resolveInitBaseBranch,
  suggestAllowPrefixes,
} from "../commands/workflow.js";

type ParsedArgs = {
  help: boolean;
  version: boolean;
  noUpdateCheck: boolean;
  root?: string;
  jsonErrors: boolean;
};

function parseGlobalArgs(argv: string[]): { globals: ParsedArgs; rest: string[] } {
  let help = false;
  let version = false;
  let noUpdateCheck = false;
  let jsonErrors = false;
  let root: string | undefined;

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
    if (arg === "--json") {
      jsonErrors = true;
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
  return { globals: { help, version, noUpdateCheck, root, jsonErrors }, rest };
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
  const usage = command ? `agentplane ${command} --help` : "agentplane --help";
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

async function maybeLoadDotEnv(opts: { cwd: string; rootOverride?: string }): Promise<void> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    await loadDotEnv(resolved.gitRoot);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Not a git repository")) {
      return;
    }
    throw err;
  }
}

async function writeFileIfChanged(filePath: string, content: string): Promise<boolean> {
  try {
    const existing = await readFile(filePath, "utf8");
    if (existing === content) return false;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }
  await atomicWriteFile(filePath, content, "utf8");
  return true;
}

async function cmdConfigShow(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    process.stdout.write(`${JSON.stringify(loaded.raw, null, 2)}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "config show", root: opts.rootOverride ?? null });
  }
}

async function cmdConfigSet(opts: {
  cwd: string;
  rootOverride?: string;
  key: string;
  value: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const raw = { ...loaded.raw };
    setByDottedKey(raw, opts.key, opts.value);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(
      `${path.relative(resolved.gitRoot, path.join(resolved.agentplaneDir, "config.json"))}\n`,
    );
    return 0;
  } catch (err) {
    throw mapCoreError(err, {
      command: "config set",
      key: opts.key,
      root: opts.rootOverride ?? null,
    });
  }
}

async function cmdModeGet(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    process.stdout.write(`${loaded.config.workflow_mode}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "mode get", root: opts.rootOverride ?? null });
  }
}

async function cmdModeSet(opts: {
  cwd: string;
  rootOverride?: string;
  mode: "direct" | "branch_pr";
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const raw = { ...loaded.raw };
    setByDottedKey(raw, "workflow_mode", opts.mode);
    await saveConfig(resolved.agentplaneDir, raw);
    process.stdout.write(`${opts.mode}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, {
      command: "mode set",
      root: opts.rootOverride ?? null,
      mode: opts.mode,
    });
  }
}

type InitFlags = {
  ide?: "codex" | "cursor" | "windsurf";
  workflow?: "direct" | "branch_pr";
  backend?: "local" | "redmine";
  hooks?: boolean;
  requirePlanApproval?: boolean;
  requireNetworkApproval?: boolean;
  requireVerifyApproval?: boolean;
  recipes?: string[];
  force?: boolean;
  backup?: boolean;
  yes: boolean;
};

const READY_USAGE = "Usage: agentplane ready <task-id>";
const READY_USAGE_EXAMPLE = "agentplane ready 202602030608-F1Q8AB";
const ROLE_USAGE = "Usage: agentplane role <role>";
const ROLE_USAGE_EXAMPLE = "agentplane role ORCHESTRATOR";
const AGENTS_USAGE = "Usage: agentplane agents";
const AGENTS_USAGE_EXAMPLE = "agentplane agents";
const INIT_USAGE =
  "Usage: agentplane init --ide <...> --workflow <...> --backend <local|redmine> --hooks <...> --require-plan-approval <...> --require-network-approval <...> --require-verify-approval <...> [--recipes <...>] [--yes] [--force|--backup]";
const INIT_USAGE_EXAMPLE =
  "agentplane init --ide codex --workflow direct --backend local --hooks false --require-plan-approval true --require-network-approval true --require-verify-approval true --yes";
const CONFIG_SET_USAGE = "Usage: agentplane config set <key> <value>";
const CONFIG_SET_USAGE_EXAMPLE = "agentplane config set workflow_mode branch_pr";
const MODE_SET_USAGE = "Usage: agentplane mode set <direct|branch_pr>";
const MODE_SET_USAGE_EXAMPLE = "agentplane mode set direct";
const QUICKSTART_USAGE = "Usage: agentplane quickstart";
const QUICKSTART_USAGE_EXAMPLE = "agentplane quickstart";
const IDE_SYNC_USAGE = "Usage: agentplane ide sync";
const IDE_SYNC_USAGE_EXAMPLE = "agentplane ide sync";
const TASK_SHOW_USAGE = "Usage: agentplane task show <task-id>";
const TASK_SHOW_USAGE_EXAMPLE = "agentplane task show 202602030608-F1Q8AB";
const TASK_SEARCH_USAGE = "Usage: agentplane task search <query> [flags]";
const TASK_SEARCH_USAGE_EXAMPLE = 'agentplane task search "cli"';
const TASK_COMMENT_USAGE = "Usage: agentplane task comment <task-id>";
const TASK_COMMENT_USAGE_EXAMPLE =
  'agentplane task comment 202602030608-F1Q8AB --author CODER --body "..."';
const TASK_SET_STATUS_USAGE = "Usage: agentplane task set-status <task-id> <status> [flags]";
const TASK_SET_STATUS_USAGE_EXAMPLE = "agentplane task set-status 202602030608-F1Q8AB DONE";
const PR_GROUP_USAGE = "Usage: agentplane pr open|update|check|note <task-id>";
const PR_GROUP_USAGE_EXAMPLE = "agentplane pr open 202602030608-F1Q8AB --author CODER";
const GUARD_USAGE = "Usage: agentplane guard <subcommand>";
const GUARD_USAGE_EXAMPLE =
  'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB update" --allow packages/agentplane';
const HOOKS_RUN_USAGE = "Usage: agentplane hooks run <hook>";
const HOOKS_RUN_USAGE_EXAMPLE = "agentplane hooks run pre-commit";
const HOOKS_INSTALL_USAGE = "Usage: agentplane hooks install|uninstall";
const HOOKS_INSTALL_USAGE_EXAMPLE = "agentplane hooks install";

function parseBooleanFlag(value: string, flag: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: invalidValueForFlag(flag, value, "true|false"),
  });
}

function parseInitFlags(args: string[]): InitFlags {
  const out: InitFlags = { yes: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }
    if (arg === "--yes") {
      out.yes = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--backup") {
      out.backup = true;
      continue;
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--ide": {
        const normalized = next.trim().toLowerCase();
        if (normalized !== "codex" && normalized !== "cursor" && normalized !== "windsurf") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: invalidValueForFlag("--ide", next, "codex|cursor|windsurf"),
          });
        }
        out.ide = normalized as InitFlags["ide"];
        break;
      }
      case "--workflow": {
        if (next !== "direct" && next !== "branch_pr") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: invalidValueForFlag("--workflow", next, "direct|branch_pr"),
          });
        }
        out.workflow = next;
        break;
      }
      case "--backend": {
        const normalized = next.trim().toLowerCase();
        if (normalized !== "local" && normalized !== "redmine") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: invalidValueForFlag("--backend", next, "local|redmine"),
          });
        }
        out.backend = normalized as InitFlags["backend"];
        break;
      }
      case "--hooks": {
        out.hooks = parseBooleanFlag(next, "--hooks");
        break;
      }
      case "--require-plan-approval": {
        out.requirePlanApproval = parseBooleanFlag(next, "--require-plan-approval");
        break;
      }
      case "--require-network-approval": {
        out.requireNetworkApproval = parseBooleanFlag(next, "--require-network-approval");
        break;
      }
      case "--require-verify-approval": {
        out.requireVerifyApproval = parseBooleanFlag(next, "--require-verify-approval");
        break;
      }
      case "--recipes": {
        const normalized = next.trim().toLowerCase();
        out.recipes =
          normalized === "none" || normalized === ""
            ? []
            : next
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }
  if (out.force && out.backup) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Use either --force or --backup (not both).",
    });
  }
  return out;
}

async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseInitFlags(opts.args);
  type InitIde = NonNullable<InitFlags["ide"]>;
  const defaults: {
    ide: InitIde;
    workflow: WorkflowMode;
    backend: NonNullable<InitFlags["backend"]>;
    hooks: boolean;
    recipes: string[];
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
    requireVerifyApproval: boolean;
  } = {
    ide: "codex",
    workflow: "direct",
    backend: "local",
    hooks: false,
    recipes: [],
    requirePlanApproval: true,
    requireNetworkApproval: true,
    requireVerifyApproval: true,
  };
  let ide: InitIde = flags.ide ?? defaults.ide;
  let workflow: WorkflowMode = flags.workflow ?? defaults.workflow;
  let backend: NonNullable<InitFlags["backend"]> = flags.backend ?? defaults.backend;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
  let requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
  const isInteractive = process.stdin.isTTY && !flags.yes;

  if (
    !process.stdin.isTTY &&
    !flags.yes &&
    (!flags.workflow ||
      flags.hooks === undefined ||
      flags.requirePlanApproval === undefined ||
      flags.requireNetworkApproval === undefined ||
      flags.requireVerifyApproval === undefined)
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(INIT_USAGE, INIT_USAGE_EXAMPLE),
    });
  }

  if (isInteractive) {
    ide = flags.ide ?? defaults.ide;
    if (!flags.workflow) {
      const choice = await promptChoice("Select workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
    }
    if (!flags.backend) {
      const choice = await promptChoice("Select task backend", ["local", "redmine"], backend);
      backend = choice === "redmine" ? "redmine" : "local";
    }
    if (flags.hooks === undefined) {
      hooks = await promptYesNo("Install git hooks?", hooks);
    }
    if (flags.requirePlanApproval === undefined) {
      requirePlanApproval = await promptYesNo("Require plan approval?", requirePlanApproval);
    }
    if (flags.requireNetworkApproval === undefined) {
      requireNetworkApproval = await promptYesNo(
        "Require explicit approval for network access?",
        requireNetworkApproval,
      );
    }
    if (flags.requireVerifyApproval === undefined) {
      requireVerifyApproval = await promptYesNo(
        "Require explicit approval for verification?",
        requireVerifyApproval,
      );
    }
    if (!flags.recipes) {
      process.stdout.write(`${renderBundledRecipesHint()}\n`);
      const answer = await promptInput("Install optional recipes (comma separated, or none): ");
      recipes = answer
        ? answer
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
    }
  }

  if (flags.yes) {
    ide = flags.ide ?? defaults.ide;
    workflow = flags.workflow ?? defaults.workflow;
    backend = flags.backend ?? defaults.backend;
    hooks = flags.hooks ?? defaults.hooks;
    recipes = flags.recipes ?? defaults.recipes;
    requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
    requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
    requireVerifyApproval = flags.requireVerifyApproval ?? defaults.requireVerifyApproval;
  }

  validateBundledRecipesSelection(recipes);

  try {
    const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
    const existingGitRoot = await findGitRoot(initRoot);
    const gitRootExisted = Boolean(existingGitRoot);
    let gitRoot = existingGitRoot;
    const baseBranchFallback = "main";
    if (!gitRoot) {
      await gitInitRepo(initRoot, baseBranchFallback);
      gitRoot = initRoot;
    }

    const resolved = await resolveProject({
      cwd: gitRoot,
      rootOverride: gitRoot,
    });
    let initBaseBranch = await resolveInitBaseBranch(resolved.gitRoot, baseBranchFallback);
    if (isInteractive && workflow === "branch_pr" && gitRootExisted) {
      initBaseBranch = await promptInitBaseBranch({
        gitRoot: resolved.gitRoot,
        fallback: initBaseBranch,
      });
    }
    const configPath = path.join(resolved.agentplaneDir, "config.json");
    const localBackendPath = path.join(resolved.agentplaneDir, "backends", "local", "backend.json");
    const redmineBackendPath = path.join(
      resolved.agentplaneDir,
      "backends",
      "redmine",
      "backend.json",
    );
    const backendPath = backend === "redmine" ? redmineBackendPath : localBackendPath;
    const initDirs = [
      resolved.agentplaneDir,
      path.join(resolved.agentplaneDir, "tasks"),
      path.join(resolved.agentplaneDir, "agents"),
      path.join(resolved.agentplaneDir, "cache"),
      path.join(resolved.agentplaneDir, "backends"),
      path.join(resolved.agentplaneDir, "backends", "local"),
      path.join(resolved.agentplaneDir, "backends", "redmine"),
    ];
    const initFiles = [configPath, localBackendPath, redmineBackendPath];
    const conflicts: string[] = [];

    for (const dir of initDirs) {
      const kind = await getPathKind(dir);
      if (kind && kind !== "dir") conflicts.push(dir);
    }
    for (const filePath of initFiles) {
      if (await fileExists(filePath)) conflicts.push(filePath);
    }

    if (conflicts.length > 0) {
      if (flags.backup) {
        for (const conflict of conflicts) {
          await backupPath(conflict);
        }
      } else if (flags.force) {
        for (const conflict of conflicts) {
          await rm(conflict, { recursive: true, force: true });
        }
      } else {
        const rendered = conflicts
          .map((conflict) => `- ${path.relative(resolved.gitRoot, conflict)}`)
          .join("\n");
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message:
            `Init conflicts detected:\n${rendered}\n` +
            "Re-run with --force to overwrite or --backup to preserve existing files.",
        });
      }
    }

    await mkdir(resolved.agentplaneDir, { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "tasks"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "agents"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "cache"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "backends", "local"), { recursive: true });
    await mkdir(path.join(resolved.agentplaneDir, "backends", "redmine"), { recursive: true });

    const rawConfig = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(rawConfig, "workflow_mode", workflow);
    setByDottedKey(
      rawConfig,
      "tasks_backend.config_path",
      path.relative(resolved.gitRoot, backendPath),
    );
    setByDottedKey(rawConfig, "agents.approvals.require_plan", String(requirePlanApproval));
    setByDottedKey(rawConfig, "agents.approvals.require_network", String(requireNetworkApproval));
    setByDottedKey(rawConfig, "agents.approvals.require_verify", String(requireVerifyApproval));
    await saveConfig(resolved.agentplaneDir, rawConfig);

    const localBackendPayload = {
      id: "local",
      version: 1,
      module: "backend.py",
      class: "LocalBackend",
      settings: { dir: ".agentplane/tasks" },
    };
    const redmineBackendPayload = {
      id: "redmine",
      version: 1,
      module: "backend.py",
      class: "RedmineBackend",
      settings: {
        url: "https://redmine.example",
        api_key: "replace-me",
        project_id: "replace-me",
        owner_agent: "REDMINE",
        custom_fields: { task_id: 1 },
      },
    };
    await atomicWriteFile(
      localBackendPath,
      `${JSON.stringify(localBackendPayload, null, 2)}\n`,
      "utf8",
    );
    await atomicWriteFile(
      redmineBackendPath,
      `${JSON.stringify(redmineBackendPayload, null, 2)}\n`,
      "utf8",
    );

    const agentsPath = path.join(resolved.gitRoot, "AGENTS.md");
    const installPaths: string[] = [
      path.relative(resolved.gitRoot, configPath),
      path.relative(resolved.gitRoot, backendPath),
    ];
    let wroteAgents = false;
    if (!(await fileExists(agentsPath))) {
      const template = await loadAgentsTemplate();
      const filtered = filterAgentsByWorkflow(template, workflow);
      await atomicWriteFile(agentsPath, filtered, "utf8");
      wroteAgents = true;
    }
    if (wroteAgents) {
      installPaths.push(path.relative(resolved.gitRoot, agentsPath));
    }

    const agentTemplates = await loadAgentTemplates();
    for (const agent of agentTemplates) {
      const targetPath = path.join(resolved.agentplaneDir, "agents", agent.fileName);
      if (await fileExists(targetPath)) continue;
      await atomicWriteFile(targetPath, agent.contents, "utf8");
      installPaths.push(path.relative(resolved.gitRoot, targetPath));
    }

    if (hooks) {
      await cmdHooksInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, quiet: true });
    }

    if (ide !== "codex") {
      await cmdIdeSync({ cwd: opts.cwd, rootOverride: opts.rootOverride, ide });
      const cursorPath = path.join(resolved.gitRoot, ".cursor", "rules", "agentplane.mdc");
      const windsurfPath = path.join(resolved.gitRoot, ".windsurf", "rules", "agentplane.md");
      if (ide === "cursor" && (await fileExists(cursorPath))) {
        installPaths.push(path.relative(resolved.gitRoot, cursorPath));
      }
      if (ide === "windsurf" && (await fileExists(windsurfPath))) {
        installPaths.push(path.relative(resolved.gitRoot, windsurfPath));
      }
    }

    if (recipes.length > 0) {
      if (listBundledRecipes().length === 0) {
        process.stdout.write(`${infoMessage("bundled recipes are empty; nothing to install")}\n`);
      } else {
        process.stdout.write(
          `${infoMessage("bundled recipe install is not implemented; skipping")}\n`,
        );
      }
    }

    await ensureInitCommit({
      gitRoot: resolved.gitRoot,
      baseBranch: initBaseBranch,
      installPaths,
      version: getVersion(),
      skipHooks: hooks,
    });

    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}

async function cmdIdeSync(opts: {
  cwd: string;
  rootOverride?: string;
  ide?: "cursor" | "windsurf";
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const agentsPath = path.join(resolved.gitRoot, "AGENTS.md");
    const agentsText = await readFile(agentsPath, "utf8");

    const header = [
      "<!--",
      "  AUTOGENERATED by agentplane ide sync.",
      "  DO NOT EDIT MANUALLY.",
      "  Source: AGENTS.md",
      "-->",
      "",
    ].join("\n");
    const content = `${header}${agentsText.trimEnd()}\n`;

    const targets =
      opts.ide === "cursor"
        ? ["cursor"]
        : opts.ide === "windsurf"
          ? ["windsurf"]
          : ["cursor", "windsurf"];

    if (targets.includes("cursor")) {
      const cursorDir = path.join(resolved.gitRoot, ".cursor", "rules");
      await mkdir(cursorDir, { recursive: true });
      const cursorPath = path.join(cursorDir, "agentplane.mdc");
      await writeFileIfChanged(cursorPath, content);
      process.stdout.write(`${path.relative(resolved.gitRoot, cursorPath)}\n`);
    }

    if (targets.includes("windsurf")) {
      const windsurfDir = path.join(resolved.gitRoot, ".windsurf", "rules");
      await mkdir(windsurfDir, { recursive: true });
      const windsurfPath = path.join(windsurfDir, "agentplane.md");
      await writeFileIfChanged(windsurfPath, content);
      process.stdout.write(`${path.relative(resolved.gitRoot, windsurfPath)}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "ide sync", root: opts.rootOverride ?? null });
  }
}

function cmdRole(opts: { cwd: string; rootOverride?: string; role: string }): number {
  try {
    const roleRaw = opts.role.trim();
    if (!roleRaw) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(ROLE_USAGE, ROLE_USAGE_EXAMPLE),
      });
    }
    const guide = renderRole(roleRaw);
    if (!guide) {
      const roles = listRoles();
      const available = roles.length > 0 ? `\nAvailable roles: ${roles.join(", ")}` : "";
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(`${ROLE_USAGE}${available}`, ROLE_USAGE_EXAMPLE),
      });
    }
    process.stdout.write(`${guide}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "role", root: opts.rootOverride ?? null });
  }
}

function cmdQuickstart(opts: { cwd: string; rootOverride?: string }): number {
  try {
    process.stdout.write(`${renderQuickstart()}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "quickstart", root: opts.rootOverride ?? null });
  }
}

async function cmdAgents(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const agentsDir = path.join(resolved.agentplaneDir, "agents");
    if (!(await fileExists(agentsDir))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Agents directory not found: ${agentsDir} (run \`agentplane init\`)`,
      });
    }
    const entriesRaw = await readdir(agentsDir);
    const entries = entriesRaw.filter((name) => name.endsWith(".json")).toSorted();
    if (entries.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `No agent definitions found under ${agentsDir} (expected *.json)`,
      });
    }

    const rows: [string, string, string][] = [];
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const entry of entries) {
      const filePath = path.join(agentsDir, entry);
      const raw = JSON.parse(await readFile(filePath, "utf8")) as Record<string, unknown>;
      const rawId = typeof raw.id === "string" ? raw.id : "";
      const rawRole = typeof raw.role === "string" ? raw.role : "";
      const agentId = rawId.trim() || "<missing-id>";
      const role = rawRole.trim() || "-";
      if (seen.has(agentId)) {
        duplicates.push(agentId);
      } else {
        seen.add(agentId);
      }
      rows.push([agentId, role, entry]);
    }

    const widthId = Math.max(...rows.map((row) => row[0].length), "ID".length);
    const widthFile = Math.max(...rows.map((row) => row[2].length), "FILE".length);
    process.stdout.write(`${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ROLE\n`);
    process.stdout.write(`${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ----\n`);
    for (const [agentId, role, filename] of rows) {
      process.stdout.write(`${agentId.padEnd(widthId)}  ${filename.padEnd(widthFile)}  ${role}\n`);
    }

    if (duplicates.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Duplicate agent ids: ${dedupeStrings(duplicates).toSorted().join(", ")}`,
      });
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "agents", root: opts.rootOverride ?? null });
  }
}

export async function runCli(argv: string[]): Promise<number> {
  let jsonErrors = argv.includes("--json");
  try {
    const { globals, rest } = parseGlobalArgs(argv);
    jsonErrors = globals.jsonErrors;

    if (globals.version) {
      process.stdout.write(`${getVersion()}\n`);
      return 0;
    }

    if (globals.help || rest.length === 0) {
      process.stdout.write(`${renderHelp()}\n`);
      return 0;
    }

    await maybeLoadDotEnv({ cwd: process.cwd(), rootOverride: globals.root });
    await maybeWarnOnUpdate({
      currentVersion: getVersion(),
      skip: globals.noUpdateCheck,
      jsonErrors: globals.jsonErrors,
    });

    const [namespace, command, ...args] = rest;

    if (namespace === "init") {
      const initArgs = command ? [command, ...args] : [];
      if (command && !command.startsWith("--")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(INIT_USAGE, INIT_USAGE_EXAMPLE),
        });
      }
      return await cmdInit({ cwd: process.cwd(), rootOverride: globals.root, args: initArgs });
    }

    if (namespace === "upgrade") {
      const upgradeArgs = command ? [command, ...args] : [];
      return await cmdUpgrade({
        cwd: process.cwd(),
        rootOverride: globals.root,
        args: upgradeArgs,
      });
    }

    if (namespace === "config" && command === "show") {
      return await cmdConfigShow({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "config" && command === "set") {
      const [key, value] = args;
      if (!key || value === undefined) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(CONFIG_SET_USAGE, CONFIG_SET_USAGE_EXAMPLE),
        });
      }
      return await cmdConfigSet({ cwd: process.cwd(), rootOverride: globals.root, key, value });
    }

    if (namespace === "mode" && command === "get") {
      return await cmdModeGet({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "mode" && command === "set") {
      const [mode] = args;
      if (mode !== "direct" && mode !== "branch_pr") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(MODE_SET_USAGE, MODE_SET_USAGE_EXAMPLE),
        });
      }
      return await cmdModeSet({ cwd: process.cwd(), rootOverride: globals.root, mode });
    }

    if (namespace === "quickstart") {
      if (command) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(QUICKSTART_USAGE, QUICKSTART_USAGE_EXAMPLE),
        });
      }
      return cmdQuickstart({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "role") {
      if (!command || command.startsWith("--") || args.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(ROLE_USAGE, ROLE_USAGE_EXAMPLE),
        });
      }
      return cmdRole({ cwd: process.cwd(), rootOverride: globals.root, role: command });
    }

    if (namespace === "agents") {
      if (command) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(AGENTS_USAGE, AGENTS_USAGE_EXAMPLE),
        });
      }
      return await cmdAgents({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "ready") {
      if (!command || command.startsWith("--") || args.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(READY_USAGE, READY_USAGE_EXAMPLE),
        });
      }
      return await cmdReady({ cwd: process.cwd(), rootOverride: globals.root, taskId: command });
    }

    if (namespace === "ide") {
      if (command !== "sync" || args.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(IDE_SYNC_USAGE, IDE_SYNC_USAGE_EXAMPLE),
        });
      }
      return await cmdIdeSync({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "new") {
      return await cmdTaskNew({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "add") {
      return await cmdTaskAdd({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "update") {
      return await cmdTaskUpdate({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "scrub") {
      return await cmdTaskScrub({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "show") {
      const [taskId] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_SHOW_USAGE, TASK_SHOW_USAGE_EXAMPLE),
        });
      }
      return await cmdTaskShow({ cwd: process.cwd(), rootOverride: globals.root, taskId });
    }

    if (namespace === "task" && command === "list") {
      return await cmdTaskList({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "next") {
      return await cmdTaskNext({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "search") {
      const [query, ...restArgs] = args;
      if (!query) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_SEARCH_USAGE, TASK_SEARCH_USAGE_EXAMPLE),
        });
      }
      return await cmdTaskSearch({
        cwd: process.cwd(),
        rootOverride: globals.root,
        query,
        args: restArgs,
      });
    }

    if (namespace === "task" && command === "scaffold") {
      return await cmdTaskScaffold({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "normalize") {
      return await cmdTaskNormalize({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "migrate") {
      return await cmdTaskMigrate({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "export") {
      return await cmdTaskExport({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "lint") {
      return await cmdTaskLint({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "doc") {
      const [subcommand, taskId, ...restArgs] = args;
      if (subcommand === "show") {
        if (!taskId) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(TASK_DOC_SHOW_USAGE, TASK_DOC_SHOW_USAGE_EXAMPLE),
          });
        }
        return await cmdTaskDocShow({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          args: restArgs,
        });
      }
      if (subcommand === "set") {
        if (!taskId) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
          });
        }
        return await cmdTaskDocSet({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          args: restArgs,
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
      });
    }

    if (namespace === "task" && command === "plan") {
      return await cmdTaskPlan({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "verify") {
      return await cmdTaskVerify({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "comment") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_COMMENT_USAGE, TASK_COMMENT_USAGE_EXAMPLE),
        });
      }
      let author = "";
      let body = "";
      for (let i = 0; i < restArgs.length; i++) {
        const arg = restArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = restArgs[i + 1];
          if (!next) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--author"),
            });
          }
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = restArgs[i + 1];
          if (!next) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--body"),
            });
          }
          body = next;
          i++;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(TASK_COMMENT_USAGE, TASK_COMMENT_USAGE_EXAMPLE),
          });
        }
      }
      if (!author || !body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_COMMENT_USAGE, TASK_COMMENT_USAGE_EXAMPLE),
        });
      }
      return await cmdTaskComment({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        author,
        body,
      });
    }

    if (namespace === "task" && command === "set-status") {
      const [taskId, status, ...restArgs] = args;
      if (!taskId || !status) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(TASK_SET_STATUS_USAGE, TASK_SET_STATUS_USAGE_EXAMPLE),
        });
      }
      let author: string | undefined;
      let body: string | undefined;
      let commit: string | undefined;
      let force = false;
      let commitFromComment = false;
      let commitEmoji: string | undefined;
      const commitAllow: string[] = [];
      let commitAutoAllow = false;
      let commitAllowTasks = true;
      let commitRequireClean = false;
      let confirmStatusCommit = false;
      let quiet = false;
      for (let i = 0; i < restArgs.length; i++) {
        const arg = restArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--author"),
            });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--body"),
            });
          body = next;
          i++;
          continue;
        }
        if (arg === "--commit") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--commit"),
            });
          commit = next;
          i++;
          continue;
        }
        if (arg === "--force") {
          force = true;
          continue;
        }
        if (arg === "--commit-from-comment") {
          commitFromComment = true;
          continue;
        }
        if (arg === "--commit-emoji") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--commit-emoji"),
            });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: missingValueMessage("--commit-allow"),
            });
          commitAllow.push(next);
          i++;
          continue;
        }
        if (arg === "--commit-auto-allow") {
          commitAutoAllow = true;
          continue;
        }
        if (arg === "--commit-allow-tasks") {
          commitAllowTasks = true;
          continue;
        }
        if (arg === "--commit-require-clean") {
          commitRequireClean = true;
          continue;
        }
        if (arg === "--confirm-status-commit") {
          confirmStatusCommit = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(TASK_SET_STATUS_USAGE, TASK_SET_STATUS_USAGE_EXAMPLE),
          });
        }
      }
      return await cmdTaskSetStatus({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        status,
        author,
        body,
        commit,
        force,
        commitFromComment,
        commitEmoji,
        commitAllow,
        commitAutoAllow,
        commitAllowTasks,
        commitRequireClean,
        confirmStatusCommit,
        quiet,
      });
    }

    if (namespace === "branch") {
      if (command === "base") {
        const [subcommand, ...rest] = args;
        if (subcommand === "get") {
          return await cmdBranchBaseGet({ cwd: process.cwd(), rootOverride: globals.root });
        }
        if (subcommand === "set") {
          const useCurrent = rest.includes("--current");
          const value = rest.find((entry) => entry && entry !== "--current");
          if (useCurrent && value) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
            });
          }
          if (!value && !useCurrent) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
            });
          }
          return await cmdBranchBaseSet({
            cwd: process.cwd(),
            rootOverride: globals.root,
            value,
            useCurrent,
          });
        }
        if (subcommand === "clear") {
          return await cmdBranchBaseClear({ cwd: process.cwd(), rootOverride: globals.root });
        }
        if (subcommand === "explain") {
          return await cmdBranchBaseExplain({ cwd: process.cwd(), rootOverride: globals.root });
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
        });
      }
      if (command === "status") {
        let branch: string | undefined;
        let base: string | undefined;
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          if (!arg) continue;
          if (arg === "--branch") {
            const next = args[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(BRANCH_STATUS_USAGE, BRANCH_STATUS_USAGE_EXAMPLE),
              });
            branch = next;
            i++;
            continue;
          }
          if (arg === "--base") {
            const next = args[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(BRANCH_STATUS_USAGE, BRANCH_STATUS_USAGE_EXAMPLE),
              });
            base = next;
            i++;
            continue;
          }
          if (arg.startsWith("--")) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BRANCH_STATUS_USAGE, BRANCH_STATUS_USAGE_EXAMPLE),
            });
          }
        }
        return await cmdBranchStatus({
          cwd: process.cwd(),
          rootOverride: globals.root,
          branch,
          base,
        });
      }
      if (command === "remove") {
        let branch: string | undefined;
        let worktree: string | undefined;
        let force = false;
        let quiet = false;
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          if (!arg) continue;
          if (arg === "--branch") {
            const next = args[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(BRANCH_REMOVE_USAGE, BRANCH_REMOVE_USAGE_EXAMPLE),
              });
            branch = next;
            i++;
            continue;
          }
          if (arg === "--worktree") {
            const next = args[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(BRANCH_REMOVE_USAGE, BRANCH_REMOVE_USAGE_EXAMPLE),
              });
            worktree = next;
            i++;
            continue;
          }
          if (arg === "--force") {
            force = true;
            continue;
          }
          if (arg === "--quiet") {
            quiet = true;
            continue;
          }
          if (arg.startsWith("--")) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BRANCH_REMOVE_USAGE, BRANCH_REMOVE_USAGE_EXAMPLE),
            });
          }
        }
        return await cmdBranchRemove({
          cwd: process.cwd(),
          rootOverride: globals.root,
          branch,
          worktree,
          force,
          quiet,
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
      });
    }

    if (namespace === "work" && command === "start") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
        });
      }
      let agent = "";
      let slug = "";
      let worktree = false;

      for (let i = 0; i < restArgs.length; i++) {
        const arg = restArgs[i];
        if (!arg) continue;
        if (arg === "--agent") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
            });
          agent = next;
          i++;
          continue;
        }
        if (arg === "--slug") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
            });
          slug = next;
          i++;
          continue;
        }
        if (arg === "--worktree") {
          worktree = true;
          continue;
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
        });
      }

      if (!agent || !slug) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
        });
      }

      return await cmdWorkStart({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        agent,
        slug,
        worktree,
      });
    }

    if (namespace === "pr") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
        });
      }

      if (command === "open") {
        let author = "";
        let branch: string | undefined;
        for (let i = 0; i < restArgs.length; i++) {
          const arg = restArgs[i];
          if (!arg) continue;
          if (arg === "--author") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
              });
            author = next;
            i++;
            continue;
          }
          if (arg === "--branch") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
              });
            branch = next;
            i++;
            continue;
          }
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
          });
        }
        if (!author) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
          });
        }
        return await cmdPrOpen({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          author,
          branch,
        });
      }

      if (command === "update") {
        if (restArgs.length > 0) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_UPDATE_USAGE, PR_UPDATE_USAGE_EXAMPLE),
          });
        }
        return await cmdPrUpdate({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
        });
      }

      if (command === "check") {
        if (restArgs.length > 0) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_CHECK_USAGE, PR_CHECK_USAGE_EXAMPLE),
          });
        }
        return await cmdPrCheck({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
        });
      }

      if (command === "note") {
        let author = "";
        let body = "";
        for (let i = 0; i < restArgs.length; i++) {
          const arg = restArgs[i];
          if (!arg) continue;
          if (arg === "--author") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
              });
            author = next;
            i++;
            continue;
          }
          if (arg === "--body") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
              });
            body = next;
            i++;
            continue;
          }
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
          });
        }
        if (!author || !body) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
          });
        }
        return await cmdPrNote({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          author,
          body,
        });
      }

      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_GROUP_USAGE, PR_GROUP_USAGE_EXAMPLE),
      });
    }

    if (namespace === "guard") {
      const subcommand = command;
      const restArgs = args;
      if (subcommand === "clean") {
        const quiet = restArgs.includes("--quiet");
        return await cmdGuardClean({ cwd: process.cwd(), rootOverride: globals.root, quiet });
      }
      if (subcommand === "suggest-allow") {
        const formatFlagIndex = restArgs.indexOf("--format");
        let format: "lines" | "args" = "lines";
        if (formatFlagIndex !== -1) {
          const next = restArgs[formatFlagIndex + 1];
          if (next !== "lines" && next !== "args") {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: invalidValueForFlag("--format", String(next), "lines|args"),
            });
          }
          format = next;
        }
        return await cmdGuardSuggestAllow({
          cwd: process.cwd(),
          rootOverride: globals.root,
          format,
        });
      }
      if (subcommand === "commit") {
        const taskId = restArgs[0];
        if (!taskId) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(GUARD_COMMIT_USAGE, GUARD_COMMIT_USAGE_EXAMPLE),
          });
        }

        const allow: string[] = [];
        let message = "";
        let autoAllow = false;
        let allowTasks = false;
        let allowDirty = false;
        let requireClean = false;
        let quiet = false;

        for (let i = 1; i < restArgs.length; i++) {
          const arg = restArgs[i];
          if (!arg) continue;
          if (arg === "--allow") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(GUARD_COMMIT_USAGE, GUARD_COMMIT_USAGE_EXAMPLE),
              });
            allow.push(next);
            i++;
            continue;
          }
          if (arg === "-m" || arg === "--message") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({
                exitCode: 2,
                code: "E_USAGE",
                message: usageMessage(GUARD_COMMIT_USAGE, GUARD_COMMIT_USAGE_EXAMPLE),
              });
            message = next;
            i++;
            continue;
          }
          if (arg === "--allow-tasks") {
            allowTasks = true;
            continue;
          }
          if (arg === "--auto-allow") {
            autoAllow = true;
            continue;
          }
          if (arg === "--allow-dirty") {
            allowDirty = true;
            continue;
          }
          if (arg === "--require-clean") {
            requireClean = true;
            continue;
          }
          if (arg === "--quiet") {
            quiet = true;
            continue;
          }
          if (arg.startsWith("--")) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(GUARD_COMMIT_USAGE, GUARD_COMMIT_USAGE_EXAMPLE),
            });
          }
        }

        if (!message) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(GUARD_COMMIT_USAGE, GUARD_COMMIT_USAGE_EXAMPLE),
          });
        }

        if (autoAllow && allow.length === 0) {
          const staged = await getStagedFiles({
            cwd: process.cwd(),
            rootOverride: globals.root ?? null,
          });
          const prefixes = suggestAllowPrefixes(staged);
          if (prefixes.length === 0) {
            throw new CliError({
              exitCode: 5,
              code: "E_GIT",
              message: "No staged files (git index empty)",
            });
          }
          allow.push(...prefixes);
        }

        if (allowDirty) {
          // Deprecated no-op retained for compatibility.
        }

        return await cmdGuardCommit({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          message,
          allow,
          allowTasks,
          requireClean,
          quiet,
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(GUARD_USAGE, GUARD_USAGE_EXAMPLE),
      });
    }

    if (namespace === "commit") {
      const taskId = command;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(COMMIT_USAGE, COMMIT_USAGE_EXAMPLE),
        });
      }
      const allow: string[] = [];
      let message = "";
      let autoAllow = false;
      let allowTasks = false;
      let allowBase = false;
      let requireClean = false;
      let quiet = false;

      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;
        if (arg === "--allow") {
          const next = args[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(COMMIT_USAGE, COMMIT_USAGE_EXAMPLE),
            });
          allow.push(next);
          i++;
          continue;
        }
        if (arg === "-m" || arg === "--message") {
          const next = args[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(COMMIT_USAGE, COMMIT_USAGE_EXAMPLE),
            });
          message = next;
          i++;
          continue;
        }
        if (arg === "--auto-allow") {
          autoAllow = true;
          continue;
        }
        if (arg === "--allow-tasks") {
          allowTasks = true;
          continue;
        }
        if (arg === "--allow-base") {
          allowBase = true;
          continue;
        }
        if (arg === "--require-clean") {
          requireClean = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(COMMIT_USAGE, COMMIT_USAGE_EXAMPLE),
          });
        }
      }

      if (!message) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(COMMIT_USAGE, COMMIT_USAGE_EXAMPLE),
        });
      }

      return await cmdCommit({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        message,
        allow,
        autoAllow,
        allowTasks,
        allowBase,
        requireClean,
        quiet,
      });
    }

    if (namespace === "start") {
      let taskId = command;
      let startArgs = args;
      if (!taskId || taskId.startsWith("-")) {
        if (taskId?.startsWith("-")) {
          startArgs = [taskId, ...args];
        }
        taskId = process.env.AGENTPLANE_TASK_ID ?? "";
      }
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
        });
      }
      let author = "";
      let body = "";
      let commitFromComment = false;
      let commitEmoji: string | undefined;
      const commitAllow: string[] = [];
      let commitAutoAllow = false;
      let commitAllowTasks = true;
      let commitRequireClean = false;
      let confirmStatusCommit = false;
      let force = false;
      let quiet = false;

      for (let i = 0; i < startArgs.length; i++) {
        const arg = startArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = startArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
            });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = startArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
            });
          body = next;
          i++;
          continue;
        }
        if (arg === "--commit-from-comment") {
          commitFromComment = true;
          continue;
        }
        if (arg === "--commit-emoji") {
          const next = startArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
            });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = startArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
            });
          commitAllow.push(next);
          i++;
          continue;
        }
        if (arg === "--commit-auto-allow") {
          commitAutoAllow = true;
          continue;
        }
        if (arg === "--commit-allow-tasks") {
          commitAllowTasks = true;
          continue;
        }
        if (arg === "--commit-require-clean") {
          commitRequireClean = true;
          continue;
        }
        if (arg === "--confirm-status-commit") {
          confirmStatusCommit = true;
          continue;
        }
        if (arg === "--force") {
          force = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
          });
        }
      }

      if (!author || !body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(START_USAGE, START_USAGE_EXAMPLE),
        });
      }

      return await cmdStart({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        author,
        body,
        commitFromComment,
        commitEmoji,
        commitAllow,
        commitAutoAllow,
        commitAllowTasks,
        commitRequireClean,
        confirmStatusCommit,
        force,
        quiet,
      });
    }

    if (namespace === "block") {
      let taskId = command;
      let blockArgs = args;
      if (!taskId || taskId.startsWith("-")) {
        if (taskId?.startsWith("-")) {
          blockArgs = [taskId, ...args];
        }
        taskId = process.env.AGENTPLANE_TASK_ID ?? "";
      }
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
        });
      }

      let author = "";
      let body = "";
      let commitFromComment = false;
      let commitEmoji: string | undefined;
      const commitAllow: string[] = [];
      let commitAutoAllow = false;
      let commitAllowTasks = true;
      let commitRequireClean = false;
      let confirmStatusCommit = false;
      let force = false;
      let quiet = false;
      for (let i = 0; i < blockArgs.length; i++) {
        const arg = blockArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = blockArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
            });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = blockArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
            });
          body = next;
          i++;
          continue;
        }
        if (arg === "--commit-from-comment") {
          commitFromComment = true;
          continue;
        }
        if (arg === "--commit-emoji") {
          const next = blockArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
            });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = blockArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
            });
          commitAllow.push(next);
          i++;
          continue;
        }
        if (arg === "--commit-auto-allow") {
          commitAutoAllow = true;
          continue;
        }
        if (arg === "--commit-allow-tasks") {
          commitAllowTasks = true;
          continue;
        }
        if (arg === "--commit-require-clean") {
          commitRequireClean = true;
          continue;
        }
        if (arg === "--confirm-status-commit") {
          confirmStatusCommit = true;
          continue;
        }
        if (arg === "--force") {
          force = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
          });
        }
      }

      if (!author || !body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BLOCK_USAGE, BLOCK_USAGE_EXAMPLE),
        });
      }

      return await cmdBlock({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        author,
        body,
        commitFromComment,
        commitEmoji,
        commitAllow,
        commitAutoAllow,
        commitAllowTasks,
        commitRequireClean,
        confirmStatusCommit,
        force,
        quiet,
      });
    }

    if (namespace === "finish") {
      let finishArgs = args;
      const taskIds: string[] = [];
      if (command && !command.startsWith("--")) {
        taskIds.push(command);
      } else if (command?.startsWith("-")) {
        finishArgs = [command, ...args];
      }
      let argIndex = 0;
      while (argIndex < finishArgs.length) {
        const arg = finishArgs[argIndex];
        if (!arg || arg.startsWith("--")) break;
        taskIds.push(arg);
        argIndex += 1;
      }
      const flagArgs = finishArgs.slice(argIndex);
      if (taskIds.length === 0) {
        const envTaskId = process.env.AGENTPLANE_TASK_ID ?? "";
        if (envTaskId) taskIds.push(envTaskId);
      }
      if (taskIds.length === 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
        });
      }

      let author = "";
      let body = "";
      let commit: string | undefined;
      let skipVerify = false;
      let force = false;
      let noRequireTaskIdInCommit = false;
      let commitFromComment = false;
      let commitEmoji: string | undefined;
      const commitAllow: string[] = [];
      let commitAutoAllow = false;
      let commitAllowTasks = true;
      let commitRequireClean = false;
      let statusCommit = false;
      let statusCommitEmoji: string | undefined;
      const statusCommitAllow: string[] = [];
      let statusCommitAutoAllow = false;
      let statusCommitRequireClean = false;
      let confirmStatusCommit = false;
      let quiet = false;
      for (let i = 0; i < flagArgs.length; i++) {
        const arg = flagArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          body = next;
          i++;
          continue;
        }
        if (arg === "--commit") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          commit = next;
          i++;
          continue;
        }
        if (arg === "--skip-verify") {
          skipVerify = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg === "--force") {
          force = true;
          continue;
        }
        if (arg === "--no-require-task-id-in-commit") {
          noRequireTaskIdInCommit = true;
          continue;
        }
        if (arg === "--commit-from-comment") {
          commitFromComment = true;
          continue;
        }
        if (arg === "--commit-emoji") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          commitAllow.push(next);
          i++;
          continue;
        }
        if (arg === "--commit-auto-allow") {
          commitAutoAllow = true;
          continue;
        }
        if (arg === "--commit-allow-tasks") {
          commitAllowTasks = true;
          continue;
        }
        if (arg === "--commit-require-clean") {
          commitRequireClean = true;
          continue;
        }
        if (arg === "--status-commit") {
          statusCommit = true;
          continue;
        }
        if (arg === "--status-commit-emoji") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          statusCommitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--status-commit-allow") {
          const next = flagArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
            });
          statusCommitAllow.push(next);
          i++;
          continue;
        }
        if (arg === "--status-commit-auto-allow") {
          statusCommitAutoAllow = true;
          continue;
        }
        if (arg === "--status-commit-require-clean") {
          statusCommitRequireClean = true;
          continue;
        }
        if (arg === "--confirm-status-commit") {
          confirmStatusCommit = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
          });
        }
      }

      if (!author || !body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(FINISH_USAGE, FINISH_USAGE_EXAMPLE),
        });
      }

      return await cmdFinish({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskIds,
        author,
        body,
        commit,
        skipVerify,
        force,
        noRequireTaskIdInCommit,
        commitFromComment,
        commitEmoji,
        commitAllow,
        commitAutoAllow,
        commitAllowTasks,
        commitRequireClean,
        statusCommit,
        statusCommitEmoji,
        statusCommitAllow,
        statusCommitAutoAllow,
        statusCommitRequireClean,
        confirmStatusCommit,
        quiet,
      });
    }

    if (namespace === "verify") {
      let taskId = command;
      let verifyArgs = args;
      if (!taskId || taskId.startsWith("-")) {
        if (taskId?.startsWith("-")) {
          verifyArgs = [taskId, ...args];
        }
        taskId = process.env.AGENTPLANE_TASK_ID ?? "";
      }
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
        });
      }
      return await cmdVerify({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        args: verifyArgs,
      });
    }

    if (namespace === "integrate") {
      const taskId = command;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
        });
      }
      let branch: string | undefined;
      let base: string | undefined;
      let mergeStrategy: "squash" | "merge" | "rebase" = "squash";
      let runVerify = false;
      let dryRun = false;
      let quiet = false;

      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;
        if (arg === "--branch") {
          const next = args[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
            });
          branch = next;
          i++;
          continue;
        }
        if (arg === "--base") {
          const next = args[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
            });
          base = next;
          i++;
          continue;
        }
        if (arg === "--merge-strategy") {
          const next = args[i + 1];
          if (next !== "squash" && next !== "merge" && next !== "rebase") {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
            });
          }
          mergeStrategy = next;
          i++;
          continue;
        }
        if (arg === "--run-verify") {
          runVerify = true;
          continue;
        }
        if (arg === "--dry-run") {
          dryRun = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
          });
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
        });
      }

      return await cmdIntegrate({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        branch,
        base,
        mergeStrategy,
        runVerify,
        dryRun,
        quiet,
      });
    }

    if (namespace === "cleanup") {
      const subcommand = command;
      if (subcommand !== "merged") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
        });
      }
      let base: string | undefined;
      let yes = false;
      let archive = false;
      let quiet = false;

      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (!arg) continue;
        if (arg === "--base") {
          const next = args[i + 1];
          if (!next || next.trim().length === 0)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
            });
          base = next;
          i++;
          continue;
        }
        if (arg === "--yes") {
          yes = true;
          continue;
        }
        if (arg === "--archive") {
          archive = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
          });
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
        });
      }

      return await cmdCleanupMerged({
        cwd: process.cwd(),
        rootOverride: globals.root,
        base,
        yes,
        archive,
        quiet,
      });
    }

    if (namespace === "scenario") {
      return await cmdScenario({
        cwd: process.cwd(),
        rootOverride: globals.root,
        command,
        args,
      });
    }

    if (namespace === "recipe" || namespace === "recipes") {
      return await cmdRecipes({
        cwd: process.cwd(),
        rootOverride: globals.root,
        command,
        args,
      });
    }

    if (namespace === "backend") {
      const subcommand = command;
      if (subcommand !== "sync") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(BACKEND_SYNC_USAGE, BACKEND_SYNC_USAGE_EXAMPLE),
        });
      }
      return await cmdBackendSync({
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "sync") {
      const syncArgs = command ? [command, ...args] : [];
      if (command?.startsWith("--")) {
        syncArgs.shift();
        syncArgs.unshift(command, ...args);
      }
      return await cmdSync({
        cwd: process.cwd(),
        rootOverride: globals.root,
        args: syncArgs,
      });
    }

    if (namespace === "hooks") {
      const subcommand = command;
      const restArgs = args;
      if (subcommand === "install") {
        const quiet = restArgs.includes("--quiet");
        return await cmdHooksInstall({ cwd: process.cwd(), rootOverride: globals.root, quiet });
      }
      if (subcommand === "uninstall") {
        const quiet = restArgs.includes("--quiet");
        return await cmdHooksUninstall({ cwd: process.cwd(), rootOverride: globals.root, quiet });
      }
      if (subcommand === "run") {
        const hook = restArgs[0] as (typeof HOOK_NAMES)[number] | undefined;
        if (!hook || !HOOK_NAMES.includes(hook)) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(HOOKS_RUN_USAGE, HOOKS_RUN_USAGE_EXAMPLE),
          });
        }
        return await cmdHooksRun({
          cwd: process.cwd(),
          rootOverride: globals.root,
          hook,
          args: restArgs.slice(1),
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(HOOKS_INSTALL_USAGE, HOOKS_INSTALL_USAGE_EXAMPLE),
      });
    }

    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Not implemented yet. Run `agentplane --help`.",
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
