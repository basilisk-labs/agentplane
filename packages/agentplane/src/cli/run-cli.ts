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
import { writeJsonStableIfChanged, writeTextIfChanged } from "../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../commands/shared/task-backend.js";
import { getVersion } from "../meta/version.js";
import { parseBlock, parseFinish, parseStart, parseVerify } from "./parse/lifecycle.js";
import { CommandRegistry } from "../cli2/registry.js";
import { parseCommandArgv } from "../cli2/parse.js";
import { helpSpec, makeHelpHandler } from "../cli2/help.js";
import type { CommandHandler, CommandSpec } from "../cli2/spec.js";
import { usageError } from "../cli2/errors.js";
import { taskNewSpec, makeRunTaskNewHandler } from "../commands/task/new.command.js";
import { workStartSpec, makeRunWorkStartHandler } from "../commands/branch/work-start.command.js";
import { recipesInstallSpec, runRecipesInstall } from "../commands/recipes/install.command.js";
import { upgradeSpec, runUpgrade } from "../commands/upgrade.command.js";
import {
  BACKEND_SYNC_USAGE,
  BACKEND_SYNC_USAGE_EXAMPLE,
  cmdBackendSync,
  cmdSync,
} from "../commands/backend.js";
import { cmdRecipes } from "../commands/recipes.js";
import { cmdScenario } from "../commands/scenario.js";
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
  cmdTaskDerive,
  cmdTaskExport,
  cmdTaskLint,
  cmdTaskMigrate,
  cmdTaskMigrateDoc,
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
  'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --allow packages/agentplane';
const HOOKS_RUN_USAGE = "Usage: agentplane hooks run <hook>";
const HOOKS_RUN_USAGE_EXAMPLE = "agentplane hooks run pre-commit";
const HOOKS_INSTALL_USAGE = "Usage: agentplane hooks install|uninstall";
const HOOKS_INSTALL_USAGE_EXAMPLE = "agentplane hooks install";

function parseBooleanValueForInit(flag: string, value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  throw usageError({
    spec: initSpec,
    command: "init",
    message: invalidValueForFlag(flag, value, "true|false"),
  });
}

function parseRecipesSelectionForInit(value: string): string[] {
  const normalized = value.trim().toLowerCase();
  if (normalized === "none" || normalized === "") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

type InitParsed = Omit<InitFlags, "yes"> & { yes: boolean };

const initSpec: CommandSpec<InitParsed> = {
  id: ["init"],
  group: "Setup",
  summary: "Initialize agentplane project files under .agentplane/.",
  description:
    "Creates .agentplane/ config, backend stubs, and agent templates. In interactive mode it prompts for missing inputs; use --yes for non-interactive mode.",
  options: [
    {
      kind: "string",
      name: "ide",
      valueHint: "<codex|cursor|windsurf>",
      choices: ["codex", "cursor", "windsurf"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description: "IDE rules integration target (default: codex).",
    },
    {
      kind: "string",
      name: "workflow",
      valueHint: "<direct|branch_pr>",
      choices: ["direct", "branch_pr"],
      description: "Workflow mode (default: direct).",
    },
    {
      kind: "string",
      name: "backend",
      valueHint: "<local|redmine>",
      choices: ["local", "redmine"],
      coerce: (raw) => raw.trim().toLowerCase(),
      description: "Task backend (default: local).",
    },
    {
      kind: "string",
      name: "hooks",
      valueHint: "<true|false>",
      description: "Install git hooks (non-interactive requires an explicit value).",
    },
    {
      kind: "string",
      name: "require-plan-approval",
      valueHint: "<true|false>",
      description: "Require explicit plan approval before starting work.",
    },
    {
      kind: "string",
      name: "require-network-approval",
      valueHint: "<true|false>",
      description: "Require explicit approval before any network operation.",
    },
    {
      kind: "string",
      name: "require-verify-approval",
      valueHint: "<true|false>",
      description: "Require explicit approval before recording verification.",
    },
    {
      kind: "string",
      name: "recipes",
      valueHint: "<none|id1,id2,...>",
      description: "Optional bundled recipes selection (comma-separated), or 'none'.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Overwrite init conflicts by deleting existing paths.",
    },
    {
      kind: "boolean",
      name: "backup",
      default: false,
      description: "Backup init conflicts before overwriting.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Non-interactive mode (do not prompt; use defaults for missing flags).",
    },
  ],
  examples: [
    {
      cmd: "agentplane init",
      why: "Interactive setup (prompts for missing values).",
    },
    {
      cmd: "agentplane init --workflow direct --backend local --hooks false --require-plan-approval true --require-network-approval true --require-verify-approval true --yes",
      why: "Non-interactive setup with explicit policy flags.",
    },
    {
      cmd: "agentplane init --force --yes",
      why: "Re-initialize, overwriting conflicting paths (non-interactive).",
    },
  ],
  validateRaw: (raw) => {
    if (raw.extra.length > 0) {
      throw usageError({
        spec: initSpec,
        command: "init",
        message: `Unexpected argument: ${raw.extra[0]}`,
      });
    }
  },
  parse: (raw) => {
    const hooksRaw = raw.opts.hooks as string | undefined;
    const requirePlanRaw = raw.opts["require-plan-approval"] as string | undefined;
    const requireNetworkRaw = raw.opts["require-network-approval"] as string | undefined;
    const requireVerifyRaw = raw.opts["require-verify-approval"] as string | undefined;
    const recipesRaw = raw.opts.recipes as string | undefined;

    return {
      ide: raw.opts.ide as InitFlags["ide"],
      workflow: raw.opts.workflow as InitFlags["workflow"],
      backend: raw.opts.backend as InitFlags["backend"],
      hooks: hooksRaw === undefined ? undefined : parseBooleanValueForInit("--hooks", hooksRaw),
      requirePlanApproval:
        requirePlanRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-plan-approval", requirePlanRaw),
      requireNetworkApproval:
        requireNetworkRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-network-approval", requireNetworkRaw),
      requireVerifyApproval:
        requireVerifyRaw === undefined
          ? undefined
          : parseBooleanValueForInit("--require-verify-approval", requireVerifyRaw),
      recipes: recipesRaw === undefined ? undefined : parseRecipesSelectionForInit(recipesRaw),
      force: raw.opts.force === true,
      backup: raw.opts.backup === true,
      yes: raw.opts.yes === true,
    };
  },
  validate: (p) => {
    if (p.force && p.backup) {
      throw usageError({
        spec: initSpec,
        command: "init",
        message: "Use either --force or --backup (not both).",
      });
    }
  },
};

const runInit: CommandHandler<InitParsed> = (ctx, flags) =>
  cmdInit({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });

type QuickstartParsed = Record<string, never>;

const quickstartSpec: CommandSpec<QuickstartParsed> = {
  id: ["quickstart"],
  group: "Core",
  summary: "Print CLI quickstart and command cheat sheet.",
  options: [],
  examples: [{ cmd: "agentplane quickstart", why: "Show quickstart." }],
  parse: () => ({}),
};

const runQuickstart: CommandHandler<QuickstartParsed> = (ctx) => {
  cmdQuickstart({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
  return Promise.resolve(0);
};

type RoleParsed = { role: string };

const roleSpec: CommandSpec<RoleParsed> = {
  id: ["role"],
  group: "Core",
  summary: "Show role-specific workflow guidance.",
  args: [{ name: "role", required: true, valueHint: "<role>" }],
  examples: [{ cmd: "agentplane role ORCHESTRATOR", why: "Show ORCHESTRATOR guide." }],
  parse: (raw) => ({ role: String(raw.args.role ?? "") }),
};

const runRole: CommandHandler<RoleParsed> = (ctx, p) => {
  cmdRole({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, role: p.role });
  return Promise.resolve(0);
};

type AgentsParsed = Record<string, never>;

const agentsSpec: CommandSpec<AgentsParsed> = {
  id: ["agents"],
  group: "Core",
  summary: "List agent definitions under .agentplane/agents.",
  examples: [{ cmd: "agentplane agents", why: "Print available agent ids and roles." }],
  parse: () => ({}),
};

const runAgents: CommandHandler<AgentsParsed> = (ctx) =>
  cmdAgents({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });

type ConfigShowParsed = Record<string, never>;

const configShowSpec: CommandSpec<ConfigShowParsed> = {
  id: ["config", "show"],
  group: "Config",
  summary: "Print resolved config JSON.",
  examples: [{ cmd: "agentplane config show", why: "Show the active config." }],
  parse: () => ({}),
};

const runConfigShow: CommandHandler<ConfigShowParsed> = (ctx) =>
  cmdConfigShow({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });

type ConfigSetParsed = { key: string; value: string };

const configSetSpec: CommandSpec<ConfigSetParsed> = {
  id: ["config", "set"],
  group: "Config",
  summary: "Update project config (dotted keys).",
  args: [
    { name: "key", required: true, valueHint: "<key>" },
    { name: "value", required: true, valueHint: "<value>" },
  ],
  examples: [
    { cmd: "agentplane config set workflow_mode direct", why: "Set workflow mode." },
    {
      cmd: 'agentplane config set tasks.verify.required_tags \'["code","backend"]\'',
      why: "Set a JSON list value (pass JSON as a string).",
    },
  ],
  parse: (raw) => ({ key: String(raw.args.key ?? ""), value: String(raw.args.value ?? "") }),
};

const runConfigSet: CommandHandler<ConfigSetParsed> = (ctx, p) =>
  cmdConfigSet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, key: p.key, value: p.value });

type ModeGetParsed = Record<string, never>;

const modeGetSpec: CommandSpec<ModeGetParsed> = {
  id: ["mode", "get"],
  group: "Config",
  summary: "Print workflow mode.",
  examples: [{ cmd: "agentplane mode get", why: "Print workflow_mode (direct|branch_pr)." }],
  parse: () => ({}),
};

const runModeGet: CommandHandler<ModeGetParsed> = (ctx) =>
  cmdModeGet({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });

type ModeSetParsed = { mode: string };

const modeSetSpec: CommandSpec<ModeSetParsed> = {
  id: ["mode", "set"],
  group: "Config",
  summary: "Set workflow mode.",
  args: [{ name: "mode", required: true, valueHint: "<direct|branch_pr>" }],
  examples: [{ cmd: "agentplane mode set branch_pr", why: "Switch to branch_pr mode." }],
  parse: (raw) => ({ mode: String(raw.args.mode ?? "") }),
  validate: (p) => {
    if (p.mode !== "direct" && p.mode !== "branch_pr") {
      throw usageError({
        spec: modeSetSpec,
        command: "mode set",
        message: `Invalid value for mode: ${p.mode} (expected: direct|branch_pr)`,
      });
    }
  },
};

const runModeSet: CommandHandler<ModeSetParsed> = (ctx, p) =>
  cmdModeSet({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    mode: p.mode as "direct" | "branch_pr",
  });

type IdeSyncParsed = { ide?: "cursor" | "windsurf" };

const ideSyncSpec: CommandSpec<IdeSyncParsed> = {
  id: ["ide", "sync"],
  group: "IDE",
  summary: "Generate IDE entrypoints from AGENTS.md.",
  options: [
    {
      kind: "string",
      name: "ide",
      valueHint: "<cursor|windsurf>",
      choices: ["cursor", "windsurf"],
      description: "Only generate rules for a single IDE (default: both).",
    },
  ],
  examples: [
    { cmd: "agentplane ide sync", why: "Generate Cursor + Windsurf rules." },
    { cmd: "agentplane ide sync --ide cursor", why: "Generate Cursor rules only." },
  ],
  parse: (raw) => ({ ide: raw.opts.ide as IdeSyncParsed["ide"] }),
};

const runIdeSync: CommandHandler<IdeSyncParsed> = (ctx, p) =>
  cmdIdeSync({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, ide: p.ide });

async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  flags: InitParsed;
}): Promise<number> {
  const flags = opts.flags;
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
    throw usageError({
      spec: initSpec,
      command: "init",
      message:
        "Non-interactive init requires --yes or explicit values for: --workflow, --hooks, --require-plan-approval, --require-network-approval, --require-verify-approval.",
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
    await writeJsonStableIfChanged(localBackendPath, localBackendPayload);
    await writeJsonStableIfChanged(redmineBackendPath, redmineBackendPayload);

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
      await writeTextIfChanged(cursorPath, content);
      process.stdout.write(`${path.relative(resolved.gitRoot, cursorPath)}\n`);
    }

    if (targets.includes("windsurf")) {
      const windsurfDir = path.join(resolved.gitRoot, ".windsurf", "rules");
      await mkdir(windsurfDir, { recursive: true });
      const windsurfPath = path.join(windsurfDir, "agentplane.md");
      await writeTextIfChanged(windsurfPath, content);
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
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: "Missing required argument: role",
      });
    }
    const guide = renderRole(roleRaw);
    if (!guide) {
      const roles = listRoles();
      const available = roles.length > 0 ? `\nAvailable roles: ${roles.join(", ")}` : "";
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.${available}`,
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
  let jsonErrors = false;
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

    // cli2: `agentplane help ...` should be fast and not require project resolution.
    if (rest[0] === "help") {
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
      registry.register(taskNewSpec, noop);
      registry.register(workStartSpec, noop);
      registry.register(recipesInstallSpec, noop);
      registry.register(helpSpec, makeHelpHandler(registry));

      const match = registry.match(rest);
      if (!match) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Unknown command: help" });
      }
      const tail = rest.slice(match.consumed);
      const parsed = parseCommandArgv(match.spec, tail).parsed;
      return await match.handler({ cwd: process.cwd(), rootOverride: globals.root }, parsed);
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

    const [namespace, command, ...args] = rest;
    let ctxPromise: Promise<CommandContext> | null = null;
    const getCtx = async (commandForErrorContext: string): Promise<CommandContext> => {
      ctxPromise ??= loadCommandContext({ cwd, rootOverride: globals.root ?? null });
      try {
        return await ctxPromise;
      } catch (err) {
        throw mapCoreError(err, { command: commandForErrorContext, root: globals.root ?? null });
      }
    };

    // cli2 command routing (migrated commands only, for now).
    {
      const registry = new CommandRegistry();
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
      registry.register(taskNewSpec, makeRunTaskNewHandler(getCtx));
      registry.register(workStartSpec, makeRunWorkStartHandler(getCtx));
      registry.register(recipesInstallSpec, runRecipesInstall);

      const match = registry.match(rest);
      if (match) {
        const tail = rest.slice(match.consumed);
        const parsed = parseCommandArgv(match.spec, tail).parsed;
        return await match.handler({ cwd, rootOverride: globals.root }, parsed);
      }
    }

    if (namespace === "ready") {
      if (!command || command.startsWith("--") || args.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(READY_USAGE, READY_USAGE_EXAMPLE),
        });
      }
      return await cmdReady({
        ctx: await getCtx("ready"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId: command,
      });
    }

    if (namespace === "task" && command === "new") {
      return await cmdTaskNew({
        ctx: await getCtx("task new"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "derive") {
      return await cmdTaskDerive({
        ctx: await getCtx("task derive"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "add") {
      return await cmdTaskAdd({
        ctx: await getCtx("task add"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "update") {
      return await cmdTaskUpdate({
        ctx: await getCtx("task update"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "scrub") {
      return await cmdTaskScrub({
        ctx: await getCtx("task scrub"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
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
      return await cmdTaskShow({
        ctx: await getCtx("task show"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
      });
    }

    if (namespace === "task" && command === "list") {
      return await cmdTaskList({
        ctx: await getCtx("task list"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "next") {
      return await cmdTaskNext({
        ctx: await getCtx("task next"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
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
        ctx: await getCtx("task search"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        query,
        args: restArgs,
      });
    }

    if (namespace === "task" && command === "scaffold") {
      return await cmdTaskScaffold({
        ctx: await getCtx("task scaffold"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "normalize") {
      return await cmdTaskNormalize({
        ctx: await getCtx("task normalize"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "migrate") {
      return await cmdTaskMigrate({
        ctx: await getCtx("task migrate"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "migrate-doc") {
      return await cmdTaskMigrateDoc({ cwd: process.cwd(), rootOverride: globals.root, args });
    }

    if (namespace === "task" && command === "export") {
      return await cmdTaskExport({
        ctx: await getCtx("task export"),
        cwd: process.cwd(),
        rootOverride: globals.root,
      });
    }

    if (namespace === "task" && command === "lint") {
      return await cmdTaskLint({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "verify-show") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(
            "Usage: agentplane task verify-show <task-id> [--quiet]",
            "agentplane task verify-show 202602030608-F1Q8AB",
          ),
        });
      }
      if (restArgs.includes("--section")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(
            "Usage: agentplane task verify-show <task-id> [--quiet]",
            "agentplane task verify-show 202602030608-F1Q8AB",
          ),
        });
      }
      return await cmdTaskDocShow({
        ctx: await getCtx("task verify-show"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        args: ["--section", "Verify Steps", ...restArgs],
      });
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
          ctx: await getCtx("task doc show"),
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
          ctx: await getCtx("task doc set"),
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
      return await cmdTaskPlan({
        ctx: await getCtx("task plan"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
    }

    if (namespace === "task" && command === "verify") {
      return await cmdTaskVerify({
        ctx: await getCtx("task verify"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        args,
      });
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
        ctx: await getCtx("task comment"),
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
        ctx: await getCtx("task set-status"),
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
        ctx: await getCtx("work start"),
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
          ctx: await getCtx("pr open"),
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
          ctx: await getCtx("pr update"),
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
          ctx: await getCtx("pr check"),
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
          ctx: await getCtx("pr note"),
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
        let allowBase = false;
        let allowPolicy = false;
        let allowConfig = false;
        let allowHooks = false;
        let allowCI = false;
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
          if (arg === "--allow-base") {
            allowBase = true;
            continue;
          }
          if (arg === "--allow-policy") {
            allowPolicy = true;
            continue;
          }
          if (arg === "--allow-config") {
            allowConfig = true;
            continue;
          }
          if (arg === "--allow-hooks") {
            allowHooks = true;
            continue;
          }
          if (arg === "--allow-ci") {
            allowCI = true;
            continue;
          }
          if (arg === "--auto-allow") {
            autoAllow = true;
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

        return await cmdGuardCommit({
          ctx: await getCtx("guard commit"),
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          message,
          allow,
          allowBase,
          allowTasks,
          allowPolicy,
          allowConfig,
          allowHooks,
          allowCI,
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
      let allowPolicy = false;
      let allowConfig = false;
      let allowHooks = false;
      let allowCI = false;
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
        if (arg === "--allow-policy") {
          allowPolicy = true;
          continue;
        }
        if (arg === "--allow-config") {
          allowConfig = true;
          continue;
        }
        if (arg === "--allow-hooks") {
          allowHooks = true;
          continue;
        }
        if (arg === "--allow-ci") {
          allowCI = true;
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
        ctx: await getCtx("commit"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        message,
        allow,
        autoAllow,
        allowTasks,
        allowBase,
        allowPolicy,
        allowConfig,
        allowHooks,
        allowCI,
        requireClean,
        quiet,
      });
    }

    if (namespace === "start") {
      const parsed = parseStart({
        taskIdToken: command,
        args,
        usage: { usage: START_USAGE, example: START_USAGE_EXAMPLE },
      });
      return await cmdStart({
        ctx: await getCtx("start"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId: parsed.taskId,
        author: parsed.author,
        body: parsed.body,
        commitFromComment: parsed.commitFromComment,
        commitEmoji: parsed.commitEmoji,
        commitAllow: parsed.commitAllow,
        commitAutoAllow: parsed.commitAutoAllow,
        commitAllowTasks: parsed.commitAllowTasks,
        commitRequireClean: parsed.commitRequireClean,
        confirmStatusCommit: parsed.confirmStatusCommit,
        force: parsed.force,
        quiet: parsed.quiet,
      });
    }

    if (namespace === "block") {
      const parsed = parseBlock({
        taskIdToken: command,
        args,
        usage: { usage: BLOCK_USAGE, example: BLOCK_USAGE_EXAMPLE },
      });
      return await cmdBlock({
        ctx: await getCtx("block"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId: parsed.taskId,
        author: parsed.author,
        body: parsed.body,
        commitFromComment: parsed.commitFromComment,
        commitEmoji: parsed.commitEmoji,
        commitAllow: parsed.commitAllow,
        commitAutoAllow: parsed.commitAutoAllow,
        commitAllowTasks: parsed.commitAllowTasks,
        commitRequireClean: parsed.commitRequireClean,
        confirmStatusCommit: parsed.confirmStatusCommit,
        force: parsed.force,
        quiet: parsed.quiet,
      });
    }

    if (namespace === "finish") {
      const parsed = parseFinish({
        commandToken: command,
        args,
        usage: { usage: FINISH_USAGE, example: FINISH_USAGE_EXAMPLE },
      });
      return await cmdFinish({
        ctx: await getCtx("finish"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskIds: parsed.taskIds,
        author: parsed.author,
        body: parsed.body,
        commit: parsed.commit,
        force: parsed.force,
        commitFromComment: parsed.commitFromComment,
        commitEmoji: parsed.commitEmoji,
        commitAllow: parsed.commitAllow,
        commitAutoAllow: parsed.commitAutoAllow,
        commitAllowTasks: parsed.commitAllowTasks,
        commitRequireClean: parsed.commitRequireClean,
        statusCommit: parsed.statusCommit,
        statusCommitEmoji: parsed.statusCommitEmoji,
        statusCommitAllow: parsed.statusCommitAllow,
        statusCommitAutoAllow: parsed.statusCommitAutoAllow,
        statusCommitRequireClean: parsed.statusCommitRequireClean,
        confirmStatusCommit: parsed.confirmStatusCommit,
        quiet: parsed.quiet,
      });
    }

    if (namespace === "verify") {
      const parsed = parseVerify({
        taskIdToken: command,
        args,
        usage: { usage: VERIFY_USAGE, example: VERIFY_USAGE_EXAMPLE },
      });
      return await cmdVerify({
        ctx: await getCtx("verify"),
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId: parsed.taskId,
        args: parsed.args,
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
        ctx: await getCtx("integrate"),
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
        ctx: await getCtx("cleanup merged"),
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
        ctx: await getCtx("backend sync"),
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
        ctx: await getCtx("sync"),
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
