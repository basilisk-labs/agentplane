import { readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { TaskData } from "../../backends/task-backend.js";
import {
  buildBlueprintResolvedSnapshot,
  createTrustedProjectBlueprintRegistry,
  resolveBlueprint,
  validateBlueprintResolvedSnapshot,
  type BlueprintResolvedSnapshotArtifact,
  type BlueprintSnapshotValidationResult,
} from "../../blueprints/index.js";
import type { CommandContext } from "../shared/task-backend.js";

import { blueprintResolveInputFromTask } from "./task-input.js";

export const BLUEPRINT_SNAPSHOT_ARTIFACT_PATH = "blueprint/resolved-snapshot.json";

export function taskBlueprintSnapshotPath(opts: { ctx: CommandContext; taskId: string }): string {
  return path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    BLUEPRINT_SNAPSHOT_ARTIFACT_PATH,
  );
}

export async function buildTaskBlueprintResolvedSnapshot(opts: {
  ctx: CommandContext;
  task: TaskData;
}): Promise<BlueprintResolvedSnapshotArtifact> {
  const input = blueprintResolveInputFromTask({
    task: opts.task,
    config: opts.ctx.config,
  });
  const projectRegistry = await createTrustedProjectBlueprintRegistry(
    opts.ctx.resolvedProject.gitRoot,
  );
  const resolved = resolveBlueprint({
    input,
    registry: projectRegistry.registry,
    projectBlueprintIds: projectRegistry.projectBlueprintIds,
  });
  return buildBlueprintResolvedSnapshot({
    resolved,
    input,
    workflowMode: input.workflowMode,
  });
}

export async function writeTaskBlueprintResolvedSnapshot(opts: {
  ctx: CommandContext;
  task: TaskData;
}): Promise<{
  path: string;
  snapshot: BlueprintResolvedSnapshotArtifact;
}> {
  const snapshot = await buildTaskBlueprintResolvedSnapshot(opts);
  const artifactPath = taskBlueprintSnapshotPath({
    ctx: opts.ctx,
    taskId: opts.task.id,
  });
  await atomicWriteFile(artifactPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return { path: artifactPath, snapshot };
}

export async function readTaskBlueprintResolvedSnapshot(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{
  path: string;
  snapshot: BlueprintResolvedSnapshotArtifact | null;
  validation: BlueprintSnapshotValidationResult | null;
}> {
  const artifactPath = taskBlueprintSnapshotPath(opts);
  let raw: string;
  try {
    raw = await readFile(artifactPath, "utf8");
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "ENOENT") {
      return { path: artifactPath, snapshot: null, validation: null };
    }
    throw err;
  }

  const parsed: unknown = JSON.parse(raw);
  const validation = validateBlueprintResolvedSnapshot(parsed);
  return {
    path: artifactPath,
    snapshot: validation.ok ? (parsed as BlueprintResolvedSnapshotArtifact) : null,
    validation,
  };
}

function routeKinds(snapshot: BlueprintResolvedSnapshotArtifact): string[] {
  return snapshot.nodes.map((node) => node.kind);
}

export async function refreshTaskBlueprintResolvedSnapshot(opts: {
  ctx: CommandContext;
  task: TaskData;
}): Promise<{
  path: string;
  previous: {
    exists: boolean;
    valid: boolean;
    digest: string | null;
    blueprintId: string | null;
    route: readonly string[];
  };
  next: {
    digest: string;
    blueprintId: string;
    route: readonly string[];
  };
  changed: boolean;
  routeChanged: boolean | null;
  snapshot: BlueprintResolvedSnapshotArtifact;
}> {
  const previous = await readTaskBlueprintResolvedSnapshot({ ctx: opts.ctx, taskId: opts.task.id });
  const written = await writeTaskBlueprintResolvedSnapshot(opts);
  const previousDigest = previous.snapshot?.digest.value ?? null;
  const previousRoute = previous.snapshot ? routeKinds(previous.snapshot) : [];
  const nextRoute = routeKinds(written.snapshot);

  return {
    path: written.path,
    previous: {
      exists: previous.validation !== null,
      valid: previous.validation?.ok ?? false,
      digest: previousDigest,
      blueprintId: previous.snapshot?.selectedBlueprint.id ?? null,
      route: previousRoute,
    },
    next: {
      digest: written.snapshot.digest.value,
      blueprintId: written.snapshot.selectedBlueprint.id,
      route: nextRoute,
    },
    changed: previousDigest !== written.snapshot.digest.value,
    routeChanged: previous.snapshot ? previousRoute.join("\0") !== nextRoute.join("\0") : null,
    snapshot: written.snapshot,
  };
}
