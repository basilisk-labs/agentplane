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
