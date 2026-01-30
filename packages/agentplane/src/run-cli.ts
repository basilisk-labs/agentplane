import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  chmod,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rename,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { promisify } from "node:util";

import {
  defaultConfig,
  extractTaskSuffix,
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
} from "@agentplane/core";

import { BUNDLED_RECIPES_CATALOG } from "./bundled-recipes.js";
import { renderHelp } from "./help.js";
import { formatCommentBodyForCommit } from "./comment-format.js";
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
  root?: string;
  jsonErrors: boolean;
};

function parseGlobalArgs(argv: string[]): { globals: ParsedArgs; rest: string[] } {
  let help = false;
  let version = false;
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
    if (arg === "--json") {
      jsonErrors = true;
      continue;
    }
    if (arg === "--root") {
      const next = argv[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --root" });
      root = next;
      i++;
      continue;
    }
    rest.push(arg);
  }
  return { globals: { help, version, root, jsonErrors }, rest };
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
  switch (err.code) {
    case "E_USAGE": {
      return "Run `agentplane --help` for usage.";
    }
    case "E_GIT": {
      return "Run inside a git repository or pass --root <path>.";
    }
    case "E_NETWORK": {
      return "Check network connectivity and credentials.";
    }
    case "E_BACKEND": {
      return "Check backend configuration in .agentplane/backends.";
    }
    default: {
      return undefined;
    }
  }
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

const DEFAULT_AGENTS_MD = [
  "# AGENTS",
  "",
  "This file defines the operating rules for Codex inside your repo.",
  "Edit this file to update agent behavior and workflow constraints.",
  "",
  "## Instructions",
  "",
  "- Keep work local to this repo.",
  "- Use agentplane for task operations and commits.",
  "- Record every task with Summary, Scope, Risks, Verify Steps, Rollback Plan.",
  "",
].join("\n");

type InitFlags = {
  ide?: "none" | "cursor" | "windsurf" | "both";
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
  "Usage: agentplane recipes <list|info|install|remove|list-remote|cache> [args]";
const RECIPE_INFO_USAGE = "Usage: agentplane recipes info <id>";
const RECIPE_INSTALL_USAGE =
  "Usage: agentplane recipes install --name <id> [--index <path|url>] [--refresh] | --path <path> | --url <url>";
const RECIPE_REMOVE_USAGE = "Usage: agentplane recipes remove <id>";
const RECIPE_CACHE_USAGE = "Usage: agentplane recipes cache <prune> [args]";
const RECIPE_CACHE_PRUNE_USAGE = "Usage: agentplane recipes cache prune [--dry-run] [--all]";
const RECIPE_LIST_REMOTE_USAGE =
  "Usage: agentplane recipes list-remote [--refresh] [--index <path|url>]";
const DEFAULT_RECIPES_INDEX_URL =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";
const RECIPE_CONFLICT_MODES = ["fail", "rename", "overwrite"] as const;
const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";
const GLOBAL_RECIPES_DIR_NAME = "recipes";
const PROJECT_RECIPES_CACHE_DIR_NAME = "recipes-cache";
const SCENARIO_USAGE = "Usage: agentplane scenario <list|info|run> [args]";
const SCENARIO_INFO_USAGE = "Usage: agentplane scenario info <recipe:scenario>";
const SCENARIO_RUN_USAGE = "Usage: agentplane scenario run <recipe:scenario>";
const BACKEND_SYNC_USAGE =
  "Usage: agentplane backend sync <id> --direction <push|pull> [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
const SYNC_USAGE =
  "Usage: agentplane sync [<id>] [--direction <push|pull>] [--conflict <diff|prefer-local|prefer-remote|fail>] [--yes] [--quiet]";
const READY_USAGE = "Usage: agentplane ready <task-id>";
const ROLE_USAGE = "Usage: agentplane role <role>";
const AGENTS_USAGE = "Usage: agentplane agents";
const BRANCH_BASE_USAGE = "Usage: agentplane branch base get|set <name>";
const BRANCH_STATUS_USAGE = "Usage: agentplane branch status [--branch <name>] [--base <name>]";
const BRANCH_REMOVE_USAGE =
  "Usage: agentplane branch remove [--branch <name>] [--worktree <path>] [--force] [--quiet]";
const UPGRADE_USAGE =
  "Usage: agentplane upgrade [--tag <tag>] [--dry-run] [--no-backup] [--source <repo-url>] [--bundle <path|url>] [--checksum <path|url>]";
const DEFAULT_UPGRADE_ASSET = "agentplane-upgrade.tar.gz";
const DEFAULT_UPGRADE_CHECKSUM_ASSET = `${DEFAULT_UPGRADE_ASSET}.sha256`;

function parseBooleanFlag(value: string, flag: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Invalid value for ${flag}: ${value}`,
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
    }
    switch (arg) {
      case "--ide": {
        const normalized = next.trim().toLowerCase();
        if (
          normalized !== "none" &&
          normalized !== "cursor" &&
          normalized !== "windsurf" &&
          normalized !== "both"
        ) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Usage: --ide <none|cursor|windsurf|both>",
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
            message: "Usage: --workflow <direct|branch_pr>",
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: UPGRADE_USAGE });
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: UPGRADE_USAGE });
      }
    }
    i++;
  }
  if ((out.bundle && !out.checksum) || (!out.bundle && out.checksum)) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: UPGRADE_USAGE });
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_LIST_REMOTE_USAGE });
    }
    if (arg === "--refresh") {
      out.refresh = true;
      continue;
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
    }
    switch (arg) {
      case "--index": {
        out.index = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_LIST_REMOTE_USAGE });
      }
    }
    i++;
  }
  return out;
}

function normalizeRecipeId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("manifest.id must be non-empty");
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error("manifest.id must not contain path separators");
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error("manifest.id must not be '.' or '..'");
  }
  return trimmed;
}

function normalizeAgentId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("agent.id must be non-empty");
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error("agent.id must not contain path separators");
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error("agent.id must not be '.' or '..'");
  }
  return trimmed;
}

function normalizeScenarioId(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("scenario.id must be non-empty");
  if (trimmed.includes("/") || trimmed.includes("\\")) {
    throw new Error("scenario.id must not contain path separators");
  }
  if (trimmed === "." || trimmed === "..") {
    throw new Error("scenario.id must not be '.' or '..'");
  }
  return trimmed;
}

function normalizeRecipeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error("manifest.tags must be an array of strings");
  const tags = value.map((tag) => {
    if (typeof tag !== "string") throw new Error("manifest.tags must be an array of strings");
    return tag.trim();
  });
  return dedupeStrings(tags);
}

function validateRecipeManifest(raw: unknown): RecipeManifest {
  if (!isRecord(raw)) throw new Error("manifest must be an object");
  if (raw.schema_version !== "1") throw new Error("manifest.schema_version must be '1'");
  if (typeof raw.id !== "string") throw new Error("manifest.id must be string");
  if (typeof raw.version !== "string") throw new Error("manifest.version must be string");
  if (typeof raw.name !== "string") throw new Error("manifest.name must be string");
  if (typeof raw.summary !== "string") throw new Error("manifest.summary must be string");
  if (typeof raw.description !== "string") throw new Error("manifest.description must be string");

  const id = normalizeRecipeId(raw.id);
  const version = raw.version.trim();
  if (!version) throw new Error("manifest.version must be non-empty");
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
  if (!isRecord(raw)) throw new Error("recipes.json must be an object");
  if (raw.schema_version !== 1) throw new Error("recipes.json schema_version must be 1");
  if (!Array.isArray(raw.recipes)) throw new Error("recipes.json recipes must be array");
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
        throw new Error("recipes.json entries must include id, version, source, installed_at");
      }
      if (id !== manifest.id || version !== manifest.version) {
        throw new Error("recipes.json entry id/version must match manifest");
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
  if (!isRecord(raw)) throw new Error("recipes index must be an object");
  if (raw.schema_version !== 1) throw new Error("recipes index schema_version must be 1");
  if (!Array.isArray(raw.recipes)) throw new Error("recipes index recipes must be array");

  const recipes = raw.recipes
    .filter((entry) => isRecord(entry))
    .map((entry) => {
      const id = typeof entry.id === "string" ? entry.id : "";
      const summary = typeof entry.summary === "string" ? entry.summary : "";
      const description = typeof entry.description === "string" ? entry.description : undefined;
      const versionsRaw = Array.isArray(entry.versions) ? entry.versions : [];
      if (!id || !summary || versionsRaw.length === 0) {
        throw new Error("recipes index entries must include id, summary, and versions");
      }
      const versions = versionsRaw
        .filter((version) => isRecord(version))
        .map((version) => {
          const versionId = typeof version.version === "string" ? version.version : "";
          const url = typeof version.url === "string" ? version.url : "";
          const sha256 = typeof version.sha256 === "string" ? version.sha256 : "";
          if (!versionId || !url || !sha256) {
            throw new Error("recipes index versions must include version, url, sha256");
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
  if (!isRecord(raw)) throw new Error(`scenario must be an object (${sourcePath})`);
  if (raw.schema_version !== undefined && raw.schema_version !== "1") {
    throw new Error(`scenario.schema_version must be "1" (${sourcePath})`);
  }
  const rawId = typeof raw.id === "string" ? raw.id : "";
  const id = normalizeScenarioId(rawId);
  const goal = typeof raw.goal === "string" ? raw.goal.trim() : "";
  if (!goal) throw new Error(`scenario.goal must be non-empty (${sourcePath})`);
  if (!("inputs" in raw)) throw new Error(`scenario.inputs is required (${sourcePath})`);
  if (!("outputs" in raw)) throw new Error(`scenario.outputs is required (${sourcePath})`);
  if (!Array.isArray(raw.steps)) {
    throw new Error(`scenario.steps must be an array (${sourcePath})`);
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
  if (!isRecord(raw)) throw new Error("scenarios index must be an object");
  if (raw.schema_version !== 1) throw new Error("scenarios index schema_version must be 1");
  if (!Array.isArray(raw.scenarios)) throw new Error("scenarios index scenarios must be array");
  const scenarios = raw.scenarios
    .filter((entry) => isRecord(entry))
    .map((entry) => ({
      id: typeof entry.id === "string" ? entry.id : "",
      summary: typeof entry.summary === "string" ? entry.summary : undefined,
    }))
    .filter((entry) => entry.id);
  return { schema_version: 1, scenarios };
}

function normalizeScenarioToolStep(
  raw: unknown,
  sourcePath: string,
): { tool: string; args: string[]; env: Record<string, string> } {
  if (!isRecord(raw)) {
    throw new Error(`scenario step must be an object (${sourcePath})`);
  }
  const tool = typeof raw.tool === "string" ? raw.tool.trim() : "";
  if (!tool) {
    throw new Error(`scenario step is missing tool id (${sourcePath})`);
  }
  const args = Array.isArray(raw.args) ? raw.args.filter((arg) => typeof arg === "string") : [];
  if (Array.isArray(raw.args) && args.length !== raw.args.length) {
    throw new Error(`scenario step args must be strings (${sourcePath})`);
  }
  const env: Record<string, string> = {};
  if (raw.env !== undefined) {
    if (!isRecord(raw.env)) {
      throw new Error(`scenario step env must be an object (${sourcePath})`);
    }
    for (const [key, value] of Object.entries(raw.env)) {
      if (typeof value !== "string") {
        throw new Error(`scenario step env values must be strings (${sourcePath})`);
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
    throw new Error("manifest.json not found at archive root");
  }
  const candidate = path.join(extractedDir, dirs[0]);
  if (!(await fileExists(path.join(candidate, "manifest.json")))) {
    throw new Error("manifest.json not found at archive root");
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
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

function parseRecipeInstallArgs(args: string[]): {
  source: string;
  onConflict: RecipeConflictMode;
  storage?: RecipeStorageMode;
} {
  let source: string | null = null;
  let onConflict: RecipeConflictMode = "fail";
  let storage: RecipeStorageMode | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--on-conflict") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
      }
      if (!RECIPE_CONFLICT_MODES.includes(next as RecipeConflictMode)) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
      }
      onConflict = next as RecipeConflictMode;
      i++;
      continue;
    }
    if (arg === "--storage") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
      }
      if (!RECIPE_STORAGE_MODES.includes(next as RecipeStorageMode)) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
      }
      storage = next as RecipeStorageMode;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
    }
    if (source) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
    }
    source = arg;
  }

  if (!source) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INSTALL_USAGE });
  }

  return { source, onConflict, storage };
}

type RecipeCachePruneFlags = {
  dryRun: boolean;
  all: boolean;
};

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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_CACHE_PRUNE_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
      }
      backendId = arg;
      continue;
    }

    if (arg === "--direction") {
      const next = args[i + 1];
      if (!next || (next !== "push" && next !== "pull")) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
      }
      direction = next;
      i++;
      continue;
    }
    if (arg === "--conflict") {
      const next = args[i + 1];
      if (!next || !["diff", "prefer-local", "prefer-remote", "fail"].includes(next)) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
  }

  if (!backendId || !direction) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: SYNC_USAGE });
      }
      backendId = arg;
      continue;
    }

    if (arg === "--direction") {
      const next = args[i + 1];
      if (!next || (next !== "push" && next !== "pull")) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: SYNC_USAGE });
      }
      direction = next;
      i++;
      continue;
    }
    if (arg === "--conflict") {
      const next = args[i + 1];
      if (!next || !["diff", "prefer-local", "prefer-remote", "fail"].includes(next)) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: SYNC_USAGE });
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: SYNC_USAGE });
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
      throw new Error(`Recipe agent file not found: ${rawFile}`);
    }

    const rawAgent = JSON.parse(await readFile(sourcePath, "utf8")) as unknown;
    if (!isRecord(rawAgent)) {
      throw new Error(`Recipe agent file must be a JSON object: ${rawFile}`);
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
  if (!trimmed) throw new Error("config.framework.source must be non-empty");
  if (!trimmed.includes("github.com")) {
    throw new Error("upgrade supports GitHub sources only");
  }
  try {
    const url = new URL(trimmed);
    const parts = url.pathname.replaceAll(".git", "").split("/").filter(Boolean);
    if (parts.length < 2) throw new Error("Invalid GitHub repo URL");
    return { owner: parts[0], repo: parts[1] };
  } catch {
    throw new Error("Invalid GitHub repo URL");
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

function renderRecipesIndex(recipes: { id: string; version: string; summary: string }[]): string {
  const lines = ["# RECIPES", ""];
  if (recipes.length === 0) {
    lines.push("No recipes installed.");
    return `${lines.join("\n")}\n`;
  }
  for (const recipe of recipes) {
    lines.push(`- ${recipe.id}@${recipe.version}: ${recipe.summary || "No summary provided."}`);
  }
  return `${lines.join("\n")}\n`;
}

function listBundledRecipes(): { id: string; summary: string; version: string }[] {
  return BUNDLED_RECIPES_CATALOG.recipes.map((recipe) => ({
    id: recipe.id,
    summary: recipe.summary,
    version: recipe.versions.at(-1)?.version ?? "unknown",
  }));
}

function renderBundledRecipesHint(): string {
  const entries = listBundledRecipes();
  if (entries.length === 0) {
    return "Available bundled recipes: none";
  }
  return `Available bundled recipes: ${entries.map((entry) => entry.id).join(", ")}`;
}

function validateBundledRecipesSelection(recipes: string[]): void {
  if (recipes.length === 0) return;
  const available = listBundledRecipes().map((entry) => entry.id);
  if (available.length === 0) {
    process.stdout.write(`${renderBundledRecipesHint()}\n`);
    return;
  }
  const missing = recipes.filter((recipe) => !available.includes(recipe));
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown recipes: ${missing.join(", ")}. ${renderBundledRecipesHint()}`,
    });
  }
}

async function loadRecipesIndexEntries(
  resolved: { agentplaneDir: string },
  lock: RecipesLock,
): Promise<{ id: string; version: string; summary: string }[]> {
  const entries = [];
  for (const recipe of lock.recipes) {
    const recipeDir = await resolveRecipeContentDir({ resolved, entry: recipe });
    const manifestPath = path.join(recipeDir, "manifest.json");
    let summary = "";
    try {
      const manifest = await readRecipeManifest(manifestPath);
      summary = manifest.summary;
    } catch {
      summary = "Manifest missing or invalid.";
    }
    entries.push({ id: recipe.id, version: recipe.version, summary });
  }
  return entries;
}

async function writeRecipesIndex(
  resolved: { agentplaneDir: string },
  entries: { id: string; version: string; summary: string }[],
): Promise<void> {
  const indexPath = path.join(resolved.agentplaneDir, RECIPES_INDEX_NAME);
  await writeFileIfChanged(indexPath, renderRecipesIndex(entries));
}

async function promptChoice(
  prompt: string,
  choices: string[],
  defaultValue: string,
): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${choices.join("/")}] (default ${defaultValue}): `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim();
  if (!trimmed) return defaultValue;
  if (!choices.includes(trimmed)) {
    process.stdout.write(`Invalid choice, using default ${defaultValue}\n`);
    return defaultValue;
  }
  return trimmed;
}

async function promptYesNo(prompt: string, defaultValue: boolean): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const question = `${prompt} [${defaultValue ? "Y/n" : "y/N"}]: `;
  const answer = await rl.question(question);
  rl.close();
  const trimmed = answer.trim().toLowerCase();
  if (!trimmed) return defaultValue;
  return ["y", "yes", "true", "1", "on"].includes(trimmed);
}

async function getPathKind(filePath: string): Promise<"file" | "dir" | null> {
  try {
    const stats = await lstat(filePath);
    return stats.isDirectory() ? "dir" : "file";
  } catch {
    return null;
  }
}

async function backupPath(filePath: string): Promise<string> {
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "");
  let dest = `${filePath}.bak-${stamp}`;
  if (await fileExists(dest)) {
    dest = `${filePath}.bak-${stamp}-${Math.random().toString(36).slice(2, 8)}`;
  }
  await rename(filePath, dest);
  return dest;
}

async function cmdInit(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseInitFlags(opts.args);
  const defaults = {
    ide: "none",
    workflow: "direct",
    hooks: false,
    recipes: [] as string[],
    requirePlanApproval: true,
    requireNetworkApproval: true,
  };
  let ide = flags.ide ?? defaults.ide;
  let workflow = flags.workflow ?? defaults.workflow;
  let hooks = flags.hooks ?? defaults.hooks;
  let recipes = flags.recipes ?? defaults.recipes;
  let requirePlanApproval = flags.requirePlanApproval ?? defaults.requirePlanApproval;
  let requireNetworkApproval = flags.requireNetworkApproval ?? defaults.requireNetworkApproval;

  if (
    !process.stdin.isTTY &&
    !flags.yes &&
    (!flags.ide ||
      !flags.workflow ||
      flags.hooks === undefined ||
      flags.requirePlanApproval === undefined ||
      flags.requireNetworkApproval === undefined)
  ) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "Usage: agentplane init --ide <...> --workflow <...> --hooks <...> --require-plan-approval <...> --require-network-approval <...> [--recipes <...>] [--yes] [--force|--backup]",
    });
  }

  if (process.stdin.isTTY && !flags.yes) {
    if (!flags.ide) {
      ide = await promptChoice("Select IDE", ["none", "cursor", "windsurf", "both"], ide);
    }
    if (!flags.workflow) {
      workflow = await promptChoice("Select workflow mode", ["direct", "branch_pr"], workflow);
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
      const rl = createInterface({ input: process.stdin, output: process.stdout });
      process.stdout.write(`${renderBundledRecipesHint()}\n`);
      const answer = await rl.question("Install optional recipes (comma separated, or none): ");
      rl.close();
      const trimmed = answer.trim();
      recipes = trimmed
        ? trimmed
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
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
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
    if (!(await fileExists(agentsPath))) {
      await writeFile(agentsPath, `${DEFAULT_AGENTS_MD}\n`, "utf8");
    }

    if (hooks) {
      await cmdHooksInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, quiet: true });
    }

    if (ide !== "none") {
      await cmdIdeSync({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    }

    if (recipes.length > 0) {
      if (listBundledRecipes().length === 0) {
        process.stdout.write("Bundled recipes catalog is empty; skipping install.\n");
      } else {
        process.stdout.write("Recipes install is not implemented yet; skipping.\n");
      }
    }

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

async function cmdIdeSync(opts: { cwd: string; rootOverride?: string }): Promise<number> {
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

    const cursorDir = path.join(resolved.gitRoot, ".cursor", "rules");
    const windsurfDir = path.join(resolved.gitRoot, ".windsurf", "rules");
    await mkdir(cursorDir, { recursive: true });
    await mkdir(windsurfDir, { recursive: true });

    const cursorPath = path.join(cursorDir, "agentplane.mdc");
    const windsurfPath = path.join(windsurfDir, "agentplane.md");
    await writeFileIfChanged(cursorPath, content);
    await writeFileIfChanged(windsurfPath, content);

    process.stdout.write(`${path.relative(resolved.gitRoot, cursorPath)}\n`);
    process.stdout.write(`${path.relative(resolved.gitRoot, windsurfPath)}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "ide sync", root: opts.rootOverride ?? null });
  }
}

async function cmdRole(opts: {
  cwd: string;
  rootOverride?: string;
  role: string;
}): Promise<number> {
  try {
    const roleRaw = opts.role.trim();
    if (!roleRaw) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: ROLE_USAGE });
    }
    process.stdout.write(`${renderHelp()}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "role", root: opts.rootOverride ?? null });
  }
}

async function cmdQuickstart(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    process.stdout.write(`${renderHelp()}\n`);
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
        message: `Missing directory: ${agentsDir}`,
      });
    }
    const entriesRaw = await readdir(agentsDir);
    const entries = entriesRaw.filter((name) => name.endsWith(".json")).toSorted();
    if (entries.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `No agents found under ${agentsDir}`,
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

async function cmdRecipeList(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    if (lock.recipes.length === 0) {
      await writeRecipesIndex(resolved, []);
      process.stdout.write("No recipes installed.\n");
      return 0;
    }

    const entries = await loadRecipesIndexEntries(resolved, lock);
    await writeRecipesIndex(resolved, entries);

    for (const entry of entries) {
      process.stdout.write(`${entry.id}@${entry.version} - ${entry.summary}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "recipe list", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeListRemote(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseRecipeListRemoteFlags(opts.args);
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const index = await loadRecipesRemoteIndex({
      resolved,
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
    throw mapCoreError(err, { command: "recipe list-remote", root: opts.rootOverride ?? null });
  }
}

async function cmdScenarioList(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const entries: { recipeId: string; scenarioId: string; summary?: string }[] = [];

    for (const recipe of lock.recipes) {
      const recipeDir = await resolveRecipeContentDir({ resolved, entry: recipe });
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
      process.stdout.write("No scenarios installed.\n");
      return 0;
    }

    const sorted = entries.toSorted((a, b) => {
      const byRecipe = a.recipeId.localeCompare(b.recipeId);
      if (byRecipe !== 0) return byRecipe;
      return a.scenarioId.localeCompare(b.scenarioId);
    });
    for (const entry of sorted) {
      process.stdout.write(
        `${entry.recipeId}:${entry.scenarioId} - ${entry.summary ?? "No summary provided."}\n`,
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
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const [recipeId, scenarioId] = opts.id.split(":");
    if (!recipeId || !scenarioId) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_INFO_USAGE });
    }
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const entry = lock.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = await resolveRecipeContentDir({ resolved, entry });
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_RUN_USAGE });
    }
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const entry = lock.recipes.find((recipe) => recipe.id === recipeId);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${recipeId}`,
      });
    }
    const recipeDir = await resolveRecipeContentDir({ resolved, entry });
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
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const entry = lock.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = await resolveRecipeContentDir({ resolved, entry });
    const manifestPath = path.join(recipeDir, "manifest.json");
    const manifest = await readRecipeManifest(manifestPath);

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);

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
    throw mapCoreError(err, { command: "recipe info", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeInstall(opts: {
  cwd: string;
  rootOverride?: string;
  source: string;
  onConflict: RecipeConflictMode;
  storage?: RecipeStorageMode;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });

    const loadedConfig = await loadConfig(resolved.agentplaneDir);
    const configuredStorage =
      loadedConfig.config.recipes?.storage_default ?? DEFAULT_RECIPE_STORAGE;
    const desiredStorage = opts.storage ?? configuredStorage;
    let actualStorage: RecipeStorageMode = desiredStorage;
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
    try {
      let sourcePath = "";
      let sourceLabel = opts.source;
      let expectedSha = "";

      if (isHttpUrl(opts.source)) {
        const url = new URL(opts.source);
        const filename = path.basename(url.pathname) || "recipe.tar.gz";
        sourcePath = path.join(tempRoot, filename);
        await downloadToFile(opts.source, sourcePath);
      } else {
        const candidate = await resolvePathFallback(opts.source);
        if (await fileExists(candidate)) {
          sourcePath = candidate;
        } else {
          const index = await loadRecipesRemoteIndex({
            resolved,
            cwd: opts.cwd,
            refresh: false,
          });
          const entry = index.recipes.find((recipe) => recipe.id === opts.source);
          if (!entry) {
            throw new CliError({
              exitCode: 5,
              code: "E_IO",
              message: `Recipe not found in remote index: ${opts.source}`,
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

          if (isHttpUrl(latest.url)) {
            const url = new URL(latest.url);
            const filename = path.basename(url.pathname) || "recipe.tar.gz";
            sourcePath = path.join(tempRoot, filename);
            await downloadToFile(latest.url, sourcePath);
          } else {
            sourcePath = path.resolve(opts.cwd, latest.url);
            if (!(await fileExists(sourcePath))) {
              throw new CliError({
                exitCode: 5,
                code: "E_IO",
                message: `Recipe archive not found: ${latest.url}`,
              });
            }
          }

          const actualSha = await sha256File(sourcePath);
          if (expectedSha && actualSha !== expectedSha) {
            throw new CliError({
              exitCode: 3,
              code: "E_VALIDATION",
              message: `Recipe checksum mismatch for ${sourceLabel}`,
            });
          }
        }
      }

      if (!sourcePath) {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Recipe archive not found: ${opts.source}`,
        });
      }

      await extractArchive(sourcePath, tempRoot);
      const recipeRoot = await resolveRecipeRoot(tempRoot);
      const manifest = await readRecipeManifest(path.join(recipeRoot, "manifest.json"));

      const cacheDir = resolveRecipeCacheDir(manifest);
      const cacheKind = await getPathKind(cacheDir);
      if (cacheKind && cacheKind !== "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Recipe cache path is not a directory: ${cacheDir}`,
        });
      }

      if (!cacheKind) {
        await mkdir(path.dirname(cacheDir), { recursive: true });
        await mkdir(resolveGlobalRecipesDir(), { recursive: true });
        await rename(recipeRoot, cacheDir);
      } else if (!(await fileExists(path.join(cacheDir, "manifest.json")))) {
        await rm(cacheDir, { recursive: true, force: true });
        await mkdir(path.dirname(cacheDir), { recursive: true });
        await mkdir(resolveGlobalRecipesDir(), { recursive: true });
        await rename(recipeRoot, cacheDir);
      }

      try {
        await applyRecipeAgents({
          manifest,
          recipeDir: cacheDir,
          agentplaneDir: resolved.agentplaneDir,
          onConflict: opts.onConflict,
        });
        await applyRecipeScenarios({ manifest, recipeDir: cacheDir });
      } catch (err) {
        if (!cacheKind) {
          await rm(cacheDir, { recursive: true, force: true });
        }
        throw err;
      }

      const recipesDir = path.join(resolved.agentplaneDir, RECIPES_DIR_NAME);
      const destDir = path.join(recipesDir, manifest.id, manifest.version);
      if (desiredStorage !== "global") {
        if (await fileExists(destDir)) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe already installed: ${manifest.id}@${manifest.version}`,
          });
        }
        await mkdir(path.dirname(destDir), { recursive: true });
        await mkdir(recipesDir, { recursive: true });
        if (desiredStorage === "link") {
          try {
            await symlink(cacheDir, destDir, "junction");
          } catch {
            actualStorage = "copy";
            await cp(cacheDir, destDir, { recursive: true, force: false, errorOnExist: true });
            process.stdout.write(
              `Warning: symlink failed; copied recipe ${manifest.id}@${manifest.version} instead.\n`,
            );
          }
        } else {
          await cp(cacheDir, destDir, { recursive: true, force: false, errorOnExist: true });
        }
      }

      const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
      const lock = await readRecipesLock(lockPath);
      const sha256 = await sha256File(sourcePath);
      const updated = lock.recipes.filter((entry) => entry.id !== manifest.id);
      updated.push({
        id: manifest.id,
        version: manifest.version,
        sha256,
        source: sourceLabel,
        storage: actualStorage,
      });
      const updatedLock = sortRecipesLock({ schema_version: 1, recipes: updated });
      await writeRecipesLock(lockPath, updatedLock);
      const indexEntries = await loadRecipesIndexEntries(resolved, updatedLock);
      await writeRecipesIndex(resolved, indexEntries);

      process.stdout.write(`Installed recipe ${manifest.id}@${manifest.version}\n`);
      return 0;
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipe install", root: opts.rootOverride ?? null });
  }
}

async function cmdRecipeRemove(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const entry = lock.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    if (entry.storage !== "global") {
      const recipeDir = resolveProjectRecipeDir(resolved, entry);
      await rm(recipeDir, { recursive: true, force: true });
    }

    const updated = lock.recipes.filter((recipe) => recipe.id !== opts.id);
    const updatedLock = sortRecipesLock({ schema_version: 1, recipes: updated });
    await writeRecipesLock(lockPath, updatedLock);
    const indexEntries = await loadRecipesIndexEntries(resolved, updatedLock);
    await writeRecipesIndex(resolved, indexEntries);

    process.stdout.write(`Removed recipe ${entry.id}@${entry.version}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipe remove", root: opts.rootOverride ?? null });
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
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const cacheDir = resolveGlobalRecipesDir();
    if (!(await fileExists(cacheDir))) {
      process.stdout.write("No recipe cache found.\n");
      return 0;
    }

    const cacheEntries = await listRecipeCacheEntries(cacheDir);
    if (cacheEntries.length === 0) {
      process.stdout.write("No cached recipes found.\n");
      return 0;
    }

    if (flags.all) {
      if (flags.dryRun) {
        for (const entry of cacheEntries) {
          process.stdout.write(`Would remove ${entry.id}@${entry.version}\n`);
        }
        process.stdout.write(`Would remove ${cacheEntries.length} cached recipes.\n`);
        return 0;
      }
      await rm(cacheDir, { recursive: true, force: true });
      process.stdout.write(`Removed ${cacheEntries.length} cached recipes.\n`);
      return 0;
    }

    const lockPath = path.join(resolved.agentplaneDir, RECIPES_LOCK_NAME);
    const lock = await readRecipesLock(lockPath);
    const keep = new Set(lock.recipes.map((entry) => `${entry.id}@${entry.version}`));
    const prune = cacheEntries.filter((entry) => !keep.has(`${entry.id}@${entry.version}`));

    if (prune.length === 0) {
      process.stdout.write("No cached recipes to prune.\n");
      return 0;
    }

    if (flags.dryRun) {
      for (const entry of prune) {
        process.stdout.write(`Would remove ${entry.id}@${entry.version}\n`);
      }
      process.stdout.write(`Would remove ${prune.length} cached recipes.\n`);
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

    process.stdout.write(`Removed ${prune.length} cached recipes.\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipe cache prune", root: opts.rootOverride ?? null });
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
        message: "Configured backend does not support sync()",
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
        message: "Configured backend does not support sync()",
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
      message:
        "Usage: agentplane task new --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]",
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
        message: "Configured backend does not support generateTaskId()",
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
        message: "verify commands are required for tasks with code/backend/frontend tags",
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Usage: agentplane task add" });
    }
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
      message:
        "Usage: agentplane task add <task-id> [<task-id> ...] --title <text> --description <text> --priority <low|normal|med|high> --owner <id> --tag <tag> [--tag <tag>...]",
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
      message: "Usage: agentplane task update <task-id> [flags]",
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
        message: "Usage: agentplane task update <task-id> [flags]",
      });
    }
    const next = rest[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
        message: `Unknown task id: ${flags.taskId}`,
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
    process.stdout.write(`✅ updated ${flags.taskId}\n`);
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Usage: agentplane task scrub" });
    }
    const next = args[i + 1];
    if (!next)
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
      message: "Usage: agentplane task scrub --find",
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
        process.stdout.write(`Would update ${changedIds.size} task(s).\n`);
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
      process.stdout.write(`Updated ${changedIds.size} task(s).\n`);
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --status" });
      out.status.push(next);
      i++;
      continue;
    }
    if (arg === "--owner") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --owner" });
      out.owner.push(next);
      i++;
      continue;
    }
    if (arg === "--tag") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --tag" });
      out.tag.push(next);
      i++;
      continue;
    }
    if (opts?.allowLimit && arg === "--limit") {
      const next = args[i + 1];
      if (!next)
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --limit" });
      const parsed = Number.parseInt(next, 10);
      if (!Number.isFinite(parsed)) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid --limit value" });
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
      warnings.push(`Unknown task id: ${opts.taskId}`);
    }

    for (const warning of warnings) {
      process.stdout.write(`⚠️ ${warning}\n`);
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
        process.stdout.write(`Missing deps: ${missing.join(", ")}\n`);
      }
      if (incomplete.length > 0) {
        process.stdout.write(`Incomplete deps: ${incomplete.join(", ")}\n`);
      }
    }

    const ready = warnings.length === 0;
    process.stdout.write(`${ready ? "✅ ready" : "⛔ not ready"}\n`);
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Query must be non-empty" });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Invalid regex: ${message}` });
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
      message: "Usage: agentplane task scaffold <task-id> [--title <text>] [--overwrite] [--force]",
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --title" });
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
        message: `Unknown task id: ${flags.taskId}`,
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
      process.stdout.write(`✅ wrote ${path.relative(resolved.gitRoot, readmePath)}\n`);
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Unknown flag" });
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
      process.stdout.write(`✅ normalized ${tasks.length} task(s)\n`);
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Missing value for --source" });
      out.source = next;
      i++;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Unknown flag" });
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
      process.stdout.write(`✅ migrated ${tasks.length} task(s) into backend\n`);
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
    process.stdout.write(`✅ commented ${opts.taskId}\n`);
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
            process.stderr.write(`⚠️ missing deps: ${dep.missing.join(", ")}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(`⚠️ incomplete deps: ${dep.incomplete.join(", ")}\n`);
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
      process.stdout.write(`✅ status ${opts.taskId} -> ${nextStatus}\n`);
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
        message: "Configured backend does not support exportTasksJson()",
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
const GUARD_COMMIT_USAGE =
  "Usage: agentplane guard commit <task-id> -m <message> --allow <path> [--allow <path>...] [--auto-allow] [--allow-tasks] [--require-clean] [--quiet]";
const COMMIT_USAGE = "Usage: agentplane commit <task-id> -m <message>";
const START_USAGE = "Usage: agentplane start <task-id> --author <id> --body <text> [flags]";
const BLOCK_USAGE = "Usage: agentplane block <task-id> --author <id> --body <text> [flags]";
const FINISH_USAGE =
  "Usage: agentplane finish <task-id> [<task-id>...] --author <id> --body <text> [flags]";
const VERIFY_USAGE =
  "Usage: agentplane verify <task-id> [--cwd <path>] [--log <path>] [--skip-if-unchanged] [--quiet] [--require]";
const WORK_START_USAGE =
  "Usage: agentplane work start <task-id> --agent <id> --slug <slug> --worktree";
const PR_OPEN_USAGE = "Usage: agentplane pr open <task-id> --author <id> [--branch <name>]";
const PR_UPDATE_USAGE = "Usage: agentplane pr update <task-id>";
const PR_CHECK_USAGE = "Usage: agentplane pr check <task-id>";
const PR_NOTE_USAGE = "Usage: agentplane pr note <task-id> --author <id> --body <text>";
const INTEGRATE_USAGE =
  "Usage: agentplane integrate <task-id> [--branch <name>] [--base <name>] [--merge-strategy squash|merge|rebase] [--run-verify] [--dry-run] [--quiet]";
const CLEANUP_MERGED_USAGE =
  "Usage: agentplane cleanup merged [--base <name>] [--yes] [--archive] [--quiet]";

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
      message: `Invalid status: ${value} (allowed: ${[...ALLOWED_TASK_STATUSES].join(", ")})`,
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
      message: `Invalid task id: ${opts.taskId}`,
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
        `⚠️ ${opts.action}: status/comment-driven commit requested; policy=warn (pass --confirm-status-commit to acknowledge)\n`,
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

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

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

async function gitCurrentBranch(cwd: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
    cwd,
    env: gitEnv(),
  });
  const trimmed = stdout.trim();
  if (!trimmed) throw new Error("Failed to resolve git branch");
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
    'ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"',
    'if [ -z "$ROOT" ]; then',
    '  echo "agentplane hooks: unable to resolve repo root" >&2',
    "  exit 1",
    "fi",
    'exec "$ROOT/.agentplane/bin/agentplane" hooks run ' + hook + ' "$@"',
    "",
  ].join("\n");
}

function shimScriptText(): string {
  return [
    "#!/usr/bin/env sh",
    `# ${SHIM_MARKER} (do not edit)`,
    "set -e",
    'ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"',
    'if [ -z "$ROOT" ]; then',
    '  echo "agentplane shim: unable to resolve repo root" >&2',
    "  exit 1",
    "fi",
    'if [ -f "$ROOT/packages/agentplane/dist/cli.js" ]; then',
    "  if command -v node >/dev/null 2>&1; then",
    '    exec node "$ROOT/packages/agentplane/bin/agentplane.js" "$@"',
    "  fi",
    "fi",
    "if command -v bun >/dev/null 2>&1; then",
    '  exec bun "$ROOT/packages/agentplane/src/cli.ts" "$@"',
    "fi",
    'echo "agentplane shim: bun or built dist required" >&2',
    "exit 1",
    "",
  ].join("\n");
}

function validateWorkSlug(slug: string): void {
  const trimmed = slug.trim();
  if (!trimmed) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
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
      process.stdout.write("✅ index clean (no staged files)\n");
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: "No staged files" });
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
    throw new CliError({ exitCode: 5, code: "E_GIT", message: "No staged files" });
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "No changes to stage" });
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
        "No changes matched the allowed prefixes (use --commit-auto-allow or broaden --commit-allow)",
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
      `✅ committed ${hash?.slice(0, 12) ?? ""} ${subject ?? ""} (staged: ${staged.join(", ")})\n`,
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
        throw new CliError({ exitCode: 5, code: "E_GIT", message: "No staged files" });
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
      process.stdout.write(`✅ committed ${hash?.slice(0, 12) ?? ""} ${subject ?? ""}\n`);
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
            process.stderr.write(`⚠️ missing deps: ${dep.missing.join(", ")}\n`);
          }
          if (dep.incomplete.length > 0) {
            process.stderr.write(`⚠️ incomplete deps: ${dep.incomplete.join(", ")}\n`);
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
      process.stdout.write(`✅ started ${opts.taskId}${suffix}\n`);
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
      process.stdout.write(`✅ blocked ${opts.taskId}${suffix}\n`);
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
        message: "Configured backend does not support exportTasksJson()",
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
      process.stdout.write("✅ finished\n");
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
        process.stdout.write(`ℹ️ ${task.id}: no verify commands configured\n`);
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
            `⚠️ ${task.id}: working tree is dirty; ignoring --skip-if-unchanged\n`,
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
              `ℹ️ ${task.id}: verify skipped (unchanged sha ${currentSha.slice(0, 12)})\n`,
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
      process.stdout.write(`✅ verify passed for ${task.id}\n`);
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
        message: "work start is only supported when workflow_mode=branch_pr",
      });
    }
    if (!opts.worktree) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
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
      `✅ work start ${branchName} (worktree=${path.relative(resolved.gitRoot, worktreePath)})\n`,
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
    if (!author) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });

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
        message: "pr commands require workflow_mode=branch_pr",
      });
    }

    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    if (!branch) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });

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

    process.stdout.write(`✅ pr open ${path.relative(resolved.gitRoot, prDir)}\n`);
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
        message: "pr commands require workflow_mode=branch_pr",
      });
    }

    if (!(await fileExists(metaPath)) || !(await fileExists(reviewPath))) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "PR artifacts missing: run `agentplane pr open` first",
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

    process.stdout.write(`✅ pr update ${path.relative(resolved.gitRoot, prDir)}\n`);
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
        message: "pr commands require workflow_mode=branch_pr",
      });
    }

    const errors: string[] = [];
    if (!(await fileExists(prDir))) errors.push("Missing PR directory");
    if (!(await fileExists(metaPath))) errors.push("Missing pr/meta.json");
    if (!(await fileExists(diffstatPath))) errors.push("Missing pr/diffstat.txt");
    if (!(await fileExists(verifyLogPath))) errors.push("Missing pr/verify.log");
    if (!(await fileExists(reviewPath))) errors.push("Missing pr/review.md");

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

    process.stdout.write(`✅ pr check ${path.relative(resolved.gitRoot, prDir)}\n`);
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_NOTE_USAGE });
    }

    const { config, reviewPath } = await resolvePrPaths(opts);
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "pr commands require workflow_mode=branch_pr",
      });
    }

    if (!(await fileExists(reviewPath))) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Missing pr/review.md (run `agentplane pr open`)",
      });
    }

    const review = await readFile(reviewPath, "utf8");
    const updated = appendHandoffNote(review, `${author}: ${body}`);
    await writeFile(reviewPath, updated, "utf8");

    process.stdout.write("✅ pr note\n");
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
        message: "integrate is only supported when workflow_mode=branch_pr",
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown branch: ${branch}`,
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
    const diffstatText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "diffstat.txt",
      branch,
    });
    if (diffstatText === null) errors.push("Missing pr/diffstat.txt");
    const verifyLogText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "verify.log",
      branch,
    });
    if (verifyLogText === null) errors.push("Missing pr/verify.log");
    const reviewText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "review.md",
      branch,
    });
    if (reviewText === null) errors.push("Missing pr/review.md");
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
          `✅ integrate dry-run ${task.id} (base=${base} branch=${branch} verify=${shouldRunVerify ? "yes" : "no"})\n`,
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
        process.stdout.write(`✅ verify passed for ${task.id}\n`);
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
          process.stdout.write(`✅ verify passed for ${task.id}\n`);
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
        message: `Missing PR artifact dir after merge: ${prDir}`,
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
      process.stdout.write(`✅ integrate ${task.id} (merge=${mergeHash.slice(0, 12)})\n`);
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
        message: "cleanup merged is only supported when workflow_mode=branch_pr",
      });
    }

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    const baseBranch = (
      opts.base ?? (await getBaseBranch({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }))
    ).trim();
    if (!baseBranch) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: CLEANUP_MERGED_USAGE });
    }
    if (!(await gitBranchExists(resolved.gitRoot, baseBranch))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Unknown base branch: ${baseBranch}`,
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
      process.stdout.write(`✅ cleanup merged deleted=${candidates.length}\n`);
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
      process.stdout.write(removed > 0 ? "OK\n" : "No agentplane hooks found\n");
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
          message: "Missing commit message file",
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
      const nonTasks = staged.filter((entry) => entry !== tasksPath);

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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_BASE_USAGE });
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_STATUS_USAGE });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown branch: ${branch}`,
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, base))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown base branch: ${base}`,
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_REMOVE_USAGE });
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
        process.stdout.write(`✅ removed worktree ${worktreePath}\n`);
      }
    }

    if (branch) {
      if (!(await gitBranchExists(resolved.gitRoot, branch))) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown branch: ${branch}`,
        });
      }
      await execFileAsync("git", ["branch", opts.force ? "-D" : "-d", branch], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
      if (!opts.quiet) {
        process.stdout.write(`✅ removed branch ${branch}\n`);
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

function ensureDocSections(doc: string, required: string[]): string {
  const trimmed = doc.trim();
  if (!trimmed) {
    const blocks = required.map((section) => `## ${section}\n`);
    return `${blocks.join("\n").trimEnd()}\n`;
  }
  let out = doc.endsWith("\n") ? doc : `${doc}\n`;
  for (const section of required) {
    const needle = `## ${section}`;
    if (!out.split("\n").some((line) => line.trim() === needle)) {
      out = `${out.trimEnd()}\n\n${needle}\n`;
    }
  }
  return out.endsWith("\n") ? out : `${out}\n`;
}

function normalizeDocSectionName(section: string): string {
  return section.trim().replaceAll(/\s+/g, " ").toLowerCase();
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
const TASK_DOC_SHOW_USAGE =
  "Usage: agentplane task doc show <task-id> [--section <name>] [--quiet]";

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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Missing value for ${arg}` });
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
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SET_USAGE });
  }

  const hasText = flags.text !== undefined;
  const hasFile = flags.file !== undefined;
  if (hasText === hasFile) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SET_USAGE });
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
        message: "Configured backend does not support task docs",
      });
    }
    const allowed = config.tasks.doc.sections;
    if (!allowed.includes(flags.section)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown doc section: ${flags.section}`,
      });
    }
    const existing = await backend.getTaskDoc(opts.taskId);
    const baseDoc = ensureDocSections(existing ?? "", config.tasks.doc.required_sections);
    const nextDoc = setMarkdownSection(baseDoc, flags.section, text);
    await backend.setTaskDoc(opts.taskId, nextDoc, updatedBy);
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
        message: "Configured backend does not support task docs",
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
        process.stdout.write(`ℹ️ no content for section: ${flags.section}\n`);
      }
      return 0;
    }
    if (doc.trim()) {
      process.stdout.write(`${doc.trimEnd()}\n`);
      return 0;
    }
    if (!flags.quiet) {
      process.stdout.write("ℹ️ no task doc metadata\n");
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

    const [namespace, command, ...args] = rest;

    if (namespace === "init") {
      const initArgs = command ? [command, ...args] : [];
      if (command && !command.startsWith("--")) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            "Usage: agentplane init [--ide <...>] [--workflow <...>] [--hooks <...>] [--require-plan-approval <...>] [--require-network-approval <...>] [--recipes <...>] [--yes] [--force|--backup]",
        });
      }
      return await cmdInit({ cwd: process.cwd(), rootOverride: globals.root, args: initArgs });
    }

    if (namespace === "upgrade") {
      const upgradeArgs = command ? [command, ...args] : [];
      if (command && !command.startsWith("--")) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: UPGRADE_USAGE });
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
          message: "Usage: agentplane config set <key> <value>",
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
          message: "Usage: agentplane mode set <direct|branch_pr>",
        });
      }
      return await cmdModeSet({ cwd: process.cwd(), rootOverride: globals.root, mode });
    }

    if (namespace === "quickstart") {
      if (command) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Usage: agentplane quickstart",
        });
      }
      return await cmdQuickstart({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "role") {
      if (!command || command.startsWith("--") || args.length > 0) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: ROLE_USAGE });
      }
      return await cmdRole({ cwd: process.cwd(), rootOverride: globals.root, role: command });
    }

    if (namespace === "agents") {
      if (command) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: AGENTS_USAGE });
      }
      return await cmdAgents({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "ready") {
      if (!command || command.startsWith("--") || args.length > 0) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: READY_USAGE });
      }
      return await cmdReady({ cwd: process.cwd(), rootOverride: globals.root, taskId: command });
    }

    if (namespace === "ide") {
      if (command !== "sync" || args.length > 0) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: IDE_SYNC_USAGE });
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
          message: "Usage: agentplane task show <task-id>",
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
          message: "Usage: agentplane task search <query> [flags]",
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SHOW_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SET_USAGE });
        }
        return await cmdTaskDocSet({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
          args: restArgs,
        });
      }
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SET_USAGE });
    }

    if (namespace === "task" && command === "comment") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Usage: agentplane task comment <task-id>",
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
              message: "Missing value for --author",
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
              message: "Missing value for --body",
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
            message: "Usage: agentplane task comment <task-id>",
          });
        }
      }
      if (!author || !body) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Usage: agentplane task comment <task-id>",
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
          message: "Usage: agentplane task set-status <task-id> <status> [flags]",
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
              message: "Missing value for --author",
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
              message: "Missing value for --body",
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
              message: "Missing value for --commit",
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
              message: "Missing value for --commit-emoji",
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
              message: "Missing value for --commit-allow",
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
            message: "Usage: agentplane task set-status <task-id> <status> [flags]",
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
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_BASE_USAGE });
          }
          return await cmdBranchBaseSet({
            cwd: process.cwd(),
            rootOverride: globals.root,
            value,
          });
        }
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_BASE_USAGE });
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
                message: BRANCH_STATUS_USAGE,
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
                message: BRANCH_STATUS_USAGE,
              });
            base = next;
            i++;
            continue;
          }
          if (arg.startsWith("--")) {
            throw new CliError({
              exitCode: 2,
              code: "E_USAGE",
              message: BRANCH_STATUS_USAGE,
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
                message: BRANCH_REMOVE_USAGE,
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
                message: BRANCH_REMOVE_USAGE,
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
              message: BRANCH_REMOVE_USAGE,
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
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: BRANCH_BASE_USAGE });
    }

    if (namespace === "work" && command === "start") {
      const [taskId, ...restArgs] = args;
      if (!taskId) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
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
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
          agent = next;
          i++;
          continue;
        }
        if (arg === "--slug") {
          const next = restArgs[i + 1];
          if (!next)
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
          slug = next;
          i++;
          continue;
        }
        if (arg === "--worktree") {
          worktree = true;
          continue;
        }
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
      }

      if (!agent || !slug || !worktree) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: WORK_START_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });
      }

      if (command === "open") {
        let author = "";
        let branch: string | undefined;
        for (let i = 0; i < restArgs.length; i++) {
          const arg = restArgs[i];
          if (!arg) continue;
          if (arg === "--author") {
            const next = restArgs[i + 1];
            if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });
            author = next;
            i++;
            continue;
          }
          if (arg === "--branch") {
            const next = restArgs[i + 1];
            if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });
            branch = next;
            i++;
            continue;
          }
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });
        }
        if (!author) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_OPEN_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_UPDATE_USAGE });
        }
        return await cmdPrUpdate({
          cwd: process.cwd(),
          rootOverride: globals.root,
          taskId,
        });
      }

      if (command === "check") {
        if (restArgs.length > 0) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_CHECK_USAGE });
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
            if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_NOTE_USAGE });
            author = next;
            i++;
            continue;
          }
          if (arg === "--body") {
            const next = restArgs[i + 1];
            if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_NOTE_USAGE });
            body = next;
            i++;
            continue;
          }
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_NOTE_USAGE });
        }
        if (!author || !body) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: PR_NOTE_USAGE });
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
        message: "Usage: agentplane pr open|update|check|note <task-id>",
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
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid --format" });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: GUARD_COMMIT_USAGE });
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
              throw new CliError({ exitCode: 2, code: "E_USAGE", message: GUARD_COMMIT_USAGE });
            allow.push(next);
            i++;
            continue;
          }
          if (arg === "-m" || arg === "--message") {
            const next = restArgs[i + 1];
            if (!next)
              throw new CliError({ exitCode: 2, code: "E_USAGE", message: GUARD_COMMIT_USAGE });
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
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: GUARD_COMMIT_USAGE });
          }
        }

        if (!message) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: GUARD_COMMIT_USAGE });
        }

        if (autoAllow && allow.length === 0) {
          const staged = await getStagedFiles({
            cwd: process.cwd(),
            rootOverride: globals.root ?? null,
          });
          const prefixes = suggestAllowPrefixes(staged);
          if (prefixes.length === 0) {
            throw new CliError({ exitCode: 5, code: "E_GIT", message: "No staged files" });
          }
          allow.push(...prefixes);
        }

        if (allowDirty) {
          // Deprecated no-op for parity with agentctl.
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
        message: "Usage: agentplane guard <subcommand>",
      });
    }

    if (namespace === "commit") {
      const taskId = command;
      if (!taskId) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: COMMIT_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: COMMIT_USAGE });
          allow.push(next);
          i++;
          continue;
        }
        if (arg === "-m" || arg === "--message") {
          const next = args[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: COMMIT_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: COMMIT_USAGE });
        }
      }

      if (!message) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: COMMIT_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = startArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = startArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
        }
      }

      if (!author || !body) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: START_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = blockArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = blockArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
        }
      }

      if (!author || !body) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BLOCK_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = flagArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          body = next;
          i++;
          continue;
        }
        if (arg === "--commit") {
          const next = flagArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          commitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--commit-allow") {
          const next = flagArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          statusCommitEmoji = next;
          i++;
          continue;
        }
        if (arg === "--status-commit-allow") {
          const next = flagArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
        }
      }

      if (!author || !body) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: VERIFY_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: VERIFY_USAGE });
          cwdOverride = next;
          i++;
          continue;
        }
        if (arg === "--log") {
          const next = verifyArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: VERIFY_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: VERIFY_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
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
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
          branch = next;
          i++;
          continue;
        }
        if (arg === "--base") {
          const next = args[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
          base = next;
          i++;
          continue;
        }
        if (arg === "--merge-strategy") {
          const next = args[i + 1];
          if (next !== "squash" && next !== "merge" && next !== "rebase") {
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
        }
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: INTEGRATE_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: CLEANUP_MERGED_USAGE });
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
            throw new CliError({ exitCode: 2, code: "E_USAGE", message: CLEANUP_MERGED_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: CLEANUP_MERGED_USAGE });
        }
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: CLEANUP_MERGED_USAGE });
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
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_USAGE });
      }
      if (subcommand === "list") {
        if (args.length > 0) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_USAGE });
        }
        return await cmdScenarioList({ cwd: process.cwd(), rootOverride: globals.root });
      }
      if (subcommand === "info") {
        if (args.length !== 1) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_INFO_USAGE });
        }
        return await cmdScenarioInfo({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      if (subcommand === "run") {
        if (args.length !== 1) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_RUN_USAGE });
        }
        return await cmdScenarioRun({
          cwd: process.cwd(),
          rootOverride: globals.root,
          id: args[0],
        });
      }
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: SCENARIO_USAGE });
    }

    if (namespace === "recipe") {
      const subcommand = command;
      if (!subcommand) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_USAGE });
      }
      if (subcommand === "list") {
        if (args.length > 0) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_USAGE });
        }
        return await cmdRecipeList({ cwd: process.cwd(), rootOverride: globals.root });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_INFO_USAGE });
        }
        return await cmdRecipeInfo({
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
          onConflict: parsed.onConflict,
          storage: parsed.storage,
        });
      }
      if (subcommand === "remove") {
        if (args.length !== 1) {
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_REMOVE_USAGE });
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
          throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_CACHE_USAGE });
        }
        if (cacheSub === "prune") {
          return await cmdRecipeCachePrune({
            cwd: process.cwd(),
            rootOverride: globals.root,
            args: cacheArgs,
          });
        }
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_CACHE_USAGE });
      }
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: RECIPE_USAGE });
    }

    if (namespace === "backend") {
      const subcommand = command;
      if (subcommand !== "sync") {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: BACKEND_SYNC_USAGE });
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
            message: "Usage: agentplane hooks run <hook>",
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
        message: "Usage: agentplane hooks install|uninstall",
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
