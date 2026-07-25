import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import {
  validateBlueprintResolvedSnapshot,
  type BlueprintResolvedSnapshotArtifact,
} from "../../blueprints/index.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { buildTaskBlueprintResolvedSnapshot } from "../blueprint/snapshot-artifact.js";
import { getHumanInputState } from "../task/human-input.js";
import type { CommandContext } from "./task-backend.js";
import type { WorkflowStep } from "./workflow-step.js";

const BLUEPRINT_MAX_BYTES = 16 * 1024 * 1024;

export type WorkflowBlueprintObservation = {
  component: StateFingerprintComponentInput;
  policyModules: readonly string[];
};

export type WorkflowBlueprintBlockerCode =
  | "blueprint_resolution_failed"
  | "blueprint_snapshot_invalid"
  | "blueprint_snapshot_missing_after_start"
  | "blueprint_snapshot_observation_unavailable"
  | "blueprint_snapshot_stale"
  | "workflow_mode_mismatch";

function unavailable(
  reason_code: WorkflowBlueprintBlockerCode,
  evidence: unknown,
): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source: "workflow_route_blueprint",
    reason_code,
    evidence,
  };
}

function liveBlueprintAllowed(task: TaskData, step: WorkflowStep): boolean {
  const status = String(task.status).toUpperCase();
  if (step.kind === "human_input") {
    return String(getHumanInputState(task).openQuestion?.previousStatus).toUpperCase() === "TODO";
  }
  if (status !== "TODO") return false;
  if (step.kind === "approval") return step.request.type === "plan_approval";
  return (
    step.kind === "cli_operation" &&
    (step.operation.id === "worktree.prepare" ||
      step.operation.id === "task.start" ||
      step.operation.id === "task.branch.start")
  );
}

function blueprintValue(opts: {
  path: string;
  source: "persisted_snapshot" | "live_resolution";
  snapshot: BlueprintResolvedSnapshotArtifact;
  fileSha256?: string;
}): Record<string, unknown> {
  return {
    path: opts.path,
    source: opts.source,
    blueprintId: opts.snapshot.selectedBlueprint.id,
    snapshotDigest: opts.snapshot.digest,
    policyModules: opts.snapshot.policyModules,
    ...(opts.fileSha256 ? { fileSha256: opts.fileSha256 } : {}),
  };
}

export async function observeWorkflowBlueprint(opts: {
  ctx: CommandContext;
  repositoryRoot: string;
  task: TaskData;
  step: WorkflowStep;
  workflowMode: string;
  relativePath: string;
}): Promise<WorkflowBlueprintObservation> {
  if (opts.ctx.config.workflow_mode !== opts.workflowMode) {
    return {
      component: unavailable("workflow_mode_mismatch", {
        routeWorkflowMode: opts.workflowMode,
        configuredWorkflowMode: opts.ctx.config.workflow_mode,
      }),
      policyModules: [],
    };
  }
  let live: BlueprintResolvedSnapshotArtifact;
  try {
    live = await buildTaskBlueprintResolvedSnapshot({
      ctx: {
        ...opts.ctx,
        resolvedProject: {
          ...opts.ctx.resolvedProject,
          gitRoot: opts.repositoryRoot,
        },
      },
      task: opts.task,
    });
  } catch (error) {
    return {
      component: unavailable("blueprint_resolution_failed", {
        path: opts.relativePath,
        message: error instanceof Error ? error.message : String(error),
      }),
      policyModules: [],
    };
  }
  if (live.resolverInput.workflowMode !== opts.workflowMode) {
    return {
      component: unavailable("workflow_mode_mismatch", {
        routeWorkflowMode: opts.workflowMode,
        resolvedWorkflowMode: live.resolverInput.workflowMode ?? null,
      }),
      policyModules: live.policyModules,
    };
  }

  let content: string;
  try {
    content = await readContainedStableTextNoFollow({
      repository_root: opts.repositoryRoot,
      file_path: path.join(opts.repositoryRoot, opts.relativePath),
      label: "workflow_route_blueprint",
      max_bytes: BLUEPRINT_MAX_BYTES,
    });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | null)?.code ?? "unknown";
    if (code === "ENOENT" && liveBlueprintAllowed(opts.task, opts.step)) {
      return {
        component: {
          state: "present",
          source: "workflow_route_blueprint",
          value: blueprintValue({
            path: opts.relativePath,
            source: "live_resolution",
            snapshot: live,
          }),
        },
        policyModules: live.policyModules,
      };
    }
    return {
      component: unavailable(
        code === "ENOENT"
          ? "blueprint_snapshot_missing_after_start"
          : "blueprint_snapshot_observation_unavailable",
        {
          path: opts.relativePath,
          code,
          liveDigest: live.digest,
        },
      ),
      policyModules: live.policyModules,
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    return {
      component: unavailable("blueprint_snapshot_invalid", {
        path: opts.relativePath,
        liveDigest: live.digest,
      }),
      policyModules: live.policyModules,
    };
  }
  const validation = validateBlueprintResolvedSnapshot(parsed);
  if (!validation.ok) {
    return {
      component: unavailable("blueprint_snapshot_invalid", {
        path: opts.relativePath,
        errors: validation.errors,
        liveDigest: live.digest,
      }),
      policyModules: live.policyModules,
    };
  }
  const persisted = parsed as BlueprintResolvedSnapshotArtifact;
  if (persisted.resolverInput.workflowMode !== opts.workflowMode) {
    return {
      component: unavailable("workflow_mode_mismatch", {
        path: opts.relativePath,
        routeWorkflowMode: opts.workflowMode,
        persistedWorkflowMode: persisted.resolverInput.workflowMode ?? null,
      }),
      policyModules: live.policyModules,
    };
  }
  if (persisted.digest.value !== live.digest.value) {
    return {
      component: unavailable("blueprint_snapshot_stale", {
        path: opts.relativePath,
        persistedDigest: persisted.digest,
        liveDigest: live.digest,
      }),
      policyModules: live.policyModules,
    };
  }
  return {
    component: {
      state: "present",
      source: "workflow_route_blueprint",
      value: blueprintValue({
        path: opts.relativePath,
        source: "persisted_snapshot",
        snapshot: persisted,
        fileSha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
      }),
    },
    policyModules: live.policyModules,
  };
}
