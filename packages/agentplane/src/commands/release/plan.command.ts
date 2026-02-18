import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";

type BumpKind = "patch" | "minor" | "major";

export type ReleasePlanFlags = {
  bump: BumpKind;
  since?: string;
  yes: boolean;
};

export type ReleasePlanParsed = ReleasePlanFlags;

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

function releaseInstructions(opts: {
  nextTag: string;
  prevTag: string | null;
  bump: BumpKind;
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
    `- Use human-readable bullets focused on outcomes and user-facing improvements.\n` +
    `- Include as many bullets as needed; do not enforce a fixed bullet count.\n` +
    `- Do not include Cyrillic.\n` +
    `- Use \`docs/releases/TEMPLATE.md\` as the structure.\n\n` +
    `Inputs:\n` +
    `- \`changes.md\` and \`changes.json\` in this directory.\n`
  );
}

export const releasePlanSpec: CommandSpec<ReleasePlanParsed> = {
  id: ["release", "plan"],
  group: "Release",
  summary: "Generate an agent-assisted release plan (changes list + next patch version).",
  description:
    "Generates a structured changes list since the last semver tag and writes a plan directory under .agentplane/.release/. This plan is intended for a DOCS agent to author release notes. By default, only patch bumps are allowed without explicit approval.",
  options: [
    {
      kind: "boolean",
      name: "patch",
      default: false,
      description: "Bump patch version (default).",
    },
    {
      kind: "boolean",
      name: "minor",
      default: false,
      description: "Bump minor version (requires --yes).",
    },
    {
      kind: "boolean",
      name: "major",
      default: false,
      description: "Bump major version (requires --yes).",
    },
    {
      kind: "string",
      name: "since",
      valueHint: "<tag>",
      description: "Override the starting tag/ref (defaults to the latest vX.Y.Z tag).",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Approve minor/major version bumps (required for --minor/--major).",
    },
  ],
  validateRaw: (raw) => {
    const count = [
      raw.opts.patch === true,
      raw.opts.minor === true,
      raw.opts.major === true,
    ].filter(Boolean).length;
    if (count > 1) {
      throw usageError({
        spec: releasePlanSpec,
        command: "release plan",
        message: "Options --patch/--minor/--major are mutually exclusive.",
      });
    }
  },
  parse: (raw) => {
    const bump: BumpKind =
      raw.opts.major === true ? "major" : raw.opts.minor === true ? "minor" : "patch";
    return { bump, since: raw.opts.since as string | undefined, yes: raw.opts.yes === true };
  },
  validate: (p) => {
    if ((p.bump === "minor" || p.bump === "major") && p.yes !== true) {
      throw usageError({
        spec: releasePlanSpec,
        command: "release plan",
        message: `Bump '${p.bump}' requires explicit approval. Re-run with --yes.`,
      });
    }
  },
  examples: [
    {
      cmd: "agentplane release plan",
      why: "Generate a plan for the next patch release and hand it to a DOCS agent to write release notes.",
    },
    {
      cmd: "agentplane release plan --minor --yes",
      why: "Generate a plan for the next minor release (explicit approval required).",
    },
  ],
};

export const runReleasePlan: CommandHandler<ReleasePlanParsed> = async (ctx, flags) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const gitRoot = resolved.gitRoot;

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
  const nextVersion = bumpVersion(coreVersion, flags.bump);
  const nextTag = `v${nextVersion}`;
  const changes = await listChanges(gitRoot, prevTag);

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
    releaseInstructions({ nextTag, prevTag, bump: flags.bump }),
    "utf8",
  );

  process.stdout.write(`Release plan written: ${path.relative(gitRoot, baseDir)}\n`);
  process.stdout.write(`Next tag: ${nextTag}\n`);
  process.stdout.write(
    `Hint: Create a DOCS task to write docs/releases/${nextTag}.md based on this plan.\n`,
  );

  return 0;
};
