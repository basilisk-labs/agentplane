import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type {
  Blueprint,
  BlueprintId,
  BlueprintRegistry,
  BlueprintValidationResult,
} from "./model.js";
import { createBlueprintRegistry, getBlueprint, requireBlueprint } from "./registry.js";
import { validateBlueprint } from "./validate.js";
import {
  problem,
  projectBlueprintsDirectory,
  type ProjectBlueprintCompatibilityReport,
  type ProjectBlueprintProblem,
  type ScaffoldProjectBlueprintOptions,
  type TrustedProjectBlueprintRegistryResult,
} from "./project-local-model.js";
import { loadProjectBlueprintTrustConfig } from "./project-local-trust.js";
import {
  parseProjectBlueprintJsonInternal,
  validateProjectBlueprintDirectory,
} from "./project-local-files.js";

export {
  PROJECT_BLUEPRINTS_CONFIG_NAME,
  PROJECT_BLUEPRINTS_DIR,
  projectBlueprintsDirectory,
  type ProjectBlueprintCompatibilityReport,
  type ProjectBlueprintDirectoryResult,
  type ProjectBlueprintFileResult,
  type ProjectBlueprintProblem,
  type ProjectBlueprintProblemCode,
  type ProjectBlueprintTrustConfig,
  type ProjectBlueprintTrustConfigResult,
  type ScaffoldProjectBlueprintOptions,
  type TrustedProjectBlueprintRegistryResult,
} from "./project-local-model.js";
export {
  validateProjectBlueprintDirectory,
  validateProjectBlueprintFile,
} from "./project-local-files.js";
export {
  loadProjectBlueprintTrustConfig,
  projectBlueprintsConfigPath,
} from "./project-local-trust.js";

// Keep the public name on the compatibility surface without exporting the internal helper module API.
// eslint-disable-next-line unicorn/prefer-export-from
export const parseProjectBlueprintJson = parseProjectBlueprintJsonInternal;

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
