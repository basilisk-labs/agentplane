import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { BumpKind } from "./plan.spec.js";

export type Change = {
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

export function compareSemver(left: string, right: string): number {
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

export function normalizeTagVersion(tag: string | null): string | null {
  if (!tag) return null;
  return tag.startsWith("v") ? tag.slice(1) : tag;
}

export function listMissingPatchTags(fromVersion: string, toVersion: string): string[] {
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

export function bumpVersion(version: string, bump: BumpKind): string {
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

export function changesMarkdown(changes: Change[]): string {
  if (changes.length === 0) return "_No commits found in the selected range._\n";
  return (
    changes
      .map((c) => `- ${c.subject} (${c.hash.slice(0, 7)})`)
      .join("\n")
      .trim() + "\n"
  );
}

export function requiredBulletCount(changeCount: number): number {
  return Math.max(1, changeCount);
}

export function releaseInstructions(opts: {
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
