import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";

import { resolveProject, loadConfig } from "@agentplaneorg/core";

import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { GitContext } from "../shared/git-context.js";
import { ensureNetworkApproved } from "../shared/network-approval.js";

type BumpKind = "patch" | "minor" | "major";

export type ReleaseApplyFlags = {
  plan?: string;
  yes: boolean;
  push: boolean;
  remote: string;
};

export type ReleaseApplyParsed = ReleaseApplyFlags;

type ReleaseVersionPlan = {
  prevTag: string | null;
  prevVersion: string;
  nextTag: string;
  nextVersion: string;
  bump: BumpKind;
};

type ReleaseApplyReport = {
  applied_at: string;
  plan_dir: string;
  notes_path: string;
  prev_version: string;
  next_version: string;
  prev_tag: string | null;
  next_tag: string;
  bump: BumpKind;
  checks: {
    clean_tracked_tree: true;
    tag_absent: true;
    notes_validated: true;
    npm_version_available_checked: boolean;
  };
  commit: { hash: string; subject: string } | null;
  push: { requested: boolean; remote: string; performed: boolean };
};

async function fileExists(p: string): Promise<boolean> {
  try {
    await readFile(p, "utf8");
    return true;
  } catch {
    return false;
  }
}

async function readJsonFile<T>(p: string): Promise<T> {
  return JSON.parse(await readFile(p, "utf8")) as T;
}

function assertNonEmptyString(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid ${label} (expected non-empty string).`,
    });
  }
  return value.trim();
}

function parseVersionPlan(raw: unknown): ReleaseVersionPlan {
  if (!raw || typeof raw !== "object") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Invalid version.json (expected object).",
    });
  }
  const obj = raw as Record<string, unknown>;
  const bumpRaw = assertNonEmptyString(obj.bump, "bump");
  if (bumpRaw !== "patch" && bumpRaw !== "minor" && bumpRaw !== "major") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid bump in version.json: ${bumpRaw}`,
    });
  }
  const prevTagVal = obj.prevTag;
  const prevTag = prevTagVal === null ? null : typeof prevTagVal === "string" ? prevTagVal : null;
  const prevVersion = assertNonEmptyString(obj.prevVersion, "prevVersion");
  const nextTag = assertNonEmptyString(obj.nextTag, "nextTag");
  const nextVersion = assertNonEmptyString(obj.nextVersion, "nextVersion");
  return { prevTag, prevVersion, nextTag, nextVersion, bump: bumpRaw };
}

async function findLatestPlanDir(gitRoot: string): Promise<string> {
  const base = path.join(gitRoot, ".agentplane", ".release", "plan");
  const runNames = await readdir(base);
  const runs = runNames
    .map((s) => s.trim())
    .filter(Boolean)
    .toSorted();
  const latest = runs.at(-1);
  if (!latest) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        "No release plan runs found under .agentplane/.release/plan/. Run `agentplane release plan` first.",
    });
  }
  return path.join(base, latest);
}

async function readPackageVersion(pkgJsonPath: string): Promise<string> {
  const raw = JSON.parse(await readFile(pkgJsonPath, "utf8")) as { version?: unknown };
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!version) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Missing package.json version: ${pkgJsonPath}`,
    });
  }
  return version;
}

async function readCoreDependencyVersion(pkgJsonPath: string): Promise<string> {
  const raw = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    dependencies?: Record<string, unknown>;
  };
  const value = raw.dependencies?.["@agentplaneorg/core"];
  const version = typeof value === "string" ? value.trim() : "";
  if (!version) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Missing dependency @agentplaneorg/core in ${pkgJsonPath}. ` +
        "Release parity requires packages/agentplane to pin @agentplaneorg/core to the same version.",
    });
  }
  return version;
}

async function replacePackageVersionInFile(
  pkgJsonPath: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(pkgJsonPath, "utf8");
  const replaced = text.replace(/"version"\s*:\s*"[^"]*"/u, `"version": "${nextVersion}"`);
  if (replaced === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Failed to update version in ${pkgJsonPath} (missing "version" field).`,
    });
  }
  await writeFile(pkgJsonPath, replaced, "utf8");
}

async function replaceAgentplanePackageMetadata(
  pkgJsonPath: string,
  nextVersion: string,
): Promise<void> {
  const text = await readFile(pkgJsonPath, "utf8");
  const withVersion = text.replace(/"version"\s*:\s*"[^"]*"/u, `"version": "${nextVersion}"`);
  if (withVersion === text) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Failed to update version in ${pkgJsonPath} (missing "version" field).`,
    });
  }
  const withDependency = withVersion.replace(
    /("@agentplaneorg\/core"\s*:\s*")[^"]*(")/u,
    `$1${nextVersion}$2`,
  );
  if (withDependency === withVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Failed to update @agentplaneorg/core dependency in ${pkgJsonPath}. ` +
        "Ensure packages/agentplane/package.json declares this dependency.",
    });
  }
  await writeFile(pkgJsonPath, withDependency, "utf8");
}

function cleanHookEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...gitEnv() };
  delete env.AGENTPLANE_TASK_ID;
  delete env.AGENTPLANE_STATUS_TO;
  delete env.AGENTPLANE_AGENT_ID;
  return env;
}

async function validateReleaseNotes(notesPath: string): Promise<void> {
  const content = await readFile(notesPath, "utf8");
  if (!/release\s+notes/i.test(content)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include a "Release Notes" heading in ${notesPath}.`,
    });
  }
  const bulletCount = content.split(/\r?\n/u).filter((line) => /^\s*[-*]\s+\S+/u.test(line)).length;
  if (bulletCount < 3) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include at least 3 bullet points in ${notesPath}.`,
    });
  }
  if (/[\u0400-\u04FF]/u.test(content)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must be written in English (no Cyrillic) in ${notesPath}.`,
    });
  }
}

async function maybeUpdateBunLockfile(gitRoot: string): Promise<void> {
  // GitHub publish uses `bun install --frozen-lockfile`, which will fail if the lockfile
  // needs regeneration after bumping workspace package versions.
  const bunLockPath = path.join(gitRoot, "bun.lock");
  const rootPkgPath = path.join(gitRoot, "package.json");
  if (!(await fileExists(bunLockPath))) return;
  if (!(await fileExists(rootPkgPath))) return;

  try {
    await execFileAsync("bun", ["install", "--ignore-scripts"], {
      cwd: gitRoot,
      env: process.env,
      maxBuffer: 50 * 1024 * 1024,
    });
  } catch (err) {
    const e = err as { message?: string } | null;
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        "Failed to update bun.lock via `bun install --ignore-scripts`.\n" +
        "Fix:\n" +
        "  1) Run `bun install --ignore-scripts` manually\n" +
        "  2) Re-run `agentplane release apply`\n" +
        (e?.message ? `\nDetails:\n${e.message}` : ""),
    });
  }
}

async function ensureCleanTrackedTree(gitRoot: string): Promise<void> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
    cwd: gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const dirty = String(stdout ?? "")
    .split(/\r?\n/u)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);
  if (dirty.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      "Release apply requires a clean tracked working tree.\n" +
      `Found tracked changes:\n${dirty.map((line) => `  ${line}`).join("\n")}`,
  });
}

async function ensureTagDoesNotExist(gitRoot: string, tag: string): Promise<void> {
  try {
    await execFileAsync("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `Tag already exists: ${tag}`,
    });
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code !== 1) throw err;
  }
}

async function ensureNpmVersionsAvailable(gitRoot: string, version: string): Promise<void> {
  const scriptPath = path.join(gitRoot, "scripts", "check-npm-version-availability.mjs");
  try {
    await execFileAsync("node", [scriptPath, "--version", version], {
      cwd: gitRoot,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (err) {
    const details = String(
      (err as { stderr?: string; stdout?: string; message?: string } | null)?.stderr ?? "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Pre-publish npm check failed for version ${version}. ` +
        "Ensure this version is not already published for @agentplaneorg/core and agentplane." +
        (details ? `\n\n${details}` : ""),
    });
  }
}

async function runReleasePrepublishGate(gitRoot: string): Promise<void> {
  try {
    await execFileAsync("bun", ["run", "release:prepublish"], {
      cwd: gitRoot,
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME ?? "agentplane-release",
        GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL ?? "agentplane-release@example.com",
        GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME ?? "agentplane-release",
        GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL ?? "agentplane-release@example.com",
      },
      maxBuffer: 200 * 1024 * 1024,
    });
  } catch (err) {
    const details = String(
      (err as { stderr?: string; stdout?: string; message?: string } | null)?.stderr ??
        (err as { stdout?: string; message?: string } | null)?.stdout ??
        (err as { message?: string } | null)?.message ??
        "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release prepublish gate failed. `agentplane release apply --push` requires a successful local `bun run release:prepublish` run before pushing the release tag." +
        (details ? `\n\n${details}` : ""),
    });
  }
}

async function writeReleaseApplyReport(
  gitRoot: string,
  report: ReleaseApplyReport,
): Promise<string> {
  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const dir = path.join(gitRoot, ".agentplane", ".release", "apply");
  await mkdir(dir, { recursive: true });
  const reportPath = path.join(dir, `${runId}.json`);
  const latestPath = path.join(dir, "latest.json");
  const text = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(reportPath, text, "utf8");
  await writeFile(latestPath, text, "utf8");
  return reportPath;
}

export const releaseApplySpec: CommandSpec<ReleaseApplyParsed> = {
  id: ["release", "apply"],
  group: "Release",
  summary: "Apply a prepared release: bump versions, validate notes, commit, and tag.",
  description:
    "Applies a release plan generated by `agentplane release plan`. This command does not author release notes; it expects a DOCS agent to have written docs/releases/vX.Y.Z.md. By default it applies a patch bump; minor/major bumps require explicit approval.",
  options: [
    {
      kind: "string",
      name: "plan",
      valueHint: "<path>",
      description:
        "Path to a release plan directory (defaults to the latest under .agentplane/.release/plan/).",
    },
    {
      kind: "boolean",
      name: "push",
      default: false,
      description: "Push the release commit and tag to the remote (requires --yes).",
    },
    {
      kind: "string",
      name: "remote",
      valueHint: "<name>",
      description: "Git remote to push to (default: origin).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description:
        "Approve minor/major bumps and allow pushing. Patch bumps can be applied without this flag.",
    },
  ],
  parse: (raw) => {
    return {
      plan: raw.opts.plan as string | undefined,
      push: raw.opts.push === true,
      remote: (raw.opts.remote as string | undefined) ?? "origin",
      yes: raw.opts.yes === true,
    };
  },
  validate: (p) => {
    if (p.push && p.yes !== true) {
      throw usageError({
        spec: releaseApplySpec,
        command: "release apply",
        message: "Option --push requires explicit approval. Re-run with --yes.",
      });
    }
    if (!p.remote.trim()) {
      throw usageError({
        spec: releaseApplySpec,
        command: "release apply",
        message: "Option --remote must be non-empty.",
      });
    }
  },
  examples: [
    {
      cmd: "agentplane release apply",
      why: "Apply the latest release plan (expects docs/releases/vX.Y.Z.md to exist).",
    },
    {
      cmd: "agentplane release apply --plan .agentplane/.release/plan/<runId>",
      why: "Apply a specific release plan directory.",
    },
    {
      cmd: "agentplane release apply --push --yes",
      why: "Apply and push the release commit+tag to the remote.",
    },
  ],
};

export const runReleaseApply: CommandHandler<ReleaseApplyParsed> = async (ctx, flags) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const gitRoot = resolved.gitRoot;

  const planDir = flags.plan ? path.resolve(gitRoot, flags.plan) : await findLatestPlanDir(gitRoot);
  const versionJsonPath = path.join(planDir, "version.json");
  if (!(await fileExists(versionJsonPath))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Missing version.json in plan dir: ${path.relative(gitRoot, versionJsonPath)}`,
    });
  }
  const plan = parseVersionPlan(await readJsonFile(versionJsonPath));

  if ((plan.bump === "minor" || plan.bump === "major") && flags.yes !== true) {
    throw usageError({
      spec: releaseApplySpec,
      command: "release apply",
      message: `Bump '${plan.bump}' requires explicit approval. Re-run with --yes.`,
    });
  }

  if (!/^v\d+\.\d+\.\d+$/u.test(plan.nextTag)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid nextTag in version.json (expected vX.Y.Z): ${plan.nextTag}`,
    });
  }

  const notesPath = path.join(gitRoot, "docs", "releases", `${plan.nextTag}.md`);
  if (!(await fileExists(notesPath))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message:
        `Missing release notes: ${path.relative(gitRoot, notesPath)}\n` +
        "Write this file using a DOCS agent before applying the release.",
    });
  }
  await validateReleaseNotes(notesPath);

  const corePkgPath = path.join(gitRoot, "packages", "core", "package.json");
  const agentplanePkgPath = path.join(gitRoot, "packages", "agentplane", "package.json");
  const [coreVersion, agentplaneVersion, coreDependencyVersion] = await Promise.all([
    readPackageVersion(corePkgPath),
    readPackageVersion(agentplanePkgPath),
    readCoreDependencyVersion(agentplanePkgPath),
  ]);
  if (coreVersion !== agentplaneVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Package versions must match before applying a release. ` +
        `packages/core=${coreVersion} packages/agentplane=${agentplaneVersion}`,
    });
  }
  if (coreDependencyVersion !== coreVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release dependency parity check failed before apply. " +
        `packages/agentplane dependency @agentplaneorg/core=${coreDependencyVersion} ` +
        `must match packages/core version ${coreVersion}.`,
    });
  }

  const git = new GitContext({ gitRoot });
  await ensureCleanTrackedTree(gitRoot);
  await ensureTagDoesNotExist(gitRoot, plan.nextTag);

  let npmVersionChecked = false;
  if (flags.push) {
    const loaded = await loadConfig(resolved.agentplaneDir);
    await ensureNetworkApproved({
      config: loaded.config,
      yes: flags.yes,
      reason: "release apply --push validates npm version availability and pushes over network",
      interactive: Boolean(process.stdin.isTTY),
    });
    await runReleasePrepublishGate(gitRoot);
    await ensureNpmVersionsAvailable(gitRoot, plan.nextVersion);
    npmVersionChecked = true;
  }

  let releaseCommit: { hash: string; subject: string } | null = null;
  if (coreVersion === plan.prevVersion) {
    await Promise.all([
      replacePackageVersionInFile(corePkgPath, plan.nextVersion),
      replaceAgentplanePackageMetadata(agentplanePkgPath, plan.nextVersion),
    ]);
  } else if (coreVersion === plan.nextVersion) {
    await replaceAgentplanePackageMetadata(agentplanePkgPath, plan.nextVersion);
  } else {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Current version does not match plan. ` +
        `current=${coreVersion} expected_prev=${plan.prevVersion} expected_next=${plan.nextVersion}\n` +
        "Re-run `agentplane release plan` to generate a fresh plan for this repo state.",
    });
  }

  await maybeUpdateBunLockfile(gitRoot);

  const stagePaths = [
    "packages/core/package.json",
    "packages/agentplane/package.json",
    path.relative(gitRoot, notesPath),
  ];
  if (await fileExists(path.join(gitRoot, "bun.lock"))) {
    stagePaths.push("bun.lock");
  }
  await git.stage(stagePaths);

  const staged = await git.statusStagedPaths();
  if (staged.length === 0) {
    process.stdout.write("No changes to commit.\n");
  } else {
    const subject = `✨ release: ${plan.nextTag}`;
    await git.commit({ message: subject, env: cleanHookEnv() });
    const { stdout: headHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    releaseCommit = { hash: String(headHash ?? "").trim(), subject };
  }

  await execFileAsync("git", ["tag", plan.nextTag], { cwd: gitRoot, env: gitEnv() });

  process.stdout.write(`Release tag created: ${plan.nextTag}\n`);
  if (flags.push) {
    await execFileAsync("git", ["push", flags.remote, "HEAD"], { cwd: gitRoot, env: gitEnv() });
    await execFileAsync("git", ["push", flags.remote, plan.nextTag], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    process.stdout.write(`Pushed: ${flags.remote} HEAD + ${plan.nextTag}\n`);
  } else {
    process.stdout.write(`Next: git push <remote> HEAD && git push <remote> ${plan.nextTag}\n`);
  }

  const reportPath = await writeReleaseApplyReport(gitRoot, {
    applied_at: new Date().toISOString(),
    plan_dir: path.relative(gitRoot, planDir),
    notes_path: path.relative(gitRoot, notesPath),
    prev_version: plan.prevVersion,
    next_version: plan.nextVersion,
    prev_tag: plan.prevTag,
    next_tag: plan.nextTag,
    bump: plan.bump,
    checks: {
      clean_tracked_tree: true,
      tag_absent: true,
      notes_validated: true,
      npm_version_available_checked: npmVersionChecked,
    },
    commit: releaseCommit,
    push: { requested: flags.push, remote: flags.remote, performed: flags.push },
  });
  process.stdout.write(`Release report: ${path.relative(gitRoot, reportPath)}\n`);

  return 0;
};
