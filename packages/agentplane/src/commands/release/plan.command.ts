import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import type { BumpKind, ReleasePlanParsed } from "./plan.spec.js";
const output = createCliEmitter();

export { releasePlanSpec } from "./plan.spec.js";

type Change = {
  hash: string;
  authorDateIso: string;
  subject: string;
};

function parseSemver(version: string): { major: number; minor: number; patch: number } | null {
  const m = /^(\d+)\.(\d+)\.(\d+)$/u.exec(version.trim());
  if (!m) return null;
  const major = Number(m[1]);
  const minor = Number(m[2]);
  const patch = Number(m[3]);
  if (![major, minor, patch].every((n) => Number.isInteger(n) && n >= 0)) return null;
  return { major, minor, patch };
}

function compareSemver(left: string, right: string): number {
  const leftParsed = parseSemver(left);
  const rightParsed = parseSemver(right);
  if (!leftParsed || !rightParsed) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid semver comparison: ${left} vs ${right}`,
    });
  }
  if (leftParsed.major !== rightParsed.major) return leftParsed.major - rightParsed.major;
  if (leftParsed.minor !== rightParsed.minor) return leftParsed.minor - rightParsed.minor;
  return leftParsed.patch - rightParsed.patch;
}

function normalizeTagVersion(tag: string | null): string | null {
  if (!tag) return null;
  return tag.startsWith("v") ? tag.slice(1) : tag;
}

function listMissingPatchTags(fromVersion: string, toVersion: string): string[] {
  const fromParsed = parseSemver(fromVersion);
  const toParsed = parseSemver(toVersion);
  if (!fromParsed || !toParsed) return [];
  if (
    fromParsed.major !== toParsed.major ||
    fromParsed.minor !== toParsed.minor ||
    toParsed.patch <= fromParsed.patch
  ) {
    return [];
  }
  const out: string[] = [];
  for (let patch = fromParsed.patch + 1; patch <= toParsed.patch; patch += 1) {
    out.push(`v${fromParsed.major}.${fromParsed.minor}.${patch}`);
  }
  return out;
}

function bumpVersion(version: string, bump: BumpKind): string {
  const parsed = parseSemver(version);
  if (!parsed) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid version (expected X.Y.Z): ${version}`,
    });
  }
  if (bump === "patch") return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  if (bump === "minor") return `${parsed.major}.${parsed.minor + 1}.0`;
  return `${parsed.major + 1}.0.0`;
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

function changesMarkdown(changes: Change[]): string {
  if (changes.length === 0) return "_No commits found in the selected range._\n";
  return (
    changes
      .map((c) => `- ${c.subject} (${c.hash.slice(0, 7)})`)
      .join("\n")
      .trim() + "\n"
  );
}

function requiredBulletCount(changeCount: number): number {
  return Math.max(1, changeCount);
}

function releaseInstructions(opts: {
  nextTag: string;
  prevTag: string | null;
  bump: BumpKind;
  minBullets: number;
}): string {
  return (
    `# Release plan\n\n` +
    `## Target\n\n` +
    `- Tag: \`${opts.nextTag}\`\n` +
    (opts.prevTag
      ? `- Since: \`${opts.prevTag}\`\n`
      : "- Since: (no previous semver tag found)\n") +
    `- Bump: \`${opts.bump}\`\n\n` +
    `## Agent task: write release notes\n\n` +
    `Write English release notes as \`docs/releases/${opts.nextTag}.md\`.\n\n` +
    `Rules:\n` +
    `- Use detailed, human-readable bullets focused on outcomes and user-facing improvements.\n` +
    `- Cover all listed differences from \`changes.md\`; do not omit commits.\n` +
    `- Keep one concrete bullet per listed change in plain language.\n` +
    `- Write at least ${opts.minBullets} bullet points.\n` +
    `- Do not include Cyrillic.\n` +
    `- Use \`docs/releases/TEMPLATE.md\` as the structure.\n\n` +
    `Inputs:\n` +
    `- \`changes.md\` and \`changes.json\` in this directory.\n`
  );
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
  const changes = await listChanges(gitRoot, prevTag);
  const minBullets = requiredBulletCount(changes.length);

  const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
  const baseDir = path.join(gitRoot, ".agentplane", ".release", "plan", runId);
  await mkdir(baseDir, { recursive: true });

  await writeFile(
    path.join(baseDir, "version.json"),
    JSON.stringify(
      { prevTag, prevVersion: coreVersion, nextTag, nextVersion, bump: flags.bump },
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
