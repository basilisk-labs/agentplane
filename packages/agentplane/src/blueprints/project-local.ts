import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { requireBlueprint } from "./registry.js";
import { validateBlueprint } from "./validate.js";
import type {
  Blueprint,
  BlueprintId,
  BlueprintValidationProblem,
  BlueprintValidationResult,
} from "./model.js";

export const PROJECT_BLUEPRINTS_DIR = ".agentplane/blueprints";

export type ProjectBlueprintProblemCode =
  | BlueprintValidationProblem["code"]
  | "invalid_json"
  | "invalid_shape"
  | "missing_blueprint_directory";

export type ProjectBlueprintProblem = {
  code: ProjectBlueprintProblemCode;
  message: string;
  path?: string;
};

export type ProjectBlueprintFileResult = {
  ok: boolean;
  path: string;
  blueprint?: Blueprint;
  blueprintId?: string;
  errors: ProjectBlueprintProblem[];
};

export type ProjectBlueprintDirectoryResult = {
  ok: boolean;
  directory: string;
  files: ProjectBlueprintFileResult[];
  errors: ProjectBlueprintProblem[];
};

export type ScaffoldProjectBlueprintOptions = {
  projectRoot: string;
  id: BlueprintId;
  from?: BlueprintId;
  out?: string;
  force?: boolean;
};

function problem(
  code: ProjectBlueprintProblemCode,
  message: string,
  path?: string,
): ProjectBlueprintProblem {
  return { code, message, ...(path ? { path } : {}) };
}

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

export function parseProjectBlueprintJson(
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
  return parseProjectBlueprintJson(await readFile(filePath, "utf8"), filePath);
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

export function projectBlueprintsDirectory(projectRoot: string): string {
  return path.join(projectRoot, PROJECT_BLUEPRINTS_DIR);
}

function filenameForBlueprintId(id: string): string {
  const filename = id.replaceAll(/[^A-Za-z0-9._-]/g, "-");
  if (!filename || filename === "." || filename === ".." || filename.includes("..")) {
    throw new Error(`Invalid blueprint id for file scaffold: ${id}`);
  }
  return `${filename}.json`;
}

function scaffoldPath(opts: ScaffoldProjectBlueprintOptions): string {
  const outPath = opts.out
    ? path.resolve(opts.projectRoot, opts.out)
    : path.join(projectBlueprintsDirectory(opts.projectRoot), filenameForBlueprintId(opts.id));
  const relative = path.relative(opts.projectRoot, outPath);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Blueprint scaffold output must stay inside the project: ${opts.out}`);
  }
  return outPath;
}

export async function scaffoldProjectBlueprint(
  opts: ScaffoldProjectBlueprintOptions,
): Promise<{ path: string; blueprint: Blueprint; validation: BlueprintValidationResult }> {
  const source = structuredClone(requireBlueprint(opts.from ?? "analysis.light"));
  const blueprint: Blueprint = {
    ...source,
    id: opts.id,
    title: `Project blueprint: ${opts.id}`,
    description:
      "Project-local blueprint scaffold. Edit taskKinds, nodes, evidence, and stopRules, then run blueprint validate before use.",
  };
  const validation = validateBlueprint(blueprint);
  const outPath = scaffoldPath(opts);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(blueprint, null, 2)}\n`, {
    encoding: "utf8",
    flag: opts.force ? "w" : "wx",
  });
  return { path: outPath, blueprint, validation };
}
