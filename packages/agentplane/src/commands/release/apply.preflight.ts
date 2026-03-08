import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";

import type { PlanChange, ReleaseVersionPlan } from "./apply.types.js";

export async function fileExists(p: string): Promise<boolean> {
  try {
    await readFile(p, "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function readJsonFile<T>(p: string): Promise<T> {
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

export function parseVersionPlan(raw: unknown): ReleaseVersionPlan {
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

export async function findLatestPlanDir(gitRoot: string): Promise<string> {
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

export async function readPackageVersion(pkgJsonPath: string): Promise<string> {
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

export async function readCoreDependencyVersion(pkgJsonPath: string): Promise<string> {
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

export async function validateReleaseNotes(notesPath: string, minBullets: number): Promise<void> {
  const content = await readFile(notesPath, "utf8");
  if (!/release\s+notes/i.test(content)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include a "Release Notes" heading in ${notesPath}.`,
    });
  }
  const bulletCount = content.split(/\r?\n/u).filter((line) => /^\s*[-*]\s+\S+/u.test(line)).length;
  if (bulletCount < minBullets) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include at least ${minBullets} bullet points in ${notesPath}.`,
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

export async function ensureCleanTrackedTree(gitRoot: string): Promise<void> {
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
    context: withDiagnosticContext(
      { command: "release apply" },
      {
        state: "release apply cannot start from a dirty tracked tree",
        likelyCause:
          "the release flow needs to create one deterministic version-bump commit and tag, but tracked edits already exist in the workspace",
        nextAction: {
          command: "git status --short --untracked-files=no",
          reason:
            "inspect or clear tracked changes before rerunning `agentplane release apply --push --yes`",
          reasonCode: "release_dirty_tree",
        },
      },
    ),
  });
}

export async function ensureTagDoesNotExist(gitRoot: string, tag: string): Promise<void> {
  try {
    await execFileAsync("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `Tag already exists: ${tag}`,
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "the target release tag already exists locally",
          likelyCause:
            "the release version was already applied earlier, or a previous release attempt created the tag before failing later in the flow",
          nextAction: {
            command: `git show --stat --oneline ${tag}`,
            reason:
              "inspect the existing tag before deciding whether to reuse it or plan a new version",
            reasonCode: "release_tag_exists",
          },
        },
      ),
    });
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code !== 1) throw err;
  }
}

export async function ensureRemoteExists(gitRoot: string, remote: string): Promise<void> {
  try {
    await execFileAsync("git", ["remote", "get-url", remote], {
      cwd: gitRoot,
      env: gitEnv(),
    });
  } catch (err) {
    const details = String(
      (err as { stderr?: string; message?: string } | null)?.stderr ??
        (err as { message?: string } | null)?.message ??
        "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: `Git remote is not configured: ${remote}` + (details ? `\n\n${details}` : ""),
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "the configured release remote does not exist locally",
          likelyCause:
            "release apply was asked to push, but the selected git remote is missing or misconfigured in this checkout",
          nextAction: {
            command: "git remote -v",
            reason: "inspect configured remotes before rerunning release apply with --push",
            reasonCode: "release_remote_missing",
          },
        },
      ),
    });
  }
}

export async function ensureRemoteTagDoesNotExist(
  gitRoot: string,
  remote: string,
  tag: string,
): Promise<void> {
  let stdout = "";
  try {
    const out = await execFileAsync("git", ["ls-remote", "--tags", remote, `refs/tags/${tag}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    stdout = String(out.stdout ?? "").trim();
  } catch (err) {
    const details = String(
      (err as { stderr?: string; message?: string } | null)?.stderr ??
        (err as { message?: string } | null)?.message ??
        "",
    ).trim();
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        `Failed to inspect remote tag state for ${remote}/${tag}.` +
        (details ? `\n\n${details}` : ""),
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "release apply could not verify the remote tag state",
          likelyCause:
            "the remote is configured, but git could not query it for the target release tag before the release started",
          nextAction: {
            command: `git ls-remote --tags ${remote} refs/tags/${tag}`,
            reason: "inspect remote tag visibility before retrying the release push path",
            reasonCode: "release_remote_tag_check_failed",
          },
        },
      ),
    });
  }

  if (!stdout) return;

  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message: `Remote tag already exists: ${remote}/${tag}`,
    context: withDiagnosticContext(
      { command: "release apply" },
      {
        state: "the target release tag already exists on the remote",
        likelyCause:
          "a previous release or partial push already published this tag upstream, so pushing the same version again would drift the local release state",
        nextAction: {
          command: `git ls-remote --tags ${remote} refs/tags/${tag}`,
          reason:
            "inspect the existing remote tag before deciding whether to recover or bump to a new version",
          reasonCode: "release_remote_tag_exists",
        },
      },
    ),
  });
}

export async function ensureNpmVersionsAvailable(gitRoot: string, version: string): Promise<void> {
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
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "the target npm version is not publishable",
          likelyCause:
            "that version is already burned in npm history for one of the published packages, even if it is no longer the current dist-tag",
          nextAction: {
            command: `node scripts/check-npm-version-availability.mjs --version ${version}`,
            reason:
              "inspect which package already consumed the target version before choosing a new release number",
            reasonCode: "release_npm_version_burned",
          },
        },
      ),
    });
  }
}

export async function runReleasePrepublishGate(gitRoot: string): Promise<void> {
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
      context: withDiagnosticContext(
        { command: "release apply" },
        {
          state: "release prepublish validation failed before pushing the release",
          likelyCause:
            "one of the local publish gates rejected the current repository state, so the release cannot be pushed safely yet",
          nextAction: {
            command: "bun run release:prepublish",
            reason:
              "rerun the exact local publish gate and fix the reported failure before retrying release apply",
            reasonCode: "release_prepublish_failed",
          },
        },
      ),
    });
  }
}

export async function loadReleasePlan(opts: { gitRoot: string; planOverride?: string }): Promise<{
  planDir: string;
  versionJsonPath: string;
  plan: ReleaseVersionPlan;
  changes: PlanChange[];
  minBullets: number;
}> {
  const planDir = opts.planOverride
    ? path.resolve(opts.gitRoot, opts.planOverride)
    : await findLatestPlanDir(opts.gitRoot);
  const versionJsonPath = path.join(planDir, "version.json");
  if (!(await fileExists(versionJsonPath))) {
    throw new CliError({
      exitCode: exitCodeForError("E_IO"),
      code: "E_IO",
      message: `Missing version.json in plan dir: ${path.relative(opts.gitRoot, versionJsonPath)}`,
    });
  }
  const plan = parseVersionPlan(await readJsonFile(versionJsonPath));
  const changesJsonPath = path.join(planDir, "changes.json");
  const changes = (await fileExists(changesJsonPath))
    ? await readJsonFile<PlanChange[]>(changesJsonPath)
    : [];
  return {
    planDir,
    versionJsonPath,
    plan,
    changes,
    minBullets: Math.max(1, Array.isArray(changes) ? changes.length : 0),
  };
}
