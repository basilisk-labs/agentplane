import { readFile } from "node:fs/promises";
import path from "node:path";

import type { BlueprintId } from "./model.js";
import {
  PROJECT_BLUEPRINTS_CONFIG_NAME,
  defaultTrustConfig,
  problem,
  projectBlueprintsDirectory,
  type ProjectBlueprintProblem,
  type ProjectBlueprintTrustConfigResult,
} from "./project-local-model.js";

function requireObjectResult(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
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
