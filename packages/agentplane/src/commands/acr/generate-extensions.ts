import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AgentChangeRecord } from "@agentplaneorg/core/schemas";

import { explainResolvedBlueprint, resolveBlueprint } from "../../blueprints/index.js";
import { isRecord } from "../../shared/guards.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import type { CommandContext, loadTaskFromContext } from "../shared/task-backend.js";

type AcrTask = Awaited<ReturnType<typeof loadTaskFromContext>>;

export function buildAcrContextExtension(task: AcrTask): Record<string, unknown> {
  if (task.task_kind !== "context") return {};
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const context = extensions["agentplane.context"];
  if (!isRecord(context)) return {};
  return {
    "agentplane.context": {
      ...structuredClone(context),
      task_id: task.id,
      task_kind: task.task_kind,
      mutation_scope: task.mutation_scope ?? null,
      blueprint_request: task.blueprint_request ?? null,
    },
  };
}

export async function buildAcrBlueprintExtension(opts: { task: AcrTask; ctx: CommandContext }) {
  const input = blueprintResolveInputFromTask({ task: opts.task, config: opts.ctx.config });
  const resolved = resolveBlueprint({ input });
  const explained = explainResolvedBlueprint({ resolved, workflowMode: input.workflowMode });
  const snapshot = await buildAcrBlueprintSnapshotProjection({
    task: opts.task,
    ctx: opts.ctx,
  });
  return {
    blueprint_id: explained.blueprintId,
    blueprint_version: explained.blueprintVersion,
    workflow_mode: explained.workflowMode ?? null,
    route: explained.route.map((node) => node.kind),
    required_evidence: explained.requiredEvidence.map((item) => ({
      id: item.id,
      kind: item.kind,
      produced_by: item.producedBy,
      required: item.required,
    })),
    accepted_recipe_extensions: explained.acceptedRecipeExtensions.map((item) => ({
      recipe_id: item.recipeId,
      recipe_version: item.recipeVersion ?? null,
      extension_id: item.extensionId ?? null,
      kind: item.kind,
      node_kind: item.nodeKind,
      summary: item.summary ?? null,
    })),
    rejected_recipe_extensions: explained.rejectedRecipeExtensions.map((item) => ({
      recipe_id: item.recipeId,
      recipe_version: item.recipeVersion ?? null,
      extension_id: item.extensionId ?? null,
      kind: item.kind,
      node_kind: item.nodeKind ?? null,
      summary: item.summary ?? null,
      reason: item.reason,
    })),
    stop_reasons: explained.stopReasons.map((item) => ({
      id: item.id,
      severity: item.severity,
      reason: item.reason,
    })),
    snapshot,
  };
}

async function buildAcrBlueprintSnapshotProjection(opts: {
  task: AcrTask;
  ctx: CommandContext;
}): Promise<{
  state: "current" | "missing" | "invalid" | "stale" | "unavailable";
  path: string | null;
  digest: string | null;
  current_digest: string | null;
  route_changed: boolean | null;
  artifact_sha256: string | null;
  safe_command: string;
}> {
  const safeCommand = `agentplane blueprint snapshot ${opts.task.id}`;
  try {
    const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: opts.ctx, task: opts.task });
    const relativePath = path.relative(opts.ctx.resolvedProject.gitRoot, snapshot.path);
    const artifactSha256 =
      snapshot.state === "current" ? await hashFile(snapshot.path).catch(() => null) : null;
    return {
      state: snapshot.state,
      path: relativePath,
      digest: snapshot.previous.digest,
      current_digest: snapshot.current.digest,
      route_changed: snapshot.routeChanged,
      artifact_sha256: artifactSha256,
      safe_command: snapshot.safeCommand,
    };
  } catch {
    return {
      state: "unavailable",
      path: null,
      digest: null,
      current_digest: null,
      route_changed: null,
      artifact_sha256: null,
      safe_command: safeCommand,
    };
  }
}

export function inferCheckType(
  command: string,
): AgentChangeRecord["verification"]["checks"][number]["type"] {
  if (command.includes("typecheck")) return "typecheck";
  if (command.includes("lint")) return "lint";
  if (command.includes("build")) return "build";
  if (command.includes("schema")) return "schema_validation";
  if (command.includes("test") || command.includes("vitest")) return "test";
  return "other";
}

export async function hashFile(filePath: string): Promise<string> {
  const bytes = await readFile(filePath);
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

export function buildResidualRisks(opts: {
  taskHash: string | null;
  planState: string;
  verificationState: string;
  verificationChecks: AgentChangeRecord["verification"]["checks"];
  evidence: AgentChangeRecord["evidence"];
}): string[] {
  const risks: string[] = [];
  if (opts.planState !== "approved") risks.push("Plan is not approved.");
  if (opts.verificationState !== "ok") risks.push("Verification is not recorded as ok.");
  if (opts.verificationState === "ok" && opts.verificationChecks.length === 0) {
    risks.push("Passed verification has no checks.");
  }
  if (!opts.taskHash) risks.push("Task README evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "plan")) risks.push("Plan evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "verification_log")) {
    risks.push("Verification log evidence is missing.");
  }
  return risks;
}
