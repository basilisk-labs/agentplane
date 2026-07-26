import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { RouteBlocker, RouteExecutionPacket } from "./route-oracle.js";
import type { WorkflowRole, WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

export function routeBlockerSnapshot(state: WorkflowRouteState): readonly RouteBlocker[] {
  return state.blockers.map((blocker) => ({ ...blocker }));
}

export function routeBlockerFor(
  state: WorkflowRouteState,
  ...codes: readonly RouteBlocker["code"][]
): RouteBlocker | null {
  return state.blockers.find((blocker) => codes.includes(blocker.code)) ?? null;
}

export function selectedRouteBlocker(
  _state: WorkflowRouteState,
  selected: RouteBlocker | null | undefined,
): RouteBlocker | null {
  return selected ? { ...selected } : null;
}

export function authorityRef(fingerprint: StateFingerprint): string {
  return `route:${fingerprint.task_id}:${fingerprint.digest}`;
}

export function workSlug(task: Pick<TaskData, "id" | "title">): string {
  const fromTitle = task.title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .replaceAll(/-{2,}/g, "-")
    .slice(0, 48)
    .replaceAll(/-+$/g, "");
  if (fromTitle) return fromTitle;
  const suffix =
    task.id
      .split("-")
      .pop()
      ?.toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-") ?? "";
  return suffix || "work";
}

export function commonExecution(opts: {
  actionKind: RouteExecutionPacket["actionKind"];
  role: WorkflowRole;
  semanticMutationAllowed?: boolean;
  mustNot?: readonly string[];
  returnControlWhen?: string;
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  needsVerificationRecord?: boolean;
}): WorkflowStep["execution"] {
  return {
    actionKind: opts.actionKind,
    recommendedRole: opts.role,
    semanticMutationAllowed: opts.semanticMutationAllowed === true,
    mustNot: opts.mustNot ?? [],
    returnControlWhen:
      opts.returnControlWhen ??
      (opts.actionKind === "local_command"
        ? "after the exact command exits; recompute task next-action before any further step"
        : opts.actionKind === "provider_action"
          ? "after the provider or human action completes; recompute task next-action with remote truth when relevant"
          : opts.actionKind === "wait"
            ? "after the waited condition changes or the parent supervisor grants reclaim/escalation"
            : "recompute task next-action after the blocking condition changes"),
    verificationCandidate: opts.verificationCandidate ?? null,
    evidenceMissing: opts.evidenceMissing ?? [],
    needsVerificationRecord: opts.needsVerificationRecord === true,
  };
}
