import { readFile } from "node:fs/promises";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

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

async function readDependencyVersion(pkgJsonPath: string, dependencyName: string): Promise<string> {
  const raw = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    dependencies?: Record<string, unknown>;
  };
  const value = raw.dependencies?.[dependencyName];
  const version = typeof value === "string" ? value.trim() : "";
  if (!version) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Missing dependency ${dependencyName} in ${pkgJsonPath}. ` +
        `Release parity requires packages/agentplane to pin ${dependencyName} to the same version.`,
    });
  }
  return version;
}

export async function readCoreDependencyVersion(pkgJsonPath: string): Promise<string> {
  return await readDependencyVersion(pkgJsonPath, "@agentplaneorg/core");
}

export async function readRecipesDependencyVersion(pkgJsonPath: string): Promise<string> {
  return await readDependencyVersion(pkgJsonPath, "@agentplaneorg/recipes");
}

export async function readAgentplaneDependencyVersion(pkgJsonPath: string): Promise<string> {
  return await readDependencyVersion(pkgJsonPath, "agentplane");
}

export async function readOptionalAgentplaneDependencyVersion(
  pkgJsonPath: string,
): Promise<string | null> {
  const raw = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    dependencies?: Record<string, unknown>;
  };
  const value = raw.dependencies?.agentplane;
  const version = typeof value === "string" ? value.trim() : "";
  return version || null;
}

const RELEASE_NOTE_TEMPLATE_PLACEHOLDERS = [
  "2-4 bullets with the main release outcomes in plain language.",
  "New features or capabilities.",
  "Behavior/UX improvements that users will notice.",
  "Bug fixes and regressions.",
  'Breaking changes, migration steps, or "none".',
  "Release checks completed (for example: release:prepublish, parity, publish gates).",
  "Cover all differences from the release plan (`changes.md`/`changes.json`).",
  "Use detailed, human-readable language, not raw commit log text.",
  "Keep concrete bullets with explicit outcomes.",
  "Keep at least one bullet per listed change from `changes.md`/`changes.json`.",
] as const;

function duplicateSectionHeadings(content: string): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const match of content.matchAll(/^##\s+(.+?)\s*$/gmu)) {
    const heading = match[1]?.trim();
    if (!heading) continue;
    const key = heading.toLowerCase();
    if (seen.has(key)) duplicates.add(heading);
    seen.add(key);
  }
  return [...duplicates].toSorted((a, b) => a.localeCompare(b));
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
  if (/^##\s+Writing Rules\s*$/mu.test(content)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must not include template writing instructions in ${notesPath}.`,
    });
  }
  for (const placeholder of RELEASE_NOTE_TEMPLATE_PLACEHOLDERS) {
    if (content.includes(placeholder)) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Release notes must replace template placeholder text in ${notesPath}: ${placeholder}`,
      });
    }
  }
  const duplicateHeadings = duplicateSectionHeadings(content);
  if (duplicateHeadings.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must not include duplicate section headings in ${notesPath}: ${duplicateHeadings.join(", ")}`,
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
