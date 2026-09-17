import { createHash } from "node:crypto";

import type { RecipeBlueprintExtension, RecipeManifest, OverlayWhen } from "./types.js";
import { matchOverlayWhen } from "./overlay.js";

export type RecipeBlueprintExtensionRuntime = {
  task_kind?: string;
  command?: string;
  tags?: string[];
  repo_types?: string[];
};

export type RecipeBlueprintExtensionSource = {
  manifest: RecipeManifest;
  compatible?: boolean;
  incompatibility_reasons?: string[];
};

export type ResolvedRecipeBlueprintExtension = {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  extension_id: string;
  kind: RecipeBlueprintExtension["kind"];
  summary: string;
  target_node_kind?: string;
  value: unknown;
  reasons: string[];
};

export type RejectedRecipeBlueprintExtension = {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  extension_id: string;
  kind: RecipeBlueprintExtension["kind"];
  summary: string;
  reason: string;
};

export type ResolvedRecipeBlueprintExtensions = {
  accepted: ResolvedRecipeBlueprintExtension[];
  rejected: RejectedRecipeBlueprintExtension[];
};

export type RecipeV1NativeRoutePreference = {
  legacy_blueprint_id: string;
  compatible_task_kinds: (
    | "analysis"
    | "content"
    | "docs"
    | "code"
    | "release"
    | "ops"
    | "context"
  )[];
  compatible_mutation_scopes: ("none" | "docs" | "code" | "release" | "ops" | "context")[];
  preferred_mode: "direct" | "branch_pr" | null;
  intent_tags: string[];
};

export type RecipeV1ConvertedSource = {
  recipe_id: string;
  recipe_version: string;
  recipe_name: string;
  extension_id: string;
  summary: string;
};

export type RecipeV1ManualConversionDiagnostic = RecipeV1ConvertedSource & {
  code: "custom_target_node" | "custom_blueprint" | "unknown_risk" | "non_json_value";
  extension_kind: RecipeBlueprintExtension["kind"];
  reason: string;
  suggested_native_surface: string;
  legacy_declaration: unknown;
};

export type RecipeV1ExtensionConversion = {
  schema_version: 1;
  kind: "recipe_v1_extension_conversion";
  status: "converted" | "manual_conversion_required";
  native_surfaces: {
    guidance: (RecipeV1ConvertedSource &
      (
        | { kind: "context_hint"; strength: "advisory"; value: unknown }
        | { kind: "check_suggestion"; strength: "advisory"; command: string }
        | { kind: "risk_hint"; strength: "strengthen_only"; risk: string }
      ))[];
    required_evidence: (RecipeV1ConvertedSource & { evidence_id: string; required: true })[];
    outputs: (RecipeV1ConvertedSource & { schema: unknown; digest: string })[];
    artifacts: (RecipeV1ConvertedSource & { template: unknown; digest: string })[];
    route_preferences: (RecipeV1ConvertedSource &
      RecipeV1NativeRoutePreference & { authority: "advisory" })[];
  };
  rejected: RejectedRecipeBlueprintExtension[];
  manual_conversion: RecipeV1ManualConversionDiagnostic[];
};

const DEFAULT_TARGETS: Partial<Record<RecipeBlueprintExtension["kind"], string>> = {
  context_hint: "context_resolve",
  risk_hint: "context_resolve",
  output_schema: "work_unit",
  artifact_template: "work_unit",
  check_suggestion: "deterministic_check",
  evidence_requirement: "verify_record",
};

export const RECIPE_V1_BUILTIN_ROUTE_MAPPINGS: Readonly<
  Record<string, RecipeV1NativeRoutePreference>
> = {
  "analysis.light": {
    legacy_blueprint_id: "analysis.light",
    compatible_task_kinds: ["analysis"],
    compatible_mutation_scopes: ["none"],
    preferred_mode: "direct",
    intent_tags: ["analysis"],
  },
  "content.light": {
    legacy_blueprint_id: "content.light",
    compatible_task_kinds: ["content"],
    compatible_mutation_scopes: ["none"],
    preferred_mode: "direct",
    intent_tags: ["content"],
  },
  "docs.change": {
    legacy_blueprint_id: "docs.change",
    compatible_task_kinds: ["docs"],
    compatible_mutation_scopes: ["docs"],
    preferred_mode: null,
    intent_tags: ["docs"],
  },
  "code.direct": {
    legacy_blueprint_id: "code.direct",
    compatible_task_kinds: ["code"],
    compatible_mutation_scopes: ["code"],
    preferred_mode: "direct",
    intent_tags: ["code"],
  },
  "code.branch_pr": {
    legacy_blueprint_id: "code.branch_pr",
    compatible_task_kinds: ["code"],
    compatible_mutation_scopes: ["code"],
    preferred_mode: "branch_pr",
    intent_tags: ["code"],
  },
  "performance.benchmark": {
    legacy_blueprint_id: "performance.benchmark",
    compatible_task_kinds: ["code"],
    compatible_mutation_scopes: ["code"],
    preferred_mode: "branch_pr",
    intent_tags: ["benchmark", "performance"],
  },
  "quality.regression": {
    legacy_blueprint_id: "quality.regression",
    compatible_task_kinds: ["code"],
    compatible_mutation_scopes: ["code"],
    preferred_mode: "branch_pr",
    intent_tags: ["quality", "regression"],
  },
  "context.assimilation": {
    legacy_blueprint_id: "context.assimilation",
    compatible_task_kinds: ["context"],
    compatible_mutation_scopes: ["context"],
    preferred_mode: null,
    intent_tags: ["assimilation", "context"],
  },
  "context.maximum_assimilation": {
    legacy_blueprint_id: "context.maximum_assimilation",
    compatible_task_kinds: ["context"],
    compatible_mutation_scopes: ["context"],
    preferred_mode: null,
    intent_tags: ["assimilation", "context", "maximum-assimilation"],
  },
  "post_run.improvement_review": {
    legacy_blueprint_id: "post_run.improvement_review",
    compatible_task_kinds: ["analysis", "code"],
    compatible_mutation_scopes: ["none", "code"],
    preferred_mode: "branch_pr",
    intent_tags: ["improvement-review", "post-run"],
  },
  "release.strict": {
    legacy_blueprint_id: "release.strict",
    compatible_task_kinds: ["release"],
    compatible_mutation_scopes: ["release"],
    preferred_mode: null,
    intent_tags: ["release"],
  },
  "ops.approval": {
    legacy_blueprint_id: "ops.approval",
    compatible_task_kinds: ["ops"],
    compatible_mutation_scopes: ["ops"],
    preferred_mode: null,
    intent_tags: ["ops"],
  },
};

const NATIVE_RISKS = new Set([
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);

function canonicalJson(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(",")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).toSorted(([left], [right]) =>
      left.localeCompare(right),
    );
    return `{${entries
      .map(([key, entry]) => `${JSON.stringify(key)}:${canonicalJson(entry)}`)
      .join(",")}}`;
  }
  throw new Error("Recipe extension value is not JSON-compatible.");
}

function valueDigest(value: unknown): string {
  return `sha256:${createHash("sha256").update(canonicalJson(value)).digest("hex")}`;
}

function sourceOf(extension: ResolvedRecipeBlueprintExtension): RecipeV1ConvertedSource {
  return {
    recipe_id: extension.recipe_id,
    recipe_version: extension.recipe_version,
    recipe_name: extension.recipe_name,
    extension_id: extension.extension_id,
    summary: extension.summary,
  };
}

function compareConvertedSource(
  left: RecipeV1ConvertedSource,
  right: RecipeV1ConvertedSource,
): number {
  return (
    left.recipe_id.localeCompare(right.recipe_id) ||
    left.recipe_version.localeCompare(right.recipe_version) ||
    left.extension_id.localeCompare(right.extension_id)
  );
}

function manualDiagnostic(opts: {
  extension: ResolvedRecipeBlueprintExtension;
  code: RecipeV1ManualConversionDiagnostic["code"];
  reason: string;
  suggested_native_surface: string;
}): RecipeV1ManualConversionDiagnostic {
  return {
    ...sourceOf(opts.extension),
    code: opts.code,
    extension_kind: opts.extension.kind,
    reason: opts.reason,
    suggested_native_surface: opts.suggested_native_surface,
    legacy_declaration: opts.extension.value,
  };
}

function extensionValue(extension: RecipeBlueprintExtension): unknown {
  if (extension.kind === "evidence_requirement") return { evidence: extension.evidence ?? [] };
  if (extension.kind === "check_suggestion") return { command: extension.command };
  if (extension.kind === "risk_hint") return { risk: extension.risk };
  if (extension.kind === "preferred_blueprint") return { blueprint_id: extension.blueprint_id };
  return extension.value;
}

function matchesWhen(
  when: OverlayWhen | undefined,
  runtime: RecipeBlueprintExtensionRuntime,
): boolean {
  return matchOverlayWhen(when, runtime);
}

function compareResolved(
  left: ResolvedRecipeBlueprintExtension,
  right: ResolvedRecipeBlueprintExtension,
): number {
  return (
    left.recipe_id.localeCompare(right.recipe_id) ||
    left.recipe_version.localeCompare(right.recipe_version) ||
    left.extension_id.localeCompare(right.extension_id) ||
    left.kind.localeCompare(right.kind)
  );
}

function compareRejected(
  left: RejectedRecipeBlueprintExtension,
  right: RejectedRecipeBlueprintExtension,
): number {
  return (
    left.recipe_id.localeCompare(right.recipe_id) ||
    left.recipe_version.localeCompare(right.recipe_version) ||
    left.extension_id.localeCompare(right.extension_id) ||
    left.kind.localeCompare(right.kind)
  );
}

export function resolveRecipeBlueprintExtensions(opts: {
  recipes: readonly RecipeBlueprintExtensionSource[];
  runtime?: RecipeBlueprintExtensionRuntime;
  includeIncompatible?: boolean;
}): ResolvedRecipeBlueprintExtensions {
  const accepted: ResolvedRecipeBlueprintExtension[] = [];
  const rejected: RejectedRecipeBlueprintExtension[] = [];
  const runtime = opts.runtime ?? {};

  for (const source of opts.recipes) {
    const compatible = source.compatible !== false;
    const extensions = source.manifest.blueprint_extensions ?? [];
    for (const extension of extensions) {
      const base = {
        recipe_id: source.manifest.id,
        recipe_version: source.manifest.version,
        recipe_name: source.manifest.name,
        extension_id: extension.id,
        kind: extension.kind,
        summary: extension.summary,
      };

      if (!compatible && opts.includeIncompatible !== true) {
        rejected.push({
          ...base,
          reason:
            source.incompatibility_reasons?.join("; ") ??
            "Recipe is incompatible with the current resolver context.",
        });
        continue;
      }

      if (!matchesWhen(extension.when, runtime)) {
        rejected.push({
          ...base,
          reason: "Recipe blueprint extension did not match the current task context.",
        });
        continue;
      }

      accepted.push({
        ...base,
        target_node_kind: extension.target_node_kind,
        value: extensionValue(extension),
        reasons: [
          `recipe ${source.manifest.id}@${source.manifest.version} declared ${extension.kind}`,
          ...(extension.when
            ? ["extension matched task context"]
            : ["extension has no when filter"]),
        ],
      });
    }
  }

  return {
    accepted: accepted.toSorted(compareResolved),
    rejected: rejected.toSorted(compareRejected),
  };
}

/**
 * Converts the complete Recipe V1 extension surface without retaining a workflow graph.
 * The result is data-only: route and risk contributions are advisory and cannot grant authority.
 */
export function convertRecipeV1Extensions(opts: {
  recipes: readonly RecipeBlueprintExtensionSource[];
  runtime?: RecipeBlueprintExtensionRuntime;
  includeIncompatible?: boolean;
}): RecipeV1ExtensionConversion {
  const resolved = resolveRecipeBlueprintExtensions(opts);
  const guidance: RecipeV1ExtensionConversion["native_surfaces"]["guidance"] = [];
  const requiredEvidence: RecipeV1ExtensionConversion["native_surfaces"]["required_evidence"] = [];
  const outputs: RecipeV1ExtensionConversion["native_surfaces"]["outputs"] = [];
  const artifacts: RecipeV1ExtensionConversion["native_surfaces"]["artifacts"] = [];
  const routePreferences: RecipeV1ExtensionConversion["native_surfaces"]["route_preferences"] = [];
  const manual: RecipeV1ManualConversionDiagnostic[] = [];

  for (const extension of resolved.accepted) {
    const expectedTarget = DEFAULT_TARGETS[extension.kind];
    if (
      extension.target_node_kind !== undefined &&
      (expectedTarget === undefined || extension.target_node_kind !== expectedTarget)
    ) {
      manual.push(
        manualDiagnostic({
          extension,
          code: "custom_target_node",
          reason: `Recipe V1 target_node_kind ${JSON.stringify(extension.target_node_kind)} has no exact native mapping for ${extension.kind}.`,
          suggested_native_surface:
            expectedTarget === undefined
              ? "Remove the graph target and declare the native Recipe surface directly."
              : `Use the native ${extension.kind} surface; its exact legacy target was ${expectedTarget}.`,
        }),
      );
      continue;
    }

    const source = sourceOf(extension);
    if (extension.kind === "context_hint") {
      guidance.push({
        ...source,
        kind: extension.kind,
        strength: "advisory",
        value: extension.value,
      });
      continue;
    }
    if (extension.kind === "check_suggestion") {
      const command = (extension.value as { command?: unknown }).command;
      guidance.push({
        ...source,
        kind: extension.kind,
        strength: "advisory",
        command: typeof command === "string" ? command : "",
      });
      continue;
    }
    if (extension.kind === "risk_hint") {
      const risk = (extension.value as { risk?: unknown }).risk;
      if (typeof risk !== "string" || !NATIVE_RISKS.has(risk)) {
        manual.push(
          manualDiagnostic({
            extension,
            code: "unknown_risk",
            reason: `Recipe V1 risk ${JSON.stringify(risk)} has no exact native risk flag.`,
            suggested_native_surface:
              "Map the risk to network, credentials, deploy, publish, merge, security, or external_system.",
          }),
        );
        continue;
      }
      guidance.push({ ...source, kind: extension.kind, strength: "strengthen_only", risk });
      continue;
    }
    if (extension.kind === "evidence_requirement") {
      const evidence = (extension.value as { evidence?: unknown }).evidence;
      for (const evidenceId of Array.isArray(evidence) ? evidence : []) {
        if (typeof evidenceId !== "string") continue;
        requiredEvidence.push({ ...source, evidence_id: evidenceId, required: true });
      }
      continue;
    }
    if (extension.kind === "output_schema" || extension.kind === "artifact_template") {
      try {
        const digest = valueDigest(extension.value);
        if (extension.kind === "output_schema") {
          outputs.push({ ...source, schema: extension.value, digest });
        } else {
          artifacts.push({ ...source, template: extension.value, digest });
        }
      } catch {
        manual.push(
          manualDiagnostic({
            extension,
            code: "non_json_value",
            reason: `Recipe V1 ${extension.kind} is not a JSON-compatible value and cannot be digest-bound.`,
            suggested_native_surface:
              extension.kind === "output_schema"
                ? "Declare a JSON-compatible Recipe output schema."
                : "Declare a JSON-compatible Recipe artifact template.",
          }),
        );
      }
      continue;
    }

    const blueprintId = (extension.value as { blueprint_id?: unknown }).blueprint_id;
    const mapping =
      typeof blueprintId === "string" ? RECIPE_V1_BUILTIN_ROUTE_MAPPINGS[blueprintId] : undefined;
    if (!mapping) {
      manual.push(
        manualDiagnostic({
          extension,
          code: "custom_blueprint",
          reason: `Recipe V1 preferred Blueprint ${JSON.stringify(blueprintId)} has no exact native route mapping.`,
          suggested_native_surface:
            "Declare task kind, mutation scope, route preference, guidance, evidence, and risk through native Recipe surfaces.",
        }),
      );
      continue;
    }
    routePreferences.push({
      ...source,
      ...mapping,
      compatible_task_kinds: [...mapping.compatible_task_kinds],
      compatible_mutation_scopes: [...mapping.compatible_mutation_scopes],
      intent_tags: [...mapping.intent_tags],
      authority: "advisory",
    });
  }

  return {
    schema_version: 1,
    kind: "recipe_v1_extension_conversion",
    status: manual.length > 0 ? "manual_conversion_required" : "converted",
    native_surfaces: {
      guidance: guidance.toSorted(compareConvertedSource),
      required_evidence: requiredEvidence.toSorted(
        (left, right) =>
          compareConvertedSource(left, right) || left.evidence_id.localeCompare(right.evidence_id),
      ),
      outputs: outputs.toSorted(compareConvertedSource),
      artifacts: artifacts.toSorted(compareConvertedSource),
      route_preferences: routePreferences.toSorted(compareConvertedSource),
    },
    rejected: resolved.rejected,
    manual_conversion: manual.toSorted(
      (left, right) => compareConvertedSource(left, right) || left.code.localeCompare(right.code),
    ),
  };
}
