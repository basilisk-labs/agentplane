import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  chmod,
  cp,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import {
  defaultConfig,
  extractTaskSuffix,
  findGitRoot,
  getBaseBranch,
  getStagedFiles,
  getUnstagedFiles,
  lintTasksFile,
  loadConfig,
  renderTaskReadme,
  resolveProject,
  saveConfig,
  setByDottedKey,
  setPinnedBaseBranch,
  taskReadmePath,
  validateCommitSubject,
  validateTaskDocMetadata,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { renderHelp } from "./help.js";
import { listRoles, renderQuickstart, renderRole } from "./command-guide.js";
import { formatCommentBodyForCommit } from "./comment-format.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  type WorkflowMode,
} from "./agents-template.js";
import { backupPath, fileExists, getPathKind } from "./cli/fs-utils.js";
import { promptChoice, promptInput, promptYesNo } from "./cli/prompts.js";
import {
  listBundledRecipes,
  renderBundledRecipesHint,
  validateBundledRecipesSelection,
} from "./cli/recipes-bundled.js";
import { loadDotEnv } from "./env.js";
import { CliError, formatJsonError } from "./errors.js";
import { BackendError, loadTaskBackend, type TaskData } from "./task-backend.js";
import { getVersion } from "./version.js";

const execFileAsync = promisify(execFile);

function gitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  return env;
}

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
    process.stdout.write(`${formatJsonError(err, { hint })}\n`);
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

function missingValueMessage(flag: string): string {
  return `Missing value for ${flag} (expected value after flag)`;
}

function invalidValueMessage(label: string, value: string, expected: string): string {
  return `Invalid ${label}: ${value} (expected ${expected})`;
}

function invalidValueForFlag(flag: string, value: string, expected: string): string {
  return invalidValueMessage(`value for ${flag}`, value, expected);
}

function unknownEntityMessage(entity: string, value: string): string {
  return `Unknown ${entity}: ${value}`;
}

function emptyStateMessage(resource: string, hint?: string): string {
  return `No ${resource} found.${hint ? ` ${hint}` : ""}`;
}

function requiredFieldMessage(field: string, source?: string): string {
  return `Missing required field: ${field}${source ? ` (${source})` : ""}`;
}

function invalidFieldMessage(field: string, expected: string, source?: string): string {
  return `Invalid field ${field}: expected ${expected}${source ? ` (${source})` : ""}`;
}

function invalidPathMessage(field: string, reason: string, source?: string): string {
  return `Invalid ${field}: ${reason}${source ? ` (${source})` : ""}`;
}

function missingFileMessage(filename: string, rootHint?: string): string {
  return `Missing ${filename}${rootHint ? ` at ${rootHint}` : ""}`;
}

function successMessage(action: string, target?: string, details?: string): string {
  const base = target ? `${action} ${target}` : action;
  const suffix = details ? ` (${details})` : "";
  return `✅ ${base}${suffix}`;
}

function infoMessage(message: string): string {
  return `ℹ️ ${message}`;
}

function warnMessage(message: string): string {
  return `⚠️ ${message}`;
}

function usageMessage(usage: string, example?: string): string {
  return example ? `${usage}\nExample: ${example}` : usage;
}

function backendNotSupportedMessage(feature: string): string {
  return `Backend does not support ${feature}`;
}

const UPDATE_CHECK_PACKAGE = "agentplane";
const UPDATE_CHECK_URL = `https://registry.npmjs.org/${UPDATE_CHECK_PACKAGE}/latest`;
const UPDATE_CHECK_TIMEOUT_MS = 1500;

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

async function fetchLatestNpmVersion(): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPDATE_CHECK_TIMEOUT_MS);
  try {
    const res = await fetch(UPDATE_CHECK_URL, {
      headers: { "User-Agent": "agentplane" },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    const version = typeof data.version === "string" ? data.version.trim() : "";
    return version.length > 0 ? version : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function maybeWarnOnUpdate(opts: {
  currentVersion: string;
  skip: boolean;
  jsonErrors: boolean;
}): Promise<void> {
  if (opts.skip || opts.jsonErrors) return;
  if (isTruthyEnv(process.env.AGENTPLANE_NO_UPDATE_CHECK)) return;
  const latest = await fetchLatestNpmVersion();
  if (!latest) return;
  if (compareVersions(latest, opts.currentVersion) <= 0) return;
  const message = `Update available: ${UPDATE_CHECK_PACKAGE} ${opts.currentVersion} → ${latest}. Run: npm i -g ${UPDATE_CHECK_PACKAGE}@latest`;
  process.stderr.write(`${warnMessage(message)}\n`);
}

function workflowModeMessage(actual: string | undefined, expected: string): string {
  return `Invalid workflow_mode: ${actual ?? "unknown"} (expected ${expected})`;
}

function mapCoreError(err: unknown, context: Record<string, unknown>): CliError {
  const message = err instanceof Error ? err.message : String(err);

  if (message.startsWith("Not a git repository")) {
    return new CliError({ exitCode: 5, code: "E_GIT", message, context });
  }

  if (err instanceof SyntaxError) {
    return new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid JSON: ${message}`,
      context,
    });
  }

  if (message.includes("schema_version") || message.startsWith("config.")) {
    return new CliError({ exitCode: 3, code: "E_VALIDATION", message, context });
  }

  return new CliError({ exitCode: 4, code: "E_IO", message, context });
}

function isNotGitRepoError(err: unknown): boolean {
  if (err instanceof Error) {
    return err.message.startsWith("Not a git repository");
  }
  return false;
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

async function maybeResolveProject(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<{ gitRoot: string; agentplaneDir: string } | null> {
  try {
    return await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
  } catch (err) {
    if (isNotGitRepoError(err)) {
      if (opts.rootOverride) throw err;
      return null;
    }
    throw err;
  }
}

function mapBackendError(err: unknown, context: Record<string, unknown>): CliError {
  if (err instanceof BackendError) {
    return new CliError({
      exitCode: 6,
      code: err.code,
      message: err.message,
      context,
    });
  }
  return mapCoreError(err, context);
}

async function writeFileIfChanged(filePath: string, content: string): Promise<boolean> {
  try {
    const existing = await readFile(filePath, "utf8");
    if (existing === content) return false;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }
  await writeFile(filePath, content, "utf8");
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
  hooks?: boolean;
  requirePlanApproval?: boolean;
  requireNetworkApproval?: boolean;
  recipes?: string[];
  force?: boolean;
  backup?: boolean;
  yes: boolean;
};

type RecipeManifest = {
  schema_version: "1";
  id: string;
  version: string;
  name: string;
  summary: string;
  description: string;
  tags?: string[];
  agents?: { id?: string; summary?: string; file?: string }[];
  tools?: {
    id?: string;
    summary?: string;
    runtime?: "node" | "bash";
    entrypoint?: string;
    permissions?: string[];
  }[];
  scenarios?: { id?: string; summary?: string }[];
};

type RecipeConflictMode = "fail" | "rename" | "overwrite";

type InstalledRecipeEntry = {
  id: string;
  version: string;
  source: string;
  installed_at: string;
  tags: string[];
  manifest: RecipeManifest;
};

type InstalledRecipesFile = {
  schema_version: 1;
  updated_at: string;
  recipes: InstalledRecipeEntry[];
};

type ScenarioDefinition = {
  schema_version: "1";
  id: string;
  summary?: string;
  description?: string;
  goal: string;
  inputs: unknown;
  outputs: unknown;
  steps: unknown[];
};

type RecipeScenarioDetail = {
  id: string;
  summary?: string;
  description?: string;
  goal?: string;
  inputs?: unknown;
  outputs?: unknown;
  steps?: unknown[];
  source: "definition" | "index" | "manifest";
};

type RecipesIndex = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    versions: {
      version: string;
      url: string;
      sha256: string;
      min_agentplane_version?: string;
      tags?: string[];
    }[];
  }[];
};

const INSTALLED_RECIPES_NAME = "recipes.json";
const RECIPES_DIR_NAME = "recipes";
const RECIPES_SCENARIOS_DIR_NAME = "scenarios";
const RECIPES_SCENARIOS_INDEX_NAME = "scenarios.json";
const RECIPES_REMOTE_INDEX_NAME = "recipes-index.json";
const RECIPE_USAGE =
  "Usage: agentplane recipes <list|info|explain|install|remove|list-remote|cache> [args]";
const RECIPE_USAGE_EXAMPLE = "agentplane recipes list";
const RECIPE_INFO_USAGE = "Usage: agentplane recipes info <id>";
const RECIPE_INFO_USAGE_EXAMPLE = "agentplane recipes info viewer";
const RECIPE_EXPLAIN_USAGE = "Usage: agentplane recipes explain <id>";
const RECIPE_EXPLAIN_USAGE_EXAMPLE = "agentplane recipes explain viewer";
const RECIPE_INSTALL_USAGE =
  "Usage: agentplane recipes install --name <id> [--index <path|url>] [--refresh] | --path <path> | --url <url>";
const RECIPE_INSTALL_USAGE_EXAMPLE = "agentplane recipes install --name viewer";
const RECIPE_REMOVE_USAGE = "Usage: agentplane recipes remove <id>";
const RECIPE_REMOVE_USAGE_EXAMPLE = "agentplane recipes remove viewer";
const RECIPE_CACHE_USAGE = "Usage: agentplane recipes cache <prune> [args]";
const RECIPE_CACHE_USAGE_EXAMPLE = "agentplane recipes cache prune --dry-run";
const RECIPE_CACHE_PRUNE_USAGE = "Usage: agentplane recipes cache prune [--dry-run] [--all]";
const RECIPE_CACHE_PRUNE_USAGE_EXAMPLE = "agentplane recipes cache prune --dry-run";
const RECIPE_LIST_REMOTE_USAGE =
  "Usage: agentplane recipes list-remote [--refresh] [--index <path|url>]";
const RECIPE_LIST_REMOTE_USAGE_EXAMPLE = "agentplane recipes list-remote --refresh";
const DEFAULT_RECIPES_INDEX_URL =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";
const RECIPE_CONFLICT_MODES = ["fail", "rename", "overwrite"] as const;
const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";
const GLOBAL_RECIPES_DIR_NAME = "recipes";
const PROJECT_RECIPES_CACHE_DIR_NAME = "recipes-cache";
const SCENARIO_USAGE = "Usage: agentplane scenario <list|info|run> [args]";
const SCENARIO_USAGE_EXAMPLE = "agentplane scenario list";
const SCENARIO_INFO_USAGE = "Usage: agentplane scenario info <recipe:scenario>";
const SCENARIO_INFO_USAGE_EXAMPLE = "agentplane scenario info viewer:demo";
const SCENARIO_RUN_USAGE = "Usage: agentplane scenario run <recipe:scenario>";
const SCENARIO_RUN_USAGE_EXAMPLE = "agentplane scenario run viewer:demo";
const BACKEND_SYNC_USAGE =
  "Usage: agentplane backend sync <id> --direction <push|pull> [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
const BACKEND_SYNC_USAGE_EXAMPLE = "agentplane backend sync local --direction pull";
const SYNC_USAGE =
  "Usage: agentplane sync [<id>] [--direction <push|pull>] [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
const SYNC_USAGE_EXAMPLE = "agentplane sync --direction push --yes";
const READY_USAGE = "Usage: agentplane ready <task-id>";
const READY_USAGE_EXAMPLE = "agentplane ready 202602030608-F1Q8AB";
const ROLE_USAGE = "Usage: agentplane role <role>";
const ROLE_USAGE_EXAMPLE = "agentplane role ORCHESTRATOR";
const AGENTS_USAGE = "Usage: agentplane agents";
const AGENTS_USAGE_EXAMPLE = "agentplane agents";
const BRANCH_BASE_USAGE = "Usage: agentplane branch base get|set <name>";
const BRANCH_BASE_USAGE_EXAMPLE = "agentplane branch base set main";
const BRANCH_STATUS_USAGE = "Usage: agentplane branch status [--branch <name>] [--base <name>]";
const BRANCH_STATUS_USAGE_EXAMPLE = "agentplane branch status --base main";
const BRANCH_REMOVE_USAGE =
  "Usage: agentplane branch remove [--branch <name>] [--worktree <path>] [--force] [--quiet]";
const BRANCH_REMOVE_USAGE_EXAMPLE =
  "agentplane branch remove --branch task/20260203-F1Q8AB --worktree .agentplane/worktrees/task";
const UPGRADE_USAGE =
  "Usage: agentplane upgrade [--tag <tag>] [--dry-run] [--no-backup] [--source <repo-url>] [--bundle <path|url>] [--checksum <path|url>]";
const UPGRADE_USAGE_EXAMPLE = "agentplane upgrade --tag v0.1.2 --dry-run";
const INIT_USAGE =
  "Usage: agentplane init --ide <...> --workflow <...> --hooks <...> --require-plan-approval <...> --require-network-approval <...> [--recipes <...>] [--yes] [--force|--backup]";
const INIT_USAGE_EXAMPLE =
  "agentplane init --ide codex --workflow direct --hooks false --require-plan-approval true --require-network-approval true --yes";
const CONFIG_SET_USAGE = "Usage: agentplane config set <key> <value>";
const CONFIG_SET_USAGE_EXAMPLE = "agentplane config set workflow_mode branch_pr";
const MODE_SET_USAGE = "Usage: agentplane mode set <direct|branch_pr>";
const MODE_SET_USAGE_EXAMPLE = "agentplane mode set direct";
const QUICKSTART_USAGE = "Usage: agentplane quickstart";
const QUICKSTART_USAGE_EXAMPLE = "agentplane quickstart";
const TASK_UPDATE_USAGE = "Usage: agentplane task update <task-id> [flags]";
const TASK_UPDATE_USAGE_EXAMPLE =
  'agentplane task update 202602030608-F1Q8AB --title "..." --owner CODER';
const TASK_SCAFFOLD_USAGE =
  "Usage: agentplane task scaffold <task-id> [--title <text>] [--overwrite] [--force]";
const TASK_SCAFFOLD_USAGE_EXAMPLE = "agentplane task scaffold 202602030608-F1Q8AB";
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
const DEFAULT_UPGRADE_ASSET = "agentplane-upgrade.tar.gz";
const DEFAULT_UPGRADE_CHECKSUM_ASSET = `${DEFAULT_UPGRADE_ASSET}.sha256`;

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

type UpgradeFlags = {
  source?: string;
  tag?: string;
  bundle?: string;
  checksum?: string;
  asset?: string;
  checksumAsset?: string;
  dryRun: boolean;
  backup: boolean;
};

function parseUpgradeFlags(args: string[]): UpgradeFlags {
  const out: UpgradeFlags = { dryRun: false, backup: true };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
      });
    }
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg === "--no-backup") {
      out.backup = false;
      continue;
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--source": {
        out.source = next;
        break;
      }
      case "--tag": {
        out.tag = next;
        break;
      }
      case "--bundle": {
        out.bundle = next;
        break;
      }
      case "--checksum": {
        out.checksum = next;
        break;
      }
      case "--asset": {
        out.asset = next;
        break;
      }
      case "--checksum-asset": {
        out.checksumAsset = next;
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
        });
      }
    }
    i++;
  }
  if ((out.bundle && !out.checksum) || (!out.bundle && out.checksum)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
    });
  }
  return out;
}

type RecipeListRemoteFlags = {
  refresh: boolean;
  index?: string;
};

function parseRecipeListRemoteFlags(args: string[]): RecipeListRemoteFlags {
  const out: RecipeListRemoteFlags = { refresh: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(RECIPE_LIST_REMOTE_USAGE, RECIPE_LIST_REMOTE_USAGE_EXAMPLE),
      });
    }
    if (arg === "--refresh") {
      out.refresh = true;
      continue;
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--index": {
        out.index = next;
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_LIST_REMOTE_USAGE, RECIPE_LIST_REMOTE_USAGE_EXAMPLE),
        });
      }
    }
    i++;
  }
  return out;
}

function normalizeRecipeId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("manifest.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("manifest.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("manifest.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeAgentId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("agent.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("agent.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("agent.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeScenarioId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("scenario.id"));
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error(invalidPathMessage("scenario.id", "must not contain path separators"));
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error(invalidPathMessage("scenario.id", "must not be '.' or '..'"));
  }
  return trimmed;
}

function normalizeRecipeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
  const tags = value.map((tag) => {
    if (typeof tag !== "string") throw new Error(invalidFieldMessage("manifest.tags", "string[]"));
    return tag.trim();
  });
  return dedupeStrings(tags);
}

function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("manifest", "object"));
  if (raw.schema_version !== "1")
    throw new Error(invalidFieldMessage("manifest.schema_version", '"1"'));
  if (typeof raw.id !== "string") throw new Error(invalidFieldMessage("manifest.id", "string"));
  if (typeof raw.version !== "string")
    throw new Error(invalidFieldMessage("manifest.version", "string"));
  if (typeof raw.name !== "string") throw new Error(invalidFieldMessage("manifest.name", "string"));
  if (typeof raw.summary !== "string")
    throw new Error(invalidFieldMessage("manifest.summary", "string"));
  if (typeof raw.description !== "string")
    throw new Error(invalidFieldMessage("manifest.description", "string"));

  const id = normalizeRecipeId(raw.id);
  const version = raw.version.trim();
  if (!version) throw new Error(requiredFieldMessage("manifest.version"));
  const tags = normalizeRecipeTags(raw.tags);

  return {
    schema_version: "1",
    id,
    version,
    name: raw.name.trim(),
    summary: raw.summary.trim(),
    description: raw.description.trim(),
    tags: tags.length > 0 ? tags : undefined,
    agents: Array.isArray(raw.agents) ? (raw.agents as RecipeManifest["agents"]) : undefined,
    tools: Array.isArray(raw.tools) ? (raw.tools as RecipeManifest["tools"]) : undefined,
    scenarios: Array.isArray(raw.scenarios)
      ? (raw.scenarios as RecipeManifest["scenarios"])
      : undefined,
  };
}

function validateInstalledRecipesFile(raw: unknown): InstalledRecipesFile {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes.json", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes.json.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes.json.recipes", "array"));
  const updatedAt = typeof raw.updated_at === "string" ? raw.updated_at : "";
  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const manifest = validateRecipeManifest(entry.manifest);
      const id = typeof entry.id === "string" ? entry.id.trim() : manifest.id;
      const version = typeof entry.version === "string" ? entry.version.trim() : manifest.version;
      const source = typeof entry.source === "string" ? entry.source.trim() : "";
      const installedAt = typeof entry.installed_at === "string" ? entry.installed_at.trim() : "";
      if (!id || !version || !source || !installedAt) {
        throw new Error(
          invalidFieldMessage("recipes.json.recipes[]", "id, version, source, installed_at"),
        );
      }
      if (id !== manifest.id || version !== manifest.version) {
        throw new Error(invalidFieldMessage("recipes.json.recipes[]", "id/version match manifest"));
      }
      const tags = normalizeRecipeTags(entry.tags ?? manifest.tags ?? []);
      return { id, version, source, installed_at: installedAt, tags, manifest };
    });
  return { schema_version: 1, updated_at: updatedAt, recipes };
}

function sortInstalledRecipes(file: InstalledRecipesFile): InstalledRecipesFile {
  const recipes = [...file.recipes].toSorted((a, b) => a.id.localeCompare(b.id));
  return { schema_version: 1, updated_at: file.updated_at, recipes };
}

function validateRecipesIndex(raw: unknown): RecipesIndex {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("recipes index", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("recipes index.schema_version", "1"));
  if (!Array.isArray(raw.recipes))
    throw new Error(invalidFieldMessage("recipes index.recipes", "array"));

  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const id = typeof entry.id === "string" ? entry.id : "";
      const summary = typeof entry.summary === "string" ? entry.summary : "";
      const description = typeof entry.description === "string" ? entry.description : undefined;
      const versionsRaw = Array.isArray(entry.versions) ? entry.versions : [];
      if (!id || !summary || versionsRaw.length === 0) {
        throw new Error(invalidFieldMessage("recipes index.recipes[]", "id, summary, versions"));
      }
      const versions = versionsRaw
        .filter((version) => isRecord(version))
        .map((version) => {
          const versionId = typeof version.version === "string" ? version.version : "";
          const url = typeof version.url === "string" ? version.url : "";
          const sha256 = typeof version.sha256 === "string" ? version.sha256 : "";
          if (!versionId || !url || !sha256) {
            throw new Error(
              invalidFieldMessage("recipes index.recipes[].versions[]", "version, url, sha256"),
            );
          }
          return {
            version: versionId,
            url,
            sha256,
            min_agentplane_version:
              typeof version.min_agentplane_version === "string"
                ? version.min_agentplane_version
                : undefined,
            tags: Array.isArray(version.tags)
              ? version.tags.filter((tag) => typeof tag === "string")
              : undefined,
          };
        });
      return { id, summary, description, versions };
    });
  return { schema_version: 1, recipes };
}

function validateScenarioDefinition(raw: unknown, sourcePath: string): ScenarioDefinition {
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("scenario", "object", sourcePath));
  if (raw.schema_version !== undefined && raw.schema_version !== "1") {
    throw new Error(invalidFieldMessage("scenario.schema_version", '"1"', sourcePath));
  }
  const rawId = typeof raw.id === "string" ? raw.id : "";
  const id = normalizeScenarioId(rawId);
  const goal = typeof raw.goal === "string" ? raw.goal.trim() : "";
  if (!goal) throw new Error(requiredFieldMessage("scenario.goal", sourcePath));
  if (!("inputs" in raw)) throw new Error(requiredFieldMessage("scenario.inputs", sourcePath));
  if (!("outputs" in raw)) throw new Error(requiredFieldMessage("scenario.outputs", sourcePath));
  if (!Array.isArray(raw.steps)) {
    throw new Error(invalidFieldMessage("scenario.steps", "array", sourcePath));
  }
  return {
    schema_version: "1",
    id,
    summary: typeof raw.summary === "string" ? raw.summary.trim() : undefined,
    description: typeof raw.description === "string" ? raw.description.trim() : undefined,
    goal,
    inputs: raw.inputs,
    outputs: raw.outputs,
    steps: raw.steps,
  };
}

async function readScenarioDefinition(filePath: string): Promise<ScenarioDefinition> {
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  return validateScenarioDefinition(raw, filePath);
}

async function readScenarioIndex(filePath: string): Promise<{
  schema_version: 1;
  scenarios: { id: string; summary?: string }[];
}> {
  const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
  if (!isRecord(raw)) throw new Error(invalidFieldMessage("scenarios index", "object"));
  if (raw.schema_version !== 1)
    throw new Error(invalidFieldMessage("scenarios index.schema_version", "1"));
  if (!Array.isArray(raw.scenarios))
    throw new Error(invalidFieldMessage("scenarios index.scenarios", "array"));
  const scenarios = raw.scenarios
    .filter((entry) => isRecord(entry))
    .map((entry) => ({
      id: typeof entry.id === "string" ? entry.id : "",
      summary: typeof entry.summary === "string" ? entry.summary : undefined,
    }))
    .filter((entry) => entry.id);
  return { schema_version: 1, scenarios };
}

function formatJsonBlock(value: unknown, indent: string): string {
  const payload = JSON.stringify(value, null, 2);
  if (!payload) return "";
  return payload
    .split("\n")
    .map((line) => `${indent}${line}`)
    .join("\n");
}

async function collectRecipeScenarioDetails(
  recipeDir: string,
  manifest: RecipeManifest,
): Promise<RecipeScenarioDetail[]> {
  const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  if ((await getPathKind(scenariosDir)) === "dir") {
    const files = await readdir(scenariosDir);
    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
    const details: RecipeScenarioDetail[] = [];
    for (const file of jsonFiles) {
      const scenario = await readScenarioDefinition(path.join(scenariosDir, file));
      details.push({
        id: scenario.id,
        summary: scenario.summary,
        description: scenario.description,
        goal: scenario.goal,
        inputs: scenario.inputs,
        outputs: scenario.outputs,
        steps: scenario.steps,
        source: "definition",
      });
    }
    return details.toSorted((a, b) => a.id.localeCompare(b.id));
  }

  const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
  if (await fileExists(scenariosIndexPath)) {
    const index = await readScenarioIndex(scenariosIndexPath);
    return index.scenarios
      .map<RecipeScenarioDetail>((scenario) => ({
        id: scenario.id,
        summary: scenario.summary,
        source: "index",
      }))
      .toSorted((a, b) => a.id.localeCompare(b.id));
  }

  const manifestScenarios = manifest.scenarios ?? [];
  if (manifestScenarios.length > 0) {
    return manifestScenarios
      .map<RecipeScenarioDetail>((scenario) => ({
        id: scenario?.id ?? "",
        summary: scenario?.summary,
        source: "manifest",
      }))
      .filter((scenario) => scenario.id)
      .toSorted((a, b) => a.id.localeCompare(b.id));
  }

  return [];
}

function normalizeScenarioToolStep(
  raw: unknown,
  sourcePath: string,
): { tool: string; args: string[]; env: Record<string, string> } {
  if (!isRecord(raw)) {
    throw new Error(invalidFieldMessage("scenario step", "object", sourcePath));
  }
  const tool = typeof raw.tool === "string" ? raw.tool.trim() : "";
  if (!tool) {
    throw new Error(requiredFieldMessage("scenario step.tool", sourcePath));
  }
  const args = Array.isArray(raw.args) ? raw.args.filter((arg) => typeof arg === "string") : [];
  if (Array.isArray(raw.args) && args.length !== raw.args.length) {
    throw new Error(invalidFieldMessage("scenario step.args", "string[]", sourcePath));
  }
  const env: Record<string, string> = {};
  if (raw.env !== undefined) {
    if (!isRecord(raw.env)) {
      throw new Error(invalidFieldMessage("scenario step.env", "object", sourcePath));
    }
    for (const [key, value] of Object.entries(raw.env)) {
      if (typeof value !== "string") {
        throw new Error(invalidFieldMessage("scenario step.env", "string map", sourcePath));
      }
      env[key] = value;
    }
  }
  return { tool, args, env };
}

async function readInstalledRecipesFile(filePath: string): Promise<InstalledRecipesFile> {
  try {
    const raw = JSON.parse(await readFile(filePath, "utf8")) as unknown;
    return sortInstalledRecipes(validateInstalledRecipesFile(raw));
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { schema_version: 1, updated_at: "", recipes: [] };
    throw err;
  }
}

async function writeInstalledRecipesFile(
  filePath: string,
  file: InstalledRecipesFile,
): Promise<void> {
  const sorted = sortInstalledRecipes({
    ...file,
    updated_at: new Date().toISOString(),
  });
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

async function readRecipeManifest(manifestPath: string): Promise<RecipeManifest> {
  const raw = JSON.parse(await readFile(manifestPath, "utf8")) as unknown;
  return validateRecipeManifest(raw);
}

async function resolveRecipeRoot(extractedDir: string): Promise<string> {
  const rootManifest = path.join(extractedDir, "manifest.json");
  if (await fileExists(rootManifest)) return extractedDir;
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (dirs.length !== 1) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  const candidate = path.join(extractedDir, dirs[0]);
  if (!(await fileExists(path.join(candidate, "manifest.json")))) {
    throw new Error(missingFileMessage("manifest.json", "archive root"));
  }
  return candidate;
}

function detectArchiveType(filePath: string): "tar" | "zip" | null {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) return "tar";
  if (lower.endsWith(".zip")) return "zip";
  return null;
}

function resolveAgentplaneHome(): string {
  const overridden = process.env[AGENTPLANE_HOME_ENV]?.trim();
  if (overridden) return overridden;
  return path.join(os.homedir(), ".agentplane");
}

function resolveGlobalRecipesDir(): string {
  return path.join(resolveAgentplaneHome(), GLOBAL_RECIPES_DIR_NAME);
}

function resolveInstalledRecipesPath(): string {
  return path.join(resolveAgentplaneHome(), INSTALLED_RECIPES_NAME);
}

function resolveRecipesIndexCachePath(): string {
  return path.join(resolveAgentplaneHome(), RECIPES_REMOTE_INDEX_NAME);
}

function resolveInstalledRecipeDir(entry: { id: string; version: string }): string {
  return path.join(resolveGlobalRecipesDir(), entry.id, entry.version);
}

function resolveProjectRecipesCacheDir(resolved: { agentplaneDir: string }): string {
  return path.join(resolved.agentplaneDir, PROJECT_RECIPES_CACHE_DIR_NAME);
}

async function extractArchive(archivePath: string, destDir: string): Promise<void> {
  const archiveType = detectArchiveType(archivePath);
  if (!archiveType) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
    });
  }
  if (archiveType === "tar") {
    await execFileAsync("tar", ["-xzf", archivePath, "-C", destDir]);
    return;
  }
  await execFileAsync("unzip", ["-q", archivePath, "-d", destDir]);
}

async function sha256File(filePath: string): Promise<string> {
  const data = await readFile(filePath);
  return createHash("sha256").update(data).digest("hex");
}

function parseSha256Text(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0];
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { "User-Agent": "agentplane" } });
  if (!res.ok) {
    throw new CliError({
      exitCode: 6,
      code: "E_NETWORK",
      message: `Failed to fetch ${url} (${res.status} ${res.statusText})`,
    });
  }
  return await res.json();
}

async function downloadToFile(url: string, destPath: string): Promise<void> {
  const res = await fetch(url, { headers: { "User-Agent": "agentplane" } });
  if (!res.ok) {
    throw new CliError({
      exitCode: 6,
      code: "E_NETWORK",
      message: `Failed to download ${url} (${res.status} ${res.statusText})`,
    });
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buffer);
}

type RecipeInstallSource =
  | { type: "name"; value: string }
  | { type: "path"; value: string }
  | { type: "url"; value: string }
  | { type: "auto"; value: string };

function parseRecipeInstallArgs(args: string[]): {
  source: RecipeInstallSource;
  index?: string;
  refresh: boolean;
  onConflict: RecipeConflictMode;
} {
  let onConflict: RecipeConflictMode = "fail";
  let name: string | null = null;
  let localPath: string | null = null;
  let url: string | null = null;
  let index: string | undefined;
  let refresh = false;
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--name") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      name = next;
      i++;
      continue;
    }
    if (arg === "--path") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      localPath = next;
      i++;
      continue;
    }
    if (arg === "--url") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      url = next;
      i++;
      continue;
    }
    if (arg === "--index") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      index = next;
      i++;
      continue;
    }
    if (arg === "--refresh") {
      refresh = true;
      continue;
    }
    if (arg === "--on-conflict") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      if (!RECIPE_CONFLICT_MODES.includes(next as RecipeConflictMode)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
        });
      }
      onConflict = next as RecipeConflictMode;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
      });
    }
    positional.push(arg);
  }

  const explicitFlags = [name, localPath, url].filter(Boolean).length;
  if (explicitFlags > 1) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
    });
  }
  if (positional.length > 1) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
    });
  }
  if (positional.length > 0 && explicitFlags > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
    });
  }

  if (name) return { source: { type: "name", value: name }, index, refresh, onConflict };
  if (localPath) return { source: { type: "path", value: localPath }, index, refresh, onConflict };
  if (url) return { source: { type: "url", value: url }, index, refresh, onConflict };
  if (positional.length === 1) {
    return { source: { type: "auto", value: positional[0] }, index, refresh, onConflict };
  }

  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: usageMessage(RECIPE_INSTALL_USAGE, RECIPE_INSTALL_USAGE_EXAMPLE),
  });
}

type RecipeCachePruneFlags = {
  dryRun: boolean;
  all: boolean;
};

type RecipeListFlags = {
  full: boolean;
  tag?: string;
};

function parseRecipeListArgs(args: string[]): RecipeListFlags {
  const flags: RecipeListFlags = { full: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--full") {
      flags.full = true;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
        });
      flags.tag = next.trim();
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
      });
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
    });
  }
  if (flags.tag !== undefined && !flags.tag) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
    });
  }
  return flags;
}

function parseRecipeCachePruneArgs(args: string[]): RecipeCachePruneFlags {
  const flags: RecipeCachePruneFlags = { dryRun: false, all: false };
  for (const arg of args) {
    if (!arg) continue;
    if (arg === "--dry-run") {
      flags.dryRun = true;
      continue;
    }
    if (arg === "--all") {
      flags.all = true;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(RECIPE_CACHE_PRUNE_USAGE, RECIPE_CACHE_PRUNE_USAGE_EXAMPLE),
    });
  }
  return flags;
}

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

async function applyRecipeAgents(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
  agentplaneDir: string;
  onConflict: RecipeConflictMode;
}): Promise<void> {
  const agents = opts.manifest.agents ?? [];
  if (agents.length === 0) return;

  const agentsDir = path.join(opts.agentplaneDir, "agents");
  await mkdir(agentsDir, { recursive: true });

  for (const agent of agents) {
    const rawId = typeof agent?.id === "string" ? agent.id : "";
    const rawFile = typeof agent?.file === "string" ? agent.file : "";
    if (!rawId.trim() || !rawFile.trim()) {
      throw new Error("manifest.agents entries must include id and file");
    }
    const agentId = normalizeAgentId(rawId);
    const sourcePath = path.join(opts.recipeDir, rawFile);
    if (!(await fileExists(sourcePath))) {
      throw new Error(missingFileMessage("recipe agent file", rawFile));
    }

    const rawAgent = JSON.parse(await readFile(sourcePath, "utf8")) as unknown;
    if (!isRecord(rawAgent)) {
      throw new Error(invalidFieldMessage("recipe agent file", "JSON object", rawFile));
    }

    const baseId = `${opts.manifest.id}__${agentId}`;
    let targetId = baseId;
    let targetPath = path.join(agentsDir, `${targetId}.json`);
    if (await getPathKind(targetPath)) {
      if (opts.onConflict === "fail") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Agent already exists: ${targetId}`,
        });
      }
      if (opts.onConflict === "rename") {
        let counter = 1;
        while (await getPathKind(targetPath)) {
          targetId = `${baseId}__${counter}`;
          targetPath = path.join(agentsDir, `${targetId}.json`);
          counter += 1;
        }
      }
    }

    rawAgent.id = targetId;
    await writeFile(targetPath, `${JSON.stringify(rawAgent, null, 2)}\n`, "utf8");
  }
}

async function applyRecipeScenarios(opts: {
  manifest: RecipeManifest;
  recipeDir: string;
}): Promise<void> {
  const scenariosDir = path.join(opts.recipeDir, RECIPES_SCENARIOS_DIR_NAME);
  const scenariosIndexPath = path.join(opts.recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
  const payload = { schema_version: 1, scenarios: [] as { id: string; summary?: string }[] };

  if ((await getPathKind(scenariosDir)) === "dir") {
    const entries = await readdir(scenariosDir);
    const jsonEntries = entries.filter((entry) => entry.toLowerCase().endsWith(".json")).toSorted();
    for (const entry of jsonEntries) {
      const scenarioPath = path.join(scenariosDir, entry);
      const scenario = await readScenarioDefinition(scenarioPath);
      payload.scenarios.push({ id: scenario.id, summary: scenario.summary });
    }
  } else {
    const scenarios = opts.manifest.scenarios ?? [];
    payload.scenarios = scenarios
      .filter((scenario) => isRecord(scenario))
      .map((scenario) => ({
        id: typeof scenario.id === "string" ? scenario.id : "",
        summary: typeof scenario.summary === "string" ? scenario.summary : "",
      }))
      .filter((scenario) => scenario.id);
  }

  if (payload.scenarios.length === 0) return;
  await writeFile(scenariosIndexPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

async function readRecipesIndexSource(source: string, cwd: string): Promise<unknown> {
  if (isHttpUrl(source)) {
    return await fetchJson(source);
  }
  const rawText = await readFile(path.resolve(cwd, source), "utf8");
  return JSON.parse(rawText) as unknown;
}

async function loadRecipesRemoteIndex(opts: {
  cwd: string;
  source?: string;
  refresh: boolean;
}): Promise<RecipesIndex> {
  const cachePath = resolveRecipesIndexCachePath();
  const cacheDir = path.dirname(cachePath);
  let rawIndex: unknown;

  if (opts.refresh || !(await fileExists(cachePath))) {
    const source = opts.source ?? DEFAULT_RECIPES_INDEX_URL;
    rawIndex = await readRecipesIndexSource(source, opts.cwd);
    await mkdir(cacheDir, { recursive: true });
    await writeFile(cachePath, `${JSON.stringify(rawIndex, null, 2)}\n`, "utf8");
  } else {
    rawIndex = JSON.parse(await readFile(cachePath, "utf8")) as unknown;
  }

  return validateRecipesIndex(rawIndex);
}

function parseGitHubRepo(source: string): { owner: string; repo: string } {
  const trimmed = source.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("config.framework.source"));
  if (!trimmed.includes("github.com")) {
    throw new Error(invalidFieldMessage("config.framework.source", "GitHub URL"));
  }
  try {
    const url = new URL(trimmed);
    const parts = url.pathname.replaceAll(".git", "").split("/").filter(Boolean);
    if (parts.length < 2)
      throw new Error(invalidValueMessage("GitHub repo URL", trimmed, "owner/repo"));
    return { owner: parts[0], repo: parts[1] };
  } catch {
    throw new Error(invalidValueMessage("GitHub repo URL", trimmed, "owner/repo"));
  }
}

async function resolveUpgradeRoot(extractedDir: string): Promise<string> {
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  if (files.length === 0 && dirs.length === 1) {
    return path.join(extractedDir, dirs[0]);
  }
  return extractedDir;
}

async function listFilesRecursive(rootDir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listFilesRecursive(fullPath)));
    } else if (entry.isFile()) {
      out.push(fullPath);
    }
  }
  return out;
}

function isAllowedUpgradePath(relPath: string): boolean {
  if (relPath === "AGENTS.md") return true;
  return relPath.startsWith(".agentplane/");
}

// moved to cli/recipes-bundled.ts, cli/prompts.ts, and cli/fs-utils.ts

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
    hooks: boolean;
    recipes: string[];
    requirePlanApproval: boolean;
    requireNetworkApproval: boolean;
  } = {
    ide: "codex",
    workflow: "direct",
    hooks: false,
    recipes: [],
    requirePlanApproval: true,
    requireNetworkApproval: true,
  };
  let ide: InitIde = flags.ide ?? defaults.ide;
  let workflow: WorkflowMode = flags.workflow ?? defaults.workflow;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;

  if (
    !process.stdin.isTTY &&
    !flags.yes &&
    (!flags.workflow ||
      flags.hooks === undefined ||
      flags.requirePlanApproval === undefined ||
      flags.requireNetworkApproval === undefined)
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(INIT_USAGE, INIT_USAGE_EXAMPLE),
    });
  }

  if (process.stdin.isTTY && !flags.yes) {
    ide = flags.ide ?? defaults.ide;
    if (!flags.workflow) {
      const choice = await promptChoice("Select workflow mode", ["direct", "branch_pr"], workflow);
      workflow = choice === "branch_pr" ? "branch_pr" : "direct";
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
    hooks = flags.hooks ?? defaults.hooks;
    recipes = flags.recipes ?? defaults.recipes;
    requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
    requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;
  }

  validateBundledRecipesSelection(recipes);

  try {
    const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
    let gitRoot = await findGitRoot(initRoot);
    const baseBranchFallback = defaultConfig().base_branch;
    if (!gitRoot) {
      await gitInitRepo(initRoot, baseBranchFallback);
      gitRoot = initRoot;
    }

    const resolved = await resolveProject({
      cwd: gitRoot,
      rootOverride: gitRoot,
    });
    const initBaseBranch = await resolveInitBaseBranch(resolved.gitRoot, baseBranchFallback);
    const configPath = path.join(resolved.agentplaneDir, "config.json");
    const backendPath = path.join(resolved.agentplaneDir, "backends", "local", "backend.json");
    const initDirs = [
      resolved.agentplaneDir,
      path.join(resolved.agentplaneDir, "tasks"),
      path.join(resolved.agentplaneDir, "agents"),
      path.join(resolved.agentplaneDir, "cache"),
      path.join(resolved.agentplaneDir, "backends"),
      path.join(resolved.agentplaneDir, "backends", "local"),
    ];
    const initFiles = [configPath, backendPath];
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

    const rawConfig = defaultConfig() as unknown as Record<string, unknown>;
    setByDottedKey(rawConfig, "base_branch", initBaseBranch);
    setByDottedKey(rawConfig, "workflow_mode", workflow);
    setByDottedKey(rawConfig, "agents.approvals.require_plan", String(requirePlanApproval));
    setByDottedKey(rawConfig, "agents.approvals.require_network", String(requireNetworkApproval));
    await saveConfig(resolved.agentplaneDir, rawConfig);

    const backendPayload = {
      id: "local",
      version: 1,
      module: "backend.py",
      class: "LocalBackend",
      settings: { dir: ".agentplane/tasks" },
    };
    await writeFile(backendPath, `${JSON.stringify(backendPayload, null, 2)}\n`, "utf8");

    const agentsPath = path.join(resolved.gitRoot, "AGENTS.md");
    const installPaths: string[] = [
      path.relative(resolved.gitRoot, configPath),
      path.relative(resolved.gitRoot, backendPath),
    ];
    let wroteAgents = false;
    if (!(await fileExists(agentsPath))) {
      const template = await loadAgentsTemplate();
      const filtered = filterAgentsByWorkflow(template, workflow);
      await writeFile(agentsPath, filtered, "utf8");
      wroteAgents = true;
    }
    if (wroteAgents) {
      installPaths.push(path.relative(resolved.gitRoot, agentsPath));
    }

    const agentTemplates = await loadAgentTemplates();
    for (const agent of agentTemplates) {
      const targetPath = path.join(resolved.agentplaneDir, "agents", agent.fileName);
      if (await fileExists(targetPath)) continue;
      await writeFile(targetPath, agent.contents, "utf8");
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
    });

    process.stdout.write(`${path.relative(resolved.gitRoot, resolved.agentplaneDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "init", root: opts.rootOverride ?? null });
  }
}

async function cmdUpgrade(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseUpgradeFlags(opts.args);

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const source = flags.source ?? loaded.config.framework.source;

  let tempRoot: string | null = null;
  let extractRoot: string | null = null;

  try {
    tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-"));
    let bundlePath = "";
    let checksumPath = "";

    if (flags.bundle) {
      const isUrl = flags.bundle.startsWith("http://") || flags.bundle.startsWith("https://");
      bundlePath = isUrl ? path.join(tempRoot, "bundle.tar.gz") : path.resolve(flags.bundle);
      if (isUrl) {
        await downloadToFile(flags.bundle, bundlePath);
      }
      const checksumValue = flags.checksum ?? "";
      const checksumIsUrl =
        checksumValue.startsWith("http://") || checksumValue.startsWith("https://");
      checksumPath = checksumIsUrl
        ? path.join(tempRoot, "bundle.tar.gz.sha256")
        : path.resolve(checksumValue);
      if (checksumIsUrl) {
        await downloadToFile(checksumValue, checksumPath);
      }
    } else {
      const { owner, repo } = parseGitHubRepo(source);
      const releaseUrl = flags.tag
        ? `https://api.github.com/repos/${owner}/${repo}/releases/tags/${flags.tag}`
        : `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
      const release = (await fetchJson(releaseUrl)) as {
        assets?: { name?: string; browser_download_url?: string }[];
      };
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const assetName = flags.asset ?? DEFAULT_UPGRADE_ASSET;
      const checksumName = flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET;
      const asset = assets.find((entry) => entry.name === assetName);
      const checksumAsset = assets.find((entry) => entry.name === checksumName);
      if (!asset?.browser_download_url || !checksumAsset?.browser_download_url) {
        throw new CliError({
          exitCode: 6,
          code: "E_NETWORK",
          message: `Upgrade assets not found in ${owner}/${repo} release`,
        });
      }
      bundlePath = path.join(tempRoot, assetName);
      checksumPath = path.join(tempRoot, checksumName);
      await downloadToFile(asset.browser_download_url, bundlePath);
      await downloadToFile(checksumAsset.browser_download_url, checksumPath);
    }

    const expected = parseSha256Text(await readFile(checksumPath, "utf8"));
    if (!expected) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Upgrade checksum file is empty or invalid",
      });
    }
    const actual = await sha256File(bundlePath);
    if (actual !== expected) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Upgrade checksum mismatch (expected ${expected}, got ${actual})`,
      });
    }

    extractRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-extract-"));
    await extractArchive(bundlePath, extractRoot);
    const bundleRoot = await resolveUpgradeRoot(extractRoot);

    const files = await listFilesRecursive(bundleRoot);
    const additions: string[] = [];
    const updates: string[] = [];
    const skipped: string[] = [];
    const fileContents = new Map<string, Buffer>();

    for (const filePath of files) {
      let rel = path.relative(bundleRoot, filePath).replaceAll("\\", "/");
      if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid bundle path: ${filePath}`,
        });
      }
      if (rel === ".git" || rel.startsWith(".git/")) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Upgrade bundle cannot write to .git (${rel})`,
        });
      }
      if (!isAllowedUpgradePath(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Upgrade bundle path not allowed: ${rel}`,
        });
      }

      const destPath = path.join(resolved.gitRoot, rel);
      const kind = await getPathKind(destPath);
      if (kind === "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Upgrade target is a directory: ${rel}`,
        });
      }

      const data = await readFile(filePath);
      fileContents.set(rel, data);
      if (kind === null) {
        additions.push(rel);
      } else {
        const existing = await readFile(destPath);
        if (Buffer.compare(existing, data) === 0) {
          skipped.push(rel);
        } else {
          updates.push(rel);
        }
      }
    }

    if (flags.dryRun) {
      process.stdout.write(
        `Upgrade dry-run: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
      );
      for (const rel of additions) process.stdout.write(`ADD ${rel}\n`);
      for (const rel of updates) process.stdout.write(`UPDATE ${rel}\n`);
      for (const rel of skipped) process.stdout.write(`SKIP ${rel}\n`);
      return 0;
    }

    for (const rel of [...additions, ...updates]) {
      const destPath = path.join(resolved.gitRoot, rel);
      if (flags.backup && (await fileExists(destPath))) {
        await backupPath(destPath);
      }
      await mkdir(path.dirname(destPath), { recursive: true });
      const data = fileContents.get(rel);
      if (data) await writeFile(destPath, data);
    }

    const raw = { ...loaded.raw };
    setByDottedKey(raw, "framework.last_update", new Date().toISOString());
    await saveConfig(resolved.agentplaneDir, raw);

    process.stdout.write(
      `Upgrade applied: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
    );
    return 0;
  } finally {
    if (extractRoot) await rm(extractRoot, { recursive: true, force: true });
    if (tempRoot) await rm(tempRoot, { recursive: true, force: true });
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

async function cmdRecipeList(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  try {
    const flags = parseRecipeListArgs(opts.args);
    const filePath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(filePath);

    let recipes = installed.recipes;
    if (flags.tag) {
      const needle = flags.tag.toLowerCase();
      recipes = recipes.filter((entry) => entry.tags.some((tag) => tag.toLowerCase() === needle));
    }

    if (recipes.length === 0) {
      if (flags.tag) {
        process.stdout.write(`${emptyStateMessage(`installed recipes for tag ${flags.tag}`)}\n`);
        return 0;
      }
      process.stdout.write(
        `${emptyStateMessage(
          "installed recipes",
          "Use `agentplane recipes list-remote` or `agentplane recipes install <id>`.",
        )}\n`,
      );
      return 0;
    }

    if (flags.full) {
      const payload: InstalledRecipesFile = {
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes,
      };
      process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
      return 0;
    }

    for (const entry of recipes) {
      process.stdout.write(
        `${entry.id}@${entry.version} - ${entry.manifest.summary || "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeListRemote(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseRecipeListRemoteFlags(opts.args);
  try {
    const index = await loadRecipesRemoteIndex({
      cwd: opts.cwd,
      source: flags.index,
      refresh: flags.refresh,
    });
    for (const recipe of index.recipes) {
      const latest = [...recipe.versions]
        .toSorted((a, b) => a.version.localeCompare(b.version))
        .at(-1);
      if (!latest) continue;
      process.stdout.write(`${recipe.id}@${latest.version} - ${recipe.summary}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list-remote", root: opts.rootOverride ?? null });
  }
}

async function cmdScenarioList(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entries: { recipeId: string; scenarioId: string; summary?: string }[] = [];

    for (const recipe of installed.recipes) {
      const recipeDir = resolveInstalledRecipeDir(recipe);
      const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
      if ((await getPathKind(scenariosDir)) === "dir") {
        const files = await readdir(scenariosDir);
        const jsonFiles = files.filter((entry) => entry.toLowerCase().endsWith(".json")).toSorted();
        for (const file of jsonFiles) {
          const scenario = await readScenarioDefinition(path.join(scenariosDir, file));
          entries.push({ recipeId: recipe.id, scenarioId: scenario.id, summary: scenario.summary });
        }
        continue;
      }
      const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
      if (await fileExists(scenariosIndexPath)) {
        const index = await readScenarioIndex(scenariosIndexPath);
        for (const scenario of index.scenarios) {
          entries.push({
            recipeId: recipe.id,
            scenarioId: scenario.id,
            summary: scenario.summary,
          });
        }
      }
    }

    if (entries.length === 0) {
      process.stdout.write(
        `${emptyStateMessage("scenarios", "Install a recipe to add scenarios.")}\n`,
      );
      return 0;
    }

    const sorted = entries.toSorted((a, b) => {
      const byRecipe = a.recipeId.localeCompare(b.recipeId);
      if (byRecipe !== 0) return byRecipe;
      return a.scenarioId.localeCompare(b.scenarioId);
    });
    for (const entry of sorted) {
      process.stdout.write(
        `${entry.recipeId}:${entry.scenarioId} - ${entry.summary ?? "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario list", root: opts.rootOverride ?? null });
  }
}

async function cmdScenarioInfo(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const [recipeId, scenarioId] = opts.id.split(":");
    if (!recipeId || !scenarioId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_INFO_USAGE, SCENARIO_INFO_USAGE_EXAMPLE),
      });
    }
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
    let scenario: ScenarioDefinition | null = null;
    if ((await getPathKind(scenariosDir)) === "dir") {
      const files = await readdir(scenariosDir);
      const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
      for (const file of jsonFiles) {
        const candidate = await readScenarioDefinition(path.join(scenariosDir, file));
        if (candidate.id === scenarioId) {
          scenario = candidate;
          break;
        }
      }
    }

    let summary: string | undefined;
    if (!scenario) {
      const scenariosIndexPath = path.join(recipeDir, RECIPES_SCENARIOS_INDEX_NAME);
      if (await fileExists(scenariosIndexPath)) {
        const index = await readScenarioIndex(scenariosIndexPath);
        const entrySummary = index.scenarios.find((item) => item.id === scenarioId);
        summary = entrySummary?.summary;
      }
    }

    if (!scenario && !summary) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario not found: ${recipeId}:${scenarioId}`,
      });
    }

    process.stdout.write(`Scenario: ${recipeId}:${scenarioId}\n`);
    if (summary) process.stdout.write(`Summary: ${summary}\n`);
    if (!scenario) {
      process.stdout.write("Details: Scenario definition not found in recipe.\n");
      return 0;
    }

    if (scenario.summary) process.stdout.write(`Summary: ${scenario.summary}\n`);
    if (scenario.description) process.stdout.write(`Description: ${scenario.description}\n`);
    process.stdout.write(`Goal: ${scenario.goal}\n`);
    process.stdout.write(`Inputs: ${JSON.stringify(scenario.inputs, null, 2)}\n`);
    process.stdout.write(`Outputs: ${JSON.stringify(scenario.outputs, null, 2)}\n`);
    process.stdout.write("Steps:\n");
    let stepIndex = 1;
    for (const step of scenario.steps) {
      process.stdout.write(`  ${stepIndex}. ${JSON.stringify(step)}\n`);
      stepIndex += 1;
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario info", root: opts.rootOverride ?? null });
  }
}

async function executeRecipeTool(opts: {
  runtime: "node" | "bash";
  entrypoint: string;
  args: string[];
  cwd: string;
  env: Record<string, string>;
}): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  try {
    const command = opts.runtime === "node" ? "node" : "bash";
    const { stdout, stderr } = await execFileAsync(command, [opts.entrypoint, ...opts.args], {
      cwd: opts.cwd,
      env: opts.env,
    });
    return { exitCode: 0, stdout: String(stdout), stderr: String(stderr) };
  } catch (err) {
    let execErr: { code?: number; stdout?: string; stderr?: string } | null = null;
    if (err && typeof err === "object") {
      execErr = err as { code?: number; stdout?: string; stderr?: string };
    }
    const exitCode = typeof execErr?.code === "number" ? execErr.code : 1;
    return {
      exitCode,
      stdout: String(execErr?.stdout ?? ""),
      stderr: String(execErr?.stderr ?? ""),
    };
  }
}

function sanitizeRunId(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
}

async function cmdScenarioRun(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const [recipeId, scenarioId] = opts.id.split(":");
    if (!recipeId || !scenarioId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_RUN_USAGE, SCENARIO_RUN_USAGE_EXAMPLE),
      });
    }
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    const manifestPath = path.join(recipeDir, "manifest.json");
    const manifest = await readRecipeManifest(manifestPath);
    const scenariosDir = path.join(recipeDir, RECIPES_SCENARIOS_DIR_NAME);
    if ((await getPathKind(scenariosDir)) !== "dir") {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario definitions not found for recipe: ${recipeId}`,
      });
    }
    let scenario: ScenarioDefinition | null = null;
    const files = await readdir(scenariosDir);
    const jsonFiles = files.filter((file) => file.toLowerCase().endsWith(".json")).toSorted();
    for (const file of jsonFiles) {
      const candidate = await readScenarioDefinition(path.join(scenariosDir, file));
      if (candidate.id === scenarioId) {
        scenario = candidate;
        break;
      }
    }
    if (!scenario) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Scenario not found: ${recipeId}:${scenarioId}`,
      });
    }

    const runsRoot = path.join(resolved.agentplaneDir, RECIPES_DIR_NAME, recipeId, "runs");
    await mkdir(runsRoot, { recursive: true });
    const recipesCacheDir = resolveProjectRecipesCacheDir(resolved);
    await mkdir(recipesCacheDir, { recursive: true });
    const runId = `${new Date()
      .toISOString()
      .replaceAll(":", "-")
      .replaceAll(".", "-")}-${sanitizeRunId(scenarioId)}`;
    const runDir = path.join(runsRoot, runId);
    await mkdir(runDir, { recursive: true });

    const stepsMeta: {
      tool: string;
      runtime: string;
      entrypoint: string;
      exitCode: number;
      duration_ms: number;
    }[] = [];

    for (let index = 0; index < scenario.steps.length; index++) {
      const step = normalizeScenarioToolStep(scenario.steps[index], `${recipeId}:${scenarioId}`);
      const toolEntry = manifest.tools?.find((tool) => tool?.id === step.tool);
      if (!toolEntry) {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Tool not found in recipe manifest: ${step.tool}`,
        });
      }
      const runtime =
        toolEntry.runtime === "node" || toolEntry.runtime === "bash" ? toolEntry.runtime : "";
      const entrypoint = typeof toolEntry.entrypoint === "string" ? toolEntry.entrypoint : "";
      if (!runtime || !entrypoint) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Tool entry is missing runtime/entrypoint: ${step.tool}`,
        });
      }
      if (Array.isArray(toolEntry.permissions) && toolEntry.permissions.length > 0) {
        process.stdout.write(
          `Warning: tool ${toolEntry.id} declares permissions: ${toolEntry.permissions.join(
            ", ",
          )}\n`,
        );
      }

      const entrypointPath = path.join(recipeDir, entrypoint);
      if (!(await fileExists(entrypointPath))) {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Tool entrypoint not found: ${entrypoint}`,
        });
      }

      const stepDir = path.join(runDir, `step-${index + 1}-${sanitizeRunId(step.tool)}`);
      await mkdir(stepDir, { recursive: true });

      const env = {
        ...process.env,
        ...step.env,
        AGENTPLANE_RUN_DIR: runDir,
        AGENTPLANE_STEP_DIR: stepDir,
        AGENTPLANE_RECIPES_CACHE_DIR: recipesCacheDir,
        AGENTPLANE_RECIPE_ID: recipeId,
        AGENTPLANE_SCENARIO_ID: scenarioId,
        AGENTPLANE_TOOL_ID: step.tool,
      } as Record<string, string>;

      const startedAt = Date.now();
      const result = await executeRecipeTool({
        runtime,
        entrypoint: entrypointPath,
        args: step.args,
        cwd: recipeDir,
        env,
      });
      const durationMs = Date.now() - startedAt;
      await writeFile(path.join(stepDir, "stdout.log"), result.stdout, "utf8");
      await writeFile(path.join(stepDir, "stderr.log"), result.stderr, "utf8");
      stepsMeta.push({
        tool: step.tool,
        runtime,
        entrypoint,
        exitCode: result.exitCode,
        duration_ms: durationMs,
      });

      if (result.exitCode !== 0) {
        await writeFile(
          path.join(runDir, "meta.json"),
          `${JSON.stringify(
            {
              recipe: recipeId,
              scenario: scenarioId,
              run_id: runId,
              steps: stepsMeta,
            },
            null,
            2,
          )}\n`,
          "utf8",
        );
        throw new CliError({
          exitCode: result.exitCode,
          code: "E_INTERNAL",
          message: `Scenario step failed: ${step.tool}`,
        });
      }
    }

    await writeFile(
      path.join(runDir, "meta.json"),
      `${JSON.stringify(
        {
          recipe: recipeId,
          scenario: scenarioId,
          run_id: runId,
          steps: stepsMeta,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    process.stdout.write(`Run artifacts: ${path.relative(resolved.gitRoot, runDir)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "scenario run", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeInfo(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const manifest = entry.manifest;

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];
    const scenarios = manifest.scenarios ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarios.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarios) {
        const label = scenario?.id ?? "unknown";
        const summary = scenario?.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes info", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeExplain(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }

    const manifest = entry.manifest;
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenarioDetails = await collectRecipeScenarioDetails(recipeDir, manifest);

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarioDetails.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarioDetails) {
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${scenario.id}${summary}\n`);
        if (scenario.description) {
          process.stdout.write(`    Description: ${scenario.description}\n`);
        }
        if (scenario.goal) {
          process.stdout.write(`    Goal: ${scenario.goal}\n`);
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) process.stdout.write(`    Inputs:\n${payload}\n`);
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) process.stdout.write(`    Outputs:\n${payload}\n`);
        }
        if (scenario.steps && scenario.steps.length > 0) {
          process.stdout.write("    Steps:\n");
          let stepIndex = 1;
          for (const step of scenario.steps) {
            process.stdout.write(`      ${stepIndex}. ${JSON.stringify(step)}\n`);
            stepIndex += 1;
          }
          continue;
        }
        if (scenario.source !== "definition") {
          process.stdout.write("    Details: Scenario definition not found in recipe.\n");
        }
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeInstall(opts: {
  cwd: string;
  rootOverride?: string;
  source: RecipeInstallSource;
  index?: string;
  refresh: boolean;
  onConflict: RecipeConflictMode;
}): Promise<number> {
  try {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
    try {
      let sourcePath = "";
      let sourceLabel = "";
      let expectedSha = "";
      let indexTags: string[] = [];

      const resolveFromIndex = async (recipeId: string): Promise<string> => {
        const index = await loadRecipesRemoteIndex({
          cwd: opts.cwd,
          source: opts.index,
          refresh: opts.refresh,
        });
        const entry = index.recipes.find((recipe) => recipe.id === recipeId);
        if (!entry) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe not found in remote index: ${recipeId}`,
          });
        }
        const latest = [...entry.versions]
          .toSorted((a, b) => a.version.localeCompare(b.version))
          .at(-1);
        if (!latest) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Recipe ${entry.id} has no versions in the remote index`,
          });
        }
        expectedSha = latest.sha256;
        sourceLabel = `${entry.id}@${latest.version}`;
        indexTags = normalizeRecipeTags(latest.tags ?? []);

        if (isHttpUrl(latest.url)) {
          const url = new URL(latest.url);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          await downloadToFile(latest.url, target);
          return target;
        }
        const resolved = path.resolve(opts.cwd, latest.url);
        if (!(await fileExists(resolved))) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe archive not found: ${latest.url}`,
          });
        }
        return resolved;
      };

      const resolveSourcePath = async (source: RecipeInstallSource): Promise<string> => {
        if (source.type === "name") return await resolveFromIndex(source.value);
        if (source.type === "url") {
          const url = new URL(source.value);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          sourceLabel = source.value;
          await downloadToFile(source.value, target);
          return target;
        }
        if (source.type === "path") {
          const candidate = await resolvePathFallback(source.value);
          if (!(await fileExists(candidate))) {
            throw new CliError({
              exitCode: 5,
              code: "E_IO",
              message: `Recipe archive not found: ${source.value}`,
            });
          }
          sourceLabel = candidate;
          return candidate;
        }
        if (isHttpUrl(source.value)) {
          return await resolveSourcePath({ type: "url", value: source.value });
        }
        const candidate = await resolvePathFallback(source.value);
        if (await fileExists(candidate)) {
          return await resolveSourcePath({ type: "path", value: source.value });
        }
        return await resolveSourcePath({ type: "name", value: source.value });
      };

      sourcePath = await resolveSourcePath(opts.source);
      if (!sourceLabel) sourceLabel = opts.source.value;

      const actualSha = expectedSha ? await sha256File(sourcePath) : "";
      if (expectedSha && actualSha !== expectedSha) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Recipe checksum mismatch for ${sourceLabel}`,
        });
      }

      await extractArchive(sourcePath, tempRoot);
      const recipeRoot = await resolveRecipeRoot(tempRoot);
      const manifest = await readRecipeManifest(path.join(recipeRoot, "manifest.json"));
      const resolvedTags =
        manifest.tags && manifest.tags.length > 0 ? manifest.tags : normalizeRecipeTags(indexTags);
      const manifestWithTags =
        resolvedTags.length > 0 ? { ...manifest, tags: resolvedTags } : manifest;

      const installDir = resolveInstalledRecipeDir(manifestWithTags);
      const installKind = await getPathKind(installDir);
      if (installKind && installKind !== "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Recipe install path is not a directory: ${installDir}`,
        });
      }

      const hadExisting = Boolean(installKind);
      if (installKind) {
        await rm(installDir, { recursive: true, force: true });
      }
      await mkdir(path.dirname(installDir), { recursive: true });
      await mkdir(resolveGlobalRecipesDir(), { recursive: true });
      try {
        await rename(recipeRoot, installDir);
      } catch (err) {
        const code = (err as { code?: string } | null)?.code;
        if (code === "EXDEV") {
          await cp(recipeRoot, installDir, { recursive: true });
        } else {
          throw err;
        }
      }

      try {
        const project = await maybeResolveProject({
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
        });
        if (project) {
          await applyRecipeAgents({
            manifest: manifestWithTags,
            recipeDir: installDir,
            agentplaneDir: project.agentplaneDir,
            onConflict: opts.onConflict,
          });
        }
        await applyRecipeScenarios({ manifest: manifestWithTags, recipeDir: installDir });
      } catch (err) {
        if (!hadExisting) {
          await rm(installDir, { recursive: true, force: true });
        }
        throw err;
      }

      const recipesPath = resolveInstalledRecipesPath();
      const installed = await readInstalledRecipesFile(recipesPath);
      const updated = installed.recipes.filter((entry) => entry.id !== manifestWithTags.id);
      updated.push({
        id: manifestWithTags.id,
        version: manifestWithTags.version,
        source: sourceLabel,
        installed_at: new Date().toISOString(),
        tags: resolvedTags,
        manifest: manifestWithTags,
      });
      await writeInstalledRecipesFile(recipesPath, {
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes: updated,
      });

      process.stdout.write(`Installed recipe ${manifestWithTags.id}@${manifestWithTags.version}\n`);
      return 0;
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes install", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeRemove(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const recipesPath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(recipesPath);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    await rm(recipeDir, { recursive: true, force: true });

    const updated = installed.recipes.filter((recipe) => recipe.id !== opts.id);
    await writeInstalledRecipesFile(recipesPath, {
      schema_version: 1,
      updated_at: installed.updated_at,
      recipes: updated,
    });

    process.stdout.write(`${successMessage("removed recipe", `${entry.id}@${entry.version}`)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes remove", root: opts.rootOverride ?? null });
  }
}

async function listRecipeCacheEntries(cacheDir: string): Promise<
  {
    id: string;
    version: string;
    path: string;
  }[]
> {
  const entries: { id: string; version: string; path: string }[] = [];
  const recipeDirs = await readdir(cacheDir, { withFileTypes: true });
  for (const recipeDir of recipeDirs) {
    if (!recipeDir.isDirectory()) continue;
    const recipeId = recipeDir.name;
    const versionRoot = path.join(cacheDir, recipeId);
    const versions = await readdir(versionRoot, { withFileTypes: true });
    for (const versionDir of versions) {
      if (!versionDir.isDirectory()) continue;
      const version = versionDir.name;
      entries.push({
        id: recipeId,
        version,
        path: path.join(versionRoot, version),
      });
    }
  }
  return entries;
}

async function cmdRecipeCachePrune(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseRecipeCachePruneArgs(opts.args);
  try {
    const cacheDir = resolveGlobalRecipesDir();
    if (!(await fileExists(cacheDir))) {
      process.stdout.write(`${infoMessage(`recipe cache directory not found: ${cacheDir}`)}\n`);
      return 0;
    }

    const cacheEntries = await listRecipeCacheEntries(cacheDir);
    if (cacheEntries.length === 0) {
      process.stdout.write(`${infoMessage("recipe cache is empty")}\n`);
      return 0;
    }

    if (flags.all) {
      if (flags.dryRun) {
        for (const entry of cacheEntries) {
          process.stdout.write(
            `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
          );
        }
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${cacheEntries.length} cached recipes`)}\n`,
        );
        return 0;
      }
      await rm(cacheDir, { recursive: true, force: true });
      await writeInstalledRecipesFile(resolveInstalledRecipesPath(), {
        schema_version: 1,
        updated_at: "",
        recipes: [],
      });
      process.stdout.write(
        `${successMessage("removed cached recipes", undefined, `count=${cacheEntries.length}`)}\n`,
      );
      return 0;
    }

    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const keep = new Set(installed.recipes.map((entry) => `${entry.id}@${entry.version}`));
    const prune = cacheEntries.filter((entry) => !keep.has(`${entry.id}@${entry.version}`));

    if (prune.length === 0) {
      process.stdout.write(
        `${infoMessage("recipe cache already clean (no uninstalled entries)")}\n`,
      );
      return 0;
    }

    if (flags.dryRun) {
      for (const entry of prune) {
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
        );
      }
      process.stdout.write(
        `${infoMessage(`dry-run: would remove ${prune.length} cached recipes`)}\n`,
      );
      return 0;
    }

    const recipeDirs = new Set<string>();
    for (const entry of prune) {
      recipeDirs.add(path.dirname(entry.path));
      await rm(entry.path, { recursive: true, force: true });
    }
    for (const recipeDir of recipeDirs) {
      const remaining = await readdir(recipeDir);
      if (remaining.length === 0) {
        await rm(recipeDir, { recursive: true, force: true });
      }
    }

    process.stdout.write(
      `${successMessage("removed cached recipes", undefined, `count=${prune.length}`)}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes cache prune", root: opts.rootOverride ?? null });
  }
}

async function cmdBackendSync(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseBackendSyncArgs(opts.args);
  try {
    const { backend, backendId } = await loadTaskBackend({
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

async function cmdSync(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseSyncArgs(opts.args);
  try {
    const { backend, backendId } = await loadTaskBackend({
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

type TaskNewFlags = {
  title?: string;
  description?: string;
  owner?: string;
  priority?: "low" | "normal" | "med" | "high";
  tags: string[];
  dependsOn: string[];
  verify: string[];
};

const TASK_NEW_USAGE =
  "Usage: agentplane task new --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
const TASK_NEW_USAGE_EXAMPLE =
  'agentplane task new --title "Refactor CLI" --description "Improve CLI output" --priority med --owner CODER --tag cli';
const TASK_ADD_USAGE =
  "Usage: agentplane task add <task-id> [<task-id> ...] --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]";
const TASK_ADD_USAGE_EXAMPLE =
  'agentplane task add 202602030608-F1Q8AB --title "..." --description "..." --priority med --owner CODER --tag cli';
const TASK_SCRUB_USAGE = "Usage: agentplane task scrub --find <text> --replace <text> [flags]";
const TASK_SCRUB_USAGE_EXAMPLE =
  'agentplane task scrub --find "agentctl" --replace "agentplane" --dry-run';

function parseTaskNewFlags(args: string[]): TaskNewFlags {
  const out: TaskNewFlags = { tags: [], dependsOn: [], verify: [] };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unexpected argument: ${arg}`,
      });
    }

    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }

    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--priority": {
        out.priority = next as TaskNewFlags["priority"];
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(next);
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

async function cmdTaskNew(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNewFlags(opts.args);
  const priority = flags.priority ?? "med";

  if (!flags.title || !flags.description || !flags.owner || flags.tags.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_NEW_USAGE, TASK_NEW_USAGE_EXAMPLE),
    });
  }

  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const suffixLength = config.tasks.id_suffix_length_default;
    if (!backend.generateTaskId) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("generateTaskId()"),
      });
    }
    const taskId = await backend.generateTaskId({ length: suffixLength, attempts: 1000 });
    const task: TaskData = {
      id: taskId,
      title: flags.title,
      description: flags.description,
      status: "TODO",
      priority,
      owner: flags.owner,
      tags: flags.tags,
      depends_on: flags.dependsOn,
      verify: flags.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
      id_source: "generated",
    };
    if (
      requiresVerify(flags.tags, config.tasks.verify.required_tags) &&
      flags.verify.length === 0
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Missing verify commands for tasks with code/backend/frontend tags (use --verify)",
      });
    }
    await backend.writeTask(task);
    process.stdout.write(`${taskId}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}

type TaskAddFlags = {
  taskIds: string[];
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor?: string;
  commentBody?: string;
};

function parseTaskAddFlags(args: string[]): TaskAddFlags {
  const out: TaskAddFlags = {
    taskIds: [],
    title: "",
    description: "",
    status: "TODO",
    priority: "",
    owner: "",
    tags: [],
    dependsOn: [],
    verify: [],
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      out.taskIds.push(arg);
      continue;
    }
    const next = args[i + 1];
    if (arg === "--replace-tags" || arg === "--replace-depends-on" || arg === "--replace-verify") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
      });
    }
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--status": {
        out.status = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(next);
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      case "--comment-author": {
        out.commentAuthor = next;
        break;
      }
      case "--comment-body": {
        out.commentBody = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }
    i++;
  }
  return out;
}

async function cmdTaskAdd(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskAddFlags(opts.args);
  if (
    flags.taskIds.length === 0 ||
    !flags.title ||
    !flags.description ||
    !flags.priority ||
    !flags.owner ||
    flags.tags.length === 0
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE),
    });
  }

  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const status = normalizeTaskStatus(flags.status);
    const existing = await backend.listTasks();
    const existingIds = new Set(existing.map((task) => task.id));
    for (const taskId of flags.taskIds) {
      if (existingIds.has(taskId)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task already exists: ${taskId}`,
        });
      }
    }

    const tags = dedupeStrings(flags.tags);
    const dependsOn = dedupeStrings(flags.dependsOn);
    const verify = dedupeStrings(flags.verify);
    if (requiresVerify(tags, config.tasks.verify.required_tags) && verify.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "verify commands are required for tasks with code/backend/frontend tags",
      });
    }

    const tasks: TaskData[] = flags.taskIds.map((taskId) => ({
      id: taskId,
      title: flags.title,
      description: flags.description,
      status,
      priority: flags.priority,
      owner: flags.owner,
      tags,
      depends_on: dependsOn,
      verify,
      comments:
        flags.commentAuthor && flags.commentBody
          ? [{ author: flags.commentAuthor, body: flags.commentBody }]
          : [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
      id_source: "explicit",
    }));
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) {
        await backend.writeTask(task);
      }
    }
    for (const task of tasks) {
      process.stdout.write(`${task.id}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task add", root: opts.rootOverride ?? null });
  }
}

type TaskUpdateFlags = {
  taskId: string;
  title?: string;
  description?: string;
  priority?: string;
  owner?: string;
  tags: string[];
  replaceTags: boolean;
  dependsOn: string[];
  replaceDependsOn: boolean;
  verify: string[];
  replaceVerify: boolean;
};

function parseTaskUpdateFlags(args: string[]): TaskUpdateFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
    });
  }
  const out: TaskUpdateFlags = {
    taskId,
    tags: [],
    replaceTags: false,
    dependsOn: [],
    replaceDependsOn: false,
    verify: [],
    replaceVerify: false,
  };

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--replace-tags") {
      out.replaceTags = true;
      continue;
    }
    if (arg === "--replace-depends-on") {
      out.replaceDependsOn = true;
      continue;
    }
    if (arg === "--replace-verify") {
      out.replaceVerify = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE),
      });
    }
    const next = rest[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--title": {
        out.title = next;
        break;
      }
      case "--description": {
        out.description = next;
        break;
      }
      case "--priority": {
        out.priority = next;
        break;
      }
      case "--owner": {
        out.owner = next;
        break;
      }
      case "--tag": {
        out.tags.push(next);
        break;
      }
      case "--depends-on": {
        out.dependsOn.push(next);
        break;
      }
      case "--verify": {
        out.verify.push(next);
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown flag: ${arg}`,
        });
      }
    }
    i++;
  }
  return out;
}

async function cmdTaskUpdate(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskUpdateFlags(opts.args);
  try {
    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const task = await backend.getTask(flags.taskId);
    if (!task) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const next: TaskData = { ...task };
    if (flags.title !== undefined) next.title = flags.title;
    if (flags.description !== undefined) next.description = flags.description;
    if (flags.priority !== undefined) next.priority = flags.priority;
    if (flags.owner !== undefined) next.owner = flags.owner;

    const existingTags = flags.replaceTags ? [] : dedupeStrings(toStringArray(next.tags));
    const mergedTags = dedupeStrings([...existingTags, ...flags.tags]);
    next.tags = mergedTags;

    const existingDepends = flags.replaceDependsOn
      ? []
      : dedupeStrings(toStringArray(next.depends_on));
    const mergedDepends = dedupeStrings([...existingDepends, ...flags.dependsOn]);
    next.depends_on = mergedDepends;

    const existingVerify = flags.replaceVerify ? [] : dedupeStrings(toStringArray(next.verify));
    const mergedVerify = dedupeStrings([...existingVerify, ...flags.verify]);
    next.verify = mergedVerify;

    if (
      requiresVerify(mergedTags, config.tasks.verify.required_tags) &&
      mergedVerify.length === 0
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "verify commands are required for tasks with code/backend/frontend tags",
      });
    }

    await backend.writeTask(next);
    process.stdout.write(`${successMessage("updated", flags.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task update", root: opts.rootOverride ?? null });
  }
}

type TaskScrubFlags = {
  find: string;
  replace: string;
  dryRun: boolean;
  quiet: boolean;
};

function parseTaskScrubFlags(args: string[]): TaskScrubFlags {
  const out: TaskScrubFlags = {
    find: "",
    replace: "",
    dryRun: false,
    quiet: false,
  };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
      });
    }
    const next = args[i + 1];
    if (!next)
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    if (arg === "--find") {
      out.find = next;
    } else if (arg === "--replace") {
      out.replace = next;
    } else {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
    i++;
  }
  return out;
}

function scrubValue(value: unknown, find: string, replace: string): unknown {
  if (typeof value === "string") return value.replaceAll(find, replace);
  if (Array.isArray(value)) return value.map((item) => scrubValue(item, find, replace));
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    const out: Record<string, unknown> = {};
    for (const [key, val] of entries) {
      out[key] = scrubValue(val, find, replace);
    }
    return out;
  }
  return value;
}

async function cmdTaskScrub(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskScrubFlags(opts.args);
  if (!flags.find) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE),
    });
  }
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const updated: TaskData[] = [];
    const changedIds = new Set<string>();
    for (const task of tasks) {
      const before = JSON.stringify(task);
      const scrubbed = scrubValue(task, flags.find, flags.replace);
      if (scrubbed && typeof scrubbed === "object") {
        const next = scrubbed as TaskData;
        updated.push(next);
        const after = JSON.stringify(next);
        if (before !== after) changedIds.add(next.id);
      } else {
        updated.push(task);
      }
    }
    if (flags.dryRun) {
      if (!flags.quiet) {
        process.stdout.write(
          `${infoMessage(`dry-run: would update ${changedIds.size} task(s)`)}` + "\n",
        );
        for (const id of [...changedIds].toSorted()) {
          process.stdout.write(`${id}\n`);
        }
      }
      return 0;
    }
    if (backend.writeTasks) {
      await backend.writeTasks(updated);
    } else {
      for (const task of updated) {
        await backend.writeTask(task);
      }
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("updated tasks", undefined, `count=${changedIds.size}`)}` + "\n",
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task scrub", root: opts.rootOverride ?? null });
  }
}

type TaskListFilters = {
  status: string[];
  owner: string[];
  tag: string[];
  limit?: number;
  quiet: boolean;
};

function parseTaskListFilters(args: string[], opts?: { allowLimit?: boolean }): TaskListFilters {
  const out: TaskListFilters = { status: [], owner: [], tag: [], quiet: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--status") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--status"),
        });
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--owner"),
        });
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage("--tag") });
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--limit"),
        });
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueForFlag("--limit", next, "integer"),
        });
      }
      out.limit = parsed;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

async function cmdTaskListWithFilters(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args);
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (filters.status.length > 0) {
      const wanted = new Set(filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    const sorted = filtered.toSorted((a, b) => a.id.localeCompare(b.id));
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      const counts: Record<string, number> = {};
      for (const task of sorted) {
        const status = String(task.status || "TODO").toUpperCase();
        counts[status] = (counts[status] ?? 0) + 1;
      }
      const total = sorted.length;
      const summary = Object.keys(counts)
        .toSorted()
        .map((key) => `${key}=${counts[key]}`)
        .join(", ");
      process.stdout.write(`Total: ${total}${summary ? ` (${summary})` : ""}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task list", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskNext(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const filters = parseTaskListFilters(opts.args, { allowLimit: true });
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    const statuses =
      filters.status.length > 0
        ? new Set(filters.status.map((s) => s.trim().toUpperCase()))
        : new Set(["TODO"]);
    let filtered = tasks.filter((task) =>
      statuses.has(String(task.status || "TODO").toUpperCase()),
    );
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    const sorted = filtered.toSorted((a, b) => a.id.localeCompare(b.id));
    const ready = sorted.filter((task) => {
      const dep = depState.get(task.id);
      return !dep || (dep.missing.length === 0 && dep.incomplete.length === 0);
    });
    const limited =
      filters.limit !== undefined && filters.limit >= 0 ? ready.slice(0, filters.limit) : ready;
    for (const task of limited) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    if (!filters.quiet) {
      process.stdout.write(`Ready: ${limited.length} / ${filtered.length}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task next", root: opts.rootOverride ?? null });
  }
}

async function cmdReady(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    const task = tasks.find((item) => item.id === opts.taskId);
    const warnings: string[] = [];
    if (task) {
      const dep = depState.get(task.id);
      const missing = dep?.missing ?? [];
      const incomplete = dep?.incomplete ?? [];
      if (missing.length > 0) {
        warnings.push(`${task.id}: missing deps: ${missing.join(", ")}`);
      }
      if (incomplete.length > 0) {
        warnings.push(`${task.id}: incomplete deps: ${incomplete.join(", ")}`);
      }
    } else {
      warnings.push(unknownEntityMessage("task id", opts.taskId));
    }

    for (const warning of warnings) {
      process.stdout.write(`${warnMessage(warning)}\n`);
    }

    if (task) {
      const status = String(task.status || "TODO").toUpperCase();
      const title = task.title?.trim() || "(untitled task)";
      const owner = task.owner?.trim() || "-";
      const dep = depState.get(task.id);
      const dependsOn = dep?.dependsOn ?? [];
      process.stdout.write(`Task: ${task.id} [${status}] ${title}\n`);
      process.stdout.write(`Owner: ${owner}\n`);
      process.stdout.write(`Depends on: ${dependsOn.length > 0 ? dependsOn.join(", ") : "-"}\n`);
      const missing = dep?.missing ?? [];
      const incomplete = dep?.incomplete ?? [];
      if (missing.length > 0) {
        process.stdout.write(`${warnMessage(`missing deps: ${missing.join(", ")}`)}\n`);
      }
      if (incomplete.length > 0) {
        process.stdout.write(`${warnMessage(`incomplete deps: ${incomplete.join(", ")}`)}\n`);
      }
    }

    const ready = warnings.length === 0;
    process.stdout.write(`${ready ? successMessage("ready") : warnMessage("not ready")}` + "\n");
    return ready ? 0 : 2;
  } catch (err) {
    throw mapBackendError(err, { command: "ready", root: opts.rootOverride ?? null });
  }
}

function taskTextBlob(task: TaskData): string {
  const parts: string[] = [];
  for (const key of ["id", "title", "description", "status", "priority", "owner"] as const) {
    const value = (task as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }
  const tags = toStringArray(task.tags);
  parts.push(...tags.filter(Boolean));
  const comments = Array.isArray(task.comments) ? task.comments : [];
  for (const comment of comments) {
    if (comment && typeof comment.author === "string") parts.push(comment.author);
    if (comment && typeof comment.body === "string") parts.push(comment.body);
  }
  const commit = task.commit ?? null;
  if (commit && typeof commit.hash === "string") parts.push(commit.hash);
  if (commit && typeof commit.message === "string") parts.push(commit.message);
  return parts.join("\n");
}

async function cmdTaskSearch(opts: {
  cwd: string;
  rootOverride?: string;
  query: string;
  args: string[];
}): Promise<number> {
  const query = opts.query.trim();
  if (!query) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing query (expected non-empty text)",
    });
  }
  let regex = false;
  const restArgs = [...opts.args];
  if (restArgs.includes("--regex")) {
    regex = true;
    restArgs.splice(restArgs.indexOf("--regex"), 1);
  }
  const filters = parseTaskListFilters(restArgs, { allowLimit: true });
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const depState = buildDependencyState(tasks);
    let filtered = tasks;
    if (filters.status.length > 0) {
      const wanted = new Set(filters.status.map((s) => s.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.status || "TODO").toUpperCase()));
    }
    if (filters.owner.length > 0) {
      const wanted = new Set(filters.owner.map((o) => o.trim().toUpperCase()));
      filtered = filtered.filter((task) => wanted.has(String(task.owner || "").toUpperCase()));
    }
    if (filters.tag.length > 0) {
      const wanted = new Set(filters.tag.map((t) => t.trim()).filter(Boolean));
      filtered = filtered.filter((task) => {
        const tags = dedupeStrings(toStringArray(task.tags));
        return tags.some((tag) => wanted.has(tag));
      });
    }
    let matches: TaskData[] = [];
    if (regex) {
      let pattern: RegExp;
      try {
        pattern = new RegExp(query, "i");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid regex";
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage("regex", message, "valid pattern"),
        });
      }
      matches = filtered.filter((task) => pattern.test(taskTextBlob(task)));
    } else {
      const needle = query.toLowerCase();
      matches = filtered.filter((task) => taskTextBlob(task).toLowerCase().includes(needle));
    }
    if (filters.limit !== undefined && filters.limit >= 0) {
      matches = matches.slice(0, filters.limit);
    }
    const sorted = matches.toSorted((a, b) => a.id.localeCompare(b.id));
    for (const task of sorted) {
      process.stdout.write(`${formatTaskLine(task, depState.get(task.id))}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task search", root: opts.rootOverride ?? null });
  }
}

type TaskScaffoldFlags = {
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  quiet: boolean;
};

function parseTaskScaffoldFlags(args: string[]): TaskScaffoldFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCAFFOLD_USAGE, TASK_SCAFFOLD_USAGE_EXAMPLE),
    });
  }
  const out: TaskScaffoldFlags = { taskId, overwrite: false, force: false, quiet: false };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--overwrite") {
      out.overwrite = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--title") {
      const next = rest[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--title"),
        });
      out.title = next;
      i++;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown flag: ${arg}`,
    });
  }
  return out;
}

async function cmdTaskScaffold(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskScaffoldFlags(opts.args);
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const task = await backend.getTask(flags.taskId);
    if (!task && !flags.force) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const readmePath = taskReadmePath(
      path.join(resolved.gitRoot, config.paths.workflow_dir),
      flags.taskId,
    );
    try {
      await readFile(readmePath, "utf8");
      if (!flags.overwrite) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `File already exists: ${readmePath}`,
        });
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") {
        if (err instanceof CliError) throw err;
        throw err;
      }
    }

    const baseTask: TaskData =
      task ??
      ({
        id: flags.taskId,
        title: flags.title ?? "",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: "agentplane",
      } satisfies TaskData);
    if (flags.title) baseTask.title = flags.title;

    const frontmatter = taskDataToFrontmatter(baseTask);
    const body = ensureDocSections("", config.tasks.doc.required_sections);
    const text = renderTaskReadme(frontmatter, body);
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, text.endsWith("\n") ? text : `${text}\n`, "utf8");
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("wrote", path.relative(resolved.gitRoot, readmePath))}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task scaffold", root: opts.rootOverride ?? null });
  }
}

type TaskNormalizeFlags = { quiet: boolean; force: boolean };

function parseTaskNormalizeFlags(args: string[]): TaskNormalizeFlags {
  const out: TaskNormalizeFlags = { quiet: false, force: false };
  for (const arg of args) {
    if (!arg) continue;
    if (arg === "--quiet") out.quiet = true;
    else if (arg === "--force") out.force = true;
    else if (arg.startsWith("--"))
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
  }
  return out;
}

async function cmdTaskNormalize(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskNormalizeFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("normalized tasks", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}

type TaskMigrateFlags = { source?: string; quiet: boolean; force: boolean };

function parseTaskMigrateFlags(args: string[]): TaskMigrateFlags {
  const out: TaskMigrateFlags = { quiet: false, force: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--source") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--source"),
        });
      out.source = next;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
    }
  }
  return out;
}

async function cmdTaskMigrate(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskMigrateFlags(opts.args);
  if (flags.force) {
    // Force is accepted for parity; no additional checks in node CLI.
  }
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const source = flags.source ?? config.paths.tasks_path;
    const sourcePath = path.join(resolved.gitRoot, source);
    const raw = await readFile(sourcePath, "utf8");
    const parsed = JSON.parse(raw) as { tasks?: TaskData[] };
    const tasks = Array.isArray(parsed.tasks) ? parsed.tasks : [];
    if (backend.writeTasks) {
      await backend.writeTasks(tasks);
    } else {
      for (const task of tasks) await backend.writeTask(task);
    }
    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("migrated tasks into backend", undefined, `count=${tasks.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task migrate", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskComment(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    const existing = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const next: TaskData = {
      ...task,
      comments: [...existing, { author: opts.author, body: opts.body }],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };
    await backend.writeTask(next);
    process.stdout.write(`${successMessage("commented", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task comment", root: opts.rootOverride ?? null });
  }
}

async function readCommitInfo(
  cwd: string,
  rev: string,
): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s", rev], { cwd });
  const trimmed = stdout.trim();
  const [hash, message] = trimmed.split(":", 2);
  if (!hash || !message) {
    throw new Error("Unable to read git commit");
  }
  return { hash, message };
}

function defaultCommitEmojiForStatus(status: string): string {
  const normalized = status.trim().toUpperCase();
  if (normalized === "DOING") return "🚧";
  if (normalized === "DONE") return "✅";
  if (normalized === "BLOCKED") return "⛔";
  return "🧩";
}

async function cmdTaskSetStatus(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  status: string;
  author?: string;
  body?: string;
  commit?: string;
  force: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  const nextStatus = normalizeTaskStatus(opts.status);
  if (nextStatus === "DONE" && !opts.force) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Use `agentplane finish` to mark DONE (use --force to override)",
    });
  }
  if ((opts.author && !opts.body) || (opts.body && !opts.author)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "--author and --body must be provided together",
    });
  }

  try {
    const { backend, task, config, resolved } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: config.status_commit_policy,
        action: "task set-status",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, nextStatus)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> ${nextStatus} (use --force to override)`,
      });
    }

    if (!opts.force && (nextStatus === "DOING" || nextStatus === "DONE")) {
      const allTasks = await backend.listTasks();
      const depState = buildDependencyState(allTasks);
      const dep = depState.get(task.id);
      if (dep && (dep.missing.length > 0 || dep.incomplete.length > 0)) {
        if (!opts.quiet) {
          if (dep.missing.length > 0) {
            process.stderr.write(`${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(
              `${warnMessage(`incomplete deps: ${dep.incomplete.join(", ")}`)}\n`,
            );
          }
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is not ready: ${task.id} (use --force to override)`,
        });
      }
    }

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    let comments = existingComments;
    if (opts.author && opts.body) {
      const commentBody = opts.commitFromComment
        ? formatCommentBodyForCommit(opts.body, config)
        : opts.body;
      comments = [...existingComments, { author: opts.author, body: commentBody }];
    }

    const next: TaskData = {
      ...task,
      status: nextStatus,
      comments,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };
    if (opts.commit) {
      const commitInfo = await readCommitInfo(resolved.gitRoot, opts.commit);
      next.commit = { hash: commitInfo.hash, message: commitInfo.message };
    }
    await backend.writeTask(next);

    if (backend.exportTasksJson) {
      const outPath = path.join(resolved.gitRoot, config.paths.tasks_path);
      await backend.exportTasksJson(outPath);
    }

    if (opts.commitFromComment) {
      if (!opts.body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "--body is required when using --commit-from-comment",
        });
      }
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus(nextStatus),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("status", opts.taskId, `next=${nextStatus}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task set-status", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { task, backendId } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const frontmatter = taskDataToFrontmatter(task);
    if (backendId === "local") {
      const metadataErrors = validateTaskDocMetadata(frontmatter);
      if (metadataErrors.length > 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
        });
      }
    }
    process.stdout.write(`${JSON.stringify(frontmatter, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task show",
      root: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
  }
}

async function cmdTaskList(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  return await cmdTaskListWithFilters(opts);
}

async function cmdTaskExport(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const outPath = path.join(resolved.gitRoot, config.paths.tasks_path);
    if (!backend.exportTasksJson) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("exportTasksJson()"),
      });
    }
    await backend.exportTasksJson(outPath);
    process.stdout.write(`${path.relative(resolved.gitRoot, outPath)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task export", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskLint(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const result = await lintTasksFile({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    if (result.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: result.errors.join("\n"),
      });
    }
    process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task lint", root: opts.rootOverride ?? null });
  }
}

const IDE_SYNC_USAGE = "Usage: agentplane ide sync";
const IDE_SYNC_USAGE_EXAMPLE = "agentplane ide sync";
const GUARD_COMMIT_USAGE =
  "Usage: agentplane guard commit <task-id> -m <message> --allow <path> [--allow <path>...] [--auto-allow] [--allow-tasks] [--require-clean] [--quiet]";
const GUARD_COMMIT_USAGE_EXAMPLE =
  'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB update" --allow packages/agentplane';
const COMMIT_USAGE = "Usage: agentplane commit <task-id> -m <message>";
const COMMIT_USAGE_EXAMPLE = 'agentplane commit 202602030608-F1Q8AB -m "✨ F1Q8AB update"';
const START_USAGE = "Usage: agentplane start <task-id> --author <id> --body <text> [flags]";
const START_USAGE_EXAMPLE =
  'agentplane start 202602030608-F1Q8AB --author CODER --body "Start: ..."';
const BLOCK_USAGE = "Usage: agentplane block <task-id> --author <id> --body <text> [flags]";
const BLOCK_USAGE_EXAMPLE =
  'agentplane block 202602030608-F1Q8AB --author CODER --body "Blocked: ..."';
const FINISH_USAGE =
  "Usage: agentplane finish <task-id> [<task-id>...] --author <id> --body <text> [flags]";
const FINISH_USAGE_EXAMPLE =
  'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: ..."';
const VERIFY_USAGE =
  "Usage: agentplane verify <task-id> [--cwd <path>] [--log <path>] [--skip-if-unchanged] [--quiet] [--require]";
const VERIFY_USAGE_EXAMPLE = "agentplane verify 202602030608-F1Q8AB";
const WORK_START_USAGE =
  "Usage: agentplane work start <task-id> --agent <id> --slug <slug> --worktree";
const WORK_START_USAGE_EXAMPLE =
  "agentplane work start 202602030608-F1Q8AB --agent CODER --slug cli --worktree";
const PR_OPEN_USAGE = "Usage: agentplane pr open <task-id> --author <id> [--branch <name>]";
const PR_OPEN_USAGE_EXAMPLE = "agentplane pr open 202602030608-F1Q8AB --author CODER";
const PR_UPDATE_USAGE = "Usage: agentplane pr update <task-id>";
const PR_UPDATE_USAGE_EXAMPLE = "agentplane pr update 202602030608-F1Q8AB";
const PR_CHECK_USAGE = "Usage: agentplane pr check <task-id>";
const PR_CHECK_USAGE_EXAMPLE = "agentplane pr check 202602030608-F1Q8AB";
const PR_NOTE_USAGE = "Usage: agentplane pr note <task-id> --author <id> --body <text>";
const PR_NOTE_USAGE_EXAMPLE =
  'agentplane pr note 202602030608-F1Q8AB --author REVIEWER --body "..."';
const INTEGRATE_USAGE =
  "Usage: agentplane integrate <task-id> [--branch <name>] [--base <name>] [--merge-strategy squash|merge|rebase] [--run-verify] [--dry-run] [--quiet]";
const INTEGRATE_USAGE_EXAMPLE = "agentplane integrate 202602030608-F1Q8AB --run-verify";
const CLEANUP_MERGED_USAGE =
  "Usage: agentplane cleanup merged [--base <name>] [--yes] [--archive] [--quiet]";
const CLEANUP_MERGED_USAGE_EXAMPLE = "agentplane cleanup merged --yes";

function pathIsUnder(candidate: string, prefix: string): boolean {
  if (prefix === "." || prefix === "") return true;
  if (candidate === prefix) return true;
  return candidate.startsWith(`${prefix}/`);
}

function normalizeAllowPrefix(prefix: string): string {
  return prefix.replace(/\/+$/, "");
}

function nowIso(): string {
  return new Date().toISOString();
}

const ALLOWED_TASK_STATUSES = new Set(["TODO", "DOING", "DONE", "BLOCKED"]);

type DependencyState = {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
};

function normalizeTaskStatus(value: string): string {
  const normalized = value.trim().toUpperCase();
  if (!ALLOWED_TASK_STATUSES.has(normalized)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage(
        "status",
        value,
        `one of ${[...ALLOWED_TASK_STATUSES].join(", ")}`,
      ),
    });
  }
  return normalized;
}

function dedupeStrings(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const trimmed = item.trim();
    if (!trimmed) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim());
}

function requiresVerify(tags: string[], requiredTags: string[]): boolean {
  const required = new Set(requiredTags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  if (required.size === 0) return false;
  return tags.some((tag) => required.has(tag.trim().toLowerCase()));
}

function buildDependencyState(tasks: TaskData[]): Map<string, DependencyState> {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const state = new Map<string, DependencyState>();
  for (const task of tasks) {
    const dependsOn = dedupeStrings(toStringArray(task.depends_on));
    const missing: string[] = [];
    const incomplete: string[] = [];
    for (const depId of dependsOn) {
      const dep = byId.get(depId);
      if (!dep) {
        missing.push(depId);
        continue;
      }
      const status = String(dep.status || "TODO").toUpperCase();
      if (status !== "DONE") {
        incomplete.push(depId);
      }
    }
    state.set(task.id, { dependsOn, missing, incomplete });
  }
  return state;
}

function formatDepsSummary(dep: DependencyState | undefined): string | null {
  if (!dep) return null;
  if (dep.dependsOn.length === 0) return "deps=none";
  if (dep.missing.length === 0 && dep.incomplete.length === 0) return "deps=ready";
  const parts: string[] = [];
  if (dep.missing.length > 0) {
    parts.push(`missing:${dep.missing.join(",")}`);
  }
  if (dep.incomplete.length > 0) {
    parts.push(`wait:${dep.incomplete.join(",")}`);
  }
  return `deps=${parts.join(",")}`;
}

function formatTaskLine(task: TaskData, depState?: DependencyState): string {
  const status = String(task.status || "TODO").toUpperCase();
  const title = task.title?.trim() || "(untitled task)";
  const extras: string[] = [];
  if (task.owner?.trim()) extras.push(`owner=${task.owner.trim()}`);
  if (task.priority !== undefined && String(task.priority).trim()) {
    extras.push(`prio=${String(task.priority).trim()}`);
  }
  const depsSummary = formatDepsSummary(depState);
  if (depsSummary) extras.push(depsSummary);
  const tags = dedupeStrings(toStringArray(task.tags));
  if (tags.length > 0) extras.push(`tags=${tags.join(",")}`);
  const verify = dedupeStrings(toStringArray(task.verify));
  if (verify.length > 0) extras.push(`verify=${verify.length}`);
  const suffix = extras.length > 0 ? ` (${extras.join(", ")})` : "";
  return `${task.id} [${status}] ${title}${suffix}`;
}

function isTransitionAllowed(current: string, next: string): boolean {
  if (current === next) return true;
  if (current === "TODO") return next === "DOING" || next === "BLOCKED";
  if (current === "DOING") return next === "DONE" || next === "BLOCKED";
  if (current === "BLOCKED") return next === "TODO" || next === "DOING";
  if (current === "DONE") return false;
  return false;
}

function requireStructuredComment(body: string, prefix: string, minChars: number): void {
  const normalized = body.trim();
  if (!normalized.toLowerCase().startsWith(prefix.toLowerCase())) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must start with ${prefix}`,
    });
  }
  if (normalized.length < minChars) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Comment body must be at least ${minChars} characters`,
    });
  }
}

async function readHeadCommit(cwd: string): Promise<{ hash: string; message: string }> {
  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], { cwd });
  const trimmed = stdout.trim();
  const [hash, message] = trimmed.split(":", 2);
  if (!hash || !message) {
    throw new Error("Unable to read git HEAD commit");
  }
  return { hash, message };
}

function deriveCommitMessageFromComment(opts: {
  taskId: string;
  body: string;
  emoji: string;
  formattedComment?: string | null;
  config: AgentplaneConfig;
}): string {
  const summary = (opts.formattedComment ?? formatCommentBodyForCommit(opts.body, opts.config))
    .trim()
    .replaceAll(/\s+/g, " ");
  if (!summary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Comment body is required to build a commit message from the task comment",
    });
  }
  const prefix = opts.emoji.trim();
  if (!prefix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Emoji prefix is required when deriving commit messages from task comments",
    });
  }
  const suffix = extractTaskSuffix(opts.taskId);
  if (!suffix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage("task id", opts.taskId, "valid task id"),
    });
  }
  return `${prefix} ${suffix} ${summary}`;
}

function enforceStatusCommitPolicy(opts: {
  policy: AgentplaneConfig["status_commit_policy"];
  action: string;
  confirmed: boolean;
  quiet: boolean;
}): void {
  if (opts.policy === "off") return;
  if (opts.policy === "warn") {
    if (!opts.quiet && !opts.confirmed) {
      process.stderr.write(
        `${warnMessage(
          `${opts.action}: status/comment-driven commit requested; policy=warn (pass --confirm-status-commit to acknowledge)`,
        )}\n`,
      );
    }
    return;
  }
  if (opts.policy === "confirm" && !opts.confirmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        `${opts.action}: status/comment-driven commit blocked by status_commit_policy='confirm' ` +
        "(pass --confirm-status-commit to proceed)",
    });
  }
}

function suggestAllowPrefixes(paths: string[]): string[] {
  const out = new Set<string>();
  for (const filePath of paths) {
    if (!filePath) continue;
    const idx = filePath.lastIndexOf("/");
    if (idx <= 0) out.add(filePath);
    else out.add(filePath.slice(0, idx));
  }
  return [...out].toSorted((a, b) => a.localeCompare(b));
}

const HOOK_MARKER = "agentplane-hook";
const SHIM_MARKER = "agentplane-hook-shim";
const HOOK_NAMES = ["commit-msg", "pre-commit", "pre-push"] as const;

async function archivePrArtifacts(taskDir: string): Promise<string | null> {
  const prDir = path.join(taskDir, "pr");
  if (!(await fileExists(prDir))) return null;
  const archiveRoot = path.join(taskDir, "pr-archive");
  await mkdir(archiveRoot, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "");
  let dest = path.join(archiveRoot, stamp);
  if (await fileExists(dest)) {
    dest = path.join(archiveRoot, `${stamp}-${Math.random().toString(36).slice(2, 8)}`);
  }
  await rename(prDir, dest);
  return dest;
}

async function resolvePathFallback(filePath: string): Promise<string> {
  try {
    return await realpath(filePath);
  } catch {
    return path.resolve(filePath);
  }
}

function isPathWithin(parent: string, candidate: string): boolean {
  const rel = path.relative(parent, candidate);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

async function gitRevParse(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", ...args], { cwd, env: gitEnv() });
  const trimmed = stdout.trim();
  if (!trimmed) throw new Error("Failed to resolve git path");
  return trimmed;
}

async function gitInitRepo(cwd: string, branch: string): Promise<void> {
  try {
    await execFileAsync("git", ["init", "-q", "-b", branch], { cwd, env: gitEnv() });
    return;
  } catch {
    await execFileAsync("git", ["init", "-q"], { cwd, env: gitEnv() });
  }

  try {
    const current = await gitCurrentBranch(cwd);
    if (current !== branch) {
      await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
    }
  } catch {
    await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
  }
}

async function gitCurrentBranch(cwd: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    if (trimmed) return trimmed;
  } catch {
    // fall through
  }
  const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd,
    env: gitEnv(),
  });
  const trimmed = stdout.trim();
  if (!trimmed || trimmed === "HEAD") throw new Error("Failed to resolve git branch");
  return trimmed;
}

async function gitBranchExists(cwd: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd,
      env: gitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

async function gitListBranches(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["branch", "--format=%(refname:short)"], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function gitStagedPaths(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function gitAddPaths(cwd: string, paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  await execFileAsync("git", ["add", "--", ...paths], { cwd, env: gitEnv() });
}

async function gitCommit(cwd: string, message: string): Promise<void> {
  await execFileAsync("git", ["commit", "-m", message], { cwd, env: gitEnv() });
}

async function resolveInitBaseBranch(gitRoot: string, fallback: string): Promise<string> {
  let current: string | null = null;
  try {
    current = await gitCurrentBranch(gitRoot);
  } catch {
    current = null;
  }
  const branches = await gitListBranches(gitRoot);
  if (current) return current;
  if (branches.includes(fallback)) return fallback;
  if (branches.length > 0) {
    const first = branches[0];
    if (first) return first;
  }
  return fallback;
}

async function ensureInitCommit(opts: {
  gitRoot: string;
  baseBranch: string;
  installPaths: string[];
  version: string;
}): Promise<void> {
  const stagedBefore = await gitStagedPaths(opts.gitRoot);
  if (stagedBefore.length > 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message:
        "Git index has staged changes; commit or unstage them before running agentplane init.",
    });
  }

  await setPinnedBaseBranch({
    cwd: opts.gitRoot,
    rootOverride: opts.gitRoot,
    value: opts.baseBranch,
  });

  const dedupedPaths = [...new Set(opts.installPaths)].filter((entry) => entry.length > 0);
  await gitAddPaths(opts.gitRoot, dedupedPaths);
  const staged = await gitStagedPaths(opts.gitRoot);
  if (staged.length === 0) return;

  const message = `chore: install agentplane ${opts.version}`;
  await gitCommit(opts.gitRoot, message);
}
function toGitPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

async function gitShowFile(cwd: string, ref: string, relPath: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["show", `${ref}:${relPath}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout;
}

async function gitDiffNames(cwd: string, base: string, branch: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--name-only", `${base}...${branch}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function gitDiffStat(cwd: string, base: string, branch: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["diff", "--stat", `${base}...${branch}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout.trimEnd();
}

async function gitAheadBehind(
  cwd: string,
  base: string,
  branch: string,
): Promise<{ ahead: number; behind: number }> {
  const { stdout } = await execFileAsync(
    "git",
    ["rev-list", "--left-right", "--count", `${base}...${branch}`],
    { cwd, env: gitEnv() },
  );
  const trimmed = stdout.trim();
  if (!trimmed) return { ahead: 0, behind: 0 };
  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) return { ahead: 0, behind: 0 };
  const behind = Number.parseInt(parts[0] ?? "0", 10) || 0;
  const ahead = Number.parseInt(parts[1] ?? "0", 10) || 0;
  return { ahead, behind };
}

async function listWorktrees(cwd: string): Promise<{ path: string; branch: string | null }[]> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd,
    env: gitEnv(),
  });
  const worktrees: { path: string; branch: string | null }[] = [];
  const lines = stdout.split("\n");
  let current: { path: string; branch: string | null } | null = null;
  for (const line of lines) {
    if (line.startsWith("worktree ")) {
      if (current) worktrees.push(current);
      current = { path: line.slice("worktree ".length).trim(), branch: null };
      continue;
    }
    if (line.startsWith("branch ") && current) {
      current.branch = line.slice("branch ".length).trim();
    }
  }
  if (current) worktrees.push(current);
  return worktrees;
}

async function findWorktreeForBranch(cwd: string, branch: string): Promise<string | null> {
  const target = branch.startsWith("refs/heads/") ? branch : `refs/heads/${branch}`;
  const worktrees = await listWorktrees(cwd);
  const match = worktrees.find(
    (entry) =>
      entry.branch === branch || entry.branch === target || entry.branch === `refs/heads/${branch}`,
  );
  return match ? match.path : null;
}

function stripBranchRef(branch: string): string {
  return branch.startsWith("refs/heads/") ? branch.slice("refs/heads/".length) : branch;
}

function parseTaskIdFromBranch(prefix: string, branch: string): string | null {
  const normalized = stripBranchRef(branch);
  if (!normalized.startsWith(`${prefix}/`)) return null;
  const rest = normalized.slice(prefix.length + 1);
  const taskId = rest.split("/", 1)[0];
  return taskId ? taskId.trim() : null;
}

async function gitListTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)", `refs/heads/${prefix}`],
    { cwd, env: gitEnv() },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

async function resolveGitHooksDir(cwd: string): Promise<string> {
  const repoRoot = await gitRevParse(cwd, ["--show-toplevel"]);
  const commonDirRaw = await gitRevParse(cwd, ["--git-common-dir"]);
  const hooksRaw = await gitRevParse(cwd, ["--git-path", "hooks"]);
  const commonDir = path.resolve(
    path.isAbsolute(commonDirRaw) ? commonDirRaw : path.join(repoRoot, commonDirRaw),
  );
  const hooksDir = path.resolve(
    path.isAbsolute(hooksRaw) ? hooksRaw : path.join(repoRoot, hooksRaw),
  );
  const resolvedRoot = path.resolve(repoRoot);

  if (!isPathWithin(resolvedRoot, hooksDir) && !isPathWithin(commonDir, hooksDir)) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: [
        "Refusing to manage git hooks outside the repository.",
        `hooks_path=${hooksDir}`,
        `repo_root=${resolvedRoot}`,
        `common_dir=${commonDir}`,
        "Fix:",
        "  1) Use a repo-relative core.hooksPath (e.g., .git/hooks)",
        "  2) Re-run `agentplane hooks install`",
      ].join("\n"),
    });
  }
  return hooksDir;
}

async function fileIsManaged(filePath: string, marker: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf8");
    return content.includes(marker);
  } catch {
    return false;
  }
}

function hookScriptText(hook: (typeof HOOK_NAMES)[number]): string {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_MARKER} (do not edit)`,
    "set -e",
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane hooks: agentplane not found in PATH" >&2',
    "  exit 1",
    "fi",
    "exec agentplane hooks run " + hook + ' "$@"',
    "",
  ].join("\n");
}

function shimScriptText(): string {
  return [
    "#!/usr/bin/env sh",
    `# ${SHIM_MARKER} (do not edit)`,
    "set -e",
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane shim: agentplane not found in PATH" >&2',
    "  exit 1",
    "fi",
    'exec agentplane "$@"',
    "",
  ].join("\n");
}

function validateWorkSlug(slug: string): void {
  const trimmed = slug.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
    });
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Slug must be lowercase kebab-case (a-z, 0-9, hyphen)",
    });
  }
}

function validateWorkAgent(agent: string): void {
  const trimmed = agent.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
    });
  }
  if (!/^[A-Z0-9_]+$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Agent id must be uppercase letters, numbers, or underscores",
    });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isIsoDate(value: unknown): boolean {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

type PrMeta = {
  schema_version: 1;
  task_id: string;
  branch?: string;
  created_at: string;
  updated_at: string;
  last_verified_sha: string | null;
  last_verified_at: string | null;
  verify?: { status?: "pass" | "fail" | "skipped"; command?: string };
};

function parsePrMeta(raw: string, taskId: string): PrMeta {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON Parse error: ${message}`);
  }
  if (!isRecord(parsed)) throw new Error("pr/meta.json must be an object");
  if (parsed.schema_version !== 1) throw new Error("pr/meta.json schema_version must be 1");
  if (parsed.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
  if (!isIsoDate(parsed.created_at)) throw new Error("pr/meta.json created_at must be ISO");
  if (!isIsoDate(parsed.updated_at)) throw new Error("pr/meta.json updated_at must be ISO");
  return parsed as PrMeta;
}

function extractLastVerifiedSha(logText: string): string | null {
  const regex = /verified_sha=([0-9a-f]{7,40})/gi;
  let match: RegExpExecArray | null = null;
  let last: string | null = null;
  while ((match = regex.exec(logText))) {
    last = match[1] ?? null;
  }
  return last;
}

async function appendVerifyLog(logPath: string, header: string, content: string): Promise<void> {
  await mkdir(path.dirname(logPath), { recursive: true });
  const lines = [header.trimEnd()];
  if (content) lines.push(content.trimEnd());
  lines.push("");
  await writeFile(logPath, `${lines.join("\n")}\n`, { flag: "a" });
}

async function runShellCommand(
  command: string,
  cwd: string,
): Promise<{
  code: number;
  output: string;
}> {
  try {
    const { stdout, stderr } = await execFileAsync("sh", ["-lc", command], {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    let output = "";
    if (stdout) output += stdout;
    if (stderr) output += (output && !output.endsWith("\n") ? "\n" : "") + stderr;
    return { code: 0, output };
  } catch (err) {
    const error = err as { code?: number | string; stdout?: string; stderr?: string };
    let output = "";
    if (error.stdout) output += String(error.stdout);
    if (error.stderr)
      output += (output && !output.endsWith("\n") ? "\n" : "") + String(error.stderr);
    const code = typeof error.code === "number" ? error.code : 1;
    return { code, output };
  }
}

function renderPrReviewTemplate(opts: {
  author: string;
  createdAt: string;
  branch: string;
}): string {
  return [
    "# PR Review",
    "",
    `Opened by ${opts.author} on ${opts.createdAt}`,
    `Branch: ${opts.branch}`,
    "",
    "## Summary",
    "",
    "- ",
    "",
    "## Checklist",
    "",
    "- [ ] Tests added/updated",
    "- [ ] Lint/format passes",
    "- [ ] Docs updated",
    "",
    "## Handoff Notes",
    "",
    "- ",
    "",
    "<!-- BEGIN AUTO SUMMARY -->",
    "<!-- END AUTO SUMMARY -->",
    "",
  ].join("\n");
}

function updateAutoSummaryBlock(body: string, summary: string): string {
  const begin = "<!-- BEGIN AUTO SUMMARY -->";
  const end = "<!-- END AUTO SUMMARY -->";
  const normalizedBody = body.replaceAll("\r\n", "\n");
  const beginIndex = normalizedBody.indexOf(begin);
  const endIndex = normalizedBody.indexOf(end);
  const block = `${begin}\n${summary}\n${end}`;
  if (beginIndex !== -1 && endIndex !== -1 && endIndex > beginIndex) {
    const before = normalizedBody.slice(0, beginIndex);
    const after = normalizedBody.slice(endIndex + end.length);
    return `${before}${block}${after}`;
  }
  const trimmed = normalizedBody.trimEnd();
  return `${trimmed}\n\n${block}\n`;
}

function appendHandoffNote(body: string, noteLine: string): string {
  const normalized = body.replaceAll("\r\n", "\n");
  const heading = "## Handoff Notes";
  const lines = normalized.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === heading);
  const note = `- ${noteLine}`;

  if (headingIndex === -1) {
    const trimmed = normalized.trimEnd();
    return `${trimmed}\n\n${heading}\n\n${note}\n`;
  }

  let nextHeading = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    if (lines[i]?.startsWith("## ")) {
      nextHeading = i;
      break;
    }
  }

  const before = lines.slice(0, nextHeading);
  const after = lines.slice(nextHeading);
  if (before.at(-1)?.trim() !== "") before.push("");
  before.push(note, "");
  return [...before, ...after].join("\n");
}

async function ensureShim(agentplaneDir: string, gitRoot: string): Promise<void> {
  const shimDir = path.join(agentplaneDir, "bin");
  const shimPath = path.join(shimDir, "agentplane");
  await mkdir(shimDir, { recursive: true });
  if (await fileExists(shimPath)) {
    const managed = await fileIsManaged(shimPath, SHIM_MARKER);
    if (!managed) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Refusing to overwrite existing shim: ${path.relative(gitRoot, shimPath)}`,
      });
    }
  }
  await writeFile(shimPath, shimScriptText(), "utf8");
  await chmod(shimPath, 0o755);
}

function readCommitSubject(message: string): string {
  for (const line of message.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    return trimmed;
  }
  return "";
}

function subjectHasSuffix(subject: string, suffixes: string[]): boolean {
  const lowered = subject.toLowerCase();
  return suffixes.some((suffix) => suffix && lowered.includes(suffix.toLowerCase()));
}

async function cmdGuardClean(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    if (staged.length > 0) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: "Staged files exist",
      });
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("index clean", undefined, "no staged files")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard clean", root: opts.rootOverride ?? null });
  }
}

async function cmdGuardSuggestAllow(opts: {
  cwd: string;
  rootOverride?: string;
  format: "lines" | "args";
}): Promise<number> {
  try {
    const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    if (staged.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "No staged files (git index empty)",
      });
    }
    const prefixes = suggestAllowPrefixes(staged);
    if (opts.format === "args") {
      const args = prefixes.map((p) => `--allow ${p}`).join(" ");
      process.stdout.write(`${args}\n`);
    } else {
      for (const prefix of prefixes) process.stdout.write(`${prefix}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "guard suggest-allow", root: opts.rootOverride ?? null });
  }
}

type GuardCommitOptions = {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  message: string;
  allow: string[];
  allowTasks: boolean;
  requireClean: boolean;
  quiet: boolean;
};

async function guardCommitCheck(opts: GuardCommitOptions): Promise<void> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const policy = validateCommitSubject({
    subject: opts.message,
    taskId: opts.taskId,
    genericTokens: loaded.config.commit.generic_tokens,
  });
  if (!policy.ok) {
    throw new CliError({ exitCode: 5, code: "E_GIT", message: policy.errors.join("\n") });
  }

  const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  if (staged.length === 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "No staged files (git index empty)",
    });
  }
  if (opts.allow.length === 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Provide at least one --allow <path> prefix",
    });
  }

  const allow = opts.allow.map((prefix) => normalizeAllowPrefix(prefix));
  const denied = new Set<string>();
  if (!opts.allowTasks) denied.add(".agentplane/tasks.json");

  if (opts.requireClean) {
    const unstaged = await getUnstagedFiles({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (unstaged.length > 0) {
      throw new CliError({ exitCode: 5, code: "E_GIT", message: "Working tree is dirty" });
    }
  }

  for (const filePath of staged) {
    if (denied.has(filePath)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Staged file is forbidden by default: ${filePath} (use --allow-tasks to override)`,
      });
    }
    if (!allow.some((prefix) => pathIsUnder(filePath, prefix))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Staged file is outside allowlist: ${filePath}`,
      });
    }
  }
}

async function gitStatusChangedPaths(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const { stdout } = await execFileAsync("git", ["status", "--porcelain", "-uall"], {
    cwd: resolved.gitRoot,
  });
  const files: string[] = [];
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const filePart = trimmed.slice(2).trim();
    if (!filePart) continue;
    const name = filePart.includes("->") ? filePart.split("->").at(-1)?.trim() : filePart;
    if (name) files.push(name);
  }
  return files;
}

async function ensureGitClean(opts: { cwd: string; rootOverride?: string }): Promise<void> {
  const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  if (staged.length > 0) {
    throw new CliError({ exitCode: 5, code: "E_GIT", message: "Working tree has staged changes" });
  }
  const unstaged = await getUnstagedFiles({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  if (unstaged.length > 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  }
}

async function stageAllowlist(opts: {
  cwd: string;
  rootOverride?: string;
  allow: string[];
  allowTasks: boolean;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const changed = await gitStatusChangedPaths({ cwd: opts.cwd, rootOverride: opts.rootOverride });
  if (changed.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "No changes to stage (working tree clean)",
    });
  }

  const allow = opts.allow.map((prefix) =>
    normalizeAllowPrefix(prefix.trim().replace(/^\.?\//, "")),
  );
  const denied = new Set<string>();
  if (!opts.allowTasks) denied.add(".agentplane/tasks.json");

  const staged: string[] = [];
  for (const filePath of changed) {
    if (denied.has(filePath)) continue;
    if (allow.some((prefix) => pathIsUnder(filePath, prefix))) {
      staged.push(filePath);
    }
  }

  const unique = [...new Set(staged)].toSorted((a, b) => a.localeCompare(b));
  if (unique.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "No changes matched allowed prefixes (use --commit-auto-allow or update --commit-allow)",
    });
  }

  await execFileAsync("git", ["add", "--", ...unique], { cwd: resolved.gitRoot });
  return unique;
}

async function commitFromComment(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  commentBody: string;
  formattedComment: string | null;
  emoji: string;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  requireClean: boolean;
  quiet: boolean;
  config: AgentplaneConfig;
}): Promise<{ hash: string; message: string; staged: string[] }> {
  let allowPrefixes = opts.allow.map((prefix) => prefix.trim()).filter(Boolean);
  if (opts.autoAllow && allowPrefixes.length === 0) {
    const changed = await gitStatusChangedPaths({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    allowPrefixes = suggestAllowPrefixes(changed);
  }
  if (allowPrefixes.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide at least one --commit-allow prefix or enable --commit-auto-allow",
    });
  }

  const staged = await stageAllowlist({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
  });

  const message = deriveCommitMessageFromComment({
    taskId: opts.taskId,
    body: opts.commentBody,
    emoji: opts.emoji,
    formattedComment: opts.formattedComment,
    config: opts.config,
  });

  await guardCommitCheck({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    message,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
  });

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const env = {
    ...process.env,
    AGENT_PLANE_TASK_ID: opts.taskId,
    AGENT_PLANE_ALLOW_TASKS: opts.allowTasks ? "1" : "0",
    AGENT_PLANE_ALLOW_BASE: opts.allowTasks ? "1" : "0",
  };
  await execFileAsync("git", ["commit", "-m", message], { cwd: resolved.gitRoot, env });

  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], {
    cwd: resolved.gitRoot,
  });
  const trimmed = stdout.trim();
  const [hash, subject] = trimmed.split(":", 2);
  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage(
        "committed",
        `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim(),
        `staged=${staged.join(", ")}`,
      )}\n`,
    );
  }
  return { hash: hash ?? "", message: subject ?? "", staged };
}

async function cmdGuardCommit(opts: GuardCommitOptions): Promise<number> {
  try {
    await guardCommitCheck(opts);
    if (!opts.quiet) process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard commit", root: opts.rootOverride ?? null });
  }
}

async function cmdCommit(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  message: string;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  allowBase: boolean;
  requireClean: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    let allow = opts.allow;
    if (opts.autoAllow && allow.length === 0) {
      const staged = await getStagedFiles({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const prefixes = suggestAllowPrefixes(staged);
      if (prefixes.length === 0) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "No staged files (git index empty)",
        });
      }
      allow = prefixes;
    }

    await guardCommitCheck({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      message: opts.message,
      allow,
      allowTasks: opts.allowTasks,
      requireClean: opts.requireClean,
      quiet: opts.quiet,
    });

    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const env = {
      ...process.env,
      AGENT_PLANE_TASK_ID: opts.taskId,
      AGENT_PLANE_ALLOW_TASKS: opts.allowTasks ? "1" : "0",
      AGENT_PLANE_ALLOW_BASE: opts.allowBase ? "1" : "0",
    };
    await execFileAsync("git", ["commit", "-m", opts.message], { cwd: resolved.gitRoot, env });

    if (!opts.quiet) {
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], {
        cwd: resolved.gitRoot,
      });
      const trimmed = stdout.trim();
      const [hash, subject] = trimmed.split(":", 2);
      process.stdout.write(
        `${successMessage("committed", `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim())}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "commit", root: opts.rootOverride ?? null });
  }
}

async function cmdStart(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "start",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.start;
    requireStructuredComment(opts.body, prefix, minChars);

    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "DOING")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> DOING (use --force to override)`,
      });
    }

    if (!opts.force) {
      const allTasks = await backend.listTasks();
      const depState = buildDependencyState(allTasks);
      const dep = depState.get(task.id);
      if (dep && (dep.missing.length > 0 || dep.incomplete.length > 0)) {
        if (!opts.quiet) {
          if (dep.missing.length > 0) {
            process.stderr.write(`${warnMessage(`missing deps: ${dep.missing.join(", ")}`)}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(
              `${warnMessage(`incomplete deps: ${dep.incomplete.join(", ")}`)}\n`,
            );
          }
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task is not ready: ${task.id} (use --force to override)`,
        });
      }
    }

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, loaded.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const commentsValue: { author: string; body: string }[] = [
      ...existingComments,
      { author: opts.author, body: commentBody },
    ];

    const nextTask: TaskData = {
      ...task,
      status: "DOING",
      comments: commentsValue,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };

    await backend.writeTask(nextTask);

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      commitInfo = await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? "🚧",
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      process.stdout.write(`${successMessage("started", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "start", root: opts.rootOverride ?? null });
  }
}

async function cmdBlock(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (opts.commitFromComment) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "block",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }

    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.blocked;
    requireStructuredComment(opts.body, prefix, minChars);

    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const currentStatus = String(task.status || "TODO").toUpperCase();
    if (!opts.force && !isTransitionAllowed(currentStatus, "BLOCKED")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Refusing status transition ${currentStatus} -> BLOCKED (use --force to override)`,
      });
    }

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, loaded.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const existingComments = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const commentsValue = [...existingComments, { author: opts.author, body: commentBody }];
    const nextTask: TaskData = {
      ...task,
      status: "BLOCKED",
      comments: commentsValue,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };

    await backend.writeTask(nextTask);

    let commitInfo: { hash: string; message: string } | null = null;
    if (opts.commitFromComment) {
      commitInfo = await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        commentBody: opts.body,
        formattedComment,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("BLOCKED"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      const suffix = commitInfo ? ` (commit=${commitInfo.hash.slice(0, 12)})` : "";
      process.stdout.write(`${successMessage("blocked", `${opts.taskId}${suffix}`)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "block", root: opts.rootOverride ?? null });
  }
}

async function cmdFinish(opts: {
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  author: string;
  body: string;
  commit?: string;
  skipVerify: boolean;
  force: boolean;
  noRequireTaskIdInCommit: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    if (opts.noRequireTaskIdInCommit) {
      // Parity flag (commit subject checks are not enforced in node CLI).
    }
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);
    if (opts.commitFromComment || opts.statusCommit) {
      enforceStatusCommitPolicy({
        policy: loaded.config.status_commit_policy,
        action: "finish",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
      });
    }
    if ((opts.commitFromComment || opts.statusCommit) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    const primaryTaskId = opts.taskIds[0] ?? "";
    if ((opts.commitFromComment || opts.statusCommit) && !primaryTaskId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }

    const { backend, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });

    const commitInfo = opts.commit
      ? await readCommitInfo(resolved.gitRoot, opts.commit)
      : await readHeadCommit(resolved.gitRoot);

    for (const taskId of opts.taskIds) {
      const { task } = await loadBackendTask({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId,
      });

      if (!opts.force) {
        const currentStatus = String(task.status || "TODO").toUpperCase();
        if (currentStatus === "DONE") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: `Task is already DONE: ${task.id} (use --force to override)`,
          });
        }
      }

      const existingComments = Array.isArray(task.comments)
        ? task.comments.filter(
            (item): item is { author: string; body: string } =>
              !!item && typeof item.author === "string" && typeof item.body === "string",
          )
        : [];
      const commentsValue = [...existingComments, { author: opts.author, body: opts.body }];
      const nextTask: TaskData = {
        ...task,
        status: "DONE",
        commit: { hash: commitInfo.hash, message: commitInfo.message },
        comments: commentsValue,
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: "agentplane",
      };
      await backend.writeTask(nextTask);
    }

    if (!opts.skipVerify) {
      // No-op for parity; verify is handled by `agentplane verify`.
    }

    if (!backend.exportTasksJson) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("exportTasksJson()"),
      });
    }
    const outPath = path.join(resolved.gitRoot, config.paths.tasks_path);
    await backend.exportTasksJson(outPath);
    const lintResult = await lintTasksFile({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (lintResult.errors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: lintResult.errors.join("\n"),
      });
    }

    if (opts.commitFromComment) {
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, loaded.config),
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: opts.commitAutoAllow || opts.commitAllow.length === 0,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (opts.statusCommit) {
      await commitFromComment({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        commentBody: opts.body,
        formattedComment: formatCommentBodyForCommit(opts.body, loaded.config),
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: opts.statusCommitAutoAllow || opts.statusCommitAllow.length === 0,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        config: loaded.config,
      });
    }

    if (!opts.quiet) {
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}

async function cmdVerify(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  execCwd?: string;
  logPath?: string;
  skipIfUnchanged: boolean;
  quiet: boolean;
  require: boolean;
}): Promise<number> {
  try {
    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const rawVerify = task.verify;
    if (rawVerify !== undefined && rawVerify !== null && !Array.isArray(rawVerify)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${task.id}: verify must be a list of strings`,
      });
    }
    const commands = Array.isArray(rawVerify)
      ? rawVerify
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    if (commands.length === 0) {
      if (opts.require) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `${task.id}: no verify commands configured`,
        });
      }
      if (!opts.quiet) {
        process.stdout.write(`${infoMessage(`${task.id}: no verify commands configured`)}\n`);
      }
      return 0;
    }

    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    const execCwd = opts.execCwd ? path.resolve(opts.cwd, opts.execCwd) : resolved.gitRoot;
    if (!isPathWithin(resolved.gitRoot, execCwd)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `--cwd must stay under repo root: ${execCwd}`,
      });
    }

    const taskDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir, opts.taskId);
    const prDir = path.join(taskDir, "pr");
    const metaPath = path.join(prDir, "meta.json");

    let logPath: string | null = null;
    if (opts.logPath) {
      logPath = path.resolve(opts.cwd, opts.logPath);
      if (!isPathWithin(resolved.gitRoot, logPath)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `--log must stay under repo root: ${logPath}`,
        });
      }
    } else if (await fileExists(prDir)) {
      logPath = path.join(prDir, "verify.log");
    }

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const rawMeta = await readFile(metaPath, "utf8");
      meta = parsePrMeta(rawMeta, opts.taskId);
    }

    const headSha = await gitRevParse(execCwd, ["HEAD"]);
    const currentSha = headSha;

    if (opts.skipIfUnchanged) {
      const changed = await gitStatusChangedPaths({
        cwd: execCwd,
        rootOverride: opts.rootOverride,
      });
      if (changed.length > 0) {
        if (!opts.quiet) {
          process.stdout.write(
            `${warnMessage(`${task.id}: working tree is dirty; ignoring --skip-if-unchanged`)}\n`,
          );
        }
      } else {
        let lastVerifiedSha = meta?.last_verified_sha ?? null;
        if (!lastVerifiedSha && logPath && (await fileExists(logPath))) {
          const logText = await readFile(logPath, "utf8");
          lastVerifiedSha = extractLastVerifiedSha(logText);
        }
        if (lastVerifiedSha && lastVerifiedSha === currentSha) {
          const header = `[${nowIso()}] ℹ️ skipped (unchanged verified_sha=${currentSha})`;
          if (logPath) {
            await appendVerifyLog(logPath, header, "");
          }
          if (!opts.quiet) {
            process.stdout.write(
              `${infoMessage(
                `${task.id}: verify skipped (unchanged sha ${currentSha.slice(0, 12)})`,
              )}\n`,
            );
          }
          if (meta) {
            const nextMeta: PrMeta = {
              ...meta,
              last_verified_sha: currentSha,
              last_verified_at: nowIso(),
              verify: meta.verify ? { ...meta.verify, status: "pass" } : { status: "pass" },
            };
            await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
          }
          return 0;
        }
      }
    }

    for (const command of commands) {
      if (!opts.quiet) {
        process.stdout.write(`$ ${command}\n`);
      }
      const timestamp = nowIso();
      const result = await runShellCommand(command, execCwd);
      const shaPrefix = currentSha ? `sha=${currentSha} ` : "";
      const header = `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd();
      if (logPath) {
        await appendVerifyLog(logPath, header, result.output);
      }
      if (result.code !== 0) {
        throw new CliError({
          exitCode: result.code || 1,
          code: "E_IO",
          message: `Verify command failed: ${command}`,
        });
      }
    }

    if (currentSha) {
      const header = `[${nowIso()}] ✅ verified_sha=${currentSha}`;
      if (logPath) {
        await appendVerifyLog(logPath, header, "");
      }
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
    }

    if (meta) {
      const nextMeta: PrMeta = {
        ...meta,
        last_verified_sha: currentSha,
        last_verified_at: nowIso(),
        verify: meta.verify
          ? { ...meta.verify, status: "pass", command: commands.join(" && ") }
          : { status: "pass", command: commands.join(" && ") },
      };
      await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "verify", root: opts.rootOverride ?? null });
  }
}

async function cmdWorkStart(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  agent: string;
  slug: string;
  worktree: boolean;
}): Promise<number> {
  try {
    validateWorkAgent(opts.agent);
    validateWorkSlug(opts.slug);

    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    if (loaded.config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(loaded.config.workflow_mode, "branch_pr"),
      });
    }
    if (!opts.worktree) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(WORK_START_USAGE, WORK_START_USAGE_EXAMPLE),
      });
    }

    await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    const baseBranch = await getBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `work start must be run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    const prefix = loaded.config.branch.task_prefix;
    const branchName = `${prefix}/${opts.taskId}/${opts.slug.trim()}`;
    const worktreesDir = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
    if (!isPathWithin(resolved.gitRoot, worktreesDir)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
      });
    }
    const worktreePath = path.join(worktreesDir, `${opts.taskId}-${opts.slug.trim()}`);
    if (await fileExists(worktreePath)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Worktree path already exists: ${worktreePath}`,
      });
    }
    await mkdir(worktreesDir, { recursive: true });

    const branchExists = await gitBranchExists(resolved.gitRoot, branchName);
    const worktreeArgs = branchExists
      ? ["worktree", "add", worktreePath, branchName]
      : ["worktree", "add", "-b", branchName, worktreePath, baseBranch];
    await execFileAsync("git", worktreeArgs, { cwd: resolved.gitRoot, env: gitEnv() });

    process.stdout.write(
      `${successMessage(
        "work start",
        branchName,
        `worktree=${path.relative(resolved.gitRoot, worktreePath)}`,
      )}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "work start", root: opts.rootOverride ?? null });
  }
}

async function resolvePrPaths(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<{
  resolved: { gitRoot: string; agentplaneDir: string };
  config: AgentplaneConfig;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;
  reviewPath: string;
}> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const taskDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir, opts.taskId);
  const prDir = path.join(taskDir, "pr");
  return {
    resolved,
    config: loaded.config,
    prDir,
    metaPath: path.join(prDir, "meta.json"),
    diffstatPath: path.join(prDir, "diffstat.txt"),
    verifyLogPath: path.join(prDir, "verify.log"),
    reviewPath: path.join(prDir, "review.md"),
  };
}

async function cmdPrOpen(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    if (!author)
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
      });

    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, verifyLogPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    if (!branch)
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
      });

    await mkdir(prDir, { recursive: true });

    const now = nowIso();
    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const raw = await readFile(metaPath, "utf8");
      meta = parsePrMeta(raw, task.id);
    }
    const createdAt = meta?.created_at ?? now;
    const nextMeta: PrMeta = {
      schema_version: 1,
      task_id: task.id,
      branch,
      created_at: createdAt,
      updated_at: now,
      last_verified_sha: meta?.last_verified_sha ?? null,
      last_verified_at: meta?.last_verified_at ?? null,
      verify: meta?.verify ?? { status: "skipped" },
    };
    await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");

    if (!(await fileExists(diffstatPath))) await writeFile(diffstatPath, "", "utf8");
    if (!(await fileExists(verifyLogPath))) await writeFile(verifyLogPath, "", "utf8");
    if (!(await fileExists(reviewPath))) {
      const review = renderPrReviewTemplate({ author, createdAt, branch });
      await writeFile(reviewPath, review, "utf8");
    }

    process.stdout.write(`${successMessage("pr open", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}

async function cmdPrUpdate(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(metaPath)) || !(await fileExists(reviewPath))) {
      const missing: string[] = [];
      if (!(await fileExists(metaPath))) missing.push(path.relative(resolved.gitRoot, metaPath));
      if (!(await fileExists(reviewPath)))
        missing.push(path.relative(resolved.gitRoot, reviewPath));
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
      });
    }

    const baseBranch = await getBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const branch = await gitCurrentBranch(resolved.gitRoot);
    const { stdout: diffStatOut } = await execFileAsync(
      "git",
      ["diff", "--stat", `${baseBranch}...HEAD`],
      { cwd: resolved.gitRoot, env: gitEnv() },
    );
    const diffstat = diffStatOut.trimEnd();
    await writeFile(diffstatPath, diffstat ? `${diffstat}\n` : "", "utf8");

    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: resolved.gitRoot,
      env: gitEnv(),
    });
    const headSha = headOut.trim();
    const summaryLines = [
      `- Updated: ${nowIso()}`,
      `- Branch: ${branch}`,
      `- Head: ${headSha.slice(0, 12)}`,
      "- Diffstat:",
      "```",
      diffstat || "No changes detected.",
      "```",
    ];
    const reviewText = await readFile(reviewPath, "utf8");
    const nextReview = updateAutoSummaryBlock(reviewText, summaryLines.join("\n"));
    await writeFile(reviewPath, nextReview, "utf8");

    const rawMeta = await readFile(metaPath, "utf8");
    const meta = parsePrMeta(rawMeta, opts.taskId);
    const nextMeta: PrMeta = {
      ...meta,
      branch,
      updated_at: nowIso(),
      last_verified_sha: meta.last_verified_sha ?? null,
      last_verified_at: meta.last_verified_at ?? null,
    };
    await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");

    process.stdout.write(
      `${successMessage("pr update", path.relative(resolved.gitRoot, prDir))}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}

async function cmdPrCheck(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, verifyLogPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const errors: string[] = [];
    const relPrDir = path.relative(resolved.gitRoot, prDir);
    const relMetaPath = path.relative(resolved.gitRoot, metaPath);
    const relDiffstatPath = path.relative(resolved.gitRoot, diffstatPath);
    const relVerifyLogPath = path.relative(resolved.gitRoot, verifyLogPath);
    const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
    if (!(await fileExists(prDir))) errors.push(`Missing PR directory: ${relPrDir}`);
    if (!(await fileExists(metaPath))) errors.push(`Missing ${relMetaPath}`);
    if (!(await fileExists(diffstatPath))) errors.push(`Missing ${relDiffstatPath}`);
    if (!(await fileExists(verifyLogPath))) errors.push(`Missing ${relVerifyLogPath}`);
    if (!(await fileExists(reviewPath))) errors.push(`Missing ${relReviewPath}`);

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      try {
        meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(message);
      }
    }

    if (await fileExists(reviewPath)) {
      const review = await readFile(reviewPath, "utf8");
      const requiredSections = ["## Summary", "## Checklist", "## Handoff Notes"];
      for (const section of requiredSections) {
        if (!review.includes(section)) errors.push(`Missing section: ${section}`);
      }
      if (!review.includes("<!-- BEGIN AUTO SUMMARY -->")) {
        errors.push("Missing auto summary start marker");
      }
      if (!review.includes("<!-- END AUTO SUMMARY -->")) {
        errors.push("Missing auto summary end marker");
      }
    }

    if (task.verify && task.verify.length > 0) {
      if (meta?.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (!meta?.last_verified_sha || !meta.last_verified_at) {
        errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
      }
    }

    if (errors.length > 0) {
      throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
    }

    process.stdout.write(`${successMessage("pr check", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}

async function cmdPrNote(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    const body = opts.body.trim();
    if (!author || !body) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
      });
    }

    const { config, reviewPath, resolved } = await resolvePrPaths(opts);
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(reviewPath))) {
      const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Missing ${relReviewPath} (run \`agentplane pr open\`)`,
      });
    }

    const review = await readFile(reviewPath, "utf8");
    const updated = appendHandoffNote(review, `${author}: ${body}`);
    await writeFile(reviewPath, updated, "utf8");

    process.stdout.write(`${successMessage("pr note", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr note", root: opts.rootOverride ?? null });
  }
}

async function readPrArtifact(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
}): Promise<string | null> {
  const filePath = path.join(opts.prDir, opts.fileName);
  if (await fileExists(filePath)) {
    return await readFile(filePath, "utf8");
  }
  const rel = toGitPath(path.relative(opts.resolved.gitRoot, filePath));
  try {
    return await gitShowFile(opts.resolved.gitRoot, opts.branch, rel);
  } catch {
    return null;
  }
}

function validateReviewContents(review: string, errors: string[]): void {
  const requiredSections = ["## Summary", "## Checklist", "## Handoff Notes"];
  for (const section of requiredSections) {
    if (!review.includes(section)) errors.push(`Missing section: ${section}`);
  }
  if (!review.includes("<!-- BEGIN AUTO SUMMARY -->")) {
    errors.push("Missing auto summary start marker");
  }
  if (!review.includes("<!-- END AUTO SUMMARY -->")) {
    errors.push("Missing auto summary end marker");
  }
}

async function cmdIntegrate(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  base?: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
}): Promise<number> {
  let tempWorktreePath: string | null = null;
  let createdTempWorktree = false;
  try {
    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    if (loaded.config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(loaded.config.workflow_mode, "branch_pr"),
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    const baseBranch = (
      opts.base ?? (await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }))
    ).trim();
    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `integrate must run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    const { prDir, metaPath, diffstatPath, verifyLogPath } = await resolvePrPaths({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    let meta: PrMeta | null = null;
    let branch = (opts.branch ?? "").trim();
    if (await fileExists(metaPath)) {
      meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
      if (!branch) branch = (meta.branch ?? "").trim();
    }
    if (!branch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("branch", branch),
      });
    }

    const metaSource =
      meta ??
      parsePrMeta(
        await gitShowFile(
          resolved.gitRoot,
          branch,
          toGitPath(path.relative(resolved.gitRoot, metaPath)),
        ),
        task.id,
      );
    const baseCandidate =
      opts.base ?? (metaSource as Record<string, unknown>).base_branch ?? baseBranch;
    const base =
      typeof baseCandidate === "string" && baseCandidate.trim().length > 0
        ? baseCandidate.trim()
        : baseBranch;

    const errors: string[] = [];
    const relDiffstat = path.relative(resolved.gitRoot, path.join(prDir, "diffstat.txt"));
    const relVerifyLog = path.relative(resolved.gitRoot, path.join(prDir, "verify.log"));
    const relReview = path.relative(resolved.gitRoot, path.join(prDir, "review.md"));
    const diffstatText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "diffstat.txt",
      branch,
    });
    if (diffstatText === null) errors.push(`Missing ${relDiffstat}`);
    const verifyLogText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "verify.log",
      branch,
    });
    if (verifyLogText === null) errors.push(`Missing ${relVerifyLog}`);
    const reviewText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "review.md",
      branch,
    });
    if (reviewText === null) errors.push(`Missing ${relReview}`);
    if (reviewText) validateReviewContents(reviewText, errors);
    if (errors.length > 0) {
      throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
    }

    const changedPaths = await gitDiffNames(resolved.gitRoot, base, branch);
    const tasksPath = loaded.config.paths.tasks_path;
    if (changedPaths.includes(tasksPath)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Branch ${branch} modifies ${tasksPath} (single-writer violation)`,
      });
    }

    const rawVerify = task.verify;
    const verifyCommands = Array.isArray(rawVerify)
      ? rawVerify
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    let branchHeadSha = await gitRevParse(resolved.gitRoot, [branch]);
    let alreadyVerifiedSha: string | null = null;
    if (verifyCommands.length > 0) {
      const metaVerified = metaSource?.last_verified_sha ?? null;
      if (metaVerified && metaVerified === branchHeadSha) {
        alreadyVerifiedSha = branchHeadSha;
      } else if (verifyLogText) {
        const logSha = extractLastVerifiedSha(verifyLogText);
        if (logSha && logSha === branchHeadSha) alreadyVerifiedSha = logSha;
      }
    }
    let shouldRunVerify =
      opts.runVerify || (verifyCommands.length > 0 && alreadyVerifiedSha === null);

    if (opts.dryRun) {
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage(
            "integrate dry-run",
            task.id,
            `base=${base} branch=${branch} verify=${shouldRunVerify ? "yes" : "no"}`,
          )}\n`,
        );
      }
      return 0;
    }

    let worktreePath = await findWorktreeForBranch(resolved.gitRoot, branch);
    if (opts.mergeStrategy === "rebase" && !worktreePath) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "rebase strategy requires an existing worktree for the task branch",
      });
    }

    if (shouldRunVerify && !worktreePath) {
      const worktreesDir = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
      if (!isPathWithin(resolved.gitRoot, worktreesDir)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
        });
      }
      tempWorktreePath = path.join(worktreesDir, `_integrate_tmp_${task.id}`);
      const tempExists = await fileExists(tempWorktreePath);
      if (tempExists) {
        const registered = await findWorktreeForBranch(resolved.gitRoot, branch);
        if (!registered) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Temp worktree path exists but is not registered: ${tempWorktreePath}`,
          });
        }
      } else {
        await mkdir(worktreesDir, { recursive: true });
        await execFileAsync("git", ["worktree", "add", tempWorktreePath, branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        createdTempWorktree = true;
      }
      worktreePath = tempWorktreePath;
    }

    const verifyEntries: { header: string; content: string }[] = [];
    if (opts.mergeStrategy !== "rebase" && shouldRunVerify && verifyCommands.length > 0) {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Unable to locate or create a worktree for verify execution",
        });
      }
      for (const command of verifyCommands) {
        if (!opts.quiet) process.stdout.write(`$ ${command}\n`);
        const timestamp = nowIso();
        const result = await runShellCommand(command, worktreePath);
        const shaPrefix = branchHeadSha ? `sha=${branchHeadSha} ` : "";
        verifyEntries.push({
          header: `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd(),
          content: result.output,
        });
        if (result.code !== 0) {
          throw new CliError({
            exitCode: result.code || 1,
            code: "E_IO",
            message: `Verify command failed: ${command}`,
          });
        }
      }
      if (branchHeadSha) {
        verifyEntries.push({
          header: `[${nowIso()}] ✅ verified_sha=${branchHeadSha}`,
          content: "",
        });
      }
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
      }
    }

    const baseShaBeforeMerge = await gitRevParse(resolved.gitRoot, [base]);
    const headBeforeMerge = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    let mergeHash = "";

    if (opts.mergeStrategy === "squash") {
      try {
        await execFileAsync("git", ["merge", "--squash", branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        const message = err instanceof Error ? err.message : "git merge --squash failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      const { stdout: staged } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
      if (!staged.trim()) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Nothing to integrate: ${branch} is already merged into ${base}`,
        });
      }
      const { stdout: subjectOut } = await execFileAsync(
        "git",
        ["log", "-1", "--pretty=format:%s", branch],
        { cwd: resolved.gitRoot, env: gitEnv() },
      );
      let subject = subjectOut.trim();
      if (!subject.includes(task.id)) {
        subject = `🧩 ${task.id} integrate ${branch}`;
      }
      const env = {
        ...process.env,
        AGENT_PLANE_TASK_ID: task.id,
        AGENT_PLANE_ALLOW_BASE: "1",
        AGENT_PLANE_ALLOW_TASKS: "0",
      };
      try {
        await execFileAsync("git", ["commit", "-m", subject], {
          cwd: resolved.gitRoot,
          env,
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        const message = err instanceof Error ? err.message : "git commit failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    } else if (opts.mergeStrategy === "merge") {
      const env = {
        ...process.env,
        AGENT_PLANE_TASK_ID: task.id,
        AGENT_PLANE_ALLOW_BASE: "1",
        AGENT_PLANE_ALLOW_TASKS: "0",
      };
      try {
        await execFileAsync(
          "git",
          ["merge", "--no-ff", branch, "-m", `🔀 ${task.id} merge ${branch}`],
          {
            cwd: resolved.gitRoot,
            env,
          },
        );
      } catch (err) {
        await execFileAsync("git", ["merge", "--abort"], { cwd: resolved.gitRoot, env: gitEnv() });
        const message = err instanceof Error ? err.message : "git merge failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    } else {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "rebase strategy requires an existing worktree for the task branch",
        });
      }
      try {
        await execFileAsync("git", ["rebase", base], { cwd: worktreePath, env: gitEnv() });
      } catch (err) {
        await execFileAsync("git", ["rebase", "--abort"], { cwd: worktreePath, env: gitEnv() });
        const message = err instanceof Error ? err.message : "git rebase failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      branchHeadSha = await gitRevParse(resolved.gitRoot, [branch]);
      if (!opts.runVerify && verifyCommands.length > 0) {
        alreadyVerifiedSha = null;
        const metaVerified = metaSource?.last_verified_sha ?? null;
        if (metaVerified && metaVerified === branchHeadSha) {
          alreadyVerifiedSha = branchHeadSha;
        } else if (verifyLogText) {
          const logSha = extractLastVerifiedSha(verifyLogText);
          if (logSha && logSha === branchHeadSha) alreadyVerifiedSha = logSha;
        }
        shouldRunVerify = alreadyVerifiedSha === null;
      }
      if (shouldRunVerify && verifyCommands.length > 0) {
        if (!worktreePath) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Unable to locate or create a worktree for verify execution",
          });
        }
        for (const command of verifyCommands) {
          if (!opts.quiet) process.stdout.write(`$ ${command}\n`);
          const timestamp = nowIso();
          const result = await runShellCommand(command, worktreePath);
          const shaPrefix = branchHeadSha ? `sha=${branchHeadSha} ` : "";
          verifyEntries.push({
            header: `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd(),
            content: result.output,
          });
          if (result.code !== 0) {
            throw new CliError({
              exitCode: result.code || 1,
              code: "E_IO",
              message: `Verify command failed: ${command}`,
            });
          }
        }
        if (branchHeadSha) {
          verifyEntries.push({
            header: `[${nowIso()}] ✅ verified_sha=${branchHeadSha}`,
            content: "",
          });
        }
        if (!opts.quiet) {
          process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
        }
      }
      try {
        await execFileAsync("git", ["merge", "--ff-only", branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        }).catch(() => null);
        const message = err instanceof Error ? err.message : "git merge --ff-only failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    }

    if (!(await fileExists(prDir))) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Missing PR artifact dir after merge: ${path.relative(resolved.gitRoot, prDir)}`,
      });
    }

    if (verifyEntries.length > 0) {
      for (const entry of verifyEntries) {
        await appendVerifyLog(verifyLogPath, entry.header, entry.content);
      }
    }

    const rawMeta = await readFile(metaPath, "utf8");
    const mergedMeta = parsePrMeta(rawMeta, task.id);
    const now = nowIso();
    const nextMeta: Record<string, unknown> = {
      ...mergedMeta,
      branch,
      base_branch: base,
      merge_strategy: opts.mergeStrategy,
      status: "MERGED",
      merged_at: (mergedMeta as Record<string, unknown>).merged_at ?? now,
      merge_commit: mergeHash,
      head_sha: branchHeadSha,
      updated_at: now,
    };
    if (verifyCommands.length > 0 && (shouldRunVerify || alreadyVerifiedSha)) {
      nextMeta.last_verified_sha = branchHeadSha;
      nextMeta.last_verified_at = now;
      nextMeta.verify = mergedMeta.verify
        ? { ...mergedMeta.verify, status: "pass" }
        : { status: "pass", command: verifyCommands.join(" && ") };
    }
    await writeFile(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`, "utf8");

    const diffstat = await gitDiffStat(resolved.gitRoot, baseShaBeforeMerge, branch);
    await writeFile(diffstatPath, diffstat ? `${diffstat}\n` : "", "utf8");

    const verifyDesc =
      verifyCommands.length === 0
        ? "skipped(no commands)"
        : shouldRunVerify
          ? "ran"
          : alreadyVerifiedSha
            ? `skipped(already verified_sha=${alreadyVerifiedSha})`
            : "skipped";
    const finishBody = `Verified: Integrated via ${opts.mergeStrategy}; verify=${verifyDesc}; pr=${path.relative(
      resolved.gitRoot,
      prDir,
    )}.`;
    await cmdFinish({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskIds: [task.id],
      author: "INTEGRATOR",
      body: finishBody,
      commit: undefined,
      skipVerify: false,
      force: false,
      noRequireTaskIdInCommit: false,
      commitFromComment: false,
      commitEmoji: undefined,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitEmoji: undefined,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: opts.quiet,
    });

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("integrate", task.id, `merge=${mergeHash.slice(0, 12)}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "integrate", root: opts.rootOverride ?? null });
  } finally {
    if (createdTempWorktree && tempWorktreePath) {
      try {
        await execFileAsync("git", ["worktree", "remove", "--force", tempWorktreePath], {
          cwd: opts.cwd,
          env: gitEnv(),
        });
      } catch {
        // ignore cleanup errors
      }
    }
  }
}

async function cmdCleanupMerged(opts: {
  cwd: string;
  rootOverride?: string;
  base?: string;
  yes: boolean;
  archive: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    if (loaded.config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(loaded.config.workflow_mode, "branch_pr"),
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    const baseBranch = (
      opts.base ?? (await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }))
    ).trim();
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(CLEANUP_MERGED_USAGE, CLEANUP_MERGED_USAGE_EXAMPLE),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, baseBranch))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: unknownEntityMessage("base branch", baseBranch),
      });
    }

    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `cleanup merged must run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    const repoRoot = await resolvePathFallback(resolved.gitRoot);

    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const tasks = await backend.listTasks();
    const tasksById = new Map(tasks.map((task) => [task.id, task]));
    const prefix = loaded.config.branch.task_prefix;
    const branches = await gitListTaskBranches(resolved.gitRoot, prefix);

    const candidates: { taskId: string; branch: string; worktreePath: string | null }[] = [];
    for (const branch of branches) {
      if (branch === baseBranch) continue;
      const taskId = parseTaskIdFromBranch(prefix, branch);
      if (!taskId) continue;
      const task = tasksById.get(taskId);
      if (!task) continue;
      const status = String(task.status || "").toUpperCase();
      if (status !== "DONE") continue;
      const diff = await gitDiffNames(resolved.gitRoot, baseBranch, branch);
      if (diff.length > 0) continue;
      const worktreePath = await findWorktreeForBranch(resolved.gitRoot, branch);
      candidates.push({ taskId, branch, worktreePath });
    }

    const sortedCandidates = candidates.toSorted((a, b) => a.taskId.localeCompare(b.taskId));

    if (!opts.quiet) {
      const archiveLabel = opts.archive ? " archive=on" : "";
      process.stdout.write(`cleanup merged (base=${baseBranch}${archiveLabel})\n`);
      if (sortedCandidates.length === 0) {
        process.stdout.write("no candidates\n");
        return 0;
      }
      for (const item of sortedCandidates) {
        process.stdout.write(
          `- ${item.taskId}: branch=${item.branch} worktree=${item.worktreePath ?? "-"}\n`,
        );
      }
    }

    if (!opts.yes) {
      if (!opts.quiet) {
        process.stdout.write("Re-run with --yes to delete these branches/worktrees.\n");
      }
      return 0;
    }

    for (const item of sortedCandidates) {
      const worktreePath = item.worktreePath ? await resolvePathFallback(item.worktreePath) : null;
      if (worktreePath) {
        if (!isPathWithin(repoRoot, worktreePath)) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Refusing to remove worktree outside repo: ${worktreePath}`,
          });
        }
        if (worktreePath === repoRoot) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: "Refusing to remove the current worktree",
          });
        }
      }

      if (opts.archive) {
        const taskDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir, item.taskId);
        await archivePrArtifacts(taskDir);
      }

      if (worktreePath) {
        await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      }
      await execFileAsync("git", ["branch", "-D", item.branch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
    }

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("cleanup merged", undefined, `deleted=${candidates.length}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "cleanup merged", root: opts.rootOverride ?? null });
  }
}

async function cmdHooksInstall(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const hooksDir = await resolveGitHooksDir(resolved.gitRoot);
    await mkdir(hooksDir, { recursive: true });
    await mkdir(resolved.agentplaneDir, { recursive: true });
    await ensureShim(resolved.agentplaneDir, resolved.gitRoot);

    for (const hook of HOOK_NAMES) {
      const hookPath = path.join(hooksDir, hook);
      if (await fileExists(hookPath)) {
        const managed = await fileIsManaged(hookPath, HOOK_MARKER);
        if (!managed) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Refusing to overwrite existing hook: ${path.relative(resolved.gitRoot, hookPath)}`,
          });
        }
      }
      await writeFile(hookPath, hookScriptText(hook), "utf8");
      await chmod(hookPath, 0o755);
    }

    if (!opts.quiet) {
      process.stdout.write(`${path.relative(resolved.gitRoot, hooksDir)}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "hooks install", root: opts.rootOverride ?? null });
  }
}

async function cmdHooksUninstall(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const hooksDir = await resolveGitHooksDir(resolved.gitRoot);
    let removed = 0;
    for (const hook of HOOK_NAMES) {
      const hookPath = path.join(hooksDir, hook);
      if (!(await fileExists(hookPath))) continue;
      const managed = await fileIsManaged(hookPath, HOOK_MARKER);
      if (!managed) continue;
      await rm(hookPath, { force: true });
      removed++;
    }
    if (!opts.quiet) {
      process.stdout.write(
        removed > 0
          ? `${successMessage("removed hooks", undefined, `count=${removed}`)}\n`
          : `${infoMessage("no agentplane hooks found")}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "hooks uninstall", root: opts.rootOverride ?? null });
  }
}

async function cmdHooksRun(opts: {
  cwd: string;
  rootOverride?: string;
  hook: (typeof HOOK_NAMES)[number];
  args: string[];
}): Promise<number> {
  try {
    if (opts.hook === "commit-msg") {
      const messagePath = opts.args[0];
      if (!messagePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Missing commit message file path",
        });
      }
      const raw = await readFile(messagePath, "utf8");
      const subject = readCommitSubject(raw);
      if (!subject) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "Commit message subject is empty",
        });
      }
      const taskId = (process.env.AGENT_PLANE_TASK_ID ?? "").trim();
      if (taskId) {
        const suffix = taskId.split("-").at(-1) ?? "";
        if (!subject.includes(taskId) && (suffix.length === 0 || !subject.includes(suffix))) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: "Commit subject must include task id or suffix",
          });
        }
        return 0;
      }

      const { backend } = await loadTaskBackend({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const tasks = await backend.listTasks();
      const suffixes = tasks.map((task) => task.id.split("-").at(-1) ?? "").filter(Boolean);
      if (suffixes.length === 0) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "No task IDs available to validate commit subject",
        });
      }
      if (!subjectHasSuffix(subject, suffixes)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "Commit subject must mention a task suffix",
        });
      }
      return 0;
    }

    if (opts.hook === "pre-commit") {
      const staged = await getStagedFiles({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      if (staged.length === 0) return 0;
      const allowTasks = (process.env.AGENT_PLANE_ALLOW_TASKS ?? "").trim() === "1";
      const allowBase = (process.env.AGENT_PLANE_ALLOW_BASE ?? "").trim() === "1";

      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const loaded = await loadConfig(resolved.agentplaneDir);
      const tasksPath = loaded.config.paths.tasks_path;
      const tasksStaged = staged.includes(tasksPath);
      const nonTasks = staged.filter((entry: string) => entry !== tasksPath);

      if (tasksStaged && !allowTasks) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `${tasksPath} is protected by agentplane hooks (set AGENT_PLANE_ALLOW_TASKS=1 to override)`,
        });
      }

      if (loaded.config.workflow_mode === "branch_pr") {
        const baseBranch = await getBaseBranch({
          cwd: opts.cwd,
          rootOverride: opts.rootOverride ?? null,
        });
        const currentBranch = await gitCurrentBranch(resolved.gitRoot);
        if (tasksStaged && currentBranch !== baseBranch) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `${tasksPath} commits are allowed only on ${baseBranch} in branch_pr mode`,
          });
        }
        if (nonTasks.length > 0 && currentBranch === baseBranch && !allowBase) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Code commits are forbidden on ${baseBranch} in branch_pr mode`,
          });
        }
      }
      return 0;
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: `hooks run ${opts.hook}`,
      root: opts.rootOverride ?? null,
    });
  }
}

async function cmdBranchBaseGet(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const value = await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    process.stdout.write(`${value}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base get", root: opts.rootOverride ?? null });
  }
}

async function cmdBranchBaseSet(opts: {
  cwd: string;
  rootOverride?: string;
  value: string;
}): Promise<number> {
  const trimmed = opts.value.trim();
  if (trimmed.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(BRANCH_BASE_USAGE, BRANCH_BASE_USAGE_EXAMPLE),
    });
  }
  try {
    const value = await setPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      value: trimmed,
    });
    process.stdout.write(`${value}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base set", root: opts.rootOverride ?? null });
  }
}

async function cmdBranchStatus(opts: {
  cwd: string;
  rootOverride?: string;
  branch?: string;
  base?: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    const base = (
      opts.base ?? (await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }))
    ).trim();
    if (!branch || !base) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(BRANCH_STATUS_USAGE, BRANCH_STATUS_USAGE_EXAMPLE),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("branch", branch),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, base))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("base branch", base),
      });
    }

    const taskId = parseTaskIdFromBranch(loaded.config.branch.task_prefix, branch);
    const worktree = await findWorktreeForBranch(resolved.gitRoot, branch);
    const { ahead, behind } = await gitAheadBehind(resolved.gitRoot, base, branch);

    process.stdout.write(
      `branch=${branch} base=${base} ahead=${ahead} behind=${behind} task_id=${taskId ?? "-"}\n`,
    );
    if (worktree) {
      process.stdout.write(`worktree=${worktree}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "branch status", root: opts.rootOverride ?? null });
  }
}

async function cmdBranchRemove(opts: {
  cwd: string;
  rootOverride?: string;
  branch?: string;
  worktree?: string;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  const branch = (opts.branch ?? "").trim();
  const worktree = (opts.worktree ?? "").trim();
  if (!branch && !worktree) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(BRANCH_REMOVE_USAGE, BRANCH_REMOVE_USAGE_EXAMPLE),
    });
  }
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);

    if (worktree) {
      const worktreePath = path.isAbsolute(worktree)
        ? await resolvePathFallback(worktree)
        : await resolvePathFallback(path.join(resolved.gitRoot, worktree));
      const worktreesRoot = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
      if (!isPathWithin(worktreesRoot, worktreePath)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Refusing to remove worktree outside ${worktreesRoot}: ${worktreePath}`,
        });
      }
      await execFileAsync(
        "git",
        ["worktree", "remove", ...(opts.force ? ["--force"] : []), worktreePath],
        { cwd: resolved.gitRoot, env: gitEnv() },
      );
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("removed worktree", worktreePath)}\n`);
      }
    }

    if (branch) {
      if (!(await gitBranchExists(resolved.gitRoot, branch))) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: unknownEntityMessage("branch", branch),
        });
      }
      await execFileAsync("git", ["branch", opts.force ? "-D" : "-d", branch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("removed branch", branch)}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "branch remove", root: opts.rootOverride ?? null });
  }
}

function escapeRegExp(text: string): string {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\\$&`);
}

function setMarkdownSection(body: string, section: string, text: string): string {
  const lines = body.replaceAll("\r\n", "\n").split("\n");
  const headingRe = new RegExp(String.raw`^##\\s+${escapeRegExp(section)}\\s*$`);

  let start = -1;
  let nextHeading = lines.length;

  for (const [i, line] of lines.entries()) {
    if (!line.startsWith("## ")) continue;
    if (start === -1) {
      if (headingRe.test(line)) start = i;
      continue;
    }
    nextHeading = i;
    break;
  }

  const newTextLines = text.replaceAll("\r\n", "\n").split("\n");
  const replacement = ["", ...newTextLines, ""];

  if (start === -1) {
    const out = [...lines];
    if (out.length > 0 && out.at(-1)?.trim() !== "") out.push("");
    out.push(`## ${section}`, ...replacement);
    return `${out.join("\n")}\n`;
  }

  const out = [...lines.slice(0, start + 1), ...replacement, ...lines.slice(nextHeading)];
  return `${out.join("\n")}\n`;
}

function normalizeDocSectionName(section: string): string {
  return section.trim().replaceAll(/\s+/g, " ").toLowerCase();
}

function normalizeDocSections(doc: string, required: string[]): string {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  const pendingSeparator = new Set<string>();
  let currentKey: string | null = null;

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        const existing = sections.get(key);
        if (existing) {
          if (existing.lines.some((entry) => entry.trim() !== "")) {
            pendingSeparator.add(key);
          }
        } else {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (!entry) continue;
      if (pendingSeparator.has(currentKey) && line.trim() !== "") {
        entry.lines.push("");
        pendingSeparator.delete(currentKey);
      }
      entry.lines.push(line);
    }
  }

  const out: string[] = [];
  const seen = new Set(order);

  for (const key of order) {
    const section = sections.get(key);
    if (!section) continue;
    out.push(`## ${section.title}`);
    if (section.lines.length > 0) {
      out.push(...section.lines);
    } else {
      out.push("");
    }
    out.push("");
  }

  for (const requiredSection of required) {
    const requiredKey = normalizeDocSectionName(requiredSection);
    if (seen.has(requiredKey)) continue;
    out.push(`## ${requiredSection}`, "", "");
  }

  return `${out.join("\n").trimEnd()}\n`;
}

function ensureDocSections(doc: string, required: string[]): string {
  const trimmed = doc.trim();
  if (!trimmed) {
    const blocks = required.map((section) => `## ${section}\n`);
    return `${blocks.join("\n").trimEnd()}\n`;
  }
  return normalizeDocSections(doc, required);
}

function parseDocSections(doc: string): {
  sections: Map<string, { title: string; lines: string[] }>;
  order: string[];
} {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  let currentKey: string | null = null;
  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        if (!sections.has(key)) {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (entry) entry.lines.push(line);
    }
  }
  return { sections, order };
}

function taskDataToFrontmatter(task: TaskData): Record<string, unknown> {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    owner: task.owner,
    depends_on: task.depends_on ?? [],
    tags: task.tags ?? [],
    verify: task.verify ?? [],
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
  };
}

async function loadBackendTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<{
  backend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  resolved: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
  task: TaskData;
}> {
  const { backend, backendId, resolved, config } = await loadTaskBackend({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const task = await backend.getTask(opts.taskId);
  if (!task) {
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    const readmePath = path.join(tasksDir, opts.taskId, "README.md");
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `ENOENT: no such file or directory, open '${readmePath}'`,
    });
  }
  return { backend, backendId, resolved, config, task };
}

const TASK_DOC_SET_USAGE =
  "Usage: agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>)";
const TASK_DOC_SET_USAGE_EXAMPLE =
  'agentplane task doc set 202602030608-F1Q8AB --section Summary --text "..."';
const TASK_DOC_SHOW_USAGE =
  "Usage: agentplane task doc show <task-id> [--section <name>] [--quiet]";
const TASK_DOC_SHOW_USAGE_EXAMPLE =
  "agentplane task doc show 202602030608-F1Q8AB --section Summary";

type TaskDocSetFlags = {
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
};

type TaskDocShowFlags = {
  section?: string;
  quiet: boolean;
};

function parseTaskDocShowFlags(args: string[]): TaskDocShowFlags {
  const out: TaskDocShowFlags = { quiet: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--section") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
      }
      out.section = next;
      i++;
      continue;
    }
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
  }
  return out;
}

function parseTaskDocSetFlags(args: string[]): TaskDocSetFlags {
  const out: TaskDocSetFlags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }

    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }

    switch (arg) {
      case "--section": {
        out.section = next;
        break;
      }
      case "--text": {
        out.text = next;
        break;
      }
      case "--file": {
        out.file = next;
        break;
      }
      case "--updated-by": {
        out.updatedBy = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

async function cmdTaskDocSet(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocSetFlags(opts.args);

  if (!flags.section) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  const hasText = flags.text !== undefined;
  const hasFile = flags.file !== undefined;
  if (hasText === hasFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  const updatedBy = (flags.updatedBy ?? "agentplane").trim();
  if (updatedBy.length === 0) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "--updated-by must be non-empty" });
  }

  let text = flags.text ?? "";
  if (hasFile) {
    try {
      text = await readFile(path.resolve(opts.cwd, flags.file ?? ""), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "task doc set", filePath: flags.file ?? "" });
    }
  }

  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (!backend.getTaskDoc || !backend.setTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const allowed = config.tasks.doc.sections;
    if (!allowed.includes(flags.section)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("doc section", flags.section),
      });
    }
    const normalizedAllowed = new Set(allowed.map((section) => normalizeDocSectionName(section)));
    const targetKey = normalizeDocSectionName(flags.section);
    const headingKeys = new Set<string>();
    for (const line of text.replaceAll("\r\n", "\n").split("\n")) {
      const match = /^##\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const key = normalizeDocSectionName(match[1] ?? "");
      if (key && normalizedAllowed.has(key)) headingKeys.add(key);
    }
    const existing = await backend.getTaskDoc(opts.taskId);
    const baseDoc = ensureDocSections(existing ?? "", config.tasks.doc.required_sections);
    if (headingKeys.size > 0 && (headingKeys.size > 1 || !headingKeys.has(targetKey))) {
      const fullDoc = ensureDocSections(text, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, fullDoc, updatedBy);
    } else {
      let nextText = text;
      if (headingKeys.size > 0 && headingKeys.has(targetKey)) {
        const lines = nextText.replaceAll("\r\n", "\n").split("\n");
        let firstContent = 0;
        while (firstContent < lines.length && lines[firstContent]?.trim() === "") firstContent++;
        const headingRe = new RegExp(String.raw`^##\s+${escapeRegExp(flags.section)}\s*$`);
        if (headingRe.test(lines[firstContent]?.trim() ?? "")) {
          lines.splice(firstContent, 1);
          if (lines[firstContent]?.trim() === "") lines.splice(firstContent, 1);
          nextText = lines.join("\n");
        }
      }
      const nextDoc = setMarkdownSection(baseDoc, flags.section, nextText);
      const normalized = ensureDocSections(nextDoc, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, normalized, updatedBy);
    }
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    process.stdout.write(`${path.join(tasksDir, opts.taskId, "README.md")}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc set", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskDocShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocShowFlags(opts.args);
  try {
    const { backend } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (!backend.getTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const doc = (await backend.getTaskDoc(opts.taskId)) ?? "";
    if (flags.section) {
      const sectionKey = normalizeDocSectionName(flags.section);
      const { sections } = parseDocSections(doc);
      const entry = sections.get(sectionKey);
      const content = entry?.lines ?? [];
      if (content.length > 0) {
        process.stdout.write(`${content.join("\n").trimEnd()}\n`);
        return 0;
      }
      if (!flags.quiet) {
        process.stdout.write(`${infoMessage(`section has no content: ${flags.section}`)}\n`);
      }
      return 0;
    }
    if (doc.trim()) {
      process.stdout.write(`${doc.trimEnd()}\n`);
      return 0;
    }
    if (!flags.quiet) {
      process.stdout.write(`${infoMessage("task doc metadata missing")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc show", root: opts.rootOverride ?? null });
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
      if (command && !command.startsWith("--")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
        });
      }
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
        const [subcommand, value] = args;
        if (subcommand === "get") {
          return await cmdBranchBaseGet({ cwd: process.cwd(), rootOverride: globals.root });
        }
        if (subcommand === "set") {
          if (!value) {
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
          });
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

      if (!agent || !slug || !worktree) {
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
        taskId = process.env.AGENT_PLANE_TASK_ID ?? "";
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
        taskId = process.env.AGENT_PLANE_TASK_ID ?? "";
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
        const envTaskId = process.env.AGENT_PLANE_TASK_ID ?? "";
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
        taskId = process.env.AGENT_PLANE_TASK_ID ?? "";
      }
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
        });
      }

      let cwdOverride: string | undefined;
      let logPath: string | undefined;
      let skipIfUnchanged = false;
      let quiet = false;
      let require = false;

      for (let i = 0; i < verifyArgs.length; i++) {
        const arg = verifyArgs[i];
        if (!arg) continue;
        if (arg === "--cwd") {
          const next = verifyArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
            });
          cwdOverride = next;
          i++;
          continue;
        }
        if (arg === "--log") {
          const next = verifyArgs[i + 1];
          if (!next)
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
            });
          logPath = next;
          i++;
          continue;
        }
        if (arg === "--skip-if-unchanged") {
          skipIfUnchanged = true;
          continue;
        }
        if (arg === "--quiet") {
          quiet = true;
          continue;
        }
        if (arg === "--require") {
          require = true;
          continue;
        }
        if (arg.startsWith("--")) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(VERIFY_USAGE, VERIFY_USAGE_EXAMPLE),
          });
        }
      }

      return await cmdVerify({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        execCwd: cwdOverride,
        logPath,
        skipIfUnchanged,
        quiet,
        require,
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
          if (!next)
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
      const subcommand = command;
      if (!subcommand) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
        });
      }
      if (subcommand === "list") {
        if (args.length > 0) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
          });
        }
        return await cmdScenarioList({ cwd: process.cwd(), rootOverride: globals.root });
      }
      if (subcommand === "info") {
        if (args.length !== 1) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(SCENARIO_INFO_USAGE, SCENARIO_INFO_USAGE_EXAMPLE),
          });
        }
        return await cmdScenarioInfo({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      if (subcommand === "run") {
        if (args.length !== 1) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(SCENARIO_RUN_USAGE, SCENARIO_RUN_USAGE_EXAMPLE),
          });
        }
        return await cmdScenarioRun({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(SCENARIO_USAGE, SCENARIO_USAGE_EXAMPLE),
      });
    }

    if (namespace === "recipe" || namespace === "recipes") {
      const subcommand = command;
      if (!subcommand) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
        });
      }
      if (subcommand === "list") {
        return await cmdRecipeList({
          cwd: process.cwd(),
          rootOverride: globals.root,
          args,
        });
      }
      if (subcommand === "list-remote") {
        return await cmdRecipeListRemote({
          cwd: process.cwd(),
          rootOverride: globals.root,
          args,
        });
      }
      if (subcommand === "info") {
        if (args.length !== 1) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(RECIPE_INFO_USAGE, RECIPE_INFO_USAGE_EXAMPLE),
          });
        }
        return await cmdRecipeInfo({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      if (subcommand === "explain") {
        if (args.length !== 1) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(RECIPE_EXPLAIN_USAGE, RECIPE_EXPLAIN_USAGE_EXAMPLE),
          });
        }
        return await cmdRecipeExplain({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      if (subcommand === "install") {
        const parsed = parseRecipeInstallArgs(args);
        return await cmdRecipeInstall({
          cwd: process.cwd(),
          rootOverride: globals.root,
          source: parsed.source,
          index: parsed.index,
          refresh: parsed.refresh,
          onConflict: parsed.onConflict,
        });
      }
      if (subcommand === "remove") {
        if (args.length !== 1) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(RECIPE_REMOVE_USAGE, RECIPE_REMOVE_USAGE_EXAMPLE),
          });
        }
        return await cmdRecipeRemove({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      if (subcommand === "cache") {
        const cacheSub = args[0];
        const cacheArgs = args.slice(1);
        if (!cacheSub) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: usageMessage(RECIPE_CACHE_USAGE, RECIPE_CACHE_USAGE_EXAMPLE),
          });
        }
        if (cacheSub === "prune") {
          return await cmdRecipeCachePrune({
            cwd: process.cwd(),
            rootOverride: globals.root,
            args: cacheArgs,
          });
        }
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(RECIPE_CACHE_USAGE, RECIPE_CACHE_USAGE_EXAMPLE),
        });
      }
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(RECIPE_USAGE, RECIPE_USAGE_EXAMPLE),
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
