import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { validateBlueprint } from "./validate.js";
import type { Blueprint, BlueprintValidationResult } from "./model.js";
import {
  PROJECT_BLUEPRINTS_CONFIG_NAME,
  problem,
  type ProjectBlueprintDirectoryResult,
  type ProjectBlueprintFileResult,
  type ProjectBlueprintProblem,
} from "./project-local-model.js";

function requireObjectResult(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function requiredArrayFieldErrors(
  value: Record<string, unknown>,
  filePath: string,
): ProjectBlueprintProblem[] {
  const errors: ProjectBlueprintProblem[] = [];
  for (const field of [
    "taskKinds",
    "allowedCommands",
    "policyModules",
    "nodes",
    "edges",
    "requiredEvidence",
    "stopRules",
  ]) {
    if (!Array.isArray(value[field])) {
      errors.push(
        problem(
          "invalid_shape",
          `Blueprint file ${JSON.stringify(filePath)} is missing array field ${JSON.stringify(field)}.`,
          field,
        ),
      );
    }
  }
  return errors;
}

export function parseProjectBlueprintJsonInternal(
  raw: string,
  filePath: string,
): ProjectBlueprintFileResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return {
      ok: false,
      path: filePath,
      errors: [
        problem(
          "invalid_json",
          `Blueprint file ${JSON.stringify(filePath)} is not valid JSON: ${
            err instanceof Error ? err.message : String(err)
          }`,
        ),
      ],
    };
  }

  if (!requireObjectResult(parsed)) {
    return {
      ok: false,
      path: filePath,
      errors: [
        problem(
          "invalid_shape",
          `Blueprint file ${JSON.stringify(filePath)} must contain one JSON object.`,
        ),
      ],
    };
  }

  const shapeErrors = requiredArrayFieldErrors(parsed, filePath);
  if (shapeErrors.length > 0) {
    return {
      ok: false,
      path: filePath,
      blueprintId: typeof parsed.id === "string" ? parsed.id : undefined,
      errors: shapeErrors,
    };
  }

  const blueprint = parsed as Blueprint;
  let validation: BlueprintValidationResult;
  try {
    validation = validateBlueprint(blueprint);
  } catch (err) {
    return {
      ok: false,
      path: filePath,
      blueprintId: typeof parsed.id === "string" ? parsed.id : undefined,
      errors: [
        problem(
          "invalid_shape",
          `Blueprint file ${JSON.stringify(filePath)} has an invalid blueprint shape: ${
            err instanceof Error ? err.message : String(err)
          }`,
        ),
      ],
    };
  }
  return {
    ok: validation.ok,
    path: filePath,
    blueprint,
    blueprintId: typeof blueprint.id === "string" ? blueprint.id : undefined,
    errors: validation.errors,
  };
}

export async function validateProjectBlueprintFile(
  filePath: string,
): Promise<ProjectBlueprintFileResult> {
  return parseProjectBlueprintJsonInternal(await readFile(filePath, "utf8"), filePath);
}

async function listJsonFiles(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .filter((entry) => entry.name !== PROJECT_BLUEPRINTS_CONFIG_NAME)
      .map((entry) => path.join(directory, entry.name))
      .toSorted();
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") return [];
    throw err;
  }
}

export async function validateProjectBlueprintDirectory(
  directory: string,
): Promise<ProjectBlueprintDirectoryResult> {
  const jsonFiles = await listJsonFiles(directory);
  const files = await Promise.all(
    jsonFiles.map((filePath) => validateProjectBlueprintFile(filePath)),
  );
  const errors = files.flatMap((file) => file.errors);
  return {
    ok: errors.length === 0,
    directory,
    files,
    errors,
  };
}
