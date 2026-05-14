import { readFile } from "node:fs/promises";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import releaseNotesRules from "./release-notes-rules.json" with { type: "json" };

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

const RELEASE_NOTE_TEMPLATE_PLACEHOLDERS = releaseNotesRules.templatePlaceholders;
const REQUIRED_RELEASE_NOTE_SECTIONS = releaseNotesRules.requiredSections;

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function releaseNotesHeadingPresent(content: string, notesPath: string): boolean {
  const tag = /v\d+\.\d+\.\d+(?:[-.\w]*)?\.md$/u.exec(notesPath)?.[0]?.replace(/\.md$/u, "");
  const tagPattern = tag ? String.raw`\s*(?:[-:—]\s*)?${escapeRegExp(tag)}` : "";
  const headingPattern = new RegExp(String.raw`^#\s+Release\s+Notes${tagPattern}\s*$`, "iu");
  return releaseNoteLinesOutsideCodeFences(content).some((line) => headingPattern.test(line));
}

function sectionHeadings(content: string): string[] {
  return releaseNoteLinesOutsideCodeFences(content).flatMap((line) => {
    const heading = /^##\s+(.+?)\s*$/u.exec(line)?.[1]?.trim();
    return heading ? [heading] : [];
  });
}

function missingRequiredSections(content: string): string[] {
  const headings = new Set(sectionHeadings(content).map((heading) => heading.toLowerCase()));
  return REQUIRED_RELEASE_NOTE_SECTIONS.filter((section) => !headings.has(section.toLowerCase()));
}

function duplicateSectionHeadings(content: string): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const heading of sectionHeadings(content)) {
    if (!heading) continue;
    const key = heading.toLowerCase();
    if (seen.has(key)) duplicates.add(heading);
    seen.add(key);
  }
  return [...duplicates].toSorted((a, b) => a.localeCompare(b));
}

function releaseNoteLinesOutsideCodeFences(content: string): string[] {
  const lines = content.split(/\r?\n/u);
  let inFence = false;
  const visibleLines: string[] = [];
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) visibleLines.push(line);
  }
  return visibleLines;
}

function unreplacedTemplateBullet(content: string): string | null {
  const placeholders: ReadonlySet<string> = new Set(RELEASE_NOTE_TEMPLATE_PLACEHOLDERS);
  for (const line of releaseNoteLinesOutsideCodeFences(content)) {
    const match = /^\s*[-*]\s+(.+?)\s*$/u.exec(line);
    if (match?.[1] && placeholders.has(match[1])) return match[1];
  }
  return null;
}

export async function validateReleaseNotes(notesPath: string, minBullets: number): Promise<void> {
  const content = await readFile(notesPath, "utf8");
  if (!releaseNotesHeadingPresent(content, notesPath)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include a top-level "Release Notes - vX.Y.Z" heading in ${notesPath}.`,
    });
  }
  const missingSections = missingRequiredSections(content);
  if (missingSections.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must include required template sections in ${notesPath}: ${missingSections.join(", ")}`,
    });
  }
  if (/^##\s+Writing Rules\s*$/mu.test(content)) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must not include template writing instructions in ${notesPath}.`,
    });
  }
  const templateBullet = unreplacedTemplateBullet(content);
  if (templateBullet) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must replace template placeholder bullet in ${notesPath}: ${templateBullet}`,
    });
  }
  const duplicateHeadings = duplicateSectionHeadings(content);
  if (duplicateHeadings.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Release notes must not include duplicate section headings in ${notesPath}: ${duplicateHeadings.join(", ")}`,
    });
  }
  const bulletCount = releaseNoteLinesOutsideCodeFences(content).filter((line) =>
    /^\s*[-*]\s+\S+/u.test(line),
  ).length;
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
