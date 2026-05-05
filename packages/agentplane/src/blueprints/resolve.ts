import type {
  AcceptedRecipeExtension,
  Blueprint,
  BlueprintId,
  BlueprintNodeKind,
  BlueprintRegistry,
  BlueprintResolveInput,
  MutationKind,
  RecipeExtensionKind,
  RecipeHint,
  RejectedRecipeExtension,
  ResolvedBlueprint,
  RiskFlag,
  StopReason,
  TaskKind,
  WorkflowMode,
} from "./model.js";
import { createBlueprintRegistry, getBlueprint, requireBlueprint } from "./registry.js";

const RISK_ROUTE: Partial<Record<RiskFlag, BlueprintId>> = {
  credentials: "ops.approval",
  deploy: "ops.approval",
  external_system: "ops.approval",
  publish: "release.strict",
  security: "ops.approval",
};

function normalizeTags(tags: readonly string[]): Set<string> {
  return new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
}

function includesAny(values: Set<string>, candidates: readonly string[]): boolean {
  return candidates.some((candidate) => values.has(candidate));
}

function inferTaskKind(input: BlueprintResolveInput): TaskKind {
  const tags = normalizeTags(input.tags);
  const title = `${input.title ?? ""} ${input.description ?? ""}`.toLowerCase();

  if (input.mutation === "release" || includesAny(tags, ["release", "publish"])) return "release";
  if (input.mutation === "ops" || includesAny(tags, ["ops", "deploy", "config"])) return "ops";
  if (input.mutation === "code" || includesAny(tags, ["code", "backend", "frontend", "cli"])) {
    return "code";
  }
  if (input.mutation === "docs" || includesAny(tags, ["docs", "documentation", "roadmap"])) {
    return "docs";
  }
  if (includesAny(tags, ["content", "copy", "editorial", "marketing"])) return "content";
  if (title.includes("write") || title.includes("draft") || title.includes("copy"))
    return "content";
  return "analysis";
}

function blueprintForTaskKind(kind: TaskKind, workflowMode?: WorkflowMode): BlueprintId {
  if (kind === "code") {
    return workflowMode === "direct" ? "code.direct" : "code.branch_pr";
  }
  if (kind === "content") return "content.light";
  if (kind === "docs") return "docs.change";
  if (kind === "release") return "release.strict";
  if (kind === "ops") return "ops.approval";
  return "analysis.light";
}

function explicitCompatibilityStop(opts: {
  blueprint: Blueprint;
  input: BlueprintResolveInput;
}): StopReason[] {
  const stops: StopReason[] = [];
  const workflowModes = opts.blueprint.workflowModes;
  if (
    opts.input.workflowMode &&
    workflowModes &&
    !workflowModes.includes(opts.input.workflowMode)
  ) {
    stops.push({
      id: "workflow_mode_incompatible",
      severity: "stop",
      reason: `Blueprint ${opts.blueprint.id} does not support workflow mode ${opts.input.workflowMode}.`,
    });
  }

  const kind = inferTaskKind(opts.input);
  if (!opts.blueprint.taskKinds.includes(kind)) {
    stops.push({
      id: "task_kind_incompatible",
      severity: "approval_required",
      reason: `Blueprint ${opts.blueprint.id} is for ${opts.blueprint.taskKinds.join(
        ", ",
      )}, but task input resolves to ${kind}.`,
    });
  }
  return stops;
}

function riskStops(riskFlags: readonly RiskFlag[]): StopReason[] {
  const stops: StopReason[] = [];
  for (const risk of riskFlags) {
    if (risk === "merge" || risk === "network") {
      stops.push({
        id: `${risk}_risk`,
        severity: "warn",
        reason: `Task declares ${risk} risk; preserve explicit evidence for that step.`,
      });
    }
  }
  return stops;
}

function selectBlueprint(opts: { input: BlueprintResolveInput; registry: BlueprintRegistry }): {
  blueprint: Blueprint;
  reasons: string[];
  stopReasons: StopReason[];
} {
  const input = opts.input;
  const riskFlags = input.riskFlags ?? [];
  const riskBlueprintId = riskFlags.map((risk) => RISK_ROUTE[risk]).find(Boolean);
  const taskKind = inferTaskKind(input);
  const inferredBlueprintId = riskBlueprintId ?? blueprintForTaskKind(taskKind, input.workflowMode);
  const requestedBlueprintId = input.explicitBlueprintId;
  const selectedId = requestedBlueprintId ?? inferredBlueprintId;
  const blueprint = getBlueprint(selectedId, opts.registry) ?? requireBlueprint(selectedId);
  const reasons: string[] = [];
  const stopReasons: StopReason[] = [];

  if (requestedBlueprintId) {
    reasons.push(`explicit blueprint requested: ${requestedBlueprintId}`);
    stopReasons.push(...explicitCompatibilityStop({ blueprint, input }));
  } else if (riskBlueprintId) {
    reasons.push(`risk flags require ${riskBlueprintId}: ${riskFlags.join(", ")}`);
  } else {
    reasons.push(`task kind resolved to ${taskKind}`);
  }

  if (input.workflowMode) reasons.push(`workflow mode: ${input.workflowMode}`);
  if (input.mutation !== "unknown") reasons.push(`mutation scope: ${input.mutation}`);
  if (input.touchedPaths && input.touchedPaths.length > 0) {
    reasons.push(`touched paths: ${input.touchedPaths.toSorted().join(", ")}`);
  }

  if (input.mutation === "unknown" && taskKind === "analysis") {
    stopReasons.push({
      id: "unknown_mutation_scope",
      severity: "warn",
      reason:
        "Unknown mutation scope resolved to read-only analysis; mutation requires narrower scope.",
    });
  }

  stopReasons.push(...riskStops(riskFlags));
  return { blueprint, reasons, stopReasons };
}

function extensionPointFor(
  blueprint: Blueprint,
  nodeKind: BlueprintNodeKind,
): { allowed: readonly RecipeExtensionKind[]; rejected: readonly string[] } | undefined {
  return blueprint.recipeExtensionPoints?.find((point) => point.nodeKind === nodeKind);
}

function targetNodeKindForHint(hint: RecipeHint): BlueprintNodeKind | undefined {
  if (hint.targetNodeKind) return hint.targetNodeKind;
  if (hint.kind === "context_hint" || hint.kind === "risk_hint") return "context_resolve";
  if (hint.kind === "check_suggestion") return "deterministic_check";
  if (hint.kind === "output_schema" || hint.kind === "artifact_template") return "work_unit";
  return undefined;
}

function resolveRecipeExtensions(opts: {
  blueprint: Blueprint;
  recipeHints: readonly RecipeHint[];
}): {
  acceptedRecipeExtensions: AcceptedRecipeExtension[];
  rejectedRecipeExtensions: RejectedRecipeExtension[];
} {
  const acceptedRecipeExtensions: AcceptedRecipeExtension[] = [];
  const rejectedRecipeExtensions: RejectedRecipeExtension[] = [];
  const nodeKinds = new Set(opts.blueprint.nodes.map((node) => node.kind));

  for (const hint of opts.recipeHints) {
    const nodeKind = targetNodeKindForHint(hint);
    if (!nodeKind || !nodeKinds.has(nodeKind)) {
      rejectedRecipeExtensions.push({
        recipeId: hint.recipeId,
        nodeKind,
        kind: hint.kind,
        reason: "Recipe hint targets a node kind that is not active in the selected blueprint.",
      });
      continue;
    }

    const point = extensionPointFor(opts.blueprint, nodeKind);
    if (!point?.allowed.includes(hint.kind)) {
      rejectedRecipeExtensions.push({
        recipeId: hint.recipeId,
        nodeKind,
        kind: hint.kind,
        reason: "Recipe hint is not allowed for this protected route extension point.",
      });
      continue;
    }

    acceptedRecipeExtensions.push({
      recipeId: hint.recipeId,
      nodeKind,
      kind: hint.kind,
      reason: `Recipe hint ${hint.kind} accepted for ${nodeKind}.`,
    });
  }

  return { acceptedRecipeExtensions, rejectedRecipeExtensions };
}

export function resolveBlueprint(opts: {
  input: BlueprintResolveInput;
  registry?: BlueprintRegistry;
}): ResolvedBlueprint {
  const registry = opts.registry ?? createBlueprintRegistry();
  const { blueprint, reasons, stopReasons } = selectBlueprint({ input: opts.input, registry });
  const { acceptedRecipeExtensions, rejectedRecipeExtensions } = resolveRecipeExtensions({
    blueprint,
    recipeHints: opts.input.recipeHints ?? [],
  });

  return {
    blueprint,
    activeNodes: [...blueprint.nodes],
    skippedNodes: [],
    requiredEvidence: [...blueprint.requiredEvidence],
    selectionReasons: reasons,
    acceptedRecipeExtensions,
    rejectedRecipeExtensions,
    stopReasons,
  };
}

export function inferBlueprintTaskKind(input: {
  mutation: MutationKind;
  tags: readonly string[];
  title?: string;
  description?: string;
}): TaskKind {
  return inferTaskKind(input);
}
