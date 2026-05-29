import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";
import { gitEnv, resolveBaseBranch } from "@agentplaneorg/core/git";
import { resolveProject } from "@agentplaneorg/core/project";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import type { ReleasePlanParsed } from "./plan.spec.js";
import {
  bumpVersion,
  changesMarkdown,
  compareSemver,
  listMissingPatchTags,
  normalizeTagVersion,
  releaseInstructions,
  requiredBulletCount,
  type Change,
} from "./plan.helpers.js";
const output = createCliEmitter();

export { releasePlanSpec } from "./plan.spec.js";

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
        "Release planning requires packages/agentplane to pin @agentplaneorg/core to the same version.",
    });
  }
  return version;
}

function listIncidentEntries(text: string): string[] {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- id:"));
}

function incidentId(entry: string): string {
  const match = /\bid:\s*([^|]+)/u.exec(entry);
  return match?.[1]?.trim() ?? "(missing id)";
}

async function ensureReleaseIncidentsClean(gitRoot: string): Promise<void> {
  const incidentsPath = path.join(gitRoot, ".agentplane", "policy", "incidents.md");
  let text = "";
  try {
    text = await readFile(incidentsPath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
    throw err;
  }

  const entries = listIncidentEntries(text);
  if (entries.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Release planning blocked: .agentplane/policy/incidents.md contains ${entries.length} active incident entr${entries.length === 1 ? "y" : "ies"}: ` +
      entries.map((entry) => incidentId(entry)).join(", "),
    context: withDiagnosticContext(
      { command: "release plan" },
      {
        state: "release planning cannot start while the active incident registry is non-empty",
        likelyCause:
          "release work must be preceded by a dedicated incident review/fix task that archives final evidence and cleans incidents.md",
        nextAction: {
          command: "node scripts/check-release-incidents.mjs",
          reason:
            "list the active incident entries that must be resolved or archived before generating release tasks",
          reasonCode: "release_incidents_not_cleared",
        },
      },
    ),
  });
}

async function getLatestSemverTag(gitRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["describe", "--tags", "--abbrev=0", "--match", "v[0-9]*.[0-9]*.[0-9]*"],
      { cwd: gitRoot, env: gitEnv() },
    );
    const tag = String(stdout ?? "").trim();
    return tag || null;
  } catch {
    return null;
  }
}

async function listChanges(gitRoot: string, sinceRef: string | null): Promise<Change[]> {
  const range = sinceRef ? `${sinceRef}..HEAD` : "HEAD";
  const { stdout } = await execFileAsync(
    "git",
    ["log", "--no-merges", "--pretty=format:%H%x00%aI%x00%s", range],
    { cwd: gitRoot, env: gitEnv(), maxBuffer: 10 * 1024 * 1024 },
  );
  const text = String(stdout ?? "");
  const lines = text.split("\n").filter((l) => l.length > 0);
  const out: Change[] = [];
  for (const line of lines) {
    const parts = line.split("\0");
    const hash = (parts[0] ?? "").trim();
    const authorDateIso = (parts[1] ?? "").trim();
    const subject = (parts[2] ?? "").trim();
    if (!hash || !authorDateIso || !subject) continue;
    out.push({ hash, authorDateIso, subject });
  }
  return out;
}

async function currentHead(gitRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return String(stdout ?? "").trim();
}

async function currentBranch(gitRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  return String(stdout ?? "").trim();
}

async function revParseOptional(gitRoot: string, ref: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const sha = String(stdout ?? "").trim();
    return sha || null;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1 || code === 128) return null;
    throw err;
  }
}

async function resolveProtectedBaseShaForPlan(opts: {
  cwd: string;
  rootOverride?: string | null;
  gitRoot: string;
  agentplaneDir: string;
}): Promise<string> {
  const loaded = await loadConfig(opts.agentplaneDir);
  if (loaded.config.workflow_mode !== "branch_pr") return await currentHead(opts.gitRoot);

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    mode: loaded.config.workflow_mode,
  });
  const branch = await currentBranch(opts.gitRoot);
  if (!baseBranch || branch === baseBranch) return await currentHead(opts.gitRoot);

  const refs = [`refs/remotes/origin/${baseBranch}`, `refs/heads/${baseBranch}`, baseBranch];
  for (const ref of refs) {
    const sha = await revParseOptional(opts.gitRoot, ref);
    if (sha) return sha;
  }

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Release planning could not resolve protected base branch ${baseBranch}.\n` +
      "Fetch or create the protected base branch before generating a branch_pr release plan.",
    context: withDiagnosticContext(
      { command: "release plan" },
      {
        state: "the protected base branch could not be resolved for release planning",
        likelyCause:
          "the current checkout is a branch_pr candidate branch, but neither origin nor local refs expose the configured base branch",
        nextAction: {
          command: `git fetch origin ${baseBranch}`,
          reason: "refresh the protected base branch tip before freezing the release scope",
          reasonCode: "release_plan_base_unresolved",
        },
      },
    ),
  });
}

export const runReleasePlan: CommandHandler<ReleasePlanParsed> = async (ctx, flags) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const gitRoot = resolved.gitRoot;
  await ensureReleaseIncidentsClean(gitRoot);

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
        `Package versions must match before release planning. ` +
        `packages/core=${coreVersion} packages/agentplane=${agentplaneVersion}`,
    });
  }
  if (coreDependencyVersion !== coreVersion) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        "Release dependency parity check failed before planning. " +
        `packages/agentplane dependency @agentplaneorg/core=${coreDependencyVersion} ` +
        `must match packages/core version ${coreVersion}.`,
    });
  }

  const prevTag = flags.since ?? (await getLatestSemverTag(gitRoot));
  const latestPublishedVersion = normalizeTagVersion(prevTag);
  if (latestPublishedVersion && compareSemver(coreVersion, latestPublishedVersion) > 0) {
    const missingTags = listMissingPatchTags(latestPublishedVersion, coreVersion);
    const missingText = missingTags.length > 0 ? missingTags.join(", ") : coreVersion;
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Release planning blocked: workspace version is already ${coreVersion} while the latest published/tagged release is ${prevTag}. ` +
        `Publish or recover the missing release sequence first: ${missingText}.`,
    });
  }
  const nextVersion = bumpVersion(coreVersion, flags.bump);
  const nextTag = `v${nextVersion}`;
  const baseSha = await resolveProtectedBaseShaForPlan({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    gitRoot,
    agentplaneDir: resolved.agentplaneDir,
  });
  const changes = await listChanges(gitRoot, prevTag);
  const minBullets = requiredBulletCount(changes.length);

  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const baseDir = path.join(gitRoot, ".agentplane", ".release", "plan", runId);
  await mkdir(baseDir, { recursive: true });

  await writeFile(
    path.join(baseDir, "version.json"),
    JSON.stringify(
      { prevTag, prevVersion: coreVersion, nextTag, nextVersion, bump: flags.bump, baseSha },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(baseDir, "changes.json"),
    JSON.stringify(changes, null, 2) + "\n",
    "utf8",
  );
  await writeFile(path.join(baseDir, "changes.md"), changesMarkdown(changes), "utf8");
  await writeFile(
    path.join(baseDir, "instructions.md"),
    releaseInstructions({ nextTag, prevTag, bump: flags.bump, minBullets }),
    "utf8",
  );

  output.lines([
    `Release plan written: ${path.relative(gitRoot, baseDir)}`,
    `Next tag: ${nextTag}`,
    `Hint: Create a DOCS task to write docs/releases/${nextTag}.md based on this plan.`,
  ]);

  return 0;
};
