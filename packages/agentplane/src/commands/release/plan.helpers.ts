import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type { BumpKind } from "./plan.spec.js";

export type Change = {
  hash: string;
  authorDateIso: string;
  subject: string;
};

type ParsedSemver = {
  major: number;
  minor: number;
  patch: number;
  prerelease: string[];
};

function parseSemver(version: string): ParsedSemver | null {
  const m =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/u.exec(
      version.trim(),
    );
  if (!m) return null;
  const major = Number(m[1]);
  const minor = Number(m[2]);
  const patch = Number(m[3]);
  if (![major, minor, patch].every((n) => Number.isInteger(n) && n >= 0)) return null;
  const prerelease = m[4] ? m[4].split(".") : [];
  if (prerelease.some((part) => /^\d+$/u.test(part) && part.length > 1 && part.startsWith("0"))) {
    return null;
  }
  return { major, minor, patch, prerelease };
}

function comparePrerelease(left: string[], right: string[]): number {
  if (left.length === 0 && right.length === 0) return 0;
  if (left.length === 0) return 1;
  if (right.length === 0) return -1;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = left[index];
    const rightPart = right[index];
    if (leftPart === undefined) return -1;
    if (rightPart === undefined) return 1;
    if (leftPart === rightPart) continue;
    const leftNumeric = /^\d+$/u.test(leftPart);
    const rightNumeric = /^\d+$/u.test(rightPart);
    if (leftNumeric && rightNumeric) return Number(leftPart) - Number(rightPart);
    if (leftNumeric) return -1;
    if (rightNumeric) return 1;
    return leftPart.localeCompare(rightPart);
  }
  return 0;
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
  if (leftParsed.patch !== rightParsed.patch) return leftParsed.patch - rightParsed.patch;
  return comparePrerelease(leftParsed.prerelease, rightParsed.prerelease);
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
  if (!parsed || parsed.prerelease.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid stable version (expected X.Y.Z): ${version}`,
    });
  }
  if (bump === "patch") return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
  if (bump === "minor") return `${parsed.major}.${parsed.minor + 1}.0`;
  return `${parsed.major + 1}.0.0`;
}

export function releaseVersionFromDevelopment(
  workspaceVersion: string,
  latestPublishedVersion: string | null,
): string | null {
  const workspace = parseSemver(workspaceVersion);
  if (!workspace) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid workspace version: ${workspaceVersion}`,
    });
  }
  if (workspace.prerelease.length === 0) return null;
  const published = latestPublishedVersion ? parseSemver(latestPublishedVersion) : null;
  if (!published || published.prerelease.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Release planning requires a latest stable tag before finalizing development version ${workspaceVersion}. ` +
        `Observed tag version: ${latestPublishedVersion ?? "missing"}.`,
    });
  }
  const expectedCore = `${published.major}.${published.minor}.${published.patch + 1}`;
  const workspaceCore = `${workspace.major}.${workspace.minor}.${workspace.patch}`;
  const [label, sequence, ...extra] = workspace.prerelease;
  const validBetaSequence =
    label === "beta" &&
    typeof sequence === "string" &&
    /^[1-9]\d*$/u.test(sequence) &&
    extra.length === 0;
  if (workspaceCore !== expectedCore || !validBetaSequence) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Unsupported development version ${workspaceVersion}. ` +
        `Expected ${expectedCore}-beta.N above latest stable version ${latestPublishedVersion}.`,
    });
  }
  return workspaceCore;
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
