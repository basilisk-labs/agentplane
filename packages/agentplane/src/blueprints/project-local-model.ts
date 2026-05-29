import path from "node:path";

import type { Blueprint, BlueprintId, BlueprintValidationProblem } from "./model.js";

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

export function problem(
  code: ProjectBlueprintProblemCode,
  message: string,
  path?: string,
): ProjectBlueprintProblem {
  return { code, message, ...(path ? { path } : {}) };
}

export function defaultTrustConfig(): ProjectBlueprintTrustConfig {
  return {
    schemaVersion: 1,
    trustModel: "explicit_allowlist",
    enabled: false,
    allowedIds: [],
    selection: "explicit_only",
  };
}

export function projectBlueprintsDirectory(projectRoot: string): string {
  return path.join(projectRoot, PROJECT_BLUEPRINTS_DIR);
}
