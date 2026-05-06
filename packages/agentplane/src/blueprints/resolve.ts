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
import { createBlueprintRegistry, getBlueprint } from "./registry.js";

const RISK_ROUTE_PRIORITY = [
  "credentials",
  "security",
  "external_system",
  "deploy",
  "publish",
] as const satisfies readonly RiskFlag[];

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

function effectiveMutation(input: BlueprintResolveInput): MutationKind {
  return input.mutationScope ?? input.mutation;
}

function includesAny(values: Set<string>, candidates: readonly string[]): boolean {
  return candidates.some((candidate) => values.has(candidate));
}

function inferTaskKind(input: BlueprintResolveInput): TaskKind {
  if (input.taskKind) return input.taskKind;
  const tags = normalizeTags(input.tags);
  const title = `${input.title ?? ""} ${input.description ?? ""}`.toLowerCase();
  const mutation = effectiveMutation(input);

  if (mutation === "release" || includesAny(tags, ["release", "publish"])) return "release";
  if (mutation === "ops" || includesAny(tags, ["ops", "deploy", "config"])) return "ops";
  if (mutation === "code" || includesAny(tags, ["code", "backend", "frontend", "cli"])) {
    return "code";
  }
  if (mutation === "docs" || includesAny(tags, ["docs", "documentation", "roadmap"])) {
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

function isBlueprintCompatible(opts: {
  blueprint: Blueprint;
  taskKind: TaskKind;
  workflowMode?: WorkflowMode;
}): boolean {
  if (!opts.blueprint.taskKinds.includes(opts.taskKind)) return false;
  if (
    opts.workflowMode &&
    opts.blueprint.workflowModes &&
    !opts.blueprint.workflowModes.includes(opts.workflowMode)
  ) {
    return false;
  }
  return true;
}

function preferredBlueprintId(input: BlueprintResolveInput): BlueprintId | undefined {
  for (const hint of input.recipeHints ?? []) {
    if (hint.kind !== "preferred_blueprint") continue;
    const value = hint.value;
    if (typeof value === "object" && value !== null && "blueprint_id" in value) {
      const id = (value as { blueprint_id?: unknown }).blueprint_id;
      if (typeof id === "string" && id.trim()) return id.trim() as BlueprintId;
    }
    if (typeof value === "string" && value.trim()) return value.trim() as BlueprintId;
  }
  return undefined;
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

function selectRiskBlueprintId(riskFlags: readonly RiskFlag[]): BlueprintId | undefined {
  for (const risk of RISK_ROUTE_PRIORITY) {
    const blueprintId = RISK_ROUTE[risk];
    if (blueprintId && riskFlags.includes(risk)) return blueprintId;
  }
  return undefined;
}

function selectBlueprint(opts: { input: BlueprintResolveInput; registry: BlueprintRegistry }): {
  blueprint: Blueprint;
  reasons: string[];
  stopReasons: StopReason[];
} {
  const input = opts.input;
  const riskFlags = input.riskFlags ?? [];
  const riskBlueprintId = selectRiskBlueprintId(riskFlags);
  const taskKind = inferTaskKind(input);
  const inferredBlueprintId = riskBlueprintId ?? blueprintForTaskKind(taskKind, input.workflowMode);
  const requestedBlueprintId = input.explicitBlueprintId ?? input.blueprintRequest;
  const preferredId =
    riskBlueprintId || requestedBlueprintId ? undefined : preferredBlueprintId(input);
  const preferredBlueprint = preferredId ? getBlueprint(preferredId, opts.registry) : undefined;
  const selectedId: BlueprintId =
    requestedBlueprintId ??
    (preferredId &&
    preferredBlueprint &&
    isBlueprintCompatible({
      blueprint: preferredBlueprint,
      taskKind,
      workflowMode: input.workflowMode,
    })
      ? preferredId
      : inferredBlueprintId);
  const blueprint = getBlueprint(selectedId, opts.registry);
  if (!blueprint) {
    throw new Error(`Unknown blueprint in registry: ${selectedId}`);
  }
  const reasons: string[] = [];
  const stopReasons: StopReason[] = [];

  if (requestedBlueprintId) {
    reasons.push(`explicit blueprint requested: ${requestedBlueprintId}`);
    stopReasons.push(...explicitCompatibilityStop({ blueprint, input }));
  } else if (riskBlueprintId) {
    reasons.push(`risk flags require ${riskBlueprintId}: ${riskFlags.join(", ")}`);
  } else if (preferredId && selectedId === preferredId) {
    reasons.push(`recipe preferred compatible blueprint: ${preferredId}`);
  } else if (preferredId && !preferredBlueprint) {
    reasons.push(`recipe preferred unknown blueprint ignored: ${preferredId}`);
  } else if (preferredId) {
    reasons.push(`recipe preferred incompatible blueprint ignored: ${preferredId}`);
  } else {
    reasons.push(`task kind resolved to ${taskKind}`);
  }

  if (input.taskKind) reasons.push(`task intent kind: ${input.taskKind}`);
  if (input.workflowMode) reasons.push(`workflow mode: ${input.workflowMode}`);
  const mutation = effectiveMutation(input);
  if (mutation !== "unknown") {
    const source = input.mutationScope ? "task intent mutation scope" : "mutation scope";
    reasons.push(`${source}: ${mutation}`);
  }
  if (input.touchedPaths && input.touchedPaths.length > 0) {
    reasons.push(`touched paths: ${input.touchedPaths.toSorted().join(", ")}`);
  }

  if (mutation === "unknown" && taskKind === "analysis") {
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
  if (hint.kind === "preferred_blueprint") return undefined;
  if (hint.targetNodeKind) return hint.targetNodeKind;
  if (hint.kind === "context_hint" || hint.kind === "risk_hint") return "context_resolve";
  if (hint.kind === "check_suggestion") return "deterministic_check";
  if (hint.kind === "output_schema" || hint.kind === "artifact_template") return "work_unit";
  if (hint.kind === "evidence_requirement") return "verify_record";
  return undefined;
}

function acceptedRecipeExtension(opts: {
  hint: RecipeHint;
  nodeKind: BlueprintNodeKind;
  reason: string;
}): AcceptedRecipeExtension {
  return {
    recipeId: opts.hint.recipeId,
    ...(opts.hint.recipeVersion ? { recipeVersion: opts.hint.recipeVersion } : {}),
    ...(opts.hint.recipeName ? { recipeName: opts.hint.recipeName } : {}),
    ...(opts.hint.extensionId ? { extensionId: opts.hint.extensionId } : {}),
    nodeKind: opts.nodeKind,
    kind: opts.hint.kind,
    ...(opts.hint.summary ? { summary: opts.hint.summary } : {}),
    value: opts.hint.value,
    reason: opts.reason,
  };
}

function rejectedRecipeExtension(opts: {
  hint: RecipeHint;
  nodeKind?: BlueprintNodeKind;
  reason: string;
}): RejectedRecipeExtension {
  return {
    recipeId: opts.hint.recipeId,
    ...(opts.hint.recipeVersion ? { recipeVersion: opts.hint.recipeVersion } : {}),
    ...(opts.hint.recipeName ? { recipeName: opts.hint.recipeName } : {}),
    ...(opts.hint.extensionId ? { extensionId: opts.hint.extensionId } : {}),
    ...(opts.nodeKind ? { nodeKind: opts.nodeKind } : {}),
    kind: opts.hint.kind,
    ...(opts.hint.summary ? { summary: opts.hint.summary } : {}),
    value: opts.hint.value,
    reason: opts.reason,
  };
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
    if (hint.kind === "preferred_blueprint") {
      const value = hint.value;
      const blueprintId =
        typeof value === "object" && value !== null && "blueprint_id" in value
          ? (value as { blueprint_id?: unknown }).blueprint_id
          : value;
      if (blueprintId === opts.blueprint.id) {
        acceptedRecipeExtensions.push(
          acceptedRecipeExtension({
            hint,
            nodeKind: "intake",
            reason: `Recipe preferred blueprint ${opts.blueprint.id} accepted.`,
          }),
        );
      } else {
        rejectedRecipeExtensions.push(
          rejectedRecipeExtension({
            hint,
            reason: `Recipe preferred blueprint ${
              typeof blueprintId === "string" ? blueprintId : "unknown"
            } did not match the resolved safe route ${opts.blueprint.id}.`,
          }),
        );
      }
      continue;
    }

    const nodeKind = targetNodeKindForHint(hint);
    if (!nodeKind || !nodeKinds.has(nodeKind)) {
      rejectedRecipeExtensions.push(
        rejectedRecipeExtension({
          hint,
          nodeKind,
          reason: "Recipe hint targets a node kind that is not active in the selected blueprint.",
        }),
      );
      continue;
    }

    const point = extensionPointFor(opts.blueprint, nodeKind);
    if (!point?.allowed.includes(hint.kind)) {
      rejectedRecipeExtensions.push(
        rejectedRecipeExtension({
          hint,
          nodeKind,
          reason: "Recipe hint is not allowed for this protected route extension point.",
        }),
      );
      continue;
    }

    acceptedRecipeExtensions.push(
      acceptedRecipeExtension({
        hint,
        nodeKind,
        reason: `Recipe hint ${hint.kind} accepted for ${nodeKind}.`,
      }),
    );
  }

  return { acceptedRecipeExtensions, rejectedRecipeExtensions };
}

export function resolveBlueprint(opts: {
  input: BlueprintResolveInput;
  registry?: BlueprintRegistry;
  projectBlueprintIds?: readonly BlueprintId[];
}): ResolvedBlueprint {
  const registry = opts.registry ?? createBlueprintRegistry();
  const { blueprint, reasons, stopReasons } = selectBlueprint({ input: opts.input, registry });
  if (opts.projectBlueprintIds?.includes(blueprint.id)) {
    reasons.push(`trusted project-local blueprint selected: ${blueprint.id}`);
  }
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
  mutationScope?: MutationKind;
  taskKind?: TaskKind;
  tags: readonly string[];
  title?: string;
  description?: string;
}): TaskKind {
  return inferTaskKind(input);
}
