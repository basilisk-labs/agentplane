import { createHash } from "node:crypto";

import type {
  BlueprintResolveInput,
  BlueprintResolvedSnapshotArtifact,
  BlueprintSnapshotDigest,
  BlueprintSnapshotResolverInput,
  BlueprintSnapshotSelectedBlueprint,
  BlueprintSnapshotValidationProblem,
  BlueprintSnapshotValidationResult,
  ResolvedBlueprint,
  WorkflowMode,
} from "./model.js";
import { buildBlueprintPlanArtifact } from "./plan.js";

function isRecord(input: unknown): input is Record<string, unknown> {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}

function sortJson(input: unknown): unknown {
  if (Array.isArray(input)) return input.map((item) => sortJson(item));
  if (!isRecord(input)) return input;
  return Object.fromEntries(
    Object.entries(input)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => [key, sortJson(value)]),
  );
}

export function stableBlueprintSnapshotJson(input: unknown): string {
  return JSON.stringify(sortJson(input));
}

export function blueprintSnapshotDigest(input: unknown): BlueprintSnapshotDigest {
  return {
    algorithm: "sha256",
    value: createHash("sha256").update(stableBlueprintSnapshotJson(input)).digest("hex"),
  };
}

function normalizedResolverInput(input: BlueprintResolveInput): BlueprintSnapshotResolverInput {
  return {
    ...(input.taskId ? { taskId: input.taskId } : {}),
    ...(input.title ? { title: input.title } : {}),
    ...(input.description ? { description: input.description } : {}),
    tags: [...input.tags],
    ...(input.owner ? { owner: input.owner } : {}),
    ...(input.taskKind ? { taskKind: input.taskKind } : {}),
    ...(input.workflowMode ? { workflowMode: input.workflowMode } : {}),
    mutation: input.mutation,
    ...(input.mutationScope ? { mutationScope: input.mutationScope } : {}),
    touchedPaths: [...(input.touchedPaths ?? [])],
    recipeHints: [...(input.recipeHints ?? [])],
    riskFlags: [...(input.riskFlags ?? [])],
    ...(input.explicitBlueprintId ? { explicitBlueprintId: input.explicitBlueprintId } : {}),
    ...(input.blueprintRequest ? { blueprintRequest: input.blueprintRequest } : {}),
  };
}

function selectedBlueprintFromResolved(
  resolved: ResolvedBlueprint,
): BlueprintSnapshotSelectedBlueprint {
  return {
    id: resolved.blueprint.id,
    version: resolved.blueprint.version,
    title: resolved.blueprint.title,
    taskKinds: [...resolved.blueprint.taskKinds],
    workflowModes: [...(resolved.blueprint.workflowModes ?? [])],
  };
}

function snapshotPayloadWithoutDigest(opts: {
  resolved: ResolvedBlueprint;
  input: BlueprintResolveInput;
  workflowMode?: WorkflowMode;
}): Omit<BlueprintResolvedSnapshotArtifact, "digest"> {
  const plan = buildBlueprintPlanArtifact(opts);
  return {
    schemaVersion: 1,
    artifactKind: "agentplane.blueprint.resolved_snapshot",
    resolverInput: normalizedResolverInput(opts.input),
    selectedBlueprint: selectedBlueprintFromResolved(opts.resolved),
    plan,
    nodes: plan.states,
    requiredEvidence: plan.requiredEvidence,
    policyModules: plan.policyModules,
    allowedCommands: plan.allowedCommands,
    contextBudget: plan.contextBudget,
    contextManifest: plan.contextManifest,
    acceptedRecipeExtensions: plan.acceptedRecipeExtensions,
    rejectedRecipeExtensions: plan.rejectedRecipeExtensions,
    stopReasons: plan.stopReasons,
    selectionReasons: plan.whySelected,
  };
}

export function blueprintSnapshotPayloadForDigest(
  snapshot: BlueprintResolvedSnapshotArtifact,
): Omit<BlueprintResolvedSnapshotArtifact, "digest"> {
  const { digest: _digest, ...payload } = snapshot;
  return payload;
}

export function buildBlueprintResolvedSnapshot(opts: {
  resolved: ResolvedBlueprint;
  input: BlueprintResolveInput;
  workflowMode?: WorkflowMode;
}): BlueprintResolvedSnapshotArtifact {
  const payload = snapshotPayloadWithoutDigest(opts);
  return {
    ...payload,
    digest: blueprintSnapshotDigest(payload),
  };
}

function problem(
  code: BlueprintSnapshotValidationProblem["code"],
  message: string,
  path?: string,
): BlueprintSnapshotValidationProblem {
  return { code, message, ...(path ? { path } : {}) };
}

function hasStringArray(input: Record<string, unknown>, key: string): boolean {
  const value = input[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateTopLevelArray(
  snapshot: Record<string, unknown>,
  key: keyof BlueprintResolvedSnapshotArtifact,
  errors: BlueprintSnapshotValidationProblem[],
): void {
  if (!Array.isArray(snapshot[key])) {
    errors.push(
      problem("snapshot_invalid_array", `Snapshot ${String(key)} must be an array.`, String(key)),
    );
  }
}

export function validateBlueprintResolvedSnapshot(
  input: unknown,
): BlueprintSnapshotValidationResult {
  if (!isRecord(input)) {
    return {
      ok: false,
      errors: [
        problem("snapshot_invalid_object", "Blueprint resolved snapshot must be a JSON object."),
      ],
    };
  }

  const errors: BlueprintSnapshotValidationProblem[] = [];
  if (input.schemaVersion !== 1) {
    errors.push(problem("snapshot_invalid_schema_version", "Snapshot schemaVersion must be 1."));
  }
  if (input.artifactKind !== "agentplane.blueprint.resolved_snapshot") {
    errors.push(
      problem(
        "snapshot_invalid_artifact_kind",
        "Snapshot artifactKind must be agentplane.blueprint.resolved_snapshot.",
      ),
    );
  }

  if (!isRecord(input.digest) || input.digest.algorithm !== "sha256") {
    errors.push(problem("snapshot_invalid_digest", "Snapshot digest must use sha256."));
  } else if (typeof input.digest.value !== "string" || !/^[a-f0-9]{64}$/.test(input.digest.value)) {
    errors.push(
      problem("snapshot_invalid_digest", "Snapshot digest value must be a sha256 hex string."),
    );
  }

  if (isRecord(input.resolverInput)) {
    if (!hasStringArray(input.resolverInput, "tags")) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "resolverInput.tags must be an array.",
          "resolverInput.tags",
        ),
      );
    }
    if (!hasStringArray(input.resolverInput, "touchedPaths")) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "resolverInput.touchedPaths must be an array.",
          "resolverInput.touchedPaths",
        ),
      );
    }
    if (!Array.isArray(input.resolverInput.recipeHints)) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "resolverInput.recipeHints must be an array.",
          "resolverInput.recipeHints",
        ),
      );
    }
    if (!hasStringArray(input.resolverInput, "riskFlags")) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "resolverInput.riskFlags must be an array.",
          "resolverInput.riskFlags",
        ),
      );
    }
  } else {
    errors.push(problem("snapshot_missing_resolver_input", "Snapshot resolverInput is required."));
  }

  if (isRecord(input.selectedBlueprint)) {
    if (typeof input.selectedBlueprint.id !== "string" || !input.selectedBlueprint.id.trim()) {
      errors.push(
        problem(
          "snapshot_missing_selected_blueprint",
          "selectedBlueprint.id must be a non-empty string.",
          "selectedBlueprint.id",
        ),
      );
    }
    if (!hasStringArray(input.selectedBlueprint, "taskKinds")) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "selectedBlueprint.taskKinds must be an array.",
          "selectedBlueprint.taskKinds",
        ),
      );
    }
    if (!hasStringArray(input.selectedBlueprint, "workflowModes")) {
      errors.push(
        problem(
          "snapshot_invalid_array",
          "selectedBlueprint.workflowModes must be an array.",
          "selectedBlueprint.workflowModes",
        ),
      );
    }
  } else {
    errors.push(
      problem("snapshot_missing_selected_blueprint", "Snapshot selectedBlueprint is required."),
    );
  }

  if (isRecord(input.plan)) {
    if (
      isRecord(input.selectedBlueprint) &&
      input.plan.blueprintId !== input.selectedBlueprint.id
    ) {
      errors.push(
        problem(
          "snapshot_plan_mismatch",
          "Snapshot plan blueprintId must match selectedBlueprint.id.",
          "plan.blueprintId",
        ),
      );
    }
  } else {
    errors.push(problem("snapshot_missing_plan", "Snapshot plan is required."));
  }

  for (const key of [
    "nodes",
    "requiredEvidence",
    "policyModules",
    "allowedCommands",
    "contextManifest",
    "acceptedRecipeExtensions",
    "rejectedRecipeExtensions",
    "stopReasons",
    "selectionReasons",
  ] as const) {
    validateTopLevelArray(input, key, errors);
  }

  if (errors.length === 0) {
    const expected = blueprintSnapshotDigest(
      blueprintSnapshotPayloadForDigest(input as BlueprintResolvedSnapshotArtifact),
    );
    if ((input.digest as BlueprintSnapshotDigest).value !== expected.value) {
      errors.push(
        problem(
          "snapshot_digest_mismatch",
          "Snapshot digest does not match canonical snapshot payload.",
          "digest.value",
        ),
      );
    }
  }

  return { ok: errors.length === 0, errors };
}
