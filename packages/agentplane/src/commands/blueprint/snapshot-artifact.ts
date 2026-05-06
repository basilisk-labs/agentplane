import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { TaskData } from "../../backends/task-backend.js";
import {
  buildBlueprintResolvedSnapshot,
  createTrustedProjectBlueprintRegistry,
  resolveBlueprint,
  type BlueprintResolvedSnapshotArtifact,
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
