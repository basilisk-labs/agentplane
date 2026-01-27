import { execFile } from "node:child_process";
import { access, chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  createTask,
  extractTaskSuffix,
  getBaseBranch,
  getStagedFiles,
  getUnstagedFiles,
  type AgentplaneConfig,
  setPinnedBaseBranch,
  listTasks,
  lintTasksFile,
  loadConfig,
  readTask,
  resolveProject,
  renderTaskReadme,
  saveConfig,
  setByDottedKey,
  setTaskDocSection,
  validateTaskDocMetadata,
  validateCommitSubject,
  writeTasksExport,
} from "@agentplane/core";

import { CliError, formatJsonError } from "./errors.js";
import { formatCommentBodyForCommit } from "./comment-format.js";
import { renderHelp } from "./help.js";
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
  if (jsonErrors) {
    process.stdout.write(`${formatJsonError(err)}\n`);
  } else {
    process.stderr.write(`${err.message}\n`);
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
    const created = await createTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      title: flags.title,
      description: flags.description,
      owner: flags.owner,
      priority,
      tags: flags.tags,
      dependsOn: flags.dependsOn,
      verify: flags.verify,
    });
    process.stdout.write(`${created.id}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "task new", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    const metadataErrors = validateTaskDocMetadata(
      task.frontmatter as unknown as Record<string, unknown>,
    );
    if (metadataErrors.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
      });
    }
    process.stdout.write(`${JSON.stringify(task.frontmatter, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, {
      command: "task show",
      root: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
  }
}

async function cmdTaskList(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const tasks = await listTasks({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    for (const t of tasks) {
      process.stdout.write(`${t.id} [${t.frontmatter.status}] ${t.frontmatter.title}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "task list", root: opts.rootOverride ?? null });
  }
}

async function cmdTaskExport(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const result = await writeTasksExport({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    process.stdout.write(`${path.relative(resolved.gitRoot, result.path)}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "task export", root: opts.rootOverride ?? null });
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

const BRANCH_BASE_USAGE = "Usage: agentplane branch base get|set <name>";
const GUARD_COMMIT_USAGE = "Usage: agentplane guard commit <task-id> -m <message>";
const COMMIT_USAGE = "Usage: agentplane commit <task-id> -m <message>";
const START_USAGE = "Usage: agentplane start <task-id> --author <id> --body <text>";
const BLOCK_USAGE = "Usage: agentplane block <task-id> --author <id> --body <text>";
const FINISH_USAGE = "Usage: agentplane finish <task-id> --author <id> --body <text>";
const WORK_START_USAGE =
  "Usage: agentplane work start <task-id> --agent <id> --slug <slug> --worktree";
const PR_OPEN_USAGE = "Usage: agentplane pr open <task-id> --author <id> [--branch <name>]";
const PR_UPDATE_USAGE = "Usage: agentplane pr update <task-id>";
const PR_CHECK_USAGE = "Usage: agentplane pr check <task-id>";
const PR_NOTE_USAGE = "Usage: agentplane pr note <task-id> --author <id> --body <text>";

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
  const parsed = JSON.parse(raw) as unknown;
  if (!isRecord(parsed)) throw new Error("pr/meta.json must be an object");
  if (parsed.schema_version !== 1) throw new Error("pr/meta.json schema_version must be 1");
  if (parsed.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
  if (!isIsoDate(parsed.created_at)) throw new Error("pr/meta.json created_at must be ISO");
  if (!isIsoDate(parsed.updated_at)) throw new Error("pr/meta.json updated_at must be ISO");
  return parsed as PrMeta;
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

async function cmdGuardClean(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
    if (staged.length > 0) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: "Staged files exist",
      });
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

    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });

    const formattedComment = opts.commitFromComment
      ? formatCommentBodyForCommit(opts.body, loaded.config)
      : null;
    const commentBody = formattedComment ?? opts.body;

    const nextFrontmatter: Record<string, unknown> = {
      ...(task.frontmatter as Record<string, unknown>),
      status: "DOING",
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };

    const existingComments = Array.isArray(nextFrontmatter.comments)
      ? nextFrontmatter.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item &&
            typeof item === "object" &&
            "author" in item &&
            "body" in item &&
            typeof (item as { author?: unknown }).author === "string" &&
            typeof (item as { body?: unknown }).body === "string",
        )
      : [];
    const commentsValue: { author: string; body: string }[] = [
      ...existingComments,
      { author: opts.author, body: commentBody },
    ];
    nextFrontmatter.comments = commentsValue;

    const nextText = renderTaskReadme(nextFrontmatter, task.body);
    await writeFile(task.readmePath, nextText, "utf8");

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
    throw mapCoreError(err, { command: "start", root: opts.rootOverride ?? null });
  }
}

async function cmdBlock(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.blocked;
    requireStructuredComment(opts.body, prefix, minChars);

    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });

    const nextFrontmatter: Record<string, unknown> = {
      ...(task.frontmatter as Record<string, unknown>),
      status: "BLOCKED",
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };

    const existingComments = Array.isArray(nextFrontmatter.comments)
      ? nextFrontmatter.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item &&
            typeof item === "object" &&
            "author" in item &&
            "body" in item &&
            typeof (item as { author?: unknown }).author === "string" &&
            typeof (item as { body?: unknown }).body === "string",
        )
      : [];
    nextFrontmatter.comments = [...existingComments, { author: opts.author, body: opts.body }];

    const nextText = renderTaskReadme(nextFrontmatter, task.body);
    await writeFile(task.readmePath, nextText, "utf8");

    process.stdout.write("✅ blocked\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "block", root: opts.rootOverride ?? null });
  }
}

async function cmdFinish(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const { prefix, min_chars: minChars } = loaded.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);

    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });

    const headCommit = await readHeadCommit(resolved.gitRoot);
    const nextFrontmatter: Record<string, unknown> = {
      ...(task.frontmatter as Record<string, unknown>),
      status: "DONE",
      commit: { hash: headCommit.hash, message: headCommit.message },
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
    };

    const existingComments = Array.isArray(nextFrontmatter.comments)
      ? nextFrontmatter.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item &&
            typeof item === "object" &&
            "author" in item &&
            "body" in item &&
            typeof (item as { author?: unknown }).author === "string" &&
            typeof (item as { body?: unknown }).body === "string",
        )
      : [];
    nextFrontmatter.comments = [...existingComments, { author: opts.author, body: opts.body }];

    const nextText = renderTaskReadme(nextFrontmatter, task.body);
    await writeFile(task.readmePath, nextText, "utf8");

    await writeTasksExport({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
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

    process.stdout.write("✅ finished\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "finish", root: opts.rootOverride ?? null });
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

    await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
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
    throw mapCoreError(err, { command: "work start", root: opts.rootOverride ?? null });
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

    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
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
    throw mapCoreError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}

async function cmdPrUpdate(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
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
    throw mapCoreError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}

async function cmdPrCheck(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const task = await readTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
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

    if (task.frontmatter.verify.length > 0) {
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
    throw mapCoreError(err, { command: "pr check", root: opts.rootOverride ?? null });
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

      const tasks = await listTasks({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
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

    if (opts.hook === "pre-push") {
      return 0;
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: `hooks run ${opts.hook}`, root: opts.rootOverride ?? null });
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

const TASK_DOC_SET_USAGE =
  "Usage: agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>)";

type TaskDocSetFlags = {
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
};

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
    const updated = await setTaskDocSection({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
      section: flags.section,
      text,
      updatedBy,
    });
    process.stdout.write(`${updated.readmePath}\n`);
    return 0;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.startsWith("Unknown doc section:")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message });
    }
    throw mapCoreError(err, { command: "task doc set", root: opts.rootOverride ?? null });
  }
}

export async function runCli(argv: string[]): Promise<number> {
  try {
    const { globals, rest } = parseGlobalArgs(argv);

    if (globals.version) {
      process.stdout.write(`${getVersion()}\n`);
      return 0;
    }

    if (globals.help || rest.length === 0) {
      process.stdout.write(`${renderHelp()}\n`);
      return 0;
    }

    const [namespace, command, ...args] = rest;

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

    if (namespace === "task" && command === "new") {
      return await cmdTaskNew({ cwd: process.cwd(), rootOverride: globals.root, args });
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
      return await cmdTaskList({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "export") {
      return await cmdTaskExport({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "lint") {
      return await cmdTaskLint({ cwd: process.cwd(), rootOverride: globals.root });
    }

    if (namespace === "task" && command === "doc") {
      const [subcommand, taskId, ...restArgs] = args;
      if (subcommand !== "set" || !taskId) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: TASK_DOC_SET_USAGE });
      }
      return await cmdTaskDocSet({
        cwd: process.cwd(),
        rootOverride: globals.root,
        taskId,
        args: restArgs,
      });
    }

    if (namespace === "branch" && command === "base") {
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
        return await cmdGuardClean({ cwd: process.cwd(), rootOverride: globals.root });
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
        let allowTasks = false;
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
      });
    }

    if (namespace === "finish") {
      let taskId = command;
      let finishArgs = args;
      if (!taskId || taskId.startsWith("-")) {
        if (taskId?.startsWith("-")) {
          finishArgs = [taskId, ...args];
        }
        taskId = process.env.AGENT_PLANE_TASK_ID ?? "";
      }
      if (!taskId) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
      }

      let author = "";
      let body = "";
      for (let i = 0; i < finishArgs.length; i++) {
        const arg = finishArgs[i];
        if (!arg) continue;
        if (arg === "--author") {
          const next = finishArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          author = next;
          i++;
          continue;
        }
        if (arg === "--body") {
          const next = finishArgs[i + 1];
          if (!next) throw new CliError({ exitCode: 2, code: "E_USAGE", message: FINISH_USAGE });
          body = next;
          i++;
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
        taskId,
        author,
        body,
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

    process.stderr.write("Not implemented yet. Run `agentplane --help`.\n");
    return 2;
  } catch (err) {
    const jsonErrors = argv.includes("--json");

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
