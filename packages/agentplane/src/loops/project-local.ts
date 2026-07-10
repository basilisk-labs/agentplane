import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { LoopSpec, LoopValidationProblem } from "./model.js";
import { validateLoopSpec } from "./validate.js";

export type ProjectLoopFileResult = {
  ok: boolean;
  path: string;
  loop?: LoopSpec;
  loopId?: string;
  errors: LoopValidationProblem[];
};

export type ProjectLoopDirectoryResult = {
  ok: boolean;
  directory: string;
  files: ProjectLoopFileResult[];
  errors: LoopValidationProblem[];
};

export function projectLoopsDirectory(projectRoot: string): string {
  return path.join(projectRoot, ".agentplane", "loops");
}

function problem(
  code: LoopValidationProblem["code"],
  message: string,
  problemPath?: string,
): LoopValidationProblem {
  return { code, message, ...(problemPath ? { path: problemPath } : {}) };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function normalizeLoopSpec(value: Record<string, unknown>): LoopSpec {
  return {
    ...value,
    schemaVersion: value.schemaVersion ?? value.schema_version,
    appliesTo: value.appliesTo ?? value.applies_to ?? {},
    stopConditions: value.stopConditions ?? value.stop_conditions ?? [],
  } as LoopSpec;
}

export function parseProjectLoopJsonInternal(raw: string, filePath: string): ProjectLoopFileResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return {
      ok: false,
      path: filePath,
      errors: [
        problem(
          "empty_field",
          `Loop file ${JSON.stringify(filePath)} is not valid JSON: ${
            err instanceof Error ? err.message : String(err)
          }`,
        ),
      ],
    };
  }
  if (!isObject(parsed)) {
    return {
      ok: false,
      path: filePath,
      errors: [problem("empty_field", `Loop file ${JSON.stringify(filePath)} must be an object.`)],
    };
  }
  const loop = normalizeLoopSpec(parsed);
  const validation = validateLoopSpec(loop);
  return {
    ok: validation.ok,
    path: filePath,
    loop,
    loopId: typeof loop.id === "string" ? loop.id : undefined,
    errors: validation.errors,
  };
}

export async function validateProjectLoopFile(filePath: string): Promise<ProjectLoopFileResult> {
  return parseProjectLoopJsonInternal(await readFile(filePath, "utf8"), filePath);
}

async function listJsonFiles(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(directory, entry.name))
      .toSorted();
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") return [];
    throw err;
  }
}

export async function validateProjectLoopDirectory(
  directory: string,
): Promise<ProjectLoopDirectoryResult> {
  const jsonFiles = await listJsonFiles(directory);
  const files = await Promise.all(jsonFiles.map((filePath) => validateProjectLoopFile(filePath)));
  const errors = files.flatMap((file) => file.errors);
  return { ok: errors.length === 0, directory, files, errors };
}
