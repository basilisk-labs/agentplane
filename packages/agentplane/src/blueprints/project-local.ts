import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createBlueprintRegistry, getBlueprint, requireBlueprint } from "./registry.js";
import { validateBlueprint } from "./validate.js";
import type {
  Blueprint,
  BlueprintId,
  BlueprintRegistry,
  BlueprintValidationProblem,
  BlueprintValidationResult,
} from "./model.js";

export const PROJECT_BLUEPRINTS_DIR = ".agentplane/blueprints";
export const PROJECT_BLUEPRINTS_CONFIG_NAME = "config.json";

export type ProjectBlueprintProblemCode =
  | BlueprintValidationProblem["code"]
  | "builtin_shadow"
  | "invalid_json"
  | "invalid_shape"
  | "invalid_trust_config"
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

export type ProjectBlueprintTrustConfig = {
  schemaVersion: 1;
  trustModel: "explicit_allowlist";
  enabled: boolean;
  allowedIds: readonly BlueprintId[];
  selection: "explicit_only";
};

export type ProjectBlueprintTrustConfigResult = {
  ok: boolean;
  path: string;
  exists: boolean;
  config: ProjectBlueprintTrustConfig;
  errors: ProjectBlueprintProblem[];
};

export type TrustedProjectBlueprintRegistryResult = {
  ok: boolean;
  directory: string;
  trustConfig: ProjectBlueprintTrustConfigResult;
  files: ProjectBlueprintFileResult[];
  trustedBlueprints: Blueprint[];
  errors: ProjectBlueprintProblem[];
};

export type ProjectBlueprintCompatibilityReport = {
  schemaVersion: 1;
  compatible: boolean;
  directory: string;
  trustConfig: {
    path: string;
    exists: boolean;
    ok: boolean;
    config: ProjectBlueprintTrustConfig;
  };
  blueprints: {
    path: string;
    ok: boolean;
    blueprintId?: string;
    trusted: boolean;
    errors: ProjectBlueprintProblem[];
  }[];
  trustedBlueprintIds: readonly BlueprintId[];
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

function defaultTrustConfig(): ProjectBlueprintTrustConfig {
  return {
    schemaVersion: 1,
    trustModel: "explicit_allowlist",
    enabled: false,
    allowedIds: [],
    selection: "explicit_only",
  };
}

function parseTrustConfigJson(raw: string, filePath: string): ProjectBlueprintTrustConfigResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return {
      ok: false,
      path: filePath,
      exists: true,
      config: defaultTrustConfig(),
      errors: [
        problem(
          "invalid_json",
          `Blueprint trust config ${JSON.stringify(filePath)} is not valid JSON: ${
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
      exists: true,
      config: defaultTrustConfig(),
      errors: [
        problem(
          "invalid_trust_config",
          `Blueprint trust config ${JSON.stringify(filePath)} must contain one JSON object.`,
        ),
      ],
    };
  }

  const errors: ProjectBlueprintProblem[] = [];
  const schemaVersion = parsed.schema_version === undefined ? 1 : parsed.schema_version;
  if (schemaVersion !== 1) {
    errors.push(
      problem("invalid_trust_config", "Blueprint trust config schema_version must be 1."),
    );
  }
  const trustModel = parsed.trust_model === undefined ? "explicit_allowlist" : parsed.trust_model;
  if (trustModel !== "explicit_allowlist") {
    errors.push(
      problem(
        "invalid_trust_config",
        "Blueprint trust config trust_model must be explicit_allowlist.",
      ),
    );
  }
  const enabled = parsed.enabled === true;
  if ("enabled" in parsed && typeof parsed.enabled !== "boolean") {
    errors.push(problem("invalid_trust_config", "Blueprint trust config enabled must be boolean."));
  }
  const allowedIds: string[] = [];
  if ("allowed_ids" in parsed && !Array.isArray(parsed.allowed_ids)) {
    errors.push(
      problem("invalid_trust_config", "Blueprint trust config allowed_ids must be an array."),
    );
  }
  if (Array.isArray(parsed.allowed_ids)) {
    for (const [index, item] of parsed.allowed_ids.entries()) {
      if (typeof item !== "string" || item.trim().length === 0) {
        errors.push(
          problem(
            "invalid_trust_config",
            `Blueprint trust config allowed_ids[${index}] must be a non-empty string.`,
          ),
        );
        continue;
      }
      allowedIds.push(item.trim());
    }
  }
  const selection = parsed.selection === undefined ? "explicit_only" : parsed.selection;
  if (selection !== "explicit_only") {
    errors.push(
      problem("invalid_trust_config", "Blueprint trust config selection must be explicit_only."),
    );
  }

  return {
    ok: errors.length === 0,
    path: filePath,
    exists: true,
    config: {
      schemaVersion: 1,
      trustModel: "explicit_allowlist",
      enabled,
      allowedIds: allowedIds.map((id) => id.trim() as BlueprintId),
      selection: "explicit_only",
    },
    errors,
  };
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

export function projectBlueprintsConfigPath(projectRoot: string): string {
  return path.join(projectBlueprintsDirectory(projectRoot), PROJECT_BLUEPRINTS_CONFIG_NAME);
}

export async function loadProjectBlueprintTrustConfig(
  projectRoot: string,
): Promise<ProjectBlueprintTrustConfigResult> {
  const configPath = projectBlueprintsConfigPath(projectRoot);
  try {
    return parseTrustConfigJson(await readFile(configPath, "utf8"), configPath);
  } catch (err) {
    if (err instanceof Error && "code" in err && err.code === "ENOENT") {
      return {
        ok: true,
        path: configPath,
        exists: false,
        config: defaultTrustConfig(),
        errors: [],
      };
    }
    throw err;
  }
}

function duplicateIds(ids: readonly BlueprintId[]): BlueprintId[] {
  const seen = new Set<string>();
  const duplicates = new Set<BlueprintId>();
  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates].toSorted((a, b) => a.localeCompare(b));
}

export async function loadTrustedProjectBlueprintRegistry(
  projectRoot: string,
): Promise<TrustedProjectBlueprintRegistryResult> {
  const directory = projectBlueprintsDirectory(projectRoot);
  const [trustConfig, directoryResult] = await Promise.all([
    loadProjectBlueprintTrustConfig(projectRoot),
    validateProjectBlueprintDirectory(directory),
  ]);
  const errors: ProjectBlueprintProblem[] = [...trustConfig.errors, ...directoryResult.errors];
  const byId = new Map<string, Blueprint>();

  for (const file of directoryResult.files) {
    if (!file.blueprint) continue;
    if (getBlueprint(file.blueprint.id, createBlueprintRegistry())) {
      errors.push(
        problem(
          "builtin_shadow",
          `Project blueprint ${file.blueprint.id} must not shadow a built-in blueprint id.`,
          file.path,
        ),
      );
      continue;
    }
    byId.set(file.blueprint.id, file.blueprint);
  }

  for (const duplicate of duplicateIds(trustConfig.config.allowedIds)) {
    errors.push(
      problem(
        "invalid_trust_config",
        `Blueprint trust config allowed_ids contains duplicate id: ${duplicate}`,
        trustConfig.path,
      ),
    );
  }

  const trustedBlueprints: Blueprint[] = [];
  if (trustConfig.config.enabled && trustConfig.ok) {
    for (const id of trustConfig.config.allowedIds) {
      const blueprint = byId.get(id);
      if (!blueprint) {
        errors.push(
          problem(
            "invalid_trust_config",
            `Blueprint trust config allows unknown project-local blueprint id: ${id}`,
            trustConfig.path,
          ),
        );
        continue;
      }
      trustedBlueprints.push(blueprint);
    }
  }

  return {
    ok: errors.length === 0,
    directory,
    trustConfig,
    files: directoryResult.files,
    trustedBlueprints,
    errors,
  };
}

export async function createTrustedProjectBlueprintRegistry(
  projectRoot: string,
): Promise<{ registry: BlueprintRegistry; projectBlueprintIds: BlueprintId[] }> {
  const trusted = await loadTrustedProjectBlueprintRegistry(projectRoot);
  if (!trusted.ok) {
    throw new Error(
      `Invalid project-local blueprint trust registry:\n${trusted.errors
        .map((error) => `- ${error.code}: ${error.message}`)
        .join("\n")}`,
    );
  }
  return {
    registry: createBlueprintRegistry([
      ...createBlueprintRegistry().blueprints,
      ...trusted.trustedBlueprints,
    ]),
    projectBlueprintIds: trusted.trustedBlueprints.map((blueprint) => blueprint.id),
  };
}

export async function buildProjectBlueprintCompatibilityReport(
  projectRoot: string,
): Promise<ProjectBlueprintCompatibilityReport> {
  const trusted = await loadTrustedProjectBlueprintRegistry(projectRoot);
  const trustedIds = new Set(trusted.trustedBlueprints.map((blueprint) => blueprint.id));
  return {
    schemaVersion: 1,
    compatible: trusted.ok,
    directory: trusted.directory,
    trustConfig: {
      path: trusted.trustConfig.path,
      exists: trusted.trustConfig.exists,
      ok: trusted.trustConfig.ok,
      config: trusted.trustConfig.config,
    },
    blueprints: trusted.files.map((file) => ({
      path: file.path,
      ok: file.ok,
      ...(file.blueprintId ? { blueprintId: file.blueprintId } : {}),
      trusted: file.blueprintId ? trustedIds.has(file.blueprintId) : false,
      errors: file.errors,
    })),
    trustedBlueprintIds: trusted.trustedBlueprints.map((blueprint) => blueprint.id),
    errors: trusted.errors,
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
