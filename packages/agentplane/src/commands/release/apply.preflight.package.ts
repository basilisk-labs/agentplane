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
