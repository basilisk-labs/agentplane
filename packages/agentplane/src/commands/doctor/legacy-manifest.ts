import { readFileSync } from "node:fs";
import { lstat } from "node:fs/promises";
import path from "node:path";

import { z } from "zod";

const LEGACY_USAGE_PROBE_KINDS = [
  "context_workspace_legacy",
  "git_replacement_refs",
  "legacy_config_json",
  "legacy_protected_conflict_queue",
  "runner_result_manifest_v1",
  "runtime_input_unobservable",
  "supervisor_episode_v0",
  "task_local_runner_storage",
  "task_readme_pre_v3",
  "workflow_contract_v1",
] as const;

const VERSION_SCHEMA = z.string().regex(/^\d+\.\d+\.\d+$/u);
const SOURCE_PATH_SCHEMA = z
  .string()
  .min(1)
  .refine((value) => !path.isAbsolute(value) && !value.split("/").includes(".."), {
    message: "source path must stay inside the repository",
  });

const AdapterSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/u),
    owner: z.string().trim().min(1),
    source_paths: z.array(SOURCE_PATH_SCHEMA).min(1),
    introduced_in: VERSION_SCHEMA,
    deprecated_in: VERSION_SCHEMA.nullable(),
    remove_in: VERSION_SCHEMA.nullable(),
    removal_blocker: z.string().trim().min(1).nullable(),
    migration_command: z.string().trim().min(1).nullable(),
    usage_probe: z.object({ kind: z.enum(LEGACY_USAGE_PROBE_KINDS) }).strict(),
  })
  .strict()
  .superRefine((adapter, ctx) => {
    const introduced = versionTuple(adapter.introduced_in);
    const deprecated = adapter.deprecated_in ? versionTuple(adapter.deprecated_in) : null;
    const remove = adapter.remove_in ? versionTuple(adapter.remove_in) : null;
    if (deprecated && compareVersions(deprecated, introduced) < 0) {
      ctx.addIssue({ code: "custom", path: ["deprecated_in"], message: "precedes introduced_in" });
    }
    if (remove && compareVersions(remove, deprecated ?? introduced) <= 0) {
      ctx.addIssue({
        code: "custom",
        path: ["remove_in"],
        message: "must be later than the introduction/deprecation version",
      });
    }
    if (adapter.remove_in === null && adapter.removal_blocker === null) {
      ctx.addIssue({
        code: "custom",
        path: ["removal_blocker"],
        message: "is required while remove_in is unset",
      });
    }
  });

const ManifestSchema = z
  .object({
    schema_version: z.literal(1),
    kind: z.literal("agentplane.compatibility_retirement_manifest"),
    adapters: z.array(AdapterSchema).min(1),
  })
  .strict()
  .superRefine((manifest, ctx) => {
    const ids = new Set<string>();
    for (const [index, adapter] of manifest.adapters.entries()) {
      if (ids.has(adapter.id)) {
        ctx.addIssue({
          code: "custom",
          path: ["adapters", index, "id"],
          message: `duplicate adapter id ${adapter.id}`,
        });
      }
      ids.add(adapter.id);
    }
  });

function versionTuple(value: string): [number, number, number] {
  const [major = 0, minor = 0, patch = 0] = value.split(".").map(Number);
  return [major, minor, patch];
}

function compareVersions(left: [number, number, number], right: [number, number, number]): number {
  for (const [index, value] of left.entries()) {
    const difference = value - right[index]!;
    if (difference !== 0) return difference;
  }
  return 0;
}

export type CompatibilityRetirementManifest = z.infer<typeof ManifestSchema>;
export type CompatibilityRetirementAdapter = CompatibilityRetirementManifest["adapters"][number];
export type LegacyUsageProbeKind = CompatibilityRetirementAdapter["usage_probe"]["kind"];

function loadPackagedManifest(): unknown {
  const candidates = [
    new URL("../../../assets/compatibility-retirement-manifest.json", import.meta.url),
    new URL("../assets/compatibility-retirement-manifest.json", import.meta.url),
  ];
  const errors: string[] = [];
  for (const candidate of candidates) {
    try {
      return JSON.parse(readFileSync(candidate, "utf8")) as unknown;
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
  throw new Error(`Compatibility retirement manifest is unavailable: ${errors.join("; ")}`);
}

export function validateCompatibilityRetirementManifest(
  value: unknown,
): CompatibilityRetirementManifest {
  return ManifestSchema.parse(value);
}

export const COMPATIBILITY_RETIREMENT_MANIFEST =
  validateCompatibilityRetirementManifest(loadPackagedManifest());

export async function validateCompatibilityRetirementSourcePaths(repoRoot: string): Promise<void> {
  for (const adapter of COMPATIBILITY_RETIREMENT_MANIFEST.adapters) {
    for (const sourcePath of adapter.source_paths) {
      const absolute = path.resolve(repoRoot, sourcePath);
      const relative = path.relative(path.resolve(repoRoot), absolute);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        throw new Error(`${adapter.id}: source path escapes repository: ${sourcePath}`);
      }
      const entry = await lstat(absolute).catch(() => null);
      if (!entry?.isFile()) {
        throw new Error(`${adapter.id}: source path is missing or not a file: ${sourcePath}`);
      }
    }
  }
}
